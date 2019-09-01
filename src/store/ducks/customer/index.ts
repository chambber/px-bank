import { Reducer } from 'redux';
import { CustomerState, CustomerTypes } from './types';
import {
  Customer,
  Address,
  ContactInfo,
  PhoneNumber,
  Email,
  PersonalInfo,
  CompanyInfo,
} from '../../../models/Customer';

const INITIAL_PHONE_NUMBER: PhoneNumber = {
  number: '',
};

const INITIAL_EMAIL: Email = {
  address: '',
};

const INITIAL_CONTACTINFO: ContactInfo = {
  phoneNumber: INITIAL_PHONE_NUMBER,
  email: INITIAL_EMAIL,
};

const INITIAL_ADDRESS: Address = {
  country: '',
  state: '',
  city: '',
};

const INITIAL_PERSONAL_INFO: PersonalInfo = {
  documentNumber: '',
  choosenIdField: 'passport',
  name: '',
  birthDate: new Date(0),
};

const INITIAL_COMPANY_INFO: CompanyInfo = {
  cnpj: '',
  namePartner: '',
  birthDatePartner: new Date(0),
  companyName: '',
};

const INITIAL_CUSTOMER: Customer = {
  contactInfo: INITIAL_CONTACTINFO,
  address: INITIAL_ADDRESS,
  type: 'person',
  personalInfo: INITIAL_PERSONAL_INFO,
  companyInfo: INITIAL_COMPANY_INFO,
  politicallyExposedPerson: undefined,
  password: '',
};

const INITIAL_STATE: CustomerState = {
  created: false,
  data: INITIAL_CUSTOMER,
  loading: false,
  error: '',
};

const reducer: Reducer<CustomerState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerTypes.CREATE:
      return {
        ...state,
        loading: true,
      };
    case CustomerTypes.CREATE_SUCCESS:
      return {
        ...state,
        created: true,
        data: action.payload || INITIAL_CUSTOMER,
        loading: false,
      };
    case CustomerTypes.CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CustomerTypes.SET_CUSTOMER:
      return {
        ...state,
        data: action.payload,
      };
    case CustomerTypes.CLEAR_CUSTOMER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
