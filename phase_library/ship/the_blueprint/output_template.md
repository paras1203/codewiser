# Output template — the_blueprint

Final artifact may be `blueprint.json` or structured Markdown with equivalent headings.

## Canonical keys (agency § mapping)

```json
{
  "core_intent": {},
  "personas": {},
  "platform_access": {},
  "user_journeys": {},
  "features": {},
  "screens_nav": {},
  "data_logic": {},
  "auth": {},
  "design_ux": {},
  "monetization": {},
  "engagement": {},
  "integrations": {},
  "performance_scale": {},
  "constraints": {},
  "edge_cases": {},
  "admin": {},
  "compliance": {},
  "success_metrics": {},
  "roadmap": {},
  "_meta": {
    "reference_app": null,
    "phases_activated": [],
    "defaults_applied": [],
    "delegations": [],
    "notes": ""
  }
}
```

`_meta` records AI-proposed defaults vs user-specified fields for reviewer audit.

See `MASTER_ENGINE.md` for gating: **no codegen until explicit user approval** of this compiled object.
