'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const crypto=require('node:crypto');
const M=require('./model.js');
const near=(a,b,t=1e-12)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
test('Amplification matches independently saved Qiskit statevector at r=1',()=>{
 const source=JSON.parse(fs.readFileSync(path.join(__dirname,'evidence/two_bin_double.json')));
 near(M.amplifyProbability(source.event.retained_model_probability,1),source.event.qiskit_amplified_probability);
 near(M.amplifyProbability(source.event.retained_model_probability,0),source.event.retained_model_probability);
});
test('Amplification boundaries, overshoot and parameter guards',()=>{
 for(let r=0;r<30;r++){near(M.amplifyProbability(0,r),0);near(M.amplifyProbability(1,r),1);}
 assert.ok(M.amplifyProbability(.1,3)<M.amplifyProbability(.1,2));
 assert.throws(()=>M.amplifyProbability(-.01,1));assert.throws(()=>M.amplifyProbability(.1,1.5));
});
test('Ramsey response obeys asymmetric readout and decoherence',()=>{
 near(M.ramseyProbability(0,.02,.2),.49);
 near(M.ramseyProbability(12.5,.02,1e15),.96);
 near(M.ramseyProbability(-12.5,.02,1e15),.02);
 near(M.ramseyProbability(10,0,.2),.49);
 near(M.ramseyProbability(5,.02,.2)+M.ramseyProbability(-5,.02,.2),.98);
 assert.ok(Math.abs(M.ramseyProbability(5,.02,.01)-.49)<Math.abs(M.ramseyProbability(5,.02,.2)-.49));
});
test('Frozen app rates and trace values match research evidence exactly',()=>{
 const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'data.js'),'utf8'),context);
 const d=context.window.DEMO_DATA;
 for(const [original,copy]of [['results.json','sensor_results.json'],['example_traces.json','example_traces.json']]){
  const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
  assert.equal(hash(fs.readFileSync(path.join(__dirname,'evidence',copy))),d.source_sha256[original]);
  const canonical=path.join(__dirname,'../laser_sensor_viability',original);
  if(fs.existsSync(canonical))assert.equal(hash(fs.readFileSync(canonical)),d.source_sha256[original]);
 }
 const r=JSON.parse(fs.readFileSync(path.join(__dirname,'evidence/sensor_results.json')));
 const t=JSON.parse(fs.readFileSync(path.join(__dirname,'evidence/example_traces.json')));
 assert.equal(d.scenarios.length,r.scenarios.length);assert.ok(d.scenarios.length>=8);
 assert.ok(d.methods.some(m=>m.id==='two_classical'));
 for(const c of d.scenarios){const src=r.scenarios.find(s=>s.id===c.id);for(const m of d.methods){near(c.methods[m.id].detection_rate,src.methods[m.id].detection_rate);near(c.methods[m.id].false_alarm_rate,src.methods[m.id].false_alarm_rate);}
 assert.equal(JSON.stringify(c.trace),JSON.stringify(t.scenarios[c.id]));}
});
test('Original after-click explorer retains the verified query and distinct long-query hardware counts',()=>{
 const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'data.js'),'utf8'),context);
 const data=context.window.DEMO_DATA;
 const bytes=fs.readFileSync(path.join(__dirname,'evidence/original_after_click_verification.json'));
 const source=JSON.parse(bytes);
 assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),data.original_sha256);
 assert.equal(JSON.stringify(data.original),JSON.stringify(source));
 const canonical=path.join(__dirname,'../research-validation/original_after_click_verification.json');
 if(fs.existsSync(canonical))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(canonical)).digest('hex'),data.original_sha256);
 assert.equal(data.original.event.selected_step,3);
 assert.equal(JSON.stringify(data.original.event.future_steps),'[4,5,6]');
 const job=data.original.hardware_jobs[0];
 const plain=job.rows.find(r=>r.model_id==='with_hidden_defect'&&r.variant==='plain');
 const amplified=job.rows.find(r=>r.model_id==='with_hidden_defect'&&r.variant==='local_steered');
 assert.equal(plain.source_meta.kind,'loop');assert.equal(amplified.source_meta.tau,3);
 assert.equal(plain.raw_selected_count,290);assert.equal(amplified.raw_selected_count,3354);
 near(amplified.raw_conditional_probabilities[2],amplified.raw_future_joint_counts[2]/amplified.raw_selected_count);
 const modeled=data.original.models.no_hidden_defect;
 assert.ok(modeled.ideal_circuits.memory_only_steered.max_conditional_error>.09);
 assert.ok(modeled.ideal_circuits.full_steered.max_conditional_error<1e-12);
});

