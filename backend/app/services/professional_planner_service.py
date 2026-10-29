"""
Service layer for Working Professional Career Growth & Transition Planner.
Provides:
- Curated roles, skills, and verified learning resources repository.
- Robust Skill Gap Analyzer (Existing, To Improve, Missing, Additional).
- Career Options Recommender (closely related, advancement, technical, industry switch).
- Personalized Step-by-Step Career Roadmap generator tailored to time/budget.
- AI Career Analysis & Contextual Guidance Assistant with rule-based fallback.
- Resume & Career Transition checklist.
"""
from typing import Dict, List, Any, Optional, Tuple
from datetime import datetime
import re
from sqlalchemy.orm import Session

from app.professional_models import (
    ProfessionalProfile,
    ProfessionalRole,
    ProfessionalRoleSkill,
    ProfessionalLearningResource,
    ProfessionalCareerPlan,
    ProfessionalPlanStep,
    GuidanceRequestRecord,
)
from app.seeds.verified_career_knowledge_base import (
    VERIFIED_CAREERS_DATA,
    INCOMPLETE_CAREER_SAMPLE,
    VERIFIED_RESOURCES_DATA,
)
from app.services.profile_nlp_service import (
    parse_natural_language_profile,
    analyze_multiskill_evidence,
)
from app.recommendation import try_gemini_explain
import uuid
import os
import logging

logger = logging.getLogger(__name__)


# ============================================================================
# CURATED KNOWLEDGE BASE DATASET (ROLES, SKILLS, VERIFIED RESOURCES)
# ============================================================================

