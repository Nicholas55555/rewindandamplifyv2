import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {Presentation,PresentationFile} from '@oai/artifact-tool';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..').replaceAll('\\','/');
const build=root+'/.finals-deck-build';
process.env.RUNTIME_NODE_MODULES??=await fs.realpath(path.join(build,'node_modules'));
const skill=process.env.PRESENTATIONS_SKILL_DIR??'C:/Users/nicho/.codex/plugins/cache/openai-primary-runtime/presentations/26.1105.12137/skills/presentations';
const py=process.env.RUNTIME_PYTHON??'C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1105-1297-0_26.1105.1297.0_x64__3k8sg7r9htsxt/dependencies/python/python.exe';
const draft=process.argv.includes('--draft');
const C={navy:'#091624',cream:'#F6F3EB',cyan:'#64D9E9',amber:'#EDB568',ink:'#11283B',teal:'#147D8C',ochre:'#9C5F15',muted:'#566875',light:'#AABCC7',line:'#D7DFDF',slate:'#344A5C'};
const P=Presentation.create({slideSize:{width:1280,height:720}});
const {applyPresentationChartFont,finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
const scripts=[];
function txt(s,t,x,y,w,h,size=28,color=C.ink,bold=false,align='left'){
 const q=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
 q.text=t;q.text.style={typeface:'Arial',fontSize:size,color,bold,alignment:align,verticalAlignment:'middle',wrap:'square',autoFit:'shrinkText',insets:0};return q;
}
function slide(title,n,dark=false){const s=P.slides.add();s.background.fill=dark?C.navy:C.cream;
 if(title)txt(s,title,64,45,1152,80,42,dark?C.cream:C.ink,true);
 txt(s,String(n).padStart(2,'0'),1160,671,56,20,14,dark?C.light:C.muted,false,'right');return s;}
function footer(s,t,dark=false){txt(s,t,64,628,1100,39,17,dark?C.light:C.muted);}
async function img(s,p,x,y,w,h,alt,fit='contain'){const b=await fs.readFile(p);s.images.add({blob:b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),contentType:/\.gif$/i.test(p)?'image/gif':/\.jpe?g$/i.test(p)?'image/jpeg':'image/png',alt,fit,position:{left:x,top:y,width:w,height:h}});}
function readable(t){return t.replace(/([a-z])(\d)/g,'$1 $2').replace(/(\d)([A-Za-z])/g,'$1 $2').replaceAll('outof','out of');}
function note(s,title,time,text,sources,cue=''){text=readable(text);cue=readable(cue);s.speakerNotes.text=`${time}\n\n${text}\n\nPRESENTER CUE: ${cue}\n\nSOURCES: ${sources}`;scripts.push({title,time,text,sources,cue});}
function chart(s,type,opt){const c=s.charts.add(type,opt);applyPresentationChartFont(c,{fontFamily:'Arial'});return c;}
function table(s,values,widths,top=180,height=350,size=24){const t=s.tables.add({rows:values.length,columns:values[0].length,left:64,top,width:1152,height,columnWidths:widths,values});
 t.borders.assign({fill:C.line,width:0.7,style:'solid'});
 for(let r=0;r<values.length;r++)for(let c=0;c<values[r].length;c++){let q=t.getCell(r,c);q.fill=r===0?C.navy:C.cream;q.text.style={typeface:'Arial',fontSize:size,color:r===0?C.cream:C.ink,bold:r===0,verticalAlignment:'middle',wrap:'square',insets:12};}
 return t;
}
const summ=JSON.parse(await fs.readFile(root+'/rewindandamplify-main/results/hardware/summary_plain.json','utf8'));
const exactP=summ.rows.find(r=>r.name==='click3-full-r0').raw.ideal_hit;
const full=summ.rows.find(r=>r.name==='click3-steered-full-r1');
const local=summ.rows.find(r=>r.name==='click3-steered-memory+last-1-r1');

// This file is inserted into visual_build.mjs by visual_revise_v3.py.
// Main talk: 13 slides, 9:20 including a 45-second demonstration.
const after=JSON.parse(await fs.readFile(root+'/research-validation/original_after_click_verification.json','utf8'));
const evidence=JSON.parse(await fs.readFile(root+'/laser_sensor_viability/results.json','utf8'));
const sensorNow=JSON.parse(await fs.readFile(root+'/laser_sensor_viability/followup/main/results.json','utf8'));
const driveNow=JSON.parse(await fs.readFile(root+'/qrsm_photon_poc/drive_diagnostics_followup/main/results.json','utf8'));
const phaseNow=JSON.parse(await fs.readFile(root+'/quantum_lithography_poc/phase_inspection_followup/results.json','utf8'));
const spatialNow=JSON.parse(await fs.readFile(root+'/finals-lithography/full_spatial_circuit/results.json','utf8'));
const exposureNow=JSON.parse(await fs.readFile(root+'/quantum_lithography_poc/exposure_followup/results.json','utf8'));
const dotBridge=JSON.parse(await fs.readFile(root+'/quantum_dot_bridge/results.json','utf8'));
const homAnalysis=JSON.parse(await fs.readFile(root+'/quantum_dot_bridge/hom_analysis/results.json','utf8'));
const pct=(v,places=1)=>(100*v).toFixed(places)+'%';
{
 const s=slide('',1,true);
 await img(s,root+'/finals-deck/assets/optical-cover.png',0,0,1280,720,'Conceptual optical interference artwork, not an apparatus','cover');
 txt(s,'Rewind &\nAmplify',64,115,800,200,78,C.cream,true);
 txt(s,'Predicting how hidden defects change\nquantum measurement patterns',68,335,1030,100,34,C.light);
 txt(s,'A Qiskit model tested on IBM hardware.\nExploratory extension: laser diagnostics.',68,454,1000,85,27,C.cream);
 txt(s,'Qubits  /  Florida Gulf Coast University',68,569,1000,37,23,C.cyan,true);
 txt(s,'Florida Qiskit Hackathon finals  /  FAU  /  14 November 2026',68,623,1100,35,18,C.light);
 note(s,'Rewind & Amplify','0:00–0:15',
 'We are Qubits from Florida Gulf Coast University. We model how hidden defects change quantum measurement patterns, then test a method for querying that model on IBM hardware. Laser diagnosis is a separate research extension.',
 'Original project README and docs/REPORT.md. Event: https://entangledsolutionsgroup.com/Qiskit-Fall-Fest-2026/. Conceptual cover generated with OpenAI image generation.',
 'Nicholas introduces the problem. First nine slides cover the original quantum computation.');
}

{
 const s=slide('Hidden defects can change the state before readout',2);
 txt(s,'State estimates depend on the dynamics and readout model',64,137,1152,50,29,C.ink);
 txt(s,'During qubit evolution',64,223,540,45,32,C.teal,true);
 txt(s,'A coupled defect can exchange energy\nor change the qubit’s frequency.',64,289,540,95,28,C.ink);
 txt(s,'The intended state can evolve\ndifferently from the ideal circuit.',64,417,540,82,27,C.muted);
 txt(s,'When interpreting the readout',724,223,492,45,30,C.ochre,true);
 txt(s,'Repeated measurements estimate\nprobabilities, not a full state in one shot.',724,289,492,95,28,C.ink);
 txt(s,'Readout errors and hidden dynamics\ncan otherwise receive the wrong explanation.',724,417,492,82,27,C.muted);
 txt(s,'Potential value: better calibration and more trustworthy state estimates',64,547,1152,68,30,C.ink,true);
 footer(s,'State estimation needs appropriate measurements and a validated noise model. This project has not diagnosed a physical defect.');
 note(s,'Hidden defects can change the state before readout','0:15–1:00',
 'Why analyze defects? A hidden two-level system can exchange energy with a qubit or shift its frequency. Then the state evolves differently from the ideal circuit. We infer quantum behavior from repeated preparations and measurements. One readout does not reveal an arbitrary full quantum state. If our analysis ignores hidden dynamics or detector errors, we can assign the wrong cause to the observed statistics. Defect analysis can inform calibration, operating frequencies and device selection, helping preserve useful computation and interpret state estimates. Our project tests a modeling approach to that analysis. It has not diagnosed an unknown physical defect or performed complete state tomography.',
 'Schlor et al., PRL123190502 (2019): https://www.nist.gov/publications/correlating-decoherence-transmon-qubits-low-frequency-noise-single-fluctuators. Keith et al., PRA98042318 (2018): https://www.nist.gov/publications/joint-quantum-state-and-measurement-tomography-incomplete-measurements. These support the physical context and measurement-inference limitations, not validation of our surrogate. Local mechanism: original prior_work/hidden_defects/README.md and qrsm_grover/model.py.',
 'Nicholas distinguishes physical state evolution from inference about that state. The QRSM models possible causes of the record.');
}
// WHAT QRSM ADDS BEFORE GROVER

