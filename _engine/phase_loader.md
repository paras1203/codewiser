# Phase loader — CodeWiser v4.2

Normative summary: **`v4.2_architecture.plan.md` §2.**

## Goal

Map **`(current_phase, complexity_level)`** → a single prompt slice of **at most ~2,000 tokens** covering only the active module text. Never embed the full **`phase_library/`** tree.

## Slice contents (in order)

Pass **`step`:** **`questions`** | **`synthesis`** (or equivalent orchestration flag).

1. Module path id (e.g. `foundation/the_big_idea`).
2. **`extraction_goals.md`** (truncated if oversized: keep table header + rows for required fields first).
3. **`question_patterns.md`** — only patterns whose **`activation`** matches current complexity / reference profile (if patterns encode conditions); sort by **`priority_weight`** (see **`question_priority_engine.md`**); cap to **top 4–5** per anti-overwhelm, **10** worst-case pre-truncation.
4. **`ai_synthesis_guide.md`** — first **~800 tokens** if the file is huge.
5. **`output_template.md`** — include **only when `step == synthesis`**. Omit on question-only turns (saves tokens and avoids leaking fill-in keys before answers).

If still over budget, drop lower-**`priority_weight`** pattern rows first (see **`question_priority_engine.md`**).

## Inputs

- **`session_state.completed_phases`** — exclude already-finished modules unless re-run for correction.
- **`session_state.complexity_level`** — drives merges / skips via **`phase_activation_matrix.md`**.
- **`session_state.blueprint_blocks`** — pass only **keys cited** by the module’s cascading hints (thin JSON subset).

## Forbidden

Streaming unrelated modules “for context,” loading examples, or full **`MASTER_ENGINE.md`** inside the same slice unless a separate orchestration envelope allows it.