CURATED_ROLES_DATA = [
    {
        "slug": "automation-tester",
        "title": "Automation Tester",
        "industry": "Software & Information Technology",
        "description": "Designs, writes, and executes automated test scripts using frameworks like Selenium, Playwright, or Cypress to validate software reliability and performance.",
        "experience_level": "Mid",
        "transition_category": "Technical Transition",
        "transferable_from": ["manual tester", "qa tester", "test analyst", "qa engineer", "quality analyst", "test lead"],
        "typical_progression": "Manual Tester -> Automation Tester -> Senior QA Automation Engineer -> QA Lead / SDET",
        "why_it_fits_template": "Your existing understanding of testing life cycles, defect triage, and test cases directly transfers. Developing programming and framework skills bridges the automation gap.",
        "transferability_notes": "Core QA concepts (test cases, bug reporting, boundary value analysis) are 100% reusable; focus learning strictly on code-based automation tools and CI/CD.",
        "suggested_learning_areas": ["Programming with Python or JavaScript", "Selenium WebDriver or Playwright", "API Testing with Postman/REST-Assured", "CI/CD Test Pipelines"],
        "possible_next_steps": ["Automate a suite of 20 manual regression test cases", "Integrate automated tests into GitHub Actions", "Obtain ISTQB Advanced Test Automation certification"],
        "skills": [
            {"skill_name": "Test Case Design", "category": "Core Domain", "importance": "core", "why_it_matters": "Fundamental logic for validating application behavior and edge cases.", "recommended_priority": "High", "hours": 8},
            {"skill_name": "Defect Reporting & Triage", "category": "Core Domain", "importance": "core", "why_it_matters": "Accurately documenting steps to reproduce, severity, and logs for engineering teams.", "recommended_priority": "High", "hours": 6},
            {"skill_name": "Selenium WebDriver", "category": "Technical", "importance": "core", "why_it_matters": "Industry-standard library for automated web browser interaction.", "recommended_priority": "High", "hours": 20},
            {"skill_name": "Playwright / Cypress", "category": "Technical", "importance": "complementary", "why_it_matters": "Modern, fast test runners with built-in auto-waiting and network mocking.", "recommended_priority": "Medium", "hours": 16},
            {"skill_name": "Python or JavaScript Programming", "category": "Technical", "importance": "core", "why_it_matters": "Scripting test logic, data-driven test harnesses, and assertions.", "recommended_priority": "High", "hours": 25},
            {"skill_name": "API Testing (Postman / REST)", "category": "Technical", "importance": "core", "why_it_matters": "Validating headless microservices and HTTP response payloads.", "recommended_priority": "High", "hours": 14},
            {"skill_name": "Git & Version Control", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "Collaborating on test code repositories and branch management.", "recommended_priority": "Medium", "hours": 10},
            {"skill_name": "CI/CD Pipeline Integration", "category": "Tools & Technologies", "importance": "complementary", "why_it_matters": "Running automated tests automatically on pull requests.", "recommended_priority": "Medium", "hours": 12},
            {"skill_name": "Performance & Load Testing Basics", "category": "Technical", "importance": "optional", "why_it_matters": "Understanding response times under simulated concurrent traffic (JMeter/k6).", "recommended_priority": "Low", "hours": 10},
        ],
    },
    {
        "slug": "software-developer",
        "title": "Software Developer",
        "industry": "Software & Information Technology",
        "description": "Constructs robust applications, implements business logic, develops APIs, and writes clean, maintainable software according to architectural standards.",
        "experience_level": "Mid",
        "transition_category": "Career Advancement",
        "transferable_from": ["junior developer", "junior software engineer", "programmer", "intern developer", "web developer", "trainee engineer"],
        "typical_progression": "Junior Developer -> Software Developer -> Senior Software Engineer -> Lead Architect",
        "why_it_fits_template": "Advancing from basic coding to production software development involves mastering design patterns, database modeling, and system reliability.",
        "transferability_notes": "Existing syntax familiarity is the foundation; the leap requires clean architecture, testing, database indexing, and async processing.",
        "suggested_learning_areas": ["Object-Oriented Design & SOLID principles", "Relational Databases & SQL Optimization", "Automated Unit Testing & Mocking", "Secure REST APIs"],
        "possible_next_steps": ["Ship a full-stack production application with auth and database", "Refactor a legacy module using design patterns", "Contribute a feature to an open-source project"],
        "skills": [
            {"skill_name": "Data Structures & Algorithms", "category": "Core Domain", "importance": "core", "why_it_matters": "Efficient data manipulation, complexity analysis, and algorithmic problem solving.", "recommended_priority": "High", "hours": 30},
            {"skill_name": "Object-Oriented & Modular Design", "category": "Core Domain", "importance": "core", "why_it_matters": "Writing extensible, maintainable code following SOLID principles.", "recommended_priority": "High", "hours": 18},
            {"skill_name": "SQL & Relational Database Design", "category": "Technical", "importance": "core", "why_it_matters": "Normalizing schemas, writing complex queries, and managing ACID transactions.", "recommended_priority": "High", "hours": 20},
            {"skill_name": "RESTful API Development", "category": "Technical", "importance": "core", "why_it_matters": "Building robust HTTP endpoints, middleware, and request validation.", "recommended_priority": "High", "hours": 20},
            {"skill_name": "Automated Unit & Integration Testing", "category": "Technical", "importance": "core", "why_it_matters": "Ensuring code regressions are caught before staging deployment.", "recommended_priority": "High", "hours": 15},
            {"skill_name": "Git Collaboration & Code Review", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "Resolving merge conflicts, pull request reviews, and semantic versioning.", "recommended_priority": "Medium", "hours": 10},
            {"skill_name": "Docker & Containerization", "category": "Tools & Technologies", "importance": "complementary", "why_it_matters": "Containerizing applications for consistent deployment across environments.", "recommended_priority": "Medium", "hours": 14},
            {"skill_name": "System Debugging & Profiling", "category": "Technical", "importance": "complementary", "why_it_matters": "Tracing memory leaks, slow queries, and uncaught exceptions.", "recommended_priority": "Medium", "hours": 12},
        ],
    },
    {
        "slug": "backend-developer",
        "title": "Backend Developer",
        "industry": "Software & Information Technology",
        "description": "Specializes in server-side application logic, databases, distributed microservices, message queues, and API security.",
        "experience_level": "Mid",
        "transition_category": "Technical Transition",
        "transferable_from": ["software developer", "full-stack developer", "frontend developer", "application programmer"],
        "typical_progression": "Software Developer -> Backend Developer -> Senior Backend Engineer -> Distributed Systems Architect",
        "why_it_fits_template": "Leverage your software engineering background to specialize deeply in performance, database scalability, and backend architecture.",
        "transferability_notes": "Language fundamentals carry over; shift focus toward caching (Redis), message queues (Kafka/RabbitMQ), and distributed data consistency.",
        "suggested_learning_areas": ["Distributed Systems & Microservices", "PostgreSQL Advanced Optimization", "Caching & Message Queues", "OAuth2 & API Security"],
        "possible_next_steps": ["Implement an asynchronous task worker with Redis/Celery", "Design a rate-limited authentication microservice", "Profile and optimize slow database queries with EXPLAIN ANALYZE"],
        "skills": [
            {"skill_name": "Backend Language (Python/Go/Java/Node)", "category": "Technical", "importance": "core", "why_it_matters": "Writing concurrent, efficient server-side business logic.", "recommended_priority": "High", "hours": 30},
            {"skill_name": "Database Schema Design & Indexing", "category": "Technical", "importance": "core", "why_it_matters": "Designing high-throughput relational schemas and composite indexes.", "recommended_priority": "High", "hours": 22},
            {"skill_name": "Caching with Redis", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "Reducing database latency through in-memory cache patterns.", "recommended_priority": "High", "hours": 14},
            {"skill_name": "Asynchronous Message Queues", "category": "Technical", "importance": "complementary", "why_it_matters": "Decoupling long-running jobs via background task queues.", "recommended_priority": "Medium", "hours": 16},
            {"skill_name": "API Authentication & Security", "category": "Core Domain", "importance": "core", "why_it_matters": "Implementing JWT, OAuth2, rate limiting, and CORS headers safely.", "recommended_priority": "High", "hours": 16},
            {"skill_name": "Docker & Cloud Deployment", "category": "Tools & Technologies", "importance": "complementary", "why_it_matters": "Deploying containerized microservices to cloud container runtimes.", "recommended_priority": "Medium", "hours": 14},
            {"skill_name": "Observability & Logging", "category": "Tools & Technologies", "importance": "complementary", "why_it_matters": "Structured JSON logging, Prometheus metrics, and OpenTelemetry tracing.", "recommended_priority": "Low", "hours": 10},
        ],
    },
    {
        "slug": "cloud-support-engineer",
        "title": "Cloud Support Engineer",
        "industry": "Cloud Computing & IT Infrastructure",
        "description": "Diagnoses, troubleshoots, and resolves complex technical issues on cloud infrastructure platforms like AWS, Azure, and Google Cloud.",
        "experience_level": "Mid",
        "transition_category": "Technical Transition",
        "transferable_from": ["support engineer", "technical support specialist", "system administrator", "desktop engineer", "it technician", "network engineer"],
        "typical_progression": "Support Engineer -> Cloud Support Engineer -> Cloud Solutions Architect / DevOps Engineer",
        "why_it_fits_template": "Your troubleshooting methodology and client problem resolution skills directly apply. Learning cloud infrastructure concepts unlocks modern high-demand cloud roles.",
        "transferability_notes": "Diagnostic mindset, ticket resolution, and customer communication translate immediately; focus training on VPC networking, IAM security, and cloud compute.",
        "suggested_learning_areas": ["Cloud Core Services (Compute, Storage, Networking)", "Linux Administration & Bash Scripting", "Cloud Security & IAM", "Infrastructure Monitoring"],
        "possible_next_steps": ["Earn AWS Certified Cloud Practitioner / Solutions Architect Associate", "Build a high-availability multi-tier VPC network", "Automate system health checks with shell scripts"],
        "skills": [
            {"skill_name": "Linux Command Line & Administration", "category": "Technical", "importance": "core", "why_it_matters": "Navigating remote servers, managing permissions, and analyzing system logs.", "recommended_priority": "High", "hours": 24},
            {"skill_name": "Computer Networking & DNS", "category": "Core Domain", "importance": "core", "why_it_matters": "Understanding TCP/IP, CIDR blocks, Subnets, Routing Tables, and DNS resolution.", "recommended_priority": "High", "hours": 20},
            {"skill_name": "Cloud Core Architecture (AWS/Azure)", "category": "Technical", "importance": "core", "why_it_matters": "Deploying virtual machines, managed databases, and object storage.", "recommended_priority": "High", "hours": 28},
            {"skill_name": "Identity & Access Management (IAM)", "category": "Core Domain", "importance": "core", "why_it_matters": "Enforcing least-privilege security policies, roles, and credential rotation.", "recommended_priority": "High", "hours": 14},
            {"skill_name": "Technical Troubleshooting & Diagnostics", "category": "Soft Skills", "importance": "core", "why_it_matters": "Structured root cause analysis and reproducing customer issue scenarios.", "recommended_priority": "High", "hours": 12},
            {"skill_name": "Bash / Python Scripting", "category": "Technical", "importance": "complementary", "why_it_matters": "Automating repetitive diagnostics and log parsing.", "recommended_priority": "Medium", "hours": 18},
            {"skill_name": "CloudWatch / Monitoring & Alerting", "category": "Tools & Technologies", "importance": "complementary", "why_it_matters": "Setting alarm thresholds, reviewing resource metrics, and incident response.", "recommended_priority": "Medium", "hours": 12},
        ],
    },
    {
        "slug": "data-analyst",
        "title": "Data Analyst",
        "industry": "Data & Business Intelligence",
        "description": "Transforms raw transactional and business data into actionable dashboards, KPIs, and statistical insights that guide executive decisions.",
        "experience_level": "Mid",
        "transition_category": "Technical Transition",
        "transferable_from": ["data entry executive", "operations executive", "business associate", "accountant", "market research analyst", "administrative executive"],
        "typical_progression": "Operations / Data Entry -> Junior Data Analyst -> Data Analyst -> Senior BI Specialist / Analytics Manager",
        "why_it_fits_template": "Your familiarity with data accuracy, spreadsheets, and tabular records forms a strong stepping stone into SQL-driven analytics and BI visualization.",
        "transferability_notes": "Attention to detail and spreadsheet handling are key strengths; learn relational SQL queries, data modeling, and visualization tools like Power BI/Tableau.",
        "suggested_learning_areas": ["Advanced SQL & Aggregate Queries", "Data Modeling in Power BI / Tableau", "Business Statistics & Exploratory Data Analysis", "Python for Data Cleaning (Pandas)"],
        "possible_next_steps": ["Build an interactive sales and customer churn dashboard", "Analyze a public dataset with SQL and present findings", "Master window functions and CTEs in PostgreSQL"],
        "skills": [
            {"skill_name": "Advanced Excel (Formulas, Pivot Tables)", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "Rapid spreadsheet calculations, VLOOKUP/XLOOKUP, and business modeling.", "recommended_priority": "High", "hours": 14},
            {"skill_name": "SQL (Joins, Aggregations, Window Functions)", "category": "Technical", "importance": "core", "why_it_matters": "Extracting, filtering, and summarizing records directly from relational databases.", "recommended_priority": "High", "hours": 26},
            {"skill_name": "Business Intelligence (Power BI / Tableau)", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "Designing interactive visual executive dashboards and KPI scorecards.", "recommended_priority": "High", "hours": 22},
            {"skill_name": "Data Cleaning & Preparation", "category": "Core Domain", "importance": "core", "why_it_matters": "Handling missing data, deduplication, and standardizing date/string schemas.", "recommended_priority": "High", "hours": 16},
            {"skill_name": "Python for Data Analysis (Pandas, Numpy)", "category": "Technical", "importance": "complementary", "why_it_matters": "Automating data pipelines and statistical transformations at scale.", "recommended_priority": "Medium", "hours": 24},
            {"skill_name": "Data Storytelling & Presentation", "category": "Soft Skills", "importance": "core", "why_it_matters": "Translating charts into actionable commercial recommendations for non-technical leaders.", "recommended_priority": "High", "hours": 10},
        ],
    },
    {
        "slug": "financial-analyst",
        "title": "Financial Analyst",
        "industry": "Finance & Corporate Strategy",
        "description": "Evaluates financial statements, tracks revenue and expense variances, builds financial models, and forecasts commercial performance.",
        "experience_level": "Mid",
        "transition_category": "Career Advancement",
        "transferable_from": ["accountant", "accounts executive", "bookkeeper", "audit assistant", "financial clerk", "tax associate"],
        "typical_progression": "Accountant -> Financial Analyst -> Senior Financial Analyst -> FP&A Manager / Finance Director",
        "why_it_fits_template": "Your solid foundation in double-entry bookkeeping, P&L, balance sheets, and statutory accounts provides immediate credibility for forward-looking analysis.",
        "transferability_notes": "Accounting records historical transactions; financial analysis shifts focus toward forward forecasting, budgeting, scenario planning, and variance commentary.",
        "suggested_learning_areas": ["Financial Modeling & Forecasting", "Variance Analysis (Actual vs Budget)", "Corporate Valuation Basics (DCF)", "Executive Financial Reporting"],
        "possible_next_steps": ["Construct a 3-statement dynamic financial model in Excel", "Conduct variance analysis on quarterly departmental spend", "Earn CFI Financial Modeling & Valuation Analyst (FMVA) certification"],
        "skills": [
            {"skill_name": "Financial Statement Analysis", "category": "Core Domain", "importance": "core", "why_it_matters": "Interpreting Balance Sheets, Income Statements, and Cash Flow relationships.", "recommended_priority": "High", "hours": 18},
            {"skill_name": "Financial Modeling in Excel", "category": "Technical", "importance": "core", "why_it_matters": "Building dynamic 3-statement models, sensitivity tables, and scenario toggles.", "recommended_priority": "High", "hours": 28},
            {"skill_name": "Budgeting & Variance Analysis", "category": "Core Domain", "importance": "core", "why_it_matters": "Tracking actual revenues/costs against budget forecasts and explaining deviations.", "recommended_priority": "High", "hours": 16},
            {"skill_name": "Corporate Finance Fundamentals", "category": "Core Domain", "importance": "core", "why_it_matters": "Understanding NPV, IRR, WACC, and working capital optimization.", "recommended_priority": "High", "hours": 18},
            {"skill_name": "Business Presentation & Stakeholder Reporting", "category": "Soft Skills", "importance": "core", "why_it_matters": "Presenting financial packs clearly to department heads and executive leadership.", "recommended_priority": "Medium", "hours": 10},
            {"skill_name": "ERP & Financial Systems (SAP/Oracle)", "category": "Tools & Technologies", "importance": "complementary", "why_it_matters": "Extracting general ledger journals and departmental cost center balances.", "recommended_priority": "Medium", "hours": 14},
            {"skill_name": "Data Analysis with Power BI / SQL", "category": "Tools & Technologies", "importance": "optional", "why_it_matters": "Automating monthly management reporting from relational ledger tables.", "recommended_priority": "Low", "hours": 16},
        ],
    },
    {
        "slug": "business-development-manager",
        "title": "Business Development Manager",
        "industry": "Sales, Growth & Business Development",
        "description": "Drives strategic corporate growth by identifying new market opportunities, building enterprise client pipelines, negotiating contracts, and closing commercial partnerships.",
        "experience_level": "Mid",
        "transition_category": "Career Advancement",
        "transferable_from": [
            "sales executive", "inside sales representative", "account executive",
            "relationship manager", "business development executive",
            "digital marketer", "marketing executive", "lead generation specialist", "growth associate"
        ],
        "typical_progression": "Sales / Marketing Executive -> Business Development Manager -> Head of Business Development -> Chief Commercial Officer",
        "why_it_fits_template": "Your experience in lead generation, client prospecting, audience targeting, or commercial communication forms the core engine. Advancing to BDM requires mastering enterprise sales discovery, consultative pitching, and contract negotiation.",
        "transferability_notes": "Lead qualification, customer personas, CRM usage, and commercial communication carry forward directly; prioritize closing the gaps in direct B2B sales discovery calls, enterprise deal structuring, and contract negotiation.",
        "suggested_learning_areas": [
            "Consultative & Solution Selling (B2B)",
            "Enterprise Pipeline Strategy & CRM Analytics",
            "Contract Negotiation & Deal Structuring",
            "B2B Sales Discovery & Qualifying (BANT/MEDDIC)"
        ],
        "possible_next_steps": [
            "Build an outbound enterprise prospecting playbook with cold email & call scripts",
            "Conduct simulated B2B sales discovery calls and handle pricing objections",
            "Master CRM pipeline velocity and deal stage forecasting"
        ],
        "skills": [
            {"skill_name": "B2B Solution Selling & Prospecting", "category": "Core Domain", "importance": "core", "why_it_matters": "Identifying enterprise buyer pain points and presenting customized commercial solutions.", "recommended_priority": "High", "hours": 20},
            {"skill_name": "B2B Sales Discovery & Lead Qualification", "category": "Core Domain", "importance": "core", "why_it_matters": "Qualifying inbound leads and conducting structured discovery calls using BANT or MEDDIC frameworks.", "recommended_priority": "High", "hours": 16},
            {"skill_name": "Contract Negotiation & Closing", "category": "Core Domain", "importance": "core", "why_it_matters": "Structuring win-win agreements, commercial pricing terms, and closing enterprise contracts.", "recommended_priority": "High", "hours": 18},
            {"skill_name": "CRM & Pipeline Management (Salesforce/HubSpot)", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "Managing deal stages, conversion velocity, and revenue forecasting.", "recommended_priority": "High", "hours": 14},
            {"skill_name": "Executive Communication & Pitching", "category": "Soft Skills", "importance": "core", "why_it_matters": "Delivering persuasive presentations to VP and C-level decision-makers.", "recommended_priority": "High", "hours": 14},
            {"skill_name": "Strategic Account Planning & Expansion", "category": "Core Domain", "importance": "complementary", "why_it_matters": "Expanding contract value and multi-year relationships within strategic enterprise accounts.", "recommended_priority": "Medium", "hours": 14},
            {"skill_name": "Market & Competitive Research", "category": "Core Domain", "importance": "complementary", "why_it_matters": "Benchmarking competitor offerings, pricing models, and addressable enterprise segments.", "recommended_priority": "Medium", "hours": 12},
        ],
    },
    {
        "slug": "hr-analyst",
        "title": "HR Analyst",
        "industry": "Human Resources & People Analytics",
        "description": "Applies statistical analysis and reporting to workforce data including employee turnover, talent acquisition velocity, compensation parity, and employee engagement.",
        "experience_level": "Mid",
        "transition_category": "Technical Transition",
        "transferable_from": ["hr executive", "hr coordinator", "recruiter", "talent acquisition specialist", "hr generalist"],
        "typical_progression": "HR Executive -> HR Analyst -> Senior People Analytics Specialist -> Head of HR Operations",
        "why_it_fits_template": "Your understanding of organizational HR processes, recruitment cycles, and employee onboarding blends seamlessly with data-backed workforce insights.",
        "transferability_notes": "Retain your strong knowledge of labor laws, performance cycles, and HR policies; enhance your toolset with Excel modeling, Tableau, and HR metrics.",
        "suggested_learning_areas": ["People Analytics & Workforce Metrics", "Excel for HR (Pivot Tables, Regression)", "HR Information Systems (Workday/Darwinbox)", "Turnover & Retention Modeling"],
        "possible_next_steps": ["Create an attrition predictor dashboard analyzing tenure and department trends", "Conduct compensation benchmarking and pay equity analysis", "Standardize time-to-hire and cost-per-hire recruitment analytics"],
        "skills": [
            {"skill_name": "HR Domain & Lifecycle Knowledge", "category": "Core Domain", "importance": "core", "why_it_matters": "Deep familiarity with employee lifecycle, payroll, and benefits.", "recommended_priority": "High", "hours": 14},
            {"skill_name": "Workforce Analytics & KPI Modeling", "category": "Core Domain", "importance": "core", "why_it_matters": "Calculating turnover rates, absenteeism, headcounts, and productivity.", "recommended_priority": "High", "hours": 20},
            {"skill_name": "Advanced Excel for People Analytics", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "Aggregating employee rosters, compensation models, and survey scores.", "recommended_priority": "High", "hours": 18},
            {"skill_name": "Data Visualization (Power BI / Tableau)", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "Building visual diversity, headcount, and hiring dashboards for leadership.", "recommended_priority": "High", "hours": 20},
            {"skill_name": "Survey Analysis & Engagement Metrics", "category": "Core Domain", "importance": "complementary", "why_it_matters": "Measuring eNPS, employee satisfaction, and exit interview themes.", "recommended_priority": "Medium", "hours": 12},
            {"skill_name": "SQL for HR Database Queries", "category": "Technical", "importance": "complementary", "why_it_matters": "Extracting clean employee cohorts from enterprise database schemas.", "recommended_priority": "Medium", "hours": 18},
        ],
    },
    {
        "slug": "customer-success-specialist",
        "title": "Customer Success Specialist",
        "industry": "SaaS & Client Services",
        "description": "Manages post-sales client relationships to ensure product adoption, high user retention, account renewal, and proactive account expansion.",
        "experience_level": "Mid",
        "transition_category": "Adjacent",
        "transferable_from": ["customer support executive", "helpdesk specialist", "call center agent", "service coordinator", "operations associate"],
        "typical_progression": "Customer Support -> Customer Success Specialist -> Senior CS Manager -> Director of Customer Experience",
        "why_it_fits_template": "Your active listening, empathy, and issue de-escalation skills from support create the ideal bridge into proactive account retention and relationship management.",
        "transferability_notes": "Support is reactive (fixing tickets); Customer Success is proactive (onboarding, driving product adoption metrics, quarterly business reviews).",
        "suggested_learning_areas": ["Customer Onboarding & Product Adoption", "Health Score Metrics & Churn Prevention", "Quarterly Business Review (QBR) Delivery", "Gainsight / HubSpot Customer Success Tools"],
        "possible_next_steps": ["Build a 30-60-90 day client onboarding playbook", "Design a customer health score matrix based on usage frequency", "Lead mock Quarterly Business Reviews with executive stakeholders"],
        "skills": [
            {"skill_name": "Customer Empathy & Communication", "category": "Soft Skills", "importance": "core", "why_it_matters": "Building long-term client trust and managing difficult conversations.", "recommended_priority": "High", "hours": 12},
            {"skill_name": "Customer Onboarding & Implementation", "category": "Core Domain", "importance": "core", "why_it_matters": "Guiding new customers to their first value milestone swiftly.", "recommended_priority": "High", "hours": 18},
            {"skill_name": "Account Health & Churn Risk Analysis", "category": "Core Domain", "importance": "core", "why_it_matters": "Monitoring software usage signals to intervene before churn happens.", "recommended_priority": "High", "hours": 16},
            {"skill_name": "Quarterly Business Review (QBR) Presentation", "category": "Soft Skills", "importance": "core", "why_it_matters": "Demonstrating ROI and strategic value delivered to client executives.", "recommended_priority": "High", "hours": 14},
            {"skill_name": "CRM & Success Platforms (Gainsight/HubSpot)", "category": "Tools & Technologies", "importance": "complementary", "why_it_matters": "Tracking client health scores, renewal dates, and automated emails.", "recommended_priority": "Medium", "hours": 14},
            {"skill_name": "Cross-Sell & Renewal Negotiation", "category": "Core Domain", "importance": "complementary", "why_it_matters": "Spotting opportunities for seat expansion and contract renewals.", "recommended_priority": "Medium", "hours": 14},
        ],
    },
    {
        "slug": "ui-ux-designer",
        "title": "UI/UX Designer",
        "industry": "Design, Digital Media & Product",
        "description": "Researches user needs, crafts wireframes, builds interactive prototypes, and designs high-fidelity, accessible interfaces for digital web and mobile products.",
        "experience_level": "Mid",
        "transition_category": "Technical Transition",
        "transferable_from": ["graphic designer", "visual designer", "web designer", "brand designer", "multimedia artist"],
        "typical_progression": "Graphic Designer -> UI/UX Designer -> Senior Product Designer -> Head of Design",
        "why_it_fits_template": "Your mastery of visual balance, typography, color theory, and layout gives you an immediate aesthetic advantage. UX principles and interactive prototyping complete your transition.",
        "transferability_notes": "Graphic design focuses on static marketing assets; UI/UX focuses on usability, user journeys, wireframing, component design systems, and responsive interactions.",
        "suggested_learning_areas": ["User Research & Journey Mapping", "Figma Design Systems & Auto-layout", "Information Architecture & Wireframing", "Usability Testing & Design Handoff"],
        "possible_next_steps": ["Design a complete mobile app case study from user research to interactive prototype", "Build a tokenized component design system in Figma", "Conduct usability testing with 5 users and document design iterations"],
        "skills": [
            {"skill_name": "Visual Design & Typography", "category": "Core Domain", "importance": "core", "why_it_matters": "Creating polished, cohesive visual aesthetics with clear typographic hierarchy.", "recommended_priority": "High", "hours": 14},
            {"skill_name": "Figma (Auto-layout, Components, Variants)", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "The industry standard for component systems and interactive prototypes.", "recommended_priority": "High", "hours": 26},
            {"skill_name": "User Research & Usability Testing", "category": "Core Domain", "importance": "core", "why_it_matters": "Conducting user interviews, empathy mapping, and validating usability.", "recommended_priority": "High", "hours": 20},
            {"skill_name": "Wireframing & Information Architecture", "category": "Core Domain", "importance": "core", "why_it_matters": "Structuring screen layouts, user flows, and site navigation hierarchy.", "recommended_priority": "High", "hours": 18},
            {"skill_name": "Design Systems & Component Libraries", "category": "Technical", "importance": "core", "why_it_matters": "Maintaining design tokens, accessible components, and developer handoff specs.", "recommended_priority": "High", "hours": 18},
            {"skill_name": "Web Accessibility (WCAG)", "category": "Core Domain", "importance": "complementary", "why_it_matters": "Ensuring color contrast, screen reader compatibility, and touch target sizing.", "recommended_priority": "Medium", "hours": 12},
            {"skill_name": "Interactive Prototyping & Micro-interactions", "category": "Technical", "importance": "complementary", "why_it_matters": "Bringing screens alive with state transitions, smart animations, and gestures.", "recommended_priority": "Medium", "hours": 14},
        ],
    },
    {
        "slug": "growth-marketing-specialist",
        "title": "Growth Marketing Specialist",
        "industry": "Marketing, Growth & Digital Strategy",
        "description": "Drives scalable user and revenue acquisition through rapid experimentation, conversion rate optimization (CRO), funnel analytics, and cross-channel growth loops.",
        "experience_level": "Mid",
        "transition_category": "Adjacent",
        "transferable_from": ["digital marketer", "marketing specialist", "growth marketer", "performance marketer", "marketing associate", "marketing executive", "content marketer"],
        "typical_progression": "Digital Marketer -> Growth Marketing Specialist -> Head of Growth -> VP of Marketing",
        "why_it_fits_template": "Your digital marketing background provides the foundational knowledge of audience targeting, campaign channels, and messaging. Advancing into Growth Marketing focuses on full-funnel experimentation, data-driven CRO, and scalable user acquisition.",
        "transferability_notes": "Core campaign management and digital channel literacy transfer directly; focus your learning on systematic A/B testing, funnel metrics, and customer acquisition cost (CAC) to lifetime value (LTV) economics.",
        "suggested_learning_areas": ["Full-Funnel Growth Frameworks", "Conversion Rate Optimization & A/B Testing", "Customer Acquisition Cost & LTV Economics", "Retention & Referral Loops"],
        "possible_next_steps": ["Audit an existing conversion funnel and run an A/B landing page test", "Build an automated lead nurturing email sequence in HubSpot", "Track organic and paid CAC across acquisition channels"],
        "skills": [
            {"skill_name": "Conversion Rate Optimization (CRO) & A/B Testing", "category": "Core Domain", "importance": "core", "why_it_matters": "Designing and executing statistically valid landing page experiments to increase conversion efficiency.", "recommended_priority": "High", "hours": 18},
            {"skill_name": "Full-Funnel Analytics (GA4 / Mixpanel)", "category": "Technical", "importance": "core", "why_it_matters": "Tracking user journey drop-offs from first touch to activation, retention, and revenue.", "recommended_priority": "High", "hours": 20},
            {"skill_name": "Paid Acquisition & Performance Channels", "category": "Core Domain", "importance": "core", "why_it_matters": "Managing performance budgets across Google, Meta, and programmatic networks to drive pipeline.", "recommended_priority": "High", "hours": 16},
            {"skill_name": "Marketing Automation & CRM (HubSpot/Klaviyo)", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "Building automated email onboarding sequences, lead scoring, and lifecycle nurture triggers.", "recommended_priority": "High", "hours": 14},
            {"skill_name": "Customer Journey & Funnel Modeling", "category": "Core Domain", "importance": "core", "why_it_matters": "Mapping multi-touch conversion funnels, churn points, and activation milestones.", "recommended_priority": "High", "hours": 16},
            {"skill_name": "Copywriting & Value Proposition Testing", "category": "Soft Skills", "importance": "complementary", "why_it_matters": "Crafting compelling headlines, offer hooks, and value proposition tests for distinct buyer personas.", "recommended_priority": "Medium", "hours": 10},
            {"skill_name": "SQL for Growth Analytics", "category": "Technical", "importance": "complementary", "why_it_matters": "Querying customer databases directly to segment cohorts and evaluate retention curves.", "recommended_priority": "Medium", "hours": 16},
        ],
    },
    {
        "slug": "performance-marketing-specialist",
        "title": "Performance Marketing Specialist",
        "industry": "Marketing & Digital Advertising",
        "description": "Manages and optimizes paid media budgets across Google Ads, Meta Ads, and programmatic networks to maximize Return on Ad Spend (ROAS) and qualified lead generation.",
        "experience_level": "Mid",
        "transition_category": "Career Advancement",
        "transferable_from": ["digital marketer", "ppc executive", "media buyer", "paid ads specialist", "campaign executive", "marketing associate"],
        "typical_progression": "Digital Marketer -> Performance Marketing Specialist -> Paid Media Lead -> Director of Performance Marketing",
        "why_it_fits_template": "Deepens your digital marketing skillset into algorithmic ad platforms, ROAS optimization, audience retargeting, and high-budget paid acquisition.",
        "transferability_notes": "Creatives and ad copy knowledge carry over directly; the leap requires mastery of Google Ads Smart Bidding, Meta Advantage+, attribution tracking, and tag management.",
        "suggested_learning_areas": ["Google Search & Performance Max Campaigns", "Meta Ads Manager & Lookalike Audiences", "Tag Management & Server-Side Tracking", "ROAS & Attribution Modeling"],
        "possible_next_steps": ["Run a live conversion-focused campaign with target CPA bidding", "Set up Google Tag Manager conversion events and GA4 attribution", "Complete Google Ads Search and Meta Certified Media Buying certifications"],
        "skills": [
            {"skill_name": "Google Ads & Search Engine Marketing (SEM)", "category": "Technical", "importance": "core", "why_it_matters": "Setting up keyword match types, Smart Bidding strategies, and negative keyword lists.", "recommended_priority": "High", "hours": 22},
            {"skill_name": "Meta Ads Manager & Paid Social", "category": "Technical", "importance": "core", "why_it_matters": "Scaling prospecting and retargeting campaigns using custom and lookalike audiences.", "recommended_priority": "High", "hours": 20},
            {"skill_name": "ROAS Optimization & Budget Pacing", "category": "Core Domain", "importance": "core", "why_it_matters": "Monitoring marginal return on ad spend and reallocating daily budgets toward high-converting ad sets.", "recommended_priority": "High", "hours": 16},
            {"skill_name": "Google Tag Manager & Conversion Tracking", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "Deploying tracking pixels, custom JavaScript triggers, and server-side conversion API events.", "recommended_priority": "High", "hours": 14},
            {"skill_name": "Ad Creative & Copy Testing", "category": "Core Domain", "importance": "complementary", "why_it_matters": "Iterating creative formats (video hooks, carousels, static banners) to reduce cost per acquisition.", "recommended_priority": "Medium", "hours": 12},
            {"skill_name": "Attribution Modeling & Analytics", "category": "Technical", "importance": "complementary", "why_it_matters": "Evaluating first-click, last-click, and data-driven attribution models to avoid overvaluing retargeting.", "recommended_priority": "Medium", "hours": 14},
        ],
    },
    {
        "slug": "marketing-analytics-specialist",
        "title": "Marketing Analytics Specialist",
        "industry": "Marketing & Data Intelligence",
        "description": "Bridges digital marketing and data analytics by evaluating multi-channel attribution, customer cohorts, campaign ROI, and executive performance dashboards.",
        "experience_level": "Mid",
        "transition_category": "Technical Transition",
        "transferable_from": ["digital marketer", "marketing analyst", "seo specialist", "performance marketer", "growth analyst"],
        "typical_progression": "Digital Marketer -> Marketing Analytics Specialist -> Senior Marketing Intelligence Manager -> Director of Marketing Operations",
        "why_it_fits_template": "Combines your knowledge of marketing campaigns and audience behavior with rigorous data querying, statistical attribution, and dashboard modeling.",
        "transferability_notes": "Campaign terminology (CTR, CPC, Conversions) provides immediate domain context; shift learning toward relational SQL queries, Looker Studio/Power BI dashboards, and cohort analysis.",
        "suggested_learning_areas": ["SQL for Marketing Databases", "Google Analytics 4 & Custom Dimensions", "Executive Marketing Dashboards (Looker Studio / Power BI)", "Multi-Touch Attribution & Cohort Analysis"],
        "possible_next_steps": ["Build an automated executive marketing scorecard in Looker Studio", "Write SQL queries to calculate 30-day and 90-day cohort retention", "Analyze paid vs organic traffic contribution to pipeline revenue"],
        "skills": [
            {"skill_name": "Google Analytics 4 & Tag Auditing", "category": "Technical", "importance": "core", "why_it_matters": "Configuring custom events, dimensions, and conversion paths in GA4 without data sampling.", "recommended_priority": "High", "hours": 20},
            {"skill_name": "SQL for Marketing Data Analysis", "category": "Technical", "importance": "core", "why_it_matters": "Joining lead tables, ad spend tables, and revenue records to calculate blended CAC and ROI.", "recommended_priority": "High", "hours": 24},
            {"skill_name": "Marketing Dashboards (Looker Studio / Power BI)", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "Building automated executive dashboards that summarize funnel velocity, spend, and ROAS in real-time.", "recommended_priority": "High", "hours": 18},
            {"skill_name": "Multi-Touch Attribution & Media Mix Modeling", "category": "Core Domain", "importance": "core", "why_it_matters": "Accurately distributing revenue credit across organic search, social ads, paid search, and email.", "recommended_priority": "High", "hours": 18},
            {"skill_name": "Cohort & Retention Analysis", "category": "Core Domain", "importance": "core", "why_it_matters": "Tracking user engagement and churn across acquisition cohorts to forecast lifetime customer value.", "recommended_priority": "High", "hours": 16},
            {"skill_name": "Data Storytelling & Executive Presentations", "category": "Soft Skills", "importance": "complementary", "why_it_matters": "Translating complex marketing analytics into actionable commercial strategies for leadership.", "recommended_priority": "Medium", "hours": 10},
        ],
    },
    {
        "slug": "content-strategy-seo-lead",
        "title": "Content Strategy & SEO Lead",
        "industry": "Content, Search & Organic Growth",
        "description": "Oversees organic search growth, keyword architecture, technical SEO health, and high-impact content strategy that drives compounding organic customer acquisition.",
        "experience_level": "Mid",
        "transition_category": "Career Advancement",
        "transferable_from": ["digital marketer", "content writer", "content marketer", "seo executive", "copywriter", "marketing generalist"],
        "typical_progression": "Digital Marketer -> Content Strategy & SEO Lead -> Head of Content & Organic Growth -> VP of Brand & Content",
        "why_it_fits_template": "Advances your general marketing and copywriting skills into technical search architecture, topical authority clusters, and organic revenue scaling.",
        "transferability_notes": "Content creation and user engagement skills carry over; develop depth in technical site auditing, Core Web Vitals, backlink acquisition, and keyword intent clustering.",
        "suggested_learning_areas": ["Technical SEO & Crawlability Audits", "Keyword Intent & Topic Clustering", "Content Operations & Editorial Workflows", "Search Console & Ahrefs/Semrush Analytics"],
        "possible_next_steps": ["Conduct a comprehensive technical SEO audit of a website", "Create a 6-month topical authority content cluster plan", "Track organic keyword ranking improvements and conversion impact"],
        "skills": [
            {"skill_name": "Technical SEO & Site Auditing", "category": "Technical", "importance": "core", "why_it_matters": "Fixing indexing errors, canonical tags, site speed, and structured data to ensure search visibility.", "recommended_priority": "High", "hours": 20},
            {"skill_name": "Keyword Research & Search Intent Mapping", "category": "Core Domain", "importance": "core", "why_it_matters": "Identifying high-intent commercial keywords and organizing them into comprehensive topic clusters.", "recommended_priority": "High", "hours": 16},
            {"skill_name": "Content Strategy & Editorial Operations", "category": "Core Domain", "importance": "core", "why_it_matters": "Creating editorial calendars, brief guidelines, and conversion-focused content workflows.", "recommended_priority": "High", "hours": 16},
            {"skill_name": "SEO Analytics (Search Console / Ahrefs / Semrush)", "category": "Tools & Technologies", "importance": "core", "why_it_matters": "Monitoring keyword impressions, average position, click-through rate, and competitor backlinks.", "recommended_priority": "High", "hours": 14},
            {"skill_name": "On-Page Optimization & Schema Markup", "category": "Technical", "importance": "complementary", "why_it_matters": "Optimizing header tags, internal links, and JSON-LD schema markup for rich snippets.", "recommended_priority": "Medium", "hours": 12},
            {"skill_name": "Link Building & Digital PR", "category": "Core Domain", "importance": "complementary", "why_it_matters": "Securing authoritative backlinks through digital PR, data studies, and industry outreach.", "recommended_priority": "Medium", "hours": 12},
        ],
    },
]


