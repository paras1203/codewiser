# Rork adapter — Tier 2

Source: **`v4.2_architecture.plan.md`** §12.

## Outputs

| File | Content |
| --- | --- |
| **`RORK_BRIEF.md`** | `PROJECT_BRIEF.md` + `SCREEN_MAP.md` + **`DESIGN_BRIEF.md`** when present |
| **`SCHEMA.json`** | Sidecar; exact copy from bundle |

If **`DESIGN_BRIEF.md`** skipped per **`bundle_spec`**, omit that section from **`RORK_BRIEF.md`** without placeholder gaps.

## Format

Screen-centric sections; bullets for states and transitions; tie components to **`SCREEN_MAP`** headings.
