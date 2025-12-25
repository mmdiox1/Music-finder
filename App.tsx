
import React, { useState, useEffect } from 'react';
import { SongLanguage, SongResult, SearchFormData } from './types';
import { findSong } from './services/geminiService';
import SearchForm from './components/SearchForm';
import ResultCard from './components/ResultCard';
import Loader from './components/Loader';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SongResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleSearch = async (formData: SearchFormData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await findSong(formData);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "خطایی رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Header */}
      <header className="p-4 md:p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            آهنگ‌یاب رعنا
          </h1>
        </div>
        <ThemeToggle darkMode={darkMode} toggle={() => setDarkMode(!darkMode)} />
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 dark:text-white">
            آهنگ مورد علاقه‌ت رو پیدا کن
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            بخشی از متن آهنگ رو بنویس تا هوش مصنوعی برات پیداش کنه!
          </p>
        </div>

        <div className="w-full space-y-8">
          <SearchForm onSearch={handleSearch} isLoading={loading} />

          {loading && <Loader />}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-2xl text-red-600 dark:text-red-400 text-center animate-pulse">
              {error}
            </div>
          )}

          {result && <ResultCard result={result} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} آهنگ‌یاب رعنا - قدرت گرفته از Gemini</p>
      </footer>
    </div>
  );
};

export default App;
