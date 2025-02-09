import { tv } from 'tailwind-variants';

const chatbox = tv({
  slots: {
    wrapper_chatbox:
      'flex flex-col space-y-4 overflow-y-auto no-scrollbar h-full w-full',
    wrapper_messages: 'w-full h-fit',
    row_message: 'flex w-full',
    wrapper_content: 'flex flex-col space-y-1',
    wrapper_message:
      'flex items-center p-3 text-sm rounded-2xl w-fit bg-white border border-neutral-200 shadow-md',
    message_user: 'flex text-neutral-600 text-sm w-full',
  },
  variants: {
    role: {
      user: {
        row_message: 'justify-end',
        message_user: 'justify-end',
      },
      assistant: {
        row_message: 'justify-start',
      },
      system: {
        row_message: 'justify-start',
      },
      tool: {
        row_message: 'justify-start',
      },
    },
  },
});
export { chatbox };
