--
-- PostgreSQL database dump
--

\restrict Sg3x67pplT4tAsBSfZLkMPadenffK2U2WcRUe0uioeZwEhL7nezDhSscWgDXAKF

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: roleenum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.roleenum AS ENUM (
    'STUDENT',
    'ADMIN'
);


ALTER TYPE public.roleenum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- Name: assessment_responses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessment_responses (
    id integer NOT NULL,
    assessment_id integer,
    question_id integer,
    selected_option integer,
    score double precision
);


ALTER TABLE public.assessment_responses OWNER TO postgres;

--
-- Name: assessment_responses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assessment_responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assessment_responses_id_seq OWNER TO postgres;

--
-- Name: assessment_responses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assessment_responses_id_seq OWNED BY public.assessment_responses.id;


--
-- Name: assessments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessments (
    id integer NOT NULL,
    user_id integer,
    score double precision,
    responses json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.assessments OWNER TO postgres;

--
-- Name: assessments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assessments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assessments_id_seq OWNER TO postgres;

--
-- Name: assessments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assessments_id_seq OWNED BY public.assessments.id;


--
-- Name: career_dna; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.career_dna (
    id integer NOT NULL,
    user_id integer,
    analytical double precision,
    creativity double precision,
    leadership double precision,
    programming double precision,
    problem_solving double precision,
    communication double precision,
    critical_thinking double precision,
    teamwork double precision,
    entrepreneurship double precision,
    learning_ability double precision,
    generated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.career_dna OWNER TO postgres;

--
-- Name: career_dna_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.career_dna_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.career_dna_id_seq OWNER TO postgres;

--
-- Name: career_dna_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.career_dna_id_seq OWNED BY public.career_dna.id;


--
-- Name: career_skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.career_skills (
    id integer NOT NULL,
    career_id integer,
    skill_name character varying,
    importance double precision
);


ALTER TABLE public.career_skills OWNER TO postgres;

--
-- Name: career_skills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.career_skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.career_skills_id_seq OWNER TO postgres;

--
-- Name: career_skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.career_skills_id_seq OWNED BY public.career_skills.id;


--
-- Name: careers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.careers (
    id integer NOT NULL,
    title character varying,
    description text,
    avg_salary double precision,
    demand_score double precision,
    future_scope character varying,
    required_skills json
);


ALTER TABLE public.careers OWNER TO postgres;

--
-- Name: careers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.careers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.careers_id_seq OWNER TO postgres;

--
-- Name: careers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.careers_id_seq OWNED BY public.careers.id;


--
-- Name: chat_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_history (
    id integer NOT NULL,
    user_id integer,
    user_message text,
    ai_response text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.chat_history OWNER TO postgres;

--
-- Name: chat_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chat_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chat_history_id_seq OWNER TO postgres;

--
-- Name: chat_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chat_history_id_seq OWNED BY public.chat_history.id;


--
-- Name: colleges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colleges (
    id integer NOT NULL,
    name character varying,
    location character varying,
    latitude double precision,
    longitude double precision,
    avg_fees double precision,
    placement_rate double precision,
    has_hostel boolean,
    is_private boolean,
    ranking integer,
    courses json
);


ALTER TABLE public.colleges OWNER TO postgres;

--
-- Name: colleges_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colleges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colleges_id_seq OWNER TO postgres;

--
-- Name: colleges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colleges_id_seq OWNED BY public.colleges.id;


--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    name character varying,
    degree_level character varying,
    duration character varying,
    description text
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.courses_id_seq OWNER TO postgres;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    user_id integer,
    title character varying,
    message text,
    is_read boolean,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id integer NOT NULL,
    user_id integer,
    education_level character varying,
    marks double precision,
    state character varying,
    community character varying,
    gender character varying,
    family_income double precision,
    has_disability boolean,
    skills json,
    interests json,
    budget double precision,
    preferred_location character varying,
    career_goal character varying,
    learning_style character varying,
    languages json,
    financial_background character varying,
    hostel_requirement boolean,
    gov_or_private character varying
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profiles_id_seq OWNER TO postgres;

--
-- Name: profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;


--
-- Name: question_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question_categories (
    id integer NOT NULL,
    name character varying
);


ALTER TABLE public.question_categories OWNER TO postgres;

--
-- Name: question_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.question_categories_id_seq OWNER TO postgres;

--
-- Name: question_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_categories_id_seq OWNED BY public.question_categories.id;


--
-- Name: question_options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question_options (
    id integer NOT NULL,
    question_id integer,
    option_text text,
    is_correct boolean
);


ALTER TABLE public.question_options OWNER TO postgres;

--
-- Name: question_options_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.question_options_id_seq OWNER TO postgres;

--
-- Name: question_options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_options_id_seq OWNED BY public.question_options.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    category_id integer,
    question text,
    difficulty character varying,
    education_level character varying,
    marks integer
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: recommendations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recommendations (
    id integer NOT NULL,
    user_id integer,
    career_id integer,
    confidence_score double precision,
    explanation text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.recommendations OWNER TO postgres;

--
-- Name: recommendations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recommendations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recommendations_id_seq OWNER TO postgres;

--
-- Name: recommendations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recommendations_id_seq OWNED BY public.recommendations.id;


--
-- Name: roadmaps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roadmaps (
    id integer NOT NULL,
    career_id integer,
    title character varying,
    description text,
    steps json
);


ALTER TABLE public.roadmaps OWNER TO postgres;

--
-- Name: roadmaps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roadmaps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roadmaps_id_seq OWNER TO postgres;

--
-- Name: roadmaps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roadmaps_id_seq OWNED BY public.roadmaps.id;


--
-- Name: saved_careers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_careers (
    id integer NOT NULL,
    user_id integer,
    career_id integer,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.saved_careers OWNER TO postgres;

--
-- Name: saved_careers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saved_careers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saved_careers_id_seq OWNER TO postgres;

--
-- Name: saved_careers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saved_careers_id_seq OWNED BY public.saved_careers.id;


--
-- Name: saved_colleges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_colleges (
    id integer NOT NULL,
    user_id integer,
    college_id integer,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.saved_colleges OWNER TO postgres;

--
-- Name: saved_colleges_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saved_colleges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saved_colleges_id_seq OWNER TO postgres;

--
-- Name: saved_colleges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saved_colleges_id_seq OWNED BY public.saved_colleges.id;


--
-- Name: scholarship_bookmarks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scholarship_bookmarks (
    id integer NOT NULL,
    user_id integer NOT NULL,
    scholarship_id integer NOT NULL,
    status character varying,
    notes character varying,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.scholarship_bookmarks OWNER TO postgres;

--
-- Name: scholarship_bookmarks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scholarship_bookmarks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scholarship_bookmarks_id_seq OWNER TO postgres;

--
-- Name: scholarship_bookmarks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scholarship_bookmarks_id_seq OWNED BY public.scholarship_bookmarks.id;


--
-- Name: scholarship_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scholarship_documents (
    id integer NOT NULL,
    profile_id integer NOT NULL,
    document_type character varying NOT NULL,
    file_name character varying NOT NULL,
    file_url character varying NOT NULL,
    uploaded_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.scholarship_documents OWNER TO postgres;

--
-- Name: scholarship_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scholarship_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scholarship_documents_id_seq OWNER TO postgres;

--
-- Name: scholarship_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scholarship_documents_id_seq OWNED BY public.scholarship_documents.id;


--
-- Name: scholarship_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scholarship_profiles (
    id integer NOT NULL,
    user_id integer NOT NULL,
    academic_stage character varying NOT NULL,
    current_course character varying,
    current_year integer,
    state character varying,
    district character varying,
    community character varying,
    gender character varying,
    nationality character varying,
    annual_family_income double precision,
    parent_occupation character varying,
    percentage_cgpa double precision,
    has_disability boolean,
    is_first_graduate boolean,
    is_hosteller boolean,
    is_government_institution boolean,
    is_orphan boolean,
    is_single_girl_child boolean,
    is_minority boolean,
    institution_name character varying,
    university character varying,
    institution_type character varying,
    additional_info text,
    profile_completion double precision,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.scholarship_profiles OWNER TO postgres;

--
-- Name: scholarship_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scholarship_profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scholarship_profiles_id_seq OWNER TO postgres;

--
-- Name: scholarship_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scholarship_profiles_id_seq OWNED BY public.scholarship_profiles.id;


--
-- Name: scholarship_recommendation_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scholarship_recommendation_history (
    id integer NOT NULL,
    user_id integer NOT NULL,
    scholarship_id integer NOT NULL,
    match_score double precision,
    eligibility_status character varying,
    recommendation_reasons json,
    generated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.scholarship_recommendation_history OWNER TO postgres;

--
-- Name: scholarship_recommendation_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scholarship_recommendation_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scholarship_recommendation_history_id_seq OWNER TO postgres;

--
-- Name: scholarship_recommendation_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scholarship_recommendation_history_id_seq OWNED BY public.scholarship_recommendation_history.id;


--
-- Name: scholarships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scholarships (
    id integer NOT NULL,
    title character varying NOT NULL,
    description text,
    provider character varying,
    amount double precision NOT NULL,
    income_limit double precision,
    minimum_marks double precision,
    community character varying,
    gender character varying,
    state character varying,
    education_level character varying,
    disability_required boolean,
    is_active boolean,
    eligible_courses json,
    official_link character varying,
    deadline timestamp without time zone,
    scholarship_type character varying,
    country character varying DEFAULT 'India'::character varying,
    course_level character varying,
    course_name character varying,
    minimum_percentage double precision,
    maximum_family_income double precision,
    age_min integer,
    age_max integer,
    application_start_date timestamp without time zone,
    application_end_date timestamp without time zone,
    official_url character varying,
    official_notification_url character varying,
    source character varying,
    last_synced timestamp with time zone,
    status character varying DEFAULT 'active'::character varying,
    required_documents json,
    eligibility_summary text,
    application_mode character varying,
    renewal_available boolean DEFAULT false,
    contact_information json,
    faq_url character varying,
    application_policy character varying,
    compatible_with_other_schemes character varying,
    restrictions_on_combining text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    benefits text,
    selection_process text
);


ALTER TABLE public.scholarships OWNER TO postgres;

--
-- Name: scholarships_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scholarships_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scholarships_id_seq OWNER TO postgres;

--
-- Name: scholarships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scholarships_id_seq OWNED BY public.scholarships.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    firebase_uid character varying,
    email character varying,
    full_name character varying,
    role public.roleenum,
    is_active boolean,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: assessment_responses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_responses ALTER COLUMN id SET DEFAULT nextval('public.assessment_responses_id_seq'::regclass);


--
-- Name: assessments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments ALTER COLUMN id SET DEFAULT nextval('public.assessments_id_seq'::regclass);


--
-- Name: career_dna id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_dna ALTER COLUMN id SET DEFAULT nextval('public.career_dna_id_seq'::regclass);


--
-- Name: career_skills id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_skills ALTER COLUMN id SET DEFAULT nextval('public.career_skills_id_seq'::regclass);


--
-- Name: careers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.careers ALTER COLUMN id SET DEFAULT nextval('public.careers_id_seq'::regclass);


--
-- Name: chat_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_history ALTER COLUMN id SET DEFAULT nextval('public.chat_history_id_seq'::regclass);


--
-- Name: colleges id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colleges ALTER COLUMN id SET DEFAULT nextval('public.colleges_id_seq'::regclass);


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: profiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);


--
-- Name: question_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_categories ALTER COLUMN id SET DEFAULT nextval('public.question_categories_id_seq'::regclass);


--
-- Name: question_options id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_options ALTER COLUMN id SET DEFAULT nextval('public.question_options_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: recommendations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations ALTER COLUMN id SET DEFAULT nextval('public.recommendations_id_seq'::regclass);


--
-- Name: roadmaps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roadmaps ALTER COLUMN id SET DEFAULT nextval('public.roadmaps_id_seq'::regclass);


--
-- Name: saved_careers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_careers ALTER COLUMN id SET DEFAULT nextval('public.saved_careers_id_seq'::regclass);


--
-- Name: saved_colleges id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_colleges ALTER COLUMN id SET DEFAULT nextval('public.saved_colleges_id_seq'::regclass);


--
-- Name: scholarship_bookmarks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_bookmarks ALTER COLUMN id SET DEFAULT nextval('public.scholarship_bookmarks_id_seq'::regclass);


--
-- Name: scholarship_documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_documents ALTER COLUMN id SET DEFAULT nextval('public.scholarship_documents_id_seq'::regclass);


--
-- Name: scholarship_profiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_profiles ALTER COLUMN id SET DEFAULT nextval('public.scholarship_profiles_id_seq'::regclass);


--
-- Name: scholarship_recommendation_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_recommendation_history ALTER COLUMN id SET DEFAULT nextval('public.scholarship_recommendation_history_id_seq'::regclass);


--
-- Name: scholarships id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarships ALTER COLUMN id SET DEFAULT nextval('public.scholarships_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
ddc30acab191
\.


--
-- Data for Name: assessment_responses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assessment_responses (id, assessment_id, question_id, selected_option, score) FROM stdin;
\.


--
-- Data for Name: assessments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assessments (id, user_id, score, responses, created_at) FROM stdin;
\.


--
-- Data for Name: career_dna; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.career_dna (id, user_id, analytical, creativity, leadership, programming, problem_solving, communication, critical_thinking, teamwork, entrepreneurship, learning_ability, generated_at) FROM stdin;
\.


--
-- Data for Name: career_skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.career_skills (id, career_id, skill_name, importance) FROM stdin;
\.


--
-- Data for Name: careers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.careers (id, title, description, avg_salary, demand_score, future_scope, required_skills) FROM stdin;
\.


--
-- Data for Name: chat_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_history (id, user_id, user_message, ai_response, created_at) FROM stdin;
\.


--
-- Data for Name: colleges; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colleges (id, name, location, latitude, longitude, avg_fees, placement_rate, has_hostel, is_private, ranking, courses) FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, name, degree_level, duration, description) FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, user_id, title, message, is_read, created_at) FROM stdin;
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, user_id, education_level, marks, state, community, gender, family_income, has_disability, skills, interests, budget, preferred_location, career_goal, learning_style, languages, financial_background, hostel_requirement, gov_or_private) FROM stdin;
1	1	UG	92	Tamil Nadu	BC	Male	150000	f	["Communication", "Leadership"]	["Engineering", "Technology"]	120000	Tamil Nadu	Software Engineer	Practical	["Tamil", "English"]	Middle Income	f	Both
2	2	UG	78	Tamil Nadu	SC	Female	90000	f	["Public Speaking", "Community Work"]	["Education", "Social Impact"]	100000	Tamil Nadu	Teacher	Visual	["Tamil", "English"]	Low Income	f	Government
3	3	PG	85	Kerala	General	Male	600000	f	["Research", "Analytics"]	["Data Science", "Management"]	250000	Kerala	Research Analyst	Analytical	["Malayalam", "English"]	Upper Middle Income	f	Both
4	4	UG	95	Tamil Nadu	MBC	Female	80000	t	["Design", "Leadership"]	["Computer Science", "Entrepreneurship"]	90000	Tamil Nadu	Product Designer	Project Based	["Tamil", "English"]	Low Income	t	Both
\.


--
-- Data for Name: question_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question_categories (id, name) FROM stdin;
\.


--
-- Data for Name: question_options; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question_options (id, question_id, option_text, is_correct) FROM stdin;
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, category_id, question, difficulty, education_level, marks) FROM stdin;
\.


--
-- Data for Name: recommendations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recommendations (id, user_id, career_id, confidence_score, explanation, created_at) FROM stdin;
\.


--
-- Data for Name: roadmaps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roadmaps (id, career_id, title, description, steps) FROM stdin;
\.


--
-- Data for Name: saved_careers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saved_careers (id, user_id, career_id, created_at) FROM stdin;
\.


--
-- Data for Name: saved_colleges; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saved_colleges (id, user_id, college_id, created_at) FROM stdin;
\.


--
-- Data for Name: scholarship_bookmarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scholarship_bookmarks (id, user_id, scholarship_id, status, notes, created_at) FROM stdin;
\.


--
-- Data for Name: scholarship_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scholarship_documents (id, profile_id, document_type, file_name, file_url, uploaded_at) FROM stdin;
\.


--
-- Data for Name: scholarship_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scholarship_profiles (id, user_id, academic_stage, current_course, current_year, state, district, community, gender, nationality, annual_family_income, parent_occupation, percentage_cgpa, has_disability, is_first_graduate, is_hosteller, is_government_institution, is_orphan, is_single_girl_child, is_minority, institution_name, university, institution_type, additional_info, profile_completion, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: scholarship_recommendation_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scholarship_recommendation_history (id, user_id, scholarship_id, match_score, eligibility_status, recommendation_reasons, generated_at) FROM stdin;
\.


--
-- Data for Name: scholarships; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scholarships (id, title, description, provider, amount, income_limit, minimum_marks, community, gender, state, education_level, disability_required, is_active, eligible_courses, official_link, deadline, scholarship_type, country, course_level, course_name, minimum_percentage, maximum_family_income, age_min, age_max, application_start_date, application_end_date, official_url, official_notification_url, source, last_synced, status, required_documents, eligibility_summary, application_mode, renewal_available, contact_information, faq_url, application_policy, compatible_with_other_schemes, restrictions_on_combining, created_at, updated_at, benefits, selection_process) FROM stdin;
1	Central Post Matric Scholarship	Support for post-matric education for eligible central schemes.	Government of India	12000	250000	60	SC/ST	Any	ALL	UG/PG	f	t	["UG", "PG"]	https://scholarships.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
2	Central Sector Merit Scholarship	Merit-based support for students pursuing higher studies.	Ministry of Education	20000	800000	80	ALL	Any	ALL	UG	f	t	["UG"]	https://scholarships.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
3	National Means Cum Merit Scholarship	Merit scholarship for bright students from economically weaker families.	Government of India	10000	300000	70	ALL	Any	ALL	UG	f	t	["UG"]	https://scholarships.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
4	Tamil Nadu BC/MBC Merit Scholarship	Higher education scholarship for BC and MBC students in Tamil Nadu.	Tamil Nadu Government	15000	250000	80	BC/MBC	Any	Tamil Nadu	UG	f	t	["UG"]	https://scholarships.tn.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
5	Tamil Nadu SC Higher Education Scholarship	Scholarship for SC students pursuing undergraduate education.	Tamil Nadu Adi Dravidar Welfare Department	18000	300000	70	SC	Any	Tamil Nadu	UG	f	t	["UG"]	https://scholarships.tn.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
6	Tamil Nadu MBC Education Assistance	Assistance for MBC students enrolled in professional courses.	Tamil Nadu Government	16000	250000	75	MBC	Any	Tamil Nadu	UG	f	t	["UG"]	https://scholarships.tn.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
7	Tamil Nadu Minority Merit Scholarship	Merit support for minority students in Tamil Nadu.	Tamil Nadu Minorities Welfare Department	14000	250000	75	Minority	Any	Tamil Nadu	UG/PG	f	t	["UG", "PG"]	https://scholarships.tn.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
8	Tamil Nadu Girls Higher Education Scholarship	Encourages female students to continue higher education.	Tamil Nadu Government	20000	300000	70	ALL	Female	Tamil Nadu	UG	f	t	["UG"]	https://scholarships.tn.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
9	Tamil Nadu Differently Abled Student Scholarship	Scholarship for differently abled students pursuing college education.	Tamil Nadu Government	25000	300000	65	ALL	Any	Tamil Nadu	UG/PG	t	t	["UG", "PG"]	https://scholarships.tn.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
10	Pre-Matric Minority Scholarship	Financial support for minority communities.	Ministry of Minority Affairs	9000	200000	70	Minority	Any	ALL	UG	f	t	["UG"]	https://scholarships.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
11	Post Matric SC Scholarship	Post-matric scholarship for SC students.	Government of India	11000	250000	60	SC	Any	ALL	UG/PG	f	t	["UG", "PG"]	https://scholarships.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
12	Post Matric ST Scholarship	Post-matric scholarship for ST students.	Government of India	11000	250000	60	ST	Any	ALL	UG/PG	f	t	["UG", "PG"]	https://scholarships.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
13	Backward Class Higher Education Award	Financial aid for BC students in degree programs.	State Welfare Board	13000	250000	80	BC	Any	Tamil Nadu	UG	f	t	["UG"]	https://scholarships.tn.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
14	First Graduate Scholarship	Support for first-generation graduates.	Tamil Nadu Government	25000	400000	70	ALL	Any	Tamil Nadu	UG	f	t	["UG"]	https://scholarships.tn.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
15	Merit Cum Means Scholarship	Merit and income-based scholarship for professional education.	Government of India	15000	600000	75	ALL	Any	ALL	UG/PG	f	t	["UG", "PG"]	https://scholarships.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
16	Pragati Scholarship for Girls	Scholarship for girl students in technical education.	AICTE	50000	800000	75	ALL	Female	ALL	UG	f	t	["UG"]	https://scholarships.aicte-india.org	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
17	Saksham Scholarship for Differently Abled Students	Support for differently abled students in AICTE-approved courses.	AICTE	50000	800000	60	ALL	Any	ALL	UG	t	t	["UG"]	https://scholarships.aicte-india.org	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
18	Kalpana Chawla Girls Scholarship	Encourages girls to pursue STEM education.	Private CSR Foundation	30000	700000	80	ALL	Female	ALL	UG	f	t	["UG"]	https://example.org	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
19	Economically Weaker Sections Support Scholarship	Broad support for students from economically weaker families.	Private Trust	12000	500000	75	ALL	Any	ALL	UG/PG	f	t	["UG", "PG"]	https://example.org	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
20	Kerala State Merit Scholarship	Merit scholarship for Kerala students in higher education.	Kerala Higher Education Council	22000	700000	80	ALL	Any	Kerala	PG	f	t	["PG"]	https://scholarship.kerala.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
21	Tamil Nadu General Merit Scholarship	General merit award for Tamil Nadu students.	Tamil Nadu Government	10000	350000	85	ALL	Any	Tamil Nadu	UG	f	t	["UG"]	https://scholarships.tn.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
22	Minority Girls Education Scholarship	Higher education scholarship for minority girl students.	Ministry of Minority Affairs	18000	300000	70	Minority	Female	ALL	UG	f	t	["UG"]	https://scholarships.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
23	Rural Talent Support Scholarship	Scholarship for high-performing students from rural backgrounds.	CSR Initiative	15000	400000	85	ALL	Any	ALL	UG/PG	f	t	["UG", "PG"]	https://example.org	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
24	Dr. Ambedkar Scholarship	Financial support for SC students in professional courses.	State Government	20000	300000	70	SC	Any	Tamil Nadu	UG/PG	f	t	["UG", "PG"]	https://scholarships.tn.gov.in	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
25	Higher Education Support Scholarship	Flexible support for students with strong academic records.	Educational Foundation	12000	750000	80	ALL	Any	ALL	UG/PG	f	t	["UG", "PG"]	https://example.org	\N	\N	India	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	active	\N	\N	\N	f	\N	\N	\N	\N	\N	2026-07-19 12:06:38.066387+05:30	2026-07-19 12:06:38.066387+05:30	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, firebase_uid, email, full_name, role, is_active, created_at) FROM stdin;
1	demo-student-tn-bc-male	student1@futureforge.local	Arun Kumar	STUDENT	t	2026-07-19 11:02:33.236082+05:30
2	demo-student-tn-sc-female	student2@futureforge.local	Divya S	STUDENT	t	2026-07-19 11:02:33.236082+05:30
3	demo-student-kl-general-male	student3@futureforge.local	Rahul Nair	STUDENT	t	2026-07-19 11:02:33.236082+05:30
4	demo-student-tn-mbc-female	student4@futureforge.local	Meena P	STUDENT	t	2026-07-19 11:02:33.236082+05:30
5	Bl0JcXCE0KhGTTDsvruDQhf8ACQ2	seeni10623@gmail.com		STUDENT	t	2026-07-25 23:28:32.636908+05:30
6	q5jfTW7jTjO5F6bNpbha4mo2yOX2	sathi29@mail.com		STUDENT	t	2026-07-25 23:35:41.768146+05:30
7	CnUo0FeNQuXel812MPfuG4M2zlo2	sathishsathi2127@gmail.com	Sathish M	STUDENT	t	2026-07-25 23:41:39.558711+05:30
\.


--
-- Name: assessment_responses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assessment_responses_id_seq', 1, false);


--
-- Name: assessments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assessments_id_seq', 1, false);


--
-- Name: career_dna_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.career_dna_id_seq', 1, false);


--
-- Name: career_skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.career_skills_id_seq', 1, false);


--
-- Name: careers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.careers_id_seq', 1, false);


--
-- Name: chat_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_history_id_seq', 1, false);


--
-- Name: colleges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colleges_id_seq', 1, false);


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_id_seq', 1, false);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 1, false);


--
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profiles_id_seq', 4, true);


--
-- Name: question_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_categories_id_seq', 1, false);


--
-- Name: question_options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_options_id_seq', 1, false);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 1, false);


--
-- Name: recommendations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recommendations_id_seq', 1, false);


--
-- Name: roadmaps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roadmaps_id_seq', 1, false);


--
-- Name: saved_careers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saved_careers_id_seq', 1, false);


--
-- Name: saved_colleges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saved_colleges_id_seq', 1, false);


--
-- Name: scholarship_bookmarks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scholarship_bookmarks_id_seq', 1, false);


--
-- Name: scholarship_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scholarship_documents_id_seq', 1, false);


--
-- Name: scholarship_profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scholarship_profiles_id_seq', 1, false);


--
-- Name: scholarship_recommendation_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scholarship_recommendation_history_id_seq', 1, false);


--
-- Name: scholarships_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scholarships_id_seq', 26, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: assessment_responses assessment_responses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_responses
    ADD CONSTRAINT assessment_responses_pkey PRIMARY KEY (id);


--
-- Name: assessments assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_pkey PRIMARY KEY (id);


--
-- Name: career_dna career_dna_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_dna
    ADD CONSTRAINT career_dna_pkey PRIMARY KEY (id);


--
-- Name: career_dna career_dna_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_dna
    ADD CONSTRAINT career_dna_user_id_key UNIQUE (user_id);


--
-- Name: career_skills career_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_skills
    ADD CONSTRAINT career_skills_pkey PRIMARY KEY (id);


--
-- Name: careers careers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.careers
    ADD CONSTRAINT careers_pkey PRIMARY KEY (id);


--
-- Name: chat_history chat_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_history
    ADD CONSTRAINT chat_history_pkey PRIMARY KEY (id);


--
-- Name: colleges colleges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colleges
    ADD CONSTRAINT colleges_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);


--
-- Name: question_categories question_categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_categories
    ADD CONSTRAINT question_categories_name_key UNIQUE (name);


--
-- Name: question_categories question_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_categories
    ADD CONSTRAINT question_categories_pkey PRIMARY KEY (id);


--
-- Name: question_options question_options_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_options
    ADD CONSTRAINT question_options_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: recommendations recommendations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_pkey PRIMARY KEY (id);


--
-- Name: roadmaps roadmaps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roadmaps
    ADD CONSTRAINT roadmaps_pkey PRIMARY KEY (id);


--
-- Name: saved_careers saved_careers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_careers
    ADD CONSTRAINT saved_careers_pkey PRIMARY KEY (id);


--
-- Name: saved_colleges saved_colleges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_colleges
    ADD CONSTRAINT saved_colleges_pkey PRIMARY KEY (id);


--
-- Name: scholarship_bookmarks scholarship_bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_bookmarks
    ADD CONSTRAINT scholarship_bookmarks_pkey PRIMARY KEY (id);


--
-- Name: scholarship_documents scholarship_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_documents
    ADD CONSTRAINT scholarship_documents_pkey PRIMARY KEY (id);


--
-- Name: scholarship_profiles scholarship_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_profiles
    ADD CONSTRAINT scholarship_profiles_pkey PRIMARY KEY (id);


--
-- Name: scholarship_profiles scholarship_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_profiles
    ADD CONSTRAINT scholarship_profiles_user_id_key UNIQUE (user_id);


--
-- Name: scholarship_recommendation_history scholarship_recommendation_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_recommendation_history
    ADD CONSTRAINT scholarship_recommendation_history_pkey PRIMARY KEY (id);


--
-- Name: scholarships scholarships_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarships
    ADD CONSTRAINT scholarships_pkey PRIMARY KEY (id);


--
-- Name: scholarship_bookmarks uq_user_scholarship_bookmark; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_bookmarks
    ADD CONSTRAINT uq_user_scholarship_bookmark UNIQUE (user_id, scholarship_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_assessment_responses_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_assessment_responses_id ON public.assessment_responses USING btree (id);


--
-- Name: ix_assessments_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_assessments_id ON public.assessments USING btree (id);


--
-- Name: ix_career_dna_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_career_dna_id ON public.career_dna USING btree (id);


--
-- Name: ix_career_skills_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_career_skills_id ON public.career_skills USING btree (id);


--
-- Name: ix_careers_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_careers_id ON public.careers USING btree (id);


--
-- Name: ix_careers_title; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_careers_title ON public.careers USING btree (title);


--
-- Name: ix_chat_history_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_chat_history_id ON public.chat_history USING btree (id);


--
-- Name: ix_colleges_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_colleges_id ON public.colleges USING btree (id);


--
-- Name: ix_colleges_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_colleges_name ON public.colleges USING btree (name);


--
-- Name: ix_courses_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_courses_id ON public.courses USING btree (id);


--
-- Name: ix_notifications_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_notifications_id ON public.notifications USING btree (id);


--
-- Name: ix_profiles_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_profiles_id ON public.profiles USING btree (id);


--
-- Name: ix_question_categories_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_question_categories_id ON public.question_categories USING btree (id);


--
-- Name: ix_question_options_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_question_options_id ON public.question_options USING btree (id);


--
-- Name: ix_questions_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_questions_id ON public.questions USING btree (id);


--
-- Name: ix_recommendations_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_recommendations_id ON public.recommendations USING btree (id);


--
-- Name: ix_roadmaps_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_roadmaps_id ON public.roadmaps USING btree (id);


--
-- Name: ix_saved_careers_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_saved_careers_id ON public.saved_careers USING btree (id);


--
-- Name: ix_saved_colleges_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_saved_colleges_id ON public.saved_colleges USING btree (id);


--
-- Name: ix_scholarship_bookmarks_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scholarship_bookmarks_id ON public.scholarship_bookmarks USING btree (id);


--
-- Name: ix_scholarship_bookmarks_scholarship_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scholarship_bookmarks_scholarship_id ON public.scholarship_bookmarks USING btree (scholarship_id);


--
-- Name: ix_scholarship_bookmarks_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scholarship_bookmarks_user_id ON public.scholarship_bookmarks USING btree (user_id);


--
-- Name: ix_scholarship_documents_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scholarship_documents_id ON public.scholarship_documents USING btree (id);


--
-- Name: ix_scholarship_documents_profile_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scholarship_documents_profile_id ON public.scholarship_documents USING btree (profile_id);


--
-- Name: ix_scholarship_profiles_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scholarship_profiles_id ON public.scholarship_profiles USING btree (id);


--
-- Name: ix_scholarship_recommendation_history_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scholarship_recommendation_history_id ON public.scholarship_recommendation_history USING btree (id);


--
-- Name: ix_scholarship_recommendation_history_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scholarship_recommendation_history_user_id ON public.scholarship_recommendation_history USING btree (user_id);


--
-- Name: ix_scholarships_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scholarships_id ON public.scholarships USING btree (id);


--
-- Name: ix_scholarships_is_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scholarships_is_active ON public.scholarships USING btree (is_active);


--
-- Name: ix_scholarships_source; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scholarships_source ON public.scholarships USING btree (source);


--
-- Name: ix_scholarships_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scholarships_status ON public.scholarships USING btree (status);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_firebase_uid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_firebase_uid ON public.users USING btree (firebase_uid);


--
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- Name: assessment_responses assessment_responses_assessment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_responses
    ADD CONSTRAINT assessment_responses_assessment_id_fkey FOREIGN KEY (assessment_id) REFERENCES public.assessments(id);


--
-- Name: assessment_responses assessment_responses_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_responses
    ADD CONSTRAINT assessment_responses_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id);


--
-- Name: assessment_responses assessment_responses_selected_option_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_responses
    ADD CONSTRAINT assessment_responses_selected_option_fkey FOREIGN KEY (selected_option) REFERENCES public.question_options(id);


--
-- Name: assessments assessments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: career_dna career_dna_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_dna
    ADD CONSTRAINT career_dna_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: career_skills career_skills_career_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.career_skills
    ADD CONSTRAINT career_skills_career_id_fkey FOREIGN KEY (career_id) REFERENCES public.careers(id);


--
-- Name: chat_history chat_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_history
    ADD CONSTRAINT chat_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: question_options question_options_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_options
    ADD CONSTRAINT question_options_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id);


--
-- Name: questions questions_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.question_categories(id);


--
-- Name: recommendations recommendations_career_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_career_id_fkey FOREIGN KEY (career_id) REFERENCES public.careers(id);


--
-- Name: recommendations recommendations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: roadmaps roadmaps_career_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roadmaps
    ADD CONSTRAINT roadmaps_career_id_fkey FOREIGN KEY (career_id) REFERENCES public.careers(id);


--
-- Name: saved_careers saved_careers_career_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_careers
    ADD CONSTRAINT saved_careers_career_id_fkey FOREIGN KEY (career_id) REFERENCES public.careers(id);


--
-- Name: saved_careers saved_careers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_careers
    ADD CONSTRAINT saved_careers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: saved_colleges saved_colleges_college_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_colleges
    ADD CONSTRAINT saved_colleges_college_id_fkey FOREIGN KEY (college_id) REFERENCES public.colleges(id);


--
-- Name: saved_colleges saved_colleges_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_colleges
    ADD CONSTRAINT saved_colleges_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: scholarship_bookmarks scholarship_bookmarks_scholarship_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_bookmarks
    ADD CONSTRAINT scholarship_bookmarks_scholarship_id_fkey FOREIGN KEY (scholarship_id) REFERENCES public.scholarships(id);


--
-- Name: scholarship_bookmarks scholarship_bookmarks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_bookmarks
    ADD CONSTRAINT scholarship_bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: scholarship_documents scholarship_documents_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_documents
    ADD CONSTRAINT scholarship_documents_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.scholarship_profiles(id);


--
-- Name: scholarship_profiles scholarship_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_profiles
    ADD CONSTRAINT scholarship_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: scholarship_recommendation_history scholarship_recommendation_history_scholarship_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_recommendation_history
    ADD CONSTRAINT scholarship_recommendation_history_scholarship_id_fkey FOREIGN KEY (scholarship_id) REFERENCES public.scholarships(id);


--
-- Name: scholarship_recommendation_history scholarship_recommendation_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_recommendation_history
    ADD CONSTRAINT scholarship_recommendation_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Sg3x67pplT4tAsBSfZLkMPadenffK2U2WcRUe0uioeZwEhL7nezDhSscWgDXAKF

