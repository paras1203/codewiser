# Completion gate — CodeWiser v4.2

Normative summary: **`v4.2_architecture.plan.md` §4.** Source data: **`_engine/completion_matrix.json`**.

## Procedure

1. Load **`completion_matrix.json`** → object **`phases`** keyed by module id (e.g. **`design/look_and_feel`**, **`ship/success_metrics_and_horizon`**).
2. For each key, read optional **`activation`**, **`skip_for`**, and **`skip_when_platform_access_in`**:
   - If **`skip_for`** contains **`session_state.complexity_level`**, **skip** the entire block (treat as satisfied for **`ready_to_synthesize`**).
   - If **`activation == "medium_and_above_only"`** and complexity is **minimal** or **simple**, skip.
   - If **`skip_when_platform_access_in`** is present: normalize **`blueprint_blocks.platform_access`** to a coarse label (scalar or list). If the product is **`api_only`** or **`backend_only`** only (no UI surfaces), **skip** blocks like **`design/look_and_feel`** when those labels are listed.
3. For non-skipped blocks: every field in **`required_fields`** must exist in **`blueprint_blocks`** (or module output namespace) with **`confidence_map[field].confidence ≥ thresholds[field]`** when a threshold is defined.
4. If **`thresholds`** omits a field, require presence only (confidence **≥ 0** check passes if value exists).

## `ready_to_synthesize`

Set **`true`** only when:

- Every **completion_matrix** obligation for the session profile passes, **and**
- **`contradiction_flags`** length is **0** (after resolution policies), **and**
- **Schema-first gate** satisfied per **`storage_strategy`** ( **`data/schema_capture`** complete before **`IMPLEMENTATION_PLAN`** emission — see **`v4.2`** §7).

## Extension

Adding a phase: append a keyed block under **`phases`** with **`required_fields`**, **`thresholds`**, and optional **`activation` / `skip_for`** mirroring the **`success_metrics_and_horizon`** example in **`v4.2`** §4.