{
 const s=slide('A click is one recorded measurement outcome',3);
 txt(s,'1 = click',64,157,530,76,58,C.teal,true);
 txt(s,'The output qubit reads 1\nin one model time step.',67,249,540,85,29,C.ink);
 txt(s,'0 = no click',742,161,470,65,45,C.muted,true);
 txt(s,'A single click does not\nidentify a defect.',744,249,455,85,29,C.ink);
 table(s,[['Time step','1','2','3','4'],['One example record','0','0','1','0']],[432,180,180,180,180],380,134,30);
 txt(s,'The emitter and hidden qubit carry memory between steps',64,546,1152,62,29,C.ink,true);
 footer(s,'Optical interpretation: a detector fires. On IBM, superconducting qubits represent this model.');
 note(s,'A click is one recorded measurement outcome','1:00–1:35',
 'A click means the model output reads one in a time step. Zero means no click. This example reads zero, zero, one, zero: a click at step three. Our query selects that step alone and allows any earlier history. Optically, the bit represents a detector firing. On IBM, a superconducting qubit represents that output. The emitter and hidden qubit carry memory to the next step. This repeating model is a quantum recurrent state machine, or QRSM.',
 'rewindandamplify-main/qrsm_grover/model.py: QRSM.dynamic, QRSM.purified, history_to_string. Original deck circuit slide and docs/TEAM_GUIDE.md. Example0010 is illustrative chronological notation, not a Qiskit endian-formatted counts key.',
 'Trace the four columns left to right. Say “a recorded one,” before using “click” again.');
}

{
 const s=slide('The QRSM connects each bit to a hidden-state model',4);
 txt(s,'Does an emitter alone explain the record, or does a hidden partner help?',64,136,1152,52,29,C.ink);
 txt(s,'Updates the modeled state',64,222,570,43,31,C.teal,true);
 txt(s,'Each observed 0 or 1 updates the\nconditional state of the emitter\nand its hidden partner.',64,289,570,126,30,C.ink);
 txt(s,'Scores a physical explanation',724,222,492,43,30,C.ochre,true);
 txt(s,'Candidate coupling and noise settings\nassign a probability to the record\nand predict the next readout.',724,289,492,126,28,C.ink);
 txt(s,'A fresh synthetic test: detector dead time changes the inferred coupling',64,452,1152,49,27,C.ink,true);
 table(s,[['True coupling','Dead time ignored','Dead time modeled'],['0.65','0.069','0.706']],[384,384,384],514,104,23);
 footer(s,'Other fitted parameters remained biased. Classical sequence models also use history. IBM used known models.');
 note(s,'The QRSM connects each bit to a hidden-state model','1:35–2:35',
 'The QRSM connects each observation to a physical hidden-state model. Each bit conditions the emitter and possible defect state, contributes to the record likelihood, and changes the next prediction. Across records, classical fitting compares coupling and noise settings. A fresh synthetic test shows why this matters. Ignoring detector dead time pushed inferred coupling from a true0.65to0.069. Modeling the blind detector bin moved it to0.706and improved prediction on unused records. Other parameters stayed biased. A detector error can otherwise receive a false physical explanation. Classical hidden-state models also capture history, so the quantum structure must earn its value. Our IBM experiment uses a prepared zero state and known model settings. Grover then queries that model; it does not identify an arbitrary unknown state.',
 'qrsm_grover/model.py kraus, record_log_probability and branches. Fresh inference: qrsm_photon_poc/followup/README.md and inference_results/fixed_411101_dead1_fit0.json, fixed_411101_dead1_fit1.json. Coupling rounded0.069 and0.706 versus truth0.65. Held-out log-score improvement0.4584nats/24-bin record, conditional95%interval0.3978–0.5210. Other parameters biased/boundary. Independent score review in followup/independent_review.json. Conditional trajectories are established prior work: Murch etal., Nature502211(2013), https://arxiv.org/abs/1305.7270.',
 'Nicholas explains the QRSM itself before any acceleration claim. Distinguish updating the state within a model from estimating the model parameters across many records.');
}

{
 const s=slide('Hidden memory changes what follows a click',5);
 txt(s,'Given a click at step 3, how likely is another click later?',64,134,1152,48,28,C.ink);
 txt(s,'Probability of a later click',64,197,780,35,23,C.muted);
 chart(s,'line',{position:{left:64,top:243,width:805,height:318},categories:['Step 4','Step 5','Step 6'],series:[
  {name:'No hidden defect',values:after.models.no_hidden_defect.exact_conditional_probabilities.map(v=>Number(v.toPrecision(12))),fill:C.ochre,line:{fill:C.ochre,width:3}},
  {name:'With hidden defect',values:after.models.with_hidden_defect.exact_conditional_probabilities.map(v=>Number(v.toPrecision(12))),fill:C.teal,line:{fill:C.teal,width:3}}],hasLegend:true,legend:{position:'bottom',textStyle:{fontSize:21,fill:C.ink}},chartFill:C.cream,plotAreaFill:C.cream,xAxis:{textStyle:{fontSize:23,fill:C.ink},line:{fill:C.line,width:.6}},yAxis:{min:0,max:.12,majorUnit:.04,numberFormatCode:'0%',textStyle:{fontSize:18,fill:C.muted},majorGridlines:{fill:C.line,width:.6}},dataLabels:{showValue:false}});
 txt(s,'At step 6',934,239,280,38,24,C.muted);
 txt(s,'10.10%',927,291,290,65,49,C.ochre,true);
 txt(s,'without hidden defect',931,357,280,40,20,C.muted);
 txt(s,'4.67%',927,430,290,65,49,C.teal,true);
 txt(s,'with hidden defect',931,496,280,40,20,C.muted);
 footer(s,'Exact model predictions. We compare known model alternatives. No unknown physical defect was diagnosed.');
 note(s,'Hidden memory changes what follows a click','2:35–3:20',
 'This is the useful prediction. Given a click at step three, how likely is another at steps four, five and six? With no hidden defect, the click resets the modeled emitter. With a coupled hidden qubit, memory survives and changes what follows. At step six, the two models predict about ten percent and five percent. Comparing these predictions with data can help evaluate a candidate mechanism. Here the model alternatives are deliberately specified. These curves show exact model behavior, not discovery of an unknown physical defect. They also explain why the history matters beyond an overall click count.',
 'research-validation/original_after_click_verification.json. Direct reproduction of qrsm_grover/queries.py exact_after_click and results/e5_inside_loop/noiseless.json. Conditional probabilities given step3=1, not stationary optical g2. Coupling phi=.45,zeta=.3 versus no hidden defect, theta=.6,gamma=.2.',
 'The audience should understand the two curves before hearing how Grover obtains the samples.');
}

{
 const s=slide('Rare conditions waste ordinary samples',6);
 txt(s,pct(exactP,2),64,159,500,99,77,C.teal,true);
 txt(s,'of ideal runs have the selected click',68,266,580,42,27,C.ink);
 txt(s,'About 25 runs per matching sample',68,321,630,48,29,C.ink,true);
 txt(s,'Quantum query scaling',758,163,458,42,29,C.ink,true);
 txt(s,'1 / p',757,234,440,68,50,C.muted);
 txt(s,'ordinary rejection',758,307,440,37,25,C.muted);
 txt(s,'1 / √p',757,378,440,68,50,C.teal,true);
 txt(s,'ideal coherent model calls',758,451,450,38,25,C.ink);
 txt(s,'p = probability of the selected event',758,497,450,30,20,C.muted);
 txt(s,'Today, a classical conditional sampler\nwins this small problem',64,532,1152,84,31,C.ink,true);
 footer(s,'A possible benefit needs larger quantum memory and sufficiently accurate reversible circuits.');
 note(s,'Rare conditions waste ordinary samples','3:20–4:05',
 'The selected click occurs in3.95percent of ideal runs. Ordinary rejection needs about25runs for one match, with cost growing as one over its probability. Amplitude amplification reduces coherent model calls to order one over the square root of that probability. That is the quantum rationale, not a wall-clock speedup. Our strongest classical baseline directly samples conditional answers without rejection and wins at this small size. The possible future opportunity is a hidden quantum memory that becomes expensive to represent classically, provided the reversible quantum circuit stays accurate. That crossover remains unproven.',
 'ExactP from summary_plain.json. Classical backward sampler: docs/REPORT.md section5 and qrsm_grover/classical.py. Amplitude amplification https://arxiv.org/abs/quant-ph/0005055. Quantum inference precedent https://arxiv.org/abs/1402.7359. Cost includes calls to preparation and its inverse, with additional oracle/reflection gates.',
 'Dan explains the fair classical comparison and why this remains quantum-computing research.');
}

