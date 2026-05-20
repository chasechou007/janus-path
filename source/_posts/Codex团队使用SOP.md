---
title: Codex 团队使用 SOP
date: 2026-05-20 14:25:43
slug: codex-team-usage-sop
categories: MetaEngineering
cover: /assets/img/codex-team-usage-sop-cover.png
description: 一份面向团队协作的 Codex 使用规范，围绕 OpenSpec、Superpowers 与上下文沉淀，整理需求调研、产品规划、开发实现、测试验证、运营分析和知识交接中的标准工作流。
keywords:
  - Codex
  - OpenSpec
  - Superpowers
  - 团队协作
  - SOP
  - AI 工程化
  - 上下文管理
  - 知识沉淀
tags:
  - Codex
  - OpenSpec
  - Superpowers
  - 团队协作
  - AI 工程化
---

## 1. 目标
本 SOP 用于规范团队如何使用 Codex、OpenSpec 和 Superpowers 进行需求调研、产品规划、开发实现、测试验证、运营分析、问题排查和知识沉淀。

本 SOP 不只适用于开发工程师，也适用于产品经理、测试工程师、设计师、运营、实施交付、数据分析和其他需要沉淀项目上下文的业务团队。

核心目标：

+ 降低新同事使用 Codex 的门槛。
+ 避免项目上下文只存在于聊天记录中。
+ 避免 Codex thread 上下文丢失后需要人工重新复述。
+ 使用 OpenSpec 结构化记录需求、决策、任务进度、验证结果和业务结论。
+ 使用 Superpowers 封装高频复杂操作，提高团队协作效率。
+ 让团队经验可以被复用、交接和持续改进。

---

## 快速开始：新人 5 分钟版
如果你是第一次在项目中使用 Codex，可以先按下面的最小流程执行：

1. 先让 Codex 检查 OpenSpec 中是否已有相关上下文。
2. 判断本次任务是否需要创建或更新 OpenSpec change。
3. 小任务直接做，大任务先写 proposal、design 和 tasks。
4. 执行过程中按 tasks 推进，不把关键决策只留在聊天里。
5. 完成后做必要验证，并记录验证方式和结果。
6. 把实际产出、关键决策、遗留事项写回 OpenSpec。
7. 如果 change 已完成，检查是否需要回写 specs 并归档。

最小入口提示词：

```text
我是第一次处理这个项目中的任务。

请先检查 OpenSpec 中是否已有相关上下文，然后告诉我：

1. 是否需要创建或更新 OpenSpec change
2. 是否有适合使用的 Superpower
3. 最小可行推进路径是什么
4. 哪些操作需要我确认
```

---

## 使用 OpenSpec 前的判断
OpenSpec 的目标是保存可复用的长期上下文，不是把每个小动作都变成流程。

开始任务前，先做一个轻量判断：

```text
这个任务是否需要未来的人、未来的自己，或者新的 Codex thread 能够恢复上下文？
```

如果答案是“是”，就应该考虑使用 OpenSpec。

适合使用 OpenSpec 的情况：

+ 需求、方案、验收标准或业务规则需要被长期保存。
+ 任务会跨多人、跨部门、跨时间或跨 Codex thread 协作。
+ 未来接手者需要知道“为什么这么做”。
+ 涉及产品行为、技术设计、测试范围、数据口径、客户交付或运营流程变化。
+ 需要记录关键决策、风险、验证结果或复盘结论。
+ 任务完成后可能影响后续需求、测试、上线、交付或业务判断。

可以不使用完整 OpenSpec 流程的情况：

+ 一次性简单问答。
+ 很小的文案、格式、排版或局部说明调整。
+ 明确低风险的机械性修改。
+ 临时探索，且没有产生需要长期保留的决策。
+ 只需要 Codex 帮忙解释、翻译、润色或快速总结一小段内容。

推荐分级：

| 任务类型 | 推荐处理方式 |
|---|---|
| 简单问答、解释、翻译、润色 | 直接让 Codex 完成，不需要 OpenSpec |
| 小范围、低风险、无长期影响的任务 | 可以只做轻量判断 |
| 有需求、方案、验收、测试、交付或业务影响的任务 | 创建或更新 OpenSpec change |
| 跨团队、跨 thread、周期较长或风险较高的任务 | 必须使用 OpenSpec 记录和推进 |

一句话原则：

```text
OpenSpec 用来保存长期有价值的上下文，不用来记录所有对话和小动作。
```

---

## 2. 基本原则
所有项目都应该具备使用 OpenSpec 承接长期上下文的能力，但不是每个小任务都必须完整走 OpenSpec 流程。

OpenSpec 是项目迭代上下文的结构化记录工具，用来保存：

+ 项目约定
+ 需求背景
+ 方案设计
+ 任务拆解
+ 执行进度
+ 关键决策
+ 验证结果
+ 业务结论
+ 后续事项

不要只依赖 Codex 对话历史作为上下文来源。

如果出现以下情况：

```text
Codex ran out of room in the model's context window.
Start a new thread or clear earlier history before retrying.
```

团队成员应该可以通过 OpenSpec 恢复任务上下文，而不是重新口头描述完整背景。

---

## 3. 上下文预算原则
Codex、OpenSpec、Skills、Superpowers、本地工具、规则说明、项目文档和聊天历史，都会占用模型的上下文窗口。

LLM 的上下文窗口是有限的。上下文越复杂，模型需要同时关注的信息就越多，用于“真正任务”的注意力就越少。

因此团队需要遵守一个原则：

```text
工具不是越多越好，
规则不是越多越好。

复杂流程应该按需封装，
而不是把所有操作都沉淀成 Superpower。
```

需要特别注意：

+ 不要给 Codex 一次性塞入大量无关背景。
+ 不要在简单任务里启用复杂 Superpower。
+ 不要让 Codex 同时遵循太多临时规则。
+ 不要让 Codex 为了“显得规范”而读取无关文档。
+ 不要把 OpenSpec 写成流水账，避免无效信息污染长期上下文。
+ 不要把每个小动作都沉淀成 Superpower。
+ 不要让 Superpower 变成巨大的全能流程。

推荐判断标准：

```text
如果某个规则、工具、Skill 或 Superpower 对当前任务没有明显帮助，就不要启用。
```

更好的做法是：

+ 先读取最必要的 OpenSpec 上下文。
+ 只启用与当前任务直接相关的 Skill 或 Superpower。
+ 复杂任务分阶段处理，不一次性塞满所有要求。
+ 完成阶段性工作后，把关键决策写入 OpenSpec，而不是依赖聊天历史。
+ 保持提示词短、清晰、目标明确。

