import { Reducer } from 'redux';
import { AccountState, AccountTypes } from './types';

import {
  Account,
  Address,
  CompanyInfo,
  PersonalInfo,
  ContactInfo,
  PhoneNumber,
  Email
} from '../../../models';
import { isAuthenticated } from '../../../services/auth';

const INITIAL_PHONE_NUMBER: PhoneNumber = {
  number: ''
};

const INITIAL_EMAIL: Email = {
  address: ''
};

const INITIAL_CONTACTINFO: ContactInfo = {
  phoneNumber: INITIAL_PHONE_NUMBER,
  email: INITIAL_EMAIL
};

const INITIAL_ADDRESS: Address = {
  country: '',
  state: '',
  city: ''
};

const INITIAL_PERSONAL_INFO: PersonalInfo = {
  documentNumber: '',
  choosenIdField: '',
  name: '',
  birthDate: new Date(0)
};

const INITIAL_COMPANY_INFO: CompanyInfo = {
  cnpj: '',
  namePartner: '',
  birthDatePartner: new Date(0),
  companyName: ''
};

const INITIAL_ACCOUNT: Account = {
  displayName: '',
  has2FA: false,
  termsValidate: true,
  contactInfo: INITIAL_CONTACTINFO,
  address: INITIAL_ADDRESS,
  type: 'person',
  personalInfo: INITIAL_PERSONAL_INFO,
  companyInfo: INITIAL_COMPANY_INFO,
  politicallyExposedPerson: undefined,
  password: '',
  origin: ''
};

const INITIAL_STATE: AccountState = {
  data: INITIAL_ACCOUNT,
  isLoggedIn: isAuthenticated(),
  updated: false,
  loading: false,
  error: ''
};

const reducer: Reducer<AccountState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AccountTypes.ACCOUNT:
      return {
        ...state,
        loading: true
      };
    case AccountTypes.ACCOUNT_SUCCESS:
      return {
        ...state,
        data: action.payload || undefined,
        isLoggedIn: true,
        loading: false
      };
    case AccountTypes.ACCOUNT_FAILURE:
      return {
        ...state,
        data: INITIAL_ACCOUNT,
        loading: false,
        error: action.payload
      };
    case AccountTypes.TWOFA_INSERT:
      return {
        ...state,
        loading: true
      };
    case AccountTypes.TWOFA_INSERT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          has2FA: true
        },
        loading: false
      };
    case AccountTypes.TWOFA_INSERT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case AccountTypes.UPDATE_PASSWORD:
      return {
        ...state,
        loading: true,
        updated: false,
        error: ''
      };
    case AccountTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true
      };
    case AccountTypes.UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case AccountTypes.CHECK_TERMS_VALIDATE:
      return {
        ...state,
        loading: true
      };
    case AccountTypes.CHECK_TERMS_VALIDATE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          termsValidate: action.payload
        },
        loading: false
      };
    case AccountTypes.CHECK_TERMS_VALIDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case AccountTypes.CLEAR_STATUS:
      return {
        ...state,
        loading: false,
        updated: false,
        error: ''
      };
    case AccountTypes.LOGOUT:
      return {
        ...state,
        data: INITIAL_ACCOUNT,
        isLoggedIn: false,
        loading: false,
        error: ''
      };
    default:
      return state;
  }
};

export default reducer;
