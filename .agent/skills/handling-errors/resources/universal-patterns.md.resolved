# Universal Error Handling Patterns

## Circuit Breaker

Prevents cascading failures in distributed systems.

```python
class CircuitBreaker:
    def call(self, func: Callable[[], T]) -> T:
        if self.state == CircuitState.OPEN:
            if time_passed > self.timeout:
                self.state = CircuitState.HALF_OPEN
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = func()
            self.on_success()
            return result
        except Exception:
            self.on_failure()
            raise
```

## Error Aggregation

Collecting multiple errors (e.g., validation) instead of failing fast.

```typescript
class ErrorCollector {
  private errors: Error[] = [];
  
  add(error: Error) { this.errors.push(error); }
  
  throw() {
    if (this.errors.length > 0) throw new AggregateError(this.errors);
  }
}
```

## Graceful Degradation

Providing fallback functionality when errors occur.

```python
def get_user_profile(user_id):
    try:
        return fetch_from_cache(user_id)
    except Exception:
        return fetch_from_database(user_id) # Fallback
```

## Best Practices Checklist

- [ ] **Fail Fast**: Validate input early.
- [ ] **Preserve Context**: Include stack traces and metadata.
- [ ] **Clean Up**: Use `finally` or context managers.
- [ ] **Don't Swallow**: Log or re-throw, never silently ignore.
- [ ] **Specific Catching**: Don't catch generic `Exception` unless necessary.
