
// Main homepage file
export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white text-black">
      <h1 className="text-4xl font-bold mb-4">GPTBoost</h1>
      <p className="mb-6">AI-powered deck generator and business automations.</p>
      <form className="mb-6">
        <input type="text" placeholder="Your project name" className="border p-2 mr-2" />
        <button className="bg-black text-white px-4 py-2">Generate Slides</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Slide 1</h2>
          <p>Welcome to your automated pitch deck.</p>
        </div>
        <div className="border p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Slide 2</h2>
          <p>This slide was generated using GPTBoost AI.</p>
        </div>
      </div>
      <div className="mt-10">
        <a
          href="https://www.fiverr.com/vasysjr"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded mt-4"
        >
          Hire me on Fiverr
        </a>
      </div>
    </main>
  );
}
