import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import * as yup from "yup";

import Logo from "../../assets/images/logo-ft-corpex.png";

import { Input } from "../../components";

import { useForm } from "../../hooks";

import { resetPassword } from "../../store/ducks/login/actions";
import { ApplicationState } from "../../models";

interface OwnProps {
  hash: string;
}

interface DataForm {
  password: string;
  confirmPassword: string;
}

const ResetPassword: FC<OwnProps> = (props: OwnProps) => {
  const dispatch = useDispatch();
  const login = useSelector((state: ApplicationState) => state.login);

  const formSchema = yup.object().shape({
    password: yup.string().required().matches(/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*\d\W)|(?=.*[A-Z])(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,25}$/),
    confirmPassword: yup.string().required().oneOf([yup.ref("password"), null])
  });

  const { handleChange, handleSubmit, errors } = useForm({ password: "", confirmPassword: "" }, formSchema);

  const sendPassword = (data: DataForm) => {
    dispatch(resetPassword(props.hash, data.password));
  };

  return (
    <section className="alterar-senha">
      <div className="login-content">
        <img src={Logo} alt="Logo FT Corpex" className="login-logo"/>
        <Form onSubmit={handleSubmit(sendPassword)}>
          <div className="form-group">
            <label htmlFor="">Password:</label>
            <Input
              autoFocus
              className="form-input"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              type="password"
            />
            {errors.password && (
              <span
                className="text-validation"
                style={{ position: "relative", left: 0, right: 0 }}
              >
               Password must be between 8 and 25 characters and at least one uppercase character, a lowercase character, and a number.
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="">Confirm password:</label>
            <Input
              className="form-input"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm password"
              type="password"
            />
            {errors.confirmPassword && (
              <span className="text-validation" style={{ left: 0, right: 0 }}>
                The passwords are not identical.
              </span>
            )}
          </div>
          <div className="form-group">
            <Button
              className={`btn ${login.loading ? "btn-loading" : ""}`}
              type="submit"
            >
              Change Password
            </Button>
          </div>
          {login.error && (
            <span className="text-validation" style={{ left: 0, right: 0 }}>
              Ops, an error has occurred. Try again later.
            </span>
          )}
        </Form>
      </div>
      <Link to="/login" className="login-btn-back">
        Back
      </Link>
    </section>
  );
};

export default ResetPassword;
