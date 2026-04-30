# Spec health meter — CodeWiser v4.2

Normative hooks: **`v4.2_architecture.plan.md` §8.** Reads **`session_state.confidence_map`**. Section groupings derive from **`_engine/completion_matrix.json`** + blueprint structure.

## Bands (per-section average over **required** fields in that section)

| Band | Rule (avg of required-field confidences in the section) |
| --- | --- |
| **Vague** | **&lt; 0.40** |
| **Solid** | **≥ 0.40 and &lt; 0.80** |
| **Vibecode-Ready** | **≥ 0.80** |

If a section has no required fields mapped, derive from **`completion_matrix.json`** for the nearest phase or omit the band until mapped.

Per-field thresholds in **`completion_matrix.json`** still apply to **`completion_gate`**; the meter summarizes **UX-facing** health for the same fields grouped into sections (e.g. **SCHEMA**, **USER_FLOWS**, **FEATURES**, **DESIGN**, **TECH**).

## Section groupings (minimum)

| Meter section | Typical blueprint / phase sources |
| --- | --- |
| **SCHEMA** | `data/schema_capture`, `data_logic`, confidence on entities/relationships/keys |
| **USER_FLOWS** | `user_journeys`, journeys phases |
| **FEATURES** | `features`, `ship/feature_tiering` |
| **DESIGN** | `design_ux` / `design/look_and_feel` (skip when API-only per matrix) |
| **TECH** | `constraints`, `integrations`, `performance_scale` |

## Priority interrupt (engine — before `phase_loader` picks next module)

```
IF section SCHEMA status == Vague:
  Pause other phase progression; next exchange MUST probe schema_capture (or re-open schema questions).

IF section USER_FLOWS status == Vague:
  Pause screens/design emphasis; re-run journeys probing (e.g. the_main_event / the_full_picture patterns).
```

Enforce this **before** **`_engine/phase_loader.md`** selects the next module.

## UI payload shape (per section)

```json
{
  "section": "SCHEMA",
  "status": "Vague | Solid | Vibecode-Ready",
  "avg_confidence": 0.0,
  "incomplete_fields": [],
  "source_breakdown": { "user": 0, "inferred": 0, "ai_default": 0 }
}
```

Show current band in product UI when the surface exists (minimal: one line under session progress).
