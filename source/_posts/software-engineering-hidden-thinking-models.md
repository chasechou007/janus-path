---
title: "Software Engineering Is Full of Hidden Thinking Models"
slug: software-engineering-hidden-thinking-models
lang: en
translation_key: software-engineering-hidden-thinking-models
date: 2025-09-12 12:30:43
tags: [Software Engineering, Architecture, Structural Thinking]
cover: /assets/img/md_article0003.png
categories: Meta Engineering
description: Software engineering is never purely technical. It is a practical exercise in structural thinking. Through modularity, architecture, debugging, and iteration, engineers have long practiced an unnamed philosophy.
keywords: [software engineering, thinking models, structural thinking, system design, modularity, PDCA, MECE, cognitive modeling, engineering philosophy]
---

## **Preface: We Have Always Used “Unnamed Ideas”**

Many software engineers consider themselves pragmatists who solve problems through experience, logic, and hands-on work. We move constantly among requirements, code, architecture, and debugging, while keeping our distance from words such as “philosophy” and “thinking models,” which can sound abstract or mystical.

But shift your attention from tools to structure, from technique to the nature of thought, and you will discover something:

**<font style="color:#0e0e0e;">We have long been using classic thinking models without realizing it. They simply changed names and hid themselves inside engineering practice.</font>**

These models may never be mentioned explicitly or written into documentation, but they quietly support our ability to solve complex problems.

This article begins with familiar software practices and traces the thinking prototypes beneath them. You may be surprised to discover that you are already practicing philosophy—only in the language of code.

---

## **1. MECE: Modular Design and Responsibility Boundaries**

MECE—Mutually Exclusive, Collectively Exhaustive—is a foundational analytical principle in consulting. In software engineering, it lives under different names:

- **The Single Responsibility Principle (SRP)**
- **High cohesion and low coupling**
- **Bounded contexts in microservice architecture**

These principles aim for mutually exclusive responsibilities—or independent modules—and collectively exhaustive coverage: each module does one thing, and all modules together cover the entire system.

**<font style="color:#0e0e0e;">MECE is a way of drawing structural boundaries, and modular design is the act of modeling those boundaries.</font>**

---

## **2. The Golden Circle: Three Layers of Architectural Abstraction**

Simon Sinek's Golden Circle begins with Why, moves to How, and ends with What.

This is also the thinking path used by many experienced developers and architects:

- Why are we building this feature?
- How can it be implemented through the most appropriate technical path?
- What interface or capability will the user ultimately see?

When decomposing microservices, for example, you do not begin with database fields. You work backward from the business purpose to define service boundaries.

**<font style="color:#0e0e0e;">Architecture maps intention into structure, and the Golden Circle is a path for modeling intention.</font>**

---

## **3. Systems Thinking: From Modules to Flows, from Static to Dynamic**

New developers often see a system as a stack of modules, like building blocks. With experience comes a different realization:

**<font style="color:#0e0e0e;">Modules are not a static stack but dynamic relationships; a system is not merely a composition, but a field of structural tension.</font>**

We begin to pay attention to:

- data-flow paths,
- state-synchronization mechanisms,
- failure-propagation chains, and
- bottlenecks and congested resources under high request volume.

All of these belong to systems thinking. An architecture diagram is a structural model, while DevOps, event-driven architecture, and the Observer pattern all express forms of system-tension design.

---

## **4. The Feynman Technique: Code Review and Documentation**

The central idea of the Feynman Technique is: “If you cannot teach it to someone else, you may not truly understand it.”

Its clearest expressions in engineering include:

- writing comments,
- writing design documents,
- maintaining a wiki, and
- conducting code reviews.

These practices share one purpose:

**<font style="color:#0e0e0e;">Expressing a structure in language other people can understand.</font>**

When you can document a complex module clearly enough for another person to understand it, you are practicing the spirit of Feynman.

---

## **5. The Four-Quadrant Method: Prioritization and Sprint Planning**

We regularly make trade-offs such as:

- Should we do a requirement that is urgent but unimportant?
- In which Sprint should we schedule an important but non-urgent architecture upgrade?

This is a variation of the four-quadrant time-management model:

| | **Urgent** | **Not urgent** |
| --- | --- | --- |
| **Important** | A | B |
| **Not important** | C | D |

- Quadrant A contains what must be done now.
- Quadrant B contains critical long-term accumulation, including much architectural evolution.

Agile Sprint planning is a continuous negotiation over where tasks sit among these quadrants.

---

## **6. Inversion: Debugging and Architectural Refactoring**

When debugging, we often:

- observe a wrong result,
- reason backward through possible paths, and
- place breakpoints or add logs.

When refactoring, we ask:

- What side effects does the current structure create?
- Would the system become simpler if we removed this feature?

These are practices of inverse thinking:

**<font style="color:#0e0e0e;">Searching non-goal paths and secondary flows for structural cracks and opportunities to improve the system.</font>**

---

## **7. PDCA and Agile Development: A Mechanism for Structural Iteration**

PDCA—Plan, Do, Check, Act—is a classic model of quality management.

Its software-engineering counterpart is easy to see:

- Sprint planning = Plan
- Development, testing, and delivery = Do
- Review and retrospective = Check
- Backlog refinement and adjustment for the next cycle = Act

Agile does not mean fast. It means shortening the cycle of a structural feedback mechanism. In other words, it is PDCA.

---

## **8. Conclusion: Developers Are Practitioners of an Unnamed Philosophy**

We often assume that we are not philosophers.

In reality, we already practice philosophy:

- We think about structure and use code to define boundaries and relationships.
- We pursue feedback and use tests and logs to reflect the system back to itself.
- We explore tension and use refactoring and decoupling to release the energy trapped in coupling.

**<font style="color:#0e0e0e;">Software engineering has never been merely “writing code.” It is the most concrete and precise arena in which thinking models are practiced.</font>**

We no longer merely use models. We become their builders.

And that is where the craft of engineering begins to open into the way of structure.
