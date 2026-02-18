

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { getQuizById, getResultsByQuiz } from '@/lib/mockData';
// import { ArrowLeft, BarChart } from 'lucide-react';

// export default function QuizResultsPage() {
//   const router = useRouter();
//   const params = useParams();
//   const [quiz, setQuiz] = useState<any>(null);
//   const [results, setResults] = useState<any[]>([]);

//   useEffect(() => {
//     const quizData = getQuizById(params.id as string);
//     if (!quizData) {
//       router.push('/teacher/dashboard');
//       return;
//     }

//     setQuiz(quizData);
//     setResults(getResultsByQuiz(params.id as string));
//   }, [params.id]);

//   if (!quiz) return <div>Loading...</div>;

//   const averageScore = results.length 
//     ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length) 
//     : 0;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-4 py-4">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => router.back()}
//               className="p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <ArrowLeft className="w-5 h-5 text-gray-600" />
//             </button>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">{quiz.title} - Results</h1>
//               <p className="text-sm text-gray-500">{results.length} students attempted</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="max-w-6xl mx-auto px-4 py-6">
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div className="bg-white p-5 rounded-lg border border-gray-200">
//             <p className="text-sm text-gray-500">Total Attempts</p>
//             <p className="text-2xl font-bold text-gray-900">{results.length}</p>
//           </div>
//           <div className="bg-white p-5 rounded-lg border border-gray-200">
//             <p className="text-sm text-gray-500">Average Score</p>
//             <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
//           </div>
//           <div className="bg-white p-5 rounded-lg border border-gray-200">
//             <p className="text-sm text-gray-500">Highest Score</p>
//             <p className="text-2xl font-bold text-gray-900">
//               {results.length ? Math.max(...results.map(r => r.percentage)) : 0}%
//             </p>
//           </div>
//         </div>

//         {/* Results Table */}
//         {results.length === 0 ? (
//           <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
//             <BarChart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//             <p className="text-gray-500">No results yet</p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="text-left p-4 text-sm font-medium text-gray-600">Student</th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-600">Score</th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-600">Percentage</th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-600">Date</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {results.map((result) => (
//                   <tr key={result.id} className="hover:bg-gray-50">
//                     <td className="p-4 text-gray-900">{result.userName}</td>
//                     <td className="p-4 text-gray-900">{result.score}/{result.totalMarks}</td>
//                     <td className="p-4">
//                       <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                         result.percentage >= 70 
//                           ? 'bg-green-100 text-green-700' 
//                           : 'bg-yellow-100 text-yellow-700'
//                       }`}>
//                         {result.percentage}%
//                       </span>
//                     </td>
//                     <td className="p-4 text-gray-500">
//                       {new Date(result.submittedAt).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }      






'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getQuizById, saveResult, hasAttemptedQuiz } from '@/lib/mockData';
import { Clock } from 'lucide-react';

export default function TakeQuizPage() {
  const router = useRouter();
  const params = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);

    // ✅ Important: params.id ko safe way mein lo
    const quizId = params?.id as string;
    
    if (!quizId) {
      alert('Invalid quiz ID');
      router.push('/dashboard');
      return;
    }

    // ✅ Quiz data load karo
    const quizData = getQuizById(quizId);
    
    if (!quizData) {
      alert('Quiz not found!');
      router.push('/dashboard');
      return;
    }

    // ✅ Check if already attempted
    if (hasAttemptedQuiz(userData.id, quizData.id)) {
      alert('You have already taken this quiz!');
      router.push('/dashboard');
      return;
    }

    // ✅ Set quiz data
    setQuiz(quizData);
    setTimeLeft(quizData.duration * 60);
    setAnswers(new Array(quizData.questions.length).fill(-1));
    setLoading(false);
  }, [params?.id, router]);

  useEffect(() => {
    if (!quiz || timeLeft <= 0 || isSubmitting) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quiz, isSubmitting]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleAutoSubmit = () => {
    if (isSubmitting) return;
    alert('Time is up! Submitting your quiz...');
    handleSubmit();
  };

  const handleSubmit = () => {
    if (!quiz || !user || isSubmitting) return;
    setIsSubmitting(true);

    // Calculate score
    let score = 0;
    quiz.questions.forEach((q: any, index: number) => {
      if (answers[index] === q.correctOption) {
        score += q.marks;
      }
    });

    const percentage = Math.round((score / quiz.totalMarks) * 100);

    // Save result
    saveResult({
      quizId: quiz.id,
      quizTitle: quiz.title,
      userId: user.id,
      userName: user.name,
      score,
      totalMarks: quiz.totalMarks,
      percentage,
      submittedAt: new Date().toISOString()
    });

    alert(`Quiz submitted! Your score: ${score}/${quiz.totalMarks} (${percentage}%)`);
    router.push('/dashboard');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  // ✅ If no quiz
  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Quiz not found!</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{quiz.title}</h1>
              <p className="text-xs text-gray-500 mt-1">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="font-mono font-medium text-gray-900">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Question Text */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {quiz.questions[currentQuestion].marks} marks
              </span>
            </div>
            <h2 className="text-lg text-gray-900">{quiz.questions[currentQuestion].text}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {quiz.questions[currentQuestion].options.map((opt: string, idx: number) => (
              <label
                key={idx}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  answers[currentQuestion] === idx
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={idx}
                  checked={answers[currentQuestion] === idx}
                  onChange={() => handleAnswer(idx)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"
                />
                <span className="text-gray-700">{opt}</span>
              </label>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
              ← Previous
            </button>

            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-500 mb-3">Quick Navigation</p>
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-8 h-8 text-xs font-medium rounded-lg transition-colors ${
                  currentQuestion === idx
                    ? 'bg-blue-600 text-white'
                    : answers[idx] !== -1
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}