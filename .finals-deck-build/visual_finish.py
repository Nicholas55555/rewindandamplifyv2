"""Package the reviewed slide renders as a static PDF and timed presenter guide.

Run after visual_build.mjs and visual_render_final.mjs. This does not author PPTX.
"""
from pathlib import Path
import hashlib
import json
import re
import zipfile
from xml.etree import ElementTree as ET
from reportlab.pdfgen import canvas
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent.parent
BUILD = ROOT / '.finals-deck-build'
OUT = ROOT / 'finals-deck'
STEM = 'Rewind_Amplify_Finals_Visual'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    deck = OUT / (STEM + '.pptx')
    with zipfile.ZipFile(deck) as z:
        slide_names = sorted((n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml', n)),
                             key=lambda n: int(re.search(r'slide(\d+)', n).group(1)))
        notes_count = sum(bool(re.fullmatch(r'ppt/notesSlides/notesSlide\d+\.xml', n)) for n in z.namelist())
        native_chart_count = sum(bool(re.fullmatch(r'ppt/(?:slides/)?charts/chart\d+\.xml', n)) for n in z.namelist())
    scripts = json.loads((BUILD / 'visual_notes.json').read_text(encoding='utf-8'))
    main_scripts=[x for x in scripts if x['time'] != 'Backup']
    main_count=len(main_scripts)
    total_count=len(scripts)
    assert len(slide_names) == notes_count == total_count == 29
    assert main_count == 13 and scripts[:main_count] == main_scripts
    endpoint=0
    for x in main_scripts:
        start,end=x['time'].split('–')
        seconds=lambda t:sum(int(v)*m for v,m in zip(t.split(':'),(60,1)))
        assert seconds(start)==endpoint, f'Timing gap: {x}'
        endpoint=seconds(end)
    assert endpoint==560
    pdf = OUT / (STEM + '.pdf')
    c = canvas.Canvas(str(pdf), pagesize=(960, 540), pageCompression=1)
    c.setTitle('Rewind & Amplify — FGCU Qubits — Finals')
    c.setAuthor('FGCU / Qubits')
    for i in range(1, total_count+1):
        image = BUILD / f'visual-final-slide-{i:02}.png'
        assert image.is_file(), image
        c.drawImage(str(image), 0, 0, 960, 540)
        c.showPage()
    c.save()
    assert len(PdfReader(str(pdf)).pages) == total_count
    words = sum(len(re.findall(r'\b[\w-]+\b', x['text'])) for x in main_scripts)
    guide = [
        '# Finals presenter guide', '',
        'Use the Visual deck for the main talk. Slides 1–13 form the timed presentation; slides 14–29 are for Q&A. The planned finish is **9:20**, including the **45-second original QRSM application demo**, leaving 40 seconds before the 10-minute limit. Timing is a rehearsal plan, not a measured delivery time.', '',
        f'The thirteen speaking scripts contain approximately {words:,} words. Rehearse aloud with the actual handoffs, application switch and projector. The first nine slides explain the original quantum model and computation. Keep the science language below; shorten examples before removing material limitations.', '',
        '## Before presenting', '',
        '- Open the PPTX in the presentation machine’s slideshow software and test the display. The PDF is a static, image-based fallback and does not contain speaker notes.',
        '- Open `laser-diagnostics-app/index.html` locally and select **Focus view**. Leave the original QRSM chapter visible with the selected event at step 3. The application requires no network.',
        '- Keep `animations/laser-diagnostic-lenses.mp4` and `animations/rewind-amplify.mp4` available. These are silent explanatory videos, not recordings of a laboratory or quantum processor. The app evidence chapter has playback controls.',
        '- Agree on speaker handoffs. The team roles on slide 13 reproduce the original README and were confirmed by the user. Suggested handoffs below are a rehearsal plan.',
        '- Stop at slide 13. If switching to the application fails, use the screenshot on slide 9 and the conditional prediction chart on slide 5.', '',
        '## Timing', '',
        '| Slide | Time | Purpose |', '|---:|---|---|',
    ]
    for i, x in enumerate(main_scripts, 1):
        guide.append(f'| {i} | {x["time"]} | {x["title"]} |')
    guide += ['', '## Forty-five-second original-model demo', '',
              '| Elapsed | Action | Explanation |', '|---|---|---|',
              '| 0–8 s | Point to the QRSM explanation | The model updates its hidden quantum-state estimate from the observed record. |',
              '| 8–15 s | Show selected click at step 3 | The condition accepts any earlier history, not only the illustrative 0010 record. |',
              '| 15–27 s | Change plain sampling to Steering + full | Acceptance increases, while the exact future prediction remains unchanged. |',
              '| 27–38 s | Switch coupled memory to Emitter only | The known model alternatives predict different outcomes after the selected click. |',
              '| 38–45 s | Explain the boundary and return to slides | Real diagnosis needs many records and calibrated competing models. More matching samples must preserve the answer. |', '',
              'The two-bin cavity query is a separate optical extension available for questions. Do not present its 0.173% to 1.547% result as the original QRSM experiment. The app’s **Current research** chapter contains the new frequency, drive, phase and circuit-cost results. **Earlier sensor study** preserves the separate known-midpoint benchmark; its 86% atomic-fusion result is not the new unknown-onset result.', '']
    for i, x in enumerate(main_scripts, 1):
        guide += [f'## Slide {i}: {x["title"]}', '', f'**{x["time"]}**', '', x['text'], '',
                  '**Stage cue:** ' + x['cue'], '']
    data = json.loads((ROOT / 'laser_sensor_viability/followup/main/results.json').read_text())
    methods = next(x for x in data['scenarios'] if x['id']=='unseen_nominal_sessions')['methods']
    guide += ['## Numbers to defend in Q&A', '',
              '- **What QRSM adds:** a physical hidden-state model that conditions its emitter/defect state on each observed bit, scores the record likelihood, and predicts later observations. Parameter fitting is classical. Classical hidden-state models also capture history, so physical structure must earn its value in comparisons.',
              '- **Why defects matter for measurement:** hidden interactions can change state evolution before readout. Preparation and detector errors can also change counts. A validated dynamics/measurement model helps avoid misattributing those causes. This is not a shortcut to complete tomography or unique defect identification.',
              '- **Fresh fitting evidence:** true synthetic coupling 0.65 was fitted as 0.069 when detector dead time was ignored and 0.706 when the blind-bin dynamics were modeled. The corrected model improves held-out likelihood, but other parameters remain biased or at a bound. Its advantage over a trained HMM is unresolved. This is synthetic inference, not discovery of a physical defect.',
              '- **Click definition:** a measurement of 1 on the modeled output qubit in one dimensionless time step. Its optical interpretation is a detector event. IBM superconducting readout represents that role; the experiment did not detect optical photons.',
              '- **Useful answer:** given step 3 = 1, the exact step-6 click probabilities are 4.6675% with the specified hidden defect and 10.1024% without it. These are known model alternatives, not an unknown physical defect discovered by the method.',
              '- **Actual QPU result:** 3,525/4,096 raw matching shots for local reflection versus 3,215/4,096 for full reflection, with the same steering and one amplification round. Gate counts are 40 versus 85. Different physical layouts prevent a causal claim about reflection alone.',
              '- **Current sensor task:** a randomly signed 0.5 Hz source step with hidden onset between 48 and 96 seconds in a 128-second synthetic record. Detection must occur within 32 seconds; prealarms and misses are penalized. Full-record false alarms and timely detection have different denominators and meanings. This is not industrial pulse monitoring.', '',
              '| Method | Detection within 32 s | 95% hierarchical interval | False alarms per 128 s record | Restricted delay |',
              '|---|---:|---:|---:|---:|']
    for key, label in [('classical','Conventional C'),('classical_quantum','C + atomic Q'),('two_classical','C + independent C')]:
        m=methods[key]; lo,hi=m['detection_within_32s_ci95']
        guide.append(f'| {label} | {100*m["detection_within_32s"]:.2f}% | {100*lo:.2f}–{100*hi:.2f}% | {100*m["false_alarm_rate"]:.2f}% | {m["restricted_delay_s"]:.2f} s |')
    guide += ['', 'The paired atomic-addition gain is 6.67 percentage points, with hierarchical 95% interval 3.96–9.38. Eight independently calibrated pipelines and 96 held-out sessions support the resampling structure. There are 1,920 null and 1,920 source records per scenario. Intervals quantify finite simulation variation, not physical model error or universal calibration coverage. Restricted delay assigns the 32-second horizon to misses and prealarms.', '',
              'A second conventional reference remains the stronger comparator. The simulator matches acquisition duration and task, with assumed source-photon allocation. It does not match total apparatus costs or establish quantum advantage. The atomic support optics and reference lasers require additional accounting.', '',
              '- **New sensor failures:** C + Q false source alarms rise to 84.53% for a primary-reference step and 94.11% for a shared-path step. The older atomic-drift 80.10% result belongs to the earlier known-time experiment and must not be mixed with this study.',
              '- **Drive-amplitude test:** a +20% field step yields 3.71% detections within 32 bins, alongside 6.84% stable-record false alarms over 96 bins. Its prior-only estimate already achieves RMSE 0.1136; observations improve that to just 0.1125 for this case and worsen the other four source-changing cases. The prior control was added after holdout inspection and is descriptive.',
              '- **Phase opportunity:** at 20,000 mean photons incident before the object, 81% overall efficiency and ideal preparation, a charged 10% coherent / 90% NOON hybrid has full-phase RMSE 0.00637 rad versus 0.00791 rad for the declared coherent protocol. Both sample modes are charged. Pure NOON has a global π ambiguity. Loss and preparation time limit the benefit; this is not a claim against every classical design.',
              '- **Circuit-cost result:** a complete 49-cell spatial query was constructed as two 389-qubit circuits with 2.87–3.38 million constructive generic CX upper bounds. Both QPY files round-trip. These are unoptimized bounds, not routed counts or 389-qubit statevector results. The original independent-cell probability is tractable classically.',
              '- **Exposure result:** an assumed two-photon resist shows stronger NOON contrast, but its best tested pattern accuracy requires more dose. Loss, blur and linear background erase benefits in several cases. No measured material, printed feature, chip yield or dollar saving is established.', '',
              '## Backup slides', '']
    for i,x in enumerate(scripts[main_count:],main_count+1):
        guide += [f'### {i}. {x["title"]}', '', x['text'], '', '**Sources:** ' + x['sources'], '']
    guide += ['## Rebuilding', '',
              'The editable deck is authored by `.finals-deck-build/visual_build.mjs` with the bundled `@oai/artifact-tool` runtime. The root resolves relative to that file. `PRESENTATIONS_SKILL_DIR`, `RUNTIME_PYTHON`, `OUTPUT_PPTX` and `OUTPUT_RECEIPT` can override the authoring environment and output destinations. Link the build directory’s `node_modules` to the installed bundled Node packages. Use `--draft` for previews. Finalization intentionally refuses to overwrite an existing final PPTX or receipt; use new output filenames for a revision.', '',
              'The build reads the verified original after-click evidence, frozen research results, archived hardware summary, two original circuit figures, optical cover asset, sensing animation poster and original-core app screenshot. It performs no hardware jobs. The renderer and finish scripts create the checked slide PNGs, static PDF, guide and manifest. Source hashes in the manifest identify the evidence used. The pre-research deck is preserved in `archive/pre_research_2026-11-11/`.', '']
    guide_path=OUT / 'Visual_Presenter_Guide.md'
    guide_path.write_text('\n'.join(guide),encoding='utf-8')
    matching_receipts = [p for p in BUILD.glob('visual_validation*.json')
                         if json.loads(p.read_text()).get('finalSha256') == sha(deck)]
    assert matching_receipts, 'No validation receipt matches the delivered deck'
    validation_receipt = max(matching_receipts, key=lambda p:p.stat().st_mtime)
    manifest={
        'pptx':deck.name,'pdf':pdf.name,'presenter_guide':guide_path.name,
        'main_slide_count':main_count,'total_slide_count':total_count,'notes_count':notes_count,
        'talk_timing_seconds':endpoint,'demo_seconds':45,'time_limit_seconds':600,
        'speaking_script_words':words,'native_chart_count':native_chart_count,
        'validation_report':'../.finals-deck-build/'+validation_receipt.name,
        'visual_review_report':'../.finals-deck-build/visual_review.json',
        'build_source':'../.finals-deck-build/visual_build.mjs',
        'render_source':'../.finals-deck-build/visual_render_final.mjs',
        'finish_source':'../.finals-deck-build/visual_finish.py',
        'sensor_results_sha256':sha(ROOT/'laser_sensor_viability/followup/main/results.json'),
        'hardware_verification_sha256':sha(ROOT/'research-validation/hardware_verification.json'),
        'original_after_click_verification_sha256':sha(ROOT/'research-validation/original_after_click_verification.json'),
        'sha256':{p.name:sha(p) for p in [deck,pdf,guide_path]},
        'limitations':['PPTX has not been tested in native Microsoft PowerPoint.',
                       'PDF contains static slide images and no presenter notes.',
                       '9:20 is a planned timeline; the team must rehearse the actual delivery.'],
        'source_assets':['assets/optical-cover.png','../animations/laser-diagnostic-lenses.png',
                         '../laser-diagnostics-app/app-core-query.jpg',
                         '../rewindandamplify-main/results/figures/fig_circuit_hybrid.png',
                         '../rewindandamplify-main/results/figures/fig_circuit_grover.png'],
        'source_sha256':{p:sha(ROOT/p) for p in [
            'RESEARCH_RESULTS.md',
            'research-validation/original_after_click_verification.json',
            'research-validation/hardware_verification.json',
            'rewindandamplify-main/results/hardware/summary_plain.json',
            'laser_sensor_viability/results.json',
            'laser_sensor_viability/followup/main/results.json',
            'qrsm_photon_poc/drive_diagnostics_followup/main/results.json',
            'qrsm_photon_poc/drive_diagnostics_followup/main/prior_only_estimation_control.json',
            'qrsm_photon_poc/multibin_followup/main/ideal_0p03.json',
            'qrsm_photon_poc/multibin_followup/main/ideal_0p003.json',
            'qrsm_photon_poc/followup/dynamics_results.json',
            'qrsm_photon_poc/followup/inference_results/fixed_411101_dead1_fit0.json',
            'qrsm_photon_poc/followup/inference_results/fixed_411101_dead1_fit1.json',
            'quantum_lithography_poc/phase_inspection_followup/results.json',
            'quantum_lithography_poc/exposure_followup/results.json',
            'finals-lithography/full_spatial_circuit/results.json',
        ]},
    }
    (OUT/'visual_manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
    print(json.dumps({'slides':total_count,'notes':notes_count,'main_words':words,'timing_seconds':endpoint,'pdf_bytes':pdf.stat().st_size}))


if __name__=='__main__':
    main()
