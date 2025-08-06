# Code Refactor Plan

This document tracks current cleanup efforts and future improvements.

## Analysis
- Several components used hard-coded API paths. This makes future maintenance
  error-prone.
- There is no unified API client for server requests.

## Completed Tasks
1. Added missing entries in `API_PATHS` so all endpoints are centralized.
2. Updated components to reference these constants instead of literal strings.
3. Introduced `useApi` hook providing authenticated requests.
4. Added `ApiProvider` with a facade-based API client for global access.

## Future Work
- Remove unused components and consolidate styles to reduce duplication.

## Naming Conventions
- Place all test files under a `tests` directory located alongside the module they verify.
- Avoid using the legacy `__tests__` naming to maintain a consistent structure.
