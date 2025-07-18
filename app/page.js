export default function Home() {
  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">GPTBoost</h1>
      <p className="text-gray-700 text-center mb-8">
        AI-powered deck generator and business automations.
      </p>

      <div className="flex gap-2 mb-6 justify-center">
        <input
          type="text"
          placeholder="Your project name"
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-sm"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Generate Slides
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Slide 1</h2>
          <p>Welcome to your automated pitch deck.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Slide 2</h2>
          <p>This slide was generated using GPTBoost AI.</p>
        </div>
      </div>

      <div className="text-center mt-6">
        <a
          href="https://fiverr.com"
          target="_blank"
          className="text-blue-500 underline"
        >
          Hire me on Fiverr
        </a>
      </div>
    </main>
  )
}
