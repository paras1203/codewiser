# Compilation rules — the_blueprint

1. Merge phase outputs in cascade order; later passes override only on explicit user correction recorded in synthesis.
2. Null sections for skipped modules must state `skipped_reason` inside `_meta.notes` array entries.
3. Feature items must carry tier tags from `feature_tiering`.
4. Medium profile: fold `success_metrics_and_horizon` answers under `success_metrics` + `roadmap` without duplicating dedicated phase file.
5. Export readiness: JSON schema compatible with downstream bundle split in v4.2.
