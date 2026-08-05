---
title: A Team SOP for Using Codex, OpenSpec, and Superpowers
date: 2026-05-23 14:27:28
slug: codex-team-usage-sop
lang: en
translation_key: codex-team-usage-sop
categories: Meta Engineering
cover: /assets/img/codex-team-usage-sop-cover.png
description: A team-oriented Codex usage SOP covering OpenSpec, Superpowers, context preservation, requirements discovery, product planning, implementation, validation, operations analysis, troubleshooting, and knowledge handoff.
keywords:
  - Codex
  - OpenSpec
  - Superpowers
  - team collaboration
  - SOP
  - AI engineering
  - context management
  - knowledge capture
tags:
  - AI Agent
  - Codex
  - OpenSpec
  - Team Collaboration
---

## 1. Purpose

This SOP defines how a team should use Codex, OpenSpec, and Superpowers for requirements discovery, product planning, implementation, testing, validation, operations analysis, troubleshooting, and knowledge capture.

This SOP is not only for software engineers. It also applies to product managers, QA engineers, designers, operations teams, customer success teams, implementation and delivery teams, data analysts, and any business team that needs to preserve project context.

Core goals:

+ Lower the barrier for new teammates to use Codex.
+ Prevent project context from living only in chat history.
+ Avoid forcing humans to restate everything when a Codex thread loses context.
+ Use OpenSpec to record requirements, decisions, task progress, validation results, and business conclusions in a structured way.
+ Use Superpowers to package frequent, complex operations and improve team collaboration efficiency.
+ Make team knowledge reusable, transferable, and continuously improvable.

---

## Quick Start: 5-Minute Version for New Team Members

If this is your first time using Codex in a project, start with this minimal flow:

1. Ask Codex to check whether relevant context already exists in OpenSpec.
2. Decide whether this task needs a new or updated OpenSpec change.
3. For small tasks, proceed directly. For larger tasks, write the proposal, design, and tasks first.
4. During execution, advance according to the tasks. Do not leave key decisions only in chat.
5. After completion, run the necessary validation and record the validation method and result.
6. Write the actual output, key decisions, and remaining issues back to OpenSpec.
7. If the change is complete, check whether specs need to be updated and then archive it if appropriate.

Minimal entry prompt:

```text
This is my first time working on a task in this project.

Please first check whether OpenSpec already contains relevant context, then tell me:

1. Whether we need to create or update an OpenSpec change
2. Whether there is a suitable Superpower to use
3. What the minimum viable path forward is
4. Which actions require my confirmation
```

---

## Deciding Whether to Use OpenSpec

OpenSpec exists to preserve reusable long-term context. It is not meant to turn every small action into a process.

Before starting a task, make a lightweight judgment:

```text
Will a future teammate, my future self, or a new Codex thread need to recover this context later?
```

If the answer is "yes," consider using OpenSpec.

Good cases for OpenSpec:

+ Requirements, solution design, acceptance criteria, or business rules need to be preserved long term.
+ The task spans multiple people, departments, time periods, or Codex threads.
+ A future owner needs to understand why a decision was made.
+ The work affects product behavior, technical design, test scope, data definitions, customer delivery, or operational workflows.
+ Key decisions, risks, validation results, or retrospective conclusions need to be recorded.
+ The completed task may affect future requirements, testing, releases, delivery, or business judgment.

Cases where a full OpenSpec flow may not be necessary:

+ One-off simple questions and answers.
+ Small copy, formatting, layout, or local explanation changes.
+ Clearly low-risk mechanical edits.
+ Temporary exploration that does not produce decisions worth preserving.
+ Codex is only being asked to explain, translate, polish, or summarize a short piece of content.

Recommended grading:

| Task type | Recommended handling |
|---|---|
| Simple Q&A, explanation, translation, polishing | Ask Codex to complete it directly. No OpenSpec needed |
| Small, low-risk tasks with no long-term impact | A lightweight judgment is enough |
| Tasks with requirements, solution design, acceptance criteria, testing, delivery, or business impact | Create or update an OpenSpec change |
| Cross-team, cross-thread, long-running, or high-risk tasks | OpenSpec must be used to record and drive the work |

One-line principle:

```text
OpenSpec is for preserving long-term valuable context, not for recording every conversation and small action.
```

---

## 2. Basic Principles

Every project should be able to use OpenSpec to carry long-term context, but not every small task needs to follow the full OpenSpec process.

OpenSpec is a structured record of project iteration context. It is used to preserve:

+ Project conventions
+ Requirement background
+ Solution design
+ Task breakdowns
+ Execution progress
+ Key decisions
+ Validation results
+ Business conclusions
+ Follow-up items

Do not rely only on Codex conversation history as the source of context.

If this happens:

```text
Codex ran out of room in the model's context window.
Start a new thread or clear earlier history before retrying.
```

Team members should be able to recover task context through OpenSpec instead of orally restating the full background.

---

## 3. Context Budget Principles

Codex, OpenSpec, skills, Superpowers, local tools, rule descriptions, project documents, and chat history all consume the model's context window.

An LLM's context window is limited. The more complex the context, the more information the model has to attend to at once, and the less attention remains for the actual task.

Therefore, the team should follow this principle:

```text
More tools are not always better.
More rules are not always better.

Complex workflows should be packaged only when needed,
not turned into Superpowers by default.
```

Pay special attention to the following:

+ Do not stuff Codex with a large amount of irrelevant background all at once.
+ Do not enable complex Superpowers for simple tasks.
+ Do not make Codex follow too many temporary rules at the same time.
+ Do not make Codex read unrelated documents just to appear "proper."
+ Do not turn OpenSpec into a running log; avoid polluting long-term context with low-value information.
+ Do not turn every small action into a Superpower.
+ Do not let a Superpower become a giant all-purpose workflow.

Recommended judgment:

```text
If a rule, tool, skill, or Superpower does not clearly help the current task, do not enable it.
```

Better practice:

+ Read only the OpenSpec context that is truly necessary.
+ Enable only the skill or Superpower directly related to the current task.
+ Break complex tasks into stages instead of loading every requirement at once.
+ After each meaningful stage, write key decisions into OpenSpec instead of relying on chat history.
+ Keep prompts short, clear, and goal-oriented.

One-line principle:

```text
Context is a budget, not a trash bin.
```

---

## 4. Responsibilities of the Three Tools

### Codex

