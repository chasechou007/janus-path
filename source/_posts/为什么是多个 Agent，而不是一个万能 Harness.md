---
title: 为什么是多个 Agent，而不是一个万能 Harness
date: 2026-08-26 11:31:54
slug: why-multiple-agents-not-one-universal-harness
lang: zh-CN
translation_key: why-multiple-agents-not-one-universal-harness
cover: /assets/img/agent-profiles-standardized-interfaces.png
categories: MetaEngineering
description: 模型能接入 Harness，不代表这个 Agent 已经值得信任。本文讨论为什么经过调校的 Harness + Model 应被视为完整 Agent Profile，以及 RelayPact 如何让可信 Host Agent 受控委托其他 Agent。
keywords: [AI Agent, Agent Harness, Agent Profile, RelayPact, Model Routing, Agent Delegation, Multi-Agent, Codex, Pi, OpenCode Go, Model-Harness Fit]
tags: [AI Agent, 多 Agent 协同, 架构设计, 软件工程, RelayPact]
---

最近我一直在思考一个问题：

> 未来的 Agent 系统，会是 **One Harness, Many Models**，还是 **Many Agent Profiles, Standardized Interfaces**？

我越来越倾向后者。

但这里先说明，我并不否定 **One Harness, Many Models**。

恰恰相反，我自己就在使用这种模式。

Codex 可以接不同模型，Pi 也可以接不同模型。很多场景下，这种方式简单、直接，而且效果已经不错。

我真正怀疑的是另一件事：

> **我们是否应该期待一个 Harness，通过不断切换模型，就覆盖所有 Agent 场景？**

我的答案越来越偏向：不需要。

## 先说一下我对几个概念的理解

**LLM** 是模型本身。

**Harness** 是驱动模型完成 Agent 工作的一整套运行和执行机制，包括 Agent Loop、Context、Tools、Session、Recovery 等。

而我这里所说的、真正可以拿来工作的 **Agent Profile**，更接近：

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

也就是说，我并不倾向于把 Harness 和 LLM 完全拆开评估。

因为模型能接进 Harness，只能说明：

> **Integration works.**

并不能直接说明：

> **Agent works well.**

## 一个 Harness 可以支持很多模型，但这件事有边界

很多 Agent Framework 都支持多个 Model Provider：

```text
Harness
├── Model A
├── Model B
└── Model C
```

这当然有价值。

它可以帮助我们：

- 降低模型成本；
- 做模型路由；
- 对比不同模型；
- 避免绑定单一供应商；
- 针对不同任务选择更合适的模型。

所以 **One Harness, Many Models** 本身没有问题。

问题在于，不同模型对 Prompt、Context、Tool 和 Agent Loop 的反应并不相同。

一个模型在某个 Harness 中表现很好，换到另一个 Harness，不一定还能发挥出同样的能力。

反过来也一样。

Loop、Context Strategy、Tool Strategy、Compaction、Session、Recovery，看起来是 Harness 内部相对独立的组成部分，但在真实运行中，它们都会和模型行为产生耦合。

这和汽车很像。

最好的电机、最好的底盘、最好的悬架和最好的智驾系统拼在一起，并不会自动得到最好的汽车。

真正困难的是整车调校。

Agent 也是一样。

> **最强的 Model + 最强的 Harness，不一定等于最强的 Agent。**

真正重要的是两者是否适配，以及这个组合有没有经过足够的调校和验证。

## 插件化降低的是组装成本，不是验证成本

最近 DeepSeek 开源了 Harness，其中一个很有意思的理念是：

> Everything is a Plugin.

Model、Loop、Tool、Session、Sandbox 等都可以替换。

从 Harness Framework 的角度看，这种设计很漂亮。

它降低了实验和组合不同方案的成本。

但：

> **Composability does not guarantee capability.**

A 的 Loop 最强，B 的 Context 最好，C 的 Tools 最丰富，把它们拼在一起，并不会自动得到最强的 Agent。

因为 Agent 不是一个确定性程序。

