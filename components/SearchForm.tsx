import React, { useState } from 'react';
import { SongLanguage, SearchFormData } from '../types';

const OPENROUTER_API_KEY = "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"; // ← اینجا کلیدتو بذار

const SearchForm: React.FC = () => {
  const [formData, setFormData] = useState<SearchFormData>({
    artist: '',
    lyrics: '',
    language: SongLanguage.PERSIAN
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults(null);

    if (!formData.lyrics.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://music-finder-o27w.onrender.com",
            "X-Title": "Music Finder"
          },
          body: JSON.stringify({
            model: "tngtech/deepseek-r1t2-chimera:free",
            messages: [
              {
                role: "user",
                content: `
Find the song name and artist based on these details:
Lyrics: ${formData.lyrics}
Artist (if any): ${formData.artist}
Language: ${formData.language}

Return a clear answer.
                `
              }
            ]
          })
        }
      );

      if (!response.ok) {
        throw new Error("درخواست به API موفقیت‌آمیز نبود");
      }

      const data = await response.json();
      setResults(data.choices?.[0]?.message?.content || data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "خطای نامشخص");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">
        <textarea
          className="w-full mb-4 p-3 border rounded"
          placeholder="متن آهنگ..."
          value={formData.lyrics}
          onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
        />

        <input
          className="w-full mb-4 p-3 border rounded"
          placeholder="نام خواننده (اختیاری)"
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white p-3 rounded"
        >
          {isLoading ? "در حال جستجو..." : "پیدا کن"}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600">
          ❌ {error}
        </div>
      )}

      {results && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <pre className="text-sm whitespace-pre-wrap">{results}</pre>
        </div>
      )}
    </>
  );
};

export default SearchForm;



// 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
