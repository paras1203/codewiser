# Cursor adapter — Tier 2

Source: **`v4.2_architecture.plan.md` §12**.

## Outputs

| Path | Rule |
| --- | --- |
| **`.cursorrules`** | Body = contents of **`MASTER_PROMPT.md`** (verbatim or minimally normalized headings). |
| **`/docs/*.md`** | Copy every **`*.md`** sibling from the canonical bundle (same filenames). **`_META.json`** optional under **`/docs/_META.json`** or omit if product policy prefers audit-only in bundle root export. |

## Format

Structured Markdown sections with readable file provenance banners (e.g. `<!-- from PRD.md -->`) so Cursor indexing matches human navigation.
