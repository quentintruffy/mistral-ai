import type { Meta } from '@storybook/react';
import { TypingAnimation } from '.';

export default {
  title: 'Library/TypingAnimation',
  component: TypingAnimation,
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
} as Meta<typeof TypingAnimation>;

export const Default = () => <TypingAnimation message="Hello, how are you ?" />;
