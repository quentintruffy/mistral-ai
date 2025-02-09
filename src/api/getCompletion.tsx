import {
  MessageSchema,
  MessagesType,
  MessageType,
} from '@/schemas/messages.schemas';
import axios from 'axios';

const getCompletion = async ({
  messages,
}: {
  messages: MessagesType;
}): Promise<MessageType | null> => {
  try {
    const messageslist: {
      role: 'user' | 'assistant' | 'tool' | 'system';
      content: string;
    }[] = messages.map((msg) => ({
      role: msg.choices[0].message.role,
      content: msg.choices[0].message.content,
    }));

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_MISTRAL_API_URL}/v1/chat/completions`,
      {
        model: 'mistral-small-latest',
        messages: messageslist,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MISTRAL_API_KEY}`,
        },
      },
    );

    const safeModels = await MessageSchema.safeParseAsync(response.data);

    if (safeModels.error) {
      return null;
    }
    return safeModels.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getCompletion };
