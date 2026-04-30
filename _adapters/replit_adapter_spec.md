# Replit adapter — Tier 2

Source: **`v4.2_architecture.plan.md`** §12.

## Outputs

| Path | Content |
| --- | --- |
| **`README.md` (repo root)** | `PROJECT_BRIEF.md` + `TECH_STACK.md` + **`IMPLEMENTATION_PLAN.md`** Phase 1 body only |
| **`/docs/*.md`** | All **other** bundle Markdown siblings (preserve names) |

Exclude **`DESIGN_BRIEF.md`** from **`README`** merge unless product policy merges design into root (default: omit when skipped).

## Format

Operational tone (“Run”, “Configure env”); highlight stack and first implementation phase.
