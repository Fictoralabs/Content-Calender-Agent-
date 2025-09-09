
import React, { useState } from 'react';
import type { FormState, ContentStrategy } from './types';
import { generateContentStrategy } from './services/geminiService';
import InputForm from './components/InputForm';
import LoadingIndicator from './components/LoadingIndicator';
import ContentDisplay from './components/ContentDisplay';

const App: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    brandInfo: '',
    contentParams: '',
    currentAssets: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [contentStrategy, setContentStrategy] = useState<ContentStrategy | null>(null);

  const handleFormSubmit = async (formData: FormState) => {
    setIsLoading(true);
    setError(null);
    setContentStrategy(null);
    try {
      const result = await generateContentStrategy(formData);
      setContentStrategy(result);
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating the content strategy. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setFormState({
        brandInfo: '',
        contentParams: '',
        currentAssets: '',
    });
    setContentStrategy(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-brand-primary via-brand-secondary to-pink-500 text-transparent bg-clip-text pb-2">
            Strategic Content Calendar Generator
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
            Leverage AI to create comprehensive, data-driven content calendars that drive engagement and achieve your business objectives.
          </p>
        </header>
        
        <main>
          {isLoading ? (
            <LoadingIndicator />
          ) : contentStrategy ? (
            <ContentDisplay strategy={contentStrategy} onReset={handleReset} />
          ) : (
            <>
              {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6 text-center">{error}</div>}
              <InputForm
                initialState={formState}
                onSubmit={handleFormSubmit}
              />
            </>
          )}
        </main>

        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Powered by Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
