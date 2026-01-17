'use client';

import { useState } from 'react';
import type { IdeaWithScore } from '@next-business-idea/core';

interface IdeaCardProps {
  rank: number;
  idea: IdeaWithScore;
  onSave: () => void;
}

export function IdeaCard({ rank, idea, onSave }: IdeaCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
              #{rank}
            </span>
            <h3 className="text-xl font-bold text-gray-900">{idea.title}</h3>
          </div>
          <p className="text-gray-600">{idea.summary}</p>
        </div>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 whitespace-nowrap"
        >
          💾 Save
        </button>
      </div>

      {/* Score Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <ScoreBox label="Overall" score={idea.score.overallScore} highlight />
        <ScoreBox label="Demand" score={idea.score.demandScore} />
        <ScoreBox label="Competition" score={100 - idea.score.competitionScore} />
        <ScoreBox label="Feasibility" score={idea.score.feasibilityScore} />
        <ScoreBox label="Profitability" score={idea.score.profitabilityScore} />
      </div>

      {/* Top Reasons */}
      <div className="mb-4 bg-blue-50 p-3 rounded">
        <h4 className="font-semibold text-gray-900 mb-2">Why this scores well:</h4>
        <ul className="list-disc list-inside space-y-1">
          {idea.score.reasons.map((reason, idx) => (
            <li key={idx} className="text-gray-700 text-sm">
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Expand Details */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-600 font-semibold hover:underline"
      >
        {expanded ? '▼ Hide Details' : '▶ Show Details'}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4 border-t pt-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Target Customer</h4>
            <p className="text-gray-700">{idea.targetCustomer}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Cost Range</h4>
            <p className="text-gray-700">
              ${idea.costRange.min.toLocaleString()} - ${idea.costRange.max.toLocaleString()}{' '}
              {idea.costRange.currency}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Complexity</h4>
            <p className="text-gray-700">{idea.complexity}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Steps to Start</h4>
            <ol className="list-decimal list-inside space-y-1">
              {idea.stepsToStart.map((step, idx) => (
                <li key={idx} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Local Viability</h4>
            <p className="text-gray-700">{idea.localViabilityNotes}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Why Now Signals</h4>
            <ul className="list-disc list-inside space-y-1">
              {idea.whyNowSignals.map((signal, idx) => (
                <li key={idx} className="text-gray-700">
                  {signal}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {idea.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ScoreBoxProps {
  label: string;
  score: number;
  highlight?: boolean;
}

function ScoreBox({ label, score, highlight }: ScoreBoxProps) {
  const bgColor = highlight ? 'bg-blue-600 text-white' : scoreToColor(score);

  return (
    <div className={`${bgColor} rounded p-3 text-center`}>
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-2xl font-bold">{score}</div>
      <div className="text-xs">/ 100</div>
    </div>
  );
}

function scoreToColor(score: number): string {
  if (score >= 75) return 'bg-green-100 text-green-900';
  if (score >= 50) return 'bg-yellow-100 text-yellow-900';
  return 'bg-red-100 text-red-900';
}
