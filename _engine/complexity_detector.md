# Complexity detector — v4.2

Derive **`complexity_level`** after idea + personas + coarse flow knowledge (<=3 exchanges heuristic).

---

## Signals → level

### minimal

portfolio/landing/marketing/static, essentially no persisted multi-user richness.

### simple

single primary role, bounded tool (journal, calculator, tracker) modest integration surface.

### medium

data-rich CRUD variants, asynchronous multi-user lite, curated feeds modest.

### complex

multiple roles/transactions/workflows, realtime coordination, disputes, moderation, payouts.

Uncertain → bias **down** initially if anti-overwhelm risk; upgrade when signals emerge.

---

## locale_context (v4.2)

Write **`session_state.locale_context`** when signals imply a market cluster (enum: **`IN | SEA | AF | LATAM | US | EU | null`** per **`_data/session_state.schema.json`**).

| Signal | Set locale |
| --- | --- |
| User or **`reference_app`** in India cluster (Razorpay, PhonePe, Swiggy, Zerodha, OkCredit) OR text: India, UPI, INR, Rupee | **IN** |
| SEA cluster (Grab, Gojek, Tokopedia) OR Singapore/Indonesia/Philippines/Vietnam rails context | **SEA** |
| M-Pesa, Jumia, Kenya/Nigeria payments stack | **AF** |
| Mercado Pago, Rappi, PIX, LATAM | **LATAM** |
| Explicit US market / USD-only domestic | **US** |
| Explicit EU / GDPR + SEPA emphasis | **EU** |
| No strong signal | **null** |

**null** means monetisation and PSP defaults stay category-neutral until disambiguated (**`locale_payment_rails.md`**).

---

## Phase activation interplay

Consume **`_engine/phase_activation_matrix.md`** (v4.2 — includes **`data/schema_capture`**).

Always-on adds: positioning (may merge), plumbing, constraints, **schema_capture** after storage strategy, feature_tiering (just before blueprint).

Restricted: `success_metrics_and_horizon` **excluded from minimal & simple**; medium merges into blueprint as 3-question wedge; standalone only for complex.

Conditional: monetization rails module medium+ OR reference-monetization; fine print when payments/PII.

---

### Reclassification

If midpoint reveals marketplace dynamics, bump complexity upward; compress earlier shallow answers retroactively rather than restarting.
