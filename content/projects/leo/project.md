# Building a Deterministic Execution Layer for LLM-Generated Shell Commands

## Overview

**LEO** is a Python-based CLI tool that translates natural language prompts into executable shell commands. A user specifies an intent (e.g., “find large log files modified in the last 24 hours”), and the system generates a corresponding command, validates it against a defined schema, and executes it within a controlled execution layer.

The objective of this project is not to abstract away the shell, but to integrate a probabilistic language model into a deterministic and privileged environment while preserving traceability, auditability, and user control. The central design constraint is the mismatch between non-deterministic model inference and the deterministic semantics of system-level execution.

---

## System Architecture

The system is divided into two explicitly separated domains:

* **Generation Domain** – External, non-deterministic, and backed by a cloud LLM accessed via REST.
* **Execution Domain** – Local, deterministic, stateful, and responsible for all system interactions.

The language model does not execute commands. It produces a structured command representation conforming to a predefined schema. This output must pass strict parsing and validation before any system call is issued.

Raw text responses are never executed directly. The structured response is parsed into typed command objects. If schema validation fails, execution is aborted. This prevents model output from being treated as executable text and establishes parsing as a hard trust boundary.

---

## Deterministic Execution Lifecycle

Once validated, commands enter a controlled execution pipeline:

* A unique **run identifier** is generated.
* A **content hash** is computed to support traceability and deduplication.
* Execution metadata is persisted, including:

  * timestamps
  * exit codes
  * standard output and error streams
  * execution state

All execution artifacts are stored locally. This ensures that each model-generated action is reproducible and auditable. While model inference may vary between runs, execution behavior and recorded state remain deterministic.

---

## Secret Management and Isolation

Integrating a cloud model into a local shell environment introduces clear secret boundary concerns. Two primary risks are addressed:

1. Leakage of sensitive information into model prompts.
2. Exposure of credentials during command execution.

Mitigations include:

* Filtering environment variables before prompt construction.
* Excluding known sensitive key patterns.
* Avoiding automatic inclusion of shell history or filesystem context.
* Requiring placeholder-based credential references in generated commands.

Secrets are resolved locally at execution time via a dedicated secrets manager module. The model never receives raw credential values. Logs are redacted to prevent persisted artifacts from containing sensitive data. As a result, secret material remains confined to the execution domain.

---

## Unsafe Command Handling

Language models can generate unsafe or destructive commands. The system assumes model fallibility and incorporates explicit safeguards:

* An **approval-gated mode** requiring user confirmation prior to execution.
* An optional **autonomous mode** for faster workflows.
* Pre-execution validation hooks for heuristic filtering of high-risk patterns.
* No implicit privilege escalation.
* No automatic use of `sudo`.

The system does not attempt to provide full sandboxing. OS-level isolation or containerization would be required for complete containment. Instead, the design focuses on explicit boundaries, auditability, and controlled execution flow.

---

## Prompt Injection Considerations

Prompt injection is a structural risk whenever external input influences a model whose output affects system behavior. Mitigations include:

* A fixed system prompt that cannot be modified at runtime.
* Strict enforcement of structured output schemas.
* Rejection of malformed or non-conforming responses.
* Separation between model output and execution authority.

All model outputs are treated as untrusted input. Execution logic remains entirely within the deterministic domain.

---

## Conclusion

This project examines how to integrate non-deterministic AI components into deterministic system tooling without compromising control, traceability, or auditability.

The primary engineering challenge is not command generation accuracy, but the preservation of deterministic execution guarantees in the presence of probabilistic inference. By separating generation from execution, enforcing schema validation, persisting execution artifacts, and isolating secret material, LEO establishes a clear trust boundary between model reasoning and privileged system interaction.

The result is a reproducible and inspectable execution framework that accommodates LLM-generated commands while maintaining deterministic system behavior.
