"""
Canonical CareerDNA Typed Schema.

Implements the typed canonical CareerDNA object defined in Section 9 of the
FutureForge specification, with strict Fact/Inference/Hypothesis evidence modeling,
uncertainty tracking, provenance, and longitudinal versioning.
"""
from typing import Optional, List, Dict, Any, Literal
from datetime import datetime, timezone
from pydantic import BaseModel, Field

from .career_dna_questionnaire_schema import (
    CLASS10_DOMAINS as C10_DOMAINS,
    QuestionOption,
    Question,
    AnswerRecord,
    QuestionnaireSession,
)


# Signal Types (Section 4)
ACADEMIC_SIGNAL = "ACADEMIC_SIGNAL"
INTEREST_SIGNAL = "INTEREST_SIGNAL"
APTITUDE_SIGNAL = "APTITUDE_SIGNAL"
SKILL_SIGNAL = "SKILL_SIGNAL"
EXPERIENCE_SIGNAL = "EXPERIENCE_SIGNAL"
VALUE_SIGNAL = "VALUE_SIGNAL"
PREFERENCE_SIGNAL = "PREFERENCE_SIGNAL"
GOAL_SIGNAL = "GOAL_SIGNAL"
CONSTRAINT_SIGNAL = "CONSTRAINT_SIGNAL"
BEHAVIORAL_SIGNAL = "BEHAVIORAL_SIGNAL"
EXPERIMENT_SIGNAL = "EXPERIMENT_SIGNAL"
INFERRED_SIGNAL = "INFERRED_SIGNAL"
UNKNOWN_SIGNAL = "UNKNOWN_SIGNAL"

# Evidence Levels (Section 5)
DIRECT_FACT = "DIRECT_FACT"
OBSERVED_EVIDENCE = "OBSERVED_EVIDENCE"
REPEATED_SELF_REPORT = "REPEATED_SELF_REPORT"
SINGLE_SELF_REPORT = "SINGLE_SELF_REPORT"
INFERENCE = "INFERENCE"
HYPOTHESIS = "HYPOTHESIS"
UNKNOWN_EVIDENCE = "UNKNOWN"


class SignalItem(BaseModel):
    """
    Typed Signal Model (Section 4 & 5).
    Every signal tracks type, value, source, evidenceLevel, confidence, timestamp, and provenance.
    """
    type: str = UNKNOWN_SIGNAL
    value: Any
    source: str = "user_self_report"
    evidenceLevel: str = SINGLE_SELF_REPORT
    confidence: float = 1.0
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    provenance: Optional[str] = None
    cluster: Optional[str] = None
    title: Optional[str] = None
    evidenceDescription: Optional[str] = None


class EvidenceItem(BaseModel):
    """
    Evidence model (Section 10 & 11).
    Every key signal tracks whether it is a FACT, INFERENCE, or HYPOTHESIS,
    its source, confidence level, and stability.
    """
    value: Any
    source: str = "user_self_report"  # academic_record, user_self_report, assessment, behavioral_task, project, work_history, user_correction, system_inference
    evidenceType: str = "FACT"  # FACT | INFERENCE | HYPOTHESIS
    confidence: float = 1.0  # 0.0 to 1.0
    recency: str = "current"
    stability: str = "stable"  # stable | evolving | tentative
    provenance: Optional[str] = None



class AcademicProfile(BaseModel):
    educationLevel: str = "unknown"
    stream: Optional[str] = None
    subjects: List[str] = Field(default_factory=list)
    marks: Dict[str, Any] = Field(default_factory=dict)
    grades: Dict[str, str] = Field(default_factory=dict)
    academicStrengths: List[str] = Field(default_factory=list)
    academicWeaknesses: List[str] = Field(default_factory=list)
    academicTrends: List[str] = Field(default_factory=list)
    academicEvidence: List[EvidenceItem] = Field(default_factory=list)


class AptitudeProfile(BaseModel):
    numerical: Optional[str] = None
    logical: Optional[str] = None
    verbal: Optional[str] = None
    abstract: Optional[str] = None
    spatial: Optional[str] = None
    dataInterpretation: Optional[str] = None
    problemSolving: Optional[str] = None
    evidence: List[EvidenceItem] = Field(default_factory=list)
    confidence: str = "tentative"  # high | moderate | tentative | insufficient


class InterestProfile(BaseModel):
    domains: List[str] = Field(default_factory=list)
    activities: List[str] = Field(default_factory=list)
    topics: List[str] = Field(default_factory=list)
    RIASEC: Dict[str, float] = Field(default_factory=dict)
    interestStrength: str = "moderate"  # high | moderate | exploratory
    evidence: List[EvidenceItem] = Field(default_factory=list)


class TransferableSkill(BaseModel):
    skill: str
    sourceEvidence: str
    confidence: str = "moderate"
    transferReason: str
    targetRelevance: str = "direct"  # direct | complementary | foundational