function research(){const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'research-data.js'),'utf8'),context);return context.window.RESEARCH_DATA;}
test('Current research has byte-exact evidence copies and canonical hashes, separate from the old sensor',()=>{
 const d=research(),hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
 assert.equal(Object.keys(d.sources).length,7);
 for(const [key,meta] of Object.entries(d.provenance)){
  const bytes=fs.readFileSync(path.join(__dirname,meta.local));assert.equal(hash(bytes),meta.sha256);
  assert.equal(JSON.stringify(d.sources[key]),JSON.stringify(JSON.parse(bytes)));
  const canonical=path.join(__dirname,'..',meta.canonical);if(fs.existsSync(canonical))assert.equal(hash(fs.readFileSync(canonical)),meta.sha256);
 }
 assert.equal(d.sources.frequency.mode,'main');assert.ok(d.sources.frequency.protocol.detector.includes('onset is never supplied'));
 const old=JSON.parse(fs.readFileSync(path.join(__dirname,'evidence/sensor_results.json')));
 assert.notEqual(JSON.stringify(d.sources.frequency.scenarios),JSON.stringify(old.scenarios));
});
test('Unknown-onset data preserve record denominators and the independent coherent comparator',()=>{
 const f=research().sources.frequency;assert.equal(f.scenarios.length,6);
 for(const c of f.scenarios)for(const m of Object.values(c.methods)){
  near(m.detection_within_32s,m.counts.detection_within_32s/c.records_per_class);
  near(m.false_alarm_rate,m.counts.false_alarm_rate/c.records_per_class);
 }
 const c=f.scenarios[0];assert.equal(c.records_per_class,1920);
 near(c.methods.classical.detection_within_32s,986/1920);near(c.methods.classical_quantum.detection_within_32s,1114/1920);
 near(c.methods.two_classical.detection_within_32s,1881/1920);
 assert.equal(f.protocol.record_cycles,128);assert.equal(f.protocol.restricted_delay_s,32);
});
test('Drive results retain all 13 cases and the post-holdout prior-only control',()=>{
 const d=research().sources;assert.equal(Object.keys(d.drive.cases).length,13);
 assert.equal(d.prior.main_results_sha256,research().provenance.drive.sha256);assert.match(d.prior.scope,/Post-holdout descriptive/);
 for(const [id,c] of Object.entries(d.drive.cases))near(c.physical_fraction_rmse.value,d.prior.cases[id].observation_based_rmse.value);
 const step=d.drive.cases.source_step_20pct.methods.physical_history;
 near(step.detection_within32.value,19/512);assert.equal(step.detection_within32.records,512);
 const tele=d.drive.cases.source_telegraph_20pct.methods.physical_history;
 assert.equal(tele.detection_within32.records+tele.no_event_records+tele.late_onset_records,512);
 assert.equal(tele.detection_within32.records,480);
 for(const id of ['source_telegraph_20pct','source_step_10pct','source_telegraph_fast','source_step_with_efficiency_loss'])assert.ok(d.prior.cases[id].observation_based_rmse.value>d.prior.cases[id].prior_only_rmse.value);
 assert.equal(d.drive.config.steps,96);
});
test('Inspection uses the global task, charged budgets, and explicit construction costs',()=>{
 const d=research().sources,p=d.phase.cases.find(c=>c.id==='high_efficiency').budgets.equal_sample_photons;
 for(const m of Object.values(p))assert.equal(m.resources.sample_incident_mean_photons_before_object,20000);
 assert.ok(p.noon.global.rmse_full_2pi_rad>2);assert.ok(p.noon.global.rmse_modulo_pi_rad<.01);
 assert.ok(p.hybrid.global.wrong_pi_branch_wilson95[1]>0);
 const clean=d.spatial.circuits.filter(c=>c.style==='clean');assert.equal(clean.length,2);
 for(const c of clean){assert.equal(c.qubits,389);assert.equal(c.qpy_round_trip,'passed');}
 assert.equal(d.spatial.explicit_synthesis_costs.ceil.complete_one_round_generic_cx_constructive_upper_bound,2874028);
 assert.equal(d.spatial.explicit_synthesis_costs.floor.complete_one_round_generic_cx_constructive_upper_bound,3382108);
 assert.equal(d.inference_ignored.test_sha256,d.inference_aware.test_sha256);
});