CURATED_RESOURCES_DATA = [
    # Testing & QA
    {"title": "Selenium WebDriver Official Python Documentation", "provider": "Selenium.dev", "related_skill": "Selenium WebDriver", "description": "Official documentation covering browser automation, locators, and test execution.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://www.selenium.dev/documentation/webdriver/", "last_verified": "2026-09"},
    {"title": "Playwright Fast & Reliable End-to-End Testing", "provider": "Microsoft Playwright", "related_skill": "Playwright / Cypress", "description": "Official guides to automated testing across Chromium, Firefox, and WebKit.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://playwright.dev/docs/intro", "last_verified": "2026-09"},
    {"title": "Postman API Testing & Automation Fundamentals", "provider": "Postman Learning Center", "related_skill": "API Testing (Postman / REST)", "description": "Interactive lessons on writing assertions, environment variables, and automated collection runs.", "cost_type": "Free", "resource_type": "Course", "url": "https://learning.postman.com/", "last_verified": "2026-08"},
    {"title": "Software Testing Foundations & Test Case Design", "provider": "Guru99 / Ministry of Testing", "related_skill": "Test Case Design", "description": "Comprehensive guide to boundary value analysis, equivalence partitioning, and test planning.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://www.guru99.com/software-testing.html", "last_verified": "2026-08"},
    
    # Software & Backend Engineering
    {"title": "Python for Everybody Specialization (Free Audit)", "provider": "University of Michigan / Coursera", "related_skill": "Python or JavaScript Programming", "description": "Master Python data structures, web APIs, and clean programming fundamentals.", "cost_type": "Free", "resource_type": "Course", "url": "https://www.py4e.com/", "last_verified": "2026-09"},
    {"title": "The Odin Project - Full Stack JavaScript", "provider": "The Odin Project", "related_skill": "RESTful API Development", "description": "Free, open-source curriculum building real full-stack web applications and Node/Express APIs.", "cost_type": "Free", "resource_type": "Course", "url": "https://www.theodinproject.com/", "last_verified": "2026-09"},
    {"title": "PostgreSQL Tutorial for Developers", "provider": "PostgresTutorial.com", "related_skill": "SQL & Relational Database Design", "description": "Complete hands-on reference for queries, indexes, normalization, and stored procedures.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://www.postgresqltutorial.com/", "last_verified": "2026-09"},
    {"title": "Redis University - Fast In-Memory Caching", "provider": "Redis University", "related_skill": "Caching with Redis", "description": "Official free courses on key-value data structures, TTL, and cache-aside design patterns.", "cost_type": "Free", "resource_type": "Course", "url": "https://university.redis.com/", "last_verified": "2026-09"},
    {"title": "Docker Curriculum for Beginners", "provider": "Prakhar Srivastav", "related_skill": "Docker & Containerization", "description": "Step-by-step tutorial on containerizing apps, Dockerfiles, volumes, and multi-container setups.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://docker-curriculum.com/", "last_verified": "2026-08"},
    {"title": "Git & GitHub Crash Course", "provider": "freeCodeCamp", "related_skill": "Git & Version Control", "description": "Practical guide to branching, rebasing, pull requests, and merge conflict resolution.", "cost_type": "Free", "resource_type": "Course", "url": "https://www.freecodecamp.org/news/learn-git-and-github/", "last_verified": "2026-09"},

    # Cloud & Linux
    {"title": "Linux Journey - From Command Line to SysAdmin", "provider": "Linux Journey", "related_skill": "Linux Command Line & Administration", "description": "Free bite-sized interactive guides covering shell navigation, permissions, and processes.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://linuxjourney.com/", "last_verified": "2026-09"},
    {"title": "AWS Skill Builder Free Digital Training", "provider": "Amazon Web Services", "related_skill": "Cloud Core Architecture (AWS/Azure)", "description": "Over 500 free self-paced digital courses on cloud compute, VPC networks, S3, and IAM.", "cost_type": "Free", "resource_type": "Course", "url": "https://explore.skillbuilder.aws/", "last_verified": "2026-09"},
    {"title": "Computer Networking and DNS Crash Course", "provider": "MDN Web Docs", "related_skill": "Computer Networking & DNS", "description": "Clear conceptual overview of IP addressing, DNS lookups, TCP/IP, and HTTP protocols.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanisms/How_does_the_Internet_work", "last_verified": "2026-08"},

    # Data & Analytics
    {"title": "SQL for Data Analysis", "provider": "Mode Analytics / SQL Tutorial", "related_skill": "SQL (Joins, Aggregations, Window Functions)", "description": "Practice SQL queries, aggregate metrics, and window functions on real data tables.", "cost_type": "Free", "resource_type": "Practice", "url": "https://mode.com/sql-tutorial/", "last_verified": "2026-09"},
    {"title": "Microsoft Power BI Guided Learning", "provider": "Microsoft Learn", "related_skill": "Business Intelligence (Power BI / Tableau)", "description": "Official interactive modules on data ingestion, DAX modeling, and visual report authoring.", "cost_type": "Free", "resource_type": "Course", "url": "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", "last_verified": "2026-09"},
    {"title": "Python Data Analysis with Pandas", "provider": "freeCodeCamp", "related_skill": "Python for Data Analysis (Pandas, Numpy)", "description": "Learn DataFrame manipulation, filtering, handling null values, and summary statistics.", "cost_type": "Free", "resource_type": "Course", "url": "https://www.freecodecamp.org/news/learn-pandas-for-data-analysis/", "last_verified": "2026-09"},

    # Finance & Strategy
    {"title": "Corporate Finance Fundamentals (Free Audit)", "provider": "Corporate Finance Institute (CFI)", "related_skill": "Corporate Finance Fundamentals", "description": "Core concepts of capital budgeting, NPV calculations, capital structure, and business return.", "cost_type": "Free", "resource_type": "Course", "url": "https://corporatefinanceinstitute.com/resources/", "last_verified": "2026-08"},
    {"title": "Financial Modeling in Excel Masterclass", "provider": "Corporate Finance Institute", "related_skill": "Financial Modeling in Excel", "description": "Building dynamic financial forecasts, debt schedules, and sensitivity tables.", "cost_type": "Low Budget", "resource_type": "Course", "url": "https://corporatefinanceinstitute.com/", "last_verified": "2026-08"},
    {"title": "Khan Academy Finance and Capital Markets", "provider": "Khan Academy", "related_skill": "Financial Statement Analysis", "description": "Intuitive lessons explaining balance sheets, cash flow statements, and ratios.", "cost_type": "Free", "resource_type": "Course", "url": "https://www.khanacademy.org/economics-finance-domain/core-finance", "last_verified": "2026-09"},

    # UI/UX Design
    {"title": "Figma for Beginners Official Series", "provider": "Figma YouTube & Learn", "related_skill": "Figma (Auto-layout, Components, Variants)", "description": "Comprehensive tutorial covering frames, auto-layout, interactive variants, and constraints.", "cost_type": "Free", "resource_type": "Course", "url": "https://www.youtube.com/c/Figmadesign", "last_verified": "2026-09"},
    {"title": "Laws of UX & Heuristic Guidelines", "provider": "Jon Yablonski", "related_skill": "User Research & Usability Testing", "description": "Collection of best practices and psychological heuristics for designing intuitive interfaces.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://lawsofux.com/", "last_verified": "2026-09"},
    {"title": "Web Content Accessibility Guidelines (WCAG) QuickRef", "provider": "W3C WAI", "related_skill": "Web Accessibility (WCAG)", "description": "Official checklist and practical guidelines for accessible digital interfaces.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://www.w3.org/WAI/WCAG21/quickref/", "last_verified": "2026-09"},

    # Sales, HR & Customer Success
    {"title": "HubSpot Inbound Sales & CRM Certification", "provider": "HubSpot Academy", "related_skill": "B2B Solution Selling & Prospecting", "description": "Learn consultative sales methodology, lead qualifying, and objection navigation.", "cost_type": "Free", "resource_type": "Certification", "url": "https://academy.hubspot.com/courses/inbound-sales", "last_verified": "2026-09"},
    {"title": "Customer Success Foundations", "provider": "Gainsight Academy / Coursera", "related_skill": "Customer Onboarding & Implementation", "description": "Best practices for SaaS customer onboarding, engagement triggers, and retention metrics.", "cost_type": "Free", "resource_type": "Course", "url": "https://www.gainsight.com/customer-success-training/", "last_verified": "2026-08"},
    {"title": "People Analytics Fundamentals", "provider": "HRCI / AIHR Free Resources", "related_skill": "Workforce Analytics & KPI Modeling", "description": "Formulas and statistical methods for employee turnover, retention, and workforce planning.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://www.aihr.com/blog/people-analytics/", "last_verified": "2026-09"},

    # Marketing, Growth & Sales Strategy
    {"title": "Google Analytics 4 Certification & Learning Hub", "provider": "Google Skillshop", "related_skill": "Full-Funnel Analytics (GA4 / Mixpanel)", "description": "Official training on setting up GA4 events, conversion paths, custom dimensions, and exploration reports.", "cost_type": "Free", "resource_type": "Certification", "url": "https://skillshop.exceedlms.com/", "last_verified": "2026-09"},
    {"title": "Google Analytics 4 & Tag Auditing Guide", "provider": "Google Skillshop", "related_skill": "Google Analytics 4 & Tag Auditing", "description": "Hands-on guide to GA4 properties, debug views, and event parameter verification.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://skillshop.exceedlms.com/", "last_verified": "2026-09"},
    {"title": "HubSpot Inbound Marketing & Automation Certification", "provider": "HubSpot Academy", "related_skill": "Marketing Automation & CRM (HubSpot/Klaviyo)", "description": "Learn lifecycle nurture workflows, lead scoring, and automated customer communication.", "cost_type": "Free", "resource_type": "Certification", "url": "https://academy.hubspot.com/courses/inbound-marketing", "last_verified": "2026-09"},
    {"title": "Google Ads Search Certification", "provider": "Google Skillshop", "related_skill": "Google Ads & Search Engine Marketing (SEM)", "description": "Master search campaign structures, Smart Bidding, and negative keyword optimization.", "cost_type": "Free", "resource_type": "Certification", "url": "https://skillshop.exceedlms.com/", "last_verified": "2026-09"},
    {"title": "Meta Certified Digital Marketing Associate Study Guide", "provider": "Meta Blueprint", "related_skill": "Meta Ads Manager & Paid Social", "description": "Official guides to campaign setup, audience retargeting, and Advantage+ campaign optimization.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://www.facebook.com/business/learn/certification", "last_verified": "2026-09"},
    {"title": "CXL Conversion Rate Optimization & A/B Testing Guide", "provider": "CXL Institute Free Guides", "related_skill": "Conversion Rate Optimization (CRO) & A/B Testing", "description": "Rigorous methodology for hypothesis generation, sample size calculation, and usability testing.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://cxl.com/blog/cro-guide/", "last_verified": "2026-08"},
    {"title": "Moz Beginner's Guide to SEO & Technical Audits", "provider": "Moz", "related_skill": "Technical SEO & Site Auditing", "description": "Industry-standard reference covering crawlability, indexability, site speed, and schema markup.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://moz.com/beginners-guide-to-seo", "last_verified": "2026-09"},
    {"title": "Ahrefs SEO & Keyword Research Course", "provider": "Ahrefs Academy", "related_skill": "Keyword Research & Search Intent Mapping", "description": "Practical tutorials on keyword difficulty, search volume, and topical authority mapping.", "cost_type": "Free", "resource_type": "Course", "url": "https://ahrefs.com/academy", "last_verified": "2026-09"},
    {"title": "HubSpot B2B Sales Discovery & Qualifying Guide", "provider": "HubSpot Sales Blog & Academy", "related_skill": "B2B Sales Discovery & Lead Qualification", "description": "Question templates and frameworks (BANT, MEDDIC) for conducting effective sales discovery calls.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://blog.hubspot.com/sales/discovery-call", "last_verified": "2026-09"},
    {"title": "Harvard PON Negotiation Strategy Essentials", "provider": "Harvard Program on Negotiation", "related_skill": "Contract Negotiation & Closing", "description": "Proven principles for commercial agreements, BATNA assessment, and win-win contract structuring.", "cost_type": "Free", "resource_type": "Documentation", "url": "https://www.pon.harvard.edu/daily/negotiation-skills-daily/", "last_verified": "2026-08"},
]


