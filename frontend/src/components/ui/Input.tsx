import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(({ className, ...rest }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-10 w-full rounded-input border border-slate-300 bg-white px-3 text-sm placeholder:text-slate-400',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:border-brand-500',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...rest}
  />
));
Input.displayName = 'Input';
