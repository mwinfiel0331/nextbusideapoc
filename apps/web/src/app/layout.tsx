import type { Metadata } from 'next';
import '@/globals.css';

export const metadata: Metadata = {
  title: 'Next Business Idea',
  description: 'Generate and score business ideas personalized to your profile',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-3xl font-bold text-blue-600">🚀 Next Business Idea</h1>
            <p className="text-gray-600 mt-1">
              Generate business ideas personalized to your profile
            </p>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        <footer className="bg-gray-200 mt-16 py-4 text-center text-gray-700">
          <p>POC v0.1.0 • Deterministic Scoring • Mock Integrations</p>
        </footer>
      </body>
    </html>
  );
}
