/**
 * Idea Scoring Engine
 * Implements deterministic scoring rules for business ideas.
 *
 * FUTURE AI INTEGRATION:
 * This scoring could be enhanced with real market data from:
 * - OpenAI embeddings for demand analysis
 * - Market API data (e.g., SimilarWeb for competition)
 * - Real financial models
 * See docs/01-architecture.md for integration points.
 */

import {
  Idea,
  UserInputs,
  IdeaScore,
  createIdeaScore,
  ScoringWeights,
  DEFAULT_SCORING_WEIGHTS,
} from './types';

interface ScoringContext {
  userInputs: UserInputs;
  weights?: ScoringWeights;
}

// ============ Demand Scoring ============
// Based on: user interests alignment, tags, why-now signals, location

function calculateDemandScore(idea: Idea, userInputs: UserInputs): number {
  let score = 50; // baseline

  // Check tag matches with user interests
  const matchingTags = idea.tags.filter((tag) =>
    userInputs.interests.some((interest) => interest.toLowerCase() === tag.toLowerCase())
  );
  score += matchingTags.length * 10; // +10 per match, max 50

  // Boost if idea has strong why-now signals
  if (idea.whyNowSignals.length >= 2) {
    score += 10;
  }

  // Adjust for location preference (mock: assume all locations are comparable)
  // In production, this would use real market data
  score += 5;

  return Math.min(100, score);
}

// ============ Competition Scoring ============
// Lower is better (0 = low competition, 100 = high competition)
// Based on: idea category saturation assumptions

const COMPETITION_BASELINE: Record<string, number> = {
  'social-media': 85, // Highly saturated
  'dropshipping': 80, // Very saturated
  'fitness': 75, // Saturated
  'content': 70, // Fairly saturated
  'service': 60, // Moderate
  'marketing': 65,
  'design': 70,
  'saas': 72,
  'ai': 75,
  'default': 55, // Default for unlabeled niches
};

function calculateCompetitionScore(idea: Idea): number {
  let score = 55; // baseline

  // Find if any tags match known high-competition categories
  const tag = idea.tags.find((t) => COMPETITION_BASELINE[t.toLowerCase()]);
  if (tag) {
    score = COMPETITION_BASELINE[tag.toLowerCase()] || 55;
  }

  // Adjust based on specificity (more niche = lower competition)
  if (idea.targetCustomer.length > 60) {
    score -= 5; // More specific target = less competition
  }

  // Digital products tend to have less local competition
  if (idea.tags.includes('digital') || idea.tags.includes('online')) {
    score -= 3;
  }

  return Math.max(0, Math.min(100, score));
}

// ============ Feasibility Scoring ============
// Based on: user's budget, time availability, idea complexity, steps to start

function calculateFeasibilityScore(idea: Idea, userInputs: UserInputs): number {
  let score = 50; // baseline

  // Budget alignment
  const budgetToMaxCost: Record<string, number> = {
    LOW: 1000,
    MEDIUM: 3000,
    HIGH: 10000,
  };
  const maxAffordable = budgetToMaxCost[userInputs.budget];
  if (idea.costRange.max <= maxAffordable) {
    score += 15; // Well within budget
  } else if (idea.costRange.max <= maxAffordable * 1.5) {
    score += 5; // Slightly over budget but manageable
  } else {
    score -= 10; // Outside budget
  }

  // Time availability vs complexity
  const hoursAvailable = userInputs.hoursPerWeek;
  const complexityHoursMap: Record<string, number> = {
    LOW: 5, // 5 hours/week needed
    MEDIUM: 15, // 15 hours/week needed
    HIGH: 30, // 30 hours/week needed
  };
  const hoursNeeded = complexityHoursMap[idea.complexity];
  if (hoursAvailable >= hoursNeeded) {
    score += 15;
  } else if (hoursAvailable >= hoursNeeded * 0.7) {
    score += 5; // Doable but tight
  } else {
    score -= 10; // Not enough time
  }

  // Steps to start (simpler = better)
  if (idea.stepsToStart.length <= 3) {
    score += 10;
  } else if (idea.stepsToStart.length > 6) {
    score -= 5;
  }

  // Risk tolerance alignment
  const riskMap: Record<string, number> = {
    LOW: 0,
    MEDIUM: 10,
    HIGH: 20,
  };
  // Complexity as risk proxy
  const riskBonus = riskMap[userInputs.riskTolerance];
  if (idea.complexity === 'LOW' && userInputs.riskTolerance === 'LOW') {
    score += 15;
  } else if (idea.complexity === 'HIGH' && userInputs.riskTolerance === 'HIGH') {
    score += 10;
  } else if (idea.complexity === 'HIGH' && userInputs.riskTolerance === 'LOW') {
    score -= 20; // Misalignment
  }

  return Math.max(0, Math.min(100, score));
}

// ============ Profitability Scoring ============
// Based on: cost range, complexity, typical margins by category

function calculateProfitabilityScore(idea: Idea): number {
  let score = 50; // baseline

  // Lower startup costs = higher profitability potential
  if (idea.costRange.max < 1000) {
    score += 20; // Lean business model
  } else if (idea.costRange.max < 3000) {
    score += 10;
  } else if (idea.costRange.max > 5000) {
    score -= 5; // High capital requirement
  }

  // Typical margin assumptions by type (mock data)
  const profitMarginByTag: Record<string, number> = {
    'service': 70, // High margins, hourly
    'digital': 85, // Very high margins
    'saas': 80,
    'product': 40, // Lower margins (inventory)
    'ecommerce': 30, // Very low margins
    'coaching': 75,
    'affiliate': 20, // Very low but passive
  };

  let bestMargin = 45; // default
  for (const tag of idea.tags) {
    const margin = profitMarginByTag[tag.toLowerCase()];
    if (margin && margin > bestMargin) {
      bestMargin = margin;
    }
  }

  score = Math.round((score * 0.5 + (bestMargin / 100) * 50)); // Blend both factors

  // Service/digital = scalable
  if (idea.tags.includes('service') || idea.tags.includes('digital')) {
    score += 5; // Scalability bonus
  }

  return Math.max(0, Math.min(100, score));
}

// ============ Public API ============

export function scoreIdea(
  idea: Idea,
  context: ScoringContext
): IdeaScore {
  const demandScore = calculateDemandScore(idea, context.userInputs);
  const competitionScore = calculateCompetitionScore(idea);
  const feasibilityScore = calculateFeasibilityScore(idea, context.userInputs);
  const profitabilityScore = calculateProfitabilityScore(idea);

  return createIdeaScore(idea.id, {
    demandScore,
    competitionScore,
    feasibilityScore,
    profitabilityScore,
  }, context.weights || DEFAULT_SCORING_WEIGHTS);
}

export function scoreIdeas(
  ideas: Idea[],
  context: ScoringContext
): IdeaScore[] {
  return ideas.map((idea) => scoreIdea(idea, context));
}
