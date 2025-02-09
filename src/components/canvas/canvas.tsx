'use client';

import { useAIStore } from '@/stores/useAIStore';
import { SlotsToClasses } from '@/utils';
import Image from 'next/image';
import { forwardRef, HTMLAttributes } from 'react';
import { canvas } from '.';

type CanvasProps = {
  classNames?: SlotsToClasses<keyof typeof canvas.slots>;
};

type UseCanvasProps = Omit<HTMLAttributes<HTMLDivElement>, keyof CanvasProps> &
  CanvasProps;

const Canvas = forwardRef<HTMLDivElement, UseCanvasProps>(
  ({ classNames }, ref) => {
    const { showCanvas } = useAIStore();
    const { wrapper_canvas, inner_canvas } = canvas();
    return (
      <div
        className={wrapper_canvas({
          className: classNames?.wrapper_canvas,
          showCanvas,
        })}
        ref={ref}
      >
        <div className={inner_canvas({ className: classNames?.inner_canvas })}>
          <Image
            src="/assets/Resume.png"
            alt="Resume"
            fill
            className="object-contain"
          />
        </div>
      </div>
    );
  },
);
Canvas.displayName = 'Canvas';

export { Canvas };
export type { CanvasProps, UseCanvasProps };