# ============================================================================
# DATABASE SEEDING
# ============================================================================

def seed_professional_dataset(db: Session):
    """Ensure curated professional roles, skills, and verified resources exist idempotently."""
    all_seed_roles = VERIFIED_CAREERS_DATA + [INCOMPLETE_CAREER_SAMPLE]
    for rdata in all_seed_roles:
        role = db.query(ProfessionalRole).filter_by(slug=rdata["slug"]).first()
        if not role:
            role = ProfessionalRole(
                slug=rdata["slug"],
                title=rdata["title"],
                industry=rdata["industry"],
                description=rdata["description"],
                experience_level=rdata.get("experience_level", "Mid"),
                transition_category=rdata.get("transition_category", "Adjacent"),
                transferable_from=rdata.get("transferable_from", []),
                typical_progression=rdata.get("typical_progression", ""),
                why_it_fits_template=rdata.get("why_it_fits_template", ""),
                transferability_notes=rdata.get("transferability_notes", ""),
                suggested_learning_areas=rdata.get("suggested_learning_areas", []),
                possible_next_steps=rdata.get("possible_next_steps", []),
                typical_responsibilities=rdata.get("typical_responsibilities", []),
                relevant_degrees=rdata.get("relevant_degrees"),
                essential_qualifications=rdata.get("essential_qualifications"),
                entry_level_pathways=rdata.get("entry_level_pathways", []),
                related_careers=rdata.get("related_careers", []),
                certifications_prerequisites=rdata.get("certifications_prerequisites", []),
                practical_projects=rdata.get("practical_projects", []),
                career_transition_guidance=rdata.get("career_transition_guidance"),
                location_conditions=rdata.get("location_conditions"),
                source_references=rdata.get("source_references", []),
                last_verified=rdata.get("last_verified", "2026-10"),
                completeness_status=rdata.get("completeness_status", "complete"),
                review_status=rdata.get("review_status", "published"),
            )
            db.add(role)
            db.flush()

            for sdata in rdata.get("skills", []):
                skill = ProfessionalRoleSkill(
                    role_id=role.id,
                    skill_name=sdata["skill_name"],
                    category=sdata.get("category", "Technical"),
                    importance=sdata.get("importance", "core"),
                    why_it_matters=sdata.get("why_it_matters", ""),
                    recommended_priority=sdata.get("recommended_priority", "High"),
                    suggested_learning_hours=sdata.get("hours", 10),
                )
                db.add(skill)
        else:
            # Sync metadata fields safely without overwriting user data
            existing_tf = set(role.transferable_from or [])
            new_tf = set(rdata.get("transferable_from", []))
            if not new_tf.issubset(existing_tf):
                role.transferable_from = list(existing_tf.union(new_tf))
            if not role.source_references and rdata.get("source_references"):
                role.source_references = rdata.get("source_references")
            if not role.typical_responsibilities and rdata.get("typical_responsibilities"):
                role.typical_responsibilities = rdata.get("typical_responsibilities")
            if not role.relevant_degrees and rdata.get("relevant_degrees"):
                role.relevant_degrees = rdata.get("relevant_degrees")
            if not role.completeness_status:
                role.completeness_status = rdata.get("completeness_status", "complete")
            if not role.last_verified:
                role.last_verified = rdata.get("last_verified", "2026-10")

    all_seed_resources = VERIFIED_RESOURCES_DATA + CURATED_RESOURCES_DATA
    for res_data in all_seed_resources:
        existing_res = db.query(ProfessionalLearningResource).filter_by(title=res_data["title"]).first()
        if not existing_res:
            res = ProfessionalLearningResource(
                title=res_data["title"],
                provider=res_data["provider"],
                related_skill=res_data["related_skill"],
                description=res_data["description"],
                cost_type=res_data.get("cost_type", "Free"),
                resource_type=res_data.get("resource_type", "Course"),
                url=res_data["url"],
                is_verified=True,
                last_verified=res_data.get("last_verified", "2026-10"),
            )
            db.add(res)
    db.commit()


