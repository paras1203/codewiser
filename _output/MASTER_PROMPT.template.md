> **Emitter:** Write from `# CodeWiser Build Instructions` through the end into **`MASTER_PROMPT.md`**. Omit **File reading order** step **5** and renumber when **`DESIGN_BRIEF.md`** was not emitted (`_output/bundle_spec.md`).

# CodeWiser Build Instructions

## How to use this bundle

You have a complete app specification. This file tells you how to use it.

### If you are an AI coding tool (Cursor, Lovable, Bolt, Claude, ChatGPT, Gemini, etc.)

1. Read every file listed in **File reading order** below before writing any code.
2. Follow **`IMPLEMENTATION_PLAN.md`** exactly — one phase at a time.
3. Do not start the next phase until the current one is working and tested.
4. **`DATA_MODEL.md`** and/or **`SCHEMA.sql`** (whichever appears in this bundle) is the authoritative data contract. **`SCHEMA.json`** supplements it. Never invent tables, fields, or relationships not defined there.
5. When anything is ambiguous: check **`PRD.md`** first, then **`USER_FLOWS.md`**. If neither resolves it, ask the user. Do not assume.
6. Features tagged **v1.1** or **Future** in **`PRD.md`** must **NOT** be built now.

### File reading order

1. **`PROJECT_BRIEF.md`** — understand what you are building  
2. **`PRD.md`** — understand every feature and its tier (MVP / v1.1 / Future)  
3. **`USER_FLOWS.md`** — understand how every user type moves through the app  
4. **`SCREEN_MAP.md`** — understand every screen and its navigation logic  
5. **`DESIGN_BRIEF.md`** — understand the visual direction (**include this step only if the file is present in the bundle**)  
6. **`TECH_STACK.md`** — understand the chosen technologies and constraints  
7. **`BACKEND_CONTRACT.md`** — understand the API and service design  
8. **`DATA_MODEL.md`** and/or **`SCHEMA.sql`** — understand the data structure (authoritative per bundle contents / `storage_strategy`; use what this bundle contains)  
9. **`SCHEMA.json`** — machine-readable data structure reference  
10. **`IMPLEMENTATION_PLAN.md`** — your build roadmap, phase by phase  
11. **`_META.json`** — review AI-defaulted decisions before implementing them  

### One-line prompt to start

Paste this into any tool after uploading the files:

> Read all files in the CodeWiser bundle starting with **MASTER_PROMPT.md**. Then build **Phase 1** from **IMPLEMENTATION_PLAN.md** only. Stop after Phase 1.
