# IMPLEMENTATION_PLAN.md — emitter template (v4.2)

Copy this structure into each exported **`IMPLEMENTATION_PLAN.md`**. **Normative rules:** **`v4.2_architecture.plan.md`** §11 subsection **IMPLEMENTATION_PLAN.md — generation rules**.

**Preamble (optional short paragraph)**

> Execute **one phase per session**. Do not advance until **all acceptance criteria** are checked. Assume **no memory** of earlier chat beyond files in this repo / bundle.

Repeat the **phase skeleton** below for each phase (**≤ 10** phases, **≤ 7** tasks each).

---

## Phase 1: Project Setup + Authentication

**Goal in one sentence:** [...]

**What you need from previous phases:**

Nothing — start fresh.

**Tasks:**

1. [...]
2. [...]

**Files to create or modify in this phase:**

- [...]

**Do NOT build in this phase:**

- [...]

**Acceptance criteria — check all before proceeding:**

- [ ] [...]
- [ ] [...]

**Reference anchoring** (include lines that apply — drop UI line if no UI; drop data line if no persistence this phase):

> Refer to **`DATA_MODEL.md`** or **`SCHEMA.sql`** for all entity and field names. Do not create any table, collection, or field not defined there.

> Refer to **`SCREEN_MAP.md`** for screen names and navigation flows. Refer to **`DESIGN_BRIEF.md`** for visual direction (if present in bundle).

> Only build features tagged **MVP** in **`PRD.md`**. Stop and ask before building anything tagged **v1.1** or **Future**.

**⛔ Stop here. Do not start Phase 2 until all criteria above are checked.**

Before starting **Phase 2**, confirm with the user: *“Phase 1 is complete. The following work is done: [bullets]. Ready to start Phase 2: [name]? (Yes / No — say what needs fixing).”*

---

## Phase 2: Database / Data Model Setup

(Same skeleton — update **What you need from previous phases** with explicit file names.)

**⛔ Stop here. [...]**

...

---

## Phase N: Deployment + Launch Checklist

**Goal in one sentence:** [...]

**What you need from previous phases:** [...]

**Tasks:** [...]

**Files to create or modify in this phase:** [...]

**Do NOT build in this phase:** [...]

**Acceptance criteria — check all before proceeding:** [...]

**⛔ Stop here. This is the final phase — confirm launch checklist complete.**

*(No handoff note after the last phase.)*
