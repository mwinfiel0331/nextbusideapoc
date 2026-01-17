import { Suspense } from 'react';
import { IdeaGenerator } from '@/components/IdeaGenerator';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-2">Welcome</h2>
        <p className="text-gray-700 mb-4">
          Answer a few quick questions about yourself and get personalized business ideas ranked
          by our proprietary scoring model.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>✨ 30+ business idea templates</li>
          <li>📊 Deterministic scoring: demand, competition, feasibility, profitability</li>
          <li>💾 Save your favorite ideas</li>
          <li>🌍 Localized recommendations</li>
        </ul>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <IdeaGenerator />
      </Suspense>
    </div>
  );
}
