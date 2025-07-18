export async function POST(req: Request) {
  const { idea } = await req.json();

  const messages = [
    {
      role: "system",
      content: `You are a startup presentation assistant. Create a startup pitch deck structure with 6 slides based on the idea the user provides.

Return JSON ONLY in this format:
[
  {
    "slide_title": "Problem",
    "content": [
      "Bullet 1",
      "Bullet 2"
    ],
    "image_prompt": "Prompt for AI image generation"
  },
  ...
]
Do not say anything outside of this JSON array.`,
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
        model: "mistralai/mixtral-8x7b-instruct",
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("❌ GPT error response:", errText);
      return new Response(JSON.stringify({ error: "GPT error", raw: errText }), { status: 500 });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";

    console.log("🧠 GPT response text:", text);

    if (!text || text.length < 5) {
      return new Response(JSON.stringify({ error: "Empty response from GPT", raw: text }), {
        status: 500,
      });
    }

    const jsonMatch = text.match(/\[[\s\S]*\]/); // масив слайдів

    if (!jsonMatch) {
      return new Response(JSON.stringify({ error: "No valid JSON array found", raw: text }), {
        status: 500,
      });
    }

    const parsedSlides = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify({ slides: parsedSlides }), { status: 200 });
  } catch (err: any) {
    console.error("❌ API error:", err);
    return new Response(JSON.stringify({ error: "API call failed", message: err.message }), {
      status: 500,
    });
  }
}
