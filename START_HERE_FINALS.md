# Rewind & Amplify finals handoff

Current presentation revision: **11 November 2026**, incorporating the completed research followups. Team: FGCU Qubits. Finals: Saturday 14 November at FAU. The team's speaking limit is ten minutes.

## Open these first

1. **Presentation:** finals-deck/Rewind_Amplify_Finals_Visual.pptx. Slides 1–13 are the main talk, followed by technical backups. Planned delivery is **9:20**, including a **45-second original QRSM demo**, with 40 seconds before the limit.
2. **Presenter guide:** finals-deck/Visual_Presenter_Guide.md. Use its current narration, timing, sources and handoffs. The same notes are embedded in the PowerPoint.
3. **Offline application:** laser-diagnostics-app/index.html. Keep its folder together. Start on the original QRSM chapter and select **Focus view**. **Current research** supports questions. The earlier sensor study remains explicitly labeled.
4. **Fallbacks:** finals-deck/Rewind_Amplify_Finals_Visual.pdf and the MP4s in animations/. The PDF is a static visual fallback without notes. The two 12-second silent videos explain concepts from earlier optical/sensing extensions; they are not current benchmark evidence or laboratory recordings.
5. **Portable presentation pack:** Rewind_Amplify_Finals_Visual_Pack.zip. Extract before opening the app. A separate Rewind_Amplify_Research_Followups.zip retains the checked research snapshot and its full circuit artifacts.

No account, server, Wi-Fi or live quantum processor is needed. Native PowerPoint playback, the projector and actual speaking time still need a rehearsal on the presentation computer. Prior root support documents and the previous portable pack are preserved in finals-archive/2026-11-11-before-research-update/.

## The original quantum-computing story

A click is a detection recorded as one in a time bin. It does not label a defect. On IBM hardware, superconducting qubits represent the emitter, hidden memory and output of a model.

The **QRSM supplies a physical model to test**. Each observed bit conditions its hidden state, which predicts later outcomes. Record likelihoods allow classical fitting and comparison of interactions, noise and detector behavior. Hidden interactions can change a state before readout, while detector imperfections can change the reported outcome. Both matter when interpreting repeated measurements. This project does not perform arbitrary state tomography or establish discovery of an unknown physical defect.

The useful original query is: **given a click at step 3, what happens later under each candidate model?** The exact example predicts a step-6 click probability of **4.67% with the modeled hidden defect versus 10.10% without it**. All earlier histories are allowed. These are specified-model predictions, not a physical diagnosis.

Rejection sampling wastes model runs that miss the selected event. Retained history qubits make preparation reversible, allowing amplitude amplification to return matching histories more often. Full ideal amplification preserves the conditional answer. Local reflection saves gates but is approximate, so both matching rate and answer accuracy must be checked. Direct classical methods are faster at the tested scale.

The featured archived IBM Kingston pair produced **3,525/4,096 versus 3,215/4,096 raw matches**, using **40 versus 85 compiled two-qubit gates**. Readout-corrected conditional-history TVDs were **0.0553 versus 0.0690**. Placements differed. These measurements support a gate/accuracy tradeoff, not dollar savings, current quantum advantage or an isolated causal effect of reflection choice. FINALS_EVIDENCE.md traces the experiments.

## What the new research changes

| Finding | Meaning for the presentation |
|---|---|
| Detector-aware inference | Ignoring dead time gave coupling 0.069 for synthetic truth 0.65; including it gave 0.706 and better predictions. Other parameters remained uncertain. |
| Unknown-onset frequency monitor | Timely detection is 51.35% with the conventional baseline, 58.02% with an atomic addition and 97.97% with a second conventional reference. Full-record false alarms are 5.42%, 5.16% and 4.06%. |
| Effective-drive amplitude monitor | In 96 arbitrary-time bins, +20% field-step detection within 32 bins is only 3.71%, with 6.84% stable-source false alarms. Most estimation improvement over a constant comes from the assumed positive prior. |
| Optical phase inspection | A fully charged hybrid gives 0.00637 rad global RMSE versus 0.00791 for the specified coherent comparator at 20,000 mean object-incident photons, 81% transmission/detection efficiency and 100% modeled preparation success. This does not establish feature inspection or wafer yield. |
| Full process circuit | Explicit 389-qubit constructions have 2.87–3.38 million generic CX gates as constructive upper bounds. Components and serialized wiring were checked; the full state was not simulated. Strong classical methods already solve this model. |

The new frequency study searches an unknown onset and scores the first alarm within a delay budget. The earlier app study knows the event time and uses different windows and calibration. Its 85.98% detection, 0.161 Hz RMSE and 80.10% atomic-drift false alarms must stay labeled as earlier results.

For inspection, preparation failure costs time at equal dose. At 1% pair-source success, the pure NOON probe takes 100 times as long as the coherent reference to match dose; the 10/90 hybrid takes 90.1 times as long under its fixed photon allocation. The benefit disappears in the tested equal-time case. Greater loss can remove even the equal-dose precision benefit. Direct quantum-light exposure remains a separate sensitivity study with hypothetical material coefficients and no printed structures.

## Ten-minute delivery and judge questions

The first nine slides explain the original problem, click, QRSM update, conditional answer, reversible query and archived hardware. Use the 45-second original-model demo, then return to the deck. The remaining four main slides motivate chipmaking diagnosis, present the current frequency comparison, explain the research decisions and close with documented contributions.

Stop at slide 13. Use backups and **Current research** for amplitude/prior controls, phase ambiguity, cutoff/identifiability, exposure and full-grid resources. If switching windows is awkward, use the slide's static original-query screenshot. Videos are optional conceptual fallbacks.

The documented roles remain Nicholas Taylor (QRSM/Grover and experiments), Timofey Yudintsev (research and search idea), Dan Izquierdo (experiments), and Dillon Satria Sitepu (formatting/revision), as confirmed by the user. Do not assign new AI-assisted work to a person without confirming it. FINALS_QA.md supplies shared answers and FINALS_RUBRIC.md maps all seven supplied criteria.

Before Saturday, rehearse aloud with all handoffs and the actual computer. Confirm event start time, Q&A, submission format and any rubric changes with the organizers. The written schedule is a plan rather than a measured rehearsal.

## Evidence and next steps

Run **python check_finals.py** from this folder for presentation/package and offline-evidence checks. It does not replace rehearsal. RESEARCH_RESULTS.md indexes the studies; their protocols, raw results and independent checks remain in the research directories. The prior research snapshot's statement that the finals deck was unchanged describes that earlier handoff; this revision now incorporates its conclusions.

No new IBM API key or job is needed. Hardware can test a justified shallow circuit; it cannot validate optical coupling, detector calibration or material response. A practical diagnostic claim needs a compatible monitoring point, a defined measurand/bandwidth, synchronized conventional reference data and blinded source/nuisance changes. A chipmaking claim additionally needs measured source-to-process and material-response data. No yield, downtime or financial savings have been measured.
