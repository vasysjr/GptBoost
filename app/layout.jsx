import './styles/globals.css'
<head> 
  <link rel="icon" href="/favicon.ico" />
</head>
export const metadata = {
  title: 'GPTBoost',
  description: 'AI-powered deck generator and business automations.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans p-8">
        <main className="max-w-3xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
