---
title: "Agents Don't Need Org Charts; They Need Context Boundaries"
date: 2026-08-13 13:47:26
slug: agents-need-context-boundaries-not-org-charts
lang: en
translation_key: agents-need-context-boundaries-not-org-charts
cover: /assets/img/agent-context-boundaries.png
categories: Meta Engineering
description: Multi-agent systems may need clear boundaries around knowledge, state, permissions, tools, and decisions more than human-style job titles. Agents are replaceable; context is durable.
keywords:
  - AI Agent
  - multi-agent systems
  - context boundaries
  - context governance
  - Workspace
  - Codex
  - agent architecture
  - multi-agent collaboration
  - durable context
  - Agent is replaceable
tags:
  - AI Agent
  - Context Governance
  - Multi-Agent Collaboration
  - Software Engineering
---

Recently, while using Codex, I have gradually settled into a highly efficient way of working.

I keep separate Workspaces and Threads for different projects, then use one master Thread to delegate tasks, receive results, and make the first round of decisions.

It looks roughly like this:

```text
Human
  ↓
Master Thread
  ↓
├── Workspace A / Thread A
├── Workspace B / Thread B
└── Workspace C / Thread C
```

This means I do not have to monitor many conversations at once.

I only need to follow the master Thread's decisions and determine where the work should go next.

At first, I simply found this approach less mentally demanding.

Then a question occurred to me:

> **Why are these child Threads naturally separated by project and Workspace, rather than by roles such as “architect agent,” “developer agent,” and “testing agent”?**

That question made me reconsider a common pattern in multi-agent system design.

## We Naturally Model Agents After Human Organizations

Many multi-agent systems use a structure like this:

```text
CEO Agent
├── HR Agent
├── Finance Agent
├── Sales Agent
└── Engineering Agent
```

This structure is easy to understand because it borrows directly from human organizations.

When we see “finance manager,” “HR,” or “engineer,” we already have a rough idea of what each one does.

But that understanding depends on social knowledge accumulated over a long period of time.

The title “finance manager” is itself a highly compressed label. It implies responsibilities, permissions, expertise, working relationships, and organizational rank.

For people, a job title can quickly evoke this shared understanding.

For an agent, however, the label “finance manager” or “architect” does not actually determine how it works.

What determines whether an agent can complete a task is something else:

- What can it see?
- What can it modify?
- Which tools can it use?
- Which rules must it follow?
- What task is it trying to complete?
- What counts as done?

This is why I increasingly think:

> **Roles are for people to understand; context is what agents execute within.**

## A Role Is a Label; Context Is the Boundary

This does not mean roles have no value.

A role can still serve as a convenient label for people, but it should not be the agent's primary execution boundary.

The same “developer agent” may encounter completely different code, rules, tools, permissions, and goals when it enters different projects.

Conversely, different tasks within the same project often share substantial background knowledge, historical decisions, and operational constraints.

So a more natural approach may not be to create a role first and then assign work to it.

It may be to define a context first, then let the right agent enter it to complete a task.

```text
Context
  ↓
Workspace
  ↓
Agent Thread
  ↓
Task
```

In software development, a Workspace is a natural container for this kind of context.

The code, documentation, rules, historical decisions, Git history, and current state all exist within that boundary.

Here, “context” does not mean only the model's current context window.

It is closer to a work environment that can be preserved and re-entered:

> **an execution boundary formed by knowledge, state, rules, permissions, and task goals.**

A context window can be compressed, cleared, or reconstructed.

But the durable facts of a project should not disappear when a Thread ends.

## Agents Are Replaceable; Context Is Durable

Agents can change.

Threads can end.

Models can be upgraded.

But the project's knowledge, rules, state, and decisions should persist.

That is why I have come to like this sentence:

> **Agent is replaceable; Context is durable.**

If we imagine an agent as a long-lived “digital employee,” we can easily end up adding more and more memory, identity, responsibilities, and personality to it.

But if we understand an agent as a temporary unit of capability that enters a context to perform a task, many problems become simpler.

It does not need to exist forever.

It only needs to obtain the necessary information and permissions, complete the task, and leave the result inside the context.

What needs continuous maintenance is not the agent itself, but the context in which it worked.

## The Master Agent May Be a Router, Not a Manager

This also changed how I understand the so-called “master agent.”

It may not really be a manager supervising a team of digital employees.

Instead, after understanding the goal, it identifies which context the task belongs to, selects the capabilities required, sends the task to the corresponding Thread, and uses the result to decide what happens next.

Rather than “managing employees,” it is performing:

> **context routing and decision-making.**

The difference may sound small, but it can lead to fundamentally different system designs.

One approach keeps creating agents that look more like people:

```text
CEO
CTO
Product Manager
Engineer
Finance
HR
```

The other begins by clearly dividing the business world:

```text
What is the domain?
Where is the boundary?
Which knowledge belongs here?
Which operations may occur?
Who may enter?
Which results may leave?
```

Agents then enter these contexts as needed to complete their tasks.

I currently find the second approach more natural.

This does not mean roles or organizational structures have no value. They still help people understand a system.

But in an agent system, the organizational structure may need to rest on already-defined boundaries around knowledge, permissions, and decisions—not the other way around, with human job templates imposed first.

## Closing Thoughts

I am not yet certain that this approach fits every multi-agent scenario.

For highly standardized tasks with stable responsibilities, roles may still be an effective organizational device.

But in my own practice, dividing contexts by project and Workspace feels far more natural than assigning job titles to agents first.

Perhaps what will remain stable in the future is not a collection of permanently online “digital employees.”

It may instead be a collection of stable, clearly bounded contexts that can continue accumulating knowledge over time.

An agent enters, completes the work, leaves the result, and moves on.

If that is true, then when we design multi-agent systems, the first question may not be:

> Which agent roles should we create?

It may be:

> **How should we define the context boundaries?**