{
 const s=slide('A reversible model makes amplification possible',7);
 await img(s,root+'/rewindandamplify-main/results/figures/fig_circuit_grover.png',64,137,1152,350,'Preparation of histories, event oracle, inverse preparation and reflection');
 const lab=txt(s,'3 Reflect about the prepared state',566,164,445,34,21,'#AF451C',true);lab.fill='#FBFBFA';
 const rec=txt(s,'records |0…0⟩',135,373,136,38,18,C.ink);rec.fill='#FBFBFA';
 txt(s,'Save the history',64,515,278,39,25,C.ink,true);
 txt(s,'Fresh qubits\nreplace resets',64,558,278,60,22,C.muted);
 txt(s,'Steer the model',358,515,278,39,25,C.ink,true);
 txt(s,'Classical tuning\nof a supported event',358,558,278,60,22,C.muted);
 txt(s,'Amplify locally',652,515,278,39,25,C.teal,true);
 txt(s,'Fewer gates\nwith approximation',652,558,278,60,22,C.muted);
 txt(s,'Check the answer',946,515,278,39,25,C.ink,true);
 txt(s,'Event rate and\nconditional accuracy',946,558,278,60,22,C.muted);
 footer(s,'Qiskit circuit construction, Aer verification, IBM compilation and archived device counts.');
 note(s,'A reversible model makes amplification possible','4:05–5:00',
 'Grover must run the model backward, but a reset discards information. We replace each reset with a fresh output qubit and defer measurement. A prepares the histories. The oracle marks the selected condition. A dagger reverses the preparation. A reflection followed by preparation changes interference so matching histories become more likely. We then reduce hardware cost. Steering is classical tuning of a supported event. Local reflection checks fewer qubits but introduces approximation. We verify both event rate and conditional accuracy. Qiskit builds the circuits, Aer checks the exact model, and compiled circuits run on IBM. Amplification is established. Our contribution is this recurrent-model construction and its tested adaptations.',
 'rewindandamplify-main/qrsm_grover/model.py, amplify.py, queries.py and tests. Steering helpers are in amplify.py. Original circuit figure fig_circuit_grover.png with corrected prepared-state terminology. Prior amplification and Bayesian-network inference: Brassard et al. and Low, Yoder, Chuang 2014. Before-event QRSM and during-event contributions documented in original README.',
 'Dan explains A and A dagger. Nicholas explains the implementation changes and verification. Technical model circuit is in backup.');
}

{
 const s=slide('More matching answers with fewer gates',8,true);
 txt(s,'Actual IBM Kingston run. Same steering, one amplification round.',64,134,1150,43,25,C.light);
 txt(s,'Raw matching-event rate',64,184,748,33,23,C.light);
 chart(s,'bar',{position:{left:62,top:215,width:748,height:320},categories:['Local reflection','Full reflection'],series:[{name:'Raw selected-event rate',values:[local.raw.hit,full.raw.hit],points:[{idx:0,fill:C.cyan},{idx:1,fill:C.amber}],valuesFormatCode:'0.00%'}],barOptions:{direction:'bar',grouping:'clustered',gapWidth:90},hasLegend:false,chartFill:C.navy,plotAreaFill:C.navy,xAxis:{textStyle:{fontSize:24,fill:C.cream},line:{fill:'none',width:0},majorGridlines:null},yAxis:{min:0,max:1,numberFormatCode:'0%',textStyle:{fontSize:18,fill:C.light},majorGridlines:{fill:C.slate,width:.6},line:{fill:'none',width:0}},dataLabels:{showValue:true,position:'outEnd',numberFormatCode:'0.00%',textStyle:{fontSize:28,fill:C.cream,bold:true}}});
 txt(s,'40 vs 85',908,221,310,72,53,C.cyan,true);
 txt(s,'two-qubit gates\nlocal / full',912,301,300,66,23,C.cream);
 txt(s,'0.055 / 0.069',908,398,310,49,32,C.cream,true);
 txt(s,'conditional-history error*\nlocal / full',912,451,300,65,22,C.light);
 txt(s,'Cost matters: fewer executed gates per accepted answer in this pair',64,555,1150,60,27,C.cyan,true);
 footer(s,'4,096 shots each. *Corrected TVD, lower is closer. Layouts differ. Gate accounting excludes other costs.',true);
 note(s,'More matching answers with fewer gates','5:00–6:00',
 'On IBM Kingston, local reflection returned the selected event in86.06percent of raw shots, versus78.49percent for full reflection. Both use steering and one round. They compiled to40and85two-qubit gates. Gates consume scarce device operations and introduce errors. In this pair, the shorter circuit returns more accepted answers per executed gate. That is limited operation accounting, not dollar savings or a classical speedup. Conditional accuracy matters too. Corrected total variation distance is0.055versus0.069, where lower is closer to the right distribution. Different physical placements confound the comparison. An archived repeat supports the pattern but does not isolate its cause. Reliable qubits are valuable because accurate answers require both a workable circuit and trustworthy measurements.',
 'research-validation/hardware_verification.json. First raw counts3525/4096 and3215/4096. Same steering and r=1. Corrected conditional-history TVD .055 versus.069. Two-qubit gate executions per raw accepted event:40/(3525/4096)=46.48 versus85/(3215/4096)=108.29. This excludes calibration, readout, compilation, duration and distribution-bias costs. No monetary savings or causal attribution. Job dbmfqlt8ft8s738uplmg,5Nov2026.',
 'Dillon presents the result and cost limitation. Mention the repeat, with details available in backup.');
}

{
 const s=slide('The query returns a prediction about the next clicks',9,true);
 const shot=root+'/laser-diagnostics-app/app-core-query.jpg';
 try{const b=await fs.readFile(shot);s.images.add({blob:b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),contentType:'image/jpeg',alt:'Offline original QRSM demonstration with selected condition and conditional future probabilities',fit:'contain',crop:{left:.01,top:.18,right:.01,bottom:.03},position:{left:64,top:149,width:1152,height:447}});}
 catch(err){if(!draft)throw new Error('Reviewed app-core-query.jpg is required for final revision.');await img(s,root+'/rewindandamplify-main/results/figures/fig_after_click.png',64,149,1152,447,'Original conditional future probabilities on simulated devices');}
 footer(s,'Live local demonstration of the original model. Static screenshot remains available if switching fails.',true);
 note(s,'The query returns a prediction about the next clicks','6:00–6:45',
 'In the app, we select a click at step three. Switching from plain sampling to full amplification raises acceptance while preserving the predicted future probabilities. Now switch the hidden-memory model to an emitter alone. The step-six probability changes from about five percent to ten percent. That is the answer we wanted: how a candidate hidden interaction changes later observations. These are saved, verified model calculations. The separate IBM data measure circuits representing those models. Neither is a live laser measurement, and amplification does not increase photons from a real source.',
 'laser-diagnostics-app original-core section and research-validation/original_after_click_verification.json. Original source queries.py and e5_inside_loop/noiseless.json. This demonstration is distinct from the separate two-bin cavity model.',
 'Timofey demonstrates for 45 seconds: 0–8 explain the QRSM role, 8–15 define the selected click, 15–27 choose Steering + full, 27–38 switch to Emitter only, 38–45 explain the diagnosis boundary and return to slides. Pre-open Focus view and the original QRSM chapter. Do not troubleshoot during the talk.');
}

{
 const s=slide('Quantum-dot source quality and the QRSM',10,true);
 txt(s,'The original question: what hidden environment could explain the record?',64,134,1150,45,28,C.cream);
 txt(s,'What the dot model taught us',64,223,570,50,31,C.cyan,true);
 txt(s,'Equal photon counts can hide\ndifferent interference quality.',64,301,570,121,30,C.cream);
 txt(s,'Engineers: qualify and tune\nsources for photonic chips.',64,467,570,80,27,C.light);
 txt(s,'Proposed QRSM extension',724,223,492,50,30,C.amber,true);
 txt(s,'A dot + environment model\nwould predict the joint readout\nfrom two photons.',724,301,492,121,27,C.cream);
 txt(s,'Needs a calibrated measurement\nand held-out photon records.',724,467,492,80,26,C.light);
 txt(s,'Photonic operations rely on predictable interference',64,565,1152,54,29,C.cyan,true);
 footer(s,'Dot studies ran classically. No dot QRSM fit or defect diagnosis. Laser-frequency monitoring is a separate experiment.',true);
 note(s,'Quantum-dot source quality and the QRSM','6:45–7:25',
 'Quantum dots bring the QRSM question to photon-source quality: what hidden environment could explain the observations? Photonic operations rely on predictable interference. Equally bright sources can produce photons with different interference quality. Engineers qualifying sources for photonic chips should measure interference alongside collection loss. The proposed QRSM extension would model the dot and candidate fluctuations, then predict a two-photon readout. That needs a calibrated measurement model and held-out records. Both dot studies ran classically. No dot QRSM was fitted or physical defect diagnosed. Next is our separate laser-frequency experiment.',
 'Original qrsm_grover/model.py supplies the sequential conditional-state and observation framework. quantum_dot_bridge/README.md, PROTOCOL.md and results.json provide the separate illustrative radiative-emitter benchmark with ideal preparation and frequency-independent loss. The dot pair-memory example is classical environmental correlation, not evidence for a coherent hidden qubit. A joint two-photon HOM instrument has not been implemented in the QRSM or fitted to these external histograms. Real integration precedent: Davancoetal2017, https://www.nist.gov/publications/heterogeneous-integration-chip-quantum-photonic-circuits-single-quantum-dot-devices. Interference role in photonic information protocols: Munzberg etal2022, https://arxiv.org/html/2203.08682v1 Introduction. Existing source-characterization physics and semiconductor photon-source integration are prior work, not our invention. External data: quantum_dot_bridge/hom_analysis/README.md and results.json. Lithography transfer remains separate, as detailed in backup20.',
 'Nicholas distinguishes the completed dot analyses from the proposed QRSM extension. The concrete engineering task is source qualification and tuning for photonic chips, with calibrated controls before assigning a cause. Backups30–31 explain the correlation lesson and experimental normalization limits. Transition to the separate atomic-frequency benchmark on11.');
}

