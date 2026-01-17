import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { UserInputs, IdeaWithScore } from '@next-business-idea/core';
import { createIdea } from '@next-business-idea/core';
import { getIdeaGenerator, getScoringService } from '@next-business-idea/integrations';

export async function POST(request: NextRequest) {
  try {
    const userInputs: UserInputs = await request.json();

    // Generate ideas
    const generator = getIdeaGenerator();
    const ideas = await generator.generateIdeas(userInputs, 10);

    // Score ideas
    const scorer = getScoringService();
    const scores = await scorer.scoreIdeas(ideas, userInputs);

    // Combine ideas with scores
    const ideasWithScores: IdeaWithScore[] = ideas.map((idea, idx) => ({
      ...idea,
      score: scores[idx],
    }));

    return NextResponse.json({
      success: true,
      ideas: ideasWithScores,
    });
  } catch (error) {
    console.error('Error generating ideas:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate ideas' },
      { status: 500 }
    );
  }
}
