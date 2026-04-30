# Question format types — CodeWiser v4.1

Each pattern in `question_patterns.md` declares **FORMAT** plus optional UI hints. Use the narrowest format that preserves decision quality.

---

## Open text

| Field | Guidance |
| ----- | --------- |
| **When** | Story, uniqueness, qualitative nuance paragraph answers |
| **Limits** | After answer, synthesize bullets; avoid “be more specific” |

---

## Single choice

| Field | Guidance |
| ----- | --------- |
| **When** | Binary or categorical decisions |
| **UI** | Large buttons when possible |

---

## Multi-select

| Field | Guidance |
| ----- | --------- |
| **When** | Feature lists, personas, integrations |
| **Rule** | Cap visible options via Reference Accelerator preload when applicable |

---

## Confirm (AI proposes)

| Field | Guidance |
| ----- | --------- |
| **When** | High confidence synthesis; reference clone deltas |
| **Copy** | “Here’s what I think — thumbs up or correct one thing?” |

---

## Priority rank

| Field | Guidance |
| ----- | --------- |
| **When** | Order features or screens by MVP importance |
| **Output** | Ordered list stored with confidence |

---

## Scale

| Field | Guidance |
| ----- | --------- |
| **When** | Intensity sliders (density, urgency, vibe) |

---

## Conditional

| Field | Guidance |
| ----- | --------- |
| **When** | Follow-up only after trigger (payments on, PII flagged) |

---

## Tiering bucket (v4.1)

| Field | Guidance |
| ----- | --------- |
| **When** | `ship/feature_tiering` — place each surfaced feature |
| **Buckets** | MVP / v1.1 / Later / Drop |
| **UI metaphor** | Drag-or-assign; allow batch assign per feature |

**Stores as:** `features[]` entries with `{ name, tier, notes? }`.

---

## Budget bucket (v4.1)

| Field | Guidance |
| ----- | --------- |
| **When** | `infrastructure/the_constraints` — spend ceiling for tools/hosting |
| **Options** | $0 free stack / &lt;$50 mo / &lt;$500 mo / Open budget |
| **Behavior** | Biases downstream `the_plumbing` and vendor suggestions |

**Stores as:** `constraints.budget_bucket` enum aligned to session schema.

---

## Selection rules shortcut

Prefer: **confirm** → **single/multi** → **tiering/budget** → **priority rank** → **open**. Use **micro-education** line before jargon-heavy single/multi (see `_engine/micro_education.md`).
