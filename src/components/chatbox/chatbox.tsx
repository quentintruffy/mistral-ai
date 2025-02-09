'use client';

import { useAIStore } from '@/stores/useAIStore';
import { SlotsToClasses } from '@/utils';
import { SquareTerminal } from 'lucide-react';
import { forwardRef, HTMLAttributes, useEffect, useRef } from 'react';
import { chatbox } from '.';
import { TypingAnimation } from '../animation/animation';

type ChatboxProps = {
  classNames?: SlotsToClasses<keyof typeof chatbox.slots>;
};

type UseChatboxProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof ChatboxProps
> &
  ChatboxProps;

const Chatbox = forwardRef<HTMLDivElement, UseChatboxProps>(
  ({ classNames }, ref) => {
    const {
      wrapper_chatbox,
      wrapper_messages,
      row_message,
      wrapper_message,
      message_user,
      wrapper_content,
    } = chatbox();
    const { messages, showCanvas, setShowCanvas } = useAIStore();

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, [messages]);

    return (
      <div
        ref={containerRef}
        className={wrapper_chatbox({
          className: classNames?.wrapper_chatbox,
        })}
      >
        {messages.length > 1 ? null : (
          <div className="flex items-center justify-center h-full text-neutral-800 font-medium">
            Bonjour, je suis l'assistant virtuel de Quentin.
          </div>
        )}

        {messages
          .filter((r) => r.choices[0].message.role !== 'system')
          .map((message, index) => {
            const commands = extractCommands(
              message.choices[0].message.content,
            );

            return (
              <div
                key={index}
                className={wrapper_messages({
                  className: classNames?.wrapper_messages,
                })}
              >
                <div
                  className={row_message({
                    className: classNames?.row_message,
                    role: message.choices[0].message.role,
                  })}
                >
                  <div
                    className={wrapper_content({
                      className: classNames?.wrapper_content,
                    })}
                  >
                    <div
                      className={message_user({
                        className: classNames?.message_user,
                        role: message.choices[0].message.role,
                      })}
                    >
                      {message.choices[0].message.role === 'user'
                        ? 'Vous'
                        : message.choices[0].message.role
                            .charAt(0)
                            .toUpperCase()
                            .concat(message.choices[0].message.role.slice(1))}
                    </div>
                    <div
                      className={wrapper_message({
                        className: classNames?.wrapper_message,
                      })}
                    >
                      <TypingAnimation
                        speed={30}
                        message={message.choices[0].message.content}
                        role={message.choices[0].message.role}
                      />
                    </div>
                    {commands
                      ? commands.map((cmd, cmdIndex) => (
                          <div
                            key={cmdIndex}
                            className="flex flex-row space-x-1"
                          >
                            <button
                              onClick={() => setShowCanvas(!showCanvas)}
                              className="inline-flex items-center gap-2 cursor-pointer duration-150 text-sm bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-xl border border-neutral-200"
                            >
                              <SquareTerminal size={14} />
                              {showCanvas ? 'Fermer le CV' : 'Voir le CV'}
                            </button>
                            <a
                              href="/assets/Resume.png"
                              download={'Resume.png'}
                              className="inline-flex items-center gap-2 cursor-pointer duration-150 text-sm bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-xl border border-neutral-200"
                            >
                              <SquareTerminal size={14} />
                              Telecharger le CV
                            </a>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  },
);
Chatbox.displayName = 'Chatbox';

const extractCommands = (text: string) => {
  const cmdRegex = /\[cmd:(.*?)\]/g;
  const commands = [];
  let match;

  while ((match = cmdRegex.exec(text)) !== null) {
    const fullCommand = match[1];
    const [type, value] = fullCommand.split(':');
    commands.push({ type, value });
  }

  return commands;
};

export { Chatbox };
export type { ChatboxProps, UseChatboxProps };
