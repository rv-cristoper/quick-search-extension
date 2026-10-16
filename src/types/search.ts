export type DocumentType = "dni" | "ruc" | "";

export interface SearchParams {
  documentType: DocumentType;
  documentNumber: string;
}

export interface SearchResult {
  fullName: string;
  checkDigit?: string;
}

export interface SearchResponse {
  status: string;
  data: SearchResult;
}
