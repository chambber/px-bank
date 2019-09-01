import React, { useEffect } from 'react';
import { apiOsiris } from '../services/api';

const ConfirmWithdrawal: React.FC = (props: any) => {
  async function confirmWithdrawal(withdrawal: string) {
    await apiOsiris.post(`/withdrawals/${withdrawal}/confirm`);
    props.history.push('/my-extract');
  }

  useEffect(() => {
    const {
      match: {
        params: { withdrawal }
      }
    } = props;
    confirmWithdrawal(withdrawal);
  });

  return (
    <div>
      <h1>Confirming deposit...</h1>
    </div>
  );
};

export default ConfirmWithdrawal;
