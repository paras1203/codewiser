# The People — AI synthesis

Normalize roles with stable slugs. Infer tech_savviness only from explicit clues else ask once.

**`user_count_type`:** Prefer explicit answers. If user describes “teams”, “sharing”, “admin + customer”, or multiple unrelated actor goals → `multi_user`. Solo journaling, calculators, offline tools → `single_user`. If ambiguous, propose one value with reversible default and Confirm.

Attach quotes only if useful for marketing tone.

```json
{
  "personas": {
    "user_count_type": "",
    "roles": [],
    "notes": ""
  }
}
```
