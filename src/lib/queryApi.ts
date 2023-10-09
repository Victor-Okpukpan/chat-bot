import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/index.mjs';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY
});

// const conversation: ChatCompletionMessageParam[] = [];

const conversations: Record<string, ChatCompletionMessageParam[]> = {};

const query = async (
  prompt: string ,
  chatId: string,
  model: string
) => {

  // conversation.push({ role: 'user', content: prompt });

  if (!conversations[chatId]) {
    conversations[chatId] = []; // Initialize a new conversation for the chatId
  }

  conversations[chatId].push({ role: 'user', content: prompt });

  const res = await openai.chat.completions.create({
      model,
      messages: conversations[chatId],
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.choices[0].message.content)
    .catch((err) => `there was an error ${err.message}`);

    conversations[chatId].push({ role: 'assistant', content: res });

  return res;
};

export default query;
