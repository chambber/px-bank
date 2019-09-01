import DeviceDetector from 'device-detector-js';

export const DetectorDevice = () => {
    const deviceDetector = new DeviceDetector();
    const userAgent = navigator.userAgent;
    const device = deviceDetector.parse(userAgent);
    return device;
  };
  