Codex is responsible for understanding tasks, reading context, organizing information, supporting analysis, executing automatable work, running validation, and summarizing results.

It is both an executor and a collaborator.

### OpenSpec

OpenSpec is responsible for preserving long-term context.

It is the structured memory of the project. It records why something is done, how it is done, and how far it has progressed.

### Superpowers

Superpowers package frequent, complex operations.

They turn error-prone, multi-step, experience-heavy workflows into reusable capabilities that team members can call through natural language.

Recommended mental model:

```text
OpenSpec preserves context.
Superpowers package complex workflows.
Codex understands the task, selects tools, executes the process, and updates the record.
```

---

## Notes and Tips for Using Codex

Codex is especially useful for information organization, solution exploration, file edits, validation, and stage summaries. However, its effectiveness depends heavily on task description quality, context quality, and validation approach.

### Make the Task Clear

A good Codex task should include:

+ Goal: what you want to accomplish.
+ Background: why this matters.
+ Scope: what is included and what is excluded.
+ Input: relevant files, documents, links, data, or context.
+ Output: whether you expect code, documentation, tables, summaries, proposals, or checklists.
+ Validation: how to know the task is complete.

Recommended prompt:

```text
My goal is: [goal]
The background is: [background]
This scope includes: [scope]
This explicitly excludes: [out of scope]
Please first check the necessary context, then provide an execution plan.
If files need to be modified, first explain what you will change.
After completion, explain the validation method and result.
```

### Ask Codex to Judge Before Acting

For non-trivial tasks, do not ask Codex to "just finish it" immediately. A better pattern is to have Codex judge first:

+ Whether OpenSpec needs to be read.
+ Whether a change needs to be created or updated.
+ Whether a Superpower is needed.
+ Whether any high-risk operations are involved.
+ Whether user confirmation is required.

Recommended prompt:

```text
Please first assess this task's complexity and risk:

1. Whether OpenSpec is needed
2. Whether a Superpower is needed
3. What context needs to be read
4. Whether files will be modified or external systems affected
5. Which steps require my confirmation

Proceed only after that assessment.
```

### Control Context Instead of Loading Everything at Once

Do not give Codex every document, every rule, and every historical chat at once. Better practice:

+ Provide the goal and the most important background first.
+ Let Codex search for or identify the context it needs.
+ Add materials in stages.
+ Write long-term important information into OpenSpec.
+ Summarize details from temporary conversations in time, rather than leaving them buried in chat history.

### Explicitly Require Validation

Do not accept only "done." At the end of a task, ask Codex to explain:

+ What it did.
+ What it changed.
+ How it validated the result.
+ What the validation result was.
+ What remains unvalidated.
+ What risks or follow-ups remain.

Different roles validate in different ways:

| Role / scenario | Common validation methods |
|---|---|
| Product | Acceptance criteria checks, user flow review, scope confirmation |
| Engineering | Tests, lint, builds, page or API validation |
| QA | Test coverage, reproduction steps, regression results, defect status |
| Operations / business | Metric definition checks, execution checklist, retrospective conclusions |
| Data analysis | Data source confirmation, metric consistency, outlier checks |
| Customer success / implementation | Customer configuration checks, delivery checklist, risk confirmation |

### Stop and Confirm High-Risk Operations

The following operations require Codex to explain its plan and wait for human confirmation:

+ Deleting, overwriting, or batch-modifying files.
+ Database migrations, production data changes, or production configuration updates.
+ Releases, deployments, rollbacks, or actions that affect live users.
+ Actions that affect customer configurations, delivery scope, or external commitments.
+ Sending formal conclusions, reports, or external communications.

### Use Stage Summaries

When a task is long, information-heavy, or about to move to a new thread, ask Codex to summarize:

```text
Please create a stage summary based on the current context:

1. Current goal
2. Completed work
3. Remaining work
4. Key decisions
5. Validation results
6. Current risks
7. Recommended next steps

Write information that should be preserved long term into OpenSpec.
```

One-line principle:

```text
Ask Codex to perform more verifiable intermediate steps and fewer final leaps without context or validation.
```

---

## 5. Applicable Roles and Typical Scenarios

Different roles can use the same OpenSpec method. The difference is what each role focuses on recording.

| Role | Typical scenarios | What to record in OpenSpec |
|---|---|---|
| Product manager | Requirement analysis, user stories, PRD breakdown, scope confirmation, release planning | Background, goals, non-goals, acceptance criteria, key decisions, scope changes |
| Software engineer | Technical design, feature implementation, refactoring, bug fixes, API changes | Technical design, impact scope, implementation progress, validation results, risks |
| QA engineer | Test plans, test case design, defect reproduction, regression validation, acceptance reports | Test scope, test data, reproduction steps, actual results, remaining risks |
| Designer | UX proposals, interaction changes, design reviews, visual standard documentation | Design goals, user journeys, trade-offs, acceptance criteria, affected pages |
| Operations / business team | Campaign plans, process optimization, customer issue follow-up, business rule changes | Business background, target metrics, execution plan, validation definitions, retrospective conclusions |
| Data analyst | Metric definitions, data definitions, analysis conclusions, report iterations | Metric definitions, data sources, analysis assumptions, conclusions, follow-up actions |
| Implementation / customer success | Customer delivery, troubleshooting, configuration changes, handoff notes | Customer background, configuration items, operation logs, risks, delivery conclusions |

One-line principle:

```text
If a task needs to recover context across people, time, or threads, record it in OpenSpec.
```

---

## 6. OpenSpec Document Relationships and Retrieval Quality

OpenSpec is valuable not only because it records content, but also because it preserves relationships between project documents.

When Codex recovers context, it usually relies on file names, directory structure, headings, keywords, references, and task status to decide which content is relevant. The more structured OpenSpec is, and the clearer the relationships are, the better Codex can retrieve and understand project context.

### 6.1 Every Change Should Explain What It Relates To

When creating or updating an OpenSpec change, record as much as possible:

+ Related specs
+ Related code modules
+ Related requirement documents, test plans, business processes, data metrics, or customer projects
+ Related pages, APIs, database tables, or configuration items
+ Related historical changes
+ Which behaviors the current change affects
+ Which areas are out of scope

Recommended structure for a change proposal or design:

