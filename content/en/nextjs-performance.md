## Context

After the project moved from an external team to in-house development, the existing codebase needed an audit and a refactoring plan. Performance of the server-rendered Next.js application was a separate area of work.

## My contribution

I audited the application and developed a refactoring plan. On the client side, I introduced a Flux architecture with Redux and moved business logic into middleware.

To address load, I built a Node.js proxy that cached completed SSR responses in front of Next.js. I also worked on backend infrastructure throughput using Redis, clustering, and Docker network optimization.

## Two separate areas of work

Caching completed responses and optimizing the backend addressed different problems. The first reused the output of server rendering. The second concerned request processing in the backend and its infrastructure.

This distinction matters when assessing the result: page-serving throughput and API throughput are different measurements.

## Verification and operations

My work on the project included CI/CD, feature flags, Sentry and Loki, and unit and integration tests. This connected application changes with verification and operation of the system.

## Outcome

I worked on performance at several levels, from frontend architecture to SSR caching and backend infrastructure. This project illustrates how my frontend work expanded into the boundary between applications and operations.

Specific throughput figures will be added once the workload and measurement conditions are clarified.
