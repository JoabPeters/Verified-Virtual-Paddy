export type ActiveView = 
  | 'home' 
  | 'genuine-bill' 
  | 'address-statement' 
  | 'directory' 
  | 'terms' 
  | 'privacy' 
  | 'support'
  | 'tests';

export interface DisCoInfo {
  id: string;
  name: string;
  shortName: string;
  coverageStates: string[];
  website: string;
  billPortalUrl: string;
  customerCarePhone: string;
  whatsappNumber?: string;
  email: string;
  ussdCode?: string;
  notes: string;
}

export interface StateInfo {
  code: string;
  name: string;
  capital: string;
  primaryDisCos: string[];
  lgas: string[];
  coverageNotes: string;
}

export interface AddressStatementFormData {
  fullName: string;
  phoneNumber: string;
  residentialAddress: string;
  state: string;
  lga: string;
  electricityProvider: string;
  meterOrAccountNumber: string;
  agreedToTerms: boolean;
  acknowledgedLimitations: boolean;
}

export interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  residentialAddress?: string;
  state?: string;
  lga?: string;
  agreedToTerms?: string;
  acknowledgedLimitations?: string;
}
