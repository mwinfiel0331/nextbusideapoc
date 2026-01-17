import { NextResponse } from 'next/server';
import { getIdeaRepository } from '@next-business-idea/integrations';

export async function GET() {
  try {
    const repo = getIdeaRepository();
    const ideas = await repo.findAll(50);

    return NextResponse.json({
      success: true,
      ideas: ideas.map((item) => ({
        ...item.idea,
        score: item.score,
      })),
    });
  } catch (error) {
    console.error('Error fetching saved ideas:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch saved ideas' },
      { status: 500 }
    );
  }
}
