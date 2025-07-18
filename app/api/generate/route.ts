// app/api/generate/route.ts

export async function POST(req: Request) {
  const { idea } = await req.json();

  const messages = [
    {
      role: "system",
      content: "You are an expert startup pitch writer. You generate concise, impactful Problem and Solution slide text based on a business idea.",
    },
    {
      role: "user",
      content: `Business idea: ${idea}\n\nGenerate a Problem and Solution slide. Respond in JSON with keys: "problem", "solution".`,
    },
  ];

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json",
      "HTTP-Referer": "https://gptboost.vercel.app", // твій сайт
      "X-Title": "GPTBoost AI Deck Generator"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", // можеш змінити на GPT-4, Claude тощо
      messages,
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  try {
    const text = data.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(text);
    return new Response(JSON.stringify(parsed), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to parse response", raw: data }), { status: 500 });
  }
}
