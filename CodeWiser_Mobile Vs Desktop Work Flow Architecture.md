## [2026-04-30] — # Mobile vs Desktop: Workflow Architecture

### 1. Current State

#### 1.1 Route Structure

CodeWiser v4.1 is documented as Markdown engine specs under `MASTER_ENGINE.md`, `_engine/`, and `phase_library/` — no mobile/desktop routes; consumption is Cursor + any future UI reading the same files.

#### 1.2 Layout & Shell

N/A — spec repository only.

#### 1.3 What Is Shared

`.cursor/rules/codewiser.mdc` triggers the engine for product-build prompts equally on desktop and mobile Cursor clients reading this repo.

#### 1.4 What Is Duplicated / Divergent

None for this milestone.

### 2. Workflow Differences (Current)

#### 2.1 Specification Engine

Unified; phase activation varies by complexity, not device.

### 3. Target Architecture: Single Workflow, Two Layouts

#### 3.1 Principles

If a future IDE UI wraps CodeWiser, reuse one engine and vary presentation density only.

#### 3.2 Suggested Structure

Repo remains source of truth; optional UI adapter later chunks questions per `_engine/anti_overwhelm`.

#### 3.3 Layout Detection

Out of scope until a dedicated client exists.

#### 3.4 Shared Workflow Modules

All layers in `phase_library/` remain shared.

### 4. Implementation Checklist

- [ ] v4.1 documentation landed (phase modules + `_engine`).
- [ ] Optional: IDE UI wrapper.

### 5. Route Mapping (Unified)

N/A — documentation paths only.

### 6. Summary

v4.1 adds engine docs and Cursor rule with no divergent mobile vs desktop workflows; both use the same files.

---

## [2026-04-30 — update 2] — # Mobile vs Desktop: Workflow Architecture

### 1. Current State

Same as prior entry: spec repository; no routes or device-specific shells.

### 2. Workflow Differences

**Universal export bundle:** `DESIGN_BRIEF.md` is conditional on `platform_access` (see `_output/bundle_spec.md`). API-only / backend-only sessions skip the file and record `skipped_files` in `_META.json`. Mobile vs desktop Cursor consumers see the same behavior.

### 3–6.

Unchanged from prior entry (single workflow, N/A routes, same shared modules).

**Confirmed:** `_output/bundle_spec.md` and `v4.2_architecture.plan.md` §11 aligned this session.

---

## [2026-04-30 — update 3]

**Schema-first / storage:** Same engine for all clients; **`storage_strategy`** selects local vs cloud artifact paths ( **`v4.2_architecture.plan.md`** §7). No mobile-vs-desktop fork.

**Confirmed:** session + plan + `phase_library` updates for Prompt 2 this session.

---

## [2026-04-30 — update 4]

**IMPLEMENTATION chunking / Gate 6:** **`IMPLEMENTATION_PLAN.md`** generation rules and **Pre-Export Gate 6** apply identically on mobile and desktop Cursor; no device-specific fork.

**Confirmed:** `_engine/pre_export_validator.md`, `_output/IMPLEMENTATION_PLAN.template.md`, `v4.2_architecture.plan.md` §10–§11 Prompt 6 alignment.
