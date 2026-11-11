# Finals presenter guide

Use the Visual deck for the main talk. Slides 1–13 form the timed presentation; slides 14–31 are for Q&A. The planned finish is **9:20**, including the **45-second original QRSM application demo**, leaving 40 seconds before the 10-minute limit. Timing is a rehearsal plan, not a measured delivery time.

The thirteen speaking scripts contain approximately 1,221 words. Rehearse aloud with the actual handoffs, application switch and projector. The first nine slides explain the original quantum model and computation. Keep the science language below; shorten examples before removing material limitations.

## Before presenting

- Open the PPTX in the presentation machine’s slideshow software and test the display. The PDF is a static, image-based fallback and does not contain speaker notes.
- Open `laser-diagnostics-app/index.html` locally and select **Focus view**. Leave the original QRSM chapter visible with the selected event at step 3. The application requires no network.
- Keep `animations/laser-diagnostic-lenses.mp4` and `animations/rewind-amplify.mp4` available. These are silent explanatory videos, not recordings of a laboratory or quantum processor. The app evidence chapter has playback controls.
- Agree on speaker handoffs. The team roles on slide 13 reproduce the original README and were confirmed by the user. Suggested handoffs below are a rehearsal plan.
- Stop at slide 13. If switching to the application fails, use the screenshot on slide 9 and the conditional prediction chart on slide 5.

## Timing

| Slide | Time | Purpose |
|---:|---|---|
| 1 | 0:00–0:15 | Rewind & Amplify |
| 2 | 0:15–1:00 | Hidden defects can change the state before readout |
| 3 | 1:00–1:35 | A click is one recorded measurement outcome |
| 4 | 1:35–2:35 | The QRSM connects each bit to a hidden-state model |
| 5 | 2:35–3:20 | Hidden memory changes what follows a click |
| 6 | 3:20–4:05 | Rare conditions waste ordinary samples |
| 7 | 4:05–5:00 | A reversible model makes amplification possible |
| 8 | 5:00–6:00 | More matching answers with fewer gates |
| 9 | 6:00–6:45 | The query returns a prediction about the next clicks |
| 10 | 6:45–7:25 | Quantum dots connect semiconductors to photons |
| 11 | 7:25–8:10 | The classical reference leads with unknown onset |
| 12 | 8:10–8:50 | The evidence changes our next experiment |
| 13 | 8:50–9:20 | Our contribution and what we learned |

## Forty-five-second original-model demo

| Elapsed | Action | Explanation |
|---|---|---|
| 0–8 s | Point to the QRSM explanation | The model updates its hidden quantum-state estimate from the observed record. |
| 8–15 s | Show selected click at step 3 | The condition accepts any earlier history, not only the illustrative 0010 record. |
| 15–27 s | Change plain sampling to Steering + full | Acceptance increases, while the exact future prediction remains unchanged. |
| 27–38 s | Switch coupled memory to Emitter only | The known model alternatives predict different outcomes after the selected click. |
| 38–45 s | Explain the boundary and return to slides | Real diagnosis needs many records and calibrated competing models. More matching samples must preserve the answer. |

The two-bin cavity query is a separate optical extension available for questions. Do not present its 0.173% to 1.547% result as the original QRSM experiment. The app’s **Current research** chapter contains the new frequency, drive, phase and circuit-cost results. **Earlier sensor study** preserves the separate known-midpoint benchmark; its 86% atomic-fusion result is not the new unknown-onset result.

## Slide 1: Rewind & Amplify

**0:00–0:15**

We are Qubits from Florida Gulf Coast University. We model how hidden defects change quantum measurement patterns, then test a method for querying that model on IBM hardware. Laser diagnosis is a separate research extension.

**Stage cue:** Nicholas introduces the problem. First nine slides cover the original quantum computation.

## Slide 2: Hidden defects can change the state before readout

**0:15–1:00**

Why analyze defects? A hidden two-level system can exchange energy with a qubit or shift its frequency. Then the state evolves differently from the ideal circuit. We infer quantum behavior from repeated preparations and measurements. One readout does not reveal an arbitrary full quantum state. If our analysis ignores hidden dynamics or detector errors, we can assign the wrong cause to the observed statistics. Defect analysis can inform calibration, operating frequencies and device selection, helping preserve useful computation and interpret state estimates. Our project tests a modeling approach to that analysis. It has not diagnosed an unknown physical defect or performed complete state tomography.

**Stage cue:** Nicholas distinguishes physical state evolution from inference about that state. The QRSM models possible causes of the record.

## Slide 3: A click is one recorded measurement outcome

**1:00–1:35**

