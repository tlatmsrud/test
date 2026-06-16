import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/lib/utils/cn';

const button = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-input font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
  variants: {
    intent: {
      primary: 'bg-brand-600 text-white hover:bg-brand-700',
      secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
      ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
      outline: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
      danger: 'bg-danger-500 text-white hover:bg-red-600',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-6 text-base',
      icon: 'h-9 w-9 p-0',
    },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, intent, size, type = 'button', ...rest }, ref) => (
    <button ref={ref} type={type} className={cn(button({ intent, size }), className)} {...rest} />
  ),
);
Button.displayName = 'Button';
