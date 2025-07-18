export async function POST(req: Request) {
  const { idea } = await req.json();

  const messages = [
    {
      role: "system",
      content:
        "Respond ONLY with raw JSON. No explanation. Format: {\"problem\": \"...\", \"solution\": \"...\"}. Do not include any other text.",
    },
    {
      role: "user",
      content: `Business idea: ${idea}`,
    },
  ];

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://gptboost.vercel.app",
        "X-Title": "GPTBoost AI Deck Generator",
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b", // НАДІЙНІШЕ НІЖ GPT
        messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";

    console.log("🧠 GPT response text:", text);

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return new Response(
        JSON.stringify({
          error: "No valid JSON found",
          raw: text,
        }),
        { status: 500 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return new Response(JSON.stringify(parsed), { status: 200 });
  } catch (err: any) {
    console.error("❌ API error:", err);
    return new Response(
      JSON.stringify({ error: "API call failed", message: err.message }),
      { status: 500 }
    );
  }
}