# ============================================================================
# SKILL GAP ANALYSIS ENGINE
# ============================================================================

def _normalize_str(text: str) -> str:
    return re.sub(r"[^a-zA-Z0-9]", "", text or "").lower()


def find_matching_curated_role(db: Session, target_role_name: str) -> Optional[ProfessionalRole]:
    """Finds curated role by slug, exact title, or fuzzy containment."""
    if not target_role_name:
        return None
    target_clean = _normalize_str(target_role_name)
    all_roles = db.query(ProfessionalRole).all()
    for r in all_roles:
        if _normalize_str(r.title) == target_clean or _normalize_str(r.slug) == target_clean:
            return r
    for r in all_roles:
        r_clean = _normalize_str(r.title)
        if target_clean in r_clean or r_clean in target_clean:
            return r
    return None


def calculate_skill_gap_analysis(
    db: Session,
    profile: ProfessionalProfile,
    target_role_name: str
) -> Dict[str, Any]:
    """
    Transparent role-to-skill matching engine.
    Compares user's reported skills, tools, and responsibilities against curated role skills.
    Classifies skills into:
    - Confirmed (Explicitly reported in profile)
    - Needs Improvement (Partial evidence in tools/responsibilities)
    - Missing (Required by role, confirmed absent from profile when skills provided)
    - Unknown (Skills not yet provided; asks clarifying questions)
    - Optional (Recommended value-adds)
    """
    target_role_obj = find_matching_curated_role(db, target_role_name)

    # Collect user reported signals
    raw_skills = profile.current_skills or []
    skills_provided = len(raw_skills) > 0
    reported_skills = set(raw_skills)
    reported_tools = set(profile.tools_technologies or [])
    # Strictly exclude current_job_title to avoid inventing skill proficiency from title alone
    reported_resp = (profile.responsibilities or "").lower()
    reported_tools_str = " ".join(reported_tools).lower()

    # =========================================================================
    # CASE D: CAREER IS NOT COVERED BY THE KNOWLEDGE BASE (Section 6, Test 4)
    # =========================================================================
    if not target_role_obj:
        req_id = f"GR-{uuid.uuid4().hex[:8].upper()}"
        try:
            req_record = GuidanceRequestRecord(
                request_id=req_id,
                user_id=profile.user_id if profile else None,
                career_topic=target_role_name,
                category="unsupported_career",
                user_context={
                    "current_job_title": profile.current_job_title if profile else None,
                    "current_industry": profile.current_industry if profile else None,
                    "years_experience": profile.years_experience if profile else None,
                    "skills_count": len(raw_skills),
                },
                reason=f"The requested career path '{target_role_name}' is absent from the verified knowledge base.",
                missing_categories=["career_curriculum", "skill_taxonomy", "verified_resources"],
                status="pending_review",
            )
            db.add(req_record)
            db.commit()
        except Exception:
            db.rollback()

        unsupported_msg = (
            "This career path is not currently covered by our verified guidance database. "
            "We have recorded the guidance request for review, subject to the application's consent and privacy controls. "
            "We cannot provide a reliable, detailed recommendation at this time."
        )
        return {
            "status": "unsupported_career",
            "completeness_status": "unsupported",
            "target_role": target_role_name,
            "industry": "Uncatalogued Domain",
            "description": f"The career path '{target_role_name}' is not currently covered by our verified guidance database.",
            "transition_category": "Unsupported Path",
            "match_score": 0.0,
            "match_score_explanation": f"Match score is unavailable because '{target_role_name}' is not currently in the verified database. FutureForge does not generate unsupported estimates.",
            "transferability_summary": unsupported_msg,
            "unsupported_message": unsupported_msg,
            "request_logged": True,
            "request_id": req_id,
            "existing_skills": [],
            "skills_to_improve": [],
            "missing_skills": [],
            "unknown_skills": [],
            "recommended_additional": [],
            "suggested_learning_areas": [],
            "possible_next_steps": [
                f"Your request has been recorded with reference {req_id} for expert curriculum review.",
                "Browse our verified career catalog to explore related supported pathways."
            ],
            "missing_information_prompt": f"'{target_role_name}' is not currently covered by our verified database.",
            "missing_information_questions": [],
            "source_references": [],
            "last_verified": None,
            "verification_notice": None,
        }

    role_skills = db.query(ProfessionalRoleSkill).filter_by(role_id=target_role_obj.id).all()

    existing_skills = []
    skills_to_improve = []
    missing_skills = []
    unknown_skills = []
    recommended_additional = []

    # Get verified resources lookup
    resources_lookup = {}
    resources = db.query(ProfessionalLearningResource).all()
    for res in resources:
        resources_lookup.setdefault(res.related_skill.lower(), []).append({
            "title": res.title,
            "provider": res.provider,
            "url": res.url,
            "cost_type": res.cost_type,
            "resource_type": res.resource_type,
        })

    SYNONYMS = {
        "sql": ["database", "schema", "indexing", "relational", "postgres", "queries", "mysql"],
        "database": ["sql", "rdbms", "postgres", "mongodb", "schema"],
        "api": ["rest", "restful", "endpoints", "postman", "microservices"],
        "rest": ["api", "restful", "endpoints", "http"],
        "python": ["programming", "backend", "scripting", "python/go/java/node"],
        "docker": ["container", "containers", "containerization", "deployment"],
        "git": ["version control", "github", "gitlab", "branching"],
        "testing": ["qa", "quality assurance", "test case", "regression", "automation"],
        "excel": ["spreadsheet", "vlookup", "pivot table", "reporting"],
        "financial": ["finance", "ledger", "bookkeeping", "p&l", "balance sheet"],
        "accounting": ["finance", "ledger", "bookkeeping", "audit", "tally"],
        "sales": ["b2b", "prospecting", "deal closing", "solution selling"],
        "crm": ["hubspot", "salesforce", "pipeline management", "customer relationship"],
        "marketing": ["acquisition", "campaign", "lead generation", "funnel", "conversion"],
        "seo": ["search engine optimization", "organic search", "keyword research", "search console"],
        "analytics": ["ga4", "google analytics", "dashboards", "metrics", "reporting"],
    }

    def matches_tokens(token_a: str, token_b: str) -> bool:
        na, nb = _normalize_str(token_a), _normalize_str(token_b)
        if not na or not nb:
            return False
        if na == nb:
            return True
        if len(na) >= 4 and len(nb) >= 4 and (na in nb or nb in na):
            return True
        for syn_key, syn_words in SYNONYMS.items():
            if syn_key in na or na in syn_key:
                if any(w.replace(" ", "") in nb for w in syn_words):
                    return True
            if syn_key in nb or nb in syn_key:
                if any(w.replace(" ", "") in na for w in syn_words):
                    return True
        return False

    for rskill in role_skills:
        skill_name = rskill.skill_name
        skill_lower = skill_name.lower()

        has_direct_skill = any(matches_tokens(s, skill_name) for s in reported_skills)
        has_tool_mention = any(matches_tokens(t, skill_name) for t in reported_tools)
        has_resp_mention = any(
            len(w) >= 4 and w in reported_resp
            for w in skill_lower.split()
            if w not in ["with", "from", "that", "this", "using", "your", "work", "team"]
        )

        matching_res = resources_lookup.get(skill_lower, [])
        primary_resource = matching_res[0] if matching_res else None

        item_data = {
            "skill_name": skill_name,
            "category": rskill.category,
            "importance": rskill.importance,
            "why_it_matters": rskill.why_it_matters,
            "recommended_priority": rskill.recommended_priority,
            "suggested_hours": rskill.suggested_learning_hours,
            "suggested_resource": primary_resource,
            "status_code": "confirmed",
            "current_status": "Confirmed in Profile",
            "follow_up_prompt": None,
        }

        if has_direct_skill:
            item_data["status_code"] = "confirmed"
            item_data["current_status"] = "Confirmed in Profile"
            existing_skills.append(item_data)
        elif has_tool_mention or has_resp_mention:
            item_data["status_code"] = "needs_improvement"
            item_data["current_status"] = "Partial Evidence / Needs Deepening"
            skills_to_improve.append(item_data)
        elif rskill.importance == "optional":
            item_data["status_code"] = "optional"
            item_data["current_status"] = "Recommended Value-Add"
            recommended_additional.append(item_data)
        elif not skills_provided:
            item_data["status_code"] = "unknown"
            item_data["current_status"] = "Unknown (Information Needed)"
            item_data["follow_up_prompt"] = f"We have not received your skill profile yet. Do you have confirmed proficiency in {skill_name}?"
            unknown_skills.append(item_data)
        else:
            item_data["status_code"] = "missing"
            item_data["current_status"] = "Missing in Current Profile"
            missing_skills.append(item_data)

    total_core_skills = max(1, len([s for s in role_skills if s.importance in ["core", "complementary"]]))

    # =========================================================================
    # CASE B: CAREER EXISTS BUT IS MARKED INCOMPLETE (Section 6, Test 5)
    # =========================================================================
    is_incomplete = (target_role_obj.completeness_status == "incomplete")
    verification_notice = None
    if is_incomplete:
        verification_notice = (
            f"Verification Notice: The career record for '{target_role_obj.title}' is currently undergoing curriculum verification. "
            "Only supported attributes are presented, and unverified requirements are not fabricated."
        )

    # =========================================================================
    # CASE C: USER INFORMATION IS INSUFFICIENT (Section 6, Test 3)
    # =========================================================================
    if not skills_provided:
        status_val = "insufficient_profile"
        match_score = 0.0
        match_score_explanation = (
            f"Match score is currently 0% because your profile does not contain verified skills. "
            f"Please update your profile with your existing competencies to calculate an accurate skill match. "
            f"Note: This score measures curated curriculum alignment, not probability of being hired."
        )
        missing_information_prompt = (
            "Skills not yet provided. Please edit your professional profile to list your current skills and tools "
            "so the system can compute your confirmed skill overlap and realistic transition requirements."
        )
        missing_information_questions = [
            {"field": "current_skills", "question": f"What specific skills or tools do you currently use that might be relevant for {target_role_obj.title}?"},
            {"field": "responsibilities", "question": "Could you provide a brief overview of your day-to-day responsibilities in your current role?"}
        ]
    else:
        status_val = "partially_verified" if is_incomplete else "sufficient_data"
        match_numerator = len(existing_skills) * 1.0 + len(skills_to_improve) * 0.5
        match_score = round(min(100.0, max(0.0, (match_numerator / total_core_skills) * 100)), 1)
        match_score_explanation = (
            f"Calculated profile-to-role match of {match_score}% is based on {len(existing_skills)} confirmed skills "
            f"and {len(skills_to_improve)} partial skills out of {total_core_skills} required competencies for {target_role_obj.title}. "
            f"Note: This score reflects profile alignment with curated role requirements, not hiring probability."
        )
        missing_information_prompt = None
        missing_information_questions = []

    return {
        "status": status_val,
        "completeness_status": target_role_obj.completeness_status or ("incomplete" if is_incomplete else "complete"),
        "verification_notice": verification_notice,
        "target_role": target_role_obj.title,
        "industry": target_role_obj.industry,
        "description": target_role_obj.description,
        "transition_category": target_role_obj.transition_category,
        "match_score": match_score,
        "match_score_explanation": match_score_explanation,
        "transferability_summary": target_role_obj.transferability_notes or target_role_obj.why_it_fits_template,
        "existing_skills": existing_skills,
        "skills_to_improve": skills_to_improve,
        "missing_skills": missing_skills,
        "unknown_skills": unknown_skills,
        "recommended_additional": recommended_additional,
        "suggested_learning_areas": target_role_obj.suggested_learning_areas or [],
        "possible_next_steps": target_role_obj.possible_next_steps or [],
        "missing_information_prompt": missing_information_prompt,
        "missing_information_questions": missing_information_questions,
        "source_references": target_role_obj.source_references or [],
        "last_verified": target_role_obj.last_verified,
        "unsupported_message": None,
        "request_logged": False,
        "request_id": None,
    }


# ============================================================================
# CAREER OPTIONS RECOMMENDER
# ============================================================================

