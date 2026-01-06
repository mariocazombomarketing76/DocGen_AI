import React, { useState } from 'react';
import Loader from './Loader';
import CopyIcon from './icons/CopyIcon';
import DownloadIcon from './icons/DownloadIcon';

// Declare jsPDF on the window object
declare global {
  interface Window {
    jspdf: any;
  }
}

interface OutputSectionProps {
  generatedText: string;
  isLoading: boolean;
  error: string | null;
}

const OutputSection: React.FC<OutputSectionProps> = ({ generatedText, isLoading, error }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const handleDownloadPdf = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Simple regex to split text while trying to respect markdown-like headers
    const lines = doc.splitTextToSize(generatedText, 180);

    doc.setFontSize(12);
    doc.text(lines, 10, 10);
    doc.save('DocGen_Documento.pdf');
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <div className="text-center text-red-400">{error}</div>;
    }
    if (generatedText) {
      // Basic markdown rendering
      const htmlContent = generatedText
        .split('\n')
        .map(line => {
          if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
          if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
          if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
          if (line.startsWith('* ')) return `<li>${line.substring(2)}</li>`;
          return `<p>${line}</p>`;
        })
        .join('');

      return (
        <div 
            className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-h1:text-xl prose-h2:text-lg prose-h3:text-base"
            dangerouslySetInnerHTML={{ __html: htmlContent.replace(/<li>/g, '<ul><li>').replace(/<\/li>(?!<li>)/g, '</li></ul>') }} 
        />
      );
    }
    return (
      <div className="text-center text-slate-400">
        <p className="text-lg">Seu documento aparecerá aqui...</p>
        <p className="text-sm">Preencha o formulário à esquerda para começar.</p>
      </div>
    );
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Documento Gerado</h2>
        {generatedText && !isLoading && (
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium py-1.5 px-3 rounded-md transition-colors"
            >
              <CopyIcon className="h-4 w-4" />
              {copyStatus === 'copied' ? 'Copiado!' : 'Copiar'}
            </button>
            <button 
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium py-1.5 px-3 rounded-md transition-colors"
            >
              <DownloadIcon className="h-4 w-4" />
              PDF
            </button>
          </div>
        )}
      </div>
      <div className="bg-slate-900/70 p-4 rounded-md flex-grow overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default OutputSection;
