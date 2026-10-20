import rawCareers from "./careers.json";
import { Career } from "./roadmapTypes";
import { assertValidCareers } from "./roadmapValidation";

// Validate all careers at load time: fails the build/app if any career has < 5 or > 8 steps,
// missing title/detail, or review date older than 12 months.
const validatedCareers: Career[] = rawCareers as unknown as Career[];

// Run assertion (reference date set to current date)
assertValidCareers(validatedCareers);

export const CAREERS: Career[] = validatedCareers;
export default CAREERS;
