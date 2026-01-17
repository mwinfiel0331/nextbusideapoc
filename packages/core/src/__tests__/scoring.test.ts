import { describe, it, expect } from 'vitest';
import { scoreIdea } from '../scoring';
import { createIdea } from '../types';

describe('Idea Scoring', () => {
  describe('scoreIdea', () => {
    it('should score an idea based on user inputs', () => {
      const idea = createIdea({
        title: 'Pet Sitting',
        summary: 'Pet sitting services',
        targetCustomer: 'Pet owners',
        stepsToStart: ['Get certified', 'Build network'],
        costRange: { min: 500, max: 1000, currency: 'USD' },
        complexity: 'LOW',
        localViabilityNotes: 'Good for local',
        tags: ['service', 'local', 'pets'],
        whyNowSignals: ['Pet industry growing'],
      });

      const score = scoreIdea(idea, {
        userInputs: {
          location: { city: 'Austin', state: 'TX' },
          interests: ['pets', 'service'],
          budget: 'LOW',
          hoursPerWeek: 20,
          businessType: 'SERVICE',
          riskTolerance: 'LOW',
        },
      });

      expect(score.demandScore).toBeGreaterThan(0);
      expect(score.demandScore).toBeLessThanOrEqual(100);
      expect(score.competitionScore).toBeGreaterThan(0);
      expect(score.competitionScore).toBeLessThanOrEqual(100);
      expect(score.feasibilityScore).toBeGreaterThan(0);
      expect(score.feasibilityScore).toBeLessThanOrEqual(100);
      expect(score.profitabilityScore).toBeGreaterThan(0);
      expect(score.profitabilityScore).toBeLessThanOrEqual(100);
      expect(score.overallScore).toBeGreaterThan(0);
      expect(score.overallScore).toBeLessThanOrEqual(100);
      expect(score.reasons.length).toBe(3);
    });

    it('should have higher feasibility for ideas matching user budget', () => {
      const lowCostIdea = createIdea({
        title: 'Low Cost Idea',
        summary: 'Cheap startup',
        targetCustomer: 'Everyone',
        stepsToStart: ['Start'],
        costRange: { min: 100, max: 500, currency: 'USD' },
        complexity: 'LOW',
        localViabilityNotes: 'Good',
        tags: ['cheap'],
        whyNowSignals: ['Trend'],
      });

      const highCostIdea = createIdea({
        title: 'High Cost Idea',
        summary: 'Expensive startup',
        targetCustomer: 'Everyone',
        stepsToStart: ['Start'],
        costRange: { min: 5000, max: 10000, currency: 'USD' },
        complexity: 'LOW',
        localViabilityNotes: 'Good',
        tags: ['expensive'],
        whyNowSignals: ['Trend'],
      });

      const userInputs = {
        location: { city: 'Austin', state: 'TX' },
        interests: [],
        budget: 'LOW' as const,
        hoursPerWeek: 20,
        businessType: 'SERVICE' as const,
        riskTolerance: 'LOW' as const,
      };

      const lowCostScore = scoreIdea(lowCostIdea, { userInputs });
      const highCostScore = scoreIdea(highCostIdea, { userInputs });

      expect(lowCostScore.feasibilityScore).toBeGreaterThan(highCostScore.feasibilityScore);
    });
  });
});