{
 const s=slide('The classical reference leads with unknown onset',11);
 const n=sensorNow.scenarios.find(x=>x.id==='unseen_nominal_sessions');const keys=['classical','classical_quantum','two_classical'];
 txt(s,'Detection within 32 s of a ±0.5 Hz step. Its start time is hidden.',64,137,1150,42,26,C.muted);
 // Eight decimal fraction digits preserve displayed percentages while fitting Excel's numeric precision.
 chart(s,'bar',{position:{left:64,top:211,width:815,height:338},categories:['Conventional C','C + atomic Q','C + independent C'],series:[{name:'Detection within 32 seconds',values:keys.map(k=>Number(n.methods[k].detection_within_32s.toFixed(8))),points:[{idx:0,fill:'#8395A0'},{idx:1,fill:C.teal},{idx:2,fill:C.ochre}],valuesFormatCode:'0.00%'}],hasLegend:false,barOptions:{direction:'column',gapWidth:95},chartFill:C.cream,plotAreaFill:C.cream,xAxis:{textStyle:{fontSize:22,fill:C.ink},line:{fill:C.line,width:.6}},yAxis:{min:0,max:1.1,majorUnit:.25,numberFormatCode:'0%',textStyle:{fontSize:17,fill:C.muted},majorGridlines:{fill:C.line,width:.6}},dataLabels:{showValue:true,position:'outEnd',numberFormatCode:'0.00%',textStyle:{fontSize:28,fill:C.ink,bold:true}}});
 txt(s,'Atomic addition',923,235,292,42,25,C.muted);
 txt(s,'+6.67 points',923,295,292,65,37,C.teal,true);
 txt(s,'95% interval\n+3.96 to +9.38 points',923,379,292,80,24,C.muted);
 txt(s,'C + C still leads',923,492,292,51,27,C.ochre,true);
 txt(s,'Full-record false alarms: '+keys.map(k=>pct(n.methods[k].false_alarm_rate,2)).join(' / ')+'  (C / C + Q / C + C)',64,581,1150,38,21,C.muted);
 footer(s,'128 s records. 1,920 per class. Unseen sessions. Nominal 5% alarm target. Total apparatus costs differ.');
 note(s,'The classical reference leads with unknown onset','7:25–8:10',
 'The test hides when frequency changes and holds out simulated sessions. Can the monitor respond within32seconds? The conventional receiver detects51.35percent. Adding the atomic channel reaches58.02percent, a6.67point gain. A second independent conventional reference reaches97.97percent. False alarms below refer to the entire128second record, not each instant. We include missed events in the delay calculation. Degraded atomic coherence can reverse the benefit, and shared-path drift still mimics the source. These controls sharpen our conclusion: an atomic reference can add information in this model, but the conventional addition performs best. Apparatus resources are not fully matched.',
 'laser_sensor_viability/followup/main/results.json, unseen_nominal_sessions. Detection within32s C.5135416667,CQ.5802083333,CC.9796875. Full-recordFAR .0541666667,.0515625,.040625. Eight independent calibration pipelines,96held-out sessions,1920null and1920source records. Paired hierarchical bootstrap gain6.67pp[3.96,9.38]. Assumed698nm,64atoms,1scycle and975msdeadtime. Distinct task from the earlier known-midpoint benchmark.',
 'Dillon explains the unknown onset and32second horizon before the percentages. Do not quote the earlier86% known-time result here.');
}

{
 const s=slide('The evidence changes our next experiment',12);
 txt(s,'Drive-amplitude monitoring',64,164,580,47,32,C.ochre,true);
 txt(s,'3.71% timely detection',64,237,575,63,37,C.ink,true);
 txt(s,'6.84% false source alarms',64,310,575,45,26,C.muted);
 txt(s,'This budget gives\nno useful prompt warning',64,392,575,85,30,C.ink,true);
 txt(s,'Revise the operating point\nbefore a sensor prototype.',64,512,575,75,26,C.muted);
 txt(s,'Phase inspection model',724,164,492,47,32,C.teal,true);
 txt(s,'0.00637 vs 0.00791 rad',724,237,492,63,33,C.ink,true);
 txt(s,'Hybrid / coherent phase error',724,310,492,45,25,C.muted);
 txt(s,'A conditional precision benefit\nmerits a calibrated optical test',724,392,492,85,28,C.ink,true);
 txt(s,'20,000 incident photons\n81% overall efficiency',724,512,492,75,26,C.muted);
 footer(s,'Separate simulations. Drive: +20% field step, 32-bin detection horizon, 96-bin alarm record. No wafer result.');
 note(s,'The evidence changes our next experiment','8:10–8:50',
 'In simulation, a20percent drive step gives only3.71percent detections within32bins and6.84percent false alarms per96-bin stable record. Most amplitude-estimation gain comes from its prior, so this regime needs redesign. A separate phase simulation is promising: a charged hybrid reduces error from0.00791to0.00637radians at matched incident photons and ideal preparation. Loss and preparation time matter. Next, test a calibrated optical target with an independent reference. Computing also needs accurate answers at competitive total cost. Neither path has demonstrated a wafer benefit.',
 'RESEARCH_RESULTS.md. Drive: qrsm_photon_poc/drive_diagnostics_followup/main/results.json and prior_only_estimation_control.json, independent reviews. Phase: quantum_lithography_poc/phase_inspection_followup/results.json high_efficiency/equal_sample_photons/global.20,000mean photons before object, both modes charged,T=.9,D=.9,p=1,10%coherent/90%NOON. RMSE hybrid.00637086 versus coherent.007908rad. Global phase prior over2pi, assumed known phase reference. No fabricated sample or industrial process test.',
 'Nicholas states the negative amplitude result and the conditional phase opportunity. Save prior-control and ambiguity details for backups25–26.');
}

{
 const s=slide('Our contribution and what we learned',13,true);
 txt(s,'A queryable recurrent quantum model',64,151,1150,50,36,C.cyan,true);
 txt(s,'Reversible construction and hardware adaptations,\nwith exact-model checks and archived IBM results',64,217,1150,88,29,C.cream);
 txt(s,'Controls changed our conclusions. Accuracy and total cost both matter.',64,337,1150,62,29,C.cream,true);
 txt(s,'Nicholas Taylor',64,445,535,33,24,C.cyan,true);txt(s,'QRSM research, Grover fusion, experiments',64,482,535,46,20,C.light);
 txt(s,'Timofey Yudintsev',725,445,491,33,24,C.cyan,true);txt(s,'Research, keyword-search idea',725,482,491,46,20,C.light);
 txt(s,'Dan Izquierdo',64,548,535,33,24,C.cyan,true);txt(s,'Experimentation',64,586,535,37,20,C.light);
 txt(s,'Dillon Satria Sitepu',725,548,491,33,24,C.cyan,true);txt(s,'Formatting and revising',725,586,491,37,20,C.light);
 footer(s,'QRSM model predates the event. Known amplification methods. AI assistance: Claude and Codex / OpenAI.',true);
 note(s,'Our contribution and what we learned','8:50–9:20',
 'Our contribution is a queryable recurrent quantum model with tested hardware adaptations. Controls changed our conclusions: accuracy and total cost both matter. The documented team roles are here. The QRSM predates the event, and amplification is established prior work. We used Claude for the original work and Codex with OpenAI models for the extensions. We now have a tested computing question and clearer optical experiments to pursue. Thank you.',
 'Original README sections PriorworkandAIhelp and Team. User confirmed the documented roles. New finals assistance includes research reconstruction, simulation implementation, tests, source review, app and presentation authoring. Prior amplification Brassardetal2000 and quantum inference Lowetal2014. Project repository https://github.com/Nicholas55555/rewindandamplify.',
 'Nicholas closes. Slides 14 onward are Q&A only. The planned 9:20 finish leaves 40 seconds for handoffs or pauses. Rehearse to confirm the actual time.');
}

