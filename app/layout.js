
export const metadata = {
  title: 'GPTBoost – AI Automation Portfolio',
  description: 'AI-powered business automation for decks, emails and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
