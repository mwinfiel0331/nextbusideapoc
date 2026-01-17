import { describe, it, expect } from 'vitest';
import { filterIdeas, getIdeaCatalog } from '../ideaCatalog';

describe('Idea Catalog', () => {
  describe('getIdeaCatalog', () => {
    it('should return at least 30 ideas', () => {
      const catalog = getIdeaCatalog();
      expect(catalog.length).toBeGreaterThanOrEqual(30);
    });

    it('should have all required fields', () => {
      const catalog = getIdeaCatalog();
      catalog.forEach((idea) => {
        expect(idea.title).toBeDefined();
        expect(idea.summary).toBeDefined();
        expect(idea.targetCustomer).toBeDefined();
        expect(idea.stepsToStart).toBeDefined();
        expect(idea.costRange).toBeDefined();
        expect(idea.complexity).toBeDefined();
        expect(idea.tags).toBeDefined();
        expect(idea.whyNowSignals).toBeDefined();
      });
    });
  });

  describe('filterIdeas', () => {
    it('should filter by business type', () => {
      const serviceIdeas = filterIdeas([], 'SERVICE', 20);
      expect(serviceIdeas.length).toBeGreaterThan(0);
      serviceIdeas.forEach((idea) => {
        expect(idea.tags.some((t) => t.includes('service'))).toBe(true);
      });
    });

    it('should return up to requested count', () => {
      const ideas = filterIdeas([], undefined, 5);
      expect(ideas.length).toBeLessThanOrEqual(5);
    });

    it('should match by interests', () => {
      const ideas = filterIdeas(['design'], undefined, 20);
      expect(ideas.length).toBeGreaterThan(0);
    });
  });
});
