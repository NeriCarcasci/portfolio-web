## Overview
Built a stateless API for real-time anomaly detection on time-series windows with configurable sensitivity.

## Problem
Operations teams manually reviewed dashboards for anomalies. Detection was inconsistent and often too late.

## Approach
Implemented multiple detection algorithms (Z-score, Isolation Forest, DBSCAN) and adaptive thresholds based on historical patterns. Added an API for ingesting windows and returning anomaly scores.

## Impact
Automated anomaly detection for 3 critical systems and reduced mean detection time from hours to seconds.