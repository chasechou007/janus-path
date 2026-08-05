---
title: The Stronger the Agent, the More We Need Software Engineering
date: 2026-08-05 11:01:56
slug: stronger-agents-need-better-software-engineering
lang: en
translation_key: stronger-agents-need-better-software-engineering
cover: /assets/img/stronger-agents-need-software-engineering.png
categories: Meta Engineering
description: AI makes code cheaper, not complexity free. Architecture, modularity, schemas, tests, and domain models reduce agent uncertainty through cognitive reuse.
keywords:
  - AI Agent
  - Codex
  - software engineering
  - architecture
  - Architecture is cached reasoning
  - cognitive reuse
  - ProTable
  - modularity
  - automated testing
  - domain models
  - token efficiency
  - agent uncertainty
tags:
  - AI Agent
  - Software Engineering
  - Architecture
  - Systems Thinking
---

The more I use Codex in real development work, the more convinced I become of one thing:

**AI is changing how software gets built, but it is not making decades of software engineering thinking obsolete.**

If anything, the opposite may be true.

As agents become better at understanding requirements, modifying code, running tests, and autonomously driving complex tasks forward, many practices originally designed to improve developer productivity and control complexity are beginning to reveal a new kind of value.

The most obvious effects are simple:

**fewer tokens and less drift.**

But token usage is only the visible symptom.

What is really changing is this:

> **Software engineering is evolving from managing human complexity to also managing agent uncertainty.**

And the stronger the agent becomes, the more important this becomes.

## Starting with ProTable

Years ago, when I was working on frontend architecture, I built foundational components similar to ProTable.

The reason was straightforward.

Business systems contain a huge number of list pages: user lists, order lists, customer lists, approval lists, and so on.

If every developer had to repeatedly implement querying, pagination, filtering, loading states, error handling, and permission control from scratch, development would be slower, and each implementation would gradually become different.

So we abstracted those recurring problems away.

When building a new business page, developers should ideally only need to care about:

* what data to query;
* which fields to display;
* which business actions are available;
* and which rules are unique to that particular scenario.

How pagination works, how query parameters are structured, and how error states are displayed should not need to be solved again every time.

Traditionally, we would describe the value of this as:

**code reuse.**

But looking back at it today, I think that description is incomplete.

What gets reused is not just code.

What also gets reused are the **engineering decisions** that have already been made.

Why was pagination designed this way?

Why are query parameters structured like this?

Why does the component expose these extension points instead of others?

Someone had already thought through those questions, discussed them, made mistakes, and eventually arrived at a stable structure.

The code is simply the artifact that preserves those decisions.

---

## If AI Can Write the Code, Why Do We Still Need This?

Once agents enter the picture, a natural question appears:

If Codex can quickly generate a table implementation, why spend time abstracting it?

Why not simply let the agent generate another one next time?

For demos, prototypes, and disposable scripts, I think that approach is perfectly reasonable.

But for complex systems that need to evolve for months, years, or even longer, I increasingly disagree with it.

Because:

> **Cheaper code generation does not mean that understanding and decision-making have become free.**

Imagine a system with no stable table abstraction.

Today, you ask an agent to build a user list. It has to search the repository, understand how pagination works, inspect API conventions, infer state-management patterns, and figure out permission handling.

Tomorrow, it builds an order list and goes through much of the same reasoning again.

In another thread, it builds a customer list and once again needs to read the context, reconstruct conventions, and decide how the feature should fit into the project.

Even if all three implementations are correct, the agent has performed almost the same reasoning three times.

That repeated reasoning shows up as:

more repository searches, more file reads, larger contexts, more tokens, and more places where the agent has to make independent decisions.

Now compare that with a system that already has a mature ProTable abstraction.

The agent’s problem changes from:

> How should I implement an enterprise-grade table?

to:

> How should this business scenario map onto the existing ProTable abstraction?

The problem space becomes dramatically smaller.

What you save is no longer just code.

More importantly, you reduce the amount of **repeated reasoning** the agent has to perform.

---

## Architecture Is Cached Reasoning

This led me to a different way of thinking about architecture:

> **Architecture is cached reasoning.**

In a sense, architecture is engineering reasoning that has already been performed and preserved.

A mature component is a collection of stabilized engineering decisions.

A stable API is a set of established system boundaries.

A schema is a set of explicitly expressed data constraints.

A test suite is an executable definition of what the system considers correct.

A domain model is a maintained body of business understanding.

Historically, these things were designed primarily for humans.

Now they also serve agents.

When these structures exist, the agent no longer needs to repeatedly answer:

> How should this problem be solved?

It only needs to answer:

> How does the current problem fit into the structure that already exists?

Those are very different levels of complexity.

That is why I increasingly believe that one of the most important software engineering principles in the agent era is:

> **Do not make an agent repeatedly reason about problems that have already been solved.**

If a problem is stable, frequent, and recurring, its solution should gradually move out of prompts and temporary agent reasoning and into more durable engineering structures.

That structure might be a component, framework, SDK, schema, API, test suite, convention, domain model, or some other form of infrastructure.

This is not merely code reuse.

It is a new form of:

**cognitive reuse.**

---

## Software Engineering Now Reduces Agent Uncertainty

Seen from this perspective, many traditional software engineering practices have not lost relevance at all.

Their value has simply expanded.

