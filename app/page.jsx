'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Page() {
  const [input, setInput] = useState('');
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setSlides([]);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: input }),
      });

      const data = await res.json();
      if (!data.slides || !Array.isArray(data.slides)) {
        throw new Error('Invalid response from API');
      }

      // Генерація зображень по image_prompt
      const slidesWithImages = await Promise.all(
        data.slides.map(async (slide) => {
          try {
            const imgRes = await fetch('/api/generate-image', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt: slide.image_prompt }),
            });

            const imgData = await imgRes.json();
            return {
              ...slide,
              image: imgData.base64 ? `data:image/png;base64,${imgData.base64}` : null,
            };
          } catch {
            return { ...slide, image: null };
          }
        })
      );

      setSlides(slidesWithImages);
    } catch (err) {
      console.error(err);
      alert('Something went wrong while generating slides.');
    } finally {
      setLoading(false);
    }
  };

  return  (
    <main className="min-h-screen bg-gray-50 text-gray-800 px-4 py-12 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">GPTBoost</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 text-center max-w-2xl">
        From idea to full deck — in seconds, with AI
      </p>

      <div className="w-full max-w-xl mb-10">
        <p className="text-sm text-gray-500 mb-2">
          Type your business idea, and we’ll generate a 6-slide startup pitch deck.
        </p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your project"
          rows={4}
          className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Generating…' : 'Generate Deck'}
        </button>
        {slides.length > 0 && (
  <button
    onClick={() => {
      const text = slides
        .map(
          (s, i) =>
            `${i + 1}. ${s.slide_title}\n${s.content.map((c) => `- ${c}`).join("\n")}`
        )
        .join("\n\n");

      navigator.clipboard.writeText(text);
      alert("✅ Slides copied to clipboard!");
    }}
    className="mt-4 text-sm text-gray-600 underline hover:text-gray-800 transition"
  >
    📋 Copy all slides
  </button>
)}

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        <AnimatePresence>
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-2">
                {index + 1}. {slide.slide_title}
              </h3>
              <ul className="list-disc list-inside text-gray-700 mb-3">
                {slide.content.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              {slide.image && (
                <img
                  src={slide.image}
                  alt={`AI visual for ${slide.slide_title}`}
                  className="mt-4 rounded-xl w-full object-cover max-h-64"
                />
              )}
              <p className="text-sm text-gray-500 mt-2">
                <strong>Image prompt:</strong> {slide.image_prompt}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
        <footer className="mt-10 text-center text-sm text-gray-500">
  <div>
    Built with ❤️ by GPTBoost · © 2025
  </div>
  <div className="mt-2">
    <a
      href="https://www.fiverr.com/s/WEXav2R"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
    >
      🎯Hire me on Fiverr
    </a>
  </div>
</footer>


      </div>
    </main>
  );
}
