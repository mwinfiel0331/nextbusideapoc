'use client';

import { useState } from 'react';
import type { UserInputs, BusinessType, BudgetLevel, RiskTolerance } from '@next-business-idea/core';

interface UserProfileFormProps {
  onSubmit: (inputs: UserInputs) => void;
  loading: boolean;
}

export function UserProfileForm({ onSubmit, loading }: UserProfileFormProps) {
  const [city, setCity] = useState('Austin');
  const [state, setState] = useState('TX');
  const [interests, setInterests] = useState('technology, marketing');
  const [budget, setBudget] = useState<BudgetLevel>('MEDIUM');
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [businessType, setBusinessType] = useState<BusinessType>('SERVICE');
  const [riskTolerance, setRiskTolerance] = useState<RiskTolerance>('MEDIUM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const interestsList = interests.split(',').map((i) => i.trim());
    onSubmit({
      location: { city, state },
      interests: interestsList,
      budget,
      hoursPerWeek,
      businessType,
      riskTolerance,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Austin"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., TX"
          />
        </div>

        {/* Interests */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interests (comma-separated)
          </label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., marketing, design, finance"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value as BudgetLevel)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="LOW">Low ($0-1,000)</option>
            <option value="MEDIUM">Medium ($1,000-3,000)</option>
            <option value="HIGH">High ($3,000+)</option>
          </select>
        </div>

        {/* Hours Per Week */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hours Available Per Week
          </label>
          <input
            type="number"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            min="0"
            max="168"
          />
        </div>

        {/* Business Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Business Type
          </label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value as BusinessType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="SERVICE">Service</option>
            <option value="PRODUCT">Product</option>
            <option value="DIGITAL">Digital</option>
          </select>
        </div>

        {/* Risk Tolerance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Risk Tolerance
          </label>
          <select
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value as RiskTolerance)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Generating ideas...' : 'Generate Ideas'}
      </button>
    </form>
  );
}
