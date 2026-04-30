# Look & Feel — question patterns

**Phase:** `design/look_and_feel` — MVP extracts **four fields only** (see `extraction_goals.md`). Target **1–2 exchanges**.

## PATTERN: vibe_bundle

**priority_weight:** `{ "impact": 4, "dependency": 3, "uncertainty": 3 }`

**FORMAT:** Single choices grouped  
**SEQUENCE:** optional `reference_ui` (text **or** skip → store `No reference — AI should suggest`) → `color_mood` → `font_feel` → `density`  
**MICRO-ED:** one line before first prompt if user seems non-visual.

## PATTERN: reference_confirm

**priority_weight:** `{ "impact": 3, "dependency": 2, "uncertainty": 4 }`

If user named an app earlier: confirm whether UI should echo that reference; user may skip → `No reference — AI should suggest`.
