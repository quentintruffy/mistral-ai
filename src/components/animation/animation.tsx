import { useAIStore } from '@/stores/useAIStore';
import React, { useEffect, useState } from 'react';

interface CodeBlock {
  content: string;
  start: number;
  end: number;
}

interface Command {
  type: string;
  value: string;
  start: number;
  end: number;
}

interface TypingAnimationProps {
  message: string;
  speed?: number;
  role?: 'user' | 'assistant' | 'system' | 'tool';
}

interface MessageProps {
  message: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  message,
  speed = 50,
  role = 'assistant',
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);
  const [commands, setCommands] = useState<Command[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const { setIsFetching } = useAIStore();

  const extractCommands = (text: string): Command[] => {
    const cmdRegex = /\[cmd:(.*?)\]/g;
    const commands: Command[] = [];
    let match;

    while ((match = cmdRegex.exec(text)) !== null) {
      commands.push({
        type: match[1].split(':')[0],
        value: match[1].split(':')[1],
        start: match.index,
        end: match.index + match[0].length,
      });
    }

    return commands;
  };

  const processFullMessage = (text: string): string => {
    const blocks = extractCodeBlocks(text);
    let processedText = text;

    blocks.reverse().forEach((block) => {
      const before = processedText.slice(0, block.start);
      const after = processedText.slice(block.end);
      processedText =
        before +
        '\n<button class="cursor-pointer bg-neutral-100 border border-neutral-200 rounded-xl p-2 h-fit w-fit">test</button>\n' +
        after;
    });

    const cmds = extractCommands(processedText);
    cmds.reverse().forEach((cmd) => {
      processedText =
        processedText.slice(0, cmd.start) + processedText.slice(cmd.end);
    });

    return processedText.replace(/\n$/, '');
  };

  const extractCodeBlocks = (text: string): CodeBlock[] => {
    const blocks: CodeBlock[] = [];
    let currentBlock = '';
    let isInBlock = false;
    let startIndex = 0;

    for (let i = 0; i < text.length; i++) {
      if (text.slice(i, i + 3) === '```') {
        if (!isInBlock) {
          startIndex = i;
          isInBlock = true;
          i += 2;
        } else {
          blocks.push({
            content: currentBlock,
            start: startIndex,
            end: i + 3,
          });
          currentBlock = '';
          isInBlock = false;
          i += 2;
        }
      } else if (isInBlock) {
        currentBlock += text[i];
      }
    }
    return blocks;
  };

  useEffect(() => {
    setIsComplete(false);
    if (role === 'user') {
      setDisplayedText(processFullMessage(message));
      setCurrentIndex(message.length);
      setIsComplete(true);
    } else {
      setDisplayedText('');
      setCurrentIndex(0);
      setCodeBlocks(extractCodeBlocks(message));
      setCommands(extractCommands(message));
    }
  }, [message, role]);

  useEffect(() => {
    if (role === 'user') return;

    if (currentIndex < message.length) {
      const timer = setTimeout(() => {
        const command = commands.find(
          (cmd) =>
            cmd.start === currentIndex ||
            (currentIndex > cmd.start && currentIndex < cmd.end),
        );

        const codeBlock = codeBlocks.find(
          (block) =>
            block.start === currentIndex ||
            (currentIndex > block.start && currentIndex < block.end),
        );

        if (command && currentIndex === command.start) {
          setCurrentIndex(command.end);
        } else if (codeBlock && currentIndex === codeBlock.start) {
          setDisplayedText(
            (prev) =>
              prev +
              '\n<button class="cursor-pointer bg-neutral-100 border border-neutral-200 rounded-xl p-2 h-fit w-fit">test</button>\n',
          );
          setCurrentIndex(codeBlock.end);
        } else if (!command && !codeBlock) {
          setDisplayedText((prev) => prev + message[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }
      }, speed);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      setIsFetching(false);
    }
  }, [currentIndex, message, speed, codeBlocks, commands, role, isComplete]);

  return (
    <div
      className="whitespace-pre-wrap break-words"
      dangerouslySetInnerHTML={{
        __html: displayedText.replace(/\n/g, '<br/>'),
      }}
    />
  );
};

export { TypingAnimation };
export type { MessageProps, TypingAnimationProps };
