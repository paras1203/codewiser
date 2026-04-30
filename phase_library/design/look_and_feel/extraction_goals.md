# Look & Feel — extraction goals

**Phase:** `design/look_and_feel`  
**Activation:** When `platform_access` includes surfaces that need UI (`web`, `iOS`, `Android`, `PWA`, `desktop_app`, `cross_platform`); skip for `api_only` / `backend_only`.  
**Scope — MVP:** Capture **exactly these four fields** for `DESIGN_BRIEF.md`. Nothing else in this phase belongs in MVP extraction.

**Out of MVP (v1.1 / Vision Accelerator):** design token generation, component pattern libraries, full design-system extraction, accessibility rules, or any artifact beyond the four fields below.

## Must capture

| Field | Type | Allowed values / format |
| ----- | ---- | ----------------------- |
| `color_mood` | Single choice (required) | `Minimal/Light` \| `Bold/Vibrant` \| `Dark/Dramatic` \| `Professional/Corporate` \| `Playful/Friendly` |
| `reference_ui` | String (optional) | `The UI should feel like [App Name]` **or** `No reference — AI should suggest`. Optional text control with skip maps to the latter. |
| `font_feel` | Single choice (required) | `Modern/Clean` \| `Classic/Traditional` \| `Friendly/Rounded` \| `Technical/Code-like` |
| `density` | Single choice (required) | `Spacious/Open` \| `Balanced` \| `Compact/Dense` |

## Completion (`_engine/completion_matrix.json`)

- **Required fields:** `color_mood`, `font_feel`, `density` — confidence threshold **0.7** each.
- **`reference_ui`:** optional — threshold **0.0** (never blocks completion if missing or skipped).

## Strategy

1–2 exchanges max; micro-education before unfamiliar visual jargon; group single-choice fields when possible.

Outputs land in `blueprint_blocks.design_ux` and drive **`DESIGN_BRIEF.md`** (never `DESIGN_SYSTEM.md`).
