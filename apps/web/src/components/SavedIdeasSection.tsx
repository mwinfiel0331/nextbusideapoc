'use client';

import type { IdeaWithScore } from '@next-business-idea/core';

interface SavedIdeasSectionProps {
  ideas: IdeaWithScore[];
}

export function SavedIdeasSection({ ideas }: SavedIdeasSectionProps) {
  if (!ideas || ideas.length === 0) {
    return <p className="text-gray-600">No saved ideas yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {ideas.map((idea) => (
        <div key={idea.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="font-bold text-lg text-gray-900 mb-2">{idea.title}</h3>
          <p className="text-gray-700 text-sm mb-3">{idea.summary}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-600 font-semibold">
              Score: {idea.score.overallScore}
            </span>
            <span className="text-xs text-gray-500">
              Saved {new Date(idea.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
