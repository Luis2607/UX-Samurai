---
name: handling-errors
description: Build resilient applications with robust error handling strategies. Use for debugging, API design, and improving reliability.
---

# Error Handling Patterns

## When to use this skill
- Implementing error handling in new features.
- Designing error-resilient APIs.
- Debugging production issues.
- Improving application reliability.
- Implementing retry and circuit breaker patterns.

## Workflow

1.  **Identify Error Type**: Is it recoverable (network, input) or unrecoverable (bug, OOM)?
2.  **Choose Strategy**: Retry, Circuit Breaker, Fallback, or Crash?
3.  **Implement Pattern**: Use language-specific best practices.

## Resources

### Language-Specific Patterns
-   👉 [**Python Patterns**](resources/python-patterns.md) (Custom Exceptions, Context Managers, Retry)
-   👉 [**TypeScript Patterns**](resources/typescript-patterns.md) (Result Types, Async Handling)
-   👉 [**Rust Patterns**](resources/rust-patterns.md) (Result/Option, Custom Errors)
-   👉 [**Go Patterns**](resources/go-patterns.md) (Explicit Returns, Sentinel Errors)

### Universal Strategies
-   👉 [**Universal Patterns**](resources/universal-patterns.md) (Circuit Breaker, Aggregation, Fallback)

## Best Practices Checklist
-   [ ] **Fail Fast**: Validate input early.
-   [ ] **Preserve Context**: Include stack traces, metadata, and timestamps.
-   [ ] **Clean Up**: Always release resources (connections, files) in `finally` blocks.
-   [ ] **Don't Swallow Errors**: Log or re-throw; never silently ignore.
