# Schema capture — AI synthesis

1. Read **`storage_strategy`**; never emit **`SCHEMA.sql`** for **`local_only`**, **`cloud_document`**, or **`local_first_sync_later`**.

2. **`local_only`** / **`local_first_sync_later`:** Build **`DATA_MODEL.md`** enumerate every entity inferred from **`blueprint_blocks`**. Produce **`SCHEMA.json`** with `storage_type` and **`engine`** from **`platform_access`**: web → IndexedDB; PWA → IndexedDB + service worker cue; Electron → SQLite; React Native → expo-sqlite or AsyncStorage (pick one with rationale).

3. **`cloud_relational`:** Full **`SCHEMA.sql`** + relational **`SCHEMA.json`**.

4. **`cloud_document`:** **`DATA_MODEL.md`** with collections; each collection section names **`_id`**; **`SCHEMA.json`** `{ "storage_type": "document" }`.

5. **`local_first_sync_later`:** Same artifact pattern as **`local_only`** for MVP; ensure **`TECH_STACK.md`** (or synthesis note) includes v1.1 cloud sync deferral copy from plan §7.

6. After synthesis, run **`storage_vs_multiuser`** check if `local_only` + `personas.user_count_type == multi_user` — already handled by **`contradiction_checker`**; do not silently override.
