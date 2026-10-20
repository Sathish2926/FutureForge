import { Career, ValidationIssue } from "./roadmapTypes";

const ALLOWED_DETAIL_KINDS = new Set(["exam", "course", "licence", "skill", "milestone"]);

export function validateCareer(career: Career, referenceDate: Date = new Date()): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const careerId = career?.id || "unknown";
  const careerName = career?.name || "Unnamed Career";

  if (!career.id || typeof career.id !== "string") {
    issues.push({ careerId, careerName, field: "id", message: "Career id must be a non-empty string" });
  }
  if (!career.name || typeof career.name !== "string") {
    issues.push({ careerId, careerName, field: "name", message: "Career name must be a non-empty string" });
  }
  if (!career.group || typeof career.group !== "string") {
    issues.push({ careerId, careerName, field: "group", message: "Career group must be specified" });
  }
  if (!career.icon || typeof career.icon !== "string") {
    issues.push({ careerId, careerName, field: "icon", message: "Career icon must be specified" });
  }

  // Check aliases and keywords (must have 5+ aliases/keywords)
  const totalKeywords = (career.aliases || []).length + (career.keywords || []).length;
  if (totalKeywords < 5) {
    issues.push({
      careerId,
      careerName,
      field: "aliases/keywords",
      message: `Career must have at least 5 combined aliases and keywords (has ${totalKeywords})`
    });
  }

  // Check career lastReviewed date (must be within last 12 months)
  if (!career.lastReviewed) {
    issues.push({ careerId, careerName, field: "lastReviewed", message: "Career lastReviewed date is missing" });
  } else {
    const careerDate = new Date(career.lastReviewed);
    if (isNaN(careerDate.getTime())) {
      issues.push({ careerId, careerName, field: "lastReviewed", message: "Career lastReviewed must be a valid ISO date" });
    } else {
      const twelveMonthsMs = 365.25 * 24 * 60 * 60 * 1000;
      const ageMs = referenceDate.getTime() - careerDate.getTime();
      if (ageMs > twelveMonthsMs) {
        issues.push({
          careerId,
          careerName,
          field: "lastReviewed",
          message: `Career lastReviewed (${career.lastReviewed}) is older than 12 months`
        });
      }
    }
  }

  // Check steps count: 5 to 8 steps required
  if (!Array.isArray(career.steps) || career.steps.length < 5 || career.steps.length > 8) {
    issues.push({
      careerId,
      careerName,
      field: "steps",
      message: `Career must have between 5 and 8 steps (found ${career.steps?.length || 0})`
    });
  } else {
    career.steps.forEach((step, idx) => {
      const stepLabel = `Step ${idx + 1} (${step?.id || "unnamed"})`;
      if (!step.id) {
        issues.push({ careerId, careerName, field: `${stepLabel}.id`, message: "Step id is required" });
      }
      if (!step.title || !step.title.trim()) {
        issues.push({ careerId, careerName, field: `${stepLabel}.title`, message: "Step title is required and cannot be empty" });
      }
      if (!step.detail || !step.detail.trim()) {
        issues.push({ careerId, careerName, field: `${stepLabel}.detail`, message: "Step detail is required and cannot be empty" });
      }
      if (!ALLOWED_DETAIL_KINDS.has(step.detailKind)) {
        issues.push({
          careerId,
          careerName,
          field: `${stepLabel}.detailKind`,
          message: `Invalid detailKind "${step.detailKind}". Allowed: exam, course, licence, skill, milestone`
        });
      }
      if (step.lastReviewed) {
        const stepDate = new Date(step.lastReviewed);
        if (isNaN(stepDate.getTime())) {
          issues.push({ careerId, careerName, field: `${stepLabel}.lastReviewed`, message: "Step lastReviewed is invalid" });
        }
      }
    });
  }

  return issues;
}

export function validateAllCareers(careers: Career[], referenceDate: Date = new Date()): ValidationIssue[] {
  const allIssues: ValidationIssue[] = [];
  careers.forEach((career) => {
    const issues = validateCareer(career, referenceDate);
    allIssues.push(...issues);
  });
  return allIssues;
}

export function assertValidCareers(careers: Career[], referenceDate: Date = new Date()): void {
  const issues = validateAllCareers(careers, referenceDate);
  if (issues.length > 0) {
    const formatted = issues.map(i => `[${i.careerName}] ${i.field}: ${i.message}`).join("\n");
    throw new Error(`Roadmap career validation failed with ${issues.length} issue(s):\n${formatted}`);
  }
}
