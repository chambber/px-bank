import React, { useState } from 'react';
import Big from 'big.js';
import { Button } from 'semantic-ui-react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import { formatStringToCurrency } from '../../helpers/formatter';
import { Input, Modal } from '../../components';
import { useCoinFee, useForm } from '../../hooks';
import { withdraw, checkWithdrawHashAddress } from '../../store/ducks/wallet/services';
import { WalletWithBalance, WithdrawParams } from '../../models';
import { toggleLoader, alert } from '../../store/ducks/app/actions';
import Modal2FA from '../auth/Modal2FA';

interface OwnProps {
  visible: boolean;
  wallet: WalletWithBalance | null;

  close(): void;
}

const ModalWithdraw: React.FC<OwnProps> = ({ visible, close, wallet }) => {
  const [balanceValid, setBalanceValid] = useState(true);
  const [amountValid, setAmountValid] = useState(true);
  const [sending, setSending] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [withdrawParams, setWithdrawParams] = useState<WithdrawParams>({
    address: '',
    amount: '',
    coinId: 0,
  });

  const initial = { amount: '', hashAddress: '' };
  const coinFee = useCoinFee(wallet ? wallet.coinId : 0);
  const dispatch = useDispatch();

  const formSchema = yup.object().shape({
    amount: yup
      .string()
      .required()
      .matches(/^(\d{1,4}[.,]\d{1,8})|(\d{1,4})$/),
    hashAddress: yup
      .string()
      .required()
      .matches(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/)
      .test('isSelfWithdraw', 'Hash address invalid', async (value) => {
        try {
          const checkedHash = await checkWithdrawHashAddress(value);

          // If that hash belongs to the current customer, it must returns false
          return !checkedHash.checked;
        }
        catch (err) {
          return false;
        }
      }),
  });

  const onSubmit = async ({ amount, hashAddress }: any) => {
    const bigAmount = new Big(amount.replace(',', '.'));
    const bigFee = new Big(coinFee.data);
    const bigWalletBalance = new Big(wallet ? wallet.balance : '0.00');

    // Validate if the amount is greater than the fee
    if (bigFee.gte(bigAmount) || bigAmount.lte(0)) {
      setAmountValid(false);
      return;
    }
    setAmountValid(true);

    // Validate balance
    if (bigAmount.gt(bigWalletBalance)) {
      setBalanceValid(false);
      return;
    }
    setBalanceValid(true);

    setWithdrawParams({
      amount: bigAmount.toFixed(),
      address: hashAddress,
      coinId: wallet ? wallet.coinId : 0,
    });

    setShow2FA(true);
  };

  const onTokenValid = async () => {
    const { amount, address } = withdrawParams;

    await sendWithdraw({ amount, address });
    close();
  };

  const sendWithdraw = async ({ amount, address }: any) => {
    try {
      dispatch(toggleLoader(true));
      setSending(true);
      const params = {
        address: address.trim(),
        coinId: wallet ? wallet.coinId : 0,
        amount,
      };

      await withdraw(params);
      setSending(false);
      dispatch(
        alert({
          text: "Drop shipped successfully!"
        })
      );
    } catch (err) {
      setSending(false);
      dispatch(
        alert({
          className: "bg-danger",
          text: "Could not send the service at this time."
        })
      );
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const { errors, handleChange, handleSubmit } = useForm(initial, formSchema);

  const renderAmountError = () => {
    if (errors.amount) {
      return <span className="text-validation">Please enter a valid quantity.</span>;
    }
    if (!balanceValid) {
      return (
        <span className="text-validation">
          Your balance is insufficient to make the withdrawal in this amount.
        </span>
      );
    }
    if (!amountValid) {
      return (
        <span className="text-validation">
          The amount must be greater than zero and greater than the rate.
        </span>
      );
    }
    return null;
  };

  const renderFooter = () => (
    <div className="modal-footer text-center">
      <div className="col-group">
        <div className="col-6 text-left">
          <Button onClick={() => close()} className="btn btn-outilne">
            No, cancel!
        </Button>
        </div>
        <div className="col-6 text-right">
          <Button disabled={sending} onClick={handleSubmit(onSubmit)} className="btn">
            {sending ? "Sending..." : "Yes, I confirm!"}
          </Button>
        </div>
      </div>
    </div>
  );

  return visible && wallet ? (
    <>
      <Modal
        className="modal-sacar"
        title="Withdraw!"
        close={() => close()}
        renderFooter={renderFooter}
      >
        <div>
          <i className="fas fa-hand-holding-usd icon-success" />
          <p>
            <strong>
              You have
              {" "}
              <span className="badge bg-success">{formatStringToCurrency(wallet.balance, 8)}</span>
              {" "}
              to make serve.
            </strong>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-group">
              <div className="col-12">
                <div className="form-group text-left">
                  <label htmlFor="">
                    Address {wallet.coin}:
                  </label>
                  <Input
                    className="form-input"
                    defaultValue=""
                    name="hashAddress"
                    onChange={handleChange}
                    placeholder={`Enter a address ${wallet.coin}`}
                    type="text"
                  />
                  {errors.hashAddress && (
                    <span className="text-validation">Please enter a valid address.</span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group text-left">
                  <label htmlFor="">Quantity:</label>
                  <Input
                    className="form-input"
                    defaultValue=""
                    name="amount"
                    onChange={handleChange}
                    placeholder="Enter Quantity"
                    type="text"
                  />
                  {renderAmountError()}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group text-left">
                  <label htmlFor="">Rate:</label>
                  <Input
                    disabled
                    className="form-input"
                    defaultValue={coinFee.data}
                    name="fee"
                    type="text"
                    value={coinFee.data}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="modal-confirmation modal-confirmation-ok">
            Do you want to do this operation?
          </div>
        </div>
      </Modal>
      {show2FA && <Modal2FA onTokenValid={onTokenValid} close={() => setShow2FA(false)} />}
    </>
  ) : null;
};

export default ModalWithdraw;
