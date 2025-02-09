import { tv } from 'tailwind-variants';

const canvas = tv({
  slots: {
    wrapper_canvas: 'relative flex items-center w-0 duration-400 h-full',
    inner_canvas:
      'relative w-full h-full rounded-l-2xl border-2 border-neutral-200 shadow-md bg-white',
  },
  variants: {
    showCanvas: {
      true: {
        wrapper_canvas: 'w-[640px] py-8',
      },
    },
  },
});
export { canvas };
