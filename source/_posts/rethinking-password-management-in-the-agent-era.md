---
title: Rethinking Password Management in the Agent Era
date: 2026-08-01 17:26:10
slug: rethinking-password-management-in-the-agent-era
lang: en
translation_key: rethinking-password-management-in-the-agent-era
cover: /assets/img/rethinking-password-management-agent-era.png
categories: Meta Engineering
description: As AI agents act across GitHub, APIs, and cloud platforms, KeptNear's Local Broker shows how to authorize credential-backed capabilities without exposing raw secrets.
keywords:
  - Agent Era
  - AI Agent
  - password management
  - credential management
  - credential capabilities
  - KeptNear
  - Local Broker
  - MCP
  - GitHub Token
  - API Key
  - local-first
  - agent security
tags:
  - AI Agent
  - Software Engineering
  - Architecture
---

Recently, I open-sourced a local-first password and token manager called [KeptNear](https://github.com/chasechou007/KeptNear).

My initial reason for building it was simple: I wanted a local password manager with a friendly interface—one whose data genuinely remained under the user's control.

Later, as I used Codex to handle more and more real work, I discovered another problem:

**Agents need credentials too.**

GitHub Tokens, API Keys, database passwords, cloud platform Access Keys—these credentials are usually scattered across environment variables and configuration files. They must be configured repeatedly whenever an agent needs them, and they are easily forgotten in later tasks.

The more important question is:

> Does an agent really need to know the credential itself in order to complete an operation?

## Agents May Need Capabilities, Not Secrets

Personal password managers are designed primarily around people: they store passwords, autofill them, or copy them to the clipboard, after which a person decides when to use them.

But an agent does more than read information. It runs CLI commands, calls APIs, and operates external systems. The traditional approach usually gives the Token to the agent first and then lets the agent perform the operation:

```text
Token → Agent / Tool → HTTP Client → External Service
```

This causes the Token to enter more paths than necessary, including the agent's context, the shell environment, debug logs, error output, and temporary configuration files.

What an agent actually needs is often not permission to “read this Token,” but permission to:

> Use this identity to perform one authorized operation.

The permission model can therefore shift from:

```text
Who can read this secret?
```

to:

```text
Who can use the capability represented by this secret?
```

## From Reading Secrets to Authorizing Operations

Based on this idea, I began building a Local Broker for KeptNear.

```text
Agent / Tool
      │ requests an authorized operation
      ▼
KeptNear Local Broker ← user authorization policy
      │
      ├─ injects a credential and calls a remote API
      └─ injects a credential and starts a local subprocess
      │
      ▼
Returns a constrained operation result
```

KeptNear's current Broker protocol has no general-purpose `secret.get`. A machine requests a specific credential-backed operation instead of retrieving the raw secret directly.

Authorization is also more specific than simply asking whether an agent is trusted:

- Which client is making the request?
- Which Credential and Secret Field may it use?
- What operation may it perform?
- Is access allowed once, for a limited time, or persistently?
- Does it require user confirmation?

The client in this model may be an agent, but it may also be a local application, a CLI tool, or an MCP Host.

Pairing only verifies the client's identity. It does not automatically grant access to any credential. The user remains the person who ultimately decides which tools may use which credentials.

## A Broker Is Not an All-Purpose Security Guarantee

KeptNear currently explores two ways to use credentials.

The first is for the Broker to perform an `http.request` directly. The Broker places the Token into a specified header internally and then sends the HTTPS request. The requesting client does not need to receive the raw Token.

This does not mean the credential never leaves the machine: the destination service still receives it. The credential simply does not need to pass through the agent or appear in ordinary tool output.

The second is `process.run`. To remain compatible with existing CLI tools, the Broker can pass a credential to an authorized subprocess through an environment variable, standard input, or a file descriptor.

There is an important boundary to acknowledge here:

> Once a credential has been handed to a subprocess, that process or one of its descendants may store, transform, or transmit it elsewhere.

The Broker tries to keep raw credentials out of agent conversations and tool results, and it redacts exact matches when they appear in output. However, it cannot recognize every encoded, split, or derived representation of a secret.

KeptNear therefore manages **permission to use credentials**, not the entirety of an agent's behavior. It is not a general-purpose Agent Sandbox, nor can it determine whether the task an agent is performing is correct.

## A New Meaning for Local-First

For me, local-first means first and foremost that the password vault belongs to the user.

KeptNear does not require an account, and it does not provide a hosted password vault or cloud synchronization service. Users can keep the encrypted `.pswvault` locally or transfer it through file services such as iCloud Drive, Dropbox, or Syncthing. These services are only transport layers for the encrypted file; they are not KeptNear's trust center.

But local-first does not automatically mean secure, nor does it mean every operation remains offline. User-authorized API requests, subprocesses, and external synchronization tools may still access the network.

When agents begin accessing GitHub, cloud platforms, databases, and enterprise systems on a person's behalf, credentials no longer represent just a handful of passwords. They define the boundary of that person's capabilities in the digital world.

I therefore prefer to think of KeptNear's future role as:

> A credential capability control layer between people and their local applications, CLI tools, MCP Hosts, and agents.

## KeptNear and My Other Explorations

In simple terms:

- [OpenDomain](https://github.com/echopath-labs/openDomain) focuses on what agents should understand.
- EchoPath focuses on how people and agents can maintain continuity of cognition and execution.
- KeptNear focuses on which credential capabilities agents and tools are allowed to use.

They address different problems, but all point in the same direction:

> When AI moves from a tool that answers questions to an agent that can act on a person's behalf, what external infrastructure do we need?

## KeptNear's Current Status

KeptNear is still in an experimental pre-alpha stage.

The macOS client already provides a locally encrypted password vault, Credential management, search, TOTP, password generation, backup, and recovery.

The core Local Broker, MCP, and CLI capabilities have also been implemented and tested in the source code. However, they remain a Developer Preview and have not yet been activated as a complete end-user workflow. The Broker's installation, pairing, approval, upgrade, and uninstallation experiences still need further work.

The current Apple Silicon DMG is neither signed with an Apple Developer ID nor notarized by Apple. The project has not undergone an external security audit, so I do not recommend using the current version to store production credentials.

## Closing Thoughts

Traditional personal password managers primarily answer this question:

> How can we store secrets securely?

The agent era requires us to answer another:

> How can machines use the capabilities represented by secrets within explicit permission boundaries, instead of receiving the secrets themselves by default?

This may become an important part of the next generation of credential management, and it is the direction KeptNear will continue to explore.

Project: [github.com/chasechou007/KeptNear](https://github.com/chasechou007/KeptNear)

Feedback is welcome through Issues. The project is not currently accepting Pull Requests.