一句话原则：

```text
上下文是预算，不是垃圾桶。
```

---

## 4. 三个工具的分工
### Codex
Codex 负责理解任务、阅读上下文、整理信息、辅助分析、执行可自动化工作、运行验证、总结结果。

它是执行者和协作者。

### OpenSpec
OpenSpec 负责保存长期上下文。

它是项目的结构化记忆，记录“为什么做、怎么做、做到哪一步”。

### Superpowers
Superpowers 负责封装高频复杂操作。

它把容易出错、多步骤、需要经验的流程变成可复用能力，让团队成员通过自然语言调用。

推荐理解方式：

```text
OpenSpec 负责保存上下文。
Superpowers 负责封装复杂流程。
Codex 负责理解任务、选择工具、执行流程、更新记录。
```

---

## Codex 使用注意事项和技巧
Codex 很适合做信息整理、方案推演、文件修改、验证执行和阶段总结，但使用效果高度依赖任务描述、上下文质量和验证方式。

### 把任务说清楚
给 Codex 的任务尽量包含：

+ 目标：希望完成什么。
+ 背景：为什么要做。
+ 范围：哪些要做，哪些不做。
+ 输入：相关文件、文档、链接、数据或上下文。
+ 输出：希望得到代码、文档、表格、总结、方案还是 checklist。
+ 验证：如何判断任务完成。

推荐提示词：

```text
我的目标是：[目标]
背景是：[背景]
本次范围包括：[范围]
明确不包括：[非范围]
请先检查必要上下文，然后给出执行计划。
如果需要修改文件，请先说明会改哪里。
完成后请说明验证方式和结果。
```

### 让 Codex 先判断再执行
对于非平凡任务，不要直接要求 Codex “马上做完”。更好的方式是先让它判断：

+ 是否需要读取 OpenSpec。
+ 是否需要创建或更新 change。
+ 是否需要使用 Superpower。
+ 是否存在高风险操作。
+ 是否需要用户确认。

推荐提示词：

```text
请先判断这个任务的复杂度和风险：

1. 是否需要 OpenSpec
2. 是否需要 Superpower
3. 需要读取哪些上下文
4. 是否会修改文件或影响外部系统
5. 哪些步骤需要我确认

确认后再执行。
```

### 控制上下文，不要一次性塞满
不要把所有资料、所有规则、所有历史聊天一次性丢给 Codex。更好的做法是：

+ 先给目标和最关键背景。
+ 让 Codex 自己搜索或指出需要哪些上下文。
+ 分阶段补充资料。
+ 长期重要内容写入 OpenSpec。
+ 临时对话中的细节及时总结，避免丢在聊天历史里。

### 明确要求验证
不要只接受“已完成”。任务结束前，应要求 Codex 说明：

+ 做了什么。
+ 改了什么。
+ 用什么方式验证。
+ 验证结果是什么。
+ 有哪些未验证内容。
+ 还有哪些风险或后续事项。

不同角色的验证方式不同：

| 角色/场景 | 常见验证方式 |
|---|---|
| 产品 | 验收标准检查、用户流程复核、范围确认 |
| 开发 | 测试、lint、构建、页面或接口验证 |
| 测试 | 用例覆盖、复现步骤、回归结果、缺陷状态 |
| 运营/业务 | 指标口径核对、执行 checklist、复盘结论 |
| 数据分析 | 数据来源确认、口径一致性、异常值检查 |
| 客户成功/实施 | 客户配置核对、交付清单、风险确认 |

### 高风险操作要停下来确认
以下操作必须让 Codex 先说明计划，并等待人工确认：

+ 删除、覆盖或批量修改文件。
+ 数据库 migration、生产数据修改、生产配置调整。
+ 发布、部署、回滚或影响线上用户的操作。
+ 对客户配置、交付范围或对外承诺产生影响的操作。
+ 发送正式结论、报告或对外沟通内容。

### 善用阶段性总结
当任务较长、信息较多或即将换 thread 时，及时让 Codex 总结：

```text
请基于当前上下文做一次阶段性总结：

1. 当前目标
2. 已完成内容
3. 未完成内容
4. 关键决策
5. 验证结果
6. 当前风险
7. 下一步建议

需要长期保留的信息请写入 OpenSpec。
```

一句话原则：

```text
让 Codex 多做可验证的中间步骤，少做没有上下文和验证的最终跳跃。
```

---

## 5. 适用角色与典型场景
不同角色都可以使用同一套 OpenSpec 方法，只是记录重点不同。

| 角色 | 典型使用场景 | OpenSpec 重点记录 |
|---|---|---|
| 产品经理 | 需求分析、用户故事、PRD 拆解、范围确认、版本规划 | 背景、目标、非目标、验收标准、关键决策、范围变更 |
| 开发工程师 | 技术方案、功能实现、重构、缺陷修复、接口调整 | 技术设计、影响范围、实现进度、验证结果、风险 |
| 测试工程师 | 测试计划、用例设计、缺陷复现、回归验证、验收报告 | 测试范围、测试数据、复现步骤、实际结果、遗留风险 |
| 设计师 | 体验方案、交互调整、设计评审、视觉规范沉淀 | 设计目标、用户路径、方案取舍、验收标准、影响页面 |
| 运营/业务团队 | 活动方案、流程优化、客户问题跟进、业务规则变更 | 业务背景、目标指标、执行计划、验证口径、复盘结论 |
| 数据分析师 | 指标定义、数据口径、分析结论、报表迭代 | 指标口径、数据来源、分析假设、结论、后续动作 |
| 实施/客户成功 | 客户交付、问题排查、配置变更、交接记录 | 客户背景、配置项、操作记录、风险、交付结论 |

一句话原则：

```text
只要一个任务需要跨人、跨时间、跨 thread 恢复上下文，就应该用 OpenSpec 记录。
```

---

## 6. OpenSpec 文档关系与检索性能维护原则
OpenSpec 的价值不只是记录内容，还包括维护项目文档之间的关系。

Codex 在恢复上下文时，通常会依赖文件名、目录结构、标题、关键词、引用关系和任务状态来判断哪些内容相关。因此，OpenSpec 写得越结构化、关系越清晰，Codex 检索和理解项目上下文的效果越好。

### 6.1 每个 change 都应该说明它关联什么
创建或更新 OpenSpec change 时，应尽量记录：

+ 关联的 specs
+ 关联的代码模块
+ 关联的需求文档、测试计划、业务流程、数据指标或客户项目
+ 关联的页面、接口、数据库表或配置项
+ 关联的历史 change
+ 当前 change 影响哪些行为
+ 当前 change 不影响哪些范围

