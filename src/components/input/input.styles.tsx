import { tv } from 'tailwind-variants';

const input = tv({
  slots: {
    wrapper_animation:
      'h-fit w-full bg-neutral-200 p-0.5 rounded-[18px] shadow',
    wrapper_input:
      'bg-white flex flex-col space-y-0.5 h-full w-full rounded-2xl overflow-hidden bg-white p-2.5',
    wrapper_actions: 'flex flex-row items-center justify-between gap-2.5',
    action_textarea: 'w-full h-full px-1.5 resize-none outline-none',
    action_button:
      'inline-flex items-center justify-center cursor-pointer bg-[#D7CEEF] h-8 w-8 aspect-square rounded-[6px]',
    wrapper_edits: '',
    edit_button:
      'inline-flex items-center cursor-pointer text-xs gap-1 px-2 py-1 bg-neutral-200 hover:bg-neutral-300 rounded-[6px]',
  },
  variants: {
    isFetching: {
      true: {
        wrapper_animation:
          'bgscaled bg-linear-[45deg,#ff00ff,#ffff00] animate-[rotate_2s_linear_infinite]',
      },
    },
  },
});
export { input };
