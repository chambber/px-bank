import moment from 'moment';

export interface DeviceActivityModel { 
  id: string;
  aliasDevice: string;
  name: string;
  type: string;
  plataform: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  clientDevice: any;
  deviceInfo: any;
  osInfo: any;
}

export class DeviceActivity implements DeviceActivityModel {
  id: string = '';

  aliasDevice: string = '';

  name: string = '';

  type: string = '';

  plataform: string = '';

  version: string = '';

  createdAt: string = '';

  updatedAt: string = '';
  
  clientDevice: any;

  deviceInfo: any;

  osInfo: any;

  get fCreatedAt() {
    return moment(this.createdAt).format('DD/MM/YYYY HH:mm');
  }
}
