# Locale payment rails — CodeWiser v4.2

Normative summary: **`v4.2_architecture.plan.md` §6.** Companion: **`reference_accelerator.md`**, **`default_proposer.md`**.

## Inputs

Use **`session_state.locale_context`** from **`foundation/the_constraints`** discovery or inference (enum aligns with **`_data/session_state.schema.json`**: **`IN | SEA | AF | LATAM | US | EU | null`**).

## Behavior

Before proposing payment rails during **`rules/show_me_the_money`** or plumbing integrations:

| Region | Typical rail hints (non-binding defaults) |
| --- | --- |
| **IN** | UPI ecosystem, Razorpay / Paytm class processors, INR settlement norms |
| **SEA** | Local e-wallets, bank redirects, multicurrency ASEAN |
| **AF** | Mobile money prominence, fragmented PSP landscape |
| **LATAM** | PIX (BR), OXXO / cash proxies, LATAM cards |
| **US** | Stripe-heavy card + ACH idioms |
| **EU** | SEPA, PSD2 / SCA wording |
| **`null`** | Stay processor-agnostic until user declares region |

Rails are **suggestions**, not legal advice. Prefer **neutral copy** naming categories (“card + wallet rails common in `{region}`”).

## Gating monetisation defaults

Do **not** auto-select PSP / compliance depth from **reference_accelerator** clone unless **`locale_context`** aligns with reference market **or** user confirms cross-region serving. Push ambiguous mixes to **`ask_clarification`** per **`contradiction_rules.json`**.

Log every **`ai_default`** rail suggestion with **`trade_off`** + **`reversible: true`** when user has not affirmed.
