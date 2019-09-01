import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isCNPJ } from 'brazilian-values';
import { Container, Button } from 'semantic-ui-react';
import * as yup from 'yup';
import moment from 'moment';

import momentDate from '../../../helpers/MomentDateSchemaType';

import { Input } from '../../../components';

import { useForm } from '../../../hooks';

import { ApplicationState, Customer } from '../../../models';
import { saveCustomer } from '../../../store/ducks/customer/actions';

import { existsCustomer } from '../../../store/ducks/customer/services';

interface OwnProps {
  nextStep(): void;
}

interface CustomerForm {
  namePartner: string;
  cnpj: string;
  birthDatePartner: Date;
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const LegalPersonStepOne: React.FC<OwnProps> = ({ nextStep }: OwnProps) => {
  const customer = useSelector(
    (state: ApplicationState) => state.customer.data
  );
  const dispatch = useDispatch();
  const [isOfAge, setIsOfAge] = useState(true);
  const initialCustomer = {
    namePartner: customer.companyInfo.namePartner,
    cnpj: customer.companyInfo.cnpj,
    birthDatePartner: customer.companyInfo.birthDatePartner.getTime()
      ? moment(customer.companyInfo.birthDatePartner).format('DD/MM/YYYY')
      : '',
    companyName: customer.companyInfo.companyName,
    email: customer.contactInfo.email.address,
    password: customer.password,
    confirmPassword: customer.password
  };
  const [showPassword, setViewPassword] = useState(false);
  const [showConfirmPassword, setViewConfirmPassword] = useState(false);

  const formSchema = yup.object().shape({
    namePartner: yup.string().required(),
    cnpj: yup
      .string()
      .required()
      .test(
        'existscnpj',
        'CNPJ already registered.',
        value =>
          value &&
          existsCustomer({ cnpj: value.replace(/[^0-9]/g, '') }).then(
            exists => !exists
          )
      )
      .test('cnpj', 'Invalid CNPJ.', value => value && isCNPJ(value)),
    birthDatePartner: momentDate.format('DD/MM/YYYY').required(),
    companyName: yup.string().required(),
    email: yup
      .string()
      .test(
        'existsEmail',
        'E-mail already registered.',
        value =>
          value && existsCustomer({ email: value }).then(exists => !exists)
      )
      .email()
      .required(),
    password: yup
      .string()
      .required()
      .matches(
        /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*\d\W)|(?=.*[A-Z])(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,25}$/
      ),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null])
  });

  const saveAndContinue = (data: CustomerForm) => {
    if (!isOfAge) return;

    const updatedCustomer: Customer = {
      ...customer,
      type: 'company',
      companyInfo: {
        namePartner: data.namePartner,
        birthDatePartner: data.birthDatePartner,
        cnpj: data.cnpj.replace(/[^0-9]/g, ''),
        companyName: data.companyName
      },
      contactInfo: {
        ...customer.contactInfo,
        email: {
          address: data.email
        }
      },
      password: data.password
    };
    dispatch(saveCustomer(updatedCustomer));
    nextStep();
  };

  const { handleChange, handleSubmit, errors } = useForm(
    initialCustomer,
    formSchema
  );

  const handleBirthdateChange = (e: any) => {
    handleChange(e);

    if (/\d{2}\/\d{2}\/\d{4}/.test(e.target.value)) {
      const dt = moment()
        .startOf('day')
        .subtract(18, 'years');
      const mBirthDate = moment(e.target.value, 'DD/MM/YYYY');
      setIsOfAge(!mBirthDate.isAfter(dt));
    }
  };

  const handleEye = (type: number) => {
    switch (type) {
      case 1:
        const change = !showPassword;
        setViewPassword(change);
        break;
      case 2:
        const changeConfirm = !showConfirmPassword;
        setViewConfirmPassword(changeConfirm);
        break;
    }
  };

  return (
    <Container>
      <ul className="create-account-steps">
        <li className="create-account-steps-item is-active">
          <span>Passo 1</span>
        </li>
        <li className="create-account-steps-item">
          <span>Passo 2</span>
        </li>
      </ul>

      <form onSubmit={handleSubmit(saveAndContinue)}>
        <div className="create-account-form-content">
          <div className="col-group">
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="">Full name (partner):</label>
                <Input
                  className="form-input"
                  defaultValue={initialCustomer.namePartner}
                  name="namePartner"
                  onChange={handleChange}
                  placeholder="Enter full name"
                  type="text"
                />
                {errors.namePartner && (
                  <span className="text-validation">
                    Please enter a valid name.
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Corporate Document:</label>
                <Input
                  className="form-input"
                  defaultValue={initialCustomer.cnpj}
                  name="cnpj"
                  onChange={handleChange}
                  placeholder="__.___.___/___-__"
                  type="text"
                />
                {errors.cnpj && errors.cnpj.includes('inválido') && (
                  <span className="text-validation">
                    Please enter a valid CNPJ.
                  </span>
                )}
                {errors.cnpj && errors.cnpj.includes('cadastrado') && (
                  <Link to="/login" className="text-validation">
                    CNPJ already registered, click here to sign in.
                  </Link>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Date of birth (partner):</label>
                <Input
                  className="form-input"
                  defaultValue={initialCustomer.birthDatePartner}
                  mask={[
                    /\d/,
                    /\d/,
                    '/',
                    /\d/,
                    /\d/,
                    '/',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/
                  ]}
                  name="birthDatePartner"
                  onChange={handleBirthdateChange}
                  placeholder="__ /__ / ____"
                  type="text"
                />
                {errors.birthDatePartner && (
                  <span className="text-validation">
                    Please enter a valid date of birth.
                  </span>
                )}
                {!errors.birthDatePartner && !isOfAge && (
                  <span className="text-validation">
                    For membership registration the same must be over 18 years
                    old.
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Company Name:</label>
                <Input
                  className="form-input"
                  defaultValue={initialCustomer.companyName}
                  name="companyName"
                  onChange={handleChange}
                  placeholder="Enter Company Name"
                  type="text"
                />
                {errors.companyName && (
                  <span className="text-validation">
                    Please enter a valid company name.
                  </span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">E-mail:</label>
                <Input
                  className="form-input"
                  defaultValue={initialCustomer.email}
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter e-mail"
                  type="text"
                />
                {errors.email &&
                  (errors.email.includes('valid') ||
                    errors.email.includes('required')) && (
                    <span className="text-validation">
                      Please, type a valid email.
                    </span>
                  )}
                {errors.email && errors.email.includes('registered') && (
                  <Link to="/login" className="text-validation">
                    Email already registered, click here to login.
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Password:</label>
                <Input
                  className="form-input"
                  defaultValue={initialCustomer.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                  type={showPassword ? 'text' : 'password'}
                />
                <span
                  style={{
                    top: 34,
                    right: 15
                  }}
                  className="login-eye"
                  onClick={() => handleEye(1)}
                >
                  {showPassword ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
                {errors.password && (
                  <span className="text-validation">
                    The password must be between 8 and 25 characters and at
                    least one uppercase character, a lowercase character, and a
                    number.
                  </span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Confirm Password:</label>
                <Input
                  className="form-input"
                  defaultValue={initialCustomer.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="Confirm password"
                  type={showConfirmPassword ? 'text' : 'password'}
                />
                <span
                  style={{
                    top: 34,
                    right: 15
                  }}
                  className="login-eye"
                  onClick={() => handleEye(2)}
                >
                  {showConfirmPassword === false ? (
                    <i className="far fa-eye" />
                  ) : (
                    <i className="far fa-eye-slash" />
                  )}
                </span>
                {errors.confirmPassword && (
                  <span className="text-validation">
                    Passwords are not identical.
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-6">
              <div className="create-account-login-link">
                Already registered? <Link to="/login">Log in</Link>.
              </div>
            </div>
            <div className="col-6 text-right">
              <Button className="btn" type="submit">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default LegalPersonStepOne;
