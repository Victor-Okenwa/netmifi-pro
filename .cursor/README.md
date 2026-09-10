# Cursor AI Rules

Rules that guide AI code generation for **netmifi-pro** (hackathon Next.js app).
Standards are aligned with `netmifi-mono` so course-create UI and new skill-trading can move into the monorepo later.
**Viewport default: mobile-first / mostly phone** unless Figma or a prompt says otherwise.

## Rule Files

### `.cursorrules` (root)

Always-on identity, product summary, and generation checklist.

### `.cursor/rules/*.mdc`

| File | Scope |
| --- | --- |
| `product.mdc` | Hackathon product, skill trading, course create, mobile-first, workspace pairing |
| `decompose.mdc` | Split pages and features into small pieces |
| `mock-data.mdc` | University and skills catalog shape |
| `code-style.mdc` | Biome, naming, React, Tailwind |
| `typescript-best-practices.mdc` | No `any`, interfaces, `??` |
| `project-conventions.mdc` | Folders, `@/` imports, Bun |
| `architecture-patterns.mdc` | Server/Client Components, portable UI |
| `nextjs.mdc` | App Router conventions |
| `portability.mdc` | How to land work in netmifi-mono |
| `dependencies.mdc` | When editing `package.json` |

## Updating Rules

Edit `.mdc` files or `.cursorrules`. Keep rules short and one concern per file.
Do not put project standards only in `AGENTS.md` — Next.js regenerates that file.
