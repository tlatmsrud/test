import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

type DivProps = HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-card border border-slate-200 bg-white shadow-sm', className)}
    {...rest}
  />
));
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn('px-5 pt-5 pb-3', className)} {...rest} />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...rest }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-tight text-slate-900', className)}
      {...rest}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...rest }, ref) => (
    <p ref={ref} className={cn('text-sm text-slate-500 mt-1', className)} {...rest} />
  ),
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn('px-5 pb-5', className)} {...rest} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, DivProps>(({ className, ...rest }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center px-5 py-4 border-t border-slate-100', className)}
    {...rest}
  />
));
CardFooter.displayName = 'CardFooter';