```markdown
## Related Context

- Related specs:
  - user-auth
  - billing-plan

- Related changes:
  - add-team-invitation-flow

- Related code:
  - src/modules/auth/
  - src/modules/billing/
  - apps/web/pages/settings/

- Related docs / business context:
  - PRD: team-permission-v2
  - Test plan: billing-regression
  - Metric: paid-team-conversion-rate
  - Customer project: enterprise-onboarding

- Affected behavior:
  - Permission checks after user login
  - Feature visibility after team plan changes

- Out of scope:
  - No changes to the payment flow
  - No changes to invoice generation logic
```

This helps Codex in a new thread decide faster which files to read and which files to ignore.

### 6.2 Specs Record Stable Capabilities, Changes Record Iteration Process

Teams need to distinguish the responsibilities of specs and changes.

`openspec/specs/` is for long-term stable product capabilities, behavior agreements, and system rules.

`openspec/changes/` is for a specific iteration, including its background, solution, tasks, progress, and validation results.

Do not put short-term task logs into specs. Do not leave long-term behavior rules only inside changes.

Recommended principle:

```text
Stable rules go into specs.
Iteration process goes into changes.
Long-term behavior after completion must be written back to specs.
```

### 6.3 Maintain Document Relationships After a Task Is Complete

When a change is complete, do more than check off tasks. Ask Codex to check whether it needs to:

+ Update related specs
+ Add references to related changes
+ Archive completed changes
+ Remove or compress outdated temporary notes
+ Record final validation results
+ Mark follow-up items

Recommended prompt:

```text
After the task is complete, please help maintain the OpenSpec document relationships:

1. Check whether this change affects existing specs
2. If it does, update the corresponding specs
3. Add related specs, related code, related docs, and related changes to the change
4. Mark task completion status
5. Record validation commands and results
6. Decide whether the change can be archived
7. Clean up outdated or duplicate temporary notes to avoid hurting future retrieval
```

### 6.4 Minimum Archive Output for a Completed Change

A completed change should leave more than checked-off tasks. It should allow a future new thread to recover context.

Before archiving, confirm at least:

+ The final goal is clear
+ The actual change summary is clear
+ Key decisions are recorded
+ Validation commands and results are recorded
+ Specs update needs have been checked
+ Related specs, related code, related docs, and related changes are recorded
+ Remaining follow-ups are marked

Recommended archive summary structure:

```markdown
## Completion Summary

- Final outcome:
- Actual changes:
- Key decisions:
- Verification:
- Specs updated:
- Follow-up:
```

### 6.5 Key Point: Prevent OpenSpec from Becoming Low-Quality Context

OpenSpec is not a chat backup. It is not an operation log.

Avoid recording:

+ Every ordinary command output
+ Trial-and-error process with no long-term value
+ Repeated background descriptions
+ Invalidated solutions that are not marked as such
+ Large blocks of code, materials, or background unrelated to the current change
+ Temporary guesses without conclusions

Prefer recording:

+ The final selected solution
+ Explicitly rejected alternatives and why they were rejected
+ Key decisions
+ Impact scope
+ Validation methods
+ Unresolved risks
+ Follow-up tasks

One-line principle:

```text
OpenSpec records reusable context, not model garbage.
```

### 6.6 Ask Codex to Regularly Maintain OpenSpec

As a project accumulates more iterations, ask Codex to periodically maintain OpenSpec retrievability.

Recommended prompt:

```text
Please help me improve the retrievability of the current OpenSpec:

1. Check openspec/specs/ and openspec/changes/
2. Identify documents with unclear names, missing relationships, or unclear status
3. Check whether active changes contain duplicate or outdated content
4. Check whether completed changes should be archived
5. Check whether specs are missing long-term rules that should have been written back from completed changes
6. Provide cleanup suggestions
7. Modify files only after I confirm
```

### 6.7 OpenSpec Maintenance Principles Should Also Be Written into OpenSpec

When initializing OpenSpec, do more than create the directory structure. Write the rules for maintaining OpenSpec into the project conventions.

Recommended locations:

+ The `context:` section of `openspec/config.yaml`, as short and strict project rules.
+ If needed, create `openspec/specs/openspec-maintenance/spec.md` for a fuller OpenSpec maintenance standard.

This way, every time Codex reads OpenSpec later, it knows not only what the project does, but also how OpenSpec should be maintained.

Core principles to write:

```text
OpenSpec is not a chat backup. It is reusable project context.
Specs record long-term stable capabilities, behavior rules, and system agreements.
Changes record specific iterations, task progress, decisions, and validation results.
Every change should maintain related specs, related code, related docs, and related changes.
Every change should clearly state affected behavior and out of scope.
After a task is complete, check whether long-term behavior needs to be written back to specs.
Completed changes should be archived in time to prevent active changes from becoming noise.
Avoid low-value operation logs. Record only key decisions, validation results, risks, and follow-ups.
Whenever creating, updating, or archiving OpenSpec content, maintain document relationships.
Control context complexity. Read only OpenSpec content directly related to the current task.
```

One-line principle:

```text
When initializing OpenSpec, also preserve the rules for maintaining OpenSpec itself.
```

### 6.8 OpenSpec Naming Conventions

OpenSpec naming directly affects future retrieval quality.

Recommended change naming:

+ Start with a verb, such as `add-`, `fix-`, `refactor-`, `remove-`, or `update-`.
+ Include a clear business object, such as `add-team-invitation-flow`.
+ Make the impact scope visible, such as `refactor-billing-plan-permissions`.
+ Avoid vague names such as `misc-fixes`, `update-stuff`, or `temp-change`.
+ For bug fixes, try to include both the problem and object, such as `fix-order-refund-status-sync`.

Recommended spec naming:

+ Use stable business capability names, such as `user-auth`, `billing-plan`, or `team-permissions`.
+ Do not use one-off task names as spec names.
+ One spec should correspond to one group of long-term stable behaviors. Do not put multiple unrelated capabilities into the same spec.

---

## 7. Standard Actions Before Starting Each Task

Before every non-trivial task, ask Codex to check OpenSpec first.

For very small tasks, a lightweight judgment is enough. Reading the full OpenSpec may not be necessary.

Very small tasks usually include:

+ Small copy edits
+ Pure formatting
+ Clear and low-risk single-point fixes
+ Local style tweaks that do not affect behavior

Lightweight judgment criteria:

+ Whether it clearly does not affect long-term behavior
+ Whether it does not require recording design decisions
+ Whether it does not need context recovery across threads
+ Whether it does not need full OpenSpec loading