A click means the model output reads one in a time step. Zero means no click. This example reads zero, zero, one, zero: a click at step three. Our query selects that step alone and allows any earlier history. Optically, the bit represents a detector firing. On IBM, a superconducting qubit represents that output. The emitter and hidden qubit carry memory to the next step. This repeating model is a quantum recurrent state machine, or QRSM.

**Stage cue:** Trace the four columns left to right. Say “a recorded one,” before using “click” again.

## Slide 4: The QRSM connects each bit to a hidden-state model

**1:35–2:35**

The QRSM connects each observation to a physical hidden-state model. Each bit conditions the emitter and possible defect state, contributes to the record likelihood, and changes the next prediction. Across records, classical fitting compares coupling and noise settings. A fresh synthetic test shows why this matters. Ignoring detector dead time pushed inferred coupling from a true 0.65 to 0.069. Modeling the blind detector bin moved it to 0.706 and improved prediction on unused records. Other parameters stayed biased. A detector error can otherwise receive a false physical explanation. Classical hidden-state models also capture history, so the quantum structure must earn its value. Our IBM experiment uses a prepared zero state and known model settings. Grover then queries that model; it does not identify an arbitrary unknown state.

**Stage cue:** Nicholas explains the QRSM itself before any acceleration claim. Distinguish updating the state within a model from estimating the model parameters across many records.

## Slide 5: Hidden memory changes what follows a click

**2:35–3:20**

This is the useful prediction. Given a click at step three, how likely is another at steps four, five and six? With no hidden defect, the click resets the modeled emitter. With a coupled hidden qubit, memory survives and changes what follows. At step six, the two models predict about ten percent and five percent. Comparing these predictions with data can help evaluate a candidate mechanism. Here the model alternatives are deliberately specified. These curves show exact model behavior, not discovery of an unknown physical defect. They also explain why the history matters beyond an overall click count.

**Stage cue:** The audience should understand the two curves before hearing how Grover obtains the samples.

## Slide 6: Rare conditions waste ordinary samples

**3:20–4:05**

The selected click occurs in 3.95 percent of ideal runs. Ordinary rejection needs about 25 runs for one match, with cost growing as one over its probability. Amplitude amplification reduces coherent model calls to order one over the square root of that probability. That is the quantum rationale, not a wall-clock speedup. Our strongest classical baseline directly samples conditional answers without rejection and wins at this small size. The possible future opportunity is a hidden quantum memory that becomes expensive to represent classically, provided the reversible quantum circuit stays accurate. That crossover remains unproven.

**Stage cue:** Dan explains the fair classical comparison and why this remains quantum-computing research.

## Slide 7: A reversible model makes amplification possible

**4:05–5:00**

Grover must run the model backward, but a reset discards information. We replace each reset with a fresh output qubit and defer measurement. A prepares the histories. The oracle marks the selected condition. A dagger reverses the preparation. A reflection followed by preparation changes interference so matching histories become more likely. We then reduce hardware cost. Steering is classical tuning of a supported event. Local reflection checks fewer qubits but introduces approximation. We verify both event rate and conditional accuracy. Qiskit builds the circuits, Aer checks the exact model, and compiled circuits run on IBM. Amplification is established. Our contribution is this recurrent-model construction and its tested adaptations.

**Stage cue:** Dan explains A and A dagger. Nicholas explains the implementation changes and verification. Technical model circuit is in backup.

## Slide 8: More matching answers with fewer gates

**5:00–6:00**

On IBM Kingston, local reflection returned the selected event in 86.06 percent of raw shots, versus 78.49 percent for full reflection. Both use steering and one round. They compiled to 40 and 85 two-qubit gates. Gates consume scarce device operations and introduce errors. In this pair, the shorter circuit returns more accepted answers per executed gate. That is limited operation accounting, not dollar savings or a classical speedup. Conditional accuracy matters too. Corrected total variation distance is 0.055 versus 0.069, where lower is closer to the right distribution. Different physical placements confound the comparison. An archived repeat supports the pattern but does not isolate its cause. Reliable qubits are valuable because accurate answers require both a workable circuit and trustworthy measurements.

**Stage cue:** Dillon presents the result and cost limitation. Mention the repeat, with details available in backup.

## Slide 9: The query returns a prediction about the next clicks

**6:00–6:45**

In the app, we select a click at step three. Switching from plain sampling to full amplification raises acceptance while preserving the predicted future probabilities. Now switch the hidden-memory model to an emitter alone. The step-six probability changes from about five percent to ten percent. That is the answer we wanted: how a candidate hidden interaction changes later observations. These are saved, verified model calculations. The separate IBM data measure circuits representing those models. Neither is a live laser measurement, and amplification does not increase photons from a real source.

