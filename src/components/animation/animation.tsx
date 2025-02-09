import { useAIStore } from '@/stores/useAIStore';
import React, { useEffect, useState } from 'react';

interface CodeBlock {
  content: string;
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
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const { setIsFetching } = useAIStore();

  // Fonction pour traiter le message complet
  const processFullMessage = (text: string): string => {
    const blocks = extractCodeBlocks(text);
    let processedText = text;

    // Remplacer tous les blocs de code d'un coup
    blocks.reverse().forEach((block) => {
      const before = processedText.slice(0, block.start);
      const after = processedText.slice(block.end);
      processedText =
        before +
        '\n<button class="cursor-pointer bg-neutral-100 border border-neutral-200 rounded-xl p-2 h-fit w-fit">test</button>\n' +
        after;
    });

    return processedText;
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
      // Sinon, réinitialiser pour l'animation
      setDisplayedText('');
      setCurrentIndex(0);
      setCodeBlocks(extractCodeBlocks(message));
    }
  }, [message, role]);

  useEffect(() => {
    if (role === 'user') return;

    if (currentIndex < message.length) {
      const timer = setTimeout(() => {
        const codeBlock = codeBlocks.find(
          (block) =>
            block.start === currentIndex ||
            (currentIndex > block.start && currentIndex < block.end),
        );

        if (codeBlock && currentIndex === codeBlock.start) {
          // Remplacer le bloc de code par un div personnalisé
          setDisplayedText(
            (prev) =>
              prev +
              '<button class="cursor-pointer bg-neutral-100 border border-neutral-200 rounded-xl p-2 h-fit w-fit">test</button>',
          );
          setCurrentIndex(codeBlock.end);
        } else if (!codeBlock) {
          setDisplayedText((prev) => prev + message[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }
      }, speed);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      // Animation terminée
      setIsComplete(true);
      setIsFetching(false);
    }
  }, [currentIndex, message, speed, codeBlocks]);

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
