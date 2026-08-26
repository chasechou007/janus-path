---
title: "Why Multiple Agents, Rather Than One Universal Harness"
date: 2026-08-26 11:31:54
slug: why-multiple-agents-not-one-universal-harness
lang: en
translation_key: why-multiple-agents-not-one-universal-harness
cover: /assets/img/agent-profiles-standardized-interfaces.png
categories: Meta Engineering
description: A model fitting into a harness does not mean the resulting agent is trustworthy. This essay explains why a calibrated Harness + Model should be treated as a complete Agent Profile, and how RelayPact enables a trusted Host Agent to delegate bounded work to other agents.
keywords: [AI Agent, Agent Harness, Agent Profile, RelayPact, Model Routing, Agent Delegation, Multi-Agent, Codex, Pi, OpenCode Go, Model-Harness Fit]
tags: [AI Agent, Multi-Agent Collaboration, Architecture, Software Engineering, RelayPact]
---

Recently, I have been thinking about a question:

> Will future agent systems follow **One Harness, Many Models**, or **Many Agent Profiles, Standardized Interfaces**?

I increasingly lean toward the latter.

But let me clarify something first: I am not rejecting **One Harness, Many Models**.

Quite the opposite. I use this pattern myself.

Codex can connect to different models, and so can Pi. In many scenarios, this approach is simple, direct, and already works well.

What I actually question is something else:

> **Should we expect one harness to cover every agent scenario simply by switching models?**

My answer increasingly is: we do not need to.

## First, What Do I Mean by These Terms?

An **LLM** is the model itself.

A **Harness** is the full runtime and execution system that drives a model to perform agentic work, including the Agent Loop, Context, Tools, Session, Recovery, and more.

What I call an **Agent Profile**—the thing that can actually be put to work—is closer to:

```text
Agent Profile
=
Harness
+
Model
+
Configuration
+
Calibration
```

In other words, I do not think a Harness and an LLM should be evaluated in complete isolation from each other.

The fact that a model can be connected to a Harness only tells us:

> **Integration works.**

It does not necessarily tell us:

> **Agent works well.**

## One Harness Can Support Many Models, but There Are Limits

Many agent frameworks support multiple model providers:

```text
Harness
├── Model A
├── Model B
└── Model C
```

This is clearly valuable.

It can help us:

- reduce model costs;
- perform model routing;
- compare different models;
- avoid dependence on a single provider;
- choose a more suitable model for each task.

So there is nothing inherently wrong with **One Harness, Many Models**.

The issue is that different models do not respond to Prompts, Context, Tools, and Agent Loops in the same way.

A model that performs well in one Harness may not demonstrate the same capability in another.

The reverse is also true.

Loop, Context Strategy, Tool Strategy, Compaction, Session, and Recovery may look like relatively independent parts inside a Harness, but in real operation they all become coupled with model behavior.

This is similar to building a car.

Combining the best motor, chassis, suspension, and autonomous-driving system does not automatically produce the best car.

The difficult part is tuning the whole vehicle.

Agents are the same.

> **The strongest Model + the strongest Harness does not necessarily equal the strongest Agent.**

What matters is whether the two fit—and whether the combination has been sufficiently calibrated and validated.

## Plugin Architecture Reduces Assembly Cost, Not Validation Cost

DeepSeek recently open-sourced its Harness around an interesting idea:

> Everything is a Plugin.

The Model, Loop, Tool, Session, Sandbox, and other components can all be replaced.

From the perspective of a Harness Framework, this is an elegant design.

It lowers the cost of experimenting with and composing different approaches.

But:

> **Composability does not guarantee capability.**

Taking the strongest Loop from A, the best Context system from B, and the richest Tools from C does not automatically produce the strongest Agent.

An Agent is not a deterministic program.

The fact that a combination runs successfully does not mean it will remain reliable in real situations involving long tasks, complex Context, Tool Failure, or Session Recovery.

This is why I increasingly believe:

> **The most underestimated cost of a Harness is not only development, but the continuous calibration and validation that follow.**

Being able to assemble it is one thing.

Being able to use it reliably over time is another.

## Why I Still Use One Harness, Many Models

This point matters.

