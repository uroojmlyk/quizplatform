// // components/ui/Button.tsx
// 'use client';

// import { forwardRef, ButtonHTMLAttributes } from 'react';
// import { cn } from '@/lib/utils';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
//   size?: 'sm' | 'md' | 'lg';
//   isLoading?: boolean;
//   fullWidth?: boolean;
// }

// const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ 
//     className, 
//     variant = 'primary', 
//     size = 'md', 
//     isLoading = false, 
//     fullWidth = false,
//     children, 
//     disabled, 
//     ...props 
//   }, ref) => {
    
//     const variants = {
//       primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:hover:bg-blue-600',
//       secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:hover:bg-gray-600',
//       outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
//       ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
//       danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:hover:bg-red-600',
//     };

//     const sizes = {
//       sm: 'px-3 py-1.5 text-sm',
//       md: 'px-4 py-2 text-base',
//       lg: 'px-6 py-3 text-lg',
//     };

//     return (
//       <button
//         ref={ref}
//         disabled={disabled || isLoading}
//         className={cn(
//           'inline-flex items-center justify-center font-medium rounded-md transition-colors',
//           'focus:outline-none focus:ring-2 focus:ring-offset-2',
//           'disabled:opacity-50 disabled:cursor-not-allowed',
//           variants[variant],
//           sizes[size],
//           fullWidth && 'w-full',
//           className
//         )}
//         {...props}
//       >
//         {isLoading ? (
//           <>
//             <svg 
//               className="animate-spin -ml-1 mr-2 h-4 w-4" 
//               xmlns="http://www.w3.org/2000/svg" 
//               fill="none" 
//               viewBox="0 0 24 24"
//             >
//               <circle 
//                 className="opacity-25" 
//                 cx="12" 
//                 cy="12" 
//                 r="10" 
//                 stroke="currentColor" 
//                 strokeWidth="4"
//               />
//               <path 
//                 className="opacity-75" 
//                 fill="currentColor" 
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               />
//             </svg>
//             Loading...
//           </>
//         ) : (
//           children
//         )}
//       </button>
//     );
//   }
// );

// Button.displayName = 'Button';
// export default Button;  








// components/ui/Button.tsx
'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    fullWidth = false,
    icon,
    children, 
    disabled, 
    ...props 
  }, ref) => {
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg shadow-primary-500/30',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline: 'border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg shadow-red-500/30',
      gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg shadow-blue-500/30',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-lg',
      md: 'px-6 py-2.5 text-base rounded-xl',
      lg: 'px-8 py-3 text-lg rounded-xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;