**Stage cue:** Timofey demonstrates for 45 seconds: 0–8 explain the QRSM role, 8–15 define the selected click, 15–27 choose Steering + full, 27–38 switch to Emitter only, 38–45 explain the diagnosis boundary and return to slides. Pre-open Focus view and the original QRSM chapter. Do not troubleshoot during the talk.

## Slide 10: Quantum dots connect semiconductors to photons

**6:45–7:25**

Quantum dots connect our emitter model to semiconductors. Confined states can emit single photons, and researchers have integrated such sources with photonic waveguides. For quantum computing, photon counts alone miss whether those photons interfere well. Our separate model holds brightness fixed while interference quality changes. That makes source characterization a concrete semiconductor application. Lithography adds a different question: light changes can alter the exposed pattern. Conventional monitors already exist. We test whether an atomic frequency reference adds useful information. That laboratory surrogate still needs a compatible design for lithography.

**Stage cue:** Nicholas makes the semiconductor connection explicit, then transitions to the separate atomic-frequency study. Quantum-dot spin qubits, colloidal dots and optically active emitters have different device physics. Use backups 30–31 for the model and external measurement evidence.

## Slide 11: The classical reference leads with unknown onset

**7:25–8:10**

The test hides when frequency changes and holds out simulated sessions. Can the monitor respond within 32 seconds? The conventional receiver detects 51.35 percent. Adding the atomic channel reaches 58.02 percent, a 6.67 point gain. A second independent conventional reference reaches 97.97 percent. False alarms below refer to the entire 128 second record, not each instant. We include missed events in the delay calculation. Degraded atomic coherence can reverse the benefit, and shared-path drift still mimics the source. These controls sharpen our conclusion: an atomic reference can add information in this model, but the conventional addition performs best. Apparatus resources are not fully matched.

**Stage cue:** Dillon explains the unknown onset and 32 second horizon before the percentages. Do not quote the earlier 86% known-time result here.

## Slide 12: The evidence changes our next experiment

**8:10–8:50**

In simulation, a 20 percent drive step gives only 3.71 percent detections within 32 bins and 6.84 percent false alarms per 96-bin stable record. Most amplitude-estimation gain comes from its prior, so this regime needs redesign. A separate phase simulation is promising: a charged hybrid reduces error from 0.00791 to 0.00637 radians at matched incident photons and ideal preparation. Loss and preparation time matter. Next, test a calibrated optical target with an independent reference. Computing also needs accurate answers at competitive total cost. Neither path has demonstrated a wafer benefit.

**Stage cue:** Nicholas states the negative amplitude result and the conditional phase opportunity. Save prior-control and ambiguity details for backups 25–26.

## Slide 13: Our contribution and what we learned

**8:50–9:20**

Our contribution is a queryable recurrent quantum model with tested hardware adaptations. Controls changed our conclusions: accuracy and total cost both matter. The documented team roles are here. The QRSM predates the event, and amplification is established prior work. We used Claude for the original work and Codex with OpenAI models for the extensions. We now have a tested computing question and clearer optical experiments to pursue. Thank you.

**Stage cue:** Nicholas closes. Slides 14 onward are Q&A only. The planned 9:20 finish leaves 40 seconds for handoffs or pauses. Rehearse to confirm the actual time.

## Numbers to defend in Q&A

- **What QRSM adds:** a physical hidden-state model that conditions its emitter/defect state on each observed bit, scores the record likelihood, and predicts later observations. Parameter fitting is classical. Classical hidden-state models also capture history, so physical structure must earn its value in comparisons.
- **Why defects matter for measurement:** hidden interactions can change state evolution before readout. Preparation and detector errors can also change counts. A validated dynamics/measurement model helps avoid misattributing those causes. This is not a shortcut to complete tomography or unique defect identification.
- **Fresh fitting evidence:** true synthetic coupling 0.65 was fitted as 0.069 when detector dead time was ignored and 0.706 when the blind-bin dynamics were modeled. The corrected model improves held-out likelihood, but other parameters remain biased or at a bound. Its advantage over a trained HMM is unresolved. This is synthetic inference, not discovery of a physical defect.
- **Click definition:** a measurement of 1 on the modeled output qubit in one dimensionless time step. Its optical interpretation is a detector event. IBM superconducting readout represents that role; the experiment did not detect optical photons.
- **Useful answer:** given step 3 = 1, the exact step-6 click probabilities are 4.6675% with the specified hidden defect and 10.1024% without it. These are known model alternatives, not an unknown physical defect discovered by the method.
- **Actual QPU result:** 3,525/4,096 raw matching shots for local reflection versus 3,215/4,096 for full reflection, with the same steering and one amplification round. Gate counts are 40 versus 85. Different physical layouts prevent a causal claim about reflection alone.
- **Current sensor task:** a randomly signed 0.5 Hz source step with hidden onset between 48 and 96 seconds in a 128-second synthetic record. Detection must occur within 32 seconds; prealarms and misses are penalized. Full-record false alarms and timely detection have different denominators and meanings. This is not industrial pulse monitoring.