class SkillProfile(BaseModel):
    technical: List[str] = Field(default_factory=list)
    domain: List[str] = Field(default_factory=list)
    transferable: List[TransferableSkill] = Field(default_factory=list)
    softSkills: List[str] = Field(default_factory=list)
    evidence: List[EvidenceItem] = Field(default_factory=list)
    confidence: str = "moderate"


class PreferenceProfile(BaseModel):
    workStyle: List[str] = Field(default_factory=list)
    learningStyle: Optional[str] = None
    environment: Optional[str] = None
    collaboration: Optional[str] = None
    autonomy: Optional[str] = None
    stability: Optional[str] = None
    creativity: Optional[str] = None
    structure: Optional[str] = None


class ValuesProfile(BaseModel):
    income: Optional[str] = None
    impact: Optional[str] = None
    stability: Optional[str] = None
    independence: Optional[str] = None
    learning: Optional[str] = None
    status: Optional[str] = None
    flexibility: Optional[str] = None
    helping: Optional[str] = None
    entrepreneurship: Optional[str] = None
    research: Optional[str] = None


class GoalsProfile(BaseModel):
    immediate: Optional[str] = None
    mediumTerm: Optional[str] = None
    longTerm: Optional[str] = None
    primaryGoal: Optional[str] = None
    secondaryGoals: List[str] = Field(default_factory=list)
    goalConfidence: str = "tentative"


class ConstraintsProfile(BaseModel):
    location: Optional[str] = None
    budget: Optional[str] = None
    time: Optional[str] = None
    familyConstraints: Optional[str] = None
    educationConstraints: Optional[str] = None
    financialConstraints: Optional[str] = None
    mobility: Optional[str] = None
    workMode: Optional[str] = None


class ExperienceProfile(BaseModel):
    roles: List[str] = Field(default_factory=list)
    responsibilities: List[str] = Field(default_factory=list)
    achievements: List[str] = Field(default_factory=list)
    projects: List[str] = Field(default_factory=list)
    internships: List[str] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)


class TargetDirectionProfile(BaseModel):
    rawInput: Optional[str] = None
    normalizedInput: Optional[str] = None
    resolvedEntity: Optional[Dict[str, Any]] = None
    resolutionState: str = "UNKNOWN"  # EXACT_MATCH | ALIAS_MATCH | SEMANTIC_MATCH | CLUSTER_ONLY | RECOGNIZED_REQUIREMENTS_INCOMPLETE | UNKNOWN | AMBIGUOUS | CONTRADICTORY
    confidence: float = 0.0


class ExplorationHistoryProfile(BaseModel):
    experiments: List[Dict[str, Any]] = Field(default_factory=list)
    assessmentResults: List[Dict[str, Any]] = Field(default_factory=list)
    userFeedback: List[Dict[str, Any]] = Field(default_factory=list)
    selectedPaths: List[str] = Field(default_factory=list)
    rejectedPaths: List[str] = Field(default_factory=list)


class UncertaintyProfile(BaseModel):
    missingEvidence: List[str] = Field(default_factory=list)
    contradictions: List[Dict[str, Any]] = Field(default_factory=list)
    unresolvedFields: List[str] = Field(default_factory=list)
    confidence: float = 0.5


class ProvenanceProfile(BaseModel):
    source: str = "futureforge_engine"
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    reliability: str = "high"


class HistoryProfile(BaseModel):
    previousVersions: List[Dict[str, Any]] = Field(default_factory=list)
    changes: List[str] = Field(default_factory=list)
    reasons: List[str] = Field(default_factory=list)


class CareerDNA(BaseModel):
    """
    The canonical CareerDNA root model.
    """
    version: int = 1
    stage: str = "class10"  # class10 | class12 | ug | pg | working_professional
    profileCompleteness: float = 0.0  # 0.0 to 100.0
    evidenceQuality: str = "INSUFFICIENT"  # HIGH | MEDIUM | LOW | INSUFFICIENT

    academicProfile: AcademicProfile = Field(default_factory=AcademicProfile)
    aptitudeProfile: AptitudeProfile = Field(default_factory=AptitudeProfile)
    interestProfile: InterestProfile = Field(default_factory=InterestProfile)
    skillProfile: SkillProfile = Field(default_factory=SkillProfile)
    preferenceProfile: PreferenceProfile = Field(default_factory=PreferenceProfile)
    valuesProfile: ValuesProfile = Field(default_factory=ValuesProfile)
    goals: GoalsProfile = Field(default_factory=GoalsProfile)
    constraints: ConstraintsProfile = Field(default_factory=ConstraintsProfile)
    experience: ExperienceProfile = Field(default_factory=ExperienceProfile)
    targetDirection: TargetDirectionProfile = Field(default_factory=TargetDirectionProfile)
    explorationHistory: ExplorationHistoryProfile = Field(default_factory=ExplorationHistoryProfile)
    signals: List[SignalItem] = Field(default_factory=list)
    uncertainty: UncertaintyProfile = Field(default_factory=UncertaintyProfile)
    provenance: ProvenanceProfile = Field(default_factory=ProvenanceProfile)
    history: HistoryProfile = Field(default_factory=HistoryProfile)

