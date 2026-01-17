'use client';

import { useState } from 'react';
import type { UserInputs } from '@next-business-idea/core';
import { UserProfileForm } from './UserProfileForm';
import { IdeasList } from './IdeasList';
import { SavedIdeasSection } from './SavedIdeasSection';

export function IdeaGenerator() {
  const [userInputs, setUserInputs] = useState<UserInputs | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<any[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<any[]>([]);

  const handleGenerateIdeas = async (inputs: UserInputs) => {
    setUserInputs(inputs);
    setLoading(true);
    try {
      const response = await fetch('/api/ideas/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      setGeneratedIdeas(data.ideas || []);
    } catch (error) {
      console.error('Failed to generate ideas:', error);
      alert('Failed to generate ideas');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveIdea = async (ideaId: string) => {
    try {
      const response = await fetch(`/api/ideas/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId }),
      });
      const data = await response.json();
      if (data.success) {
        setSavedIdeas([...savedIdeas, data.idea]);
        alert('Idea saved!');
      }
    } catch (error) {
      console.error('Failed to save idea:', error);
      alert('Failed to save idea');
    }
  };

  const handleLoadSavedIdeas = async () => {
    try {
      const response = await fetch('/api/ideas/saved');
      const data = await response.json();
      setSavedIdeas(data.ideas || []);
    } catch (error) {
      console.error('Failed to load saved ideas:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <UserProfileForm onSubmit={handleGenerateIdeas} loading={loading} />
      </div>

      {generatedIdeas.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Generated Ideas</h2>
          <IdeasList ideas={generatedIdeas} onSave={handleSaveIdea} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Saved Ideas</h2>
        <button
          onClick={handleLoadSavedIdeas}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Load Saved Ideas
        </button>
        {savedIdeas.length > 0 && <SavedIdeasSection ideas={savedIdeas} />}
        {savedIdeas.length === 0 && (
          <p className="text-gray-600">No saved ideas yet. Generate and save some ideas!</p>
        )}
      </div>
    </div>
  );
}