| Method | Detection within 32 s | 95% hierarchical interval | False alarms per 128 s record | Restricted delay |
|---|---:|---:|---:|---:|
| Conventional C | 51.35% | 44.48–57.92% | 5.42% | 22.14 s |
| C + atomic Q | 58.02% | 51.25–64.53% | 5.16% | 20.78 s |
| C + independent C | 97.97% | 96.72–98.96% | 4.06% | 9.06 s |

The paired atomic-addition gain is 6.67 percentage points, with hierarchical 95% interval 3.96–9.38. Eight independently calibrated pipelines and 96 held-out sessions support the resampling structure. There are 1,920 null and 1,920 source records per scenario. Intervals quantify finite simulation variation, not physical model error or universal calibration coverage. Restricted delay assigns the 32-second horizon to misses and prealarms.

A second conventional reference remains the stronger comparator. The simulator matches acquisition duration and task, with assumed source-photon allocation. It does not match total apparatus costs or establish quantum advantage. The atomic support optics and reference lasers require additional accounting.

- **New sensor failures:** C + Q false source alarms rise to 84.53% for a primary-reference step and 94.11% for a shared-path step. The older atomic-drift 80.10% result belongs to the earlier known-time experiment and must not be mixed with this study.
- **Drive-amplitude test:** a +20% field step yields 3.71% detections within 32 bins, alongside 6.84% stable-record false alarms over 96 bins. Its prior-only estimate already achieves RMSE 0.1136; observations improve that to just 0.1125 for this case and worsen the other four source-changing cases. The prior control was added after holdout inspection and is descriptive.
- **Phase opportunity:** at 20,000 mean photons incident before the object, 81% overall efficiency and ideal preparation, a charged 10% coherent / 90% NOON hybrid has full-phase RMSE 0.00637 rad versus 0.00791 rad for the declared coherent protocol. Both sample modes are charged. Pure NOON has a global π ambiguity. Loss and preparation time limit the benefit; this is not a claim against every classical design.
- **Circuit-cost result:** a complete 49-cell spatial query was constructed as two 389-qubit circuits with 2.87–3.38 million constructive generic CX upper bounds. Both QPY files round-trip. These are unoptimized bounds, not routed counts or 389-qubit statevector results. The original independent-cell probability is tractable classically.
- **Exposure result:** an assumed two-photon resist shows stronger NOON contrast, but its best tested pattern accuracy requires more dose. Loss, blur and linear background erase benefits in several cases. No measured material, printed feature, chip yield or dollar saving is established.
- **Semiconductor connection:** optically active quantum dots can supply single photons to photonic circuits. Our illustrative emitter model holds brightness and ideal single-photon purity fixed while overlap changes from 1.0 to 0.5, 0.2 or 0.25 under declared dephasing and frequency mismatch. Those parameters were not fitted to a real device. Lowering per-photon survival from 80% to 20% requires 16 times as many attempts per surviving pair.
- **External GaAs measurements:** our separate peak-area reanalysis gives corrected HOM visibilities 0.8024, 0.8258 and 0.7724 at excitation separations 13.1, 26.2 and 39.4 ns. Conditional 95% intervals are [0.7943, 0.8113], [0.8181, 0.8344] and [0.7647, 0.7808]. These condition on counting/calibration assumptions and exclude normalization and other systematics. The co-only diagnostic gives 0.7938 for the last pair. The team did not collect these data, reproduce an exactly specified author pipeline or identify a microscopic defect.

## Backup slides

### 14. Hardware evidence and ablations

The complete set prevents the closer local-versus-full comparison from being confused with the older 87-versus 59 percent headline, which changed several factors at once. Raw rates, corrected rates, gate costs and conditional-distribution errors are separate quantities. Two nearby archived jobs are a repeat, not validation across many devices or days. The local ideal reflection already introduces conditional-history error before hardware noise.

**Sources:** FINALS_EVIDENCE.md and research-validation/hardware_verification.json. First job dbmfqlt8ft8s738uplmg. Repeat dbmfv758ft8s738upsdg. Repeat raw selected counts local3574/4096 and full3220/4096. Correction assumes independent single-qubit readout flips and clips estimates. Classical baselines are faster at this size.

