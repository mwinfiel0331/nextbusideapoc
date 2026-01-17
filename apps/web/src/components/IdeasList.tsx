'use client';

import type { IdeaWithScore } from '@next-business-idea/core';
import { IdeaCard } from './IdeaCard';

interface IdeasListProps {
  ideas: IdeaWithScore[];
  onSave: (ideaId: string) => void;
}

export function IdeasList({ ideas, onSave }: IdeasListProps) {
  if (!ideas || ideas.length === 0) {
    return <p className="text-gray-600">No ideas generated yet.</p>;
  }

  // Sort by overall score descending
  const sorted = [...ideas].sort((a, b) => b.score.overallScore - a.score.overallScore);

  return (
    <div className="space-y-6">
      {sorted.map((ideaWithScore, idx) => (
        <IdeaCard
          key={ideaWithScore.id}
          rank={idx + 1}
          idea={ideaWithScore}
          onSave={() => onSave(ideaWithScore.id)}
        />
      ))}
    </div>
  );
}
