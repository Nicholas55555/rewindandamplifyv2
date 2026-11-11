# Rewind & Amplify V2

**Predicting how hidden interactions change quantum measurement patterns—and asking those models about rare events.**

FGCU **Qubits** · Qiskit Fall Fest · November 2026

This is the continuation of [Rewind & Amplify](https://github.com/Nicholas55555/rewindandamplify). The centerpiece is a quantum recurrent state machine (**QRSM**): a physical hidden-state model that predicts sequences of measurement outcomes. We make that model reversible, use amplitude amplification to obtain selected histories more often, and check whether the returned answers remain accurate. Small versions ran on IBM quantum hardware.

The finals work adds independently checked numerical studies of detector errors, optical sensing, phase measurement and lithography-inspired processes. These extensions contain useful negative results as well as conditional benefits. **They are simulations and circuit constructions, not a validated laser diagnostic or fabricated chipmaking system. No practical quantum computational advantage is demonstrated.**

**[Presentation PDF](finals-deck/Rewind_Amplify_Finals_Visual.pdf) · [Editable PowerPoint](finals-deck/Rewind_Amplify_Finals_Visual.pptx) · [Presenter guide](finals-deck/Visual_Presenter_Guide.md) · [Research findings](RESEARCH_RESULTS.md) · [Repository guide](docs/REPOSITORY_GUIDE.md)**

## What is a click, and why care?

A **click** is a recorded `1` on the model's output qubit in one time step. In an optical interpretation it represents a detector event. On IBM, superconducting-qubit readout represents that role; these circuits did not detect optical photons. A single click is not a defect diagnosis.

The emitter and a hidden two-level partner retain memory between steps. Each observed bit conditions the model's quantum-state estimate, which determines probabilities for later observations. Across many records, classical fitting can compare candidate interactions and detector/noise models. This matters because an unwanted interaction can change a qubit's evolution before measurement, while a detector error can change the recorded outcome. Confusing them can bias an inferred state or coupling.

The original query asks: **given a click at step 3, how likely is another click at step 6?** Its exact answer is **4.67%** for the specified coupled-defect model and **10.10%** for the emitter-only model. These are deliberately programmed alternatives, not an unknown defect discovered in hardware. See the [reproduced conditional predictions](research-validation/original_after_click_verification.json).

Classical hidden-state models also capture history. The QRSM's physical structure must earn its value through calibrated predictions and comparisons; quantum notation alone is not an advantage.

## What we built

![One step of the original recurrent quantum model: drive, hidden coupling and output measurement](rewindandamplify-main/results/figures/fig_circuit_hybrid.png)

The original dynamic circuit measures and resets its output. To apply amplitude amplification, we instead retain a fresh output qubit at each step, preserving the information needed to reverse the **model circuit**.

| Part | Purpose | What must be checked |
|---|---|---|
| Retain the history | Replace resets with additional qubits so preparation can be undone | Agreement with the original outcome statistics |
| Steer the preparation | Make a supported event less rare through classical parameter tuning | Preservation of the desired conditional answer |
| Mark, rewind and amplify | Increase the probability of selected histories | Complete preparation, inverse and oracle costs |
| Use a local reflection | Reduce gate count in an approximate hardware-oriented variant | Conditional-distribution error, not just accepted shots |

Ideal full amplitude amplification preserves the conditional answer. Local reflection can bias it. At this small scale, an exact classical conditional sampler is faster. The potential computing question is whether larger hidden quantum memories could justify coherent queries after all preparation, accuracy and hardware costs are included.

## Actual IBM evidence

The featured comparison uses archived **IBM Kingston** results from 5 November 2026: the same steering and one amplification round, with 4,096 shots per circuit.

| Circuit | Raw matching shots | Compiled two-qubit gates | Readout-corrected conditional-history error (TVD) |
|---|---:|---:|---:|
| Steering + full reflection | 3,215 / 4,096 = **78.49%** | **85** | 0.069 |
| Steering + local reflection | 3,525 / 4,096 = **86.06%** | **40** | 0.055 |

The local variant returned more matching histories with fewer gates in this pair. A nearby repeat gave 78.61% versus 87.26% raw acceptance. **Physical-qubit placements and compiled circuits differed**, so this does not isolate reflection or gate count as the cause. TVD measures accepted-history distributions, not hidden-state fidelity; readout correction has its own calibration assumptions.

The [hardware evidence note](FINALS_EVIDENCE.md) separates raw counts, corrected estimates, repeats and simulated noise. [Archived counts and circuits](rewindandamplify-main/results/hardware/) and a [targeted reproduction](research-validation/hardware_verification.json) support the comparison. No new IBM jobs were submitted for the optical research.

## What the new research changed

All entries below are **synthetic studies or circuit construction**, separate from the IBM experiment. Full protocols, assumptions and uncertainty are in [Research findings](RESEARCH_RESULTS.md).

| Question | Result | Implication |
|---|---|---|
| Can readout dynamics masquerade as a hidden interaction? | Ignoring detector dead time fitted coupling **0.069** for synthetic truth **0.65**; modeling it gave **0.706** and better held-out prediction. Other parameters remained biased. | Model the detector before interpreting a defect. |
| Does an atomic reference improve frequency monitoring? | With unknown onset, detection within 32 s was **51.35%** for a conventional receiver, **58.02%** with an atomic channel and **97.97%** with a second conventional reference. Full-record false alarms were 5.42%, 5.16% and 4.06%. | The atomic channel adds information here; the stronger conventional comparator still wins. |
| Can the emitter records promptly diagnose drive amplitude? | A +20% field step gave **3.71%** detection within 32 bins, alongside **6.84%** false alarms over stable 96-bin records. A prior-only control explained most apparent estimation gain. | This operating regime is not a useful prompt monitor. |
| Can quantum light improve phase measurement? | At 20,000 mean object-incident photons, 81% overall efficiency and ideal preparation, a charged coherent/NOON hybrid gave global phase RMSE **0.00637 rad**, versus **0.00791 rad** for the specified coherent protocol. | A conditional benefit merits testing; loss, preparation time and phase ambiguity matter. |
| What does a complete spatial quantum query cost? | Two **389-qubit** circuits were constructed and read back, with **2.87–3.38 million** constructive generic CX upper bounds per complete round. | These unoptimized constructions expose costs hidden by a free-oracle assumption. The full state was not simulated. |

The exposure study also tests loss, blur, linear background and conventional illumination alternatives. Stronger fringe contrast does not establish a better manufactured feature, favorable dose or wafer yield. A lithography connection needs a compatible wavelength and monitoring point, measured source/detector response, strong conventional references and a measured link to exposure quality. The hypothetical 698 nm atomic study does not establish DUV/EUV compatibility.

**Semiconductor connection: quantum dots.** The [quantum-dot study](quantum_dot_bridge/README.md) makes the original QRSM question concrete: how can a hidden environment alter useful photon measurements? Our illustrative calculations show that equal counts and zero multiphoton emission can hide different interference quality, and that pair correlations matter even at fixed individual-photon frequency distributions. A separate [reanalysis of published GaAs histograms](quantum_dot_bridge/hom_analysis/README.md) exposes normalization sensitivity. These findings define measurement and calibration requirements for a proposed diagnostic of photon sources used in quantum photonic chips. The two-photon measurement model has not yet been implemented or fitted inside the QRSM; current dot analysis runs classically. No dot was fabricated, measured or microscopically diagnosed by our team.

## Try it without a quantum account

**Offline audience demo:** download or clone this repository, then open [`laser-diagnostics-app/index.html`](laser-diagnostics-app/index.html) in a local browser. No server, installation or internet is needed. GitHub displays HTML source rather than running the app. Keep the app folder intact.

- **Rewind the model** explains clicks, conditional predictions and amplification using verified saved outputs.
- **Current research** explores frequency, amplitude, phase, circuit-cost and quantum-dot results.
- **Earlier sensor study** preserves the separate known-midpoint experiment; its rates are not the new unknown-onset rates.
- **Check the evidence** links sources and provides short explanatory videos.

The [demo guide](laser-diagnostics-app/README.md) includes a 45-second walkthrough. Controls browse frozen results or explicitly labeled analytical formulas; they do not submit jobs or rerun the studies.

**Original Qiskit package:** use Python 3.10 or later in a virtual environment, then:

```bash
git clone https://github.com/Nicholas55555/rewindandamplifyv2.git
cd rewindandamplifyv2/rewindandamplify-main
python -m pip install -e ".[test]"
python -m pytest
python demo/demo.py
```

**App and public-package checks**, from the repository root with Node.js and Python installed:

```bash
node --test laser-diagnostics-app/test_model.cjs
python laser-diagnostics-app/check_package.py
python check_finals.py --public
```

Research followups used Python 3.12.10 and [recorded dependencies](research-validation/research_requirements.txt). See the [repository guide](docs/REPOSITORY_GUIDE.md) for separate study tests and reproduction instructions. Tests and local demos need no IBM credentials.

To create a local shareable bundle, run `python build_finals_pack.py --public`. It produces `Rewind_Amplify_v2_Public_Pack.zip` without publishing anything. The public edition omits private judging material and old local delivery archives.

## Find the work

| Location | Contents |
|---|---|
| [`rewindandamplify-main/`](rewindandamplify-main/) | Original QRSM package, experiments, classical baselines, reports and archived IBM results |
| [`finals-deck/`](finals-deck/) | Current 13-slide main talk plus 18 Q&A slides; planned 9:20 including the demo |
| [`laser-diagnostics-app/`](laser-diagnostics-app/) | Standalone offline demo and copied evidence |
| [`qrsm_photon_poc/`](qrsm_photon_poc/) | Emitter–cavity companion, inference, changing-drive diagnosis and coherent-history circuits |
| [`laser_sensor_viability/`](laser_sensor_viability/) | Finite-pulse atomic/reference model and newer unknown-onset monitoring study |
| [`quantum_lithography_poc/`](quantum_lithography_poc/) | Quantum-light exposure and separate phase-inspection models |
| [`quantum_dot_bridge/`](quantum_dot_bridge/) | Semiconductor photon-source coherence benchmark, cost accounting and bounded reanalysis of external HOM histograms |
| [`finals-lithography/`](finals-lithography/) | Spatial process models, classical baselines and reversible circuit construction |
| [`research-validation/`](research-validation/) | Reproduction tools, source hashes and scoped verification receipts |

## Team, prior work and AI assistance

- **Nicholas Taylor:** QRSM research, Grover fusion and experiments.
- **Timofey Yudintsev:** research and the keyword-search idea.
- **Dan Izquierdo:** experimentation.
- **Dillon Satria Sitepu:** formatting and revising.

The QRSM idea and exact physical filter predate the event. Amplitude amplification, quantum conditional inference and atomic laser-noise spectroscopy are established prior work. The project's contribution is the recurrent-model implementation, reversible-query mapping, hardware adaptations and the explicitly scoped experiments—not the invention of those underlying methods. The [original report and references](rewindandamplify-main/docs/REPORT.md) document the earlier work.

The original work used **Claude**. These extensions used **Codex with OpenAI models**, including collaborating agents for implementation, research review, tests, application and presentation work. “Independent checks” here means separate numerical implementations or code/scientific reviews within the project, not external peer review or independent laboratory replication.

Project code is [MIT licensed](LICENSE). Retained data and other third-party material have their own terms; see [Third-party notices](THIRD_PARTY_NOTICES.md). The original project's license is preserved.
