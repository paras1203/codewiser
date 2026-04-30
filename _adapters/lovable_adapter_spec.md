# Lovable adapter — Tier 2

Source: **`v4.2_architecture.plan.md` §12**.

## Output

Single file **`LOVABLE_CONTEXT.md`**.

## Merge order

1. `PROJECT_BRIEF.md`
2. `PRD.md`
3. `USER_FLOWS.md`
4. SCHEMA artifact (`DATA_MODEL.md` and/or **`SCHEMA.sql`** per **`storage_strategy`** / bundle — whichever is emitted)
5. `IMPLEMENTATION_PLAN.md`

Omit **`DESIGN_BRIEF.md`** if absent from bundle / listed in **`skipped_files`**.

## Format

Continuous narrative; `##`-level breaks between source files; shallow nesting.
