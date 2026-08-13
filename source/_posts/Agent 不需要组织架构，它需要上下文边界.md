---
title: Agent 不需要组织架构，它需要上下文边界
date: 2026-08-13 13:47:26
slug: agents-need-context-boundaries-not-org-charts
lang: zh-CN
translation_key: agents-need-context-boundaries-not-org-charts
cover: /assets/img/agent-context-boundaries.png
categories: MetaEngineering
description: Multi-Agent 系统真正需要的也许不是模仿人类岗位，而是明确知识、状态、权限、工具与决策的上下文边界。本文从 Codex 的 Workspace 和 Thread 实践出发，讨论为什么 Agent 可以替换，而 Context 应该持续存在。
keywords:
  - AI Agent
  - Multi-Agent
  - 上下文边界
  - Context
  - Workspace
  - Codex
  - 上下文治理
  - Agent 架构
  - 多 Agent 协同
  - Agent is replaceable
tags:
  - AI Agent
  - 上下文治理
  - 多 Agent 协同
  - 软件工程
---

最近在使用 Codex 时，我逐渐形成了一种很高效的工作方式。

我为不同项目保留独立的 Workspace 和 Thread，再用一个主 Thread 负责分派任务、接收结果，并完成第一轮判断。

大致是这样：

```text
Human
  ↓
Master Thread
  ↓
├── Workspace A / Thread A
├── Workspace B / Thread B
└── Workspace C / Thread C
```

这样，我不需要同时盯着很多会话。

我只需要关注主 Thread 做出了什么判断，以及接下来应该把任务交给谁。

一开始，我只是觉得这种方式很省精力。

后来我突然意识到一个问题：

> **为什么这些子 Thread 天然是按照项目和 Workspace 区分，而不是按照“架构师 Agent”“开发 Agent”“测试 Agent”来区分？**

这个问题，让我重新审视了现在很常见的一类 Multi-Agent 设计。

## 我们很容易把 Agent 设计成人类组织

很多 Multi-Agent 系统喜欢采用这样的结构：

```text
CEO Agent
├── HR Agent
├── Finance Agent
├── Sales Agent
└── Engineering Agent
```

这种结构很容易理解。

因为它直接借用了人类的组织架构。

当我们看到“财务经理”“HR”或者“工程师”时，不需要额外解释，就能大致知道他们负责什么。

但这种理解依赖的是人类长期形成的社会经验。

“财务经理”这个词，本身就是一个高度压缩的标签。它背后隐含着职责、权限、专业知识、协作关系和组织层级。

对于人来说，一个岗位名称可以快速唤起这些共同认知。

但对于 Agent 来说，“财务经理”或者“架构师”这个标签本身，并不能真正决定它如何工作。

真正决定一个 Agent 能否完成任务的，是另外一些东西：

- 它能看到什么？
- 它能修改什么？
- 它可以使用哪些工具？
- 它需要遵守哪些规则？
- 它当前要完成什么任务？
- 什么条件代表任务已经完成？

所以我现在越来越觉得：

> **岗位是给人理解的，Context 才是给 Agent 执行的。**

## Role 是标签，Context 才是边界

这并不是说 Role 没有价值。

Role 仍然可以作为一个方便人理解的标签，但它不应该成为 Agent 最核心的执行边界。

同一个“开发 Agent”，进入不同项目后，面对的代码、规则、工具、权限和目标可能完全不同。

反过来，同一个项目中的不同任务，往往共享大量背景知识、历史决策和操作约束。

因此，更自然的方式也许不是先创造一个岗位，再给它分配工作。

而是先定义一个 Context，再让合适的 Agent 进入其中完成任务。

```text
Context
  ↓
Workspace
  ↓
Agent Thread
  ↓
Task
```

在软件开发中，Workspace 恰好可以成为这种 Context 很自然的载体。

代码、文档、规则、历史决策、Git 记录和当前状态，都存在于这个边界之中。

这里的 Context，并不只是模型当前能够看到的上下文窗口。

它更接近一个可以持续保存和重新进入的工作环境：

> **知识、状态、规则、权限与任务目标共同形成的执行边界。**

上下文窗口可以被压缩、清空或者重建。

但这些长期存在的项目事实，不应该随着某个 Thread 的结束而消失。

## Agent 可以替换，Context 应该持续存在

Agent 可以更换。

Thread 可以结束。

模型也可以升级。

但项目中的知识、规则、状态和决策应该继续存在。

所以我现在很喜欢一句话：

> **Agent is replaceable; Context is durable.**

如果把 Agent 想象成一个长期存在的“数字员工”，我们就很容易不断给它增加记忆、身份、职责和人格。

但如果把 Agent 理解为进入某个 Context 执行任务的临时能力单元，很多问题反而会简单一些。

它不需要永久存在。

只需要获得必要的信息和权限，完成任务，并把结果留在 Context 中。

真正需要持续维护的，不是 Agent 本身，而是它工作过的 Context。

## 主 Agent 也许不是经理，而是路由器

这也让我重新理解了所谓的“主 Agent”。

它未必真的像一个经理，在管理一群数字员工。

它更像是在理解目标之后，判断任务属于哪个 Context，选择需要调用的能力，把任务交给对应 Thread，再根据结果决定下一步。

与其说它在“管理员工”，不如说它在做：

> **上下文路由与决策。**

这两种理解看起来差别不大，却可能导向完全不同的系统设计。

一种思路，是不断创造更像人的 Agent：

```text
CEO
CTO
产品经理
工程师
财务
人事
```

另一种思路，则是先把业务世界划分清楚：

```text
领域是什么？
边界在哪里？
哪些知识属于这里？
哪些操作可以发生？
谁可以进入？
什么结果可以离开？
```

然后，让 Agent 按需进入这些上下文完成任务。

我现在更倾向于后者。

这并不是说 Role 或组织架构没有价值。

它们依然可以帮助人理解系统。

只是对于 Agent 系统来说，组织结构也许应该建立在已经明确的知识、权限和决策边界之上，而不是反过来先套一个人类岗位模板。

## 写在最后

我还不确定这种方式是否适合所有 Multi-Agent 场景。

在高度标准化、职责非常稳定的任务中，Role 也许仍然是一种有效的组织方式。

但至少在我自己的实践里，按照项目和 Workspace 划分 Context，比先给 Agent 安排职位自然得多。

也许未来真正稳定存在的，并不是一个个长期在线的“数字员工”。

而是一个个稳定、清晰、可以持续积累的 Context。

Agent 进入其中，完成工作，留下结果，然后离开。

如果是这样，那么我们今天设计 Multi-Agent 系统时，真正应该先想的，可能不是：

> 应该设置哪些 Agent 岗位？

而是：

> **应该如何划分上下文边界？**
