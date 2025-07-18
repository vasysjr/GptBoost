import './styles/globals.css';

export const metadata = {
  title: 'GPTBoost',
  description: 'AI-powered deck generator and business automations.',
  icons: {
    icon: './favicon.ico', // або .png, якщо такий у тебе
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
