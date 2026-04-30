# Universal output bundle (v4.2)

Spec for canonical export artifacts, conditional `DESIGN_BRIEF.md`, and `_META.json`.

## Universal Bundle First Principle

The **canonical bundle** (`MASTER_PROMPT.md` plus the numbered sibling artifacts below) must work **as-is** when used with **any** vibe-coding tool or AI model — Cursor, Lovable, Bolt, Replit, Rork, Antigravity, Claude Code, ChatGPT, Gemini, **or any future tool** — **without** requiring a **tool adapter**.

**Tool Adapter Exports** (Tier 2) are **convenience packaging only**. They save the user about **ten minutes** of copy-paste. They **do not** improve output quality. They are **never required**.

A user who **never** runs an adapter **must still receive** a complete, working spec bundle.

## Bundle size & layout

- **`MASTER_PROMPT.md`** — tool-agnostic build instructions (**always** emitted). Template: **`MASTER_PROMPT.template.md`**.
- **Up to 11 numbered sibling artifacts** in the canonical reading order (**ten** mandatory profile-dependent data contract files + **optional** `DESIGN_BRIEF.md`). When `DESIGN_BRIEF.md` is skipped, the bundle has **10** siblings; **`MASTER_PROMPT.md`** must not list the missing file.
- **`_META.json`** — export metadata (audit, `skipped_files`, etc.).

## Canonical filenames (aligned with `MASTER_PROMPT.md`)

Emitters produce this set; **`storage_strategy`** (`v4.2_architecture.plan.md` §7) decides **`DATA_MODEL.md`** vs **`SCHEMA.sql`** (or both only if policy allows):

| Order | Artifact | Notes |
| --- | --- | --- |
| 1 | `PROJECT_BRIEF.md` | |
| 2 | `PRD.md` | |
| 3 | `USER_FLOWS.md` | |
| 4 | `SCREEN_MAP.md` | |
| 5 | `DESIGN_BRIEF.md` | **Conditional** — see below |
| 6 | `TECH_STACK.md` | |
| 7 | `BACKEND_CONTRACT.md` | APIs / services as specified |
| 8 | `DATA_MODEL.md` and/or `SCHEMA.sql` | **`cloud_relational`:** typically `SCHEMA.sql` (+ relational `DATA_MODEL.md` optional). **`local_only`**, **`cloud_document`**, **`local_first_sync_later`:** `DATA_MODEL.md`; omit `SCHEMA.sql` unless policy extends |
| 9 | `SCHEMA.json` | Machine-readable data shape |
| 10 | `IMPLEMENTATION_PLAN.md` | **Chunked for weak LLMs:** follow **`v4.2_architecture.plan.md`** §11 (limits, mandatory phase order, skeleton, reference anchoring, handoffs). Emitter template: **`IMPLEMENTATION_PLAN.template.md`**. Pre-export **`_engine/pre_export_validator.md` Gate 6** validates chunking compliance. |
| 11 | `_META.json` | |

## `platform_access` normalization

Read `session_state.blueprint_blocks.platform_access`. If it is a single string, treat it as a one-element list for the rules below.

## DESIGN_BRIEF.md generation rule

```
IF blueprint_blocks.platform_access includes ANY of:
  [web, iOS, Android, PWA, desktop_app, cross_platform]
THEN: generate DESIGN_BRIEF.md

IF platform_access == "api_only" OR platform_access == "backend_only":
THEN: skip DESIGN_BRIEF.md entirely.
     Do not include it in the bundle or MASTER_PROMPT.md file list.
     Log skipped_files: ["DESIGN_BRIEF.md"] in _META.json when skipped.
```

(If `platform_access` is a list containing only `api_only` or only `backend_only`, apply the skip branch per your normalized model; mixed lists with a UI surface token require generation.)

## DESIGN_BRIEF.md content spec

Exactly **four** fields. Source: `phase_library/design/look_and_feel`. **Maximum one page.** No design tokens, component patterns, or accessibility rules (v1.1 / Vision Accelerator).

1. **color_mood** — one of: `Minimal/Light` | `Bold/Vibrant` | `Dark/Dramatic` | `Professional/Corporate` | `Playful/Friendly` (single-choice).
2. **reference_ui** — string: `The UI should feel like [App Name]` **or** `No reference — AI should suggest` (optional text + skip).
3. **font_feel** — one of: `Modern/Clean` | `Classic/Traditional` | `Friendly/Rounded` | `Technical/Code-like` (single-choice).
4. **density** — one of: `Spacious/Open` | `Balanced` | `Compact/Dense` (single-choice).

Use **`DESIGN_BRIEF.md`** only — never `DESIGN_SYSTEM.md` in bundle or templates.

## `_META.json` (export)

Include at minimum:

| Field | Type | Notes |
| --- | --- | --- |
| `skipped_files` | `string[]` | e.g. `["DESIGN_BRIEF.md"]` when the brief was skipped; omit or `[]` when nothing was skipped |

Other audit fields (contradiction archive, phases, etc.) mirror session / v4.2 engine as implemented.

## Authoring templates (`_output/*.template.*`)

| Template | Output artifact |
| --- | --- |
| `PROJECT_BRIEF.template.md` | `PROJECT_BRIEF.md` |
| `PRD.template.md` | `PRD.md` |
| `USER_FLOWS.template.md` | `USER_FLOWS.md` |
| `SCREEN_MAP.template.md` | `SCREEN_MAP.md` |
| `DESIGN_BRIEF.template.md` | `DESIGN_BRIEF.md` |
| `TECH_STACK.template.md` | `TECH_STACK.md` |
| `BACKEND_CONTRACT.template.md` | `BACKEND_CONTRACT.md` |
| `DATA_MODEL.template.md` | `DATA_MODEL.md` |
| `SCHEMA.sql.template` | `SCHEMA.sql` |
| `SCHEMA.json.template` | `SCHEMA.json` |
| `IMPLEMENTATION_PLAN.template.md` | `IMPLEMENTATION_PLAN.md` |
| `_META.template.json` | `_META.json` |
| `MASTER_PROMPT.template.md` | `MASTER_PROMPT.md` |

## MASTER_PROMPT.md

Body must remain **tool-agnostic** (`MASTER_PROMPT.template.md`). List **only** bundle siblings that were emitted; when `DESIGN_BRIEF.md` is skipped, **omit** its step from **File reading order** (renumber contiguously).