### 15. Three optical bins expose the circuit cost

The optical extension now retains three flags and all environments before reversal. Both approximations pass every history-branch and conditional-state circuit check. The tighter approximation improves the selected-state error but nearly doubles gate count. It does not establish physical cavity convergence. The original untruncated-in-Choi cavity-two triple-click probability is 0.0147042 percent, while the retained laws differ. Exact classical recursion answers the last-click or all-click query with only three channel applications. A separate one-bin noise test reaches conditional-state error about 0.806 or 0.848 at the largest chosen gate noise, even though recorded acceptance increases. Those one-bin values are not the noise performance of this three-bin circuit.

**Sources:** qrsm_photon_poc/multibin_followup/README.md, main/ideal_0p03.json, main/ideal_0p003.json, main/validation.json and branch NPZ archives. Whole all-click query includes preparation, oracle, inverse, full reflection and replay. Genericu,cx costs exclude routing. Separate cavity cutoff audit in qrsm_photon_poc/followup/dynamics_results.json.

### 16. Sensor assumptions and resource accounting

The atomic response follows finite driven Bloch rotations with T1/T2 damping, preparation error, asymmetric readout error and binomial projection noise. Optical intensity changes the Rabi frequency and induces an assumed light shift during pulses. Conventional receivers include source-photon shot noise, electronics and reference drift. All methods see the same underlying source task and duration. The photon allocation is a declared assumption: atomic coupling and beam geometry are not specified from a real apparatus, and reference lasers plus atomic support optics are not included in a full cost comparison. Therefore this is not a resource-matched quantum advantage test.

**Sources:** laser_sensor_viability/results.json config and resource_ledger supply the unchanged physical model. New task: followup/README.md, protocol.json and main/results.json. Unknown source onset48–96s, eight independently trained/calibrated pipelines, held-out sessions. Whole-record alarm calibration, misses and prealarms charged32sin restricted delay. Bishof etal., PRL111093604, https://arxiv.org/abs/1303.6741 is physical precedent, not chosen device specifications.

### 17. Calibration failures can reverse the conclusion

These are the new unknown-onset results. Each cell gives timely detection followed by full-record false alarms. The target is source-frequency change, so a sensor/reference/path change can trigger a false source diagnosis. Shorter atomic coherence makes the fused channel worse than C alone. A separate agreement veto reduces the primary-reference failure but sacrifices sensitivity and still exceeds the nominal alarm target. Shared-path drift is structurally indistinguishable from source motion in this measurement model. Hierarchical pipeline/session intervals quantify finite simulation variation, not physical model error or calibrated universal coverage. None of the older known-midpoint rates belong in this table.

**Sources:** laser_sensor_viability/followup/main/results.json and README.md. New primary-reference CQFAR84.53%, common-path94.11%. Agreement rule15.57% and68.23%, respectively. Nominal CQgain6.67pp, shortcoherence−5.42pp. Eight pipelines and96test sessions per scenario.

### 18. Detector dead time can distort inferred coupling

After a click, the next recorded bit is forced to zero while the underlying system evolves unconditionally. Ignoring that readout process misattributes detector correlation to the hidden interaction. Including it improves held-out log likelihood by 0.4584 nats per 24-bin record, with paired conditional 95%interval 0.3978–0.5210. The fitted coupling moves closer to the known synthetic value, but dephasing reaches its upper bound and efficiency remains biased. A trained HMM captures the detector correlation too: the corrected physical model’s advantage over it is unresolved. Other physical parameters and the family remain known. This fresh result replaces the earlier truth-informed candidate-count example in the current deck.

**Sources:** qrsm_photon_poc/followup/README.md, inference_results/fixed_411101_dead1_fit0.json, fixed_411101_dead1_fit1.json, parameter_validation_v2/ and independent_review.json. The HMM difference interval for the corrected model is−.0067to+.0222nats/record.

### 19. Where the quantum component enters

A sensor can use quantum dynamics while a classical computer processes its readouts. The Ramsey benchmark is simulated classically and uses classical inference. The quantum-computing component is the separate recurrent-model rare-history query. Connecting a calibrated realistic sensor model to coherent preparation and an oracle is further work. No end-to-end quantum advantage has been demonstrated.

**Sources:** LASER_DIAGNOSTICS_ROADMAP.md, laser_sensor_viability documentation, qrsm_photon_poc/README.md and FINALS_EVIDENCE.md.

### 20. The transfer to lithography needs its own test

