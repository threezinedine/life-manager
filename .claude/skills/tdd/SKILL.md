---
name: tdd
description: Enforces Test-Driven Development workflow. Use when user asks to implement a new feature, fix a bug with tests, or requests code with TDD methodology. NOT for refactoring requests.
---

# Test-Driven Development Skill

## Core Principle

**Red → Green → Refactor** cycle. Write a failing test first, then implement code to make it pass.

## When Activated

This skill activates when user asks to:

- "implement", "add", "create", "build" a new feature
- "add functionality", "build feature"
- Any request that implies writing new code with tests
- When needing to edit the source code (any change in .tsx, .ts, .py, .js, .jsx files)

## Feature Implementation Workflow

### Step 1: Ask User's Preference

```
You want me to implement a new feature. How would you like to proceed?

1. Write tests first (Recommended) — I'll create failing tests with NO implementation
2. Do both — I'll write tests first, then implement to make them pass

Please choose 1 or 2, or describe what you'd like implemented.
```

### Step 2A: Write Tests First (User Choice = 1)

1. **Write failing tests only** — NO implementation, stub with `pass` or `raise NotImplementedError`
2. **Verify tests fail** — Run tests to confirm they fail for the right reasons
3. **Stop here** — Return to user with failing tests for review
4. **Do NOT proceed to implementation** — Wait for user's explicit approval

### Step 2B: Do Both (User Choice = 2)

1. **Write all failing tests** — Cover happy path, edge cases, error conditions
2. **Verify tests fail** — Run to confirm failures are for the right reasons
3. **Implement code** — Write minimal code to make tests pass
4. **Verify all tests pass** — Run full test suite (unittest + e2e)
5. **Report results** — Summary of what was implemented and test status

## Refactoring Workflow

When user asks to "refactor", "restructure", "reorganize", "clean up", or "improve" code:

1. **Preserve tests by default** — Tests document behavior; prefer not modifying them
2. **Notify if changes needed** — If tests MUST be modified, explain why
3. **Run all tests after refactor** — Ensure behavior is unchanged
4. **Verify**: `unittest + e2e tests` pass without modification (preferred) or with minimal modification

## Test Discovery

Look for existing test structure by language/framework:

| Stack           | Frameworks                  | Test Locations                                   | Config Files                                           |
| --------------- | --------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| Python (server) | pytest, unittest            | `tests/`, `test_*.py`                            | `pytest.ini`, `pyproject.toml`, `conftest.py`          |
| JS/TS (client)  | Vitest, Jest                | `src/`, `client/`, `tests/`, `__tests__/`        | `vitest.config.ts`, `jest.config.js`, `vite.config.ts` |
| JS/TS (server)  | Jest, Mocha, Vitest         | `src/server/`, `server/`, `tests/`, `__tests__/` | `jest.config.js`, `vitest.config.ts`, `package.json`   |
| E2E             | Playwright, Cypress, pytest | `e2e/`, `tests/e2e/`, `cypress/`, `playwright/`  | `playwright.config.ts`, `cypress.config.ts`            |

If no test structure exists, create one in `tests/` following project conventions.

## Running Tests

Run tests for **all applicable stacks** after any modification:

### Python (Server)

```bash
pytest tests/ -v                    # unit tests
pytest tests/e2e/ -v               # e2e tests
python -m pytest tests/ -v          # alternative
```

### JavaScript/TypeScript (Client)

```bash
vitest run src/                    # Vitest (client components)
jest --coverage                     # Jest
npm test -- --coverage              # via npm
```

### JavaScript/TypeScript (Server)

```bash
vitest run                          # Vitest
jest server/                        # Jest
npm test -- --testPathPattern=server
```

### E2E Tests

```bash
pytest tests/e2e/ -v                # pytest e2e
playwright test                     # Playwright
npx playwright test                 # Playwright via npx
```

**Always run ALL applicable test suites** — not just the one for the modified stack.

## Detailed References

- **Test writing patterns**: See [references/test-writing.md](references/test-writing.md)
- **Refactoring guidelines**: See [references/refactoring.md](references/refactoring.md)
