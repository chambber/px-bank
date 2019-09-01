import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';

import { useForm } from '../../hooks';

import { clearStatus, updatePassword } from '../../store/ducks/account/actions';

import { alert } from '../../store/ducks/app/actions';

import { ApplicationState, UpdatePassword as DataPassword } from '../../models';
import { Button } from 'semantic-ui-react';

const UpdatePassword: FC = () => {
  const dispatch = useDispatch();
  const { data: account, error, loading, updated } = useSelector(
    (state: ApplicationState) => state.account
  );

  const [initialPassword, setInitialPassword] = useState<Record<string, any>>(
    {}
  );
  const [showCurrentPassword, setViewCurrentPassword] = useState(false);
  const [showNewPassword, setViewNewPassword] = useState(false);
  const [showConfirmPassword, setViewConfirmPassword] = useState(false);

  const dataPassword: DataPassword = {
    email: account.contactInfo.email.address || '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  useEffect(() => {
    setInitialPassword({
      id: account.id,
      oldPassword: dataPassword.oldPassword,
      newPassword: dataPassword.newPassword,
      confirmPassword: dataPassword.confirmPassword
    });
  }, [dataPassword, account]);

  useEffect(() => {
    if (updated && !error) {
      dispatch(
        alert({
          className: 'bg-success',
          text: 'Password changed successfully!'
        })
      );
      dispatch(clearStatus());
    }
  }, [updated, dispatch, error]);

  const formSchema = yup.object().shape({
    oldPassword: yup.string().required(),
    newPassword: yup
      .string()
      .required()
      .matches(
        /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*\d\W)|(?=.*[A-Z])(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,25}$/
      ),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('newPassword'), null])
  });

  const { errors, handleChange, handleSubmit } = useForm(
    initialPassword,
    formSchema
  );

  const handleCurrentPassword = () => {
    let change = showCurrentPassword === true ? false : true;
    setViewCurrentPassword(change);
  };

  const handleNewPassword = () => {
    let change = showNewPassword === true ? false : true;
    setViewNewPassword(change);
  };

  const handleConfirmPassword = () => {
    let change = showConfirmPassword === true ? false : true;
    setViewConfirmPassword(change);
  };

  const savePassword = (data: any) => {
    const password: DataPassword = {
      ...dataPassword,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword
    };
    console.log('password', password);
    dispatch(updatePassword(password));
  };

  return (
    <div className="password-content">
      <form onSubmit={handleSubmit(savePassword)}>
        <div className="col-group">
          <div className="col-12">
            <h4>Change password</h4>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="oldPassword">Current password:</label>
              <input
                defaultValue={initialPassword.oldPassword}
                type={showCurrentPassword ? 'text' : 'password'}
                className="form-input"
                name="oldPassword"
                onChange={handleChange}
                id="oldPassword"
              />
              <span
                style={{
                  top: 34,
                  right: 15
                }}
                className="login-eye"
                onClick={handleCurrentPassword}
              >
                {showCurrentPassword ? (
                  <i className="far fa-eye-slash"></i>
                ) : (
                  <i className="far fa-eye"></i>
                )}
              </span>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                defaultValue={initialPassword.newPassword}
                type={showNewPassword ? 'text' : 'password'}
                className="form-input"
                name="newPassword"
                onChange={handleChange}
                id="newPassword"
              />
              <span
                style={{
                  top: 34,
                  right: 15
                }}
                className="login-eye"
                onClick={handleNewPassword}
              >
                {showNewPassword ? (
                  <i className="far fa-eye-slash" />
                ) : (
                  <i className="far fa-eye" />
                )}
              </span>
              {errors.newPassword && (
                <span className="text-validation">
                  The password must be between 8 and 25 characters and at least
                  one uppercase character, a lowercase character and a number.
                </span>
              )}
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password:</label>
              <input
                defaultValue={initialPassword.confirmPassword}
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-input"
                name="confirmPassword"
                onChange={handleChange}
                id="confirmPassword"
              />
              <span
                style={{
                  top: 34,
                  right: 15
                }}
                className="login-eye"
                onClick={handleConfirmPassword}
              >
                <i
                  className={`far ${
                    showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'
                  }`}
                />
              </span>
              {errors.confirmPassword && (
                <span className="text-validation">
                  Passwords are not identical.
                </span>
              )}
            </div>
          </div>
          <div className="col-12 text-right">
            <hr />
            <Button
              input="submit"
              className={`btn ${loading ? 'btn-loading' : ''}`}
            >
              Change Password
            </Button>
          </div>
        </div>
        {error && (
          <div className="text-validation" style={{ marginLeft: 0 }}>
            {error || ''}
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdatePassword;