推荐在 change 的 proposal 或 design 中加入类似结构：

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
  - 用户登录后的权限判断
  - 团队套餐变更后的功能可见性

- Out of scope:
  - 不修改支付流程
  - 不修改发票生成逻辑
```

这样新 thread 中的 Codex 可以更快判断“该读哪些文件，不该读哪些文件”。

### 6.2 specs 记录稳定能力，changes 记录迭代过程
团队需要区分 specs 和 changes 的职责。

`openspec/specs/` 适合记录长期稳定的产品能力、行为约定和系统规则。

`openspec/changes/` 适合记录某一次具体迭代，包括背景、方案、任务、进度和验证结果。

不要把短期任务流水账写进 specs，也不要把长期行为规则只留在 changes 里。

推荐原则：

```text
稳定规则进 specs。
迭代过程进 changes。
完成后的长期行为要回写 specs。
```

### 6.3 任务完成后要维护文档关系
一个 change 完成后，不只是把 tasks 打勾，还要让 Codex 检查是否需要：

+ 更新相关 specs
+ 补充相关 change 的引用
+ 归档已完成 change
+ 删除或压缩过时的临时说明
+ 记录最终验证结果
+ 标记后续 follow-up

推荐提示词：

```text
任务完成后，请帮我维护 OpenSpec 文档关系：

1. 检查本 change 是否影响已有 specs
2. 如果影响，请更新对应 specs
3. 在 change 中补充 related specs、related code、related docs 和 related changes
4. 标记 tasks 完成状态
5. 记录验证命令和结果
6. 判断是否可以归档该 change
7. 清理过时或重复的临时说明，避免影响后续检索
```

### 6.4 完成 change 的最小归档产物
一个完成的 change 不应该只留下已勾选的 tasks，还应该能让后续新 thread 恢复上下文。

归档前至少需要确认：

+ 最终目标是否清楚
+ 实际改动摘要是否清楚
+ 关键决策是否记录
+ 验证命令和结果是否记录
+ 是否判断过需要回写 specs
+ 是否记录 related specs、related code、related docs、related changes
+ 是否标记遗留 follow-up

推荐归档摘要结构：

```markdown
## Completion Summary

- Final outcome:
- Actual changes:
- Key decisions:
- Verification:
- Specs updated:
- Follow-up:
```

### 6.5 重点：避免 OpenSpec 变成低质量上下文
OpenSpec 不是聊天记录备份，也不是操作流水账。

不建议记录：

+ 每一次普通命令输出
+ 无长期价值的尝试过程
+ 重复的背景描述
+ 已经失效的方案但没有标记状态
+ 与当前 change 无关的大段代码、资料或背景说明
+ 没有结论的临时猜测

建议记录：

+ 最终采用的方案
+ 被明确放弃的方案和原因
+ 关键决策
+ 影响范围
+ 验证方式
+ 未解决风险
+ 后续任务

一句话原则：

```text
OpenSpec 记录的是可复用上下文，不是模型垃圾箱。
```

### 6.6 让 Codex 定期整理 OpenSpec
当项目迭代较多时，可以让 Codex 定期维护 OpenSpec 的可检索性。

推荐提示词：

```text
请帮我整理当前 OpenSpec 的可检索性：

1. 检查 openspec/specs/ 和 openspec/changes/
2. 找出命名不清晰、关系缺失、状态不明的文档
3. 检查 active changes 是否有重复或过期内容
4. 检查 completed changes 是否应该归档
5. 检查 specs 是否缺少从已完成 change 回写的长期规则
6. 给出整理建议
7. 在我确认后再修改文件
```

### 6.7 OpenSpec 维护原则也应该写入 OpenSpec
初始化 OpenSpec 时，不只是创建目录结构，还应该把“如何维护 OpenSpec”本身写入项目约定中。

这些原则建议写入：

+ `openspec/config.yaml` 的 `context:` 中，作为简短、强约束的项目规则。
+ 必要时创建 `openspec/specs/openspec-maintenance/spec.md`，记录更完整的 OpenSpec 维护规范。

这样 Codex 后续每次读取 OpenSpec 时，不只是知道“项目做什么”，也知道“OpenSpec 应该怎么被维护”。

建议写入的核心原则：

```text
OpenSpec 不是聊天记录备份，而是可复用的项目上下文。
specs 记录长期稳定能力、行为规则和系统约定。
changes 记录具体迭代过程、任务进度、决策和验证结果。
每个 change 都应维护 related specs、related code、related docs、related changes。
每个 change 都应写清楚 affected behavior 和 out of scope。
任务完成后要检查长期行为是否需要回写 specs。
已完成的 change 应及时归档，避免 active changes 变成噪音。
避免记录低价值流水账，只记录关键决策、验证结果、风险和后续事项。
每次创建、更新或归档 OpenSpec 内容时，都要维护文档关系。
控制上下文复杂度，只读取和当前任务直接相关的 OpenSpec 内容。
```

一句话原则：

```text
OpenSpec 初始化时，要把“如何维护 OpenSpec”本身也沉淀进 OpenSpec。
```

### 6.8 OpenSpec 命名规范
OpenSpec 的命名会直接影响后续检索质量。

change 命名建议：

+ 使用动词开头，例如 `add-`、`fix-`、`refactor-`、`remove-`、`update-`。
+ 包含明确业务对象，例如 `add-team-invitation-flow`。
+ 能看出影响范围，例如 `refactor-billing-plan-permissions`。
+ 避免模糊名称，例如 `misc-fixes`、`update-stuff`、`temp-change`。
+ 如果是 bug 修复，尽量体现问题和对象，例如 `fix-order-refund-status-sync`。

spec 命名建议：

+ 使用稳定业务能力命名，例如 `user-auth`、`billing-plan`、`team-permissions`。
+ 不使用一次性任务名称作为 spec 名称。
+ 一个 spec 对应一组长期稳定行为，不把多个无关能力塞进同一个 spec。

---

## 7. 每次开始任务前的标准动作
每次开始非平凡任务前，必须先让 Codex 检查 OpenSpec。

对于极小任务，可以只做轻量判断，不必读取完整 OpenSpec。

极小任务通常包括：

+ 很小的文案调整
+ 纯格式化
+ 明确且低风险的单点修复
+ 不影响行为的局部样式微调

轻量判断标准：

+ 是否明显不影响长期行为
+ 是否不需要记录设计决策
+ 是否不需要跨 thread 恢复上下文
+ 是否不需要加载完整 OpenSpec

推荐提示词：

```text
在开始之前，请先检查本项目的 OpenSpec：