async function addBackups(){
// Backup11: archived hardware counts and the independently repeated comparison.
{
 const s=slide('Hardware evidence and ablations',14);
 const wanted=['click3-full-r0','click3-steered-full-r0','click3-steered-full-r1','click3-steered-memory+last-1-r1','click3-full-r3'];
 const labels=['Plain sampling','Steering only','Steer + full, 1 round','Steer + local, 1 round','Full, unsteered, 3 rounds'];
 const vals=[['Circuit','Raw hits','Corrected hits','2-qubit gates','TVD*'],...wanted.map((n,i)=>{let r=summ.rows.find(a=>a.name===n);return[labels[i],(100*r.raw.hit).toFixed(2)+'%',(100*r.corrected.hit).toFixed(2)+'%',String(r.two_qubit_gates),r.corrected.tvd.toFixed(3)];})];
 table(s,vals,[415,190,210,195,142],174,370,22);
 txt(s,'Repeat: local 87.26% raw, full 78.61% raw',64,564,1140,43,27,C.teal,true);
 footer(s,'4,096 shots/circuit in each job. *Readout-corrected conditional-history TVD. Layouts differ.');
 note(s,'Hardware evidence and ablations','Backup',
 'The complete set prevents the closer local-versus-full comparison from being confused with the older87-versus59percent headline, which changed several factors at once. Raw rates, corrected rates, gate costs and conditional-distribution errors are separate quantities. Two nearby archived jobs are a repeat, not validation across many devices or days. The local ideal reflection already introduces conditional-history error before hardware noise.',
 'FINALS_EVIDENCE.md and research-validation/hardware_verification.json. First job dbmfqlt8ft8s738uplmg. Repeat dbmfv758ft8s738upsdg. Repeat raw selected counts local3574/4096 and full3220/4096. Correction assumes independent single-qubit readout flips and clips estimates. Classical baselines are faster at this size.');
}
// Backup12: which approximation and which accuracy statement.
{
 const s=slide('Three optical bins expose the circuit cost',15);
 txt(s,'All three bins must click. Full reflection preserves the retained model.',64,135,1152,52,27,C.muted);
 table(s,[['Choi cutoff','Qubits','Whole-query CX','Accepted rate¹','State error*'],['0.03','15','10,189','0.12783%','0.02604'],['0.003','18','19,864','0.12755%','0.01094']],[210,150,280,280,232],211,218,25);
 txt(s,'Implementation error < 6.3 × 10⁻¹³',64,465,1152,50,31,C.teal,true);
 txt(s,'Exact classical recursion already answers these small queries efficiently',64,546,1152,65,28,C.ink,true);
 footer(s,'¹After one round. *Trace distance versus the cavity-2 model. No three-bin noise, routing or physical sensor test.');
 note(s,'Three optical bins expose the circuit cost','Backup',
 'The optical extension now retains three flags and all environments before reversal. Both approximations pass every history-branch and conditional-state circuit check. The tighter approximation improves the selected-state error but nearly doubles gate count. It does not establish physical cavity convergence. The original untruncated-in-Choi cavity-two triple-click probability is0.0147042percent, while the retained laws differ. Exact classical recursion answers the last-click or all-click query with only three channel applications. A separate one-bin noise test reaches conditional-state error about0.806or0.848at the largest chosen gate noise, even though recorded acceptance increases. Those one-bin values are not the noise performance of this three-bin circuit.',
  'qrsm_photon_poc/multibin_followup/README.md, main/ideal_0p03.json, main/ideal_0p003.json, main/validation.json and branch NPZ archives. Whole all-click query includes preparation, oracle, inverse, full reflection and replay. Genericu,cx costs exclude routing. Separate cavity cutoff audit in qrsm_photon_poc/followup/dynamics_results.json.');
}
// Sensor technical backups use the frozen experiment output directly.
{
 const s=slide('Sensor assumptions and resource accounting',16);
 if(evidence){const c=evidence.config;
 table(s,[['Model element','Assumed setting'],['Compatible laboratory wavelength',`${c.wavelength_nm} nm, narrow-line optical drive`],['Atomic ensemble',`${c.atoms} independent, unentangled atoms`],['Interrogation',`${c.pulse_s*1000} ms pulse + ${c.dark_s*1000} ms dark time + ${c.pulse_s*1000} ms pulse`],['Record and acquisition gap',`${c.cycles} s record, ${evidence.resource_ledger.dead_time_s*1000} ms dead time per cycle`],['Relaxation and readout',`T₂ = ${c.t2_s*1000} ms, T₁ = ${c.t1_s} s; 2% / 4% readout errors`]],[435,717],163,363,24);
 txt(s,'Time and task match. Total apparatus resources do not.',64,556,1140,57,30,C.ochre,true);
 footer(s,'Photon allocation is assumed bookkeeping. Reference lasers, cooling, trapping and readout costs remain uncounted.');
 note(s,'Sensor assumptions and resource accounting','Backup',
 'The atomic response follows finite driven Bloch rotations with T1/T2 damping, preparation error, asymmetric readout error and binomial projection noise. Optical intensity changes the Rabi frequency and induces an assumed light shift during pulses. Conventional receivers include source-photon shot noise, electronics and reference drift. All methods see the same underlying source task and duration. The photon allocation is a declared assumption: atomic coupling and beam geometry are not specified from a real apparatus, and reference lasers plus atomic support optics are not included in a full cost comparison. Therefore this is not a resource-matched quantum advantage test.',
 'laser_sensor_viability/results.json config and resource_ledger supply the unchanged physical model. New task: followup/README.md, protocol.json and main/results.json. Unknown source onset48–96s, eight independently trained/calibrated pipelines, held-out sessions. Whole-record alarm calibration, misses and prealarms charged32sin restricted delay. Bishof etal., PRL111093604, https://arxiv.org/abs/1303.6741 is physical precedent, not chosen device specifications.');}
}
{
 const s=slide('Calibration failures can reverse the conclusion',17);
 if(sensorNow){const ids=['unseen_nominal_sessions','unseen_short_coherence','primary_reference_changes','common_sampled_path_changes'];const names=['Unseen nominal sessions','Shorter atomic coherence','Primary-reference step','Shared-path step'];
 const vals=[['Scenario','C detection / false alarm','C + Q','C + C'],...ids.map((id,i)=>{let r=sensorNow.scenarios.find(x=>x.id===id);return[names[i],...['classical','classical_quantum','two_classical'].map(k=>`${(100*r.methods[k].detection_within_32s).toFixed(1)}% / ${(100*r.methods[k].false_alarm_rate).toFixed(1)}%`)];})];
 table(s,vals,[375,315,231,231],176,345,23);
 txt(s,'Shared-path drift is indistinguishable from source drift here',64,552,1145,61,28,C.ochre,true);
 footer(s,'Each cell: detection within 32 s / false alarms per 128 s record. 1,920 null and source records per scenario.');
 note(s,'Calibration failures can reverse the conclusion','Backup',
 'These are the new unknown-onset results. Each cell gives timely detection followed by full-record false alarms. The target is source-frequency change, so a sensor/reference/path change can trigger a false source diagnosis. Shorter atomic coherence makes the fused channel worse than C alone. A separate agreement veto reduces the primary-reference failure but sacrifices sensitivity and still exceeds the nominal alarm target. Shared-path drift is structurally indistinguishable from source motion in this measurement model. Hierarchical pipeline/session intervals quantify finite simulation variation, not physical model error or calibrated universal coverage. None of the older known-midpoint rates belong in this table.',
 'laser_sensor_viability/followup/main/results.json and README.md. New primary-reference CQFAR84.53%, common-path94.11%. Agreement rule15.57% and68.23%, respectively. Nominal CQgain6.67pp, shortcoherence−5.42pp. Eight pipelines and96test sessions per scenario.');}
}
// Fresh synthetic joint inference: readout dynamics can be misattributed to coupling.
{
 const s=slide('Detector dead time can distort inferred coupling',18);
 txt(s,'Fresh synthetic records. True coupling = 0.65. Same data for both fits.',64,136,1152,48,27,C.muted);
 table(s,[['Physical model','Fitted coupling','Held-out score relative to HMM*'],['Dead time ignored','0.069','−0.4506 nats / record'],['Blind-bin dynamics included','0.706','+0.0078 nats / record']],[430,250,472],216,223,25);
 txt(s,'Modeling dead time improves prediction by 0.4584 nats / record',64,475,1152,63,29,C.teal,true);
 txt(s,'Corrected parameters still show bias and a dephasing boundary',64,558,1152,51,27,C.ochre,true);
 footer(s,'*24-bin records. Corrected model versus HMM interval spans zero. Synthetic inference, not physical defect diagnosis.');
 note(s,'Detector dead time can distort inferred coupling','Backup',
 'After a click, the next recorded bit is forced to zero while the underlying system evolves unconditionally. Ignoring that readout process misattributes detector correlation to the hidden interaction. Including it improves held-out log likelihood by0.4584nats per24-bin record, with paired conditional95%interval0.3978–0.5210. The fitted coupling moves closer to the known synthetic value, but dephasing reaches its upper bound and efficiency remains biased. A trained HMM captures the detector correlation too: the corrected physical model’s advantage over it is unresolved. Other physical parameters and the family remain known. This fresh result replaces the earlier truth-informed candidate-count example in the current deck.',
 'qrsm_photon_poc/followup/README.md, inference_results/fixed_411101_dead1_fit0.json, fixed_411101_dead1_fit1.json, parameter_validation_v2/ and independent_review.json. The HMM difference interval for the corrected model is−.0067to+.0222nats/record.');
}

// Backup16: separate physical sensing, inference and computational query claims.
{
 const s=slide('Where the quantum component enters',19);
 table(s,[['Layer','What it does','Evidence today'],['Sensor physics','Atomic state responds to sampled laser','Classical Bloch simulation'],['Diagnostic inference','Combines measured or simulated records','Classical statistical estimator'],['Rare-history query','Amplifies a condition in a coherent model','Qiskit simulation + IBM surrogate']],[300,460,392],190,330,25);
 txt(s,'A sensing benefit does not establish a computing speedup',64,565,1152,51,30,C.teal,true);
 footer(s,'The current sensor benchmark is not compiled into the IBM circuit or the small optical queries.');
 note(s,'Where the quantum component enters','Backup',
 'A sensor can use quantum dynamics while a classical computer processes its readouts. The Ramsey benchmark is simulated classically and uses classical inference. The quantum-computing component is the separate recurrent-model rare-history query. Connecting a calibrated realistic sensor model to coherent preparation and an oracle is further work. No end-to-end quantum advantage has been demonstrated.',
 'LASER_DIAGNOSTICS_ROADMAP.md, laser_sensor_viability documentation, qrsm_photon_poc/README.md and FINALS_EVIDENCE.md.');
}
// Backup17: actual lithography source differences and the appropriate experiment.
{
 const s=slide('The transfer to lithography needs its own test',20);
 table(s,[['Signal','Physical role','Current model'],['193 nm excimer light','DUV exposure source','Not represented'],['CO₂ drive laser','Creates a tin plasma for EUV','Not represented'],['13.5 nm EUV','Plasma emission used for exposure','Not represented'],['698 nm laboratory laser','Compatible narrow-line atomic probe','Synthetic surrogate']],[360,470,322],169,345,24);
 txt(s,'Conventional source diagnostics already exist',64,547,1140,44,30,C.teal,true);
 footer(s,'Proposed value: test complementary information on synchronized observations, then assess a specific source.');
 note(s,'The transfer to lithography needs its own test','Backup',
 'The distinction matters. A CO2drive laser heats tin to create plasma, which emits EUV. Monitoring the drive is different from measuring EUV. A narrow-line698nm atomic benchmark does not automatically transfer to either of those signals or to a193nm broadband pulsed excimer source. Existing conventional monitoring measures relevant source quantities. Cymer and imec reported controlled wafer experiments correlating light-source changes with critical-dimension behavior. That motivates source metrology, not a quantitative yield claim for our sensor. Atomic laser-noise metrology is also established prior work, including Bishof and colleagues in2013.',
 'ASML: https://www.asml.com/en/technology/lithography-principles/light-and-lasers and https://www.asml.com/en/products/euv-lithography-systems. Cymer/imec2014: https://www.cymer.com/wp-content/uploads/2018/12/Cymer_SPIE_AdvancedLithography_2014.pdf. Bishof etal.: https://arxiv.org/abs/1303.6741.');
}
}
await addBackups();
{
 const s=slide('The continued query also ran on IBM',21);
 const rows=after.hardware_jobs[0].rows;
 const ids=['loop-defect-r0','loop-defect-r1','loop-nodefect-r0','loop-nodefect-r1'];
 const labels=['Hidden defect, plain','Hidden defect, steer + local','No defect, plain','No defect, steer + local'];
 table(s,[['Model and circuit','Accepted / 4,096','Click at step 6*','2-qubit gates'],...ids.map((id,i)=>{const r=rows.find(x=>x.name===id);return[labels[i],String(r.raw_selected_count),pct(r.raw_conditional_probabilities[2],2),String(r.two_qubit_gates)];})],[405,240,300,207],172,352,23);
 txt(s,'Exact targets: 4.67% with defect; 10.10% without',64,549,1150,62,29,C.teal,true);
 footer(s,'*Raw conditional rate given step-3 click. Separate, longer circuits than the main 86.06% result.');
 note(s,'The continued query also ran on IBM','Backup',
 'These circuits amplify the step-three click and then continue the original machine through step six. The hidden-defect circuit retained290plainshots and3354steeredlocalshots, while the no-defect circuit retained503and3748. More accepted shots improve counting precision but hardware bias remains. In particular, the amplified hidden-defect step-six rate6.887percent exceeds the exact4.667percent. Layouts, widths and depths differ. The table is raw data, with the repeat and readout-corrected values available in the evidence. It is a test of deliberately programmed model alternatives, not discovery of unknown hardware or laser defects.',
 'research-validation/original_after_click_verification.json hardware_jobs[0]. Archived raw_plain.json jobdbmfqlt8ft8s738uplmg. Reproduced circuit conditional probabilities and independent raw-count extraction. No significance claim, hidden-state tomography or physical optical timing.');
}
{
 const s=slide('One step of the recurrent quantum model',22);
 await img(s,root+'/rewindandamplify-main/results/figures/fig_circuit_hybrid.png',64,148,1152,395,'Original emitter, hidden defect and output-qubit model circuit');
 txt(s,'Dynamic version: measure and reset the output',64,556,1152,48,29,C.teal,true);
 footer(s,'Purified version retains a fresh output for each step and defers measurement, preserving the click statistics.');
 note(s,'One step of the recurrent quantum model','Backup',
 'The emitter rotates under a drive. A hidden qubit rotates under its detuning and exchanges excitation with the emitter. The emitter then exchanges with a fresh output qubit. The dynamic implementation measures and resets that output each step. The purified implementation retains it, so the environment and history required for reversal remain in the circuit. This trades extra qubits for reversibility. Model steps are dimensionless. The optical labels describe a model interpretation. These IBM circuits did not measure photon arrivals.',
 'Original fig_circuit_hybrid.png, qrsm_grover/model.py and tests. QRSM defaults theta=.6,gamma=.2,phi=(.45,),zeta=(.3,).');
}
{
 const s=slide('Judging rubric and evidence map',23);
 table(s,[['Criterion','Weight','Where the talk addresses it'],['Problem and impact','15%','1–5, 8, 10, 12: purpose, measurement, cost'],['Quantum rationale','20%','4, 6–7, 15, 27: model, scaling, limits'],['Technical Qiskit implementation','20%','7–9, 14–15, 21–22, 27: circuit evidence'],['Results and evaluation','10%','4–5, 8, 11–12, 17–18, 25–31'],['Innovation','10%','7, 13, 24: contribution versus prior work'],['Presentation','15%','13 main slides, planned 9:20 including demo'],['Q&A and teamwork','10%','13–31: roles, lessons, evidence backups']],[380,135,637],150,458,22);
 footer(s,'Hardware bonus: highest applicable tier, up to +5. Evidence supports evaluation, not a guaranteed score.');
 note(s,'Judging rubric and evidence map','Backup',
 'This map follows the supplied Qiskit Fall Fest judging rubric. Exceptional performance asks for a specific stakeholder and realistic impact, a defensible quantum rationale that considers classical alternatives and hardware scale, reproducible Qiskit implementation, rigorous comparisons, a clear contribution relative to reused ideas, accessible delivery within the time limit, and shared understanding. The hardware bonus is a separate highest-tier item, not an additive sum of all tier values. We do not predict a judge score.',
 'User-supplied Qiskit_Fall_Fest_Judging_Rubric.xlsx, extracted by root. FINALS_RUBRIC.md.');
}
{
 const s=slide('Contribution, prior work and AI assistance',24);
 table(s,[['Origin','What belongs there'],['Established prior work','Amplitude amplification and amplified conditional inference'],['Before the event','QRSM idea, physics-shaped model and exact filter'],['Original hackathon work','Qiskit realization, Grover fusion, steering, local reflection, experiments'],['Finals extension','Independent model audits, laser diagnostics and optical feasibility studies'],['AI assistance','Original: Claude. Finals: Codex with OpenAI models']],[370,782],164,390,23);
 txt(s,'A sensing benefit and a computing speedup are separate claims',64,574,1150,47,28,C.teal,true);
 footer(s,'Atomic laser-noise spectroscopy also predates this project. No new atomic sensing principle is claimed.');
 note(s,'Contribution, prior work and AI assistance','Backup',
 'The original README documents the team research timeline and Claude assistance. The team set the original direction and questions and reviewed the work. This finals revision uses Codex and OpenAI models to assist research review, reproduction, simulations, tests, application and presentation. Do not imply that every generated analysis has already received manual team verification. Amplitude amplification and Bayesian quantum inference are prior art. Atomic laser-noise spectroscopy is also prior art. The separate optical and sensing extensions test scoped feasibility questions and do not establish an end-to-end quantum computing advantage.',
 'Original README PriorworkandAIhelp and Team. Brassardetal https://arxiv.org/abs/quant-ph/0005055. Lowetal https://arxiv.org/abs/1402.7359. Bishofetal https://arxiv.org/abs/1303.6741.');
}

