# The People — question patterns

## PATTERN: role_cardinality

**priority_weight:** `{ "impact": 5, "dependency": 5, "uncertainty": 4 }`

**FORMAT:** Single choice → conditional multi  
**ASK WHEN:** always  
**OPTIONS:** one role / two / three+ / unsure (default proposer if unsure)

## PATTERN: user_count_audience

**priority_weight:** `{ "impact": 5, "dependency": 5, "uncertainty": 2 }`

**Field:** `user_count_type` (under **`personas`**)  
**FORMAT:** Single choice (large buttons)  
**ASK WHEN:** After role_cardinality clarifies scope  
**OPTIONS:**

- **`single_user`** — “One person uses the app; data is private to them”  
- **`multi_user`** — “Different people sign in / share visibility / collaborate”  

**NOTE:** Needed before **`storage_strategy_selection`** (`the_constraints`). If skipping, infer from roles (many distinct actor types ⇒ likely `multi_user`) with labeled inference and brief confirm.

## PATTERN: persona_canvas

**priority_weight:** `{ "impact": 5, "dependency": 4, "uncertainty": 3 }`

**FORMAT:** Mixed confirm  
**FIELDS:** motivation, frequency, tech comfort (plain scale words), geo, frustrations  
**MICRO-ED:** on tech_savviness line only.

## PATTERN: empathy_probe

**priority_weight:** `{ "impact": 3, "dependency": 3, "uncertainty": 4 }`

**FORMAT:** Open short  
**ASK WHEN:** marketplace or emotional product  
**CAPTURE:** stakes language feeding journeys.
