'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';

import { cn } from '@/lib/utils/cn';

type Props = ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

export const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, Props>(
  ({ className, ...rest }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn('block text-sm font-medium text-slate-700 mb-1.5', className)}
      {...rest}
    />
  ),
);
Label.displayName = 'Label';
