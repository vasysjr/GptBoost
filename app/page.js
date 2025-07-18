import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [slides, setSlides] = useState([])

  const handleGenerate = () => {
    // Mock slides — replace with real API later
    setSlides([
      {
        title: 'Problem',
        description: 'Many small businesses struggle to create effective pitch decks without expensive tools or designers.',
      },
      {
        title: 'Solution',
        description: 'GPTBoost instantly generates high-quality slide content powered by AI, tailored to your business idea.',
      },
    ])
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 px-4 py-12 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">GPTBoost</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 text-center max-w-2xl">
        From idea to deck — in seconds, with AI
      </p>

      <div className="w-full max-w-xl mb-10">
        <p className="text-sm text-gray-500 mb-2">Type your business idea, and we’ll generate the first 2 slides of your pitch deck.</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your project"
          rows={4}
          className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleGenerate}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Generate Slides
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
          >
            <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
            <p className="text-gray-600">{slide.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