The distinction matters. A CO2 drive laser heats tin to create plasma, which emits EUV. Monitoring the drive is different from measuring EUV. A narrow-line 698 nm atomic benchmark does not automatically transfer to either of those signals or to a 193 nm broadband pulsed excimer source. Existing conventional monitoring measures relevant source quantities. Cymer and imec reported controlled wafer experiments correlating light-source changes with critical-dimension behavior. That motivates source metrology, not a quantitative yield claim for our sensor. Atomic laser-noise metrology is also established prior work, including Bishof and colleagues in 2013.

**Sources:** ASML: https://www.asml.com/en/technology/lithography-principles/light-and-lasers and https://www.asml.com/en/products/euv-lithography-systems. Cymer/imec2014: https://www.cymer.com/wp-content/uploads/2018/12/Cymer_SPIE_AdvancedLithography_2014.pdf. Bishof etal.: https://arxiv.org/abs/1303.6741.

### 21. The continued query also ran on IBM

These circuits amplify the step-three click and then continue the original machine through step six. The hidden-defect circuit retained 290 plainshots and 3354 steeredlocalshots, while the no-defect circuit retained 503 and 3748. More accepted shots improve counting precision but hardware bias remains. In particular, the amplified hidden-defect step-six rate 6.887 percent exceeds the exact 4.667 percent. Layouts, widths and depths differ. The table is raw data, with the repeat and readout-corrected values available in the evidence. It is a test of deliberately programmed model alternatives, not discovery of unknown hardware or laser defects.

**Sources:** research-validation/original_after_click_verification.json hardware_jobs[0]. Archived raw_plain.json jobdbmfqlt8ft8s738uplmg. Reproduced circuit conditional probabilities and independent raw-count extraction. No significance claim, hidden-state tomography or physical optical timing.

### 22. One step of the recurrent quantum model

The emitter rotates under a drive. A hidden qubit rotates under its detuning and exchanges excitation with the emitter. The emitter then exchanges with a fresh output qubit. The dynamic implementation measures and resets that output each step. The purified implementation retains it, so the environment and history required for reversal remain in the circuit. This trades extra qubits for reversibility. Model steps are dimensionless. The optical labels describe a model interpretation. These IBM circuits did not measure photon arrivals.

**Sources:** Original fig_circuit_hybrid.png, qrsm_grover/model.py and tests. QRSM defaults theta=.6,gamma=.2,phi=(.45,),zeta=(.3,).

### 23. Judging rubric and evidence map

This map follows the supplied Qiskit Fall Fest judging rubric. Exceptional performance asks for a specific stakeholder and realistic impact, a defensible quantum rationale that considers classical alternatives and hardware scale, reproducible Qiskit implementation, rigorous comparisons, a clear contribution relative to reused ideas, accessible delivery within the time limit, and shared understanding. The hardware bonus is a separate highest-tier item, not an additive sum of all tier values. We do not predict a judge score.

**Sources:** User-supplied Qiskit_Fall_Fest_Judging_Rubric.xlsx, extracted by root. FINALS_RUBRIC.md.

### 24. Contribution, prior work and AI assistance

The original README documents the team research timeline and Claude assistance. The team set the original direction and questions and reviewed the work. This finals revision uses Codex and OpenAI models to assist research review, reproduction, simulations, tests, application and presentation. Do not imply that every generated analysis has already received manual team verification. Amplitude amplification and Bayesian quantum inference are prior art. Atomic laser-noise spectroscopy is also prior art. The separate optical and sensing extensions test scoped feasibility questions and do not establish an end-to-end quantum computing advantage.

**Sources:** Original README PriorworkandAIhelp and Team. Brassardetal https://arxiv.org/abs/quant-ph/0005055. Lowetal https://arxiv.org/abs/1402.7359. Bishofetal https://arxiv.org/abs/1303.6741.

### 25. Drive amplitude: a useful negative result

The field-amplitude proxy is the drive parameter, not an incident-photon flux. A20 percent field step would correspond to 44 percent intensity under fixed coupling. This low-count regime yields poor timely detection alongside substantial full-record false alarms. The physical filter, fitted HMM and count detector share the same bits; these are not independent engineered optical receivers. The post-holdout prior-only control exposes a weak constant-estimate comparison: for this step, using observations only slightly improves the prior estimate, and for the four other source-changing cases it makes estimation worse. Afterpulsing produces 10.55 percent false source alarms. The model needs a better operating regime and calibrated detector dynamics before a practical monitor claim.

**Sources:** qrsm_photon_poc/drive_diagnostics_followup/README.md; main/results.json, prior_only_estimation_control.json, independent_review.json, prior_only_independent_review.json. Four separately calibrated pipelines,13cases,128records per pipeline/case,96bins/cavity4. Stable FAR35/512 and step timely19/512 for physical QRSM. Prior-only MSE minus observed-data MSE .00025149, paired interval [.00007878,.00044596] for this step, a small conditional effect. Prior supplement is post-holdout descriptive, not another confirmatory test.

