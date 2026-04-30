# Output template — feature_tiering

Emitted into `blueprint_blocks.features` before `ship/the_blueprint` compile.

## `features.items[]` (tier assignment)

```json
{
  "name": "",
  "feature_id": "",
  "tier": "MVP | v1.1 | Future | Drop",
  "notes": ""
}
```

## `feature_dependency_map[]` (v4.2 — required; Pre-export Gate 4)

**Purpose:** Pre-export **Gate 4** (`_engine/pre_export_validator.md`) reads this array from `session_state.blueprint_blocks.features` and **blocks export** if any **MVP** feature **`depends_on`** a feature whose resolved tier is **not** MVP.

**Population:** After tier assignment on `features.items[]`, run **one** AI-inferred dependency pass; the user **confirms or corrects** only (no manual DAG editing). Each row reflects that exchange.

**Schema — each entry:**

```json
{
  "feature_id": "string",
  "feature_name": "string",
  "tier": "MVP | v1.1 | Future | Drop",
  "depends_on": ["feature_id"],
  "depended_on_by": ["feature_id"],
  "dependency_type": "hard | soft",
  "ai_flagged": true
}
```

**Note:** `depended_on_by` is optional; may be derived or left empty (Gate 4 uses `depends_on` only).

**Normalizer:** Persist tiers in canonical casing expected by Gate 4 (e.g. `MVP` for MVP-tier rows when running the gate loop).

## Gate 4 reference

```
FOR EACH feature IN feature_dependency_map WHERE tier == "MVP":
  FOR EACH dep_id IN feature.depends_on:
    Resolve dep row in the same map → dep.tier
    IF dep.tier != "MVP":
      BLOCK export (see pre_export validator structured conflict message)
```

See `v4.2_architecture.plan.md` §10 and `_engine/pre_export_validator.md`.
