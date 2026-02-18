// // components/ui/Card.tsx
// 'use client';

// import { forwardRef, HTMLAttributes } from 'react';
// import { cn } from '@/lib/utils';

// interface CardProps extends HTMLAttributes<HTMLDivElement> {
//   padding?: 'none' | 'sm' | 'md' | 'lg';
//   noBorder?: boolean;
//   noShadow?: boolean;
// }

// const Card = forwardRef<HTMLDivElement, CardProps>(
//   ({ 
//     className, 
//     padding = 'md', 
//     noBorder = false, 
//     noShadow = false,
//     children, 
//     ...props 
//   }, ref) => {
    
//     const paddings = {
//       none: 'p-0',
//       sm: 'p-3',
//       md: 'p-5',
//       lg: 'p-8',
//     };

//     return (
//       <div
//         ref={ref}
//         className={cn(
//           'bg-white rounded-lg',
//           !noBorder && 'border border-gray-200',
//           !noShadow && 'shadow-md',
//           paddings[padding],
//           className
//         )}
//         {...props}
//       >
//         {children}
//       </div>
//     );
//   }
// );

// Card.displayName = 'Card';

// // Optional subcomponents for better organization
// export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
//   ({ className, ...props }, ref) => (
//     <div
//       ref={ref}
//       className={cn('flex flex-col space-y-1.5 pb-4', className)}
//       {...props}
//     />
//   )
// );
// CardHeader.displayName = 'CardHeader';

// export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
//   ({ className, ...props }, ref) => (
//     <h3
//       ref={ref}
//       className={cn('text-lg font-semibold leading-none tracking-tight', className)}
//       {...props}
//     />
//   )
// );
// CardTitle.displayName = 'CardTitle';

// export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
//   ({ className, ...props }, ref) => (
//     <p
//       ref={ref}
//       className={cn('text-sm text-gray-500', className)}
//       {...props}
//     />
//   )
// );
// CardDescription.displayName = 'CardDescription';

// export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
//   ({ className, ...props }, ref) => (
//     <div ref={ref} className={cn('', className)} {...props} />
//   )
// );
// CardContent.displayName = 'CardContent';

// export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
//   ({ className, ...props }, ref) => (
//     <div
//       ref={ref}
//       className={cn('flex items-center pt-4', className)}
//       {...props}
//     />
//   )
// );
// CardFooter.displayName = 'CardFooter';

// export default Card; 






// components/ui/Card.tsx
'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default',
    padding = 'md', 
    hover = false,
    children, 
    ...props 
  }, ref) => {
    
    const variants = {
      default: 'bg-white border border-gray-200',
      glass: 'glass premium-shadow',
      gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100',
    };

    const paddings = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl transition-all duration-300',
          variants[variant],
          paddings[padding],
          hover && 'card-hover',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 mb-4', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-500', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center mt-4 pt-4 border-t border-gray-100', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export default Card;