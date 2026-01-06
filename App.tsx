import React, { useState } from 'react';
import FormSection from './components/FormSection';
import OutputSection from './components/OutputSection';
import { FormState, DocumentType } from './types';
import { generateDocument } from './services/geminiService';
import LogoIcon from './components/icons/LogoIcon';

const App: React.FC = () => {
  const [generatedText, setGeneratedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: FormState) => {
    setIsLoading(true);
    setError(null);
    setGeneratedText('');

    try {
      const result = await generateDocument(data.documentType, data.description);
      setGeneratedText(result);
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao gerar o documento. Verifique sua chave de API e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col p-4 sm:p-6 lg:p-8">
      <header className="flex items-center gap-4 mb-8">
        <LogoIcon className="h-10 w-10 text-brand-blue" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">DocuGen</h1>
          <p className="text-sm text-slate-400">Seu Gerador de Documentos com IA</p>
        </div>
      </header>
      
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:pr-4">
          <FormSection onGenerate={handleGenerate} isLoading={isLoading} />
        </div>
        <div className="lg:pl-4">
          <OutputSection
            generatedText={generatedText}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>

      <footer className="text-center mt-8 text-slate-500 text-xs">
        <p>Powered by Google Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
