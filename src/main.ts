import 'dotenv/config'
import OpenAI from "openai";
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { createInterface } from 'readline/promises';

const openai = new OpenAI();
const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT || "You are a helpful assistant."

async function getNextResponse(input: ChatCompletionMessageParam[], openai: OpenAI): Promise<ChatCompletion.Choice> {
  if (input.length <= 1) {
    throw new Error("no prompt, not going to waste credits making an API call.")
  }

  const completion = await openai.chat.completions.create({
    messages: input,
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0];
}

async function main() {
  console.log("Welcome to MyWrapper. Your system prompt is:\n" + SYSTEM_PROMPT);
  let conversation: ChatCompletionMessageParam[] = [{
    role: "system",
    content: SYSTEM_PROMPT,
  }];
  const readLine = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  });
  let lastMessage = "Please start the conversation...";
  while (true) {
    const nextPrompt = await readLine.question(lastMessage + "\n");
    conversation.push({
      role: "user",
      content: nextPrompt,
    });
    const response = await getNextResponse(conversation, openai);
    if (response.finish_reason == "content_filter") {
      lastMessage = "Couldn't get that past the content filter...wanna try again?";
      continue;
    }
    if (response.finish_reason == "length") {
      console.log("Maxed out the context length for OpenAI - start a new conversation!");
      break;
    }
    conversation.push(response.message)
    lastMessage = response.message.content
  }
}

main();