1. 阅读 openspec/config.yaml
2. 查看 context 中的项目约定
3. 查看 openspec/specs/ 中已有规格
4. 查看 openspec/changes/ 中是否有和本次任务相关的进行中变更

如果已有相关 change，请基于它继续推进。
如果没有相关 change，请判断本次任务是否需要创建新的 OpenSpec change。
```

一句话版本：

```text
请先检查 OpenSpec 中是否已有相关上下文，再决定是否需要创建或更新 change。
```

---

## 8. 什么时候需要创建 OpenSpec change
以下情况必须创建或更新 OpenSpec change：

+ 新功能开发
+ 新需求、需求范围变更或验收标准变更
+ 行为变更
+ 跨角色、跨部门、跨系统协作事项
+ 跨模块、跨服务、跨页面改动
+ 测试计划、验收范围或回归策略变化
+ 运营活动、客户交付、业务流程或数据口径变化
+ 部署、配置、数据结构变更
+ 范围不清晰的 bug 修复
+ 需要记录产品、技术、测试或业务决策的任务
+ 任务可能跨多个 Codex thread 完成
+ 完成后未来同事需要知道“为什么这么改”
+ 涉及接口、数据模型、权限、流程、状态机、业务规则、指标口径等长期影响的修改

以下情况可以不创建 change：

+ 很小的文案调整
+ 纯格式化
+ 明确且低风险的机械性修改
+ 临时排查且没有产生长期决策的操作
+ 不影响行为的局部样式微调

判断标准：

```text
如果未来另一个人接手时，不看聊天记录就很难理解任务背景，
那就应该记录到 OpenSpec。
```

### 8.1 快速决策表
| 任务类型 | 是否需要 OpenSpec change | 是否考虑 Superpower |
|---|---|---|
| 小文案调整 | 否 | 否 |
| 纯格式化或机械性修改 | 否 | 否 |
| 明确且低风险的小 bug | 视影响范围 | 否 |
| 范围不清晰的 bug | 是 | 视排查流程是否重复 |
| PRD、验收标准或需求范围调整 | 是 | 可能 |
| 新功能 | 是 | 视流程是否重复 |
| 跨模块重构 | 是 | 可能 |
| 接口、权限、状态机、数据模型变更 | 是 | 可能 |
| 测试计划、回归策略或验收报告 | 视影响范围 | 可能 |
| 运营活动、客户交付或业务流程调整 | 视影响范围 | 可能 |
| 指标定义、数据口径或报表逻辑变化 | 是 | 可能 |
| 发布前检查 | 视项目要求 | 是 |
| 生产数据或生产配置操作 | 是 | 必须有审批、dry-run 和回滚方案 |

---

## 9. 安装或初始化 OpenSpec 的推荐提示词
当一个项目还没有 OpenSpec 时，不应该只让 Codex 创建目录结构，还应该让 Codex 把 OpenSpec 的维护原则写入项目约定。

推荐提示词：

```text
我希望你帮我在项目中安装并配置好 OpenSpec。

你可以自行判断 OpenSpec 记录的颗粒度。我的目标是用 OpenSpec 结构化记录我们的迭代过程，尤其是当一个任务成功完成以后，需要把结果、决策、验证方式和后续事项沉淀下来。

请避免上下文只存在于 Codex 对话里。这样即使后续出现 “Codex ran out of room in the model's context window. Start a new thread or clear earlier history before retrying.”，我重新开 thread 时，也可以通过 OpenSpec 恢复任务上下文，而不需要重新复述。

除了创建 OpenSpec 基础结构外，请把 OpenSpec 的维护原则也写入项目约定中，确保后续每次使用 OpenSpec 记录任务时都会遵循。

请重点记录以下原则：

1. OpenSpec 不是聊天记录备份，而是可复用的项目上下文。
2. specs 记录长期稳定能力、行为规则和系统约定。
3. changes 记录具体迭代过程、任务进度、决策和验证结果。
4. 每个 change 都应该维护 related specs、related code、related docs、related changes。
5. 每个 change 都要写清楚 affected behavior 和 out of scope。
6. 任务完成后要检查是否需要把长期行为回写到 specs。
7. 已完成的 change 应及时归档，避免 active changes 变成噪音。
8. 避免记录低价值流水账，只记录关键决策、验证结果、风险和后续事项。
9. Codex 每次创建、更新或归档 OpenSpec 内容时，都要维护文档之间的关系，提升后续检索和恢复上下文的效果。
10. 控制上下文复杂度，只读取和当前任务直接相关的 OpenSpec 内容。

```

---

## 10. 标准工作流程
### Step 1：检查上下文
不要让 Codex 在没有检查上下文的情况下直接修改文件、输出方案或推进执行。

先要求它检查 OpenSpec：

```text
请先搜索 OpenSpec，确认是否已有和本任务相关的 specs 或 changes。
```

### Step 2：判断是否需要新建 change
如果任务较大、范围不清晰、涉及行为变化，应先创建 OpenSpec change。

```text
如果你判断这是一个非平凡变更，请先创建 OpenSpec change，并把需求、方案和任务拆解记录下来。不要先直接执行或产出最终结论。
```

### Step 3：任务拆解
让 Codex 把任务拆成可执行项：

```text
请基于 OpenSpec change，把本次任务拆成可执行 tasks，并标注推荐执行顺序。
```

### Step 4：执行任务
执行时让 Codex 按 OpenSpec tasks 推进：

```text
请按照 OpenSpec change 中的 tasks 逐项推进，并在完成后更新任务状态。
```

### Step 5：验证结果
不能只接受“改好了”。

要求 Codex 根据任务类型完成必要验证，例如测试、lint、构建、页面验证、用例复核、验收标准检查、数据口径核对、业务规则确认或文档审阅：

```text
完成后请运行或执行必要的验证，并把验证方式和结果记录到 OpenSpec change 中。
```

### Step 6：更新 OpenSpec
任务完成后，必须让 Codex 写回最终状态：

```text
任务完成后，请更新 OpenSpec：

1. 标记已完成的 tasks
2. 记录实际修改内容或业务产出
3. 记录关键决策
4. 记录验证结果
5. 更新 related specs、related code、related docs、related changes
6. 判断是否需要回写 specs
7. 记录遗留问题或后续事项
8. 如果 change 已完成，请归档它
```

---

## 11. 新开 Codex thread 时如何恢复上下文
当上下文丢失、任务中断或需要换 thread 时，不要重新口述完整背景。

使用下面的提示词：

```text
这是一个新的 Codex thread。请不要依赖之前的聊天记录。

请先阅读本项目的 OpenSpec：

1. openspec/config.yaml
2. openspec/specs/
3. openspec/changes/

