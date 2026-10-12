---
applyTo: "**/*.{ts,js,py,go,cs,java,rs}"
---

# Code Review Standards (Correctness, Safety & Performance)

When reviewing pull requests, focus strictly on code-level safety, correctness, efficiency, and maintainability:

1. **Correctness & Precision**: Exact numerical representations (Decimal/integer cents vs float drift), null-safety, and edge cases.
2. **Security & Defensive Code**: Zero hardcoded secrets, input sanitization, parameterized queries, and log hygiene.
3. **Reliability & Exception Handling**: Specific exception handling (no silent error swallowing) and safe resource cleanup.
4. **Algorithmic Efficiency**: Avoid unnecessary $O(N^2)$ loops and eliminate N+1 database query patterns.
5. **Code Maintainability**: Single-responsibility functions, zero debug artifacts (`console.log`, `print()`), and no dead code.