Recommended prompt:

```text
Before starting, please check this project's OpenSpec:

1. Read openspec/config.yaml
2. Review the project conventions in context
3. Review existing specs in openspec/specs/
4. Check whether openspec/changes/ contains an active change related to this task

If there is a related change, continue based on it.
If there is no related change, decide whether this task needs a new OpenSpec change.
```

Short version:

```text
Please first check whether OpenSpec already contains relevant context, then decide whether we need to create or update a change.
```

---

## 8. When to Create an OpenSpec Change

The following cases must create or update an OpenSpec change:

+ New feature development
+ New requirements, requirement scope changes, or acceptance criteria changes
+ Behavior changes
+ Cross-role, cross-department, or cross-system collaboration
+ Cross-module, cross-service, or cross-page changes
+ Changes to test plans, acceptance scope, or regression strategy
+ Operational campaigns, customer delivery, business process changes, or data definition changes
+ Deployment, configuration, or data structure changes
+ Bug fixes with unclear scope
+ Tasks that require recording product, technical, QA, or business decisions
+ Tasks that may span multiple Codex threads
+ Work where future teammates need to know why a change was made
+ Long-term-impact changes involving APIs, data models, permissions, workflows, state machines, business rules, metric definitions, and similar areas

The following cases may not require a change:

+ Very small copy edits
+ Pure formatting
+ Clear and low-risk mechanical edits
+ Temporary investigation that does not produce long-term decisions
+ Local style tweaks that do not affect behavior

Judgment:

```text
If another person would struggle to understand the task background without reading the chat history, record it in OpenSpec.
```

### 8.1 Quick Decision Table

| Task type | Need an OpenSpec change? | Consider a Superpower? |
|---|---|---|
| Small copy edit | No | No |
| Pure formatting or mechanical edit | No | No |
| Clear, low-risk small bug | Depends on impact scope | No |
| Bug with unclear scope | Yes | Depends on whether the investigation process repeats |
| PRD, acceptance criteria, or requirement scope adjustment | Yes | Maybe |
| New feature | Yes | Depends on whether the process repeats |
| Cross-module refactor | Yes | Maybe |
| API, permission, state machine, or data model change | Yes | Maybe |
| Test plan, regression strategy, or acceptance report | Depends on impact scope | Maybe |
| Operational campaign, customer delivery, or business process adjustment | Depends on impact scope | Maybe |
| Metric definition, data definition, or reporting logic change | Yes | Maybe |
| Pre-release check | Depends on project requirements | Yes |
| Production data or production configuration operation | Yes | Must have approval, dry run, and rollback plan |

---

## 9. Recommended Prompt for Installing or Initializing OpenSpec

When a project does not yet have OpenSpec, do not only ask Codex to create the directory structure. Also ask Codex to write OpenSpec maintenance principles into the project conventions.

Recommended prompt:

```text
I want you to help install and configure OpenSpec in this project.

You may decide the appropriate granularity for OpenSpec records. My goal is to use OpenSpec to structure our iteration process, especially after a task is successfully completed, so that results, decisions, validation methods, and follow-up items are preserved.

Please prevent context from living only inside Codex conversations. This way, even if we later see "Codex ran out of room in the model's context window. Start a new thread or clear earlier history before retrying.", I can open a new thread and recover task context through OpenSpec without restating everything.

In addition to creating the basic OpenSpec structure, please write the OpenSpec maintenance principles into the project conventions so future OpenSpec records follow them.

Please focus on these principles:

1. OpenSpec is not a chat backup. It is reusable project context.
2. specs record long-term stable capabilities, behavior rules, and system agreements.
3. changes record specific iterations, task progress, decisions, and validation results.
4. Every change should maintain related specs, related code, related docs, and related changes.
5. Every change should clearly state affected behavior and out of scope.
6. After a task is complete, check whether long-term behavior needs to be written back to specs.
7. Completed changes should be archived in time to prevent active changes from becoming noise.
8. Avoid low-value operation logs. Record only key decisions, validation results, risks, and follow-ups.
9. Whenever Codex creates, updates, or archives OpenSpec content, it should maintain relationships between documents to improve future retrieval and context recovery.
10. Control context complexity. Read only content directly related to the current task.
```

---

## 10. Standard Workflow

### Step 1: Check Context

Do not let Codex directly modify files, output a solution, or proceed with execution before checking context.

First ask it to check OpenSpec:

```text
Please search OpenSpec first and confirm whether there are specs or changes related to this task.
```

### Step 2: Decide Whether a New Change Is Needed

If the task is large, unclear in scope, or involves behavior changes, create an OpenSpec change first.

```text
If you judge this to be a non-trivial change, please create an OpenSpec change first and record the requirement, solution, and task breakdown. Do not execute directly or produce the final conclusion first.
```

### Step 3: Break Down the Task

Ask Codex to split the task into executable items:

```text
Based on the OpenSpec change, please break this task into executable tasks and mark the recommended execution order.
```

### Step 4: Execute the Task

During execution, ask Codex to proceed according to the OpenSpec tasks:

```text
Please proceed through the tasks in the OpenSpec change one by one, and update task status after completion.
```

### Step 5: Validate Results

Do not accept only "it is fixed."

Ask Codex to complete the necessary validation based on task type, such as tests, lint, builds, page validation, API validation, test case review, acceptance criteria checks, data definition checks, business rule confirmation, or document review:

```text
After completion, please run or perform the necessary validation and record the validation method and result in the OpenSpec change.
```

### Step 6: Update OpenSpec

After the task is complete, Codex must write back the final state:

```text
After the task is complete, please update OpenSpec:

1. Mark completed tasks
2. Record the actual changes or business output
3. Record key decisions
4. Record validation results
5. Update related specs, related code, related docs, and related changes
6. Decide whether specs need to be updated
7. Record remaining issues or follow-up items
8. If the change is complete, archive it
```

---

## 11. Recovering Context in a New Codex Thread

When context is lost, a task is interrupted, or the work needs to move to a new thread, do not restate the full background manually.

Use this prompt:

```text
This is a new Codex thread. Please do not rely on previous chat history.

Please first read this project's OpenSpec:

1. openspec/config.yaml
2. openspec/specs/
3. openspec/changes/

Please find the active change that is still in progress and summarize:

- Current task goal
- Completed work
- Remaining work
- Key decisions
- Validated work
- Current risks
- Recommended next step

Then continue with the most reasonable next step.

Only load content directly related to the current task. Avoid loading unrelated history into the context all at once.
```

