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
    setSlides([]); // Очистити попередні слайди

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: input }),
      });

      const data = await res.json();
      if (data.problem && data.solution) {
        setSlides([
          { title: 'Problem', description: data.problem },
          { title: 'Solution', description: data.solution },
        ]);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong while generating slides.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 px-4 py-12 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">GPTBoost</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 text-center max-w-2xl">
        From idea to deck — in seconds, with AI
      </p>

      <div className="w-full max-w-xl mb-10">
        <p className="text-sm text-gray-500 mb-2">
          Type your business idea, and we’ll generate the first 2 slides of your pitch deck.
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
          {loading ? 'Generating…' : 'Generate Slides'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <AnimatePresence>
          {slides.map((slide, index) => (
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
              <p className="text-gray-600">{slide.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
