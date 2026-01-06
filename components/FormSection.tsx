import React, { useState } from 'react';
import { FormState, DocumentType } from '../types';
import { DOCUMENT_TYPE_OPTIONS } from '../constants';

interface FormSectionProps {
  onGenerate: (data: FormState) => void;
  isLoading: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({ onGenerate, isLoading }) => {
  const [documentType, setDocumentType] = useState<DocumentType>(DocumentType.BUSINESS_PLAN);
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onGenerate({ documentType, description });
    }
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-4">Detalhes do Documento</h2>
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <div className="mb-4">
          <label htmlFor="documentType" className="block text-sm font-medium text-slate-300 mb-2">
            Tipo de Documento
          </label>
          <select
            id="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-2 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
          >
            {DOCUMENT_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6 flex-grow flex flex-col">
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
            Descreva seu negócio ou necessidade
          </label>
          <textarea
            id="description"
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-2 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue flex-grow resize-none"
            placeholder="Ex: Uma startup de tecnologia que desenvolve um app de delivery de comida vegana, focada no público jovem..."
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !description.trim()}
          className="w-full bg-brand-blue hover:bg-brand-accent text-white font-bold py-3 px-4 rounded-md disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Gerando...
            </>
          ) : (
            'Gerar Documento com IA'
          )}
        </button>
      </form>
    </div>
  );
};

export default FormSection;
