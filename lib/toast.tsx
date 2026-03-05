// // app/lib/toast.ts
// import toast from 'react-hot-toast';

// export const showToast = {
//   success: (message: string) => {
//     toast.success(message, {
//       duration: 4000,
//       icon: '🎉',
//       style: {
//         background: '#1a1a23',
//         color: '#fff',
//         border: '1px solid #22c55e',
//       },
//     });
//   },

//   error: (message: string) => {
//     toast.error(message, {
//       duration: 5000,
//       icon: '❌',
//       style: {
//         background: '#1a1a23',
//         color: '#fff',
//         border: '1px solid #ef4444',
//       },
//     });
//   },

//   loading: (message: string) => {
//     return toast.loading(message, {
//       style: {
//         background: '#1a1a23',
//         color: '#fff',
//         border: '1px solid #3b82f6',
//       },
//     });
//   },

//   promise: async <T,>(
//     promise: Promise<T>,
//     messages: {
//       loading: string;
//       success: string;
//       error: string;
//     }
//   ) => {
//     return toast.promise(promise, messages, {
//       success: {
//         icon: '🎉',
//         style: {
//           border: '1px solid #22c55e',
//         },
//       },
//       error: {
//         icon: '❌',
//         style: {
//           border: '1px solid #ef4444',
//         },
//       },
//     });
//   },
// };







// app/lib/toast.ts
import toast from 'react-hot-toast';
import { CheckCircle, AlertCircle, Loader2, Award, TrendingUp, Users } from 'lucide-react';

// Custom styles that match your dashboard
const toastStyle = {
  background: '#09090B',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '12px',
  padding: '12px 16px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: '400',
  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.3)',
};

const successStyle = {
  ...toastStyle,
  border: '1px solid rgba(16, 185, 129, 0.3)',
};

const errorStyle = {
  ...toastStyle,
  border: '1px solid rgba(239, 68, 68, 0.3)',
};

const loadingStyle = {
  ...toastStyle,
  border: '1px solid rgba(99, 102, 241, 0.3)',
};

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 4000,
      icon: '🎉',
      style: successStyle,
    });
  },

  error: (message: string) => {
    toast.error(message, {
      duration: 5000,
      icon: '❌',
      style: errorStyle,
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      style: loadingStyle,
    });
  },

  // ✅ Real Score Toast
  score: (score: number, total: number, percentage: number) => {
    const icon = percentage >= 80 ? '🏆' : percentage >= 60 ? '🎯' : '📝';
    
    return toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-[#09090B] border border-white/[0.05] rounded-2xl shadow-2xl pointer-events-auto overflow-hidden`}
      >
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              percentage >= 80 ? 'bg-emerald-500/20' :
              percentage >= 60 ? 'bg-blue-500/20' : 'bg-orange-500/20'
            }`}>
              <span className="text-xl">{icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-white">Quiz Completed!</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  percentage >= 80 ? 'bg-emerald-500/20 text-emerald-400' :
                  percentage >= 60 ? 'bg-blue-500/20 text-blue-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {percentage}%
                </span>
              </div>
              <p className="text-xs text-white/40">
                You scored {score} out of {total}
              </p>
              <div className="mt-2 h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    percentage >= 80 ? 'bg-emerald-400' :
                    percentage >= 60 ? 'bg-blue-400' : 'bg-orange-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ), { duration: 5000 });
  },

  // ✅ Stats Update Toast
  stats: (newQuizzes: number, newStudents: number) => {
    return toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-[#09090B] border border-white/[0.05] rounded-2xl shadow-2xl pointer-events-auto`}
      >
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-sm font-medium text-white">Dashboard Updated</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/[0.02] rounded-lg p-2">
              <p className="text-[10px] text-white/30">new quizzes</p>
              <p className="text-sm font-light text-white">+{newQuizzes}</p>
            </div>
            <div className="bg-white/[0.02] rounded-lg p-2">
              <p className="text-[10px] text-white/30">active students</p>
              <p className="text-sm font-light text-white">{newStudents}</p>
            </div>
          </div>
        </div>
      </div>
    ), { duration: 4000 });
  },

  // ✅ Achievement Toast
  achievement: (title: string, description: string) => {
    return toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl shadow-2xl pointer-events-auto`}
      >
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{title}</p>
              <p className="text-xs text-white/40 mt-0.5">{description}</p>
            </div>
          </div>
        </div>
      </div>
    ), { duration: 6000 });
  },

  // ✅ Promise wrapper
  promise: async <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages, {
      loading: {
        style: loadingStyle,
      },
      success: {
        icon: '🎉',
        style: successStyle,
      },
      error: {
        icon: '❌',
        style: errorStyle,
      },
    });
  },
};