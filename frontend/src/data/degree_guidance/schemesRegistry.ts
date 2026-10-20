import { Scheme } from "./types";

export const SCHEMES_REGISTRY: Scheme[] = [
  {
    id: "startup-india-seed-fund",
    name: "Startup India Seed Fund Scheme (SISFS)",
    category: "entrepreneurship",
    agency: "Department for Promotion of Industry and Internal Trade (DPIIT)",
    targetAudience: "Early-stage graduate & student entrepreneurs with DPIIT recognized startup",
    benefits: "Up to ₹20 Lakhs grant for proof of concept/prototype development + Up to ₹50 Lakhs convertible debentures/debt for commercialization",
    eligibilityRules: "DPIIT recognized startup incorporated not more than 2 years ago, with viable commercial potential and technology/social innovation.",
    officialUrl: "https://seedfund.startupindia.gov.in",
    meta: {
      sourceUrl: "https://seedfund.startupindia.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "DPIIT Ministry of Commerce & Industry",
      confidence: "high"
    }
  },
  {
    id: "pm-mudra-yojana",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    category: "entrepreneurship",
    agency: "Department of Financial Services, Ministry of Finance",
    targetAudience: "Graduates and young professionals establishing micro/small enterprises or self-employment clinics/studios/firms",
    benefits: "Collateral-free business loans up to ₹10 Lakhs (Shishu up to ₹50k, Kishore up to ₹5L, Tarun up to ₹10L; up to ₹20L under Tarun Plus)",
    eligibilityRules: "Non-corporate, non-farm small/micro enterprises. Available through all public sector, private, and regional rural banks.",
    officialUrl: "https://www.mudra.org.in",
    meta: {
      sourceUrl: "https://www.mudra.org.in",
      retrievedOn: "2025-06-15",
      verifier: "MUDRA Official",
      confidence: "high"
    }
  },
  {
    id: "pmegp-scheme",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    category: "entrepreneurship",
    agency: "Ministry of Micro, Small and Medium Enterprises (KVIC)",
    targetAudience: "Individuals above 18 years with at least Class 8 pass for manufacturing units",
    benefits: "Credit-linked subsidy up to 35% of project cost (Manufacturing projects up to ₹50 Lakhs, Service projects up to ₹20 Lakhs)",
    eligibilityRules: "Beneficiary must contribute 5% to 10% own equity; bank funds the balance with government margin money subsidy.",
    officialUrl: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
    meta: {
      sourceUrl: "https://www.kviconline.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "KVIC MSME Ministry",
      confidence: "high"
    }
  },
  {
    id: "stand-up-india",
    name: "Stand-Up India Scheme for Greenfield Enterprises",
    category: "entrepreneurship",
    agency: "Small Industries Development Bank of India (SIDBI)",
    targetAudience: "SC, ST, and Women entrepreneurs launching greenfield projects in manufacturing, services, or trading",
    benefits: "Composite bank loans between ₹10 Lakhs and ₹1 Crore covering up to 75% of project cost",
    eligibilityRules: "Borrower must be SC/ST or woman entrepreneur. In non-individual enterprises, 51% shareholding must be held by SC/ST or woman.",
    officialUrl: "https://www.standupmitra.in",
    meta: {
      sourceUrl: "https://www.standupmitra.in",
      retrievedOn: "2025-06-15",
      verifier: "SIDBI / Ministry of Finance",
      confidence: "high"
    }
  },
  {
    id: "pmrf-fellowship",
    name: "Prime Minister's Research Fellowship (PMRF)",
    category: "fellowship",
    agency: "Ministry of Education (MoE)",
    targetAudience: "Top-tier undergraduate and postgraduate graduates joining doctoral programs at IISc/IITs/IISERs",
    benefits: "Stipend of ₹70,000/mo (Years 1-2), ₹75,000/mo (Year 3), ₹80,000/mo (Years 4-5) + ₹2,00,000 annual research contingency grant",
    eligibilityRules: "CGPA >= 8.0 in 4-year B.Tech / Integrated M.Sc from centrally funded institutions, or high GATE score (>650).",
    officialUrl: "https://www.pmrf.in",
    meta: {
      sourceUrl: "https://www.pmrf.in",
      retrievedOn: "2025-06-15",
      verifier: "PMRF MoE Official",
      confidence: "high"
    }
  },
  {
    id: "dst-inspire-fellowship",
    name: "DST INSPIRE Fellowship for Ph.D. Scholars",
    category: "fellowship",
    agency: "Department of Science and Technology (DST)",
    targetAudience: "University 1st Rank Holders in Post-Graduate science & engineering degrees, or INSPIRE Scholars with >70% in PG",
    benefits: "Junior Research Fellowship (JRF) ₹37,000/mo + HRA, upgraded to Senior Research Fellowship (SRF) ₹42,000/mo after 2 years",
    eligibilityRules: "First rank holder in university examination in M.Sc / M.Tech / Integrated MS in Basic or Applied Sciences.",
    officialUrl: "https://online-inspire.gov.in",
    meta: {
      sourceUrl: "https://online-inspire.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "DST Ministry of Science & Tech",
      confidence: "high"
    }
  },
  {
    id: "nsp-post-matric",
    name: "National Scholarship Portal (NSP Post-Matric & Central Sector Schemes)",
    category: "scholarship",
    agency: "Ministry of Social Justice, Tribal Affairs, and Minorities",
    targetAudience: "Undergraduate and postgraduate students meeting parental income ceiling (typically < ₹2.5 Lakhs to ₹8 Lakhs)",
    benefits: "Full tuition fee reimbursement + annual maintenance allowance credited directly via DBT to Aadhaar-linked bank account",
    eligibilityRules: "Enrolled in recognized degree program; minimum 50% in previous qualifying exam; parental income documentation required.",
    officialUrl: "https://scholarships.gov.in",
    meta: {
      sourceUrl: "https://scholarships.gov.in",
      retrievedOn: "2025-06-15",
      verifier: "National Informatics Centre (NIC) NSP",
      confidence: "high"
    }
  }
];