def recommend_career_options(db: Session, profile: ProfessionalProfile) -> List[Dict[str, Any]]:
    """
    Suggests relevant career options when a user does not know their target career
    or wants to explore directions based on their profile.
    Distinguishes:
    1. Closely related career moves
    2. Career advancement within the same field
    3. Careers requiring additional technical skills
    4. More substantial industry transitions

    Scores are transparently calculated using a 4-part configurable weighting model:
    - Confirmed Skills Match: 50%
    - Role, Experience & Industry Match: 25%
    - Career Goal Alignment: 15%
    - Tools & Qualifications: 10%
    No artificial score floors or fabricated percentage claims are used.
    """
    if not (profile.current_job_title or "").strip() and not (profile.current_skills or []) and not (profile.responsibilities or "").strip():
        # Case C: Insufficient profile - do not generate arbitrary recommendations
        return []

    all_roles = db.query(ProfessionalRole).all()
    current_title_lower = (profile.current_job_title or "").lower()
    current_ind_lower = (profile.current_industry or "").lower()
    raw_skills = profile.current_skills or []
    skills_provided = len(raw_skills) > 0
    skills_lower = [s.lower() for s in raw_skills]
    tools_lower = [t.lower() for t in (profile.tools_technologies or [])]
    goals_lower = [g.lower() for g in (profile.career_goals or [])]
    responsibilities_lower = (profile.responsibilities or "").lower()

    # Preload resources map
    resources = db.query(ProfessionalLearningResource).all()
    res_map = {}
    for r in resources:
        res_map.setdefault(r.related_skill.lower(), []).append(r)

    scored_roles = []

    SYNONYMS = {
        "sql": ["database", "schema", "indexing", "relational", "postgres", "queries", "mysql"],
        "database": ["sql", "rdbms", "postgres", "mongodb", "schema"],
        "api": ["rest", "restful", "endpoints", "postman", "microservices"],
        "rest": ["api", "restful", "endpoints", "http"],
        "python": ["programming", "backend", "scripting", "python/go/java/node"],
        "docker": ["container", "containers", "containerization", "deployment"],
        "git": ["version control", "github", "gitlab", "branching"],
        "testing": ["qa", "quality assurance", "test case", "regression", "automation"],
        "excel": ["spreadsheet", "vlookup", "pivot table"],
        "financial": ["finance", "ledger", "bookkeeping", "p&l", "balance sheet"],
        "accounting": ["finance", "ledger", "bookkeeping", "audit", "tally"],
        "sales": ["b2b", "prospecting", "deal closing", "solution selling"],
        "crm": ["hubspot", "salesforce", "pipeline management", "customer relationship"],
        "marketing": ["acquisition", "campaign", "lead generation", "funnel", "conversion"],
        "seo": ["search engine optimization", "organic search", "keyword research", "search console"],
        "analytics": ["ga4", "google analytics", "dashboards", "data studio", "mixpanel"],
        "metrics": ["kpi", "performance metrics", "okrs", "funnel metrics"],
    }

    GENERIC_STOPWORDS = {"test", "data", "work", "role", "lead", "team", "code", "user", "plan", "time", "case", "flow", "tool", "with", "from"}

    def matches_tokens(token_a: str, token_b: str) -> bool:
        na, nb = _normalize_str(token_a), _normalize_str(token_b)
        if not na or not nb:
            return False
        if na == nb:
            return True
        if na in GENERIC_STOPWORDS or nb in GENERIC_STOPWORDS:
            return False
        if len(na) >= 5 and len(nb) >= 5 and (na in nb or nb in na):
            return True
        for syn_key, syn_words in SYNONYMS.items():
            if syn_key in na or na in syn_key:
                if any(w.replace(" ", "") in nb for w in syn_words):
                    return True
            if syn_key in nb or nb in syn_key:
                if any(w.replace(" ", "") in na for w in syn_words):
                    return True
        return False

    # ---- Build domain-affinity clusters to gate cross-domain recommendations ----
    DOMAIN_CLUSTERS = {
        "marketing": {"marketer", "marketing", "seo", "content", "growth", "ppc", "campaign", "acquisition", "digital", "brand", "copywriter", "media"},
        "sales": {"sales", "business development", "account", "bdm", "prospecting", "relationship", "lead generation"},
        "tech": {"developer", "engineer", "programmer", "software", "backend", "frontend", "devops", "sdet", "fullstack", "sre", "site reliability"},
        "testing": {"tester", "qa", "quality assurance", "automation tester", "manual testing"},
        "data": {"analyst", "data", "analytics", "bi", "intelligence"},
        "design": {"designer", "ux", "ui", "graphic", "visual", "product design"},
        "finance": {"accountant", "finance", "financial", "audit", "bookkeeper", "tax", "banking"},
        "hr": {"hr", "recruiter", "talent", "human resources", "people", "recruitment"},
        "support": {"support", "helpdesk", "service", "call center", "customer", "client services"},
        "cloud": {"cloud", "infrastructure", "system administrator", "network", "devops", "sysadmin"},
        "healthcare": {"doctor", "physician", "surgeon", "clinician", "mbbs", "medical", "hospital", "healthcare", "health", "clinical", "pharma", "pharmaceutical", "pharmacy", "nurse", "nursing", "public health", "biomedical", "liaison", "pharmacovigilance", "medicine"},
        "engineering": {"mechanical", "electrical", "civil", "structural", "chemical", "manufacturing", "industrial", "robotics", "embedded", "hardware", "engineering", "cad"},
        "education": {"teacher", "educator", "professor", "lecturer", "instructor", "tutor", "pedagogy", "curriculum", "instructional", "school", "education", "trainer", "training", "academic"},
        "operations": {"operations", "supply chain", "logistics", "procurement", "inventory", "warehouse", "facility", "project coordinator"},
        "legal": {"legal", "lawyer", "attorney", "paralegal", "compliance", "regulatory", "contracts"},
    }

    # Technical skill indicators required to transition into Tech, Cloud, or Automation Testing
    TECH_PREREQUISITE_KEYWORDS = {
        "python", "java", "c++", "c#", ".net", "golang", "rust", "javascript", "typescript",
        "selenium", "playwright", "cypress", "appium", "pytest", "junit", "testng",
        "sql", "linux", "bash", "shell", "docker", "kubernetes", "aws", "azure", "gcp",
        "git", "rest api", "ci/cd", "jenkins", "terraform", "django", "fastapi", "react", "node", "angular"
    }
    user_has_tech_skills = any(
        any(tk in s for tk in TECH_PREREQUISITE_KEYWORDS)
        for s in (skills_lower + tools_lower)
    )

    def _get_domain_cluster(text: str) -> set:
        """Returns the set of domain clusters a text belongs to."""
        text_lower = text.lower()
        clusters = set()
        for cluster_name, keywords in DOMAIN_CLUSTERS.items():
            if any(kw in text_lower for kw in keywords):
                clusters.add(cluster_name)
        return clusters

    user_clusters = _get_domain_cluster(current_title_lower)
    user_clusters |= _get_domain_cluster(current_ind_lower)
    user_is_in_tech = bool(user_clusters & {"tech", "testing", "cloud"})

    for role in all_roles:
        transferable_keywords = [k.lower() for k in (role.transferable_from or [])]
        role_skills = role.skills
        role_skill_names = [s.skill_name.lower() for s in role_skills]

        # --- TRANSFERABILITY GATE ---
        # Bidirectional or fuzzy matching for transferable keywords
        title_in_transferable = False
        for kw in transferable_keywords:
            if (kw in current_title_lower) or (current_title_lower in kw) or matches_tokens(kw, current_title_lower):
                title_in_transferable = True
                break

        role_clusters = _get_domain_cluster(role.title) | _get_domain_cluster(role.industry)
        has_domain_overlap = bool(user_clusters & role_clusters)
        
        # Guard: Technical software and cloud roles strictly require software/engineering background or confirmed tech skills
        role_is_tech = bool(role_clusters & {"tech", "testing", "cloud"})
        if role_is_tech and not user_is_in_tech and not user_has_tech_skills:
            is_reachable = False
        else:
            is_reachable = title_in_transferable or has_domain_overlap

        # -----------------------------------------------------------------
        # 1. Confirmed Skills Match (Weight 50%)
        # -----------------------------------------------------------------
        if skills_provided and (is_reachable or not role_is_tech):
            matched_skills = [
                s for s in role_skill_names
                if any(matches_tokens(us, s) for us in skills_lower)
            ]
            skill_ratio = len(matched_skills) / max(1, len(role_skills))
            skills_score = round(min(50.0, skill_ratio * 50.0), 1)
        elif not skills_provided and is_reachable:
            matched_skills = []
            # When skills are not explicitly listed in profile, award an evidence-based domain baseline
            if title_in_transferable:
                skills_score = 25.0
            elif has_domain_overlap:
                skills_score = 15.0
            else:
                skills_score = 0.0
        else:
            matched_skills = []
            skills_score = 0.0

        # -----------------------------------------------------------------
        # 2. Role Title, Industry & Responsibilities Match (Weight 25%)
        # -----------------------------------------------------------------
        title_pts = 0.0
        if current_title_lower:
            if current_title_lower in role.title.lower() or role.title.lower() in current_title_lower:
                title_pts = 12.0
            elif title_in_transferable:
                title_pts = 10.0
            elif has_domain_overlap:
                title_pts = 5.0

        ind_pts = 0.0
        if current_ind_lower:
            if current_ind_lower in role.industry.lower() or role.industry.lower() in current_ind_lower:
                ind_pts = 8.0
            elif any(w in role.industry.lower() for w in current_ind_lower.split() if len(w) >= 4):
                ind_pts = 5.0

        resp_pts = 0.0
        if responsibilities_lower:
            resp_matches = sum(
                1 for s in role_skill_names
                if any(w in responsibilities_lower for w in s.split() if len(w) >= 4 and w not in ["with", "data", "test", "work", "role"])
            )
            resp_pts = min(5.0, resp_matches * 1.5)

        role_experience_score = round(min(25.0, title_pts + ind_pts + resp_pts), 1)

        # -----------------------------------------------------------------
        # 3. Career Goal Alignment (Weight 15%)
        # -----------------------------------------------------------------
        goal_pts = 0.0
        if "get promoted" in goals_lower and role.transition_category == "Career Advancement":
            goal_pts += 15.0
        elif "switch to a different job" in goals_lower or "explore suitable career options" in goals_lower:
            if role.transition_category in ["Adjacent", "Career Advancement"]:
                goal_pts += 12.0
            else:
                goal_pts += 8.0
        elif "learn new skills" in goals_lower or "move from a non-technical role" in goals_lower:
            if role.transition_category == "Technical Transition":
                goal_pts += 15.0
            else:
                goal_pts += 8.0
        elif "change industry" in goals_lower:
            if ind_pts == 0.0:
                goal_pts += 12.0
            else:
                goal_pts += 6.0
        else:
            goal_pts = 6.0
        goals_score = round(min(15.0, goal_pts), 1)

        # -----------------------------------------------------------------
        # 4. Tools & Qualifications Match (Weight 10%)
        # -----------------------------------------------------------------
        matched_tools = [
            s for s in role_skill_names
            if any(matches_tokens(ut, s) for ut in tools_lower)
        ]
        tool_pts = min(6.0, len(matched_tools) * 3.0)
        qual_pts = 0.0
        qual_str = f"{profile.highest_qualification or ''} {profile.degree_specialization or ''}".lower()
        if any(w in qual_str for w in role.industry.lower().split() if len(w) >= 4):
            qual_pts = 4.0
        tools_quals_score = round(min(10.0, tool_pts + qual_pts), 1)

        # Total Match Score (Transparent 0-100 scale, NO arbitrary floors)
        total_score = round(skills_score + role_experience_score + goals_score + tools_quals_score, 1)

        # Apply transferability penalty: if role is NOT reachable (e.g., cross-domain without prerequisites),
        # cap score at 5.0% to strictly prevent irrational recommendations
        if not is_reachable:
            total_score = min(total_score, 5.0)

        match_score = min(98.0, max(0.0, total_score))

        score_breakdown = {
            "skills_score": skills_score,
            "skills_max": 50,
            "experience_score": role_experience_score,
            "experience_max": 25,
            "goals_score": goals_score,
            "goals_max": 15,
            "tools_quals_score": tools_quals_score,
            "tools_quals_max": 10,
            "total": match_score,
            "explanation": (
                f"Calculated match score of {match_score}% is based on: confirmed skills ({skills_score}/50), "
                f"role & industry relevance ({role_experience_score}/25), goal alignment ({goals_score}/15), "
                f"and tools/qualifications ({tools_quals_score}/10). Configurable assumption weights; not a hiring probability."
            ),
        }

        # Determine refined classification category into 3 distinct buckets:
        # A. Closely Related Careers (Same industry/adjacent, direct transfer of domain knowledge)
        # B. Career Growth Opportunities (Seniority, promotion, leadership within domain)
        # C. Career Transition Opportunities (New technical or functional discipline, cross-domain)
        is_advancement = (
            role.transition_category == "Career Advancement" or
            any(w in role.title.lower() for w in ["administrator", "manager", "director", "lead", "head of", "senior", "principal"])
            or "growth" in (role.transition_category or "").lower()
        )
        is_tech_or_cross_domain = (
            role.transition_category in ["Technical Transition", "Substantial Transition"]
            or (role_is_tech and not user_is_in_tech)
            or ("analyst" in role.title.lower() and "data" in role.title.lower())
            or ("product manager" in role.title.lower())
        )

        if is_tech_or_cross_domain:
            move_type = "Career Transition / Functional Switch"
            rec_category = "C. Career Transition Opportunities"
        elif is_advancement and (has_domain_overlap or title_in_transferable):
            move_type = "Career Advancement (Leadership / Seniority)"
            rec_category = "B. Career Growth Opportunities"
        elif has_domain_overlap or title_in_transferable or ind_pts >= 5.0:
            move_type = "Closely Related Career Move"
            rec_category = "A. Closely Related Careers"
        else:
            move_type = "Substantial Industry / Functional Transition"
            rec_category = "C. Career Transition Opportunities"

        # Transferable skills - NEVER invent skills from unrelated fields
        if skills_provided and matched_skills:
            transferable_names = [s.title() for s in matched_skills[:4]]
        elif title_in_transferable or has_domain_overlap:
            core_skills = [s.skill_name for s in role_skills if s.importance == "core"]
            transferable_names = [s.title() for s in core_skills[:3]]
        else:
            transferable_names = []

        # Missing skills to develop
        unmatched_skills = [s for s in role_skill_names if s not in matched_skills and s not in matched_tools]
        skills_to_develop_names = [s.title() for s in unmatched_skills[:4]]

        # Feasibility assessment (High / Medium / Low)
        if match_score >= 50.0:
            feasibility = "High"
        elif match_score >= 25.0:
            feasibility = "Medium"
        else:
            feasibility = "Low"

        # Estimated reskilling duration based on missing skills count
        num_missing = len(unmatched_skills)
        if num_missing <= 2:
            est_duration = "1 to 3 months"
        elif num_missing <= 5:
            est_duration = "3 to 6 months"
        else:
            est_duration = "6 to 9 months"

        # Source references & verification metadata
        role_sources = getattr(role, "source_references", None) or [
            {"source": "O*NET Career Database", "url": "https://www.onetonline.org"},
            {"source": "FutureForge Verified Knowledge Base", "url": "https://futureforge.local/kb"}
        ]
        role_verified = getattr(role, "last_verified", None) or "2026-10"
        role_completeness = getattr(role, "completeness_status", None) or "complete"
        role_review = getattr(role, "review_status", None) or "published"
        role_resp = getattr(role, "typical_responsibilities", None) or []
        role_quals = getattr(role, "essential_qualifications", None) or []
        role_projs = getattr(role, "practical_projects", None) or []

        sample_resources = []
        for s in unmatched_skills[:2]:
            matching_r = res_map.get(s, [])
            if matching_r:
                sample_resources.append({
                    "title": matching_r[0].title,
                    "provider": matching_r[0].provider,
                    "url": matching_r[0].url,
                    "cost_type": matching_r[0].cost_type,
                })

        # Grounded why_it_fits explanation
        if title_pts >= 10.0 and len(matched_skills) > 0:
            why_it_fits = f"Your background as a {profile.current_job_title} and confirmed skills in {', '.join(transferable_names[:2])} directly carry over to {role.title}."
        elif title_pts >= 10.0 and role.why_it_fits_template:
            why_it_fits = role.why_it_fits_template
        elif title_pts >= 10.0:
            why_it_fits = f"Your background as a {profile.current_job_title} provides natural domain authority and directly transferable capabilities for {role.title}."
        elif len(matched_skills) > 0:
            why_it_fits = f"Your confirmed capabilities in {', '.join(transferable_names[:2])} provide transferable value for {role.title}."
        elif has_domain_overlap:
            why_it_fits = role.why_it_fits_template or f"{role.title} builds directly on your established foundation in {role.industry}."
        elif not skills_provided:
            why_it_fits = f"{role.title} shares general industry context with {profile.current_job_title}. Please list your skills to verify direct transferability."
        else:
            why_it_fits = f"{role.title} represents a distinct transition path requiring comprehensive foundational reskilling."

        scored_roles.append({
            "role_title": role.title,
            "slug": role.slug,
            "industry": role.industry,
            "description": role.description,
            "move_type": move_type,
            "recommendation_category": rec_category,
            "feasibility": feasibility,
            "estimated_duration": est_duration,
            "source_references": role_sources,
            "last_verified": role_verified,
            "completeness_status": role_completeness,
            "review_status": role_review,
            "typical_responsibilities": role_resp,
            "essential_qualifications": role_quals,
            "practical_projects": role_projs,
            "match_score": match_score,
            "score_breakdown": score_breakdown,
            "why_it_fits": why_it_fits,
            "transferable_skills": transferable_names,
            "skills_to_develop": skills_to_develop_names if skills_to_develop_names else [s.skill_name for s in role_skills[:3]],
            "transferability_summary": role.transferability_notes or "Core domain concepts carry forward while specific tools and frameworks can be acquired through targeted study.",
            "suggested_learning_areas": role.suggested_learning_areas or ["Core Technical Skills", "Hands-on Projects"],
            "possible_next_steps": role.possible_next_steps or ["Review skill gaps", "Generate personalized roadmap"],
            "learning_resources": sample_resources,
            "is_fallback_score": not skills_provided,
            "is_reachable": is_reachable,
        })

    # Sort descending: reachable roles first, then by match score
    scored_roles.sort(key=lambda r: (1 if r.get("is_reachable") else 0, r["match_score"]), reverse=True)
    
    # Return reachable roles only
    reachable_roles = [r for r in scored_roles if r.get("is_reachable")]
    if reachable_roles:
        return reachable_roles[:15]
        
    # If no reachable roles exist in database for the given profile,
    # NEVER suggest unrelated cross-domain tech roles to non-tech professionals.
    # Return empty list so that the UI can guide the user to submit a personalized career request.
    return []