请找出当前仍在进行中的 change，并总结：

- 当前任务目标
- 已完成内容
- 未完成内容
- 关键决策
- 已验证内容
- 当前风险
- 下一步建议

然后继续推进最合理的下一步。

只加载和当前任务直接相关的内容，避免把无关历史一次性塞进上下文。
```

---

## 12. 什么时候可以考虑使用 Superpowers
Superpowers 适合用来降低复杂操作成本，把高频、容易出错、步骤较多的工作封装成标准能力。

以下情况可以优先考虑使用 Superpowers：

+ 某类操作会被团队反复执行。
+ 操作步骤多，容易漏步骤。
+ 新同事不熟悉项目，但需要快速完成标准任务。
+ 任务需要遵循固定规范。
+ 需要把团队经验固化下来，而不是每次靠口头传授。
+ 需要 Codex 按固定流程执行某类任务。
+ 任务需要组合多个工具、脚本、检查步骤或文档流程。

常见例子：

+ 初始化 OpenSpec
+ 创建 OpenSpec proposal / design / tasks
+ 按 OpenSpec tasks 推进任务
+ 完成任务后更新或归档 OpenSpec
+ PRD 拆解和验收标准检查
+ 测试计划、测试用例和回归清单整理
+ 客户问题排查和交付记录沉淀
+ 运营活动 checklist 和复盘总结
+ 指标口径检查和数据分析结论沉淀
+ 提交前检查
+ 代码审查
+ API 变更检查
+ 数据库 migration 检查
+ 前端页面视觉回归检查
+ 发布前 checklist
+ 故障排查
+ 生成周报、变更记录、验收报告、复盘或技术文档

不建议使用 Superpowers 的情况：

+ 一次性的简单任务。
+ 需求还非常模糊，尚未形成稳定流程。
+ 团队还没有形成共识，过早封装会增加维护成本。
+ 涉及删除、覆盖、发布、生产环境操作，但没有审批和 dry-run 机制。

判断标准：

```text
如果一个操作需要新人反复问“这一步怎么做”，或者资深同事每次都要手把手带，
就可以考虑把它沉淀成 Superpower。
```

### Superpowers 的使用边界
Superpowers 的价值是降低复杂操作成本，而不是增加工作流负担。

使用前需要判断：

+ 当前任务是否真的复杂。
+ 是否真的会重复出现。
+ 是否存在明确、稳定、可复用的流程。
+ 使用 Superpower 是否比直接让 Codex 执行更简单。
+ 它占用的上下文是否值得。

如果一个任务本身很简单，直接让 Codex 完成即可，不需要启用 Superpower。

推荐原则：

```text
简单任务直接做。
重复复杂任务才沉淀。
不确定的流程先实践，再封装。
```

---

## 13. 如何借助 Codex 使用 Superpowers
使用 Superpowers 时，不要求同事记住复杂命令。

推荐让 Codex 扮演操作协调者：

1. 先检查 OpenSpec，理解当前任务上下文。
2. 再判断是否有合适的 Superpower。
3. 如果有，就使用 Superpower 完成任务。
4. 如果没有，就按普通 Codex 工作流执行。
5. 如果任务未来会重复出现，建议沉淀成新的 Superpower。
6. 任务完成后，把关键结果更新回 OpenSpec。

推荐提示词：

```text
请先检查 OpenSpec，理解本次任务上下文。

然后判断这个任务是否适合使用已有的 Superpower：

- 如果有合适的 Superpower，请优先使用它，并解释你会用它解决哪部分问题。
- 如果没有合适的 Superpower，请按普通 Codex 工作流完成任务。
- 如果你认为这个任务未来会重复出现，请建议是否需要沉淀成新的 Superpower。
```

新同事可以使用这个入口提示词：

```text
我是第一次处理这个项目中的类似任务。

请先检查 OpenSpec 和项目说明，然后告诉我：

1. 当前任务是否已有相关上下文
2. 是否有适合使用的 Superpower
3. 你准备如何用最少步骤完成这个任务
4. 哪些操作需要我确认
```

---

## 14. Superpowers 的安全规则
为了避免 Superpowers 变成黑盒，团队需要遵守以下规则：

+ Codex 使用 Superpower 前，需要说明它要解决什么问题。
+ 涉及删除、覆盖、发布、迁移、生产环境操作时，必须先让人确认。
+ 优先使用 dry-run、预览、diff、测试命令。
+ Superpower 执行完成后，Codex 必须总结做了什么、改了什么、验证了什么。
+ 如果任务产生了长期影响，必须更新 OpenSpec。
+ 不把 Superpower 当成替代思考的捷径。
+ Superpower 是标准流程封装，不是跳过审查。

### 14.1 风险分级与确认规则
| 风险级别 | 典型操作 | Codex 行为要求 |
|---|---|---|
| 低风险 | 搜索、阅读文件、查看 diff、整理资料、运行只读命令 | 可以直接执行，并在需要时总结发现 |
| 中风险 | 修改代码、更新文档、调整测试、整理 PRD、补充测试用例、生成分析草稿 | 可以执行，但完成后必须总结改动和验证 |
| 高风险 | 删除文件、覆盖配置、数据库 migration、发布、批量改数据、对外发送正式结论、调整客户配置 | 必须先说明计划、影响范围、回滚方式，并等待人工确认 |
| 禁止默认执行 | 无备份删除生产数据、未确认直接发布、未确认覆盖用户文件、未确认对外承诺交付范围 | 不允许直接执行，必须由负责人明确授权 |

高风险操作的最小确认信息：

+ 要执行什么
+ 会影响哪些文件、环境、数据或用户
+ 是否有 dry-run、备份或回滚方案
+ 执行失败时如何恢复
+ 需要谁确认

推荐提示词：

```text
在使用 Superpower 前，请先说明：

1. 你准备使用哪个 Superpower
2. 它会执行哪些步骤
3. 是否会修改文件
4. 是否存在高风险操作
5. 哪些步骤需要我确认
```

---

## 15. 创建新 Superpower 的推荐流程
当某个流程反复出现时，可以让 Codex 帮忙沉淀。

推荐提示词：

```text
这个流程未来可能会被团队反复使用。

请帮我判断它是否适合沉淀成一个 Superpower。

如果适合，请整理：

1. 适用场景
2. 不适用场景
3. 输入要求
4. 执行步骤
5. 安全边界
6. 完成后的验证方式
7. 是否需要更新 OpenSpec
```

如果需要直接创建 Superpower，可以继续要求：

```text
请基于上面的流程，帮我创建一个团队可复用的 Superpower。

要求：

