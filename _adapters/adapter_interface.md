# Tier-2 adapter interface — CodeWiser v4.2

Normative UX copy: **`v4.2_architecture.plan.md` §11–§12**. Canonical bundle catalog: **`_output/bundle_spec.md`**.

## Contract

Implement **`merge_and_format(bundle, target_tool)`** where:

- **`bundle`** — immutable path or in-memory snapshot of **`MASTER_PROMPT.md`**, all sibling **`*.md`** / **`*.json`** from the canonical table, and **`_META.json`** (`skipped_files` respects absent **`DESIGN_BRIEF.md`**).
- **`target_tool`** — one of: `cursor` | `lovable` | `bolt` | `rork` | `replit`.

**Must:** read bundle; **write** only into a **separate export directory** chosen by the user. **Must not:** edit, delete, or overwrite files inside the canonical bundle source tree.

Skip stitching any heading or paragraph that cites a sibling file listed in **`_META.skipped_files`** (e.g. **`DESIGN_BRIEF.md`** when `platform_access` excludes UI surfaces).

## Outputs

See per-tool specs in this folder:

| File | Tool |
| --- | --- |
| [`cursor_adapter_spec.md`](cursor_adapter_spec.md) | Cursor |
| [`lovable_adapter_spec.md`](lovable_adapter_spec.md) | Lovable |
| [`bolt_adapter_spec.md`](bolt_adapter_spec.md) | Bolt |
| [`rork_adapter_spec.md`](rork_adapter_spec.md) | Rork |
| [`replit_adapter_spec.md`](replit_adapter_spec.md) | Replit |

## Verification

Quarterly smoke: run each adapter once against one fixed golden bundle revision; trim token counts before dropping required sections (**Bolt** respects **~4,000-token** **`BOLT_SYSTEM.md`** ceiling per §12).
