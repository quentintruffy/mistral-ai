'use client';

import { getCompletion } from '@/api/getCompletion';
import { MessageType } from '@/schemas/messages.schemas';
import { useAIStore } from '@/stores/useAIStore';
import { SlotsToClasses } from '@/utils';
import { ArrowUp, ChevronUp } from 'lucide-react';
import { AreaHTMLAttributes, forwardRef, useMemo } from 'react';
import { input } from '.';

type InputProps = {
  classNames?: SlotsToClasses<keyof typeof input.slots>;
};

type UseInputProps = Omit<
  AreaHTMLAttributes<HTMLTextAreaElement>,
  keyof InputProps
> &
  InputProps;

const Input = forwardRef<HTMLTextAreaElement, UseInputProps>(
  ({ classNames }, ref) => {
    const {
      wrapper_animation,
      wrapper_input,
      wrapper_actions,
      action_textarea,
      action_button,
      wrapper_edits,
      edit_button,
    } = input();
    const {
      inputValue,
      setInputValue,
      isFetching,
      setIsFetching,
      messages,
      addMessage,
    } = useAIStore();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit({ customValue: inputValue });
      }
    };

    const suggestedInputs = useMemo(() => {
      return ["Parle moi de Quentin, s'il te plaît.", 'Que recherche-t-il ?'];
    }, []);

    const handleSubmit = async ({ customValue }: { customValue: string }) => {
      if (!customValue.trim()) return;
      if (isFetching) return;

      try {
        setIsFetching(true);
        const newUserMessage: MessageType = {
          id: Date.now().toString(),
          object: 'chat.completion.chunk',
          model: 'mistral-small-latest',
          usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
          },
          created: Date.now(),
          choices: [
            {
              index: 0,
              message: {
                content: customValue,
                tool_calls: null,
                prefix: false,
                role: 'user',
              },
              finish_reason: '',
            },
          ],
        };
        addMessage(newUserMessage);
        setInputValue('');
        const response = await getCompletion({
          messages: [...messages, newUserMessage],
        });
        if (response === null) {
          setIsFetching(false);
          return;
        }
        addMessage(response);
      } catch (error) {
        setIsFetching(false);
      }
    };

    return (
      <div className="flex flex-col space-y-1 h-fit w-full">
        <div className="flex flex-row space-x-1">
          {suggestedInputs.map((input, index) => (
            <button
              key={index}
              onClick={() =>
                handleSubmit({
                  customValue: input,
                })
              }
              className="inline-flex items-center gap-2 cursor-pointer duration-150 text-sm bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-xl border border-neutral-200"
            >
              {input}
            </button>
          ))}
        </div>
        <div
          className={wrapper_animation({
            className: classNames?.wrapper_animation,
            isFetching,
          })}
        >
          <div
            className={wrapper_input({ className: classNames?.wrapper_input })}
          >
            <div
              className={wrapper_actions({
                className: classNames?.wrapper_actions,
              })}
            >
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Que souhaitez-vous savoir ?"
                onKeyDown={handleKeyDown}
                rows={1}
                className={action_textarea({
                  className: classNames?.action_textarea,
                })}
              />
              <button
                onClick={() => handleSubmit({ customValue: inputValue })}
                className={action_button({
                  className: classNames?.action_button,
                })}
              >
                <ArrowUp size={20} className="stroke-neutral-800" />
              </button>
            </div>
            <div
              className={wrapper_edits({
                className: classNames?.wrapper_edits,
              })}
            >
              <button
                className={edit_button({ className: classNames?.edit_button })}
              >
                Mistral Small <ChevronUp size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
export type { InputProps, UseInputProps };
