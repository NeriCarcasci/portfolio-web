# Building Trust in AI: Explainable Graph Neural Networks for Financial Crime Detection

## The Challenge

Every year, up to 5% of global GDP, approximately €1.7 trillion—is laundered through the financial system. Financial institutions invest heavily in combating this threat, with compliance costs in the EMEA region alone reaching $85 billion in 2023. Despite these massive investments, Anti-Money Laundering (AML) systems struggle with high false-positive rates and limited interpretability, creating both operational inefficiency and regulatory challenges.

Traditional machine learning approaches treat transactions in isolation, missing the crucial relational patterns that characterize financial crime. While Graph Neural Networks (GNNs) can model these network relationships, they operate as "black boxes"—making it difficult to understand why a particular transaction was flagged as suspicious. For regulated financial institutions, this lack of transparency is a critical barrier to adoption.

---
![Topologies](local:diagram.png)
---

## My Research: Bringing Explainability to Graph-Based AML Detection

My thesis explores how to make GNN-based financial crime detection not just accurate, but also transparent and interpretable. I'm developing and evaluating explainable GNN models using the Elliptic2 dataset—a cutting-edge benchmark created by MIT CSAIL, IBM Watson AI Lab, and Elliptic that contains real-world cryptocurrency transaction networks.

### The Dataset Challenge

The Elliptic2 dataset presents significant technical challenges that mirror real-world AML scenarios:

- **Scale**: 49 million background nodes and 445,000 labeled nodes organized into 122,000 transaction subgraphs
- **Severe class imbalance**: Only 2.3% of transactions are labeled as suspicious—reflecting the reality that illicit activity is relatively rare but high-impact
- **Feature anonymization**: 43 binned features representing cluster-level statistics, network topology, and temporal patterns, designed to protect intellectual property while maintaining research utility
- **Graph structure**: Transactions are modeled as subgraphs rather than isolated points, preserving the relational context critical for detecting money laundering patterns

## Preprocessing & Baseline Establishment

The preprocessing pipeline transforms raw Elliptic2 data into research-ready artifacts with reproducible quality controls:

**Graph Construction**
Node re-indexing ensures contiguous structures, while validation checks maintain edge-node consistency and intra-subgraph label integrity. Raw data is converted to Parquet for efficient access.

**Feature Handling**
Aligned feature matrices preserve the ordinal nature of anonymized binned features. Missing values are handled to maintain feature semantics, with all statistics computed exclusively on training data.

**Experimental Design**
Stratified train/val/test splits are performed at the subgraph level to prevent structural leakage while maintaining class distribution across the severe imbalance (2.3% positive rate). All splits and mappings are persisted for reproducibility.

**Evaluation Framework**
Baseline comparisons use Precision-Recall AUC as the primary metric, appropriate for the extreme class imbalance where standard accuracy is uninformative.

## What I'm Building Now: Multi-Method Explainability Framework

I'm currently implementing a comprehensive explainability layer that will make GNN predictions interpretable through multiple complementary approaches:

**Feature-Based Explainability**
- **SHAP (SHapley Additive exPlanations)**: Quantifying how much each feature contributes to individual predictions using game-theoretic principles
- **LIME (Local Interpretable Model-agnostic Explanations)**: Creating local linear approximations around specific predictions to understand decision boundaries

**Graph-Native Explainability**
- **GNNExplainer**: Identifying which subgraph structures and node neighborhoods are most important for each prediction
- **Counterfactual-GNN**: Generating minimal graph modifications that would flip a prediction, revealing the decision-critical patterns

**Topological Pattern Analysis**
I'm particularly focused on analyzing how transaction network topology influences detection—recognizing that structural patterns (like star networks, long chains, or dense clusters) often indicate specific laundering techniques.

## Research Goals & Impact

This work addresses four key objectives:

1. **Performance**: Comparing GNN subgraph classification against traditional ML baselines to quantify the value of graph-based approaches
2. **Explainability**: Evaluating multiple explanation methods for transparency, stability, and practical utility in AML workflows
3. **Fairness & Bias**: Investigating whether predictions and explanations differ across structural subgroups to identify potential biases
4. **Practical Integration**: Designing explanation outputs that can realistically support AML analyst decision-making

The ultimate goal is to demonstrate that advanced AI can be both powerful *and* trustworthy in high-stakes financial compliance applications.

## Why This Matters

Explainable AI in financial compliance isn't just an academic exercise—it's a practical necessity. Regulatory frameworks increasingly require financial institutions to explain automated decisions. Analysts need to understand why transactions are flagged to investigate efficiently. And ultimately, effective AML systems must balance detection capability with operational feasibility.

By developing rigorous methods for explaining GNN predictions on financial networks, this research aims to accelerate the adoption of graph-based AI in financial crime detection—bringing more sophisticated tools to bear on a critical global challenge while maintaining the transparency required for responsible deployment.

---

*This work is conducted as part of my graduate thesis in Computing with Artificial Intelligence & Machine Learning at TU Dublin*