### 26. Phase inspection: benefit depends on the budget

A doubled fringe has a pi ambiguity. Pure NOON performs well locally around a shared calibrated working point, but fails to identify the full phase globally. A charged coherent pilot resolves that ambiguity in the tested hybrid. Both sample modes illuminate the object; the resource is 20,000 mean photons before object transmission, including reference-arm photons. The high-efficiency case has 90 percent object transmission and 90 percent detection, with ideal preparation. Lower transmission removes the precision benefit. At one-percent preparation, matching dose requires 100 times longer for pure NOON; at fixed clock time its precision is worse. Ideal number-resolving detection, a known phase reference and the declared classical protocol bound this result. It is not superiority over all classical designs or a measured feature-size benefit.

**Sources:** quantum_lithography_poc/phase_inspection_followup/README.md and results.json high_efficiency/equal_sample_photons. Pure NOON modulo-pi RMSE .0062646rad, full2piRMSE2.226739rad. Hybrid.00637086rad, coherent.007908rad,2000outcomes per protocol in each cohort. Zero errors gives95%Wilson upper bound.1917%. Global phases reused across methods; outcomes independently drawn. Separate equal-clock and equal-dose budgets.

### 27. The full spatial query is costly to construct

This is an actual constructed reversible 49-cell oracle, not an extrapolation from three cells. Four count qubits per cell encode a capped Poisson law,23 bits accumulate the weighted score, and 170 extra clean ancillas support explicit reversible gates. Both 389 qubit circuits pass QPY serialization and independent structural, arithmetic and uncomputation checks. The CX values are constructive generic decomposition upper bounds, including preparation and one complete amplification round; they are not a routed device compilation. Rounding and capped-tail bounds bracket the original event, with relative bracket width 0.2406 percent at dose 1.5 and 0.3526 percent at dose 1.8. Classical dynamic programming already solves this independent-cell distribution efficiently. Construction alone establishes neither computational advantage nor physical lithography feasibility.

**Sources:** finals-lithography/full_spatial_circuit/README.md, results.json, process_bounds.py, independent_review.json. Floor and ceiling clean circuits389qubits; CX bounds3,382,108/2,874,028 and U5,050,537/4,288,741. Dose1.5 original event bracket [.004226948015,.004237128599]; conservative conditionalTVbound.00482. Cap15 value change usesPoisson tailN>=16, encoded cap probabilityusesN>=15. Check row direction against event interval: floor weights admit an upper event; ceiling weights give a lower event.

### 28. Exposure: contrast trades against dose and loss

The response combines declared linear and two-photon activation coefficients, loss, phase jitter, finite pixel collection and post-activation blur. Activations are rare Poisson events, not direct photon probabilities. The NOON pattern has stronger mean contrast and higher best guard-cell accuracy under the nominal assumptions, but requires more incident photons at its best tested dose. The duty-cycle comparator concentrates equal average photons into ten-percent active time, giving higher peak intensity. It is one explicit classical competitor, not an optimum over all illumination. Loss, blur, linear leakage, background and low preparation success degrade the result. The 20 guard cells exclude boundary cells. This is a sensitivity study of an assumed resist, not a prediction for an available material or fabricated feature.

**Sources:** quantum_lithography_poc/exposure_followup/README.md and results.json finite_nominal. Table optimizes each method over tested doses, so it is not a single equal-dose operating point. G1/G2 supplement verifies spatial conservation and harmonic/per-photon accounting. 540,000Poisson realizations. Wavelength800nm, ±30degree modes, second harmonic400nm; period is not linewidth. Independent or fast phase jitter/mean-rate approximation excludes slow correlated phase drift.

### 29. Model accuracy is part of the resource budget

The original optical circuit uses only two cavity levels. Comparing its conditional predictions with a six-level reference reveals errors of several percentage points, especially under stronger drive. Increasing the cutoff reduces the discrepancy in these cases, but raises state and circuit costs. Six fresh joint-inference cases fit five parameters with source and detector controls. Fixed settings do not resolve performance versus an HMM; controlled settings give small held-out gains under shared known physics. Fixed-drive detuning sign remains structurally ambiguous. Controlled settings break that exact symmetry but do not establish reliable finite-data sign identification. Local curvature intervals fail near boundaries and are not global uncertainty guarantees. Thermal, multimode and non-Markovian effects remain future model families.

