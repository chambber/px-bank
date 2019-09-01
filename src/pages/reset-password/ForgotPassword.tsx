import React, { FC, ComponentPropsWithoutRef, ElementType } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import * as yup from "yup";

import Logo from "../../assets/images/logo-ft-corpex.png";

import { useForm } from "../../hooks";

import { forgotPassword as forgotAction } from "../../store/ducks/forgotPassword/actions";
import { ApplicationState } from "../../models";

interface DataForm {
  email: string;
}

const ForgotPassword: FC<ComponentPropsWithoutRef<ElementType>> = () => {
  const dispatch = useDispatch();
  const { forgotPassword } = useSelector((state: ApplicationState) => state);

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required()
      .email()
  });

  const { handleChange, handleSubmit, errors } = useForm(
    { email: "" },
    formSchema
  );

  const verifyEmail = (data: DataForm) => {
    dispatch(forgotAction(data.email));
  };

  return (
    <section className="alterar-senha">
      <div className="login-content">
        <img src={Logo} alt="Logo FT Corpex" className="login-logo" />
        <Form onSubmit={handleSubmit(verifyEmail)}>
          <div className="form-group">
            <label>E-mail:</label>
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              className="form-input"
              name="email"
              onChange={handleChange}
              type="text"
            />
            {errors.email && (
              <span className="text-validation" style={{ left: 0, right: 0 }}>
                Please, type a valid email.
              </span>
            )}
          </div>
          <div className="form-group">
            <Button
              className={`btn ${forgotPassword.loading ? "btn-loading" : ""}`}
              type="submit"
            >
              Submit
            </Button>
          </div>
          {forgotPassword.error && (
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

export default ForgotPassword;
