import type { Meta } from '@storybook/react';
import { Input, InputProps } from '.';

export default {
  title: 'Library/Input',
  component: Input,
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
} as Meta<typeof Input>;

export const Default = (props: InputProps) => <Input {...props} />;
