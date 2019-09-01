import { Customer } from './Customer';

export interface Account extends Customer {
  displayName: string;
  has2FA: boolean;
  termsValidate: boolean | undefined;
}

export interface UpdatePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
