-- FutureForge seed data for scholarship recommendations

INSERT INTO users (id, firebase_uid, email, full_name, role, is_active)
VALUES
	(1, 'demo-student-tn-bc-male', 'student1@futureforge.local', 'Arun Kumar', 'STUDENT', TRUE),
	(2, 'demo-student-tn-sc-female', 'student2@futureforge.local', 'Divya S', 'STUDENT', TRUE),
	(3, 'demo-student-kl-general-male', 'student3@futureforge.local', 'Rahul Nair', 'STUDENT', TRUE),
	(4, 'demo-student-tn-mbc-female', 'student4@futureforge.local', 'Meena P', 'STUDENT', TRUE)
ON CONFLICT (id) DO UPDATE
SET firebase_uid = EXCLUDED.firebase_uid,
	email = EXCLUDED.email,
	full_name = EXCLUDED.full_name,
	role = EXCLUDED.role,
	is_active = EXCLUDED.is_active;

INSERT INTO profiles (
	user_id,
	education_level,
	marks,
	state,
	community,
	gender,
	family_income,
	has_disability,
	skills,
	interests,
	budget,
	preferred_location,
	career_goal,
	learning_style,
	languages,
	financial_background,
	hostel_requirement,
	gov_or_private
)
VALUES
	(
		1, 'UG', 92, 'Tamil Nadu', 'BC', 'Male', 150000, FALSE,
		'["Communication", "Leadership"]'::json,
		'["Engineering", "Technology"]'::json,
		120000, 'Tamil Nadu', 'Software Engineer', 'Practical',
		'["Tamil", "English"]'::json, 'Middle Income', FALSE, 'Both'
	),
	(
		2, 'UG', 78, 'Tamil Nadu', 'SC', 'Female', 90000, FALSE,
		'["Public Speaking", "Community Work"]'::json,
		'["Education", "Social Impact"]'::json,
		100000, 'Tamil Nadu', 'Teacher', 'Visual',
		'["Tamil", "English"]'::json, 'Low Income', FALSE, 'Government'
	),
	(
		3, 'PG', 85, 'Kerala', 'General', 'Male', 600000, FALSE,
		'["Research", "Analytics"]'::json,
		'["Data Science", "Management"]'::json,
		250000, 'Kerala', 'Research Analyst', 'Analytical',
		'["Malayalam", "English"]'::json, 'Upper Middle Income', FALSE, 'Both'
	),
	(
		4, 'UG', 95, 'Tamil Nadu', 'MBC', 'Female', 80000, TRUE,
		'["Design", "Leadership"]'::json,
		'["Computer Science", "Entrepreneurship"]'::json,
		90000, 'Tamil Nadu', 'Product Designer', 'Project Based',
		'["Tamil", "English"]'::json, 'Low Income', TRUE, 'Both'
	)
ON CONFLICT (user_id) DO UPDATE
SET education_level = EXCLUDED.education_level,
	marks = EXCLUDED.marks,
	state = EXCLUDED.state,
	community = EXCLUDED.community,
	gender = EXCLUDED.gender,
	family_income = EXCLUDED.family_income,
	has_disability = EXCLUDED.has_disability,
	skills = EXCLUDED.skills,
	interests = EXCLUDED.interests,
	budget = EXCLUDED.budget,
	preferred_location = EXCLUDED.preferred_location,
	career_goal = EXCLUDED.career_goal,
	learning_style = EXCLUDED.learning_style,
	languages = EXCLUDED.languages,
	financial_background = EXCLUDED.financial_background,
	hostel_requirement = EXCLUDED.hostel_requirement,
	gov_or_private = EXCLUDED.gov_or_private;

