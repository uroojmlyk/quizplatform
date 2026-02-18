// // components/ui/Input.tsx
// 'use client';

// import { forwardRef, InputHTMLAttributes } from 'react';
// import { cn } from '@/lib/utils';

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   error?: string;
//   icon?: React.ReactNode;
// }

// const Input = forwardRef<HTMLInputElement, InputProps>(
//   ({ className, label, error, icon, id, type = 'text', ...props }, ref) => {
//     const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

//     return (
//       <div className="w-full">
//         {label && (
//           <label 
//             htmlFor={inputId} 
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             {label}
//           </label>
//         )}
//         <div className="relative">
//           {icon && (
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               {icon}
//             </div>
//           )}
//           <input
//             ref={ref}
//             id={inputId}
//             type={type}
//             className={cn(
//               'block w-full rounded-md border-gray-300 shadow-sm',
//               'focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
//               icon && 'pl-10',
//               error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
//               className
//             )}
//             {...props}
//           />
//         </div>
//         {error && (
//           <p className="mt-1 text-sm text-red-600">{error}</p>
//         )}
//       </div>
//     );
//   }
// );

// Input.displayName = 'Input';
// export default Input;  






// components/ui/Input.tsx
'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, type = 'text', ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              'block w-full rounded-xl border-gray-200 bg-white/50',
              'shadow-sm transition-all duration-200',
              'focus:border-primary-500 focus:ring-primary-500 focus:ring-2 focus:ring-opacity-20',
              'hover:border-gray-300',
              icon && 'pl-10',
              error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600 animate-slide-in">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;