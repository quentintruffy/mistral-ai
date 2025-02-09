import type { Meta } from '@storybook/react';
import { Canvas, CanvasProps } from '.';

export default {
  title: 'Library/Canvas',
  component: Canvas,
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
} as Meta<typeof Canvas>;

export const Default = (props: CanvasProps) => <Canvas {...props} />;
