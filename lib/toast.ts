// app/lib/toast.ts
import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 4000,
      icon: '🎉',
      style: {
        background: '#1a1a23',
        color: '#fff',
        border: '1px solid #22c55e',
      },
    });
  },

  error: (message: string) => {
    toast.error(message, {
      duration: 5000,
      icon: '❌',
      style: {
        background: '#1a1a23',
        color: '#fff',
        border: '1px solid #ef4444',
      },
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      style: {
        background: '#1a1a23',
        color: '#fff',
        border: '1px solid #3b82f6',
      },
    });
  },

  promise: async <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages, {
      success: {
        icon: '🎉',
        style: {
          border: '1px solid #22c55e',
        },
      },
      error: {
        icon: '❌',
        style: {
          border: '1px solid #ef4444',
        },
      },
    });
  },
};