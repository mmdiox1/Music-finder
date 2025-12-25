
import React, { useState } from 'react';
import { SongLanguage, SearchFormData } from '../types';

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [formData, setFormData] = useState<SearchFormData>({
    artist: '',
    lyrics: '',
    language: SongLanguage.PERSIAN
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lyrics.trim()) return;
    onSearch(formData);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 transition-all hover:shadow-2xl"
    >
      <div className="space-y-6">
        {/* Lyrics Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 mr-1">
            متن آهنگ (اجباری)
          </label>
          <textarea
            required
            value={formData.lyrics}
            onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
            placeholder="مثلا: ای که بی تو خودمو تک و تنها میبینم..."
            rows={4}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none transition-all resize-none dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Artist Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 mr-1">
              نام خواننده (اختیاری)
            </label>
            <input
              type="text"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              placeholder="مثلا: داریوش"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none transition-all dark:text-white"
            />
          </div>

          {/* Language Dropdown */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 mr-1">
              زبان آهنگ
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value as SongLanguage })}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none transition-all dark:text-white"
            >
              <option value={SongLanguage.PERSIAN}>فارسی</option>
              <option value={SongLanguage.ENGLISH}>انگلیسی</option>
              <option value={SongLanguage.KURDISH}>کردی</option>
              <option value={SongLanguage.ARABIC}>عربی</option>
              <option value={SongLanguage.TURKISH}>ترکی</option>
              <option value={SongLanguage.OTHER}>سایر</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !formData.lyrics.trim()}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-2xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>در حال جستجو...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>پیداش کن!</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