- 名称清晰
- 说明适用场景
- 写清楚执行步骤
- 标明风险操作
- 包含验证方式
- 包含任务完成后如何更新 OpenSpec
- 让新人可以直接通过自然语言调用
```

---

## 16. 用 Superpowers 标准化 OpenSpec 规定动作
OpenSpec 的规定动作非常适合沉淀成 Superpowers。

但不建议做成一个巨大的“OpenSpec 全能 Superpower”。更好的做法是把流程拆成几个稳定、清晰、可组合的小能力。

推荐拆分原则：

+ 一个 Superpower 只负责一个阶段。
+ 每个 Superpower 都要写清楚输入、输出、适用场景和不适用场景。
+ 小任务只做轻量判断，不强制走完整 OpenSpec 流程。
+ 只读取和当前任务直接相关的 OpenSpec 内容。
+ 创建、归档、删除、覆盖、发布、迁移等高风险动作必须先说明计划并等待确认。
+ Superpower 执行后要把关键结果写回 OpenSpec，而不是只留在聊天里。

推荐标准化为以下 5 个 OpenSpec Superpowers：

| Superpower | 解决的问题 | 主要输出 |
|---|---|---|
| `openspec-start-task` | 开始任务前如何检查上下文 | 相关上下文摘要、是否需要 change、下一步建议 |
| `openspec-create-change` | 非平凡变更如何创建 change | proposal、design、tasks、related context |
| `openspec-continue-change` | 已有 change 如何继续推进 | 当前状态摘要、下一步任务、执行进展 |
| `openspec-finish-change` | 任务完成后如何收尾 | tasks 状态、验证结果、决策记录、归档判断 |
| `openspec-maintenance` | 如何维护 OpenSpec 检索质量 | 命名、关系、归档、低价值上下文整理建议 |

### 16.1 `openspec-start-task`
适用场景：

+ 开始新需求、新 bug、新重构、测试、运营、数据分析或客户交付任务。
+ 新 thread 中需要判断当前任务上下文。
+ 新同事第一次接触项目任务。

输入要求：

+ 用户对任务的自然语言描述。
+ 当前项目工作区。
+ 已有 OpenSpec 目录。

执行步骤：

1. 阅读 `openspec/config.yaml` 中的项目约定。
2. 搜索和任务相关的 specs、active changes、历史 changes。
3. 判断是否已有相关 change 可以继续。
4. 判断是否需要创建新的 OpenSpec change。
5. 判断是否存在适合使用的其他 Superpower。
6. 输出最小可行推进路径。

输出要求：

+ 相关 OpenSpec 上下文摘要
+ 是否需要创建或更新 change
+ 是否需要使用其他 Superpower
+ 下一步建议
+ 需要人工确认的操作

不适用场景：

+ 明确很小的文案、格式化、低风险机械性修改。
+ 用户明确要求只做一次轻量检查。

### 16.2 `openspec-create-change`
适用场景：

+ 新功能、新需求或新业务流程。
+ 行为变更。
+ 跨角色、跨部门、跨系统协作事项。
+ 跨模块、跨服务、跨页面改动。
+ 需要记录产品、技术、测试或业务决策的任务。
+ 未来接手者需要知道“为什么这么改”。

输入要求：

+ 任务目标。
+ 已确认的相关 specs、业务范围、代码范围、测试范围或交付范围。
+ 如有必要，用户补充的业务背景或约束。

执行步骤：

1. 生成清晰、可检索的 change 名称。
2. 创建 proposal，说明背景、目标、非目标、影响范围。
3. 创建 design，记录方案、取舍、风险和边界。
4. 创建 tasks，拆成可执行步骤。
5. 补充 related specs、related code、related docs、related changes。
6. 写清 affected behavior 和 out of scope。

输出要求：

+ 新建或更新的 change 路径
+ proposal / design / tasks 摘要
+ 需要用户确认的问题
+ 后续执行顺序建议

安全边界：

+ 需求不清晰时先提问或标记假设，不要编造业务结论。
+ 不把无关聊天内容塞进 change。
+ 不把短期任务流水账写入 specs。

### 16.3 `openspec-continue-change`
适用场景：

+ 已有 OpenSpec change，需要继续推进。
+ 上下文丢失后，需要基于 OpenSpec 恢复任务。
+ 多个 Codex thread 接力同一个任务。

输入要求：

+ change 名称，或用户描述的当前任务。
+ 当前工作区或相关资料范围。

执行步骤：

1. 阅读目标 change 的 proposal、design、tasks。
2. 总结当前目标、已完成任务、未完成任务、关键决策和风险。
3. 检查 related specs、related code、相关资料和影响范围。
4. 选择下一项最合理的 task 推进。
5. 推进后更新 tasks 状态。
6. 记录关键决策和验证结果。

输出要求：

+ 当前 change 状态摘要
+ 本轮完成内容
+ 本轮产出摘要
+ 验证结果
+ 下一步建议

安全边界：

+ 不跳过未完成 tasks。
+ 如果发现实际执行结果和 design 不一致，先说明差异。
+ 涉及高风险操作时必须等待人工确认。

### 16.4 `openspec-finish-change`
适用场景：

+ 一个 change 的主要任务已经完成。
+ 准备提交、合并、验收、交付或归档前。
+ 需要把聊天中的关键结果沉淀回 OpenSpec。

输入要求：

+ change 名称。
+ 当前 git diff、实际修改内容或业务产出。
+ 已运行或需要执行的验证方式。

执行步骤：

1. 检查 tasks 是否全部完成。
2. 记录实际修改内容或业务产出。
3. 记录关键决策。
4. 记录验证方式和结果。
5. 更新 related specs、related code、related docs、related changes。
6. 判断长期行为是否需要回写 specs。
7. 记录遗留 follow-up。
8. 判断是否可以归档 change。

输出要求：

+ change 完成摘要
+ 验证结果
+ specs 回写判断
+ 是否建议归档
+ 遗留风险或 follow-up

安全边界：

+ 验证未执行时必须明确说明。
+ 不在未确认长期行为的情况下随意改 specs。
+ 归档前必须确认 tasks、验证、回写和 follow-up 状态。

### 16.5 `openspec-maintenance`
适用场景：

+ 项目迭代较多，OpenSpec 内容变多。
+ active changes 中出现重复、过期、状态不明内容。
+ 新同事反馈找不到有效上下文。
+ 团队希望定期提升 OpenSpec 检索质量。

输入要求：

+ 当前 OpenSpec 目录。
+ 可选：用户指定的 specs、changes 或业务范围。

执行步骤：

1. 检查 `openspec/specs/` 和 `openspec/changes/`。
2. 找出命名不清晰、关系缺失、状态不明的文档。
3. 检查 active changes 是否重复、过期或应该归档。
4. 检查已完成 changes 是否有长期规则未回写 specs。
5. 找出重复、过时或低价值上下文。
6. 先输出整理建议，等待确认后再修改文件。

输出要求：

+ 检索质量问题清单
+ 建议修改项
+ 可直接执行的整理计划
+ 需要人工确认的删除、归档或合并操作

安全边界：

+ 默认只给建议，不直接删除或大规模改写。
+ 涉及归档、删除、合并文档时必须先确认。
+ 不把 OpenSpec 整理成过度抽象、难以检索的文档。

### 16.6 其他推荐沉淀的团队 Superpowers
除 OpenSpec 规定动作外，还可以沉淀以下团队通用 Superpowers。

### 16.7 代码审查 Superpower
适用场景：

+ 提交前自查。
+ PR 前检查。
+ 高风险代码变更。

能力目标：

+ 检查 bug 风险。
+ 检查测试缺口。
+ 检查边界条件。
+ 检查是否需要更新 OpenSpec。

### 16.8 提交前检查 Superpower
适用场景：

+ 准备 commit 或 PR。

能力目标：

+ 查看 git diff。
+ 运行测试、lint、构建。
+ 检查 OpenSpec 状态。
+ 总结风险和验证结果。

### 16.9 发布前检查 Superpower
适用场景：

+ 发版、部署、上线前。

能力目标：

+ 检查配置变更。
+ 检查 migration。
+ 检查环境变量。
+ 检查回滚方案。
+ 检查 OpenSpec 是否归档或更新。

### 16.10 产品需求评审 Superpower
适用场景：

+ PRD 初稿评审。
+ 需求范围变更。
+ 验收标准不清晰。

能力目标：

+ 检查目标、非目标和用户场景。
+ 检查验收标准是否可验证。
+ 检查依赖、风险和边界是否遗漏。
+ 判断是否需要创建或更新 OpenSpec change。

### 16.11 测试计划评审 Superpower
适用场景：

+ 新功能测试计划。
+ 回归测试范围确认。
+ 缺陷复现和验收前检查。

能力目标：

+ 检查测试范围、测试数据和覆盖缺口。
+ 整理用例、风险和回归清单。
+ 记录验证结果和遗留风险。
+ 判断是否需要更新 OpenSpec。

### 16.12 业务复盘 Superpower
适用场景：

+ 运营活动复盘。
+ 客户交付复盘。
+ 业务流程调整后复盘。

能力目标：

+ 汇总目标、执行过程、结果和偏差。
+ 沉淀关键决策、经验和后续事项。
+ 判断是否有长期规则需要写入 specs。

---

## 17. 关键操作提示词范例库
本节是附录，供团队复制使用。正文中的流程原则以第 7 到第 14 节为准；如果提示词和正文原则冲突，以正文原则为准。

### 17.1 开始新任务
```text
请先检查 OpenSpec 中是否已有相关上下文。

