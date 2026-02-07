const t=[{slug:"building-trust-in-ai",title:"Explainable GNNs for Anti-Money Laundering Detection",summary:"Graduate thesis developing transparent Graph Neural Networks for cryptocurrency AML detection using the Elliptic2 dataset. Implementing multi-method explainability to make black-box models interpretable for financial compliance.",tags:["Graph Neural Networks","XAI","Financial Crime","Deep Learning","Research"],featured:!0,tech:["Python","PyTorch Geometric","scikit-learn","Post-hoc explainability","NetworkX","Pandas","NumPy","Large Data"],links:[],previewImageUrl:"/projects/building-trust-in-ai_preview_8f77a7c9ae94.webp",order:1,draft:!1,html:`<h1>Building Trust in AI: Explainable Graph Neural Networks for Financial Crime Detection</h1>
<h2>The Challenge</h2>
<p>Every year, up to 5% of global GDP, approximately €1.7 trillion—is laundered through the financial system. Financial institutions invest heavily in combating this threat, with compliance costs in the EMEA region alone reaching $85 billion in 2023. Despite these massive investments, Anti-Money Laundering (AML) systems struggle with high false-positive rates and limited interpretability, creating both operational inefficiency and regulatory challenges.</p>
<p>Traditional machine learning approaches treat transactions in isolation, missing the crucial relational patterns that characterize financial crime. While Graph Neural Networks (GNNs) can model these network relationships, they operate as &quot;black boxes&quot;—making it difficult to understand why a particular transaction was flagged as suspicious. For regulated financial institutions, this lack of transparency is a critical barrier to adoption.</p>
<hr>
<h2><img src="/projects/building-trust-in-ai_diagram_8f77a7c9ae94.webp" alt="Topologies"></h2>
<h2>My Research: Bringing Explainability to Graph-Based AML Detection</h2>
<p>My thesis explores how to make GNN-based financial crime detection not just accurate, but also transparent and interpretable. I&#39;m developing and evaluating explainable GNN models using the Elliptic2 dataset—a cutting-edge benchmark created by MIT CSAIL, IBM Watson AI Lab, and Elliptic that contains real-world cryptocurrency transaction networks.</p>
<h3>The Dataset Challenge</h3>
<p>The Elliptic2 dataset presents significant technical challenges that mirror real-world AML scenarios:</p>
<ul>
<li><strong>Scale</strong>: 49 million background nodes and 445,000 labeled nodes organized into 122,000 transaction subgraphs</li>
<li><strong>Severe class imbalance</strong>: Only 2.3% of transactions are labeled as suspicious—reflecting the reality that illicit activity is relatively rare but high-impact</li>
<li><strong>Feature anonymization</strong>: 43 binned features representing cluster-level statistics, network topology, and temporal patterns, designed to protect intellectual property while maintaining research utility</li>
<li><strong>Graph structure</strong>: Transactions are modeled as subgraphs rather than isolated points, preserving the relational context critical for detecting money laundering patterns</li>
</ul>
<h2>Preprocessing &amp; Baseline Establishment</h2>
<p>The preprocessing pipeline transforms raw Elliptic2 data into research-ready artifacts with reproducible quality controls:</p>
<p><strong>Graph Construction</strong>
Node re-indexing ensures contiguous structures, while validation checks maintain edge-node consistency and intra-subgraph label integrity. Raw data is converted to Parquet for efficient access.</p>
<p><strong>Feature Handling</strong>
Aligned feature matrices preserve the ordinal nature of anonymized binned features. Missing values are handled to maintain feature semantics, with all statistics computed exclusively on training data.</p>
<p><strong>Experimental Design</strong>
Stratified train/val/test splits are performed at the subgraph level to prevent structural leakage while maintaining class distribution across the severe imbalance (2.3% positive rate). All splits and mappings are persisted for reproducibility.</p>
<p><strong>Evaluation Framework</strong>
Baseline comparisons use Precision-Recall AUC as the primary metric, appropriate for the extreme class imbalance where standard accuracy is uninformative.</p>
<h2>What I&#39;m Building Now: Multi-Method Explainability Framework</h2>
<p>I&#39;m currently implementing a comprehensive explainability layer that will make GNN predictions interpretable through multiple complementary approaches:</p>
<p><strong>Feature-Based Explainability</strong></p>
<ul>
<li><strong>SHAP (SHapley Additive exPlanations)</strong>: Quantifying how much each feature contributes to individual predictions using game-theoretic principles</li>
<li><strong>LIME (Local Interpretable Model-agnostic Explanations)</strong>: Creating local linear approximations around specific predictions to understand decision boundaries</li>
</ul>
<p><strong>Graph-Native Explainability</strong></p>
<ul>
<li><strong>GNNExplainer</strong>: Identifying which subgraph structures and node neighborhoods are most important for each prediction</li>
<li><strong>Counterfactual-GNN</strong>: Generating minimal graph modifications that would flip a prediction, revealing the decision-critical patterns</li>
</ul>
<p><strong>Topological Pattern Analysis</strong>
I&#39;m particularly focused on analyzing how transaction network topology influences detection—recognizing that structural patterns (like star networks, long chains, or dense clusters) often indicate specific laundering techniques.</p>
<h2>Research Goals &amp; Impact</h2>
<p>This work addresses four key objectives:</p>
<ol>
<li><strong>Performance</strong>: Comparing GNN subgraph classification against traditional ML baselines to quantify the value of graph-based approaches</li>
<li><strong>Explainability</strong>: Evaluating multiple explanation methods for transparency, stability, and practical utility in AML workflows</li>
<li><strong>Fairness &amp; Bias</strong>: Investigating whether predictions and explanations differ across structural subgroups to identify potential biases</li>
<li><strong>Practical Integration</strong>: Designing explanation outputs that can realistically support AML analyst decision-making</li>
</ol>
<p>The ultimate goal is to demonstrate that advanced AI can be both powerful <em>and</em> trustworthy in high-stakes financial compliance applications.</p>
<h2>Why This Matters</h2>
<p>Explainable AI in financial compliance isn&#39;t just an academic exercise—it&#39;s a practical necessity. Regulatory frameworks increasingly require financial institutions to explain automated decisions. Analysts need to understand why transactions are flagged to investigate efficiently. And ultimately, effective AML systems must balance detection capability with operational feasibility.</p>
<p>By developing rigorous methods for explaining GNN predictions on financial networks, this research aims to accelerate the adoption of graph-based AI in financial crime detection—bringing more sophisticated tools to bear on a critical global challenge while maintaining the transparency required for responsible deployment.</p>
<hr>
<p><em>This work is conducted as part of my graduate thesis in Computing with Artificial Intelligence &amp; Machine Learning at TU Dublin</em></p>
`,text:"Building Trust in AI: Explainable Graph Neural Networks for Financial Crime Detection The Challenge Every year, up to 5% of global GDP, approximately €1.7 trillion—is laundered through the financial system. Financial institutions invest heavily in combating this threat, with compliance costs in the EMEA region alone reaching $85 billion in 2023. Despite these massive investments, Anti-Money Laundering (AML) systems struggle with high false-positive rates and limited interpretability, creating both operational inefficiency and regulatory challenges. Traditional machine learning approaches treat transactions in isolation, missing the crucial relational patterns that characterize financial crime. While Graph Neural Networks (GNNs) can model these network relationships, they operate as &quot;black boxes&quot;—making it difficult to understand why a particular transaction was flagged as suspicious. For regulated financial institutions, this lack of transparency is a critical barrier to adoption. My Research: Bringing Explainability to Graph-Based AML Detection My thesis explores how to make GNN-based financial crime detection not just accurate, but also transparent and interpretable. I&#39;m developing and evaluating explainable GNN models using the Elliptic2 dataset—a cutting-edge benchmark created by MIT CSAIL, IBM Watson AI Lab, and Elliptic that contains real-world cryptocurrency transaction networks. The Dataset Challenge The Elliptic2 dataset presents significant technical challenges that mirror real-world AML scenarios: Scale : 49 million background nodes and 445,000 labeled nodes organized into 122,000 transaction subgraphs Severe class imbalance : Only 2.3% of transactions are labeled as suspicious—reflecting the reality that illicit activity is relatively rare but high-impact Feature anonymization : 43 binned features representing cluster-level statistics, network topology, and temporal patterns, designed to protect intellectual property while maintaining research utility Graph structure : Transactions are modeled as subgraphs rather than isolated points, preserving the relational context critical for detecting money laundering patterns Preprocessing &amp; Baseline Establishment The preprocessing pipeline transforms raw Elliptic2 data into research-ready artifacts with reproducible quality controls: Graph Construction Node re-indexing ensures contiguous structures, while validation checks maintain edge-node consistency and intra-subgraph label integrity. Raw data is converted to Parquet for efficient access. Feature Handling Aligned feature matrices preserve the ordinal nature of anonymized binned features. Missing values are handled to maintain feature semantics, with all statistics computed exclusively on training data. Experimental Design Stratified train/val/test splits are performed at the subgraph level to prevent structural leakage while maintaining class distribution across the severe imbalance (2.3% positive rate). All splits and mappings are persisted for reproducibility. Evaluation Framework Baseline comparisons use Precision-Recall AUC as the primary metric, appropriate for the extreme class imbalance where standard accuracy is uninformative. What I&#39;m Building Now: Multi-Method Explainability Framework I&#39;m currently implementing a comprehensive explainability layer that will make GNN predictions interpretable through multiple complementary approaches: Feature-Based Explainability SHAP (SHapley Additive exPlanations) : Quantifying how much each feature contributes to individual predictions using game-theoretic principles LIME (Local Interpretable Model-agnostic Explanations) : Creating local linear approximations around specific predictions to understand decision boundaries Graph-Native Explainability GNNExplainer : Identifying which subgraph structures and node neighborhoods are most important for each prediction Counterfactual-GNN : Generating minimal graph modifications that would flip a prediction, revealing the decision-critical patterns Topological Pattern Analysis I&#39;m particularly focused on analyzing how transaction network topology influences detection—recognizing that structural patterns (like star networks, long chains, or dense clusters) often indicate specific laundering techniques. Research Goals &amp; Impact This work addresses four key objectives: Performance : Comparing GNN subgraph classification against traditional ML baselines to quantify the value of graph-based approaches Explainability : Evaluating multiple explanation methods for transparency, stability, and practical utility in AML workflows Fairness &amp; Bias : Investigating whether predictions and explanations differ across structural subgroups to identify potential biases Practical Integration : Designing explanation outputs that can realistically support AML analyst decision-making The ultimate goal is to demonstrate that advanced AI can be both powerful and trustworthy in high-stakes financial compliance applications. Why This Matters Explainable AI in financial compliance isn&#39;t just an academic exercise—it&#39;s a practical necessity. Regulatory frameworks increasingly require financial institutions to explain automated decisions. Analysts need to understand why transactions are flagged to investigate efficiently. And ultimately, effective AML systems must balance detection capability with operational feasibility. By developing rigorous methods for explaining GNN predictions on financial networks, this research aims to accelerate the adoption of graph-based AI in financial crime detection—bringing more sophisticated tools to bear on a critical global challenge while maintaining the transparency required for responsible deployment. This work is conducted as part of my graduate thesis in Computing with Artificial Intelligence &amp; Machine Learning at TU Dublin",assets:["/projects/building-trust-in-ai_diagram_8f77a7c9ae94.webp","/projects/building-trust-in-ai_preview_8f77a7c9ae94.webp"]},{slug:"building-an-ai-planning-intelligence-platform-for-ireland",title:"AI Planning Intelligence Platform (Co-founder)",summary:"Designed and led the technical architecture for an AI-enhanced planning intelligence platform focused on the Irish planning system. Built a traceable, explainable AI workspace that combines planning law, policy, precedent and document workflows to reduce validation errors, research overhead and professional risk in regulated decision-making.",tags:["System Architecture","Explainable AI","Domain-Driven Design","Decision Support","Founder-Led Engineering"],featured:!0,tech:["TypeScript","Golang","React","SQL","Document Pipelines","RAG","Agentic AI","Containers","CI/CD Pipelines","Cloud Infrastructure"],links:[{label:"Company Website",url:"https://www.eireplan.ie/"},{label:"LinkedIn",url:"https://www.linkedin.com/company/eireplan"}],previewVideoUrl:"/projects/building-an-ai-planning-intelligence-platform-for-ireland_preview_video_59c10df13a4a.mp4",order:2,draft:!1,html:`<h1>Building an AI Planning Intelligence Platform for Ireland</h1>
<h2>Summary</h2>
<p>This project documents the <strong>design, architecture, and delivery of an AI-enhanced planning intelligence platform that is currently running in live production and used by planning professionals</strong>.</p>
<p>The platform supports real-world planning workflows by combining Irish planning law, national and local policy, precedent decisions, and document intelligence into a <strong>traceable, explainable decision-support system</strong>. From a technical perspective, the work focuses on building robust document ingestion pipelines, retrieval-augmented reasoning with strict citation control, and workflow-aware AI tooling suitable for regulated environments. From an entrepreneurial perspective, it demonstrates how domain-specific AI infrastructure can be productised and deployed responsibly in a high-accountability professional sector.</p>
<p>The central principle underpinning the system is simple:</p>
<p><strong>If the reasoning cannot be traced and explained, the output cannot be used.</strong></p>
<hr>
<h2><video controls src="/projects/building-an-ai-planning-intelligence-platform-for-ireland_demo_59c10df13a4a.mp4"></video></h2>
<h2>Why I Built This</h2>
<p>Planning is often portrayed as slow or inefficient. After working closely with Irish planning legislation, regulator data, and professional workflows, it became clear that this framing is misleading.</p>
<p>The Irish planning system is already highly structured, rule-based, and defensible. Planners operate within explicit chains of logic grounded in legislation, development plans, policy objectives, site constraints, and precedent decisions. The problem is not a lack of structure. It is the absence of software that can surface, manage, and reuse that structure effectively.</p>
<p>Most general-purpose AI tools flatten this complexity into single answers. In a regulated environment where accountability and auditability matter, that makes them unusable.</p>
<p>This project was built to address that gap: to create a <strong>planning-native AI platform</strong> that strengthens professional judgement rather than obscuring it.</p>
<hr>
<h2>The Problem Space</h2>
<p>Public planning data and regulator reporting highlight several persistent issues:</p>
<ul>
<li>High and sustained application volumes</li>
<li>Significant invalidation rates before assessment</li>
<li>Increasing legislative and policy complexity</li>
<li>Large amounts of professional time spent on repetitive research, validation, and rework</li>
</ul>
<p>These issues are systemic rather than incidental. From a software engineering perspective, they point to a missing layer of infrastructure: a shared intelligence system that understands planning as a domain, rather than as unstructured text scattered across PDFs and portals.</p>
<hr>
<h2>What I Built</h2>
<h3>A Planning Intelligence Platform in Live Use</h3>
<p>The result is an <strong>AI-enhanced planning intelligence platform</strong> that is deployed in production and actively used by planners as part of day-to-day work, including research, report preparation, and application validation.</p>
<p>The system is deliberately not positioned as a chatbot. It is a <strong>decision-support workspace</strong> built around two tightly integrated layers:</p>
<ol>
<li>a structured planning knowledge engine  </li>
<li>a workflow-aware professional interface</li>
</ol>
<hr>
<h2>1. Planning Knowledge Engine</h2>
<p>The knowledge layer aggregates and normalises authoritative planning sources, including:</p>
<ul>
<li>Irish planning legislation and regulations</li>
<li>National, regional, and local development plans</li>
<li>Local authority planning registers</li>
<li>Appeal decisions and outcomes</li>
</ul>
<p>Key technical characteristics include:</p>
<ul>
<li>Retrieval-augmented generation with strict citation enforcement</li>
<li>Structured responses rather than free-form text</li>
<li>Fully inspectable sources for every output</li>
<li>Explicit prevention of invented authority or uncited reasoning</li>
</ul>
<p>Instead of answering questions opaquely, the system exposes the underlying policy logic and references that professionals are required to rely on. This allows outputs to be reviewed, challenged, and defended in professional contexts.</p>
<hr>
<h2>2. Workflow-Aware Planning Workspace</h2>
<p>On top of the knowledge engine, the platform provides tooling that reflects how planning work actually happens.</p>
<p>This includes:</p>
<ul>
<li>Assisted drafting of planning reports and statements</li>
<li>Context-aware validation and completeness checks</li>
<li>Discovery of comparable precedent cases</li>
<li>Planning-specific project stages and statutory timelines</li>
</ul>
<p>All AI-assisted outputs are grounded in uploaded drawings, site information, and applicable policy. Users retain full editorial control, and responsibility for final submissions remains explicitly human.</p>
<p>The platform is designed to reduce cognitive and administrative load, not to automate decision-making.</p>
<hr>
<h2>A Core Design Principle: Explainable or Unusable</h2>
<p>One of the strongest conclusions from building and deploying this system was the necessity of a strict design rule:</p>
<p><strong>If the logic flow cannot be traced, the output cannot be used.</strong></p>
<p>This principle shaped every architectural and product decision:</p>
<ul>
<li>No black-box conclusions</li>
<li>No opaque scoring without explanation</li>
<li>No automation without auditability</li>
<li>No outputs without explicit sources</li>
</ul>
<p>This mirrors best practice in safety-critical and regulated software systems and is essential for maintaining professional trust in live environments.</p>
<hr>
<h2>Technical Direction and Architecture</h2>
<p>Although the platform continues to evolve, its technical foundations are stable and deliberately conservative.</p>
<p>Core architectural elements include:</p>
<ul>
<li>Document ingestion pipelines for legislation, policy, and decisions</li>
<li>Metadata extraction for policies, constraints, and outcomes</li>
<li>Domain-specific prompting and templates</li>
<li>Retrieval-augmented reasoning with citation guarantees</li>
<li>Clear separation between assistance and decision authority</li>
</ul>
<p>The system is designed to scale incrementally, from limited geographic or case-type coverage to broader jurisdictional support, without changing its core reasoning model.</p>
<hr>
<h2>Commercial and Entrepreneurial Context</h2>
<p>This project was developed with commercial realism in mind from the outset.</p>
<p>The target market is the <strong>knowledge-intensive portion of planning work</strong>: research, validation, drafting, coordination, and precedent analysis. These activities represent significant cost and risk for both private consultants and developers.</p>
<p>The platform follows a credible adoption path:</p>
<ul>
<li>initial deployment with professional planning users,</li>
<li>expansion across additional authorities and use cases,</li>
<li>growth into larger multi-office and enterprise contracts,</li>
<li>and, over time, potential public-sector deployments with appropriate governance.</li>
</ul>
<p>The focus throughout has been on delivering tangible professional value rather than speculative automation.</p>
<hr>
<h2>Why This Project Matters to Me as a Developer</h2>
<p>This project reflects the kind of engineering work I am most interested in:</p>
<ul>
<li>complex real-world systems,</li>
<li>regulated decision-making environments,</li>
<li>and AI used as infrastructure rather than spectacle.</li>
</ul>
<p>Building and deploying this platform required careful attention to traceability, accountability, performance, and professional trust. It reinforced the importance of designing AI systems that respect domain constraints and human responsibility.</p>
<hr>
<h2>What Comes Next</h2>
<p>With the platform operating in live production, ongoing work focuses on:</p>
<ul>
<li>expanding coverage across additional local authorities and case types,</li>
<li>incorporating feedback from active professional users,</li>
<li>strengthening monitoring, reliability, and performance,</li>
<li>and introducing carefully bounded predictive features with full explainability.</li>
</ul>
<p>The objective is not to replace planners or simplify planning beyond recognition, but to provide software that genuinely understands and supports how planning work is done today.</p>
`,text:"Building an AI Planning Intelligence Platform for Ireland Summary This project documents the design, architecture, and delivery of an AI-enhanced planning intelligence platform that is currently running in live production and used by planning professionals . The platform supports real-world planning workflows by combining Irish planning law, national and local policy, precedent decisions, and document intelligence into a traceable, explainable decision-support system . From a technical perspective, the work focuses on building robust document ingestion pipelines, retrieval-augmented reasoning with strict citation control, and workflow-aware AI tooling suitable for regulated environments. From an entrepreneurial perspective, it demonstrates how domain-specific AI infrastructure can be productised and deployed responsibly in a high-accountability professional sector. The central principle underpinning the system is simple: If the reasoning cannot be traced and explained, the output cannot be used. Why I Built This Planning is often portrayed as slow or inefficient. After working closely with Irish planning legislation, regulator data, and professional workflows, it became clear that this framing is misleading. The Irish planning system is already highly structured, rule-based, and defensible. Planners operate within explicit chains of logic grounded in legislation, development plans, policy objectives, site constraints, and precedent decisions. The problem is not a lack of structure. It is the absence of software that can surface, manage, and reuse that structure effectively. Most general-purpose AI tools flatten this complexity into single answers. In a regulated environment where accountability and auditability matter, that makes them unusable. This project was built to address that gap: to create a planning-native AI platform that strengthens professional judgement rather than obscuring it. The Problem Space Public planning data and regulator reporting highlight several persistent issues: High and sustained application volumes Significant invalidation rates before assessment Increasing legislative and policy complexity Large amounts of professional time spent on repetitive research, validation, and rework These issues are systemic rather than incidental. From a software engineering perspective, they point to a missing layer of infrastructure: a shared intelligence system that understands planning as a domain, rather than as unstructured text scattered across PDFs and portals. What I Built A Planning Intelligence Platform in Live Use The result is an AI-enhanced planning intelligence platform that is deployed in production and actively used by planners as part of day-to-day work, including research, report preparation, and application validation. The system is deliberately not positioned as a chatbot. It is a decision-support workspace built around two tightly integrated layers: a structured planning knowledge engine a workflow-aware professional interface 1. Planning Knowledge Engine The knowledge layer aggregates and normalises authoritative planning sources, including: Irish planning legislation and regulations National, regional, and local development plans Local authority planning registers Appeal decisions and outcomes Key technical characteristics include: Retrieval-augmented generation with strict citation enforcement Structured responses rather than free-form text Fully inspectable sources for every output Explicit prevention of invented authority or uncited reasoning Instead of answering questions opaquely, the system exposes the underlying policy logic and references that professionals are required to rely on. This allows outputs to be reviewed, challenged, and defended in professional contexts. 2. Workflow-Aware Planning Workspace On top of the knowledge engine, the platform provides tooling that reflects how planning work actually happens. This includes: Assisted drafting of planning reports and statements Context-aware validation and completeness checks Discovery of comparable precedent cases Planning-specific project stages and statutory timelines All AI-assisted outputs are grounded in uploaded drawings, site information, and applicable policy. Users retain full editorial control, and responsibility for final submissions remains explicitly human. The platform is designed to reduce cognitive and administrative load, not to automate decision-making. A Core Design Principle: Explainable or Unusable One of the strongest conclusions from building and deploying this system was the necessity of a strict design rule: If the logic flow cannot be traced, the output cannot be used. This principle shaped every architectural and product decision: No black-box conclusions No opaque scoring without explanation No automation without auditability No outputs without explicit sources This mirrors best practice in safety-critical and regulated software systems and is essential for maintaining professional trust in live environments. Technical Direction and Architecture Although the platform continues to evolve, its technical foundations are stable and deliberately conservative. Core architectural elements include: Document ingestion pipelines for legislation, policy, and decisions Metadata extraction for policies, constraints, and outcomes Domain-specific prompting and templates Retrieval-augmented reasoning with citation guarantees Clear separation between assistance and decision authority The system is designed to scale incrementally, from limited geographic or case-type coverage to broader jurisdictional support, without changing its core reasoning model. Commercial and Entrepreneurial Context This project was developed with commercial realism in mind from the outset. The target market is the knowledge-intensive portion of planning work : research, validation, drafting, coordination, and precedent analysis. These activities represent significant cost and risk for both private consultants and developers. The platform follows a credible adoption path: initial deployment with professional planning users, expansion across additional authorities and use cases, growth into larger multi-office and enterprise contracts, and, over time, potential public-sector deployments with appropriate governance. The focus throughout has been on delivering tangible professional value rather than speculative automation. Why This Project Matters to Me as a Developer This project reflects the kind of engineering work I am most interested in: complex real-world systems, regulated decision-making environments, and AI used as infrastructure rather than spectacle. Building and deploying this platform required careful attention to traceability, accountability, performance, and professional trust. It reinforced the importance of designing AI systems that respect domain constraints and human responsibility. What Comes Next With the platform operating in live production, ongoing work focuses on: expanding coverage across additional local authorities and case types, incorporating feedback from active professional users, strengthening monitoring, reliability, and performance, and introducing carefully bounded predictive features with full explainability. The objective is not to replace planners or simplify planning beyond recognition, but to provide software that genuinely understands and supports how planning work is done today.",assets:["/projects/building-an-ai-planning-intelligence-platform-for-ireland_demo_59c10df13a4a.mp4","/projects/building-an-ai-planning-intelligence-platform-for-ireland_preview_video_59c10df13a4a.mp4"]},{slug:"leo",title:"LEO – AI-Powered Anomaly Detection & Automation Service",summary:"Designed and built a production-oriented anomaly detection service exposing a FastAPI-based interface for real-time and batch time-series analysis, with support for configurable thresholds, execution tracking, and extensible ML backends.",tags:["Python","Machine Learning","Anomaly Detection","API","Automation","Real-time"],featured:!0,tech:["Python","FastAPI","NumPy","scikit-learn","Redis","Docker"],links:[{label:"GitHub Repository",url:"https://github.com/NeriCarcasci/leo"}],order:2,draft:!1,html:`<h1>LEO-LOCAL: AI-Powered Natural Language Shell Interface</h1>
<h2>Vision &amp; Technical Overview</h2>
<p><strong>LEO-LOCAL</strong> represents an ambitious bridge between natural language processing and system administration, transforming how developers interact with command-line environments. The project envisions a future where shell operations are democratized through conversational AI, eliminating the cognitive overhead of memorizing complex command syntax while maintaining the precision and power of traditional CLIs.</p>
<hr>
<h2><img src="/projects/leo_image_a1a843283215.webp" alt="Architecture Sample"></h2>
<h2>Architecture &amp; Technical Implementation</h2>
<p>Built with <strong>Python 3.13+</strong>, the system employs a modular, event-driven architecture designed around four core execution pillars:</p>
<h3>1. Natural Language Processing Pipeline</h3>
<ul>
<li>AI-powered prompt interpretation layer that translates user intent into structured shell commands  </li>
<li>Custom data types for command representation and validation  </li>
<li>Context-aware command generation with semantic understanding of system state</li>
</ul>
<h3>2. Execution Engine &amp; Orchestration</h3>
<p>The executor module implements a sophisticated command lifecycle management system:</p>
<ul>
<li>Run ID generation and tracking for execution auditing  </li>
<li>Run hash computation for command deduplication and caching  </li>
<li>Atomic execution cycles with comprehensive logging and state persistence  </li>
<li>File-based run tracking system enabling rollback and debugging capabilities</li>
</ul>
<h3>3. Security-First Design</h3>
<ul>
<li>Secrets management module implementing secure credential handling  </li>
<li>Environment variable isolation and sandboxing  </li>
<li>User-controlled execution modes: <strong>autonomous</strong> vs. <strong>approval-gated</strong> workflows  </li>
<li>Command validation and sanitization before shell execution</li>
</ul>
<h3>4. DevOps Integration</h3>
<ul>
<li>Dockerized testing infrastructure for reproducible test environments  </li>
<li>GitHub Actions CI/CD pipeline with automated <code>pytest</code> execution on pull requests  </li>
<li>Modular test suite with isolated unit tests for each system component  </li>
<li>Workflow automation for PR validation (automated testing workflows #5–#8)</li>
</ul>
<hr>
<h2>Development Methodology &amp; Engineering Rigor</h2>
<p>The project demonstrates professional software engineering practices:</p>
<ul>
<li><p><strong>Test-Driven Development</strong><br>Comprehensive <code>pytest</code> suite with 13+ passing unit tests for configuration management  </p>
</li>
<li><p><strong>Containerization</strong><br>Docker-based testing environment ensuring consistency across development and CI/CD  </p>
</li>
<li><p><strong>Version Control Discipline</strong><br>38+ atomic commits with clear SCRUM ticket references (e.g. <code>SCRUM-28</code>, <code>SCRUM-31</code>)  </p>
</li>
<li><p><strong>Pull Request Workflow</strong><br>8 merged PRs with automated quality gates</p>
</li>
</ul>
<hr>
<h2>Key Technical Achievements</h2>
<ul>
<li><p><strong>Command Generation Cycle</strong><br>End-to-end natural language → shell command translation with structured output formatting  </p>
</li>
<li><p><strong>Configuration Management</strong><br>Type-safe configuration module with comprehensive test coverage, handling environment variables, secrets, and runtime parameters  </p>
</li>
<li><p><strong>Logging Infrastructure</strong><br>Structured logging system capturing execution traces, enabling debugging and audit trails for AI-generated commands  </p>
</li>
<li><p><strong>Orchestration Layer</strong><br>Multi-stage command execution pipeline with error detection, recovery mechanisms, and execution state management  </p>
</li>
<li><p><strong>CLI Installation Framework</strong><br>Custom installer (<code>install.py</code>) with dependency management and environment setup automation</p>
</li>
</ul>
<hr>
<h2>Technical Stack</h2>
<ul>
<li><strong>Core:</strong> Python 3.13, Typer (CLI framework)  </li>
<li><strong>AI / ML:</strong> LLM integration for natural language understanding (model selection abstracted for flexibility)  </li>
<li><strong>Testing:</strong> pytest, Docker test containers  </li>
<li><strong>CI/CD:</strong> GitHub Actions with automated PR validation  </li>
<li><strong>Development:</strong> Modular package structure (<code>client/</code>, <code>modules/</code>, <code>tests/</code>)</li>
</ul>
<hr>
<h2>Project Maturity &amp; Future Vision</h2>
<p>The repository contains <strong>~10,000+ lines of code</strong> across modular components, demonstrating a transition from prototype to production-ready system. The codebase includes:</p>
<ul>
<li>Robust error handling and recovery mechanisms  </li>
<li>Comprehensive documentation (README files at project and client levels)  </li>
<li>Clean separation of concerns (executor, logger, config, secrets as independent modules)  </li>
<li>Extensible architecture for adding new command interpreters and execution backends</li>
</ul>
<hr>
<h2>Impact &amp; Implications</h2>
<p>This project tackles a fundamental human–computer interaction challenge: making powerful CLI tools accessible without sacrificing control or security. By combining AI-driven natural language understanding with rigorous software engineering practices, <strong>LEO-LOCAL</strong> demonstrates how next-generation developer tools can enhance productivity while maintaining professional standards for reliability, security, and maintainability.</p>
`,text:"LEO-LOCAL: AI-Powered Natural Language Shell Interface Vision &amp; Technical Overview LEO-LOCAL represents an ambitious bridge between natural language processing and system administration, transforming how developers interact with command-line environments. The project envisions a future where shell operations are democratized through conversational AI, eliminating the cognitive overhead of memorizing complex command syntax while maintaining the precision and power of traditional CLIs. Architecture &amp; Technical Implementation Built with Python 3.13+ , the system employs a modular, event-driven architecture designed around four core execution pillars: 1. Natural Language Processing Pipeline AI-powered prompt interpretation layer that translates user intent into structured shell commands Custom data types for command representation and validation Context-aware command generation with semantic understanding of system state 2. Execution Engine &amp; Orchestration The executor module implements a sophisticated command lifecycle management system: Run ID generation and tracking for execution auditing Run hash computation for command deduplication and caching Atomic execution cycles with comprehensive logging and state persistence File-based run tracking system enabling rollback and debugging capabilities 3. Security-First Design Secrets management module implementing secure credential handling Environment variable isolation and sandboxing User-controlled execution modes: autonomous vs. approval-gated workflows Command validation and sanitization before shell execution 4. DevOps Integration Dockerized testing infrastructure for reproducible test environments GitHub Actions CI/CD pipeline with automated pytest execution on pull requests Modular test suite with isolated unit tests for each system component Workflow automation for PR validation (automated testing workflows #5–#8) Development Methodology &amp; Engineering Rigor The project demonstrates professional software engineering practices: Test-Driven Development Comprehensive pytest suite with 13+ passing unit tests for configuration management Containerization Docker-based testing environment ensuring consistency across development and CI/CD Version Control Discipline 38+ atomic commits with clear SCRUM ticket references (e.g. SCRUM-28 , SCRUM-31 ) Pull Request Workflow 8 merged PRs with automated quality gates Key Technical Achievements Command Generation Cycle End-to-end natural language → shell command translation with structured output formatting Configuration Management Type-safe configuration module with comprehensive test coverage, handling environment variables, secrets, and runtime parameters Logging Infrastructure Structured logging system capturing execution traces, enabling debugging and audit trails for AI-generated commands Orchestration Layer Multi-stage command execution pipeline with error detection, recovery mechanisms, and execution state management CLI Installation Framework Custom installer ( install.py ) with dependency management and environment setup automation Technical Stack Core: Python 3.13, Typer (CLI framework) AI / ML: LLM integration for natural language understanding (model selection abstracted for flexibility) Testing: pytest, Docker test containers CI/CD: GitHub Actions with automated PR validation Development: Modular package structure ( client/ , modules/ , tests/ ) Project Maturity &amp; Future Vision The repository contains ~10,000+ lines of code across modular components, demonstrating a transition from prototype to production-ready system. The codebase includes: Robust error handling and recovery mechanisms Comprehensive documentation (README files at project and client levels) Clean separation of concerns (executor, logger, config, secrets as independent modules) Extensible architecture for adding new command interpreters and execution backends Impact &amp; Implications This project tackles a fundamental human–computer interaction challenge: making powerful CLI tools accessible without sacrificing control or security. By combining AI-driven natural language understanding with rigorous software engineering practices, LEO-LOCAL demonstrates how next-generation developer tools can enhance productivity while maintaining professional standards for reliability, security, and maintainability.",assets:["/projects/leo_image_a1a843283215.webp"]}],n=t.filter(e=>!e.draft);function a(e){return n.find(i=>i.slug===e)}function r(){return n.filter(e=>e.featured)}function o(){return n}export{o as a,a as b,r as g};