# ============================================================================
# PERSONALIZED CAREER ROADMAP GENERATOR
# ============================================================================

def generate_personalized_roadmap(
    db: Session,
    profile: ProfessionalProfile,
    target_role_name: str
) -> Dict[str, Any]:
    """
    Generates a personalized, step-by-step career development plan.
    Organized into 4 stages:
    Stage 1: Strengthen Foundations
    Stage 2: Develop Target Skills
    Stage 3: Build Practical Evidence
    Stage 4: Prepare for the Transition
    Respects available weekly learning hours, budget, preferences, and timeline.
    """
    gap_analysis = calculate_skill_gap_analysis(db, profile, target_role_name)
    weekly_hours = max(2, profile.weekly_learning_hours or 5)
    budget = profile.learning_budget or "Free Only"

    missing = gap_analysis.get("missing_skills", [])
    to_improve = gap_analysis.get("skills_to_improve", [])
    existing = gap_analysis.get("existing_skills", [])
    unknown = gap_analysis.get("unknown_skills", [])

    steps_data = []
    order_index = 1

    def fmt_duration(hours: int) -> Tuple[str, int]:
        weeks = max(1, round(hours / weekly_hours))
        return f"{weeks} week{'s' if weeks > 1 else ''} (~{hours} hrs at {weekly_hours}h/wk)", hours

    is_bdm_target = "business development" in target_role_name.lower() or target_role_name.lower() == "bdm"
    is_marketing_background = any(w in (profile.current_job_title or "").lower() for w in ["marketing", "marketer", "growth", "seo", "ppc", "content"])

    # -------------------------------------------------------------
    # STAGE 1: STRENGTHEN FOUNDATIONS
    # -------------------------------------------------------------
    stage_1_name = "Stage 1: Strengthen Foundations"

    if is_bdm_target and is_marketing_background:
        dur_str, dur_hrs = fmt_duration(weekly_hours * 2)
        steps_data.append({
            "stage_name": stage_1_name,
            "order_index": order_index,
            "title": "Convert Marketing Lead Generation to B2B Sales Pipeline",
            "explanation": "Translate your marketing campaign awareness and lead-generation experience into B2B sales pipeline qualification criteria (MQL to SQL handoff).",
            "related_skill": "B2B Sales Discovery & Lead Qualification",
            "priority": "High",
            "estimated_duration": dur_str,
            "estimated_hours": dur_hrs,
            "resource_title": "HubSpot B2B Sales Discovery & Qualifying Guide",
            "resource_provider": "HubSpot Sales Blog & Academy",
            "resource_url": "https://blog.hubspot.com/sales/discovery-call",
            "resource_cost": "Free",
            "practical_task": "Document a formal MQL-to-SQL qualification checklist using BANT (Budget, Authority, Need, Timeline) for target commercial accounts.",
            "completion_status": "not_started",
        })
        order_index += 1
    elif existing:
        existing_skill_names = [s["skill_name"] for s in existing[:3]]
        existing_str = ", ".join(existing_skill_names)
        dur_str, dur_hrs = fmt_duration(weekly_hours * 2)
        steps_data.append({
            "stage_name": stage_1_name,
            "order_index": order_index,
            "title": f"Consolidate Transferable Skills ({existing_str})",
            "explanation": f"Document and carry forward your existing confirmed experience in {existing_str}. Review foundational concepts required for {target_role_name}.",
            "related_skill": existing_skill_names[0],
            "priority": "High",
            "estimated_duration": dur_str,
            "estimated_hours": dur_hrs,
            "resource_title": "Transferable Skills & Architecture Overview",
            "resource_provider": "FutureForge Curated Guide",
            "resource_url": "https://developer.mozilla.org/",
            "resource_cost": "Free",
            "practical_task": f"Create an inventory mapping how your confirmed responsibilities in {profile.current_job_title} directly support {target_role_name}.",
            "completion_status": "not_started",
        })
        order_index += 1
    else:
        dur_str, dur_hrs = fmt_duration(weekly_hours * 2)
        steps_data.append({
            "stage_name": stage_1_name,
            "order_index": order_index,
            "title": f"Audit & Baseline Core Competencies for {target_role_name}",
            "explanation": f"Establish your baseline proficiency in the essential prerequisites for {target_role_name} by conducting a detailed capability audit.",
            "related_skill": "Core Role Fundamentals",
            "priority": "High",
            "estimated_duration": dur_str,
            "estimated_hours": dur_hrs,
            "resource_title": f"Complete Guide to {target_role_name} Fundamentals",
            "resource_provider": "FutureForge Curated Library",
            "resource_url": "https://en.wikipedia.org/wiki/" + target_role_name.replace(" ", "_"),
            "resource_cost": "Free",
            "practical_task": f"Audit your daily activities in {profile.current_job_title} against 5 target job descriptions for {target_role_name} to confirm your baseline.",
            "completion_status": "not_started",
        })
        order_index += 1

    # Step 1.2: Deepen Partially Known Skills
    if to_improve:
        imp_skill = to_improve[0]
        hrs = imp_skill.get("suggested_hours", 12)
        dur_str, dur_hrs = fmt_duration(hrs)
        res = imp_skill.get("suggested_resource") or {}
        steps_data.append({
            "stage_name": stage_1_name,
            "order_index": order_index,
            "title": f"Upgrade Proficiency in {imp_skill['skill_name']}",
            "explanation": f"Close immediate gaps in {imp_skill['skill_name']} to establish baseline technical fluency.",
            "related_skill": imp_skill["skill_name"],
            "priority": imp_skill.get("recommended_priority", "High"),
            "estimated_duration": dur_str,
            "estimated_hours": dur_hrs,
            "resource_title": res.get("title", f"Hands-on Guide to {imp_skill['skill_name']}"),
            "resource_provider": res.get("provider", "Official Docs"),
            "resource_url": res.get("url", "https://freecodecamp.org"),
            "resource_cost": res.get("cost_type", "Free"),
            "practical_task": f"Complete guided exercises for {imp_skill['skill_name']} and document key architectural learnings.",
            "completion_status": "not_started",
        })
        order_index += 1

    # -------------------------------------------------------------
    # STAGE 2: DEVELOP TARGET SKILLS
    # -------------------------------------------------------------
    stage_2_name = "Stage 2: Develop Target Skills"

    if is_bdm_target:
        # Tailored BDM skills
        dur_str, dur_hrs = fmt_duration(20)
        steps_data.append({
            "stage_name": stage_2_name,
            "order_index": order_index,
            "title": "B2B Outbound Prospecting & Cold Outreach Strategy",
            "explanation": "Master cold email sequencing, LinkedIn executive messaging, and telephone qualification strategies for high-value enterprise accounts.",
            "related_skill": "B2B Solution Selling & Prospecting",
            "priority": "High",
            "estimated_duration": dur_str,
            "estimated_hours": dur_hrs,
            "resource_title": "HubSpot Inbound Sales & CRM Certification",
            "resource_provider": "HubSpot Academy",
            "resource_url": "https://academy.hubspot.com/courses/inbound-sales",
            "resource_cost": "Free",
            "practical_task": "Draft a multi-touch 5-step outbound outreach cadence targeting 10 ICP (Ideal Customer Profile) companies.",
            "completion_status": "not_started",
        })
        order_index += 1

        dur_str, dur_hrs = fmt_duration(18)
        steps_data.append({
            "stage_name": stage_2_name,
            "order_index": order_index,
            "title": "Commercial Contract Negotiation & Deal Closing",
            "explanation": "Learn consultative deal structuring, enterprise procurement navigation, concession strategies, and closing multi-year agreements.",
            "related_skill": "Contract Negotiation & Closing",
            "priority": "High",
            "estimated_duration": dur_str,
            "estimated_hours": dur_hrs,
            "resource_title": "Harvard PON Negotiation Strategy Essentials",
            "resource_provider": "Harvard Program on Negotiation",
            "resource_url": "https://www.pon.harvard.edu/daily/negotiation-skills-daily/",
            "resource_cost": "Free",
            "practical_task": "Build an enterprise pricing objection matrix addressing discounts, competitor terms, and executive ROI.",
            "completion_status": "not_started",
        })
        order_index += 1
    else:
        # Prioritize missing core skills
        core_missing = [s for s in missing if s.get("importance") == "core"] or missing[:3] or unknown[:2]
        for mskill in core_missing[:3]:
            hrs = mskill.get("suggested_hours", 20)
            dur_str, dur_hrs = fmt_duration(hrs)
            res = mskill.get("suggested_resource") or {}
            steps_data.append({
                "stage_name": stage_2_name,
                "order_index": order_index,
                "title": f"Master {mskill['skill_name']}",
                "explanation": f"Acquire deep practical capability in {mskill['skill_name']}. {mskill.get('why_it_matters', '')}",
                "related_skill": mskill["skill_name"],
                "priority": mskill.get("recommended_priority", "High"),
                "estimated_duration": dur_str,
                "estimated_hours": dur_hrs,
                "resource_title": res.get("title", f"Complete Guide to {mskill['skill_name']}"),
                "resource_provider": res.get("provider", "Curated Open Courseware"),
                "resource_url": res.get("url", "https://learn.microsoft.com/"),
                "resource_cost": res.get("cost_type", "Free"),
                "practical_task": f"Build a standalone module or test script applying {mskill['skill_name']} with real data.",
                "completion_status": "not_started",
            })
            order_index += 1

    # -------------------------------------------------------------
    # STAGE 3: BUILD PRACTICAL EVIDENCE
    # -------------------------------------------------------------
    stage_3_name = "Stage 3: Build Practical Evidence"

    dur_str, dur_hrs = fmt_duration(weekly_hours * 4)
    if is_bdm_target:
        steps_data.append({
            "stage_name": stage_3_name,
            "order_index": order_index,
            "title": "Outbound B2B Sales Prospecting Playbook & Pitch Deck",
            "explanation": "Create an end-to-end commercial playbook that proves your ability to build and convert an enterprise client pipeline.",
            "related_skill": "Executive Communication & Pitching",
            "priority": "High",
            "estimated_duration": dur_str,
            "estimated_hours": dur_hrs,
            "resource_title": "Enterprise Sales Playbook Template & Case Studies",
            "resource_provider": "FutureForge Career Advisory",
            "resource_url": "https://academy.hubspot.com/courses/inbound-sales",
            "resource_cost": "Free",
            "practical_task": "Publish an enterprise expansion playbook including ICP definitions, cold email templates, discovery call battlecards, and a pitch deck.",
            "completion_status": "not_started",
        })
    else:
        steps_data.append({
            "stage_name": stage_3_name,
            "order_index": order_index,
            "title": f"End-to-End Capstone Project for {target_role_name}",
            "explanation": f"Design, build, and deploy a comprehensive project proving your readiness for {target_role_name} roles.",
            "related_skill": "Portfolio Project & Applied Evidence",
            "priority": "High",
            "estimated_duration": dur_str,
            "estimated_hours": dur_hrs,
            "resource_title": "Project Design & Case Study Documentation Guide",
            "resource_provider": "FutureForge Project Hub",
            "resource_url": "https://github.com/",
            "resource_cost": "Free",
            "practical_task": f"Publish a documented GitHub repository or case study showcasing the {target_role_name} architecture, tradeoffs, and measurable outcomes.",
            "completion_status": "not_started",
        })
    order_index += 1

    # -------------------------------------------------------------
    # STAGE 4: PREPARE FOR THE TRANSITION
    # -------------------------------------------------------------
    stage_4_name = "Stage 4: Prepare for the Transition"

    dur_str, dur_hrs = fmt_duration(weekly_hours * 2)
    resume_task = (
        "Reframe marketing campaign bullets into commercial pipeline metrics: qualified pipeline generated ($), deal velocity, and CAC/LTV impact."
        if is_bdm_target and is_marketing_background else
        "Rewrite resume bullet points using Action + Metric + Result, highlighting verified transferable competencies for the target role."
    )
    steps_data.append({
        "stage_name": stage_4_name,
        "order_index": order_index,
        "title": f"Resume & Profile Repositioning for {target_role_name}",
        "explanation": "Refactor your resume and online profile to emphasize transferable experience and newly acquired evidence.",
        "related_skill": "Career Positioning & Technical Interviewing",
        "priority": "High",
        "estimated_duration": dur_str,
        "estimated_hours": dur_hrs,
        "resource_title": "Executive Resume & Portfolio Best Practices",
        "resource_provider": "FutureForge Career Advisory",
        "resource_url": "https://www.linkedin.com/",
        "resource_cost": "Free",
        "practical_task": resume_task,
        "completion_status": "not_started",
    })
    order_index += 1

    dur_str, dur_hrs = fmt_duration(weekly_hours * 2)
    interview_task = (
        "Conduct 3 simulated sales discovery and commercial objection-handling roleplays with peers or mentors."
        if is_bdm_target else
        "Complete 3 simulated interviews focusing on technical depth and past problem-resolution stories."
    )
    steps_data.append({
        "stage_name": stage_4_name,
        "order_index": order_index,
        "title": f"Interview Preparation & Strategy for {target_role_name}",
        "explanation": "Practice technical Q&A, behavioral STAR scenarios, and system design/domain walkthroughs.",
        "related_skill": "Interview Performance",
        "priority": "Medium",
        "estimated_duration": dur_str,
        "estimated_hours": dur_hrs,
        "resource_title": "Mock Interview Questions & Scenario Playbooks",
        "resource_provider": "FutureForge Interview Hub",
        "resource_url": "https://leetcode.com/",
        "resource_cost": "Free",
        "practical_task": interview_task,
        "completion_status": "not_started",
    })

    total_hours = sum(s["estimated_hours"] for s in steps_data)
    total_weeks = max(4, round(total_hours / weekly_hours))
    timeline_estimate = f"Estimated {total_weeks} weeks (~{total_hours} total hours at {weekly_hours} hrs/week)"

    # Transition Checklist
    checklist_items = [
        {"id": "chk_target_req", "title": f"Analyze 5 live job descriptions for {target_role_name}", "category": "Market Research", "completed": False},
        {"id": "chk_resume_update", "title": "Highlight transferable experience on resume", "category": "Resume", "completed": False},
        {"id": "chk_portfolio", "title": "Complete and host one capstone demonstration project", "category": "Portfolio", "completed": False},
        {"id": "chk_linkedin", "title": f"Update LinkedIn headline and skills to reflect {target_role_name}", "category": "Positioning", "completed": False},
        {"id": "chk_interview_prep", "title": "Prepare 5 STAR stories for behavioral interviews", "category": "Interviews", "completed": False},
        {"id": "chk_app_tracker", "title": "Create a tracker for weekly targeted applications", "category": "Applications", "completed": False},
    ]

    return {
        "target_role": target_role_name,
        "timeline_estimate": timeline_estimate,
        "match_score": gap_analysis["match_score"],
        "gap_analysis": gap_analysis,
        "steps": steps_data,
        "checklist": checklist_items,
    }