INSERT INTO scholarships (
	id,
	title,
	description,
	provider,
	amount,
	income_limit,
	minimum_marks,
	community,
	gender,
	state,
	education_level,
	disability_required,
	eligible_courses,
	official_link,
	deadline,
	is_active
)
VALUES
	(1, 'Central Post Matric Scholarship', 'Support for post-matric education for eligible central schemes.', 'Government of India', 12000, 250000, 60, 'SC/ST', 'Any', 'ALL', 'UG/PG', FALSE, '["UG", "PG"]'::json, 'https://scholarships.gov.in', TIMESTAMP '2026-09-30 23:59:59', TRUE),
	(2, 'Central Sector Merit Scholarship', 'Merit-based support for students pursuing higher studies.', 'Ministry of Education', 20000, 800000, 80, 'ALL', 'Any', 'ALL', 'UG', FALSE, '["UG"]'::json, 'https://scholarships.gov.in', TIMESTAMP '2026-10-15 23:59:59', TRUE),
	(3, 'National Means Cum Merit Scholarship', 'Merit scholarship for bright students from economically weaker families.', 'Government of India', 10000, 300000, 70, 'ALL', 'Any', 'ALL', 'UG', FALSE, '["UG"]'::json, 'https://scholarships.gov.in', TIMESTAMP '2026-08-31 23:59:59', TRUE),
	(4, 'Tamil Nadu BC/MBC Merit Scholarship', 'Higher education scholarship for BC and MBC students in Tamil Nadu.', 'Tamil Nadu Government', 15000, 250000, 80, 'BC/MBC', 'Any', 'Tamil Nadu', 'UG', FALSE, '["UG"]'::json, 'https://scholarships.tn.gov.in', TIMESTAMP '2026-09-15 23:59:59', TRUE),
	(5, 'Tamil Nadu SC Higher Education Scholarship', 'Scholarship for SC students pursuing undergraduate education.', 'Tamil Nadu Adi Dravidar Welfare Department', 18000, 300000, 70, 'SC', 'Any', 'Tamil Nadu', 'UG', FALSE, '["UG"]'::json, 'https://scholarships.tn.gov.in', TIMESTAMP '2026-09-20 23:59:59', TRUE),
	(6, 'Tamil Nadu MBC Education Assistance', 'Assistance for MBC students enrolled in professional courses.', 'Tamil Nadu Government', 16000, 250000, 75, 'MBC', 'Any', 'Tamil Nadu', 'UG', FALSE, '["UG"]'::json, 'https://scholarships.tn.gov.in', TIMESTAMP '2026-10-05 23:59:59', TRUE),
	(7, 'Tamil Nadu Minority Merit Scholarship', 'Merit support for minority students in Tamil Nadu.', 'Tamil Nadu Minorities Welfare Department', 14000, 250000, 75, 'Minority', 'Any', 'Tamil Nadu', 'UG/PG', FALSE, '["UG", "PG"]'::json, 'https://scholarships.tn.gov.in', TIMESTAMP '2026-10-12 23:59:59', TRUE),
	(8, 'Tamil Nadu Girls Higher Education Scholarship', 'Encourages female students to continue higher education.', 'Tamil Nadu Government', 20000, 300000, 70, 'ALL', 'Female', 'Tamil Nadu', 'UG', FALSE, '["UG"]'::json, 'https://scholarships.tn.gov.in', TIMESTAMP '2026-09-25 23:59:59', TRUE),
	(9, 'Tamil Nadu Differently Abled Student Scholarship', 'Scholarship for differently abled students pursuing college education.', 'Tamil Nadu Government', 25000, 300000, 65, 'ALL', 'Any', 'Tamil Nadu', 'UG/PG', TRUE, '["UG", "PG"]'::json, 'https://scholarships.tn.gov.in', TIMESTAMP '2026-10-30 23:59:59', TRUE),
	(10, 'Pre-Matric Minority Scholarship', 'Financial support for minority communities.', 'Ministry of Minority Affairs', 9000, 200000, 70, 'Minority', 'Any', 'ALL', 'UG', FALSE, '["UG"]'::json, 'https://scholarships.gov.in', TIMESTAMP '2026-08-20 23:59:59', TRUE),
	(11, 'Post Matric SC Scholarship', 'Post-matric scholarship for SC students.', 'Government of India', 11000, 250000, 60, 'SC', 'Any', 'ALL', 'UG/PG', FALSE, '["UG", "PG"]'::json, 'https://scholarships.gov.in', TIMESTAMP '2026-10-01 23:59:59', TRUE),
	(12, 'Post Matric ST Scholarship', 'Post-matric scholarship for ST students.', 'Government of India', 11000, 250000, 60, 'ST', 'Any', 'ALL', 'UG/PG', FALSE, '["UG", "PG"]'::json, 'https://scholarships.gov.in', TIMESTAMP '2026-10-01 23:59:59', TRUE),
	(13, 'Backward Class Higher Education Award', 'Financial aid for BC students in degree programs.', 'State Welfare Board', 13000, 250000, 80, 'BC', 'Any', 'Tamil Nadu', 'UG', FALSE, '["UG"]'::json, 'https://scholarships.tn.gov.in', TIMESTAMP '2026-09-18 23:59:59', TRUE),
	(14, 'First Graduate Scholarship', 'Support for first-generation graduates.', 'Tamil Nadu Government', 25000, 400000, 70, 'ALL', 'Any', 'Tamil Nadu', 'UG', FALSE, '["UG"]'::json, 'https://scholarships.tn.gov.in', TIMESTAMP '2026-11-01 23:59:59', TRUE),
	(15, 'Merit Cum Means Scholarship', 'Merit and income-based scholarship for professional education.', 'Government of India', 15000, 600000, 75, 'ALL', 'Any', 'ALL', 'UG/PG', FALSE, '["UG", "PG"]'::json, 'https://scholarships.gov.in', TIMESTAMP '2026-09-12 23:59:59', TRUE),
	(16, 'Pragati Scholarship for Girls', 'Scholarship for girl students in technical education.', 'AICTE', 50000, 800000, 75, 'ALL', 'Female', 'ALL', 'UG', FALSE, '["UG"]'::json, 'https://scholarships.aicte-india.org', TIMESTAMP '2026-08-30 23:59:59', TRUE),
	(17, 'Saksham Scholarship for Differently Abled Students', 'Support for differently abled students in AICTE-approved courses.', 'AICTE', 50000, 800000, 60, 'ALL', 'Any', 'ALL', 'UG', TRUE, '["UG"]'::json, 'https://scholarships.aicte-india.org', TIMESTAMP '2026-08-30 23:59:59', TRUE),
	(18, 'Kalpana Chawla Girls Scholarship', 'Encourages girls to pursue STEM education.', 'Private CSR Foundation', 30000, 700000, 80, 'ALL', 'Female', 'ALL', 'UG', FALSE, '["UG"]'::json, 'https://example.org', TIMESTAMP '2026-09-10 23:59:59', TRUE),
	(19, 'Economically Weaker Sections Support Scholarship', 'Broad support for students from economically weaker families.', 'Private Trust', 12000, 500000, 75, 'ALL', 'Any', 'ALL', 'UG/PG', FALSE, '["UG", "PG"]'::json, 'https://example.org', TIMESTAMP '2026-10-20 23:59:59', TRUE),
	(20, 'Kerala State Merit Scholarship', 'Merit scholarship for Kerala students in higher education.', 'Kerala Higher Education Council', 22000, 700000, 80, 'ALL', 'Any', 'Kerala', 'PG', FALSE, '["PG"]'::json, 'https://scholarship.kerala.gov.in', TIMESTAMP '2026-10-25 23:59:59', TRUE),
	(21, 'Tamil Nadu General Merit Scholarship', 'General merit award for Tamil Nadu students.', 'Tamil Nadu Government', 10000, 350000, 85, 'ALL', 'Any', 'Tamil Nadu', 'UG', FALSE, '["UG"]'::json, 'https://scholarships.tn.gov.in', TIMESTAMP '2026-09-28 23:59:59', TRUE),
	(22, 'Minority Girls Education Scholarship', 'Higher education scholarship for minority girl students.', 'Ministry of Minority Affairs', 18000, 300000, 70, 'Minority', 'Female', 'ALL', 'UG', FALSE, '["UG"]'::json, 'https://scholarships.gov.in', TIMESTAMP '2026-08-28 23:59:59', TRUE),
	(23, 'Rural Talent Support Scholarship', 'Scholarship for high-performing students from rural backgrounds.', 'CSR Initiative', 15000, 400000, 85, 'ALL', 'Any', 'ALL', 'UG/PG', FALSE, '["UG", "PG"]'::json, 'https://example.org', TIMESTAMP '2026-09-22 23:59:59', TRUE),
	(24, 'Dr. Ambedkar Scholarship', 'Financial support for SC students in professional courses.', 'State Government', 20000, 300000, 70, 'SC', 'Any', 'Tamil Nadu', 'UG/PG', FALSE, '["UG", "PG"]'::json, 'https://scholarships.tn.gov.in', TIMESTAMP '2026-10-08 23:59:59', TRUE),
	(25, 'Higher Education Support Scholarship', 'Flexible support for students with strong academic records.', 'Educational Foundation', 12000, 750000, 80, 'ALL', 'Any', 'ALL', 'UG/PG', FALSE, '["UG", "PG"]'::json, 'https://example.org', TIMESTAMP '2026-11-15 23:59:59', TRUE)
ON CONFLICT (id) DO UPDATE
SET title = EXCLUDED.title,
	description = EXCLUDED.description,
	provider = EXCLUDED.provider,
	amount = EXCLUDED.amount,
	income_limit = EXCLUDED.income_limit,
	minimum_marks = EXCLUDED.minimum_marks,
	community = EXCLUDED.community,
	gender = EXCLUDED.gender,
	state = EXCLUDED.state,
	education_level = EXCLUDED.education_level,
	disability_required = EXCLUDED.disability_required,
	eligible_courses = EXCLUDED.eligible_courses,
	official_link = EXCLUDED.official_link,
	deadline = EXCLUDED.deadline,
	is_active = EXCLUDED.is_active;
