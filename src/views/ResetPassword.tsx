import React, {
 FC, ComponentPropsWithoutRef, ElementType, useState, useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ForgotPassword from '../pages/reset-password/ForgotPassword';
import ResetPasswordPage from '../pages/reset-password/ResetPassword';

import { ApplicationState } from '../models';
import { clearResetPassword } from '../store/ducks/login/actions';

const ResetPassword: FC<ComponentPropsWithoutRef<ElementType>> = (
  props: React.ComponentPropsWithoutRef<ElementType>,
) => {
  const dispatch = useDispatch();
  const login = useSelector((state: ApplicationState) => state.login);
  const { history, match } = props;
  useEffect(() => {
    if (login.resetPassword) {
      dispatch(clearResetPassword());
      history.push('/login');
    }
  }, [login.resetPassword, history, dispatch]);

  const [step] = useState(match.params.token ? 2 : 1);

  switch (step) {
    default:
    case 1:
      return <ForgotPassword />;
    case 2:
      return <ResetPasswordPage hash={props.match.params.token} />;
  }
};

export default ResetPassword;
