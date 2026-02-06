# Building an AI Planning Intelligence Platform for Ireland

## Summary

This project documents the **design, architecture, and delivery of an AI-enhanced planning intelligence platform that is currently running in live production and used by planning professionals**.

The platform supports real-world planning workflows by combining Irish planning law, national and local policy, precedent decisions, and document intelligence into a **traceable, explainable decision-support system**. From a technical perspective, the work focuses on building robust document ingestion pipelines, retrieval-augmented reasoning with strict citation control, and workflow-aware AI tooling suitable for regulated environments. From an entrepreneurial perspective, it demonstrates how domain-specific AI infrastructure can be productised and deployed responsibly in a high-accountability professional sector.

The central principle underpinning the system is simple:

**If the reasoning cannot be traced and explained, the output cannot be used.**

---
<video controls src="local:demo.mp4"></video>
---

## Why I Built This

Planning is often portrayed as slow or inefficient. After working closely with Irish planning legislation, regulator data, and professional workflows, it became clear that this framing is misleading.

The Irish planning system is already highly structured, rule-based, and defensible. Planners operate within explicit chains of logic grounded in legislation, development plans, policy objectives, site constraints, and precedent decisions. The problem is not a lack of structure. It is the absence of software that can surface, manage, and reuse that structure effectively.

Most general-purpose AI tools flatten this complexity into single answers. In a regulated environment where accountability and auditability matter, that makes them unusable.

This project was built to address that gap: to create a **planning-native AI platform** that strengthens professional judgement rather than obscuring it.

---

## The Problem Space

Public planning data and regulator reporting highlight several persistent issues:

- High and sustained application volumes
- Significant invalidation rates before assessment
- Increasing legislative and policy complexity
- Large amounts of professional time spent on repetitive research, validation, and rework

These issues are systemic rather than incidental. From a software engineering perspective, they point to a missing layer of infrastructure: a shared intelligence system that understands planning as a domain, rather than as unstructured text scattered across PDFs and portals.

---

## What I Built

### A Planning Intelligence Platform in Live Use

The result is an **AI-enhanced planning intelligence platform** that is deployed in production and actively used by planners as part of day-to-day work, including research, report preparation, and application validation.

The system is deliberately not positioned as a chatbot. It is a **decision-support workspace** built around two tightly integrated layers:

1. a structured planning knowledge engine  
2. a workflow-aware professional interface  

---

## 1. Planning Knowledge Engine

The knowledge layer aggregates and normalises authoritative planning sources, including:

- Irish planning legislation and regulations
- National, regional, and local development plans
- Local authority planning registers
- Appeal decisions and outcomes

Key technical characteristics include:

- Retrieval-augmented generation with strict citation enforcement
- Structured responses rather than free-form text
- Fully inspectable sources for every output
- Explicit prevention of invented authority or uncited reasoning

Instead of answering questions opaquely, the system exposes the underlying policy logic and references that professionals are required to rely on. This allows outputs to be reviewed, challenged, and defended in professional contexts.

---

## 2. Workflow-Aware Planning Workspace

On top of the knowledge engine, the platform provides tooling that reflects how planning work actually happens.

This includes:

- Assisted drafting of planning reports and statements
- Context-aware validation and completeness checks
- Discovery of comparable precedent cases
- Planning-specific project stages and statutory timelines

All AI-assisted outputs are grounded in uploaded drawings, site information, and applicable policy. Users retain full editorial control, and responsibility for final submissions remains explicitly human.

The platform is designed to reduce cognitive and administrative load, not to automate decision-making.

---

## A Core Design Principle: Explainable or Unusable

One of the strongest conclusions from building and deploying this system was the necessity of a strict design rule:

**If the logic flow cannot be traced, the output cannot be used.**

This principle shaped every architectural and product decision:

- No black-box conclusions
- No opaque scoring without explanation
- No automation without auditability
- No outputs without explicit sources

This mirrors best practice in safety-critical and regulated software systems and is essential for maintaining professional trust in live environments.

---

## Technical Direction and Architecture

Although the platform continues to evolve, its technical foundations are stable and deliberately conservative.

Core architectural elements include:

- Document ingestion pipelines for legislation, policy, and decisions
- Metadata extraction for policies, constraints, and outcomes
- Domain-specific prompting and templates
- Retrieval-augmented reasoning with citation guarantees
- Clear separation between assistance and decision authority

The system is designed to scale incrementally, from limited geographic or case-type coverage to broader jurisdictional support, without changing its core reasoning model.

---

## Commercial and Entrepreneurial Context

This project was developed with commercial realism in mind from the outset.

The target market is the **knowledge-intensive portion of planning work**: research, validation, drafting, coordination, and precedent analysis. These activities represent significant cost and risk for both private consultants and developers.

The platform follows a credible adoption path:

- initial deployment with professional planning users,
- expansion across additional authorities and use cases,
- growth into larger multi-office and enterprise contracts,
- and, over time, potential public-sector deployments with appropriate governance.

The focus throughout has been on delivering tangible professional value rather than speculative automation.

---

## Why This Project Matters to Me as a Developer

This project reflects the kind of engineering work I am most interested in:

- complex real-world systems,
- regulated decision-making environments,
- and AI used as infrastructure rather than spectacle.

Building and deploying this platform required careful attention to traceability, accountability, performance, and professional trust. It reinforced the importance of designing AI systems that respect domain constraints and human responsibility.

---

## What Comes Next

With the platform operating in live production, ongoing work focuses on:

- expanding coverage across additional local authorities and case types,
- incorporating feedback from active professional users,
- strengthening monitoring, reliability, and performance,
- and introducing carefully bounded predictive features with full explainability.

The objective is not to replace planners or simplify planning beyond recognition, but to provide software that genuinely understands and supports how planning work is done today.