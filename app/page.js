export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold max-w-4xl leading-tight">
        Automate your business with <span className="text-purple-400">ChatGPT</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl max-w-xl text-gray-300">
        Save hours every week with smart tools that generate presentations, send dynamic emails, and connect to your systems — built for founders & coaches.
      </p>
      <a
        href="https://www.fiverr.com/s/bdjQPlY"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-xl text-lg transition"
      >
        🔧 Order on Fiverr
      </a>
    </main>
  );
}