{
 const s=slide('Drive amplitude: a useful negative result',25);
 txt(s,'Same 96-bin records. Unknown +20% field step. Detection within 32 bins.',64,135,1152,53,26,C.muted);
 table(s,[['Detector','Timely detection','Stable-record false alarms'],['Physical QRSM','3.71%','6.84%'],['Classical HMM','3.13%','5.27%'],['Count baseline','1.76%','1.95%']],[430,350,372],204,250,25);
 txt(s,'Prior-only RMSE 0.1136 → observed-data RMSE 0.1125',64,482,1152,55,30,C.teal,true);
 txt(s,'Most of the apparent estimation gain came from the prior',64,552,1152,51,28,C.ochre,true);
 footer(s,'Post-holdout prior control is descriptive. 512 records per case; 6,656 total. No physical time or photon-budget calibration.');
 note(s,'Drive amplitude: a useful negative result','Backup',
 'The field-amplitude proxy is the drive parameter, not an incident-photon flux. A20percent field step would correspond to44percent intensity under fixed coupling. This low-count regime yields poor timely detection alongside substantial full-record false alarms. The physical filter, fitted HMM and count detector share the same bits; these are not independent engineered optical receivers. The post-holdout prior-only control exposes a weak constant-estimate comparison: for this step, using observations only slightly improves the prior estimate, and for the four other source-changing cases it makes estimation worse. Afterpulsing produces10.55percent false source alarms. The model needs a better operating regime and calibrated detector dynamics before a practical monitor claim.',
 'qrsm_photon_poc/drive_diagnostics_followup/README.md; main/results.json, prior_only_estimation_control.json, independent_review.json, prior_only_independent_review.json. Four separately calibrated pipelines,13cases,128records per pipeline/case,96bins/cavity4. Stable FAR35/512 and step timely19/512 for physical QRSM. Prior-only MSE minus observed-data MSE .00025149, paired interval [.00007878,.00044596] for this step, a small conditional effect. Prior supplement is post-holdout descriptive, not another confirmatory test.');
}
{
 const s=slide('Phase inspection: benefit depends on the budget',26);
 txt(s,'Two illuminated sample modes. All incident photons are charged before loss.',64,135,1152,53,26,C.muted);
 table(s,[['Protocol at 81% efficiency','Full 2π phase RMSE','Wrong π branch'],['Coherent reference','0.00791 rad','0 / 2,000 trials'],['Pure two-photon NOON','2.22674 rad','50.4%'],['10% coherent + 90% NOON','0.00637 rad','0 / 2,000 trials']],[530,360,262],208,253,24);
 txt(s,'20,000 mean incident photons; ideal preparation in this comparison',64,491,1152,48,27,C.teal,true);
 txt(s,'1% preparation: matched dose takes 100× longer for pure NOON',64,558,1152,51,27,C.ochre,true);
 footer(s,'Synthetic phase task, known reference and loss. Hybrid pilots are charged. Zero observed branch errors is not a guarantee.');
 note(s,'Phase inspection: benefit depends on the budget','Backup',
 'A doubled fringe has a pi ambiguity. Pure NOON performs well locally around a shared calibrated working point, but fails to identify the full phase globally. A charged coherent pilot resolves that ambiguity in the tested hybrid. Both sample modes illuminate the object; the resource is20,000mean photons before object transmission, including reference-arm photons. The high-efficiency case has90percent object transmission and90percent detection, with ideal preparation. Lower transmission removes the precision benefit. At one-percent preparation, matching dose requires100times longer for pure NOON; at fixed clock time its precision is worse. Ideal number-resolving detection, a known phase reference and the declared classical protocol bound this result. It is not superiority over all classical designs or a measured feature-size benefit.',
 'quantum_lithography_poc/phase_inspection_followup/README.md and results.json high_efficiency/equal_sample_photons. Pure NOON modulo-pi RMSE .0062646rad, full2piRMSE2.226739rad. Hybrid.00637086rad, coherent.007908rad,2000outcomes per protocol in each cohort. Zero errors gives95%Wilson upper bound.1917%. Global phases reused across methods; outcomes independently drawn. Separate equal-clock and equal-dose budgets.');
}
{
 const s=slide('The full spatial query is costly to construct',27);
 txt(s,'49 exposure cells, capped photon counts and a reversible weighted threshold',64,135,1152,54,27,C.muted);
 table(s,[['Constructed bound','Qubits','Generic CX upper bound','Dose-1.5 event probability'],['Floor weights','389','3,382,108','0.00423713'],['Ceiling weights','389','2,874,028','0.00422695']],[300,170,332,350],218,218,24);
 txt(s,'196 count qubits + 23 score qubits + 170 extra clean ancillas',64,471,1152,56,28,C.teal,true);
 txt(s,'Both circuit files round-trip. Classical evaluation is already tractable.',64,553,1152,57,28,C.ink,true);
 footer(s,'Constructive, unoptimized bounds. No full-state simulation, routing, hardware execution or physical optical claim.');
 note(s,'The full spatial query is costly to construct','Backup',
 'This is an actual constructed reversible49-cell oracle, not an extrapolation from three cells. Four count qubits per cell encode a capped Poisson law,23bits accumulate the weighted score, and170extra clean ancillas support explicit reversible gates. Both389qubit circuits pass QPY serialization and independent structural, arithmetic and uncomputation checks. The CX values are constructive generic decomposition upper bounds, including preparation and one complete amplification round; they are not a routed device compilation. Rounding and capped-tail bounds bracket the original event, with relative bracket width0.2406percent at dose1.5and0.3526percent at dose1.8. Classical dynamic programming already solves this independent-cell distribution efficiently. Construction alone establishes neither computational advantage nor physical lithography feasibility.',
 'finals-lithography/full_spatial_circuit/README.md, results.json, process_bounds.py, independent_review.json. Floor and ceiling clean circuits389qubits; CX bounds3,382,108/2,874,028 and U5,050,537/4,288,741. Dose1.5 original event bracket [.004226948015,.004237128599]; conservative conditionalTVbound.00482. Cap15 value change usesPoisson tailN>=16, encoded cap probabilityusesN>=15. Check row direction against event interval: floor weights admit an upper event; ceiling weights give a lower event.');
}
{
 const s=slide('Exposure: contrast trades against dose and loss',28);
 txt(s,'Phenomenological two-photon resist; fixed threshold and 20 evaluated guard cells',64,135,1152,53,26,C.muted);
 table(s,[['Illumination','Best mean cell accuracy','Incident photons','All 20 cells correct'],['Two-photon NOON','95.16%','14.88 million','36.76%'],['Phase-cycled coherent','78.28%','6.81 million','0.73%'],['10% duty coherent','83.29%','0.845 million','2.52%']],[360,300,250,242],209,254,24);
 txt(s,'Quantum contrast helps this chosen response; it is not dose advantage',64,491,1152,54,28,C.teal,true);
 txt(s,'Loss, blur and linear background can erase the pattern benefit',64,557,1152,53,29,C.ochre,true);
 footer(s,'Each row uses its own best tested dose. All phase-cycle exposures charged. Higher classical peak intensity is allowed.');
 note(s,'Exposure: contrast trades against dose and loss','Backup',
 'The response combines declared linear and two-photon activation coefficients, loss, phase jitter, finite pixel collection and post-activation blur. Activations are rare Poisson events, not direct photon probabilities. The NOON pattern has stronger mean contrast and higher best guard-cell accuracy under the nominal assumptions, but requires more incident photons at its best tested dose. The duty-cycle comparator concentrates equal average photons into ten-percent active time, giving higher peak intensity. It is one explicit classical competitor, not an optimum over all illumination. Loss, blur, linear leakage, background and low preparation success degrade the result. The20guard cells exclude boundary cells. This is a sensitivity study of an assumed resist, not a prediction for an available material or fabricated feature.',
 'quantum_lithography_poc/exposure_followup/README.md and results.json finite_nominal. Table optimizes each method over tested doses, so it is not a single equal-dose operating point. G1/G2 supplement verifies spatial conservation and harmonic/per-photon accounting. 540,000Poisson realizations. Wavelength800nm, ±30degree modes, second harmonic400nm; period is not linewidth. Independent or fast phase jitter/mean-rate approximation excludes slow correlated phase drift.');
}
{
 const s=slide('Model accuracy is part of the resource budget',29);
 txt(s,'Cavity truncation changes conditional predictions, even with exact circuit execution',64,135,1152,57,26,C.muted);
 table(s,[['Cavity levels','Default drive error*','Higher-drive error*'],['2','2.7643 percentage points','7.0829 percentage points'],['4','0.0494 percentage points','0.1118 percentage points'],['5','0.00281 percentage points','0.01102 percentage points']],[270,441,441],207,250,25);
 txt(s,'Controlled records improve some model comparisons; ambiguity remains',64,487,1152,61,29,C.teal,true);
 txt(s,'Classical filtering remains the baseline. More physics costs more qubits.',64,558,1152,51,28,C.ink,true);
 footer(s,'*Largest tested after-click probability error versus cavity level 6. Finite truncation study, not universal convergence.');
 note(s,'Model accuracy is part of the resource budget','Backup',
 'The original optical circuit uses only two cavity levels. Comparing its conditional predictions with a six-level reference reveals errors of several percentage points, especially under stronger drive. Increasing the cutoff reduces the discrepancy in these cases, but raises state and circuit costs. Six fresh joint-inference cases fit five parameters with source and detector controls. Fixed settings do not resolve performance versus an HMM; controlled settings give small held-out gains under shared known physics. Fixed-drive detuning sign remains structurally ambiguous. Controlled settings break that exact symmetry but do not establish reliable finite-data sign identification. Local curvature intervals fail near boundaries and are not global uncertainty guarantees. Thermal, multimode and non-Markovian effects remain future model families.',
 'qrsm_photon_poc/followup/README.md, dynamics_results.json, inference_results/, parameter_validation_v2/ and independent_review.json. Max after-click error over tested later lags versus cavity dimension6. Master equation independently checked with QuTiP; trajectory statistics tested separately. Controlled model-HMM logscore gains .0574[.0158,.1014] and .0972[.0448,.1495]nats/24-binrecord under conditional bootstrap. This does not establish physical defect identification or a quantum computational speedup.');
}

