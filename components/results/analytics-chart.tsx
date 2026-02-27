'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsChartProps {
  data: {
    questionNumber: number;
    correct: boolean;
    marks: number;
    timeSpent?: number;
  }[];
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  const chartData = data.map((item, index) => ({
    name: `Q${index + 1}`,
    marks: item.marks,
    correct: item.correct ? item.marks : 0,
    incorrect: !item.correct ? item.marks : 0,
    timeSpent: item.timeSpent || 0
  }));

  const totalCorrect = data.filter(d => d.correct).length;
  const totalQuestions = data.length;
  const totalTime = data.reduce((acc, d) => acc + (d.timeSpent || 0), 0);
  const averageTime = totalQuestions ? Math.round(totalTime / totalQuestions) : 0;

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Correct Answers</p>
          <p className="text-2xl font-bold text-green-600">{totalCorrect}</p>
          <p className="text-xs text-gray-400">out of {totalQuestions}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Accuracy</p>
          <p className="text-2xl font-bold text-blue-600">
            {Math.round((totalCorrect / totalQuestions) * 100)}%
          </p>
          <p className="text-xs text-gray-400">overall</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Total Time</p>
          <p className="text-2xl font-bold text-purple-600">{totalTime}s</p>
          <p className="text-xs text-gray-400">{Math.round(totalTime / 60)} min</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Avg Time/Question</p>
          <p className="text-2xl font-bold text-orange-600">{averageTime}s</p>
          <p className="text-xs text-gray-400">per question</p>
        </div>
      </div>

      {/* Marks Distribution Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Marks Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="correct" stackId="a" fill="#22c55e" name="Correct Marks" />
              <Bar dataKey="incorrect" stackId="a" fill="#ef4444" name="Incorrect Marks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time Spent Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Time Spent per Question</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="timeSpent" fill="#3b82f6" name="Time (seconds)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}