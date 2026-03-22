# Refactoring Guidelines

## Core Principle

**Preserve behavior while improving structure.** Tests are the safety net that proves behavior is unchanged.

## Refactoring Workflow

1. **Identify what needs refactoring** — Understand current structure
2. **Review existing tests** — Know what behavior to preserve
3. **Refactor code only** — Make structural improvements
4. **Run all tests** — Verify behavior unchanged
5. **If tests fail unexpectedly** — Fix implementation, NOT tests

## Test Modification Policy

### Preferred: No Test Changes

```bash
┌─────────────────────────────────────────────────────┐
│  Refactor code until tests pass                     │
│  (Tests document correct behavior)                  │
└─────────────────────────────────────────────────────┘
```

### Exception: Minimal Test Changes

Modify tests only if:

- Test itself is poorly written (fragile, wrong assertions)
- Test names need updating to match new structure
- Test duplicates existing coverage

**Always notify user** before modifying tests during refactor.

```bash
⚠️  Test modification required: [reason]
   Files affected: tests/test_foo.py
   Change: [what will change]
   Please confirm to proceed.
```

## When Tests Should NOT Change

- Refactoring function internals
- Renaming variables/methods
- Changing class structure
- Extracting/merging modules
- Adding type hints
- Performance optimizations

## Verification Checklist

After refactoring:

- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] No unintended behavior changes
- [ ] Test coverage maintained

```bash
# Verify all tests pass
pytest tests/ -v
pytest tests/e2e/ -v

# Check coverage is maintained
pytest --cov=src --cov-report=term-missing tests/
```

## Common Refactoring Patterns

### Extract Method

```python
# Before
def process(data):
    result = data * 2
    save(result)
    return result

# After - same behavior, better structure
def process(data):
    result = transform(data)
    return persist_and_return(result)
```

### Rename

```python
# Change variable/function name
# Tests using old name need updating (notify user)
```

### Move Code

```python
# Relocate between modules
# Import paths in tests may need updating (notify user)
```

## Anti-Patterns (Avoid)

- **Don't modify tests to make a broken refactor "pass"**
- **Don't skip running tests after refactor**
- **Don't refactor multiple things simultaneously** — one change at a time
