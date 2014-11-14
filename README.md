nobe
====

Simple DSL runner for task automation. Rationale:

- Write stories in simple text.
- Stories are composed of steps. Stories can be re-used to compose other stories.
- Enact stories in different scenarios by performing actors' matching steps.

Want to discuss or have a question? Raise an Issue!

Motivation
--

Task automation should:
- Not require syntax and semantics of a Turing complete programming language.
- Not require behavioural syntax nor given-when-then structure.
- Not depend on any (unit) test framework.

Roadmap (v0.1)
---

- argument/config parser (DONE)
- Markdown story parser
- Story -> Scenario mapping
- Step implementations
- nobe Director runner
- console reporter
- node module

Roadmap (v0.2)
---

- jshint, tests and coverage
- tags, meta (pre-/postconditions, disabled/draft, template/atom)
- director (runner) respects meta
- assert actors
- $scope, parameters, return values

Roadmap (v0.3)
---

- html reporter
- embed media in reports
- webdriver and rest actors
- browser support
- multi scene support
- ...