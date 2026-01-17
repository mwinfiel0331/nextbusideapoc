/**
 * Core Domain Models for Next Business Idea
 * These types are shared across the application and integrations.
 */

import { randomUUID } from 'crypto';

// ============ User Input Models ============

export type BusinessType = 'SERVICE' | 'PRODUCT' | 'DIGITAL';
export type BudgetLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type RiskTolerance = 'LOW' | 'MEDIUM' | 'HIGH';
export type ComplexityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Location {
  city: string;
  state: string;
}

export interface UserInputs {
  location: Location;
  interests: string[];
  budget: BudgetLevel;
  hoursPerWeek: number;
  businessType: BusinessType;
  riskTolerance: RiskTolerance;
}

// ============ Business Idea Models ============

export interface CostRange {
  min: number;
  max: number;
  currency: 'USD';
}

export interface Idea {
  id: string;
  title: string;
  summary: string;
  targetCustomer: string;
  stepsToStart: string[];
  costRange: CostRange;
  complexity: ComplexityLevel;
  localViabilityNotes: string;
  tags: string[];
  whyNowSignals: string[];
  createdAt: Date;
}

export interface IdeaScore {
  ideaId: string;
  demandScore: number; // 0-100
  competitionScore: number; // 0-100 (lower is better)
  feasibilityScore: number; // 0-100
  profitabilityScore: number; // 0-100
  overallScore: number; // 0-100
  reasons: [string, string, string]; // top 3 explainability reasons
}

export interface IdeaWithScore extends Idea {
  score: IdeaScore;
}

// ============ Scoring Configuration ============

export interface ScoringWeights {
  demand: number;
  competition: number; // inverted in calculation
  feasibility: number;
  profitability: number;
}

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  demand: 0.35,
  competition: 0.2,
  feasibility: 0.25,
  profitability: 0.2,
};

// ============ Factories ============

export function createIdea(partial: Omit<Idea, 'id' | 'createdAt'>): Idea {
  return {
    ...partial,
    id: randomUUID(),
    createdAt: new Date(),
  };
}

export function createIdeaScore(ideaId: string, scores: Omit<IdeaScore, 'ideaId' | 'overallScore' | 'reasons'>, weights: ScoringWeights = DEFAULT_SCORING_WEIGHTS): IdeaScore {
  const overallScore = Math.round(
    scores.demandScore * weights.demand +
    (100 - scores.competitionScore) * weights.competition +
    scores.feasibilityScore * weights.feasibility +
    scores.profitabilityScore * weights.profitability
  );

  // Generate reasons based on which scores are highest
  const reasonsMap: Array<[string, number]> = [
    [`Demand potential: ${scores.demandScore}/100`, scores.demandScore],
    [`Low competition advantage: ${100 - scores.competitionScore}/100`, 100 - scores.competitionScore],
    [`Feasibility to execute: ${scores.feasibilityScore}/100`, scores.feasibilityScore],
    [`Profitability potential: ${scores.profitabilityScore}/100`, scores.profitabilityScore],
  ];

  const reasons = reasonsMap
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([reason]) => reason) as [string, string, string];

  return {
    ideaId,
    demandScore: scores.demandScore,
    competitionScore: scores.competitionScore,
    feasibilityScore: scores.feasibilityScore,
    profitabilityScore: scores.profitabilityScore,
    overallScore,
    reasons,
  };
}
