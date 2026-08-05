---
title: "Why I Started Simplifying My AI Agents"
date: 2026-07-13 10:54:10
slug: why-i-started-simplifying-ai-agents
lang: en
translation_key: why-i-started-simplifying-ai-agents
categories: Meta Engineering
cover: /assets/img/why-i-started-simplifying-ai-agents.png
description: After intensive use of AI agents such as Codex and Claude Code, I began removing unnecessary skills, rules, and context. This article explains why more configuration is not always better and how restraint can make agents more reliable.
keywords: [AI Agent, Codex, Claude Code, skills, context management, AGENTS.md, agent workflows, software engineering]
tags:
  - AI Agent
  - Codex
  - Skill
  - Software Engineering
---

Over the past year, I have used AI agents such as Codex and Claude Code intensively in my day-to-day development work.

At first, like many people, I kept trying to give the agent more capabilities.

Whenever I encountered a new kind of task, I added a Skill. Whenever I discovered a rule, I wrote it into `AGENTS.md`. After a difficult investigation, I wanted to preserve the process so that it could be reused next time.

I assumed the agent would become smarter and smarter.

Eventually, I discovered that it was not so simple.

## More Skills Are Not Always Better

I now create Skills less often and use them more selectively.

Not because Skills are useless.

Quite the opposite: Skills are powerful, which is exactly why they should be used with care.

Every time you load a Skill, you are essentially telling the agent:

> **In addition to the current task, you must pay attention to these extra rules, processes, and constraints.**

If the task is only a code-reading exercise, a small edit, or a simple investigation, that extra information may not help. It can dilute the information the task actually requires.

Often, the agent is already capable of doing the work well without a Skill.

## More Context Is Not Always Better

Over time, I developed a habit:

**If the current task does not clearly require something, do not load it in advance.**

I used to think there was no harm in reading a little more.

Then I realized that every additional piece of context gives the agent one more thing it has to consider.

A historical record, a design document, and a workflow can all look important. But when they are unrelated to the current task, they continually divide the agent's attention.

Now I want an agent to focus on only three things at each step:

- What exactly must be accomplished now?
- Which information is directly relevant to that goal?
- What needs to be read next?

Everything else should remain unloaded unless it becomes necessary.

## `AGENTS.md` Also Requires Restraint

I fell into another trap as well.

Whenever an agent made a mistake, I felt tempted to add another rule to `AGENTS.md`.

Over time, the file grew longer and longer.

Eventually, I realized that many of those rules did not belong in the default context of every task.

My approach is now simple:

`AGENTS.md` contains only instructions that **need to be followed almost every time**.

Workflows, checklists, and one-off requirements belong in more appropriate places, rather than being piled into the entry point.

The simpler the entry point, the easier it is for the agent to identify what truly matters.

## A Small Habit I Use Now

Whenever I consider adding a new Skill, I ask myself:

- Can the agent complete the work without it?
- Will it genuinely be reused?
- Will it introduce unrelated context?
- Does the current task actually need it?

If I do not have a strong reason, I usually do not create or load it.

Often, **fewer rules produce more stable results**.

## Closing Thoughts

This article does not present a profound methodology. It is simply a record of what I have learned from using AI agents in practice.

If I had to summarize it in one sentence:

> **An AI agent does not improve with more configuration; it improves with cleaner context.**

When an agent begins to drift, our first instinct is often to add more rules, more Skills, and more documentation.

My experience points in the opposite direction:

**Try subtraction first.**

It may be more effective than adding yet another layer.

---

## Postscript

I later turned some of the practices discussed here into two open-source Skills that I continue to use in my own work:

- **[agent-workflow-governance](https://github.com/echopath-labs/agent-workflow-governance)**<br>
  Provides lightweight software-engineering workflow constraints for complex tasks without forcing every process into every task by default.

- **[workspace-health-review](https://github.com/echopath-labs/workspace-health-review)**<br>
  Periodically checks a workspace for rule bloat and accumulated context, helping keep it maintainable over time.

But I want to emphasize the central point once more:

**Do not use a Skill merely because one exists.**

A Skill should solve a genuinely recurring and complex problem, not replace capabilities the agent already has.

Often, **restraint matters more than addition**.