---

## 12. When to Consider Superpowers

Superpowers are useful for lowering the cost of complex operations. They package frequent, error-prone, multi-step work into standard capabilities.

Consider Superpowers first when:

+ A type of operation is repeated by the team.
+ The operation has many steps and steps are easy to miss.
+ New teammates are not familiar with the project but need to complete a standard task quickly.
+ The task needs to follow a fixed standard.
+ Team experience should be codified instead of passed down orally each time.
+ Codex needs to execute a fixed workflow for a type of task.
+ The task needs to combine multiple tools, scripts, checks, or document workflows.

Common examples:

+ Initialize OpenSpec
+ Create an OpenSpec proposal, design, and tasks
+ Advance work according to OpenSpec tasks
+ Update or archive OpenSpec after task completion
+ Break down PRDs and check acceptance criteria
+ Organize test plans, test cases, and regression checklists
+ Capture customer troubleshooting and delivery records
+ Create operational campaign checklists and retrospectives
+ Check metric definitions and preserve data analysis conclusions
+ Pre-commit checks
+ Code reviews
+ API change checks
+ Database migration checks
+ Frontend visual regression checks
+ Pre-release checklists
+ Incident investigation
+ Generate weekly reports, change logs, acceptance reports, retrospectives, or technical documentation

Avoid using Superpowers when:

+ The task is simple and one-off.
+ The requirement is still vague and has not become a stable workflow.
+ The team has not reached consensus, and packaging the workflow too early would increase maintenance cost.
+ The work involves deletion, overwrites, releases, or production operations without approval and dry-run mechanisms.

Judgment:

```text
If new teammates repeatedly ask "how do I do this step?", or senior teammates have to walk people through it every time, consider turning it into a Superpower.
```

### Boundaries of Superpowers

The value of Superpowers is reducing the cost of complex operations, not adding workflow burden.

Before using one, judge:

+ Whether the current task is truly complex.
+ Whether it will truly repeat.
+ Whether there is a clear, stable, reusable process.
+ Whether using a Superpower is simpler than asking Codex to do the task directly.
+ Whether the context it consumes is worth it.

If a task is simple, ask Codex to complete it directly. No Superpower is needed.

Recommended principle:

```text
Do simple tasks directly.
Package only repeated complex tasks.
Practice uncertain workflows first, then package them.
```

---

## 13. Using Superpowers Through Codex

When using Superpowers, teammates should not need to remember complex commands.

The recommended approach is to let Codex act as the coordinator:

1. First check OpenSpec and understand the current task context.
2. Then decide whether there is a suitable Superpower.
3. If there is, use that Superpower to complete the task.
4. If there is not, proceed with the normal Codex workflow.
5. If the task is likely to repeat in the future, suggest whether a new Superpower should be created.
6. After completion, write key results back to OpenSpec.

Recommended prompt:

```text
Please first check OpenSpec and understand this task's context.

Then decide whether this task is suitable for an existing Superpower:

- If there is a suitable Superpower, use it first and explain which part of the task it will solve.
- If there is no suitable Superpower, complete the task using the normal Codex workflow.
- If you think this task will repeat in the future, suggest whether it should be turned into a new Superpower.
```

New teammates can use this entry prompt:

```text
This is my first time handling a similar task in this project.

Please first check OpenSpec and the project documentation, then tell me:

1. Whether the current task already has relevant context
2. Whether there is a suitable Superpower
3. How you plan to complete this task in the fewest reasonable steps
4. Which actions require my confirmation
```

---

## 14. Safety Rules for Superpowers

To prevent Superpowers from becoming black boxes, the team should follow these rules:

+ Before Codex uses a Superpower, it must explain what problem the Superpower will solve.
+ For deletion, overwrites, releases, migrations, or production operations, human confirmation is required first.
+ Prefer dry runs, previews, diffs, and test commands.
+ After a Superpower completes, Codex must summarize what it did, what it changed, and what it validated.
+ If the task has long-term impact, OpenSpec must be updated.
+ Do not treat Superpowers as shortcuts that replace thinking.
+ A Superpower packages a standard process. It does not skip review.

### 14.1 Risk Levels and Confirmation Rules

| Risk level | Typical operations | Required Codex behavior |
|---|---|---|
| Low risk | Search, read files, view diffs, organize materials, run read-only commands | Can execute directly and summarize findings when needed |
| Medium risk | Modify code, update docs, adjust tests, organize PRDs, add test cases, draft analysis | Can execute, but must summarize changes and validation afterward |
| High risk | Delete files, overwrite configurations, run database migrations, deploy, batch-modify data, send formal external conclusions, adjust customer configuration | Must first explain the plan, impact scope, and rollback method, then wait for human confirmation |
| Never execute by default | Delete production data without backup, deploy without confirmation, overwrite user files without confirmation, make external delivery commitments without confirmation | Must not execute directly. Requires explicit authorization from the responsible owner |

Minimum confirmation information for high-risk operations:

+ What will be done
+ Which files, environments, data, or users will be affected
+ Whether there is a dry run, backup, or rollback plan
+ How to recover if execution fails
+ Who needs to confirm

Recommended prompt:

```text
Before using the Superpower, please explain:

1. Which Superpower you plan to use
2. Which steps it will execute
3. Whether it will modify files
4. Whether any high-risk operations are involved
5. Which steps require my confirmation
```

---

## 15. Recommended Process for Creating a New Superpower

When a workflow appears repeatedly, ask Codex to help capture it.

Recommended prompt:

```text
This workflow may be used repeatedly by the team in the future.

Please help me judge whether it is suitable to turn into a Superpower.

If it is suitable, please organize:

1. Applicable scenarios
2. Non-applicable scenarios
3. Input requirements
4. Execution steps
5. Safety boundaries
6. Validation methods after completion
7. Whether OpenSpec needs to be updated
```

If the Superpower should be created directly, continue with:

```text
Based on the workflow above, please help me create a reusable team Superpower.

Requirements:

- Clear name
- Explain applicable scenarios
- Clearly describe execution steps
- Mark risky operations
- Include validation methods
- Include how to update OpenSpec after task completion
- Make it callable by new teammates through natural language
```

---

