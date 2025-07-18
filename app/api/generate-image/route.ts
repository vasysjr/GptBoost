export const runtime = "nodejs"; // ВАЖЛИВО: дозволяє використовувати Buffer на Vercel

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return new Response(JSON.stringify({ error: "No prompt provided" }), { status: 400 });
  }

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ HuggingFace API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Image generation failed", raw: errorText }),
        { status: 500 }
      );
    }

    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString("base64");

    return new Response(JSON.stringify({ base64 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("❌ Server error:", err.message);
    return new Response(
      JSON.stringify({ error: "Server error", message: err.message }),
      { status: 500 }
    );
  }
}
