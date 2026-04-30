# CodeWiser Prompt Log

---

## 2026-04-22 — v4.2 Architecture Plan
**Category:** Architecture
**Instruction:**
> "Create v4.2_architecture.plan.md — CodeWiser Planning Stage. Consolidate and extend the existing v4 and v4.1 plans with confirmed additions across TIER 1 (must ship in v1) and TIER 2 (architecture only). For each item, output: what it is, why it exists, the file/function/schema name, its dependencies, and build order position.
>
> TIER 1 items: Stateful Session Layer (Supabase session_state table with confidence_map, contradiction_flags, fatigue_signals, locale_context), Completion Engine (completion_matrix.json + ready_to_synthesize gate), Contradiction Rules Engine (contradiction_rules.json + contradiction_checker with four resolution policies), Spec Health Meter UI (Vague/Solid/Vibecode-Ready from confidence_map, priority interrupt for SCHEMA/USER_FLOWS), Question Priority Engine (priority_weight: impact × dependency × uncertainty on every question pattern, top 4–5 per exchange), Phase Loader (current_phase + complexity_level → max 2,000 token slice), Ranked Default Library (default_tier + reason + trade_off + reversible + Micro-Education First ≤15-word explainers), Schema-First Output (schema_capture dedicated phase, hard gate before IMPLEMENTATION_PLAN.md, SCHEMA.sql + SCHEMA.json dual outputs), Pre-Export Validator (5 blocking gates: sections present, zero open contradictions, schema completeness, feature tier consistency, tech stack budget alignment), Universal Output Bundle (11 files + MASTER_PROMPT.md as 12th coordination file with paste-once vibe-coding tool instructions), Non-Western Reference Library (India/SEA/Africa/LATAM payment rails + locale_context field gating monetisation defaults).
>
> TIER 2 items (architecture only): Tool Adapter Exports (canonical bundle → tool-specific packages for Cursor, Lovable, Bolt, Replit, Rork via adapter_interface.md), Shadow Critic (second Claude Sonnet 4.5 API call with adversarial system prompt → critic_flags array with severity levels).
>
> Output format: same frontmatter as existing plan files (name, overview, todos with id/content/status, isProject). Every todo must have a file_output field. Strict dependency-ordered build sequence. Do not write code. Flag underspecified items as NEEDS_CLARIFICATION."

## 2026-04-28 — Model Selection for Build Workflow
**Category:** Architecture
**Instruction:**
> "Make an .md file containing model selection details for CodeWiser build, refactoring from a table into headings/subheadings with bullets/sub-bullets. Include recommendations for planning & architecture (Sonnet 4.6), `MASTER_ENGINE.md` authoring (Opus 4.6/4.7), active coding (Composer 2), quick edits (Composer 1.5), runtime LLM API calls (Sonnet 4.6), final blueprint synthesis (Opus 4.6), and guidance to avoid Codex 5.3 for planning/architecture except specific algorithmic coding tasks."

## 2026-04-30 — Build codewiser v4.1 Refinement Plan
**Category:** Architecture
**Instruction:**
> Implement `codewiser_v4.1_refinement_7b662aba.plan.md`: README + MASTER_ENGINE + `_question_formats` (Tiering Bucket, Budget Bucket) + `_engine` (micro_education, default_proposer, delegation_detector, reference_accelerator, complexity_detector including activation matrix alignment, synthesis_protocol with `_meta`, anti_overwhelm, cascading_context, phase_activation_matrix) + full `phase_library` modules (seven new phases: positioning, show_me_the_money, the_plumbing, the_constraints, feature_tiering, the_fine_print, success_metrics_and_horizon; enrich four existing modules per plan; design MVP four-field look_and_feel; blueprint keyed output per §6) + four examples directories + `.cursor/rules/codewiser.mdc`. Preserve three drivers; no codegen until blueprint approved.

## 2026-04-30 — Conditional DESIGN_BRIEF bundle (v4.2)
**Category:** Architecture
**Instruction:**
> Rename all bundle references to `DESIGN_BRIEF.md` (never `DESIGN_SYSTEM.md`). `_output/bundle_spec.md`: generate `DESIGN_BRIEF.md` when `blueprint_blocks.platform_access` includes any of `web`, `iOS`, `Android`, `PWA`, `desktop_app`, `cross_platform`; skip entirely for `api_only` or `backend_only` — omit from bundle and `MASTER_PROMPT.md` file list; set `skipped_files: ["DESIGN_BRIEF.md"]` in `_META.json`. Four-field brief only (color_mood, reference_ui, font_feel, density) with enums as specified; max one page; no tokens/components/a11y until v1.1 Vision Accelerator. `look_and_feel` extraction_goals MVP scope only. `completion_matrix.json`: `required_fields` [`color_mood`, `font_feel`, `density`], all thresholds 0.7; `reference_ui` optional at 0.0. Update `v4.2_architecture.plan.md` §11 and universal-output-bundle / master-prompt / tool-adapter todos accordingly.

