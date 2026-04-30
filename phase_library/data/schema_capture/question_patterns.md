# Schema capture — question patterns

**Phase:** `data/schema_capture` — primarily **synthesis** from prior phases; clarify only gaps.

## PATTERN: entity_gap_fill

**priority_weight:** `{ "impact": 5, "dependency": 5, "uncertainty": 3 }`

**FORMAT:** Confirm or single choice  
**ASK WHEN:** A referenced entity in **`blueprint_blocks.features`** or journeys has no row in **`DATA_MODEL.md`** draft.

## PATTERN: relational_confirm

**priority_weight:** `{ "impact": 4, "dependency": 4, "uncertainty": 4 }`

**FORMAT:** Confirm  
**ASK WHEN:** `storage_strategy == "cloud_relational"` and a critical cardinality (1:N vs N:M) blocks DDL.

Default: synthesize **`DATA_MODEL.md`** / **`SCHEMA.sql`** without new discovery unless ambiguity would change tables or collections.
