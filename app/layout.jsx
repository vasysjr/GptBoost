import './styles/globals.css';

export const metadata = {
  title: 'GPTBoost',
  description: 'AI-powered deck generator and business automations.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
