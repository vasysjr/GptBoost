export async function POST(req: Request) {
  const { idea } = await req.json();

  const messages = [
    {
      role: "system",
      content:
        "You are an expert startup pitch writer. Respond ONLY in JSON format with keys: problem, solution.",
    },
    {
      role: "user",
      content: `Business idea: ${idea}`,
    },
  ];

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://gptboost.vercel.app",
      "X-Title": "GPTBoost AI Deck Generator",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages,
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  const text = data.choices?.[0]?.message?.content || "";

  // Спробуємо вилучити JSON навіть якщо GPT додав пояснення
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return new Response(JSON.stringify({ error: "No valid JSON found", raw: text }), { status: 500 });
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    return new Response(JSON.stringify(parsed), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "JSON parse failed", raw: text }), { status: 500 });
  }
}
