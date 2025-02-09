import type { Meta } from '@storybook/react';
import { Chatbox, ChatboxProps } from '.';

export default {
  title: 'Library/Chatbox',
  component: Chatbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-[540px] h-fit space-x-2 ">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Chatbox>;

export const Default = (props: ChatboxProps) => <Chatbox {...props} />;
