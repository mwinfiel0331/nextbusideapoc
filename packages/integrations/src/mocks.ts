/**
 * Mock Implementations
 * These are used by default in the POC and replaced with real integrations in production.
 */

import type { Idea, UserInputs, IdeaScore } from '@next-business-idea/core';
import {
  createIdea,
  scoreIdea,
  filterIdeas,
  getIdeaCatalog,
} from '@next-business-idea/core';
import type { IdeaGenerator, ScoringService, IdeaRepository } from './interfaces';

/**
 * Mock Idea Generator
 * Uses the curated catalog from packages/core
 */
export class MockIdeaGenerator implements IdeaGenerator {
  async generateIdeas(userInputs: UserInputs, count: number = 10): Promise<Idea[]> {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Filter ideas from catalog based on user inputs
    const filtered = filterIdeas(userInputs.interests, userInputs.businessType, count);

    // Personalize by adding localized notes
    return filtered.map((template) =>
      createIdea({
        ...template,
        localViabilityNotes: this.personalizeNotes(
          template.localViabilityNotes,
          userInputs.location.city
        ),
      })
    );
  }

  private personalizeNotes(notes: string, city: string): string {
    return `${notes} (Localized for ${city}: Consider local competition and demographics).`;
  }
}

/**
 * Mock Scoring Service
 * Uses deterministic scoring from @next-business-idea/core
 */
export class MockScoringService implements ScoringService {
  async scoreIdea(idea: Idea, userInputs: UserInputs): Promise<IdeaScore> {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 100));

    return scoreIdea(idea, { userInputs });
  }

  async scoreIdeas(ideas: Idea[], userInputs: UserInputs): Promise<IdeaScore[]> {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 100 * ideas.length));

    return ideas.map((idea) => scoreIdea(idea, { userInputs }));
  }
}

/**
 * Mock Idea Repository
 * In-memory storage (data lost on server restart)
 */
export class MockIdeaRepository implements IdeaRepository {
  private store: Map<string, { idea: Idea; score: IdeaScore }> = new Map();

  async save(idea: Idea, score: IdeaScore): Promise<void> {
    this.store.set(idea.id, { idea, score });
  }

  async findById(id: string): Promise<{ idea: Idea; score: IdeaScore } | null> {
    return this.store.get(id) || null;
  }

  async findAll(limit?: number): Promise<Array<{ idea: Idea; score: IdeaScore }>> {
    const all = Array.from(this.store.values());
    return limit ? all.slice(0, limit) : all;
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}

// Global instances (can be replaced by dependency injection in real app)
let ideaGenerator: IdeaGenerator | null = null;
let scoringService: ScoringService | null = null;
let ideaRepository: IdeaRepository | null = null;

export function getIdeaGenerator(): IdeaGenerator {
  if (!ideaGenerator) {
    ideaGenerator = new MockIdeaGenerator();
  }
  return ideaGenerator;
}

export function getScoringService(): ScoringService {
  if (!scoringService) {
    scoringService = new MockScoringService();
  }
  return scoringService;
}

export function getIdeaRepository(): IdeaRepository {
  if (!ideaRepository) {
    ideaRepository = new MockIdeaRepository();
  }
  return ideaRepository;
}

// For testing: allow injection
export function setIdeaGenerator(gen: IdeaGenerator): void {
  ideaGenerator = gen;
}

export function setScoringService(svc: ScoringService): void {
  scoringService = svc;
}

export function setIdeaRepository(repo: IdeaRepository): void {
  ideaRepository = repo;
}
