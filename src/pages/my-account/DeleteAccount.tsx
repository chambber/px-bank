import Big from "big.js";
import React, { FC, useState, ElementType, ComponentPropsWithoutRef } from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";

import Modal2FA from "../auth/Modal2FA";
import { Modal } from "../../components";

import { useWallets } from "../../hooks";

import { toggleLoader, toggleAlert } from "../../store/ducks/app/actions";
import { deactivate } from "../../store/ducks/customer/services";
import { logout } from "../../store/ducks/account/actions";

const DeleteAccount: FC<ComponentPropsWithoutRef<ElementType>> = ({ history }) => {
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [show2FA, setShow2FA] = useState(false);

  const [ISODate] = useState(new Date().toISOString());
  const wallets = useWallets(ISODate);
  const walletsWithBalance = wallets.data.filter(w =>
    new Big(w.total).gt(new Big("0.00"))
  );
  const isAbleToDelete = walletsWithBalance.length === 0;

  const onConfirmClick = () => {
    setShowConfirmModal(false);
    setShow2FA(true);
  };

  const onTokenValid = async () => {
    setShow2FA(false);
    dispatch(toggleLoader(true));

    try {
      await deactivate();
      dispatch(logout());
      history.push("/");

      dispatch(
        toggleAlert({
          show: true,
          text: "Account successfully deleted.",
          className: "bg-success"
        })
      );
    } catch (err) {
      dispatch(
        toggleAlert({
          show: true,
          text: "Couldn't delete the account now. Try again later.",
          className: "bg-danger"
        })
      );
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const renderFooter = () => {
    return isAbleToDelete ? (
      <div className="modal-footer text-center">
        <div className="col-group">
          <div className="col-6 text-left">
            <Button
              onClick={() => setShowConfirmModal(false)}
              className="btn btn-outilne"
            >
              No, cancel!
            </Button>
          </div>
          <div className="col-6 text-right">
            <Button onClick={onConfirmClick} className="btn">
              Yes, I confirm!
            </Button>
          </div>
        </div>
      </div>
    ) : (
        <div className="modal-footer text-center">
          <Button
            onClick={() => setShowConfirmModal(false)}
            className="btn btn-outilne"
          >
            Ok, got it!
        </Button>
        </div>
      );
  };

  return (
    <>
      <div className="my-account-content my-account-delete-account">
        <h4>Delete account</h4>
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <hr />
        <div className="text-right">
          <Button
            className="btn btn-danger"
            onClick={() => setShowConfirmModal(true)}
          >
            Delete your account
          </Button>
        </div>
      </div>
      {showConfirmModal && (
        <Modal
          title={`Delete account`}
          close={() => true}
          renderFooter={renderFooter}
        >
          {isAbleToDelete ? (
            <p>
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          ) : (
              <p>
                Accounts with balance greater than zero in any wallet cannot be
                deleted.
            </p>
            )}
        </Modal>
      )}
      {show2FA && (
        <Modal2FA
          isLogin={false}
          close={() => setShow2FA(false)}
          onTokenValid={onTokenValid}
        />
      )}
    </>
  );
}

export default DeleteAccount;
