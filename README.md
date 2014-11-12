nobe
====

Simple DSL runner. Rationale:

- Write stories in simple text.
- Stories are composed of steps. Stories can be composed into other stories.
- Enact stories in different scenarios by performing actors' matching steps.

Roadmap (v0.1)
---

- argument/config parser
- Markdown story parser
- Story -> Scenario mapping
- Step implementations
- nobe runner
- console reporter
- node module

Roadmap (v0.2)
---

- tests and coverage
- tags, meta (pre-/postconditions, disabled/draft, template/atom)
- director (runner) respects meta
- $scope, parameters, return values

Roadmap (v0.3)
---

- html reporter
- embed media in reports
- webdriver, rest and other actors
- browser support
- ...