If I rejected **One Harness, Many Models** entirely, [RelayPact](https://github.com/echopath-labs/relaypact) would not look the way it does today.

RelayPact currently supports:

```text
Codex + Sol
      ↓
   RelayPact
      ↓
Codex + OpenCode Go (another model)
```

In other words, I am indeed using:

> **the same Harness + different models**

to form different Agent Profiles.

And I am continuing to work toward:

```text
Codex + Sol
      ↓
   RelayPact
      ↓
Pi + OpenCode Go (another model)
```

This step goes further by crossing the Harness boundary.

So my position has never been:

> One Harness, Many Models does not work.

It is:

> **One Harness, Many Models is valuable, but there is no need to restrict every choice to one Harness.**

## Codex + Sol Is Not Universal, Either

For now, I prefer to use:

```text
Codex + Sol
```

as my primary Host Agent.

The reason is simple.

My workspace conventions, Skills, engineering habits, context organization, and judgment of Agent behavior have all developed around Codex over a long period of time.

I know what it is good at.

I also know where it tends to fail.

The experience accumulated through long-term use is itself an engineering asset.

But this does not mean Codex + Sol is best at everything.

It still has limits in cost, quota, and speed, and some local tasks do not need to be completed by it at all.

A minimal Harness such as Pi may be faster and lighter for bounded tasks with clear Context.

Other models may also be more suitable for particular kinds of work.

So what I want is not a universal Agent.

It is:

> **a Host Agent that I have used for a long time and for which I have established an engineering baseline, able to call and manage other Agents that are better suited to specific tasks.**

## This Is Where RelayPact Begins

I prefer a structure like this:

```text
             Codex + Sol
            Trusted Host
                 │
             RelayPact
         ┌───────┴────────┐
         ↓                ↓
Codex + another LLM   Pi + another LLM
      Executor           Executor
         │                  │
         └───── Result ─────┘
                  ↓
              Host Review
```

The Host Agent is responsible for:

- understanding the overall task;
- defining task boundaries;
- deciding where to delegate;
- controlling authority;
- reviewing the result;
- making the final acceptance decision.

The Executor Agent is responsible for completing specific work within clearly defined boundaries.

The goal is not to increase the number of Agents.

It is:

> **to use the differences in capability, speed, and cost across Agent Profiles while preserving a consistent quality baseline.**

I summarize this principle as:

> **Start with one trusted host agent, then delegate outward.**

## Model Routing and Agent Delegation Do Not Conflict

RelayPact is not intended to replace Model Routing.

They solve different problems.

### Model Routing

Model Routing answers:

> Which model should handle this inference request?

```text
Request
   ↓
Model Router
   ↓
Model A / B / C
```

### Agent Delegation

Agent Delegation answers:

> Which Agent should execute this complete task?

```text
Task
  ↓
Host Agent
  ↓
RelayPact
  ↓
Executor Agent
```

Once a task has its own goal, Workspace, multiple rounds of Tool Calling, authority boundaries, acceptance criteria, and result evidence, it is no longer merely a model invocation.

The question changes from:

> Which model should answer this request?

to:

> **Which agent should own and execute this task?**

So I now think about the distinction this way:

> **Model Routing selects the model.**

> **RelayPact selects the Agent that will execute the task.**

The two can coexist perfectly well.

## RelayPact Connects Agents, Not Models

This is the most important point in the essay.

I do not want RelayPact merely to help Codex switch internally to a cheaper model.

I want:

```text
Codex + Sol
```

to be able to hand a task with a clear goal, scope, authority, and acceptance criteria to:

```text
Codex + another LLM
```

and eventually to:

```text
Pi + another LLM
another Harness + another LLM
```

The key is not which model is on the other side.

It is not even whether the other side uses the same Harness.

The key is:

> **whether it is an independently evaluable Agent Profile with a clear capability boundary.**

Therefore:

> **RelayPact connects agents, not models.**

> **It solves controlled delegation between Agents, not model switching.**

## Why Emphasize “Controlled”?

Different Agents may have different Harnesses, Models, Sessions, or even completely separate Workspaces.

So I do not assume:

> If the Executor receives the Host's entire history, it will necessarily arrive at exactly the same understanding.

The same Context does not imply the same Interpreted State.

This is why RelayPact emphasizes explicitly passing:

```text
Goal
Scope
Constraints
Relevant Context
Authority
Expected Output
Required Evidence
```

Not:

> “Here is all my context. Continue from where I left off.”

But:

> “Here is the task. Here are the boundaries, the authority, and the acceptance requirements.”

The Executor Agent can complete the work autonomously.

But whether the result is accepted remains a decision for the Host Agent or a human.

> **Delegation does not mean surrendering authority.**

Execution responsibility is delegated.

Final control is not.

## Standardized Protocols Will Make This Easier, Not Eliminate Multiple Agents

Some people believe that the current variety of Harnesses is only a temporary consequence of fragmented model interfaces.

As MCP, A2A, Runtime Protocols, and other interfaces become more standardized, they expect the future to converge on:

> One Harness, Many Models.

I do not.

Protocol standardization solves:

> **Interoperability**

not:

> **Behavioral Equivalence**

Standardized interfaces will certainly make it easier to switch between different Agents.

But they will not turn those Agents into the same kind of Agent.

Standards unify the boundaries between Agents.

The differences remain inside them.

This is why I expect the future to look more like:

> **Many Agent Profiles, Standardized Interfaces**

The more standardized the protocols become, the easier it is for me to switch among different Agents.

It does not mean that I need to put every model into the same Harness.

## The Three Layers of EchoPath Labs

This line of thought has also helped me clarify the relationship among OpenDomain, RelayPact, and EchoPath.

### OpenDomain — Meaning

Enable different Agents to share relatively stable business meaning.

> **What does it mean?**

### RelayPact — Bounded Action

Enable different Agents to delegate tasks with clear goals, boundaries, and evidence.

> **What should be handed off and executed?**

### EchoPath — Continuity

Observe what happened, and determine how to continue and recover after drift or interruption.

> **What happened, and how do we continue?**

This can be compressed further:

> **OpenDomain preserves meaning.**
>
> **RelayPact bounds action.**
>
> **EchoPath preserves continuity.**

## Closing Thoughts

I am not opposed to **One Harness, Many Models**.

It is already an effective way to build Agents, and I use it myself.

But my work usually involves longer Context, more complex engineering, sustained execution, and higher quality requirements.

In these situations, I am increasingly unwilling to treat:

> the model can be connected

as equivalent to:

> this Agent is now trustworthy.

I prefer to treat a calibrated and validated:

> **Harness + Model**

as a complete Agent Profile.

Then a Host Agent that I have used over time and for which I have established an engineering baseline can delegate, under explicit controls, to other Agents better suited to particular tasks.

RelayPact is therefore not a rejection of Model Routing.

It takes one more step beyond Model Routing:

> **If different combinations of Harnesses and models have their own value, why must every choice be constrained to a single Harness?**

**RelayPact connects agents, not models.**

**It solves controlled delegation between Agents, not model switching.**
