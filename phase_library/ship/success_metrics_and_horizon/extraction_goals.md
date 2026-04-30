# Success Metrics and Horizon — extraction goals

**Activation:** **Medium+ ONLY** — explicitly **not** run for **Minimal** or **Simple** (`codewiser_v4.1_refinement_7b662aba.plan.md` §4, `v4.2_architecture.plan.md` §4).

**Medium:** exactly **three** prompts folded into **`ship/the_blueprint`** exchange (merged segment), **not** a standalone phase runner step.

**Complex:** standalone **`ship/success_metrics_and_horizon`** phase before blueprint.

**Reason (Simple/Minimal exclusion):** No validated product yet; long-horizon retention targets add overhead without aiding vibe-coding build output.

## Must capture (when phase or wedge runs)

Map into `blueprint_blocks.success_metrics`:

| Field | Detail |
| ----- | ------ |
| `north_star_metric` | Primary observable success signal (hypothesis OK) |
| `month_1_target` | Soft numeric or categorical target toward that star |
| `month_6_target` | Complex-only stretch / horizon cue (optional in medium wedge) |

`roadmap.v2_vision` remains optional teaser per `output_template.md`.

Completion thresholds: **`_engine/completion_matrix.json`** → **`ship/success_metrics_and_horizon`** (skipped automatically when complexity ∈ minimal, simple).