## 16. Standardizing OpenSpec Required Actions with Superpowers

OpenSpec required actions are good candidates for Superpowers.

However, avoid creating one giant "all-purpose OpenSpec Superpower." A better approach is to split the workflow into several stable, clear, composable capabilities.

Recommended splitting principles:

+ One Superpower should own one stage.
+ Each Superpower should clearly state input, output, applicable scenarios, and non-applicable scenarios.
+ Small tasks should only receive a lightweight judgment. Do not force the full OpenSpec flow.
+ Read only OpenSpec content directly related to the current task.
+ High-risk actions such as creation, archiving, deletion, overwriting, releases, and migrations must first explain the plan and wait for confirmation.
+ After a Superpower completes, write key results back to OpenSpec instead of leaving them only in chat.

Recommended standardization into five OpenSpec Superpowers:

| Superpower | Problem it solves | Main output |
|---|---|---|
| `openspec-start-task` | How to check context before starting a task | Relevant context summary, whether a change is needed, next-step recommendation |
| `openspec-create-change` | How to create a change for a non-trivial modification | proposal, design, tasks, related context |
| `openspec-continue-change` | How to continue an existing change | Current status summary, next task, execution progress |
| `openspec-finish-change` | How to close out work after completion | Task status, validation results, decision records, archive judgment |
| `openspec-maintenance` | How to maintain OpenSpec retrieval quality | Naming, relationships, archive status, low-value context cleanup suggestions |

### 16.1 `openspec-start-task`

Applicable scenarios:

+ Starting a new requirement, bug, refactor, test, operations, data analysis, or customer delivery task.
+ A new thread needs to understand current task context.
+ A new teammate is touching a project task for the first time.

Input requirements:

+ The user's natural-language task description.
+ The current project workspace.
+ An existing OpenSpec directory.

Execution steps:

1. Read project conventions in `openspec/config.yaml`.
2. Search related specs, active changes, and historical changes.
3. Decide whether there is an existing related change to continue.
4. Decide whether a new OpenSpec change is needed.
5. Decide whether another suitable Superpower exists.
6. Output the minimum viable path forward.

Output requirements:

+ Relevant OpenSpec context summary
+ Whether a change needs to be created or updated
+ Whether another Superpower is needed
+ Next-step recommendation
+ Operations that require human confirmation

Non-applicable scenarios:

+ Clearly tiny copy, formatting, or low-risk mechanical edits.
+ The user explicitly asks for only a lightweight check.

### 16.2 `openspec-create-change`

Applicable scenarios:

+ New features, new requirements, or new business processes.
+ Behavior changes.
+ Cross-role, cross-department, or cross-system collaboration.
+ Cross-module, cross-service, or cross-page changes.
+ Tasks requiring product, technical, QA, or business decisions to be recorded.
+ Future owners need to know why the change was made.

Input requirements:

+ Task goal.
+ Confirmed related specs, business scope, code scope, test scope, or delivery scope.
+ Business background or constraints supplied by the user when needed.

Execution steps:

1. Generate a clear, searchable change name.
2. Create a proposal explaining background, goals, non-goals, and impact scope.
3. Create a design recording the solution, trade-offs, risks, and boundaries.
4. Create tasks broken into executable steps.
5. Add related specs, related code, related docs, and related changes.
6. Clearly state affected behavior and out of scope.

Output requirements:

+ Path of the created or updated change
+ Summary of proposal, design, and tasks
+ Questions requiring user confirmation
+ Recommended execution order

Safety boundaries:

+ If requirements are unclear, ask questions or mark assumptions. Do not invent business conclusions.
+ Do not stuff unrelated chat content into the change.
+ Do not write short-term task logs into specs.

### 16.3 `openspec-continue-change`

Applicable scenarios:

+ An existing OpenSpec change needs to continue.
+ Context is lost and needs to be recovered from OpenSpec.
+ Multiple Codex threads are handing off the same task.

Input requirements:

+ Change name, or the user's description of the current task.
+ Current workspace or relevant material scope.

Execution steps:

1. Read the target change's proposal, design, and tasks.
2. Summarize the current goal, completed tasks, remaining tasks, key decisions, and risks.
3. Check related specs, related code, related materials, and impact scope.
4. Choose the next most reasonable task to advance.
5. After advancement, update task status.
6. Record key decisions and validation results.

Output requirements:

+ Current change status summary
+ Work completed in this round
+ Output summary for this round
+ Validation results
+ Next-step recommendation

Safety boundaries:

+ Do not skip unfinished tasks.
+ If actual execution differs from the design, explain the difference first.
+ High-risk operations require human confirmation.

### 16.4 `openspec-finish-change`

Applicable scenarios:

+ The main tasks in a change are complete.
+ Before commit, merge, acceptance, delivery, or archive.
+ Key results from chat need to be preserved back into OpenSpec.

Input requirements:

+ Change name.
+ Current git diff, actual changes, or business output.
+ Validation methods already run or still needed.

Execution steps:

1. Check whether all tasks are complete.
2. Record actual changes or business output.
3. Record key decisions.
4. Record validation methods and results.
5. Update related specs, related code, related docs, and related changes.
6. Decide whether long-term behavior needs to be written back to specs.
7. Record remaining follow-ups.
8. Decide whether the change can be archived.

Output requirements:

+ Change completion summary
+ Validation results
+ Specs write-back judgment
+ Whether archiving is recommended
+ Remaining risks or follow-ups

Safety boundaries:

+ If validation was not run, say so clearly.
+ Do not casually modify specs before long-term behavior is confirmed.
+ Before archiving, confirm tasks, validation, write-back status, and follow-ups.

### 16.5 `openspec-maintenance`

Applicable scenarios:

+ The project has many iterations and OpenSpec content has grown.
+ Active changes contain duplicate, outdated, or unclear content.
+ New teammates report that they cannot find useful context.
+ The team wants to regularly improve OpenSpec retrieval quality.

Input requirements:

+ Current OpenSpec directory.
+ Optional: user-specified specs, changes, or business scope.

Execution steps:

1. Check `openspec/specs/` and `openspec/changes/`.
2. Identify documents with unclear names, missing relationships, or unclear status.
3. Check whether active changes are duplicate, outdated, or should be archived.
4. Check whether completed changes contain long-term rules that were not written back to specs.
5. Identify duplicate, outdated, or low-value context.
6. Output cleanup suggestions first, then wait for confirmation before modifying files.

