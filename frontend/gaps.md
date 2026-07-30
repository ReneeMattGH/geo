Biggest Gaps To Fix First
Critical: no real auth/authz boundary — portfolio and execution flows appear reachable by email identity patterns, not authenticated user principals.
Critical: trade execution safety — execution endpoints need stricter controls (auth, role checks, environment guardrails, explicit approval flow).
Critical: data access scope — portfolio reads/writes should be scoped to the authenticated owner only; avoid broad listing exposure.
High: no CI gate — no enforced pipeline for lint/typecheck/tests/security/build means regressions can slip straight to prod.
High: abuse/rate-limit hardening is incomplete — expensive endpoints need per-route limits and quotas.
High: CORS/security policy tightening — reduce permissive origin patterns and add stronger HTTP security headers.
High: untyped payload acceptance on simulation sharing — replace free-form dict payloads with strict schemas and size limits.
Medium: observability/health checks are shallow — health looks partially stubbed; add real worker checks + metrics endpoint.
Medium: test realism — current tests rely heavily on sqlite/mocks; need Postgres/Redis integration tests for prod parity.
Medium: config hygiene — default-secret patterns and missing .env.example style onboarding/hardening docs.
Endgame Recommendation (Practical Order)
Security wall first (Week 1): auth/authz + endpoint scoping + execution protections.
Reliability next (Week 1-2): CI pipeline, true health checks, rate limits, schema strictness.
Confidence layer (Week 2): integration tests on real infra + monitoring + runbook cleanup.
If you want, I can now turn this into a concrete execution checklist (file-by-file, with exact changes and effort estimates) and start implementing the highest-risk fixes immediately.