## 2026-04-30 — Storage strategies and schema-first (Prompt 2)
**Category:** Architecture
**Instruction:**
> Four `storage_strategy` values; `the_constraints` question pattern; `schema_capture` + Pre-Export Gate 3 branch per strategy (local_only / cloud_relational / cloud_document / local_first_sync_later); `cross_field_rules` contradiction `storage_vs_multiuser`; `personas.user_count_type` (`single_user` \| `multi_user`) in `the_people`; update `v4.2_architecture.plan.md` §1 §7 §10 and `MASTER_ENGINE` cascade.

## 2026-04-30 — Prompt 3 DESIGN_BRIEF confirm + success metrics trim
**Category:** Architecture
**Instruction:**
> TRIM 1 — `codewiser_v4.1_refinement_7b662aba.plan.md` **`phase-design`** todo: `look_and_feel` MVP four fields → **DESIGN_BRIEF.md**; tokens **v1.1**. TRIM 2 — **`success_metrics_and_horizon`** **Medium+ only**; excluded **Minimal/Simple**; **Medium** = single **3-question** wedge in **`the_blueprint`**; **Complex** = standalone phase; rationale: no validated product + vibe-coding does not need metrics. **`v4.2_architecture.plan.md`** §4 + **`completion_matrix.json`** entry `ship/success_metrics_and_horizon` with `activation`, `skip_for`, `north_star_metric` / `month_1_target` thresholds.

## 2026-04-30 — Prompt 4 Universal Bundle First
**Category:** Architecture
**Instruction:**
> Canonical bundle + **MASTER_PROMPT.md** primary for **all** tools/models; Tier-2 adapters optional convenience (~10 minutes), never required or quality-improving. **`_output/bundle_spec.md`**: Universal Bundle First Principle + canonical filenames; **`MASTER_PROMPT.template.md`**: tool-agnostic instructions; **`v4.2_architecture.plan.md`**: §11 §12 §14–§16 + frontmatter todos (tool-adapter-exports repositioned).

## 2026-04-30 — Prompt 5 Question UI spec
**Category:** Feature Request
**Instruction:**
> **`_ui/question_ui_spec.md`**: GLOBAL rules (You Decide except Open Text/Budget/Confirm paths), max 5 interactives, progress Step N of ~M, 44×44px, free-text override; FORMAT→UI for Open Text, Single Choice, Multi-Select, Confirm, Priority Rank, Scale, Conditional, Tiering Bucket, Budget Bucket, YES/NO; **`v4.2_architecture.plan.md`** Position **8b** parallel **8a** spec health meter; deps Positions **1–7**.

## 2026-04-30 — Prompt 6 IMPLEMENTATION_PLAN chunking + Gate 6
**Category:** Architecture
**Instruction:**
> **`v4.2_architecture.plan.md`**: Replace **IMPLEMENTATION_PLAN.md** guidance with weak-LLM-safe chunking (≤7 tasks/phase, ≤2,500 words/phase, ≤10 phases, >60 tasks → merge phases, ≤~1hr/session); mandatory phase order (Setup+Auth → Data → API → Core UI → optional Secondary → Notifications → Admin → Errors → Testing → Deploy); mandatory per-phase markdown skeleton (+ reference anchoring to DATA_MODEL/SCHEMA, SCREEN_MAP, DESIGN_BRIEF “if present”, PRD MVP tags); phase handoff user checkpoint text; complexity→phase count table; **`universal-output-bundle`** todo + **`_output/IMPLEMENTATION_PLAN.template.md`**; **`_engine/pre_export_validator.md`** **Gate 6** — BLOCK if >7 tasks in a phase, >10 phases, missing acceptance criterion, or Phase 1 not Setup+Auth without waiver; fail message uses `{N}`, `{Phase X}` placeholders for task overrun.

## 2026-04-30 — v4.2 flag resolutions plan audit (6 todos)
**Category:** Architecture
**Instruction:**
> Audit **v4.2_flag_resolutions plan** (`v4.2_flag_resolutions_6fc671dc`) six todos; build missing artifacts; verify order vs instructions. Gaps fixed: expand **§12** to per-tool adapter detail (Change 5); replace **§16** with resolved summary prose (Change 7); add missing **`_engine/contradiction_checker.md`** and **`_engine/shadow_critic.md`** referenced by frontmatter / §5 / §13.

## 2026-04-30 — Plan audit parity backlog (implement)
**Category:** Architecture
**Instruction:**
> Execute **`plan_audit_parity_check_1a3994e8`** (do not edit plan file): (1) **`_adapters/`** — `adapter_interface.md` + `cursor_adapter_spec.md`, `lovable_adapter_spec.md`, `bolt_adapter_spec.md`, `rork_adapter_spec.md`, `replit_adapter_spec.md` per **v4.2 §12**; (2) **`_ui/spec_health_meter.md`** per **§8**; (3) **`_engine/`** — `phase_loader.md`, `question_priority_engine.md`, `completion_gate.md`, `locale_payment_rails.md` per **§§2–6**.
