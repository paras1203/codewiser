# Output template — look_and_feel

Emitted as `DESIGN_BRIEF.md` content source; **MVP fields only** (four keys). No hex tokens, components, or a11y rules.

**Value sets (strings in JSON):**

- `color_mood`: `Minimal/Light` | `Bold/Vibrant` | `Dark/Dramatic` | `Professional/Corporate` | `Playful/Friendly`
- `reference_ui`: free text **or** literal `No reference — AI should suggest`
- `font_feel`: `Modern/Clean` | `Classic/Traditional` | `Friendly/Rounded` | `Technical/Code-like`
- `density`: `Spacious/Open` | `Balanced` | `Compact/Dense`

```json
{
  "design_ux": {
    "color_mood": "",
    "reference_ui": "",
    "font_feel": "",
    "density": ""
  }
}
```

Full design-token extraction deferred to **v1.1** (Vision Accelerator).
