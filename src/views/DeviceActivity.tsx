import React, { FC } from "react";
import { useDeviceActivity } from "../hooks/useDeviceActivity";
import {
  DeviceActivity as AccountDeviceModel, ApplicationState
} from "../models";
import { useSelector } from "react-redux";
import { deleteDevices } from '../store/ducks/account/services'
import { Button } from "semantic-ui-react";
const DeviceActivity: FC = () => {
  const customer = useSelector(
    (state: ApplicationState) => state.account.data.id,
  );
  const devices = useDeviceActivity(customer);
  const handleClick = (deviceid: string, e: any, customer: any) => {
    e.preventDefault();

    deleteDevices(customer, deviceid);

  };

  return (
    <section className="dashboard">
      <div className="main">
        <h2 className="breadcrumb-title">Allowed Devices</h2>

        <div className="col-group">
          <div className="col-12">
            <div className="dashboard-box">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <td>Nickname</td>
                      <td>Browser</td>
                      <td>Model</td>
                      <td>System</td>
                      <td>Date/Time</td>
                      <td> </td>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.data.map((activity: AccountDeviceModel) => (
                      <tr key={`activity-${activity.id}`}>
                        <td className={activity.clientDevice.name ? "":"text-center"}>
                          <strong>{activity.aliasDevice ? activity.aliasDevice: '-'}</strong>
                        </td>
                        <td className={activity.clientDevice.name ? "":"text-center"}>{activity.clientDevice.name ? activity.clientDevice.name: '- - -'}</td>
                        <td className={activity.deviceInfo.brand ? "":"text-center"}>{activity.deviceInfo.brand ? activity.deviceInfo.brand: '- - -'}</td>
                        <td className={activity.osInfo.name ? "":"text-center"}>{activity.osInfo.name? activity.osInfo.name: '- - -' }</td>
                        <td className={activity.fCreatedAt ? "":"text-center"}>{activity.fCreatedAt ? activity.fCreatedAt: '- - -'}</td>
                        <td className="text-right">
                          <Button
                            className="text-red"
                            onClick={e => handleClick(activity.id, e, customer)}
                          >
                            <i className="fas fa-trash-alt" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceActivity;
