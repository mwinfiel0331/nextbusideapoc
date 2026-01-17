import { describe, it, expect } from 'vitest';
import { createIdea, createIdeaScore, DEFAULT_SCORING_WEIGHTS } from '../types';

describe('Domain Models', () => {
  describe('createIdea', () => {
    it('should create an idea with id and createdAt', () => {
      const idea = createIdea({
        title: 'Test Idea',
        summary: 'A test business idea',
        targetCustomer: 'Everyone',
        stepsToStart: ['Step 1'],
        costRange: { min: 100, max: 1000, currency: 'USD' },
        complexity: 'LOW',
        localViabilityNotes: 'Viable everywhere',
        tags: ['test'],
        whyNowSignals: ['Trend 1'],
      });

      expect(idea.id).toBeDefined();
      expect(idea.id.length).toBeGreaterThan(0);
      expect(idea.createdAt).toBeInstanceOf(Date);
      expect(idea.title).toBe('Test Idea');
    });
  });

  describe('createIdeaScore', () => {
    it('should calculate overall score as weighted sum', () => {
      const score = createIdeaScore('test-id', {
        demandScore: 80,
        competitionScore: 40,
        feasibilityScore: 90,
        profitabilityScore: 70,
      });

      // Expected: 80 * 0.35 + (100 - 40) * 0.20 + 90 * 0.25 + 70 * 0.20
      // = 28 + 12 + 22.5 + 14 = 76.5 ≈ 77
      expect(score.overallScore).toBeGreaterThan(75);
      expect(score.overallScore).toBeLessThan(80);
    });

    it('should provide 3 top reasons', () => {
      const score = createIdeaScore('test-id', {
        demandScore: 90,
        competitionScore: 30,
        feasibilityScore: 50,
        profitabilityScore: 40,
      });

      expect(score.reasons.length).toBe(3);
      expect(score.reasons[0]).toContain('Demand');
    });
  });
});
