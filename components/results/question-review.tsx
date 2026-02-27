'use client';

import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface QuestionReviewProps {
  question: {
    number: number;
    text: string;
    options: string[];
    correctAnswer: number;
    marks: number;
  };
  userAnswer: number;
  timeSpent?: number;
}

export default function QuestionReview({ question, userAnswer, timeSpent }: QuestionReviewProps) {
  const isCorrect = userAnswer === question.correctAnswer;
  const correctOptionText = question.options[question.correctAnswer];
  const userOptionText = userAnswer !== -1 ? question.options[userAnswer] : 'Not answered';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium ${
            isCorrect 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {question.number}
          </div>
          <h3 className="font-medium text-gray-900">Question {question.number}</h3>
        </div>
        <div className="flex items-center gap-4">
          {timeSpent && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{timeSpent}s</span>
            </div>
          )}
          <span className="text-sm font-medium text-gray-700">{question.marks} marks</span>
        </div>
      </div>

      {/* Question Text */}
      <p className="text-gray-800 mb-4">{question.text}</p>

      {/* Answer Comparison */}
      <div className="space-y-3">
        {/* User's Answer */}
        <div className={`p-3 rounded-lg border ${
          isCorrect 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            {isCorrect ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600" />
            )}
            <span className="text-sm font-medium text-gray-700">Your Answer:</span>
          </div>
          <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {userOptionText}
          </p>
        </div>

        {/* Correct Answer (if wrong) */}
        {!isCorrect && (
          <div className="p-3 rounded-lg border border-green-200 bg-green-50">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Correct Answer:</span>
            </div>
            <p className="text-sm text-green-700">{correctOptionText}</p>
          </div>
        )}
      </div>

      {/* Options List (for reference) */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-500 mb-2">All Options:</p>
        <div className="space-y-1">
          {question.options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                idx === question.correctAnswer
                  ? 'bg-green-100 text-green-700 font-medium'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className={idx === question.correctAnswer ? 'text-green-700 font-medium' : 'text-gray-600'}>
                {opt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}