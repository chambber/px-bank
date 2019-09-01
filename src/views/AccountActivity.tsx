import React, { FC } from "react";
import { useAccountActivity } from "../hooks/useAccountActivity";
import {
  AccountActivity as AccountActivityModel, ApplicationState
} from "../models";
import { useSelector } from "react-redux";

const AccountActivity: FC = () => {
  const customer = useSelector((state: ApplicationState) => state.account.data.id);
  const activities = useAccountActivity(customer);

  return (
    <section className="dashboard">
      <div className="main">
        <h2 className="breadcrumb-title">Account Activity</h2>

        <div className="col-group">
          <div className="col-12">
            <div className="dashboard-box">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <td>Activity</td>
                      <td>Source</td>
                      <td>Address IP</td>
                      <td>Location</td>
                      <td>Date/Time</td>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.data.map((activity: AccountActivityModel) => (
                      <tr key={`activity-${activity.id}`}>
                        <td><strong>{activity.description}</strong></td>
                        <td>{activity.source}</td>
                        <td>{activity.ipAddress}</td>
                        <td>{activity.location}</td>
                        <td>{activity.fCreatedAt}</td>
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

export default AccountActivity;