重点检查：

1. openspec/config.yaml
2. openspec/specs/
3. openspec/changes/

请总结和本任务相关的内容，并判断：

- 是否已有相关 active change
- 是否需要创建新的 OpenSpec change
- 是否有适合使用的 Superpower
- 当前任务最小可行推进路径是什么
```

### 17.2 创建新 OpenSpec change
```text
请为这个任务创建一个 OpenSpec change。

要求：

1. change 名称清晰，可检索
2. proposal 中写明背景、目标、非目标、影响范围
3. design 中记录关键方案、取舍、风险和边界
4. tasks 中拆解可执行步骤
5. 补充 related specs、related code、related docs、related changes
6. 不要写无关背景，保持文档简洁
```

### 17.3 继续已有 change
```text
请基于已有 OpenSpec change 继续推进。

请先阅读该 change 的 proposal、design、tasks，并总结：

1. 当前目标
2. 已完成任务
3. 未完成任务
4. 关键决策
5. 当前风险
6. 下一步最合理的操作

然后按照 tasks 继续执行。
```

### 17.4 判断是否需要 Superpower
```text
请判断当前任务是否适合使用 Superpower。

判断标准：

1. 是否是重复性任务
2. 是否步骤复杂或容易漏步骤
3. 是否已有稳定流程
4. 使用 Superpower 是否比直接执行更简单
5. 它占用的上下文是否值得

如果适合，请说明使用哪个 Superpower。
如果不适合，请直接按普通 Codex 工作流完成。
```

### 17.5 控制上下文复杂度
```text
请注意控制上下文复杂度。

只读取和当前任务直接相关的 OpenSpec、代码、资料和工具说明。
不要加载无关 specs、无关 changes 或不必要的 Superpowers。
如果需要更多上下文，请先说明原因再继续。
```

### 17.6 执行前检查
```text
在开始执行前，请先确认：

1. 本任务对应的 OpenSpec change 是哪个
2. 需要修改、整理或产出哪些内容
3. 哪些行为、流程、文档、数据或用户会受到影响
4. 哪些内容明确不在本次范围内
5. 需要执行哪些验证
6. 是否存在高风险操作需要我确认
```

### 17.7 完成后更新 OpenSpec
```text
任务完成后，请更新 OpenSpec：

1. 标记 tasks 完成状态
2. 记录实际修改内容或业务产出
3. 记录关键决策
4. 记录验证方式和结果
5. 更新 related specs、related code、related docs、related changes
6. 判断是否需要回写 specs
7. 判断是否可以归档 change
```

### 17.8 新 thread 恢复上下文
```text
这是一个新的 Codex thread。请不要依赖之前的聊天记录。

请通过 OpenSpec 恢复上下文：

1. 读取 openspec/config.yaml
2. 检查 openspec/specs/
3. 检查 openspec/changes/
4. 找出当前最相关的 active change
5. 总结任务目标、已完成内容、未完成内容、关键决策、验证结果和下一步

只加载和当前任务相关的内容，避免占用过多上下文。
```

### 17.9 归档 change 前检查
```text
请在归档该 OpenSpec change 前做一次检查：

1. tasks 是否全部完成
2. 验证结果是否已记录
3. 长期行为是否已回写 specs
4. related specs、related code、related docs、related changes 是否完整
5. 是否还有未处理 follow-up
6. 是否存在过时或重复内容需要清理

确认无误后再归档。
```

### 17.10 整理 OpenSpec 检索质量
```text
请帮我检查 OpenSpec 的检索质量。

请重点找出：