Output requirements:

+ List of retrieval quality issues
+ Recommended changes
+ Directly executable cleanup plan
+ Deletion, archive, or merge operations that require human confirmation

Safety boundaries:

+ Default to suggestions only. Do not delete or rewrite at scale directly.
+ Archiving, deleting, or merging documents requires confirmation.
+ Do not over-abstract OpenSpec into documents that are hard to retrieve.

### 16.6 Other Recommended Team Superpowers

In addition to standard OpenSpec actions, teams can also capture the following general-purpose Superpowers.

### 16.7 Code Review Superpower

Applicable scenarios:

+ Pre-commit self-checks.
+ Pre-PR checks.
+ High-risk code changes.

Capability goals:

+ Check bug risks.
+ Check test gaps.
+ Check edge cases.
+ Check whether OpenSpec needs to be updated.

### 16.8 Pre-Commit Check Superpower

Applicable scenarios:

+ Preparing a commit or PR.

Capability goals:

+ Review git diff.
+ Run tests, lint, and build.
+ Check OpenSpec status.
+ Summarize risks and validation results.

### 16.9 Pre-Release Check Superpower

Applicable scenarios:

+ Before release, deployment, or launch.

Capability goals:

+ Check configuration changes.
+ Check migrations.
+ Check environment variables.
+ Check rollback plan.
+ Check whether OpenSpec is archived or updated.

### 16.10 Product Requirement Review Superpower

Applicable scenarios:

+ PRD draft review.
+ Requirement scope changes.
+ Unclear acceptance criteria.

Capability goals:

+ Check whether goals, non-goals, and user scenarios are clear.
+ Check whether acceptance criteria are verifiable.
+ Check whether dependencies, risks, and boundaries are missing.
+ Decide whether an OpenSpec change needs to be created or updated.

### 16.11 Test Plan Review Superpower

Applicable scenarios:

+ New feature test plans.
+ Regression scope confirmation.
+ Defect reproduction and pre-acceptance checks.

Capability goals:

+ Check test scope, test data, and coverage gaps.
+ Organize test cases, risks, and regression checklists.
+ Record validation results and remaining risks.
+ Decide whether OpenSpec needs to be updated.

### 16.12 Business Retrospective Superpower

Applicable scenarios:

+ Operational campaign retrospectives.
+ Customer delivery retrospectives.
+ Retrospectives after business process adjustments.

Capability goals:

+ Summarize goals, execution process, results, and deviations.
+ Preserve key decisions, lessons learned, and follow-up items.
+ Decide whether long-term rules need to be written into specs.

---

## 17. Prompt Library for Key Operations

This section is an appendix for team members to copy from. The workflow principles in Sections 7 through 14 take precedence. If a prompt conflicts with the main principles, follow the main principles.

### 17.1 Start a New Task

```text
Please first check whether OpenSpec already contains relevant context.

Focus on:

1. openspec/config.yaml
2. openspec/specs/
3. openspec/changes/

Please summarize content related to this task and decide:

- Whether there is a related active change
- Whether a new OpenSpec change is needed
- Whether there is a suitable Superpower
- What the minimum viable path forward is
```

### 17.2 Create a New OpenSpec Change

```text
Please create an OpenSpec change for this task.

Requirements:

1. The change name should be clear and searchable
2. The proposal should state background, goals, non-goals, and impact scope
3. The design should record key solution decisions, trade-offs, risks, and boundaries
4. The tasks should be broken into executable steps
5. Add related specs, related code, related docs, and related changes
6. Avoid unrelated background and keep the documents concise
```

### 17.3 Continue an Existing Change

```text
Please continue based on the existing OpenSpec change.

First read the change's proposal, design, and tasks, then summarize:

1. Current goal
2. Completed tasks
3. Remaining tasks
4. Key decisions
5. Current risks
6. Most reasonable next action

Then continue according to the tasks.
```

### 17.4 Decide Whether a Superpower Is Needed

```text
Please decide whether the current task is suitable for a Superpower.

Judgment criteria:

1. Whether it is a repeated task
2. Whether the steps are complex or easy to miss
3. Whether there is an existing stable process
4. Whether using a Superpower is simpler than direct execution
5. Whether the context it consumes is worth it

If suitable, explain which Superpower to use.
If not suitable, complete the task using the normal Codex workflow.
```

### 17.5 Control Context Complexity

```text
Please control context complexity.

Read only OpenSpec, code, materials, and tool instructions directly related to the current task.
Do not load unrelated specs, unrelated changes, or unnecessary Superpowers.
If more context is needed, explain why before continuing.
```

### 17.6 Pre-Execution Check

```text
Before execution, please confirm:

1. Which OpenSpec change corresponds to this task
2. What content needs to be modified, organized, or produced
3. Which behaviors, workflows, documents, data, or users will be affected
4. What is explicitly out of scope
5. What validation needs to be performed
6. Whether any high-risk operations require my confirmation
```

### 17.7 Update OpenSpec After Completion

```text
After the task is complete, please update OpenSpec:

1. Mark task completion status
2. Record actual changes or business output
3. Record key decisions
4. Record validation methods and results
5. Update related specs, related code, related docs, and related changes
6. Decide whether specs need to be updated
7. Decide whether the change can be archived
```

### 17.8 Recover Context in a New Thread

```text
This is a new Codex thread. Please do not rely on previous chat history.

Please recover context through OpenSpec:

1. Read openspec/config.yaml
2. Check openspec/specs/
3. Check openspec/changes/
4. Find the most relevant active change
5. Summarize task goal, completed work, remaining work, key decisions, validation results, and next step

Only load content related to the current task. Avoid consuming too much context.
```

### 17.9 Check Before Archiving a Change

```text
Before archiving this OpenSpec change, please check:

1. Whether all tasks are complete
2. Whether validation results have been recorded
3. Whether long-term behavior has been written back to specs
4. Whether related specs, related code, related docs, and related changes are complete
5. Whether any follow-up remains
6. Whether outdated or duplicate content needs to be cleaned up

Archive only after confirming everything is ready.
```

### 17.10 Improve OpenSpec Retrieval Quality

```text
Please help me check OpenSpec retrieval quality.

Focus on finding:

1. Specs or changes with unclear names
2. Changes missing related context
3. Completed changes that have not been archived
4. Content that should have been written back to specs but has not been
5. Duplicate, outdated, or low-value context
6. Issues that may affect Codex retrieval efficiency

Output suggestions first. Do not modify files directly.
```

