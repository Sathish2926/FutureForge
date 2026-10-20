# CareerPath AI: Curated Database & Verified Scholarship Export
Generated on: 2026-09-26 20:36:12

## Overview
This directory contains the production-grade standalone export of the **CareerPath AI Curated Recommendation Universe** and the **Verified Indian Scholarship Database**.
This dataset has been audited to guarantee **ZERO fake entries**, zero fabricated salaries/fees, and strict preservation of missing attributes as `NULL`.

---

## Files Included

### 1. Standalone SQLite Database
- **`careerpath_curated.db`** (6.06 MB):
  - Self-contained, fully indexed SQLite database.
  - Tables:
    - `colleges`: 1,475 Curated institutions across 12 standardized categories.
    - `programs`: 11,569 Accredited degree offerings.
    - `courses`: Normalized View matching the CareerPath API specification.
    - `placements`: Verified NIRF median packages and official average CTC reports.
    - `college_fees`: Verified annual tuition fee disclosures.
    - `college_rankings`: Official NIRF 2025 discipline & overall ranks.
    - `college_selection`: Multi-criteria Selection Scores (0-100), intra-discipline ranks, and factual audit reasons.
    - `scholarships`: 28 Verified Central, State & Foundation Indian scholarships.
    - `scholarship_eligibility_rules`: 92 Structured eligibility rules (income limits, academic minimums, community, domicile).
    - `scholarship_sources`: 28 Direct government and trust portal URLs.
    - `scholarship_conflicts`: Audit log of cross-source discrepancies.

### 2. Tabular CSV Datasets
| File | Records | Description |
| :--- | :---: | :--- |
| **`curated_colleges.csv`** | 1,475 | Full college master records with standardized classification, selection scores, and ranks. |
| **`curated_courses.csv`** | 11,569 | Individual course offerings with normalized degrees, specializations, fees, and seat intake. |
| **`curated_placements.csv`** | 453 | Verified placement outcomes (NIRF median LPA, average package LPA, students placed). |
| **`curated_fees.csv`** | 303 | Verified annual tuition fee records with academic year provenance. |
| **`curated_rankings.csv`** | 466 | Official statutory NIRF 2025 discipline rankings. |
| **`verified_scholarships.csv`** | 28 | Real Indian scholarships with funding amounts, deadlines, and official application portals. |
| **`scholarship_eligibility_rules.csv`** | 92 | Machine-readable eligibility criteria for rule-engine matching. |
| **`scholarship_sources.csv`** | 28 | Authoritative source URLs and verification records. |

### 3. Hierarchical JSON Bundles
- **`curated_colleges_complete.json`**: Nested JSON array of all 1,475 colleges with embedded programs, fees, placements, and rankings.
- **`verified_scholarships_complete.json`**: Nested JSON array of all 28 scholarships with embedded eligibility rules and official sources.

---

## Discipline Distribution of Curated Colleges (1,475 Total)
- `ARTS_SCIENCE`: 250 colleges
- `ENGINEERING_TECHNOLOGY`: 200 colleges
- `MULTIDISCIPLINARY_UNIVERSITY`: 200 institutions
- `MANAGEMENT`: 150 colleges
- `MEDICAL`: 100 colleges
- `PHARMACY`: 100 colleges
- `LAW`: 100 colleges
- `AGRICULTURE`: 75 colleges
- `ARCHITECTURE_PLANNING`: 75 colleges
- `DENTAL`: 75 colleges
- `EDUCATION`: 75 colleges
- `PURE_SCIENCE_RESEARCH`: 75 institutes

---

## Provenance & Integrity Statement
- **Statutory NIRF Rankings**: Sourced exclusively from the National Institutional Ranking Framework (NIRF 2025), Ministry of Education, Government of India.
- **CareerPath Selection Score**: A proprietary 0–100 multi-criteria recommendation score based on program breadth, placement track record, fee reasonableness, and data transparency. Not an official government ranking.
- **Missing Data**: All missing rankings, unlisted fees, and undisclosed salaries are preserved as `NULL` / `NOT_AVAILABLE` without fabrication.
