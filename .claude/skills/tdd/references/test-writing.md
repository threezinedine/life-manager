# Test Writing Guidelines

## Core Principles

- **Tests drive development** — Write tests first to define expected behavior
- **Tests document behavior** — Tests serve as living documentation
- **Tests ensure correctness** — Prevent regressions
- **Tests guide refactoring** — Confidence to improve structure without changing behavior

## Test Structure by Language

### Python

```python
import pytest
from module import function_to_test

class TestFeatureName:
    def test_happy_path(self):
        result = function_to_test(valid_input)
        assert result == expected_output

    def test_edge_case_empty(self):
        result = function_to_test("")
        assert result == default_value

    def test_error_invalid_input(self):
        with pytest.raises(ValueError):
            function_to_test(invalid_input)
```

### JavaScript/TypeScript (Vitest — preferred for client & server)

```typescript
import { describe, it, expect } from 'vitest'
import { featureToTest } from '../src/feature'

describe('FeatureName', () => {
  it('should handle happy path', () => {
    const result = featureToTest(validInput)
    expect(result).toBe(expectedOutput)
  })

  it('should handle edge case - empty input', () => {
    const result = featureToTest('')
    expect(result).toBe(defaultValue)
  })

  it('should throw on invalid input', () => {
    expect(() => featureToTest(invalidInput)).toThrow(ValueError)
  })
})
```

### JavaScript/TypeScript (Jest)

```typescript
import { featureToTest } from '../src/feature'

describe('FeatureName', () => {
  it('should handle happy path', () => {
    const result = featureToTest(validInput)
    expect(result).toBe(expectedOutput)
  })

  it('should throw on invalid input', () => {
    expect(() => featureToTest(invalidInput)).toThrow(ValueError)
  })
})
```

## Placement Rules

| Type | Python | JS/TS |
| --- | --- | --- |
| Unit | `tests/unit/`, `tests/test_*.py` | `src/**/*.test.ts`, `tests/unit/` |
| Integration | `tests/integration/` | `tests/integration/` |
| E2E | `tests/e2e/`, `e2e/` | `tests/e2e/`, `playwright/`, `cypress/` |

## Naming Conventions

| Language | File | Class/Suite | Test |
| --- | --- | --- | --- |
| Python | `test_<module>.py` | `TestFeatureName` | `test_<behavior>_<scenario>` |
| JS/TS | `<feature>.test.ts` | `describe('FeatureName')` | `it('should <behavior>')` |

## TDD Implementation Phases

### Phase 1: Write Failing Test Only

```python
# Python - stub implementation
def add(a, b):
    raise NotImplementedError("Not yet implemented")
```

```typescript
// JS/TS - stub implementation
export const add = (a: number, b: number): number => {
  throw new Error('Not yet implemented')
}
```

### Phase 2: Minimal Implementation (make test pass)

```python
def add(a, b):
    return a + b
```

```typescript
export const add = (a: number, b: number): number => a + b
```

## Running Tests During TDD

### Python (Bash)

```bash
pytest tests/test_math.py -v
pytest --cov=src tests/ -v
```

### JavaScript/TypeScript (Vitest)

```bash
vitest run src/feature.test.ts
vitest run --coverage
```

### JavaScript/TypeScript (Jest) Bash

```bash
jest src/feature.test.ts
jest src/components/button/button.test.ts
jest --coverage
```

## Assertions Quick Reference

### Python Code

- `assert result == expected`
- `with pytest.raises(Error):`
- `@pytest.mark.parametrize("x,y", [(1,2), (3,4)])`

### JS/TS (Vitest/Jest)

- `expect(result).toBe(expected)`
- `expect(() => fn()).toThrow()`
- `expect(result).toEqual(expect.objectContaining({...}))`