**Sources:** qrsm_photon_poc/followup/README.md, dynamics_results.json, inference_results/, parameter_validation_v2/ and independent_review.json. Max after-click error over tested later lags versus cavity dimension6. Master equation independently checked with QuTiP; trajectory statistics tested separately. Controlled model-HMM logscore gains .0574[.0158,.1014] and .0972[.0448,.1495]nats/24-binrecord under conditional bootstrap. This does not establish physical defect identification or a quantum computational speedup.

### 30. Equal photon counts can hide poor interference

The model separates brightness, single-photon character and indistinguishability. Each excitation emits exactly one photon, and each has 20 percent survival, so brightness and ideal g 2(0) are identical by construction. Pure dephasing or differential frequency shifts change the density-operator overlap. For a balanced beamsplitter, coincidences per attempted excitation pair are eta squared times one minus overlap, divided by two. More coincidences here indicate worse interference. A classical two-state frequency environment also changes pair overlap while preserving each photon frequency marginal. Those offsets are quasi-static within each wavepacket; they are not a diagnosed microscopic trap. Loss matters independently: lowering per-photon survival from 80 to 20 percent raises attempts per surviving pair from 1.5625 to 25. The result motivates interference-sensitive source measurements, not a quantum advantage claim.

**Sources:** quantum_dot_bridge/results.json benchmark_cases, classical_trap_pair_comparison and loss budget; PROTOCOL.md; independent_review.json. Illustrative lifetime1ns. Cases gamma_star/Gamma and differential angular detuning/Gamma: (0,0),(.5,0),(0,2),(.5,2). Ideal g2(0)=0 imposed. Sixteen focused tests, direct two-photon beamsplitter check and independent wavepacket-kernel quadrature. Real semiconductor photon-source integration precedent: Davancoetal2017 https://www.nist.gov/publications/heterogeneous-integration-chip-quantum-photonic-circuits-single-quantum-dot-devices. External GaAs HOM data are separate, not fitted by this model.

### 31. External GaAs data: a conditional reanalysis

These are external Hong–Ou–Mandel histograms, not team measurements. We normalize each central peak by the mean of four side peaks, then compare the co-polarized and cross-polarized acquisitions. We apply the published splitter and multiphoton correction. The quoted intervals condition on independent Poisson counting, fixed timing registration and shared Gaussian calibration uncertainties. They exclude polarization, routing and drift systematics. Our estimates are close to the paper’s reported 0.803,0.826 and 0.774, but exact author integration windows and normalization are unavailable. This is therefore a separate conditional reanalysis. At 39.4 nanoseconds, the alternative co-only normalization gives 0.7938 rather than 0.7724. Sensitivity to that choice prevents a microscopic defect or noise-rate inference. No monotonic decay or improved device performance follows from these three measurements.

**Sources:** quantum_dot_bridge/hom_analysis/results.json, PROTOCOL.md and independent review. Dataset https://doi.org/10.5281/zenodo.6337697, CC BY4.0, by Julian Munzberg, Franz Draxl, Saimon Filipe Covre da Silva, Yusuf Karli, Santanu Manna, Armando Rastelli, Gregor Weihs and Robert Keil. Paper https://arxiv.org/html/2203.08682v1 SectionIV Eqs3–4. Quoted paper V=.803(.005),.826(.004),.774(.004) remain separate. Our primary extraction uses half-open windows of half-width2ns, no background subtraction, reference cycle indices−2,−1,+1,+2 and200000Monte Carlo draws. R=.514±.007,g2=.016±.001, assumed independent but shared across separations. Data hashes verified against reference_hom/provenance_manifest.json. These aggregate histograms cannot provide original QRSM binary histories or uniquely identify charge traps.

## Rebuilding

The editable deck is authored by `.finals-deck-build/visual_build.mjs` with the bundled `@oai/artifact-tool` runtime. The root resolves relative to that file. `PRESENTATIONS_SKILL_DIR`, `RUNTIME_PYTHON`, `OUTPUT_PPTX` and `OUTPUT_RECEIPT` can override the authoring environment and output destinations. Link the build directory’s `node_modules` to the installed bundled Node packages. Use `--draft` for previews. Finalization intentionally refuses to overwrite an existing final PPTX or receipt; use new output filenames for a revision.

The build reads the verified original after-click evidence, frozen research results, archived hardware summary, two original circuit figures, optical cover asset and original-core app screenshot. It performs no hardware jobs. The renderer and finish scripts create the checked slide PNGs, static PDF, guide and manifest. Source hashes in the manifest identify the evidence used. The previous decks are preserved in `archive/pre_research_2026-11-11/` and `archive/pre_quantum_dot_2026-11-11/`.
