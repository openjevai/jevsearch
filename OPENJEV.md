# OpenJEV Support

This fork adds optional [OpenJEV](https://openjev.sh) support alongside the original [TypeSafe](https://typesafe.ai) integration. TypeSafe remains the default; anyone with a `TYPESAFE_API_KEY` sees zero behaviour change.

## What was added

- **`src/lib/jev-search-server.ts`** — Added `provider` option to `JevSearchOptions`. Provider selection: explicit `provider` option > `JEV_PROVIDER` env > TypeSafe if `TYPESAFE_API_KEY` is set (unchanged default) > OpenJEV if only `OPENJEV_API_KEY` is set. When OpenJEV is selected, the endpoint is `https://api.openjev.sh/v1/systemone`, the model is `openjev`, and the key is read from `OPENJEV_API_KEY`. Error messages and retry logic updated to mention 503/429/529 as retryable.
- **`registry/next/route.ts`** — Comment updated to mention `OPENJEV_API_KEY`.
- **`src/pages/api/jev-search.ts`** — Comment updated to mention `OPENJEV_API_KEY`.
- **`bench/run.ts`** — Usage comment updated with OpenJEV example.
- **`README.md`** — OpenJEV support note after the intro; key configuration and handler options table updated.
- **`registry.json`** — `OPENJEV_API_KEY` added to `envVars`; docs updated.
- **`public/r/jev-search.json`** — Embedded copies of `jev-search-server.ts` and `route.ts` synced with the source files; `OPENJEV_API_KEY` added to `envVars`.

## Provider selection rule

1. Explicit choice wins: `provider: "openjev"` option or `JEV_PROVIDER=openjev` env var.
2. Otherwise, if `TYPESAFE_API_KEY` is set → TypeSafe (exactly as before, default unchanged).
3. Otherwise, if only `OPENJEV_API_KEY` is set → OpenJEV.

## Configuration

```bash
# Option A: TypeSafe (default, unchanged)
TYPESAFE_API_KEY=tsk_…

# Option B: OpenJEV (free community gateway)
OPENJEV_API_KEY=ojev_…

# Option C: Both keys present, force OpenJEV
TYPESAFE_API_KEY=tsk_…
OPENJEV_API_KEY=ojev_…
JEV_PROVIDER=openjev
```

| Setting | TypeSafe | OpenJEV |
|---|---|---|
| Endpoint | `https://api.typesafe.ai/v1/systemone` | `https://api.openjev.sh/v1/systemone` |
| Model | `jev-latest` | `openjev` |
| Key env | `TYPESAFE_API_KEY` | `OPENJEV_API_KEY` |
| URL env | `TYPESAFE_API_URL` | `OPENJEV_API_URL` |
| Overload | 529 | 503 (also 429) |

## Verification

A live POST to `https://api.openjev.sh/v1/systemone` with model `openjev`, state `ping`, and one noul question returned HTTP 200. No hardcoded `api.typesafe.ai` default was introduced — the original TypeSafe defaults are preserved; OpenJEV defaults only apply when OpenJEV is the selected provider.

## Upstream

Original project: https://github.com/kylemclaren/jevsearch by @kylemclaren.
