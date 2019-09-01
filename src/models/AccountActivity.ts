import moment from 'moment';

export interface AccountActivityModel {
  id: string;
  customer: string;
  description: string;
  source: string;
  ipAddress: string;
  location: string;
  createdAt: string;
}

export class AccountActivity implements AccountActivityModel {
  id: string = '';

  customer: string = '';

  description: string = '';

  source: string = '';

  ipAddress: string = '';

  location: string = '';

  createdAt: string = '';

  get fCreatedAt() {
    return moment(this.createdAt).format('DD/MM/YYYY HH:mm');
  }
}
