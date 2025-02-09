'use client';

import { useAIStore } from '@/stores/useAIStore';
import { SlotsToClasses } from '@/utils';
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
    const { messages } = useAIStore();

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
        {messages
          .filter((r) => r.choices[0].message.role !== 'system')
          .map((message, index) => (
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
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  },
);
Chatbox.displayName = 'Chatbox';

export { Chatbox };
export type { ChatboxProps, UseChatboxProps };