{
 const s=slide('Equal photon counts can hide poor interference',30);
 txt(s,'Same brightness and one-photon frequency distribution. Different pair correlations.',64,135,1152,53,26,C.muted);
 const memory=dotBridge.classical_trap_pair_comparison.filter(r=>[0,.5].includes(r.switch_probability_between_endpoints));
 table(s,[['Frequency relation in a pair','Each photon’s offset','Overlap M','Coincidence per attempt'],...memory.map((r,i)=>[i===0?'Shared offset':'Independent offsets','50% at either offset',r.conditional_overlap.toFixed(2),pct(r.coincidence_probability_per_excitation_pair,1)])],[350,300,170,332],209,238,24);
 txt(s,'QRSM next step: predict joint measurements, then test competing models',64,479,1152,61,28,C.teal,true);
 txt(s,'80% versus 20% survival: 16× as many attempts per pair at lower efficiency',64,554,1152,51,26,C.ink,true);
 footer(s,'Attempt = two excitations. Classical environment, ideal preparation, 20% survival. M = 1 is ideal overlap. No quantum-memory advantage.');
 note(s,'Equal photon counts can hide poor interference','Backup',
 'This is the strongest connection to the original QRSM question. Each photon separately has the same brightness and the same fifty-fifty frequency distribution. Yet shared versus independent offsets change pair overlap from one to0.6. A single-photon marginal misses information present in the joint observation. The environmental correlation here is entirely classical; an HMM is a necessary competitor, and no coherent hidden qubit is established. We have not added this HOM measurement to the QRSM. That extension needs a calibrated joint-photon instrument and held-out records to compare physical and classical memory hypotheses. An engineer could then test source settings for interference quality while accounting for collection cost. At80percent survival, a pair takes1.5625attempts on average; at20percent, it takes25. These are surviving pairs, not necessarily two separately resolved output clicks.',
 'quantum_dot_bridge/results.json classical_trap_pair_comparison endpoints p_switch=0 and.5, PROTOCOL.md and independent_review.json. Both marginals are(.5,.5), ideal g2(0)=0 and eta=.2. M1/.6 gives coincidence per attempted excitation pair0/.008 at a balanced beamsplitter. The classical state remains fixed within each wavepacket; the pair model does not infer a switching time. Other benchmark cases retain counts while giving overlap1/.5/.2/.25 from pure dephasing or detuning. Sixteen tests and independent density-kernel quadrature support the calculations. External GaAs histograms are separate and did not calibrate this illustrative model. No semiconductor defect, physical device setting, quantum advantage or lithography yield was identified.');
}

