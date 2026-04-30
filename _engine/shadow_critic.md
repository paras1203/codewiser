# Shadow Critic — CodeWiser v4.2

Normative specification: **`v4.2_architecture.plan.md` §13**.

## Role

Second-pass reviewer (example model class: Claude Sonnet). **JSON output only.** Never shown raw to the user.

## Response shape

Always return **`critic_flags[]`** plus **`approved: boolean`** per §13.

Each **`critic_flags`** item includes **`type`**, **`field`**, **`description`** (one sentence), and **`suggested_resolution`** (one sentence).

## Trigger when ANY

1. **`phase_transition: true`** (phase completed, before next phase questions).
2. **`blueprint_blocks`** updated AND any newly written field has **`confidence < 0.7`**.
3. **`contradiction_flags.length > 0`** after current synthesis step.
4. **`ready_to_synthesize === true`** (final pre-Blueprint check).

## Do NOT trigger

- Mid-phase question generation **without** a **`blueprint_blocks`** write.
- Simple confirmations (“yes”, “correct”).
- **Delegation Detector bulk-confirm:** **one** Critic call **at end of bulk**, not per field.

## Routing

- **`approved: true`** and **`critic_flags`** empty → proceed.
- **`approved: false`** → prepend **internal self-correction** to the engine’s **next user-facing message** only.

## Cost (planning only)

Roughly **~5–7** calls for simple stacks, **~12–15** for complex; estimate **+15–20%** session API budget — acceptable per product policy.
