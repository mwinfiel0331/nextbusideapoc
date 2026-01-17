import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Idea, IdeaScore } from '@next-business-idea/core';
import { getIdeaRepository } from '@next-business-idea/integrations';

export async function POST(request: NextRequest) {
  try {
    const { ideaId } = await request.json();

    // In a real app, this would come from the request body or session
    // For this POC, we're storing a mock idea with mock score
    const repo = getIdeaRepository();

    // This is a simplified mock - in reality we'd fetch the idea from the generation result
    // For now, we'll create a placeholder
    const idea: Idea = {
      id: ideaId,
      title: 'Saved Business Idea',
      summary: 'A business idea you found interesting',
      targetCustomer: 'Your target market',
      stepsToStart: ['Step 1'],
      costRange: { min: 1000, max: 5000, currency: 'USD' },
      complexity: 'MEDIUM',
      localViabilityNotes: 'Viable in your area',
      tags: ['business'],
      whyNowSignals: ['Growing market'],
      createdAt: new Date(),
    };

    const score: IdeaScore = {
      ideaId,
      demandScore: 75,
      competitionScore: 50,
      feasibilityScore: 80,
      profitabilityScore: 70,
      overallScore: 75,
      reasons: [
        'Strong market demand',
        'Low competition advantage',
        'Feasible to execute',
      ] as [string, string, string],
    };

    await repo.save(idea, score);

    return NextResponse.json({
      success: true,
      idea: { ...idea, score },
    });
  } catch (error) {
    console.error('Error saving idea:', error);
    return NextResponse.json({ success: false, error: 'Failed to save idea' }, { status: 500 });
  }
}
