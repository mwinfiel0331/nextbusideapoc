/**
 * Integration Interfaces
 * These define contracts for integrations that can be implemented with mock or real services.
 */

import type { Idea, UserInputs, IdeaScore } from '@next-business-idea/core';

/**
 * IdeaGenerator Interface
 * 
 * MOCK IMPLEMENTATION: MockIdeaGenerator
 * - Uses curated catalog from @next-business-idea/core
 * - Deterministic filtering and personalization
 * 
 * REAL INTEGRATION:
 * - Replace with LLMIdeaGenerator using OpenAI API, Anthropic Claude, etc.
 * - Send UserInputs to LLM with system prompt
 * - Parse JSON response to Idea objects
 * Example:
 *   const generator = new LLMIdeaGenerator({
 *     apiKey: process.env.OPENAI_API_KEY,
 *     model: 'gpt-4',
 *   });
 */
export interface IdeaGenerator {
  generateIdeas(userInputs: UserInputs, count?: number): Promise<Idea[]>;
}

/**
 * ScoringService Interface
 * 
 * MOCK IMPLEMENTATION: MockScoringService
 * - Deterministic scoring rules as per docs/04-testing.md
 * - All scoring happens synchronously in-process
 * 
 * REAL INTEGRATION:
 * - Replace with ML model predictions
 * - Could use:
 *   - SageMaker endpoints
 *   - Custom Python microservice with trained models
 *   - Third-party market analysis APIs
 * Example:
 *   const scorer = new MLScoringService({
 *     endpoint: process.env.ML_ENDPOINT_URL,
 *     modelVersion: 'v2.1',
 *   });
 */
export interface ScoringService {
  scoreIdea(idea: Idea, userInputs: UserInputs): Promise<IdeaScore>;
  scoreIdeas(ideas: Idea[], userInputs: UserInputs): Promise<IdeaScore[]>;
}

/**
 * IdeaRepository Interface
 * 
 * MOCK IMPLEMENTATION: MockIdeaRepository
 * - In-memory store with simple array operations
 * - Data lost on restart
 * 
 * REAL INTEGRATION:
 * - Replace with Prisma + SQLite for POC, Postgres for production
 * - Or use Firebase/Firestore for serverless
 * Example:
 *   const repo = new PrismaIdeaRepository(prismaClient);
 */
export interface IdeaRepository {
  save(idea: Idea, score: IdeaScore): Promise<void>;
  findById(id: string): Promise<{ idea: Idea; score: IdeaScore } | null>;
  findAll(limit?: number): Promise<Array<{ idea: Idea; score: IdeaScore }>>;
  delete(id: string): Promise<void>;
}
