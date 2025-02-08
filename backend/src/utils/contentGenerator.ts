import Groq from "groq-sdk";

type GenerateBlogInput = {
  title: string,
  apiKey: string,
}

export async function GenerateBlogContent(input: GenerateBlogInput) {
  const chatCompletion = await getGroqChatCompletion(input);
  const response = chatCompletion.choices[0]?.message?.content || "";
  console.log(response);
  return response;
}

export const getGroqChatCompletion = async (input: GenerateBlogInput) => {
  const groq = new Groq({
    apiKey: input.apiKey 
  });

  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "you are a helpful assistant.",
      },
      {
        role: "user",
        content: `Write a blog on ${input.title} in 500 words`,
      },
    ],

    model: "llama-3.3-70b-versatile",

    //
    // Optional parameters
    //

    // Controls randomness: lowering results in less random completions.
    // As the temperature approaches zero, the model will become deterministic
    // and repetitive.
    temperature: 0.5,

    // The maximum number of tokens to generate. Requests can use up to
    // 2048 tokens shared between prompt and completion.
    max_completion_tokens: 1024,

    // Controls diversity via nucleus sampling: 0.5 means half of all
    // likelihood-weighted options are considered.
    top_p: 1,

    stop: null,

    stream: false,
  });
};
