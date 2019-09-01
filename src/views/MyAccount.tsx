import React, { FC } from "react";
import UpdatePassword from "../pages/my-account/UpdatePassword";
import MyAvatar from "../pages/my-account/MyAvatar";
import DeleteAccount from "../pages/my-account/DeleteAccount";

const MyAccount: FC = () => {
  return (
    <section className="dashboard">
      <div className="main">
        <h2 className="breadcrumb-title">My Account</h2>
        <UpdatePassword />
        <MyAvatar />
        <DeleteAccount />
      </div>
    </section>
  );
};

export default MyAccount;
