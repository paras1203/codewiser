# CodeWiser v4.1 — Universal Spec Engine

CodeWiser is a **conversation engine** for discovering what to build: any app, site, or webapp. It is not one long form. The engine selects **phase modules** from a library, activates them from **three drivers**, and adapts depth to idea complexity.

## Philosophy

### Universality one engine, every product shape

Same algorithm for a landing page and a marketplace. Phase count floats (roughly Minimal 5–7 exchanges through phases, Complex 17–21) based on classification, reference cloning, and anti-overwhelm merging.

### Lego blocks not a ladder

Modules stack and merge. Adjacent shallow passes combine into one exchange so discovery never feels ceremonial.

### Reference Accelerator

When the user names a reference app (clone, partial clone, or inspired-by), known patterns preload. Conversation becomes **diff discovery** confirming or adjusting deltas instead of inventing flows from zero.

### Anti-overwhelm first

Hard cap ~4–5 questions per assistant turn unless bulk-confirm mode is intentionally entered. Choices beat essays. Confirm beats blank pages.

### Micro-education first (v4.1)

Before any question that assumes product or tech jargon, the model gives a **≤15-word** plain English line explaining the term, then asks. Same engine can serve non-technical creators and senior founders without changing structure.

---

## Documentation map

| File / folder | Role |
| ------------- | ----- |
| `MASTER_ENGINE.md` | Core loop, Golden Rules, three drivers, synthesis, cascading context |
| `_engine/` | Reference Accelerator, Complexity + activation matrix, micro-education, default proposer, delegation detector, anti-overwhelm, synthesis protocol, cascading context |
| `_question_formats/` | Format catalog and selection rules (incl. Tiering Bucket + Budget Bucket) |
| `phase_library/` | Modular phases: `extraction_goals`, `question_patterns`, `ai_synthesis_guide`, `output_template` per module |
| `examples/` | Walkthrough transcripts for varied complexity |

---

## Golden behavior (summary)

1. **Reference Accelerator** — Classify clone / partial / inspired / new; preload and skip where safe.
2. **Complexity classifier** — minimal → simple → medium → complex gates which modules activate.
3. **Anti-overwhelm** — Max questions per turn, merges, pacing, fatigue → bulk confirmation.
4. **Micro-education first** — Jargon-neutral one-liners before technical questions.
5. **Default proposer** — "I don't know" → propose one default plus one-line reasoning; never leave fields empty silently.
6. **Delegation detector** — "You decide" patterns → propose remainder of phase, log rationale in `_meta`; user confirms once.

---

## Output principle

Produce a structured **Blueprint** aligned to discovery sections (`blueprint_blocks` keys in ship layer). Downstream codegen reads that bundle. Rule: **No implementation code until blueprint is synthesized and explicitly approved** (see Cursor rule).

---

## Version

This tree implements **CodeWiser v4.1 refinement** — 21-section depth as phase coverage, enriched foundations/journeys/infra/ship layers, Tiering + Budget question formats.
