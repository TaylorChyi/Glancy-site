# Code Refactor Plan

This document tracks current cleanup efforts and future improvements.

## Analysis
- Several components used hard-coded API paths. This makes future maintenance
  error-prone.
- Version increments require manual updates after merges.
- There is no unified API client for server requests.

## Completed Tasks
1. Added missing entries in `API_PATHS` so all endpoints are centralized.
2. Updated components to reference these constants instead of literal strings.
3. Bumped patch version in `package.json`.

## Future Work
- Introduce a small API client or React hook to wrap `fetch` calls. This allows
  error handling and authentication logic to be reused.
- Apply design patterns such as the **Facade** pattern for API access and the
  **Context** pattern for global app state.
- Remove unused components and consolidate styles to reduce duplication.

