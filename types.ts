export enum DocumentType {
  BUSINESS_PLAN = 'Plano de Negócio',
  SERVICE_AGREEMENT = 'Contrato de Prestação de Serviços',
  BUSINESS_LETTER = 'Carta Comercial',
}

export interface FormState {
  documentType: DocumentType;
  description: string;
}
