import React, { useEffect } from 'react';

const EmailVerification: React.FC = (props: any) => {
  async function checkEmail(token: string) {
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    await fetch(
      `${process.env.REACT_APP_ISIS_BASE_URL}/verifyEmail?token=${token}`,
      parameters
    );
    props.history.push('/');
  }

  useEffect(() => {
    const {
      match: {
        params: { token }
      }
    } = props;
    checkEmail(token);
  });

  return (
    <div>
      <h1>Checking emails...</h1>
    </div>
  );
};

export default EmailVerification;