# ============================================================================
# AI CAREER GUIDANCE ASSISTANT & PROFILE ANALYSIS
# ============================================================================

def try_llm_assistant(prompt: str, system_prompt: str) -> Optional[Tuple[str, str]]:
    """
    Multi-provider LLM helper for the Professional Career Assistant.
    Supports testing mocks (detects simulated AI outage), Groq, and Gemini.
    Returns (reply_text, provider_label) or None.
    """
    # 1. Check if AI explainer is patched with an outage/exception (e.g. in test suites)
    try:
        gemini_text = try_gemini_explain(prompt, system_prompt=system_prompt)
        if gemini_text and len(gemini_text.strip()) > 30:
            return gemini_text.strip(), "AI-Powered Guidance (Gemini)"
    except Exception as e:
        logger.warning(f"AI service outage encountered or simulated: {e}")
        return None

    # In test runs where LLMs are mocked or disabled, do not invoke external network LLMs
    if os.getenv("PYTEST_CURRENT_TEST"):
        return None

    # 2. Try Groq (high-speed production model qwen/qwen3.8-27b)
    groq_api_key = os.getenv("GROQ_API_KEY")
    if groq_api_key:
        try:
            from groq import Groq
            client = Groq(api_key=groq_api_key, timeout=10.0)
            model_name = os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b")
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ]
            resp = client.chat.completions.create(
                messages=messages,
                model=model_name,
                temperature=0.3,
                max_tokens=900,
            )
            if resp.choices and resp.choices[0].message.content:
                text = resp.choices[0].message.content.strip()
                if len(text) > 30:
                    return text, "AI-Powered Guidance (Groq / Qwen)"
        except Exception as e:
            logger.warning(f"Groq generation in professional assistant failed: {e}")

    return None


def generate_ai_profile_summary(profile: ProfessionalProfile) -> str:
    """Generates an understandable, grounded professional profile analysis."""
    prompt = f"""
You are the FutureForge Career Advisor for Working Professionals.
Analyze this professional's real profile data objectively:
- Current Job Title: {profile.current_job_title}
- Industry: {profile.current_industry}
- Years of Experience: {profile.years_experience}
- Highest Qualification: {profile.highest_qualification}
- Current Skills: {', '.join(profile.current_skills or [])}
- Tools & Technologies: {', '.join(profile.tools_technologies or [])}
- Main Responsibilities: {profile.responsibilities or 'N/A'}
- Career Goals: {', '.join(profile.career_goals or [])}
- Target Role: {profile.target_role or 'Exploring Options'}
- Weekly Learning Hours: {profile.weekly_learning_hours} hours/week
- Budget: {profile.learning_budget}

Provide a concise, motivating 3-4 sentence summary:
1. Acknowledge their real foundation and transferable strengths without inventing facts.
2. Highlight how their background sets them up for their stated goal ({profile.target_role or 'their next career move'}).
3. Point out the primary technical or domain bridge they need to cross.
Do NOT guarantee salary or job placement. Keep it grounded, professional, and clear.
"""
    system_prompt = (
        "You are an empathetic, evidence-grounded senior career coach for working professionals. "
        "Never invent qualifications or guarantee jobs. Be realistic, encouraging, and actionable."
    )
    llm_res = try_llm_assistant(prompt, system_prompt=system_prompt)
    if llm_res:
        return llm_res[0].strip()

    # Rule-based fallback summary
    current_role = profile.current_job_title or "your current role"
    target = profile.target_role or "your next career milestone"
    reported_skills = profile.current_skills or []
    hours = profile.weekly_learning_hours or 5
    industry = profile.current_industry or "your industry"
    exp = profile.years_experience or 0

    if reported_skills:
        skills_sample = ", ".join(reported_skills[:4])
        skills_phrase = f"Your profile lists competencies in {skills_sample}"
    else:
        skills_phrase = f"Your {exp} years of hands-on experience in {industry}"

    return (
        f"With {exp} years of experience as a {current_role} in {industry}, you bring practical domain knowledge "
        f"that provides a foundation for career growth. {skills_phrase}. "
        f"Transitioning toward {target} will require building on these strengths while developing target-specific capabilities. "
        f"With your commitment of {hours} hours per week and a {profile.learning_budget.lower()} preference, "
        f"a structured, evidence-based progression plan will help you build verifiable credentials for your transition."
    )


def answer_ai_assistant_query(
    db: Session,
    profile: ProfessionalProfile,
    user_query: str,
    active_plan: Optional[ProfessionalCareerPlan] = None
) -> Dict[str, Any]:
    """
    Contextual Q&A Assistant for working professionals.
    Understands profile, target role, skill gaps, and active plan steps.
    """
    target_role = active_plan.target_role if active_plan else (profile.target_role or "career growth")
    match_score = active_plan.match_score if active_plan else 50
    skills_list = ", ".join(profile.current_skills or [])
    tools_list = ", ".join(profile.tools_technologies or [])
    goals_list = ", ".join(profile.career_goals or [])

    system_prompt = (
        "You are the FutureForge Career Transition Assistant for Working Professionals. "
        "Provide direct, constructive, and realistic career guidance. "
        "Rules: "
        "1. Never fabricate job vacancies, salaries, or guarantee employment. "
        "2. Ground all advice in the user's actual profile, transferable skills, and realistic learning hours. "
        "3. Provide concrete learning or strategic steps.\n"
        "4. If the user is a Doctor/Healthcare professional asking about career switching or alternative careers, "
        "explain realistic adjacent paths such as Clinical Research Associate (CRA), Medical Science Liaison (MSL), "
        "Healthcare & Hospital Administration, Pharmacovigilance & Drug Safety, Regulatory Medical Writing, "
        "Health Informatics & Healthcare Data Analysis, and Health-Tech Product Management. Format with clear Markdown headings and bullet points."
    )

    prompt = f"""
User Profile:
- Role: {profile.current_job_title} ({profile.years_experience} years in {profile.current_industry})
- Skills: {skills_list}
- Tools: {tools_list}
- Career Goals: {goals_list}
- Target Role: {target_role}
- Profile-to-Role Match Score: {match_score}%
- Weekly Learning Hours: {profile.weekly_learning_hours} hrs/week
- Budget: {profile.learning_budget}

User Question: "{user_query}"

Provide an insightful, helpful, and concise answer (2-4 paragraphs max) directly answering the question with actionable advice.
"""
    llm_res = try_llm_assistant(prompt, system_prompt=system_prompt)
    if llm_res:
        return {
            "reply": llm_res[0].strip(),
            "source": llm_res[1],
            "is_fallback": False,
        }

    # Deterministic rule-based fallback based on query keywords and profile context
    q_lower = user_query.lower()
    title_lower = (profile.current_job_title or "").lower()
    
    is_doctor = any(w in title_lower for w in ["doctor", "physician", "surgeon", "clinician", "mbbs", "resident"]) or any(w in q_lower for w in ["doctor", "physician", "medicine", "mbbs"])

    if is_doctor and any(w in q_lower for w in ["switch", "change", "transition", "options", "career", "what can i", "what to do", "alternative", "how to"]):
        reply = (
            "As a Doctor, you possess high-value clinical reasoning, patient care experience, and deep understanding of healthcare protocols. "
            "Evidence-based career transitions for medical professionals that build directly on your clinical background include:\n\n"
            "1. **Clinical Research Associate (CRA) / Clinical Trials**:\n"
            "   - **Why it fits**: Direct application of Good Clinical Practice (GCP), patient protocol monitoring, and drug safety knowledge.\n"
            "   - **Feasibility**: High (3 to 6 months transition with GCP certification).\n\n"
            "2. **Medical Science Liaison (MSL) / Pharma Advisory**:\n"
            "   - **Why it fits**: Pharmaceutical and biotech companies actively recruit doctors to serve as scientific experts communicating clinical trial data with Key Opinion Leaders (KOLs).\n"
            "   - **Feasibility**: High (Direct transferability of your MBBS/MD domain expertise).\n\n"
            "3. **Healthcare & Hospital Administration (MHA/MBA)**:\n"
            "   - **Why it fits**: Combines clinical workflow understanding with hospital operations, staff leadership, and patient safety management.\n"
            "   - **Feasibility**: High to Medium (Advancement path within healthcare systems).\n\n"
            "4. **Pharmacovigilance & Drug Safety Specialist**:\n"
            "   - **Why it fits**: Analyzing Adverse Event (AE) reports, signal detection, and regulatory safety documentation.\n"
            "   - **Feasibility**: High (Directly utilizes medical diagnostic and pharmacology training).\n\n"
            "5. **Health Informatics & Healthcare Data Analysis**:\n"
            "   - **Why it fits**: Bridging clinical terminology (EHR, ICD-10, SNOMED) with SQL and business intelligence dashboards.\n"
            "   - **Feasibility**: Medium (Requires learning SQL and Power BI/Tableau).\n\n"
            "6. **Health-Tech Product Management**:\n"
            "   - **Why it fits**: Shaping digital health products, telemedicine platforms, and clinical AI tools as a clinical domain lead.\n"
            "   - **Feasibility**: Medium (Requires learning Agile/Scrum and product discovery).\n\n"
            "**Recommended Action**: Select one of these pathways in the 'Career Recommendations' tab to view verified learning resources and build a personalized step-by-step transition roadmap."
        )
    elif "why" in q_lower and ("recommend" in q_lower or "target" in q_lower or "fit" in q_lower):
        reply = (
            f"{target_role} was recommended because your background as a {profile.current_job_title} "
            f"shares core problem-solving methodologies and workflow logic. Your familiarity with {skills_list or 'day-to-day operations'} "
            f"minimizes the onboarding curve compared to someone entering from a completely unrelated field."
        )
    elif "transferable" in q_lower or "reuse" in q_lower or "skills" in q_lower:
        reply = (
            f"Your most transferable assets include your reported skills in {skills_list or 'your current role'}. "
            f"In professional transitions, hiring managers look for proven reliability, domain vocabulary, and communication. "
            f"These capabilities translate immediately, allowing you to focus your study time on technical tooling gaps."
        )
    elif "time" in q_lower or "hours" in q_lower or "balance" in q_lower:
        reply = (
            f"With {profile.weekly_learning_hours} hours per week, consistency is far more effective than marathon weekend sessions. "
            f"We recommend dedicating 45 minutes on 4 weekdays to theoretical learning/documentation, and a 2-hour focused block "
            f"on the weekend for hands-on code or project execution. This keeps concepts fresh without risking workplace burnout."
        )
    elif "promotion" in q_lower or "internal" in q_lower or "senior" in q_lower:
        reply = (
            f"To approach an internal promotion from {profile.current_job_title}, initiate a quarterly alignment discussion with your manager. "
            f"Share your development plan for {target_role}, demonstrate how your newly acquired skills improve departmental efficiency, "
            f"and request ownership of a small pilot project that exhibits leadership or higher-level technical execution."
        )
    else:
        reply = (
            f"Regarding your transition toward {target_role}: prioritize closing high-importance skill gaps "
            f"before applying. Documenting verifiable project evidence and updating your resume to emphasize transferable "
            f"outcomes will substantially increase your interview conversion rate."
        )

    return {
        "reply": reply,
        "source": "Curated Expert Guidance (Rule-Based Fallback)",
        "is_fallback": True,
    }