{
 const s=slide('External GaAs data: a conditional reanalysis',31);
 txt(s,'Münzberg et al. (2022) measurements, reused under CC BY 4.0',64,135,1152,53,27,C.muted);
 table(s,[['Excitation separation','Our corrected HOM visibility','Conditional 95% interval'],...homAnalysis.cases.map(r=>[r.excitation_separation_ns.toFixed(1)+' ns',r.primary.corrected_visibility.toFixed(4),r.primary.corrected_interval95.map(v=>v.toFixed(4)).join(' to ')])],[320,405,427],209,255,25);
 txt(s,'39.4 ns: co-only normalization gives '+homAnalysis.cases[2].primary.co_only_corrected_visibility.toFixed(4),64,487,1152,55,29,C.teal,true);
 txt(s,'Source diagnosis needs calibrated controls',64,554,1152,51,29,C.ochre,true);
 footer(s,'Our ±2 ns windows and four reference peaks. Published corrections. Conditional counting/calibration errors exclude systematics.');
 note(s,'External GaAs data: a conditional reanalysis','Backup',
 'The real-data lesson is that a source-quality estimate depends on its measurement controls. These are external Hong–Ou–Mandel histograms analyzed classically, not team measurements or a QRSM fit. We normalize central peaks to side peaks and apply published splitter and multiphoton corrections. The intervals include conditional counting and calibration uncertainty but exclude polarization, routing and drift systematics. At39.4nanoseconds, co-only normalization changes the estimate from0.7724to0.7938. That discrepancy can guide an engineer to check polarization, alignment and normalization before blaming the dot. It does not identify which cause is responsible. These aggregated histograms also lack the sequential records needed to test the proposed QRSM extension. We need a calibrated two-photon observation model, repeated time-tagged acquisitions and held-out comparisons before claiming better diagnosis. No monotonic decay, reproduced author pipeline or improved device performance follows here.',
 'quantum_dot_bridge/hom_analysis/results.json, PROTOCOL.md and independent review. Dataset https://doi.org/10.5281/zenodo.6337697, CC BY4.0, by Julian Munzberg, Franz Draxl, Saimon Filipe Covre da Silva, Yusuf Karli, Santanu Manna, Armando Rastelli, Gregor Weihs and Robert Keil. Paper https://arxiv.org/html/2203.08682v1 SectionIV Eqs3–4. Quoted paper V=.803(.005),.826(.004),.774(.004) remain separate. Our primary extraction uses half-open windows of half-width2ns, no background subtraction, reference cycle indices−2,−1,+1,+2 and200000Monte Carlo draws. R=.514±.007,g2=.016±.001, assumed independent but shared across separations. Data hashes verified against reference_hom/provenance_manifest.json. These aggregate histograms cannot provide original QRSM binary histories or uniquely identify charge traps.');
}

await fs.mkdir(build,{recursive:true});
for(let i=0;i<P.slides.items.length;i++){const b=await P.export({slide:P.slides.items[i],format:'png',scale:1});await fs.writeFile(`${build}/visual-slide-${String(i+1).padStart(2,'0')}.png`,new Uint8Array(await b.arrayBuffer()));}
await fs.writeFile(build+'/visual_notes.json',JSON.stringify(scripts,null,2));
const candidate=build+'/visual-candidate.pptx';await(await PresentationFile.exportPptx(P)).save(candidate);
if(!draft){
 const tableOwners=[3,4,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31];
 const result=await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:process.env.OUTPUT_PPTX??root+'/finals-deck/Rewind_Amplify_Finals_Visual.pptx',pythonExecutable:py,integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit',...tableOwners.flatMap(n=>['--require-native-table-slide',String(n)])],explicitTotalSlideCount:31,requiredNativeChartOwnerSlides:[5,8,11],requiredNativeTableOwnerSlides:tableOwners,materializeLiteralChartWorkbooks:true,fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:process.env.OUTPUT_RECEIPT??build+'/visual_validation.json'});console.log(JSON.stringify(result));
}
console.log(JSON.stringify({draft,slides:P.slides.items.length,scriptCount:scripts.length}));
