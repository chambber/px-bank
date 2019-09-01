export interface PhoneNumber {
  number: string;
}

export interface Email {
  address: string;
}

export interface ContactInfo {
  phoneNumber: PhoneNumber;
  email: Email;
}

export interface Address {
  country: string;
  state: string;
  city: string;
}

export interface PersonalInfo {
  documentNumber: string;
  choosenIdField: string;
  name: string;
  birthDate: Date;
}

export interface CompanyInfo {
  cnpj: string;
  namePartner: string;
  birthDatePartner: Date;
  companyName: string;
}

export interface Customer {
  id?: string;
  contactInfo: ContactInfo;
  address: Address;
  type: 'person' | 'company';
  personalInfo: PersonalInfo;
  companyInfo: CompanyInfo;
  politicallyExposedPerson: boolean | undefined;
  password: string;
}
