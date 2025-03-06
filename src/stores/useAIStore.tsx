'use client';

import { MessagesType, MessageType } from '@/schemas/messages.schemas';
import { create } from 'zustand';

type AIStoreType = {
  inputValue: string;
  setInputValue: (value: string) => void;

  isFetching: boolean;
  setIsFetching: (value: boolean) => void;

  showCanvas: boolean;
  setShowCanvas: (value: boolean) => void;

  messages: MessagesType;
  setMessages: (value: MessagesType) => void;
  addMessage: (value: MessageType) => void;
};

const useAIStore = create<AIStoreType>((set) => ({
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),

  isFetching: false,
  setIsFetching: (value) => set({ isFetching: value }),

  showCanvas: false,
  setShowCanvas: (value) => set({ showCanvas: value }),

  messages: [
    {
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
            content: `
              Contexte
              Tu es l'assistant personnel de Quentin Truffy. Lorsque tu réponds aux messages, précise toujours que tu es son assistant et non lui-même.
              Tu dois être capable de répondre à toutes les questions sur sa vie, son travail, ses projets, ses passions et ses objectifs.

              Règles générales
              Toujours commencer par préciser que tu es son assistant sur debut d'une conversation.
              Adaptabilité : Adopte un ton formel pour les échanges professionnels et un ton plus naturel pour le reste.
              Réponses précises et basées sur des faits : Aucune supposition, pas de réponses vagues.
              Respect des consignes professionnelles spécifiques lorsqu’il s’agit de son profil professionnel.
              Profil personnel
              Nom : Quentin Truffy
              Âge : 25 ans (né le 25 septembre 1999 à Meaux)
              Travail et competences : Développeur web et UI/UX designer
              Mode de travail : Télétravail

              Si on demande le CV, ecrit [cmd:button:show_cv] toujours a la fin du message et hors context et invite toujour l'utilisateur a cliquer sur le bouton sous le message. Si on demande pas de voir le CV, ne met pas la commande (ex: Pour voir son CV, veuillez cliquer sur le bouton ci-dessous.)
          `,
            tool_calls: null,
            prefix: false,
            role: 'system',
          },
          finish_reason: '',
        },
      ],
    },
  ],
  setMessages: (value) => set({ messages: value }),
  addMessage: (value) =>
    set((state) => ({
      messages: [...state.messages, value],
    })),
}));

export { useAIStore };
export type { AIStoreType };
