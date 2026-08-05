---
title: 为什么我开始给 AI Agent 做减法
date: 2026-07-13 10:54:10
slug: why-i-started-simplifying-ai-agents
lang: zh-CN
translation_key: why-i-started-simplifying-ai-agents
categories: MetaEngineering
cover: /assets/img/why-i-started-simplifying-ai-agents.png
description: 在高强度使用 Codex、Claude Code 等 AI Agent 后，我开始减少不必要的 Skill、规则和上下文。本文讨论为什么配置并非越多越好，以及如何通过克制让 Agent 获得更稳定的表现。
keywords:
  - AI Agent
  - Codex
  - Claude Code
  - Skill
  - 上下文管理
  - AGENTS.md
  - Agent 工作流
  - 软件工程
tags:
  - AI Agent
  - Codex
  - Skill
  - 软件工程
---

最近一年，我一直高强度使用 Codex、Claude Code 等 AI Agent 来参与日常开发。

刚开始的时候，我和很多人一样，总想着不断给 Agent 增加能力。

遇到一种任务，就增加一个 Skill；发现一条规则，就写进 `AGENTS.md`；做完一次复杂排查，就想着沉淀下来，方便以后继续使用。

当时觉得这样会越来越智能。

后来我发现，事情并没有那么简单。

## Skill，不是越多越好

我现在越来越少创建 Skill，也越来越克制使用 Skill。

不是因为 Skill 没用。

恰恰相反，是因为 Skill 很有用，所以更应该慎用。

每加载一个 Skill，本质上都是在告诉 Agent：

> **除了当前任务，你还需要额外关注这些规则、流程和约束。**

如果当前只是一次代码阅读、一次简单修改，或者定位一个问题，这些额外的信息很可能不会帮助 Agent，反而会稀释当前任务真正需要关注的内容。

很多时候，不使用 Skill，Agent 本身已经能够很好地完成工作。

## 上下文不是越多越好

后来我慢慢养成了一个习惯：

**如果当前任务没有明确需要，就不要提前加载。**

以前，我总觉得多读一点总没坏处。

后来发现，每增加一份上下文，Agent 就多了一份需要考虑的内容。

一条历史记录、一份设计文档、一套工作流程，看起来都很重要。

但如果它们与当前任务无关，就会不断分散 Agent 的注意力。

现在，我更希望 Agent 每一步都只关注三件事：

- 当前真正要完成什么？
- 哪些信息与这个目标直接相关？
- 下一步需要读取什么？

除此之外，能不加载，就不加载。

## AGENTS.md 也应该克制

我还踩过另一个坑。

以前，每次 Agent 犯一次错误，我都会忍不住往 `AGENTS.md` 里补一条规则。

时间久了，它越来越长。

后来我才发现，很多规则其实并不适合默认出现在每一次任务里。

现在我的做法很简单：

`AGENTS.md` 只放那些**几乎每次都需要遵守**的内容。

至于工作流、检查清单、一次性的要求，都放到更合适的位置，而不是全部堆在入口。

入口越简单，Agent 越容易理解真正重要的事情。

## 我现在的一个小习惯

现在每次准备新增一个 Skill，我都会先问自己几个问题：

- 不使用它，Agent 能完成吗？
- 它真的会反复使用吗？
- 它会不会引入更多无关上下文？
- 当前任务真的需要它吗？

如果没有足够坚定的理由，我通常就不会新增，也不会加载。

很多时候，**少一点规则，反而会得到更稳定的结果。**

## 写在最后

这篇文章没有什么高深的方法论，只是我这一段时间使用 AI Agent 的一些实践。

如果让我总结成一句话，那就是：

> **AI Agent 不是配置越多越好，而是上下文越干净越好。**

很多时候，当 Agent 开始跑偏，我们第一反应是继续增加规则、增加 Skill、增加文档。

但我的经验恰恰相反：

**先试着做减法。**

也许，它会比继续做加法更有效。

---

## 后记

文中提到的一些实践，我后来整理成了两个自己日常也一直在使用的开源 Skill，感兴趣的话可以参考：

- **[agent-workflow-governance](https://github.com/echopath-labs/agent-workflow-governance)**<br>
  用于在复杂任务中提供轻量级的软件工程工作流约束，而不是把所有流程默认塞进每一次任务。

- **[workspace-health-review](https://github.com/echopath-labs/workspace-health-review)**<br>
  用于定期检查工作区是否出现规则膨胀、上下文堆积等问题，帮助保持工作区长期可维护。

不过，我还是想强调本文最想表达的一点：

**不要因为有 Skill，就去使用 Skill。**

Skill 应该解决真正重复且复杂的问题，而不是代替 Agent 本身已经具备的能力。

很多时候，**克制，比增加更重要。**
