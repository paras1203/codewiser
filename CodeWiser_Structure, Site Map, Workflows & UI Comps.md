## [2026-04-30] — # Project Structure, Site Map, Workflows & UI Comps

### 1. Directory Structure (Source)

- `README.md`, `MASTER_ENGINE.md` — entry + brain.
- `_engine/` — drivers, activation matrix, micro-education, defaults, delegation, synthesis, cascading context, anti-overwhelm; **`completion_matrix.json`**; **`phase_loader.md`**, **`question_priority_engine.md`**, **`completion_gate.md`**; **`contradiction_rules.json`** + **`contradiction_checker.md`**; **`locale_payment_rails.md`**; **`shadow_critic.md`**; **`pre_export_validator.md`** (**Gates 1–6**).
- **`_adapters/`** — **`adapter_interface.md`** + per-tool specs (Cursor, Lovable, Bolt, Rork, Replit); **`merge_and_format(bundle, target_tool)`** per `v4.2_architecture.plan.md` §12.
- `_output/` — **`bundle_spec.md`**, **`MASTER_PROMPT.template.md`**, **`IMPLEMENTATION_PLAN.template.md`** (§11 chunked plan skeleton).
- **`_ui/`** — **`question_ui_spec.md`**; **`spec_health_meter.md`** (Vague / Solid / Vibecode-ready + SCHEMA/USER_FLOWS interrupt).
- `_question_formats/` — format catalog + Tiering Bucket + Budget Bucket.
- `phase_library/{foundation,...,data,infrastructure,ship}/` — per-module quartet; **`data/schema_capture/`** branches on **`storage_strategy`** (see **`v4.2_architecture.plan.md`** §7).
- **`foundation/the_people`:** **`personas.user_count_type`** (`single_user` \| `multi_user`) for storage inference + **`storage_vs_multiuser`** contradiction.
- `examples/*` — four scenario README walkthroughs.
- `.cursor/rules/codewiser.mdc` — engine trigger rule.

### 2. Site Map (Pages & Linkage)

Not a deployed site; Markdown navigation via README pointers.

### 3. Workflows (Chronology)

Foundation → journeys → rules/screens/design/data/infrastructure (`the_constraints` early) → tiering ship → blueprint compile.

Desktop/Mobile — same textual workflow via Cursor rule.

**Export bundle:** Up to **11** canonical `.md` files + **`MASTER_PROMPT.md`** + **`_META.json`** per `v4.2_architecture.plan.md` §11; **`DESIGN_BRIEF.md`** only when `platform_access` includes a UI surface (see `_output/bundle_spec.md`). **`IMPLEMENTATION_PLAN.md`** must follow §11 chunking (+ **`pre_export_validator` Gate 6**).

### 4. Free vs Pro Plan Features

Not modeled in-repo (spec engine).

### 5. Dead / Inactive / Empty Pages & Buttons

None tracked.

### 6. Coming Soon

v4.2 stateful runtime (`v4.2_architecture.plan.md`), automated validator wiring beyond spec text, adapter specs.

### 7. Page/Screen-Wise Component List

N/A until a dedicated IDE UI consumes the engine spec.

---

## [2026-04-30 — supplemental] Structure log

**Confirmed:** `_output/bundle_spec.md`, `_engine/completion_matrix.json` (`look_and_feel`), and `look_and_feel` phase quartet updated for conditional `DESIGN_BRIEF.md` and MVP four-field scope.

## [2026-04-30 — supplemental 2] Storage strategy + schema-first

**Confirmed:** `_data/session_state.schema.json` **`storage_strategy`** described; **`v4.2_architecture.plan.md`** §1/§7/§10 + **`schema-first-output`** todo; **`the_constraints`** + **`contradiction_rules.json`** **`cross_field_rules`** (`storage_vs_multiuser`); **`the_people`** **`user_count_type`**; **`phase_library/data/schema_capture/`** quartet; **`MASTER_ENGINE`** constraint cascade row.

## [2026-04-30 — supplemental 3] Prompt 3 — MVP trims

**Confirmed:** **`codewiser_v4.1_refinement_7b662aba.plan.md`** (phase-design todo + §4 success metrics); **`v4.2_architecture.plan.md`** §4 **`completion_matrix`** exemplar + **`completion-engine`** todo; **`_engine/completion_matrix.json`** `ship/success_metrics_and_horizon`; **`success_metrics_and_horizon`** phase keys + **`phase_activation_matrix`** / **`MASTER_ENGINE`** alignment.

## [2026-04-30 — supplemental 4] Prompt 4 — Universal Bundle First

**Confirmed:** **`_output/bundle_spec.md`** principle + canonical artifact table; **`_output/MASTER_PROMPT.template.md`** tool-agnostic body; **`v4.2_architecture.plan.md`** bundle-first wording (§§11–12, 14–15, §16 row, todos, overview).

## [2026-04-30 — supplemental 5] Prompt 5 — Question UI spec

**Confirmed:** **`_ui/question_ui_spec.md`** (+ **`v4.2_architecture.plan.md`** §8 Positions **8a** / **8b**, **`question-ui-spec`** todo + **`file_output`**).
