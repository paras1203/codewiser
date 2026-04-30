# Question UI spec — CodeWiser v4.2

Maps every question **format** (`_question_formats/format_types.md`) to a concrete UI pattern. **Mobile-first**, **minimum typing**, **You Decide** escapes where required. Source: `v4.2_architecture.plan.md` §8 (Position **8b**).

---

## GLOBAL RULES (apply to every question exchange)

1. Every question that is **not** marked required in **`completion_matrix`** must show a **"You Decide"** control (button or chip as defined per format), except where this document explicitly says otherwise (**Open Text**, **Budget Bucket**, and **Confirm** — see below).
2. **Maximum 5** interactive elements visible at once per exchange (questions + buttons + chips). Split exchanges if needed (engine / anti-overwhelm).
3. **Progress indicator** always visible: `Step N of ~M` where **M** is the estimated phase count for this session profile.
4. All touch targets minimum **44×44px**. **No hover-only** interactions.
5. The user can **always** enter **free text** (e.g. textarea or inline field) even when a choice UI is shown. **Free text overrides** the visual choice selection and is parsed by **`_engine/synthesis_protocol.md`**.

### Exceptions to rule 1 (You Decide)

| Format | You Decide |
| --- | --- |
| **Open Text** | Not applicable — open text *is* the escape. |
| **Budget Bucket** | Not used — all four options are concrete. |
| **Confirm** | Not a third pill: use **"No, let me adjust"** → inline correction text. If the Confirm round is non-required, that path still satisfies delegation without a separate **You Decide** control (no extra controls beyond the two buttons + revealed input). |

---

## FORMAT → UI COMPONENT MAPPING

### Open Text

- **Component:** Single **textarea**, auto-expanding, ~**500** characters visible without scroll (soft cap; engine may allow longer paste).
- **Placeholder:** `Describe in your own words — no need to be technical`
- **Helper (below input):** `AI will structure your answer`
- **You Decide:** not applicable (see above).

### Single Choice

- **Component:** Vertical **radio** list **or** **pill** button group (≤ **5** options visible; split if more).
- **Rules:** Large tap targets; **full-width** on mobile.
- **Always** include **"You Decide"** as the **last** option → triggers **Default Proposer** for that field.
- **Never** use **dropdowns** for Single Choice (two taps on mobile).

### Multi-Select

- **Component:** **Pill chips** in a wrapping grid; tap toggles selected state.
- **Label:** `Select all that apply`
- **Always** include **"None of these"** chip + **"You Decide"** chip.
- Selected chips use a **distinct fill** (not border-only).

### Confirm

- **Component:** **Two** large full-width buttons only: **"Yes, that's right"** + **"No, let me adjust"**.
- If **No:** reveal **inline text** for correction.
- **No other** chrome during a Confirm exchange (respect global max-5 with siblings only if engine batches — prefer solo Confirm).
- **You Decide:** handled via **No** + correction (see Global exceptions).

### Priority Rank

- **Component:** **Numbered tap-to-assign** (**1** = highest priority). **Not** drag-and-drop (unreliable on mobile / webviews).
- Each row shows a **number badge**; flow: user taps **item** → taps **rank** (or assign-next-free pattern — document in client).
- **You Decide:** button below list: **`AI will prioritise`** → Default Proposer.

### Scale

- **Component:** **Segmented control** (3 or 5 segments; labels at **ends** and **middle**).
- **Not** a slider (imprecise on mobile).
- Example: `[Snappy]` — `[Balanced]` — `[Smooth]`
- **Default segment** pre-selected from Default Proposer when available.

### Conditional

- **Component:** Renders **inline** under **parent** question only when trigger is true.
- **Animated** reveal: slide-down ~**200ms**.
- **Visually indented** to show dependency.

### Tiering Bucket

- **Component:** Each feature = **card** with **4** tap buttons: `[MVP]` `[v1.1]` `[Later]` `[Drop]`
- **Not** drag-and-drop buckets.
- If **feature count > 6:** show **one card at a time** (stepper) unless anti-overwhelm approves a condensed batch.
- Show **Default Proposer** tier as **pre-selected**; user confirms or changes.
- **"Assign all AI suggestions"** — bulk-confirm all Default Proposer tiers (Delegation-friendly).

### Budget Bucket

- **Component:** **4** large full-width buttons — title + **one-line** description each:
  - **`[Free ($0)]`** — *Open-source tools only, no monthly cost*
  - **`[Starter (<$50/mo)]`** — *A few paid APIs, small database*
  - **`[Growth (<$500/mo)]`** — *Production-grade tools, paid tiers*
  - **`[Open budget]`** — *Best tools for the job, cost secondary*
- **No You Decide** — options are self-explanatory.

### YES/NO questions (subset of Single Choice)

- **Component:** **Two** large **side-by-side** buttons **`[YES]`** **`[NO]`** when genuinely binary.
- **Third row:** **`[Not sure — you decide]`** → Default Proposer.

---

## Cross-references

- **Formats:** `_question_formats/format_types.md`, `_question_formats/format_selection_rules.md`
- **Defaults:** `_engine/default_proposer.md`
- **Companion UI spec (parallel):** `_ui/spec_health_meter.md` — Position **8a**; same dependency band as this file.
