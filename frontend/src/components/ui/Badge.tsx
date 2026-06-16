import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/lib/utils/cn';

const badge = tv({
  base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  variants: {
    intent: {
      default: 'bg-slate-100 text-slate-700',
      brand: 'bg-brand-50 text-brand-700',
      success: 'bg-emerald-50 text-emerald-700',
      warning: 'bg-amber-50 text-amber-700',
      danger: 'bg-red-50 text-red-700',
    },
  },
  defaultVariants: { intent: 'default' },
});

interface Props extends VariantProps<typeof badge> {
  className?: string;
  children: React.ReactNode;
}

export const Badge = ({ className, intent, children }: Props) => (
  <span className={cn(badge({ intent }), className)}>{children}</span>
);
