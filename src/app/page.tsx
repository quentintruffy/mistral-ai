import { Background } from '@/components/background';
import { Canvas } from '@/components/canvas';
import { Chatbox } from '@/components/chatbox';
import { Input } from '@/components/input';

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute left-4 top-4 text-neutral-900 font-medium">
        Quentin Truffy
      </div>
      <Background />
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col gap-4 grow mx-auto max-w-2xl w-full">
          <div className="grow overflow-y-auto no-scrollbar">
            <Chatbox />
          </div>
          <div className="flex flex-col">
            <Input />
            <div className="flex justify-center py-2">
              <a className="text-xs text-gray-700" href="https://mistral.ai/">
                Le chatbot utilise l'api public de Mistal.AI
              </a>
            </div>
          </div>
        </div>
        <Canvas />
      </div>
    </div>
  );
}
