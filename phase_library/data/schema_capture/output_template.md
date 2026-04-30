# Output template — schema_capture

Emitted bundle artifacts checklist (exact filenames may mirror `_output/` split templates):

```json
{
  "schema_capture": {
    "storage_strategy_echo": "",
    "artifacts_emitted": {
      "schema_sql": false,
      "data_model_md": false,
      "schema_json": false
    },
    "schema_json_outline": {
      "storage_type": "local | document | relational | local_first",
      "engine": "IndexedDB | SQLite | expo-sqlite | AsyncStorage | null"
    }
  }
}
```

Per-strategy booleans MUST match **`v4.2_architecture.plan.md`** §7 (e.g. `schema_sql: true` only for `cloud_relational`).