| Software engineering practice | Traditional value                         | Additional value in the agent era                    |
| ----------------------------- | ----------------------------------------- | ---------------------------------------------------- |
| Abstraction and reuse         | Reduce repeated implementation            | Reduce repeated reasoning                            |
| Modularity                    | Reduce coupling and support collaboration | Reduce agent search scope and context size           |
| APIs, types, and schemas      | Reduce interface ambiguity                | Reduce the agent’s interpretation space              |
| Automated tests               | Prevent regressions                       | Give agents an objective feedback loop               |
| Git                           | Versioning and collaboration              | Provide state boundaries, auditability, and recovery |
| Documentation and specs       | Transfer knowledge                        | Provide durable external context                     |
| Domain models                 | Establish a shared business language      | Give agents stable business semantics                |

Take modularity.

We traditionally valued high cohesion and low coupling because they make systems easier for teams to work on.

In the agent era, modularity provides another very practical benefit:

**it reduces how much of the system the agent needs to understand for a given task.**

If a business change spans more than a dozen directories, the agent has to search repeatedly:

Where is this state modified?

Who generates this field?

Will changing this file affect something elsewhere?

Even if the context window is large enough to hold the entire repository, that does not mean the entire repository belongs in context.

Irrelevant information is still noise.

Clear module boundaries tell the agent:

> This task mostly lives here.

The same applies to types, schemas, and interface contracts.

If the system does not clearly define whether a field is nullable, which states are valid, or what a particular identifier represents, the agent has to infer those answers.

A strong agent can often infer them successfully.

But:

> **The fact that an agent can guess correctly does not mean it should be required to guess.**

Many software failures are not caused by an agent being unintelligent.

They happen because the system allows too many reasonable interpretations.

Good engineering reduces that ambiguity.

---

## Lower Token Usage Is Only the Symptom

Why do well-structured systems often consume fewer tokens?

The reason is straightforward.

If the architecture is clear, the agent searches less.

If module boundaries are explicit, it reads fewer files.

If APIs and schemas are well defined, it has to infer less.

If the domain model is stable, it does not need to reconstruct business semantics from scattered code and documents.

If tests are strong, validation paths become shorter and more objective.

So lower token consumption is not necessarily the result of clever prompt optimization.

It is more often a consequence of better structure.

What has really been reduced is the agent’s:

**search space, context space, interpretation space, and decision space.**

The relationship can be summarized like this:

```text
Better software engineering structure
        ↓
Smaller agent search space
        ↓
Smaller required context
        ↓
Smaller interpretation space
        ↓
Smaller decision space
        ↓
Fewer tokens and less repeated reasoning
        ↓
Lower risk of drift
```

Lower token usage, shorter execution paths, and less drift are downstream effects.

That is why I no longer think of token savings as merely a cost issue.

In many cases, token efficiency is an external signal that the system itself has become easier to reason about.

---

## Stronger Agents Can Spread Chaos Faster

This may be the part that concerns me most.

In the past, there was a natural limit to how much code a developer could modify in a day.

Even in a poorly structured system, the rate at which disorder could spread was constrained by human throughput.

Agents change that limit.

A capable agent can, in a short period of time:

create many files, modify multiple modules, perform a large-scale refactor, change APIs, add tests, and even continue repairing problems introduced by its own earlier changes.

That productivity is valuable.

But productivity itself is neutral.

If the direction is correct, it amplifies good structure.

If the direction is wrong, it amplifies bad decisions just as quickly.

In a repository with unclear boundaries, weak tests, missing constraints, and ambiguous domain semantics, a stronger agent may simply spread that disorder faster.

This creates a somewhat counterintuitive relationship:

> **The stronger the agent becomes, the stronger our engineering constraints need to become as well.**

Because we are handing increasingly powerful execution capabilities to the agent.

In the past, poor software engineering might merely have slowed a team down.

In the agent era, it can also make disorder spread several—or even dozens of—times faster.

---

## But Good Engineering Is Amplified Too

The opposite is equally important—and far more encouraging.

Agents do not only amplify the risks of bad engineering.

They also amplify the value of good engineering.

A well-structured codebase is easier for an agent to understand.

A clearly bounded module is easier to modify safely.

A well-tested system allows an agent to autonomously carry longer task chains forward.

A stable domain model allows a new thread to recover business understanding much faster.

A mature component system lets an agent deliver large amounts of business functionality without repeatedly solving infrastructure problems.

In other words:

> **Software engineering used to amplify human productivity.**

Now it is also beginning to:

> **amplify agent productivity.**

That may be the most useful way to reinterpret traditional software engineering in the AI era.

---

## From Code Reuse to Cognitive Reuse

If I had to summarize this shift in one phrase, I would call it:

**from code reuse to cognitive reuse.**

In the past, we preserved code because we did not want the next developer to implement the same thing again.

Today, we should also ask:

> Which problems should the next agent not have to reason through again?

If the same engineering decision keeps recurring, we should try to make it durable.

If a business concept repeatedly needs explanation, it should have a stable model.

If an error repeatedly has to be rediscovered by the agent, it should probably become a test or a static constraint.

If an operation repeatedly depends on a prompt reminding the agent what to do, it may belong in an engineering rule or an automated mechanism instead.

Prompts are good at telling an agent:

**what needs to be done this time.**

Software engineering is better at telling an agent:

**how things are supposed to be done in this system.**

AI is making code increasingly cheap to produce.

But cheaper code does not make complex systems simple.

When code generation stops being the main bottleneck, the difficult problems increasingly become:

How do we preserve structure?

How do we maintain long-term consistency?

How do we control agent uncertainty?

How do we prevent greater execution speed from turning into faster disorder?

Those are still software engineering problems.

So the real question is probably not:

> Will AI make software engineering obsolete?

The better question is:

> **Now that agents can produce code this quickly, have we built an engineering system capable of handling that level of productivity?**

My answer is becoming increasingly clear:

**The stronger the agent, the more we need software engineering.**