一个组合能够正常运行，不代表它在长任务、复杂 Context、Tool Failure、Session Recovery 等真实场景里仍然可靠。

所以我越来越认为：

> **Harness 最容易被低估的成本，不只是开发，而是后续持续的调校和验证。**

能搭出来是一回事。

能不能长期稳定地用，是另一回事。

## 为什么我仍然在使用 One Harness, Many Models

这一点其实很重要。

如果我完全不认可 **One Harness, Many Models**，那 [RelayPact](https://github.com/echopath-labs/relaypact) 本身也不会是现在这个样子。

目前 RelayPact 已经支持：

```text
Codex + Sol
      ↓
   RelayPact
      ↓
Codex + OpenCode Go（其他模型）
```

也就是说，我确实在利用：

> **同一个 Harness + 不同模型**

形成不同的 Agent Profile。

而我正在继续推进：

```text
Codex + Sol
      ↓
   RelayPact
      ↓
Pi + OpenCode Go（其他模型）
```

这一步则进一步跨越 Harness 边界。

所以我的思路从来不是：

> One Harness, Many Models 不行。

而是：

> **One Harness, Many Models 有价值，但没必要把所有选择都限制在一个 Harness 里。**

## Codex + Sol 也不是万能的

我目前更愿意把：

```text
Codex + Sol
```

作为主要的 Host Agent。

原因很简单。

我的工作区规范、Skills、工程习惯、上下文组织方式，以及我对 Agent 行为的判断，长期都围绕 Codex 形成。

我知道它擅长什么。

也知道它容易在哪里出问题。

这种长期使用积累下来的经验，本身就是一种工程资产。

但这并不意味着 Codex + Sol 什么都最好。

它同样有成本、额度、速度等方面的限制，有些局部任务也未必需要它来完成。

Pi 这样的极简 Harness，在一些上下文明确、边界清楚的局部任务里，可能更快、更轻。

其他模型在某些特定任务上，也可能更合适。

所以我真正想做的，不是寻找一个万能 Agent。

而是：

> **让一个我长期使用、已经建立工程基线的 Host Agent，去调用和管理其他更适合具体任务的 Agent。**

## 这就是 RelayPact 的起点

我更倾向于这样的结构：

```text
             Codex + Sol
            Trusted Host
                 │
             RelayPact
         ┌───────┴────────┐
         ↓                ↓
Codex + 其他 LLM     Pi + 其他 LLM
     Executor          Executor
         │                │
         └──── Result ─────┘
                 ↓
             Host Review
```

Host Agent 负责：

- 理解整体任务；
- 拆分任务边界；
- 决定交给谁；
- 控制权限；
- 检查结果；
- 最终验收。

Executor Agent 则负责在明确边界内完成具体工作。

目标不是让 Agent 数量更多。

而是：

> **在保持质量基线的前提下，利用不同 Agent Profile 在能力、速度和成本上的差异。**

我更愿意把这个原则概括成：

> **Start with one trusted host agent, then delegate outward.**

## Model Routing 和 Agent Delegation 并不冲突

RelayPact 并不是为了取代 Model Routing。

两者解决的是不同问题。

### Model Routing

解决的是：

> 这一次推理请求应该由哪个模型完成？

```text
Request
   ↓
Model Router
   ↓
Model A / B / C
```

### Agent Delegation

解决的是：

> 这项完整任务应该交给哪个 Agent 执行？

```text
Task
  ↓
Host Agent
  ↓
RelayPact
  ↓
Executor Agent
```

当一个任务开始拥有独立目标、Workspace、多轮 Tool Calling、权限边界、验收条件和结果证据时，它就已经不再只是一次模型调用。

问题也从：

> Which model should answer this request?

变成了：

> **Which agent should own and execute this task?**

所以我现在更愿意这样理解：

> **Model Routing 选择模型。**

> **RelayPact 选择执行任务的 Agent。**

两者完全可以同时存在。

## RelayPact 连接的不是模型，而是 Agent

这也是全文最重要的一点。

我不希望 RelayPact 只是帮助 Codex 在内部切换到一个更便宜的模型。

我希望：

```text
Codex + Sol
```

可以把一个有明确目标、范围、权限和验收标准的任务，交给：

```text
Codex + 其他 LLM
```

也可以进一步交给：

```text
Pi + 其他 LLM
其他 Harness + 其他 LLM
```

关键不在于对面使用什么模型。

甚至也不在于是不是同一个 Harness。

关键在于：

> **对方是不是一个可以被独立评估、拥有明确能力边界的 Agent Profile。**

所以：

> **RelayPact connects agents, not models.**

> **它解决的不是模型切换，而是 Agent 之间的受控委托。**

## 为什么要强调“受控”

不同 Agent 可以拥有不同 Harness、不同 Model、不同 Session，甚至完全不同的 Workspace。

所以我不会假设：

> 把 Host 的全部历史交给 Executor，它就一定能得到完全相同的理解。

相同的 Context，不代表相同的 Interpreted State。

所以 RelayPact 更强调显式传递：

```text
Goal
Scope
Constraints
Relevant Context
Authority
Expected Output
Required Evidence
```

不是：

> “这是我的所有上下文，你接着做。”

而是：

> “这是任务，这是边界，这是权限，这是验收要求。”

执行 Agent 可以自主完成工作。

但最终是否接受结果，仍然由 Host Agent 或人决定。

> **Delegation does not mean surrendering authority.**

委托的是执行责任。

不是最终控制权。

## 协议统一会让这件事更容易，而不是消灭多个 Agent

有人认为，现在存在很多 Harness，只是模型接口割裂时代的阶段性现象。

随着 MCP、A2A、Runtime Protocol 等逐渐标准化，最终可能只剩：

> One Harness, Many Models.

我不这么看。

协议标准化解决的是：

> **Interoperability**

而不是：

> **Behavioral Equivalence**

接口统一以后，我确实可以更方便地在不同 Agent 之间切换。

但这并不会让它们变成同一种 Agent。

标准化统一的是 Agent 之间的边界。

差异仍然保留在 Agent 内部。

所以我更倾向于未来是：

> **Many Agent Profiles, Standardized Interfaces**

协议越统一，我越容易切换不同 Agent。

而不是越需要把所有模型都塞进同一个 Harness。

## EchoPath Labs 的三层

这套思考，也逐渐让我看清 OpenDomain、RelayPact 和 EchoPath 三者之间的关系。

### OpenDomain — Meaning

让不同 Agent 共享相对稳定的业务语义。

> **What does it mean?**

### RelayPact — Bounded Action

让不同 Agent 之间进行有目标、有边界、有证据的任务委托。

> **What should be handed off and executed?**

### EchoPath — Continuity

观察发生了什么，以及发生漂移或中断以后如何继续和恢复。

> **What happened, and how do we continue?**

可以进一步压缩成：

> **OpenDomain preserves meaning.**
>
> **RelayPact bounds action.**
>
> **EchoPath preserves continuity.**

## 最后

我并不反对 **One Harness, Many Models**。

它已经是一种有效的 Agent 构建方式，我自己也在使用。

但我的任务通常涉及更长的上下文、更复杂的工程、更持续的执行，以及更高的质量要求。

在这种场景下，我越来越不愿意把：

> 模型能接进去

直接等同于：

> 这个 Agent 已经值得信任。

我更愿意把经过调校和验证的：

> **Harness + Model**

视为一个完整的 Agent Profile。

然后让一个我长期使用、已经形成工程基线的 Host Agent，去受控地委托其他更适合具体任务的 Agent。

所以 RelayPact 并不是对 Model Routing 的否定。

它更像是在 Model Routing 之外，再向前走一步：

> **既然不同 Harness 和不同模型组合各有价值，那为什么一定要把所有选择限制在一个 Harness 里？**

**RelayPact 连接的不是模型，而是 Agent。**

**它解决的不是模型切换，而是 Agent 之间的受控委托。**
