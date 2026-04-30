# Schema capture — extraction goals

**Phase:** `data/schema_capture`  
**Inputs:** `session_state.storage_strategy` (and **`blueprint_blocks.constraints.storage_strategy`**), **`blueprint_blocks.platform_access`**, accumulated blueprint entities from data + feature phases.

## Must emit (before IMPLEMENTATION_PLAN)

| Strategy | SCHEMA.sql | DATA_MODEL.md | SCHEMA.json flags |
| --- | --- | --- | --- |
| `local_only` | Omit | Required — entities, fields, relationships (plain English) | `storage_type: "local"`, `engine` from platform mapping |
| `cloud_relational` | Required — full DDL | Optional supplement | Relational payloads (baseline) |
| `cloud_document` | Omit | Required — collections + document shapes | `storage_type: "document"`; each collection has `_id` |
| `local_first_sync_later` | Omit | Required | `storage_type: "local_first"`, `engine`; deferral note in TECH_STACK |

Block **`IMPLEMENTATION_PLAN.md`** until the required rows for this session are synthesized and stamped with acceptable confidence (`completion_gate.md`).

## TECH_STACK linkage

Recommend local persistence libs for **`local_only`** / **`local_first_sync_later`**; for **`local_first_sync_later`**, add deferral guidance (Supabase vs Firebase) per `v4.2_architecture.plan.md` §7.