### 17.11 Advance a New Requirement or Feature

```text
I want to advance a new requirement or feature: [describe the requirement or feature]

Please first check OpenSpec:

1. Whether related specs already exist
2. Whether related active changes already exist
3. Whether a new OpenSpec change is needed

If needed, create the proposal, design, and tasks first.
Then proceed according to the tasks and update OpenSpec after completion.
```

### 17.12 Handle an Issue or Defect

```text
I want to handle an issue or defect: [describe the issue]

Please first check OpenSpec and related context, then decide whether this issue involves existing specs or active changes.

If the scope is clear and small, handle it directly.
If it involves behavior changes, data flow, APIs, state logic, business rules, customer impact, or future tracking, create or update an OpenSpec change.

After completion, record the cause, fix, and validation method.
```

### 17.13 Check Before Commit, Delivery, or External Sync

```text
Please help me perform a pre-commit, pre-delivery, or pre-external-sync check:

1. Review the current git diff, document changes, or business output
2. Summarize this change or conclusion
3. Decide whether OpenSpec needs to be updated
4. Run the necessary tests, lint, build, acceptance criteria checks, data definition checks, or business review
5. Check whether obvious risks exist
6. Recommend whether it is ready for commit, delivery, or external sync
```

### 17.14 Product Requirement Review

```text
Please review this product requirement: [describe the requirement or paste the PRD]

Focus on:

1. Whether background, goals, and non-goals are clear
2. Whether user scenarios and core flows are complete
3. Whether acceptance criteria are verifiable
4. Whether dependencies, risks, and boundaries are explicit
5. Whether an OpenSpec change needs to be created or updated
6. Which questions require confirmation from product, design, engineering, QA, or business owners
```

### 17.15 Test Plan Review

```text
Please review this test plan: [describe the test plan]

Focus on:

1. Whether test scope and out-of-scope items are clear
2. Whether test data, environment, and preconditions are explicit
3. Whether positive, negative, boundary, compatibility, and regression scenarios are covered
4. Whether acceptance criteria can be validated by tests
5. Whether high-risk gaps exist
6. How test results and remaining risks should be written back to OpenSpec
```

### 17.16 Business Plan or Retrospective Organization

```text
Please help me organize this business plan or retrospective: [describe the business item]

Focus on outputting:

1. Background and goals
2. Execution process or plan
3. Key results and deviations
4. Confirmed decisions
5. Risks, issues, and follow-up items
6. Which long-term business rules or metric definitions need to be written into OpenSpec
```

### 17.17 Stage Summary

```text
Based on the current OpenSpec change and completed work, please create a stage summary:

1. Completed work
2. Remaining work
3. Confirmed decisions
4. Rejected alternatives and why they were rejected
5. Validation results
6. Current risks
7. Recommended next steps

Please update OpenSpec with information that needs to be preserved long term. Do not leave it only in chat.
```

### 17.18 Initialize OpenSpec and Write Maintenance Principles

```text
Help me initialize OpenSpec and write OpenSpec maintenance principles into the project conventions.

Requirements:

1. Create or check openspec/config.yaml
2. Write short, executable OpenSpec maintenance principles into context
3. Distinguish the responsibilities of specs and changes
4. Make clear that every change needs to maintain related specs, related code, related docs, and related changes
5. Make clear that after a change is complete, we should check whether specs need to be updated
6. Make clear that completed changes should be archived in time
7. Make clear that OpenSpec should not record low-value operation logs
8. Make clear that Codex should read only necessary context for the current task to avoid context pollution
9. If needed, create openspec/specs/openspec-maintenance/spec.md as the long-term maintenance standard

Please first explain which principles you plan to write, then modify files.
```

### 17.19 Use the Standard OpenSpec Superpower Actions

```text
Please handle this task according to the standard OpenSpec actions: [describe the task]

First decide which OpenSpec Superpower should be used:

1. `openspec-start-task`: check context before starting a task
2. `openspec-create-change`: create a change for a non-trivial modification
3. `openspec-continue-change`: continue an existing change
4. `openspec-finish-change`: close out and judge archive readiness after completion
5. `openspec-maintenance`: improve OpenSpec retrieval quality

Please explain the Superpower you selected, why you selected it, what context it will read, whether it will modify files, and which operations require my confirmation.
```

---

## 18. Team Member Usage Rules

Team members should follow these rules when using Codex:

+ Do not leave important requirements only in chat.
+ Do not let Codex start major changes without checking OpenSpec.
+ Do not forget to update OpenSpec after a task is complete.
+ Do not treat OpenSpec as an operation log.
+ Do not treat Superpowers as black-box automation.
+ Do not force complex tools into simple tasks.
+ Every larger task should be recoverable through OpenSpec.
+ Frequent complex workflows should gradually be captured as Superpowers.
+ When new teammates encounter an unfamiliar project, they should first ask Codex to check OpenSpec and available Superpowers.
+ For high-risk operations involving deletion, overwriting, deployment, migration, production data, customer configuration, or external commitments, Codex must first explain the plan and wait for confirmation.

---

## 19. Final Checklist

Before a task ends, Codex should complete the following checks:

- [ ] Has OpenSpec been checked?
- [ ] Has it been decided whether a change needs to be created or updated?
- [ ] Was work advanced according to tasks?
- [ ] Was only context necessary for the current task read?
- [ ] Were unrelated documents, rules, or tools avoided?
- [ ] Were only skills or Superpowers truly needed for the task used?
- [ ] Was context complexity controlled to avoid hurting model attention?
- [ ] Was necessary validation performed?
- [ ] Were validation results recorded?
- [ ] Was OpenSpec updated?
- [ ] Were related specs, related code, related docs, and related changes maintained?
- [ ] Was it checked whether long-term behavior needs to be written back to specs?
- [ ] Were key decisions recorded?
- [ ] Were acceptance results, business conclusions, or delivery status recorded?
- [ ] Were remaining items recorded?
- [ ] Can a new thread recover context through OpenSpec?

---

## 20. One-Line Summary

```text
OpenSpec prevents context from being lost.
Superpowers make complex workflows reusable.
Codex makes execution automated, verifiable, and preservable.
Context budget determines model attention, so keep simple things simple and load only what is needed.
```
