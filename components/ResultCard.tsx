
import React from 'react';
import { SongResult } from '../types';

interface ResultCardProps {
  result: SongResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { songTitle, artistName, language, confidence, downloadUrl, spotifyUrl, youtubeUrl, summary, sources } = result;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold">
              {language}
            </span>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
              {songTitle}
            </h3>
            <p className="text-xl text-indigo-600 dark:text-indigo-400 font-medium">
              خواننده: {artistName}
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="relative h-16 w-16">
              <svg className="h-full w-full transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={175.9}
                  strokeDashoffset={175.9 - (175.9 * confidence) / 100}
                  className="text-indigo-600 dark:text-indigo-400 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
                {confidence}%
              </div>
            </div>
            <div className="text-sm font-bold text-gray-500 dark:text-gray-400">
              اطمینان AI
            </div>
          </div>
        </div>

        {summary && (
          <div className="mb-8 p-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
            <h4 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2">درباره این آهنگ:</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              {summary}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {downloadUrl ? (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              دانلود مستقیم MP3
            </a>
          ) : (
            <div className="flex items-center justify-center gap-2 py-4 bg-gray-100 dark:bg-gray-800 text-gray-500 font-bold rounded-2xl cursor-not-allowed">
              لینک دانلود یافت نشد
            </div>
          )}

          {spotifyUrl && (
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.302c-.223.367-.704.485-1.071.262-2.998-1.832-6.773-2.246-11.218-1.233-.418.094-.836-.168-.93-.586-.094-.418.168-.836.586-.93 4.887-1.115 9.043-.645 12.4 1.408.367.223.485.704.233 1.071zm1.47-3.26c-.282.457-.881.605-1.338.323-3.425-2.106-8.647-2.72-12.693-1.492-.514.156-1.05-.145-1.206-.659-.156-.514.145-1.05.659-1.206 4.62-1.402 10.384-.716 14.306 1.696.457.282.605.881.323 1.338zm.126-3.39c-4.108-2.438-10.88-2.664-14.782-1.48-.63.19-1.3-.158-1.49-.788-.19-.63.158-1.3.788-1.49 4.49-1.363 11.964-1.1 16.69 1.702.565.335.752 1.063.417 1.628-.335.565-1.063.752-1.628.417z"/>
              </svg>
              اسپاتیفای
            </a>
          )}

          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 bg-[#FF0000] hover:bg-[#ff1a1a] text-white font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              یوتیوب
            </a>
          )}
        </div>

        {sources && sources.length > 0 && (
          <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-6">
            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">منابع پیدا شده:</h5>
            <div className="flex flex-wrap gap-2">
              {sources.slice(0, 5).map((source, i) => (
                <a 
                  key={i} 
                  href={source} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-400 transition-colors truncate max-w-[200px]"
                >
                  {new URL(source).hostname}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
