import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import Logo from '../assets/images/logo-ft-corpex.png';
import { Input, Modal } from '../components';
import { device as deviceAction } from '../store/ducks/device/actions';

import { DeviceInfo, Client, Device, Os } from '../models/DeviceInfo';

import { ApplicationState } from '../models';

import { DetectorDevice } from '../helpers/deviceDetector';

const CreateDevice: React.FC = (props: any) => {
  const { devices } = useSelector((state: ApplicationState) => state);

  let str = props.match.params.id;
  let n = str.lastIndexOf('@');
  const result = str.substring(n + 1);
  const id = str.substr(0, str.indexOf('@'));

  let errorRegister: boolean;
  let [value, setValue] = useState();
  let [valueInput, setValueInput] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    valueInput = '';
    setValueInput(valueInput);
    let storageId = localStorage.getItem('hashIdDevice');
    if (storageId !== result) {
      value = false;
      setValue(value);
    } else {
      value = true;
      setValue(value);
    }
  }, [result]);

  const client: Client = {
    engine: '',
    engineVersion: '',
    name: '',
    type: '',
    version: ''
  };

  const device: Device = {
    brand: '',
    model: '',
    type: ''
  };

  const os: Os = {
    name: '',
    platform: '',
    version: ''
  };

  useEffect(() => {
    if (devices.permission) {
      props.history.push('/login');
    }
  }, [devices.permission]);

  const deviceInfo: DeviceInfo = {
    aliasDevice: '',
    customer: '',
    client: client,
    device: device,
    os: os
  };

  const changeDevice = (data: any) => {
    valueInput = data;
    setValueInput(valueInput);
  };

  const registerDevice = () => {
    let InfoDevice: any = DetectorDevice();
    deviceInfo.aliasDevice = valueInput.toLowerCase();
    deviceInfo.customer = id;
    deviceInfo.client = InfoDevice.client;
    deviceInfo.device = InfoDevice.device;
    deviceInfo.os = InfoDevice.os;
    dispatch(deviceAction(deviceInfo));
  };

  return (
    <>
      <section className="login">
        {value ? (
          <div className="login-content">
            <img src={Logo} alt="Logo FT Corpex" className="login-logo" />

            <div>
              <div className="login-maintenance">
                Choose a nickname for your device
              </div>
              <div>
                <Input
                  className="form-input text-white"
                  name="device"
                  type={'text'}
                  onChange={(e: any) => changeDevice(e.target.value)}
                />
              </div>
            </div>
            <div style={{ paddingTop: '10px' }}>
              {valueInput != '' ? (
                <Button
                  className={`btn ${devices.loading ? 'btn-loading' : ''}`}
                  onClick={registerDevice}
                >
                  Register
                </Button>
              ) : (
                <Button
                  className={`btn ${devices.loading ? 'btn-loading' : ''}`}
                  disabled
                >
                  Register
                </Button>
              )}
            </div>
            {devices.error.data ? (
              <span className="text-validation" style={{ left: 0, right: 0 }}>
                This nickname already exists, try again
              </span>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className="login-content">
            <img src={Logo} alt="Logo FT Corpex" className="login-logo" />
            <div className="login-maintenance">
              This device is not the same that you requested to login
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default CreateDevice;
