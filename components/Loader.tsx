
import React, { useState, useEffect } from 'react';

const Loader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "در حال جستجو در میان میلیون‌ها آهنگ...",
    "کمی صبر کنید، هوش مصنوعی در حال گوش دادن است...",
    "در حال تحلیل متن ترانه شما...",
    "تقریباً تمومه! دنبال لینک دانلود می‌گردم...",
    "اطلاعات آهنگ پیدا شد، دارم مرتبش می‌کنم..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-indigo-200 dark:border-indigo-900 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-indigo-600 dark:border-t-indigo-400 border-gray-100 dark:border-gray-800 rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 font-medium text-center animate-bounce">
        {messages[messageIndex]}
      </p>
    </div>
  );
};

export default Loader;
