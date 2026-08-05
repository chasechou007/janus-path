---
title: Agent 时代，我们需要重新思考密码管理
date: 2026-08-01 17:26:10
slug: rethinking-password-management-in-the-agent-era
lang: zh-CN
translation_key: rethinking-password-management-in-the-agent-era
cover: /assets/img/rethinking-password-management-agent-era.png
categories: MetaEngineering
description: Agent 开始代表人操作 GitHub、API 和云平台后，传统密码管理的“读取秘密”模型暴露出新的风险。本文结合 KeptNear Local Broker，探讨如何从秘密读取转向受控的凭据能力授权，并厘清本地优先与 Agent 安全的边界。
keywords:
  - Agent 时代
  - AI Agent
  - 密码管理
  - 凭据管理
  - 凭据能力
  - KeptNear
  - Local Broker
  - MCP
  - GitHub Token
  - API Key
  - 本地优先
  - Agent 安全
tags:
  - AI Agent
  - 软件工程
  - 架构设计
---

最近，我开源了一个本地优先的密码与令牌管理器：[KeptNear](https://github.com/chasechou007/KeptNear)。

最初开发它的原因很简单：我想要一个交互友好、真正由用户控制数据的本地密码管理器。

后来，在使用 Codex 处理越来越多实际工作时，我发现了另一个问题：

**Agent 也开始需要凭据了。**

GitHub Token、API Key、数据库密码、云平台 Access Key……这些凭据通常散落在环境变量和配置文件里。Agent 需要时要反复配置，也容易在后续任务中遗忘。

更重要的问题是：

> Agent 为了完成一项操作，真的需要知道凭据本身吗？

## Agent 需要的可能不是秘密，而是能力

个人密码管理器主要围绕人设计：保存密码、自动填充、复制到剪贴板，然后由人决定何时使用。

但 Agent 不只是读取信息，它会执行 CLI、调用 API，并操作外部系统。传统做法通常是先把 Token 交给 Agent，再由它完成操作：

```text
Token → Agent / Tool → HTTP Client → External Service
```

这会让 Token 进入更多不必要的路径，例如 Agent 上下文、Shell 环境、调试日志、错误输出和临时配置文件。

Agent 真正需要的，往往不是“读取这个 Token”，而是：

> 使用这个身份，完成一次经过授权的操作。

因此，权限模型可以从：

```text
谁可以读取这个秘密？
```

转变为：

```text
谁可以使用这个秘密所代表的能力？
```

## 从读取秘密到授权操作

基于这个思路，我开始为 KeptNear 构建 Local Broker。

```text
Agent / Tool
      │ 请求经过授权的操作
      ▼
KeptNear Local Broker ← 用户授权策略
      │
      ├─ 注入凭据并请求远程 API
      └─ 注入凭据并启动本地子进程
      │
      ▼
返回受限的操作结果
```

在 KeptNear 当前的 Broker 协议中，没有通用的 `secret.get`。机器请求的是明确的凭据操作，而不是直接取得原始秘密。

授权也不只是“是否信任这个 Agent”，而是更具体的问题：

- 哪个使用方？
- 哪个 Credential 和 Secret Field？
- 可以执行什么操作？
- 允许一次、限时允许，还是持续允许？
- 是否需要用户确认？

这里的使用方不只包括 Agent，也可以是本地应用、CLI 工具或 MCP Host。

配对只负责确认使用方身份，并不自动授予任何凭据权限。最终决定哪些工具可以使用哪些凭据的人，仍然是用户。

## Broker 也不是万能的安全承诺

KeptNear 目前探索了两种凭据使用方式。

第一种是由 Broker 直接完成 `http.request`。Broker 在内部把 Token 放入指定 Header，然后发起 HTTPS 请求。请求方不需要接收原始 Token。

这并不意味着凭据从未离开本机：目标服务仍然会收到它，只是它不必经过 Agent 或出现在普通工具输出中。

第二种是 `process.run`。为了兼容现有 CLI，Broker 可以通过环境变量、标准输入或文件描述符，把凭据交给一个经过授权的子进程。

这里必须承认一个边界：

> 一旦凭据被交给子进程，该进程或其后代就可能保存、转换或继续传出它。

Broker 会尽量避免原始凭据进入 Agent 对话和工具结果，并对输出中的精确回显进行脱敏，但它无法识别秘密的所有编码、拆分和派生形式。

所以 KeptNear 管理的是**凭据使用权限**，而不是 Agent 的全部行为。它不是通用 Agent Sandbox，也不能判断 Agent 正在执行的任务是否正确。

## 本地优先的新意义

对我来说，本地优先首先意味着：密码库属于用户。

KeptNear 不要求注册账号，也不提供托管密码库或云同步服务。加密的 `.pswvault` 可以由用户自己保存在本地，或者通过 iCloud Drive、Dropbox、Syncthing 等文件服务传输。这些服务只是加密文件的传输层，不是 KeptNear 的信任中心。

但本地优先并不自动等于安全，也不意味着所有操作都不会联网。经用户授权的 API 请求、子进程和外部同步工具仍然可能访问网络。

当 Agent 开始代表人访问 GitHub、云平台、数据库和企业系统时，凭据连接的已经不只是几个密码，而是一个人在数字世界中的能力边界。

因此，我更愿意把 KeptNear 未来的角色理解为：

> 人与本地应用、CLI、MCP Host 和 Agent 之间的凭据能力控制层。

## KeptNear 与我的其他探索

如果做一个简单概括：

- [OpenDomain](https://github.com/echopath-labs/openDomain) 关注 Agent 应该理解什么。
- EchoPath 关注人和 Agent 如何保持认知与执行的连续性。
- KeptNear 关注 Agent 和工具被允许使用什么凭据能力。

它们解决的是不同问题，但都指向同一个方向：

> 当 AI 从回答问题的工具变成能够代表人采取行动的 Agent，我们需要怎样的外部基础设施？

## KeptNear 目前的状态

KeptNear 目前仍处于实验性 pre-alpha 阶段。

macOS 客户端已经具备本地加密密码库、Credential 管理、搜索、TOTP、密码生成、备份和恢复等基础能力。

Local Broker、MCP 和 CLI 的核心能力也已经在源码中实现并测试，但仍属于 Developer Preview，尚未作为完整的最终用户工作流激活。Broker 的安装、配对、审批、升级和卸载体验仍需继续完善。

当前提供的 Apple Silicon DMG 没有 Apple Developer ID 签名，也没有经过 Apple 公证。项目尚未接受外部安全审计，因此不建议使用当前版本保存生产环境凭据。

## 写在最后

传统个人密码管理器主要回答：

> 如何安全地保存秘密？

Agent 时代还需要继续回答：

> 如何让机器在明确的权限边界内使用秘密所代表的能力，而不是默认获得秘密本身？

这可能会成为下一代凭据管理的重要组成部分，也是 KeptNear 接下来会继续探索的方向。

项目地址：[github.com/chasechou007/KeptNear](https://github.com/chasechou007/KeptNear)

欢迎通过 Issues 提出反馈。当前项目暂不接受 Pull Request。
