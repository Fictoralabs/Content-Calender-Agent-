
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Analyzing your brand's unique voice...",
  "Researching platform-specific best practices...",
  "Developing strategic content pillars...",
  "Mapping content to optimal posting times...",
  "Crafting engaging post copy and CTAs...",
  "Building your 30-day content calendar...",
  "Finalizing content briefs and recommendations..."
];

const LoadingIndicator: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-slate-800/50 p-12 rounded-lg border border-slate-700 min-h-[400px]">
        <div className="w-16 h-16 border-4 border-slate-600 border-t-brand-primary rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-semibold text-slate-100 mb-2">Generating Your Strategy</h2>
        <p className="text-slate-400 transition-opacity duration-500 text-center">
            {loadingMessages[messageIndex]}
        </p>
    </div>
  );
};

export default LoadingIndicator;