1. 命名不清晰的 specs 或 changes
2. 缺少 related context 的 change
3. 已完成但未归档的 change
4. 应该回写 specs 但还没回写的内容
5. 重复、过时或低价值上下文
6. 可能影响 Codex 检索效率的问题

先输出建议，不要直接修改文件。
```

### 17.11 推进一个新需求或新功能
```text
我要推进一个新需求或新功能：[描述需求或功能]

请先检查 OpenSpec：

1. 是否已有相关 specs
2. 是否已有相关 active changes
3. 是否需要创建新的 OpenSpec change

如果需要，请先创建 proposal、design 和 tasks。
然后再按照 tasks 推进，并在完成后更新 OpenSpec。
```

### 17.12 处理一个问题或缺陷
```text
我要处理一个问题或缺陷：[描述问题]

请先检查 OpenSpec 和相关上下文，判断这个问题是否涉及已有 specs 或 active changes。

如果处理范围清晰且很小，可以直接处理。
如果涉及行为变更、数据流、接口、状态逻辑、业务规则、客户影响或未来需要追踪，请创建或更新 OpenSpec change。

处理完成后，请记录原因、处理内容和验证方式。
```

### 17.13 提交、交付或对外同步前检查
```text
请帮我做提交、交付或对外同步前检查：

1. 查看当前 git diff、文档改动或业务产出
2. 总结本次改动或结论
3. 判断是否需要更新 OpenSpec
4. 执行必要的测试、lint、构建、验收标准检查、数据口径核对或业务复核
5. 检查是否存在明显风险
6. 给出是否适合提交、交付或对外同步的建议
```

### 17.14 产品需求评审
```text
请帮我评审这个产品需求：[描述需求或粘贴 PRD]

请重点检查：

1. 背景、目标和非目标是否清楚
2. 用户场景和核心流程是否完整
3. 验收标准是否可验证
4. 依赖、风险和边界是否明确
5. 是否需要创建或更新 OpenSpec change
6. 哪些问题需要产品、设计、开发、测试或业务负责人确认
```

### 17.15 测试计划评审
```text
请帮我评审这个测试计划：[描述测试计划]

请重点检查：

1. 测试范围和不测范围是否清楚
2. 测试数据、环境和前置条件是否明确
3. 正向、反向、边界、兼容和回归场景是否覆盖
4. 验收标准是否能被测试验证
5. 是否存在高风险缺口
6. 测试结果和遗留风险应该如何写回 OpenSpec
```

### 17.16 业务方案或复盘整理
```text
请帮我整理这个业务方案或复盘：[描述业务事项]

请重点输出：

1. 背景和目标
2. 执行过程或计划
3. 关键结果和偏差
4. 已确认的决策
5. 风险、问题和后续事项
6. 哪些长期业务规则或指标口径需要写入 OpenSpec
```

### 17.17 阶段性总结
```text
请基于当前 OpenSpec change 和已完成工作，做一次阶段性总结：

1. 已完成内容
2. 未完成内容
3. 已确认的决策
4. 已放弃的方案及原因
5. 验证结果
6. 当前风险
7. 下一步建议

请把需要长期保留的信息更新到 OpenSpec，不要只写在聊天里。
```

### 17.18 初始化 OpenSpec 并写入维护原则
```text
帮我初始化 OpenSpec，并把 OpenSpec 的维护原则写入项目约定。
要求：
1. 创建或检查 openspec/config.yaml
2. 在 context 中写入简短、可执行的 OpenSpec 维护原则
3. 区分 specs 和 changes 的职责
4. 明确每个 change 需要维护 related specs、related code、related docs、related changes
5. 明确 change 完成后要检查是否需要回写 specs
6. 明确已完成 change 应及时归档
7. 明确 OpenSpec 不记录低价值流水账
8. 明确 Codex 只读取当前任务必要上下文，避免上下文污染
9. 如有必要，创建 openspec/specs/openspec-maintenance/spec.md 作为长期维护规范
请先说明你准备写入哪些原则，再修改文件。
```

### 17.19 使用 OpenSpec Superpower 标准动作
```text
请按 OpenSpec 标准动作处理这个任务：[描述任务]

请先判断应该使用哪个 OpenSpec Superpower：

1. `openspec-start-task`：开始任务前检查上下文
2. `openspec-create-change`：为非平凡变更创建 change
3. `openspec-continue-change`：继续已有 change
4. `openspec-finish-change`：完成任务后收尾和归档判断
5. `openspec-maintenance`：整理 OpenSpec 检索质量

请说明你选择的 Superpower、原因、会读取哪些上下文、是否会修改文件，以及哪些操作需要我确认。
```



---

## 18. 团队成员使用规范
团队成员使用 Codex 时应遵守：

+ 不把重要需求只写在聊天里。
+ 不让 Codex 在未检查 OpenSpec 的情况下直接开始大改。
+ 不在任务完成后遗漏 OpenSpec 更新。
+ 不把 OpenSpec 当成流水账。
+ 不把 Superpowers 当成黑盒自动化。
+ 不在简单任务中强行启用复杂工具。
+ 每个较大任务都应该能通过 OpenSpec 恢复上下文。
+ 高频复杂流程应逐步沉淀为 Superpowers。
+ 新人遇到不熟悉的项目时，先让 Codex 检查 OpenSpec 和可用 Superpowers。
+ 涉及删除、覆盖、部署、迁移、生产数据、客户配置、对外承诺等高风险操作时，必须让 Codex 先说明计划并等待确认。

---

## 19. 最终检查清单
任务结束前，Codex 应该完成以下检查：

- [ ] 是否检查过 OpenSpec
- [ ] 是否判断过是否需要创建或更新 change
- [ ] 是否按 tasks 推进
- [ ] 是否只读取了当前任务必要的上下文
- [ ] 是否避免加载无关文档、规则或工具
- [ ] 是否只使用了当前任务真正需要的 Skill / Superpower
- [ ] 是否控制了上下文复杂度，避免影响模型注意力
- [ ] 是否执行了必要验证
- [ ] 是否记录了验证结果
- [ ] 是否更新了 OpenSpec
- [ ] 是否维护了 related specs、related code、related docs、related changes
- [ ] 是否判断过长期行为是否需要回写 specs
- [ ] 是否记录了关键决策
- [ ] 是否记录了验收结果、业务结论或交付状态
- [ ] 是否记录了遗留事项
- [ ] 是否可以让新 thread 通过 OpenSpec 恢复上下文

---

## 20. 一句话总结
```text
OpenSpec 让上下文不丢。
Superpowers 让复杂流程可复用。
Codex 让执行过程自动化、可验证、可沉淀。
上下文预算决定模型注意力，所以能简单就简单，能少加载就少加载。
```
