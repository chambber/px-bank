import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';
import { isCPF } from 'brazilian-values';
import * as yup from 'yup';
import moment from 'moment';

import momentDate from '../../../helpers/MomentDateSchemaType';

import { Input } from '../../../components';

import { useForm } from '../../../hooks';

import { saveCustomer } from '../../../store/ducks/customer/actions';

import { ApplicationState, Customer } from '../../../models';
import { existsCustomer } from '../../../store/ducks/customer/services';

interface OwnProps {
  nextStep(): void;
}

const PhysicalPersonStepOne: React.FC<OwnProps> = ({ nextStep }: OwnProps) => {
  const dispatch = useDispatch();
  const customer = useSelector(
    (state: ApplicationState) => state.customer.data
  );
  const initialCustomer = {
    choosenIdField: customer.personalInfo.choosenIdField,
    documentNumber: customer.personalInfo.documentNumber,
    name: customer.personalInfo.name,
    birthDate: customer.personalInfo.birthDate.getTime()
      ? moment(customer.personalInfo.birthDate).format('DD/MM/YYYY')
      : '',
    email: customer.contactInfo.email.address,
    password: customer.password,
    confirmPassword: customer.password
  };
  const [isOfAge, setIsOfAge] = useState(true);
  const [showPassword, setViewPassword] = useState(false);
  const [showConfirmPassword, setViewConfirmPassword] = useState(false);

  const formSchema = yup.object().shape({
    name: yup.string().required(),
    choosenIdField: yup.string(),
    documentNumber: yup
      .mixed()
      .when('choosenIdField', {
        is: 'cpf',
        then: yup
          .string()
          .test(
            'existsCpf',
            'CPF already registered',
            value =>
              value &&
              existsCustomer({
                documentNumber: value.replace(/[^0-9]/g, ''),
                choosenIdField: values.choosenIdField
              }).then(exists => !exists)
          )
          .test('cpf', 'invalid CPF.', value => value && isCPF(value))
          .required(),
        otherwise: yup.string()
      })
      .when('choosenIdField', {
        is: 'passport',
        then: yup
          .string()
          .test(
            'existsPassport',
            'Passport ID already registered',
            value =>
              value &&
              existsCustomer({
                documentNumber: value,
                choosenIdField: values.choosenIdField
              }).then(exists => !exists)
          )
          .required(),
        otherwise: yup.string()
      })
      .when('choosenIdField', {
        is: 'idCard',
        then: yup
          .string()
          .test(
            'existsIdCard',
            'ID Card already registered',
            value =>
              value &&
              existsCustomer({
                documentNumber: value,
                choosenIdField: values.choosenIdField
              }).then(exists => !exists)
          )
          .required(),
        otherwise: yup.string()
      })
      .when('choosenIdField', {
        is: 'securityId',
        then: yup
          .string()
          .test(
            'existsSecurityId',
            'Security ID already registered',
            value =>
              value &&
              existsCustomer({
                documentNumber: value,
                choosenIdField: values.choosenIdField
              }).then(exists => !exists)
          )
          .required(),
        otherwise: yup.string()
      })
      .when('choosenIdField', {
        is: 'driverLicence',
        then: yup
          .string()
          .test(
            'existsDriverLicence',
            "Driver's Licence ID already registered",
            value =>
              value &&
              existsCustomer({
                documentNumber: value,
                choosenIdField: values.choosenIdField
              }).then(exists => !exists)
          )
          .required(),
        otherwise: yup.string()
      }),
    birthDate: momentDate.format('DD/MM/YYYY').required(),
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

  const saveAndContinue = (data: any) => {
    if (!isOfAge) return;
    const updatedCustomer: Customer = {
      ...customer,
      type: 'person',
      personalInfo: {
        name: data.name,
        birthDate: data.birthDate,
        documentNumber:
          data.choosenIdField === 'cpf'
            ? data.documentNumber.replace(/[^0-9]/g, '')
            : data.documentNumber,
        choosenIdField: data.choosenIdField
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

  const renderErrorSelect = () => (
    <span className="text-validation">{errors.documentNumber}</span>
  );

  const fieldComponent = (placeholder: string, mask?: any) => (
    <Input
      className="form-input"
      defaultValue={initialCustomer.documentNumber}
      name="documentNumber"
      onChange={handleChange}
      placeholder={placeholder}
      mask={mask}
      type="text"
    />
  );

  const renderSelect = () => {
    switch (values.choosenIdField) {
      case 'cpf':
        return fieldComponent('Enter your CPF! *only for Brazilian customers', [
          /\d/,
          /\d/,
          /\d/,
          '.',
          /\d/,
          /\d/,
          /\d/,
          '.',
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/
        ]);

      case 'passport':
        return fieldComponent('Enter your Passport ID!');

      case 'idCard':
        return fieldComponent('Enter your ID Card!');

      case 'securityId':
        return fieldComponent('Enter your security Id!', [
          /\d/,
          /\d/,
          /\d/,
          '.',
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/
        ]);

      case 'driverLicence':
        return fieldComponent("Enter your Driver's Licence!");

      default:
        return false;
    }
  };

  const { errors, handleChange, handleSubmit, values, setValues } = useForm(
    initialCustomer,
    formSchema
  );

  const handleSelectChange = (e: any) => {
    handleChange(e);

    setValues({
      ...values,
      choosenIdField: e.target.value
    });
  };

  return (
    <Container>
      <ul className="create-account-steps">
        <li className="create-account-steps-item is-active">
          <span>step 1</span>
        </li>
        <li className="create-account-steps-item">
          <span>step 2</span>
        </li>
      </ul>

      <form onSubmit={handleSubmit(saveAndContinue)}>
        <div className="create-account-form-content">
          <div className="col-group">
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="">Full name:</label>
                <Input
                  className="form-input"
                  defaultValue={initialCustomer.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  type="text"
                />
                {errors.name && (
                  <span className="text-validation">
                    PLEASE ENTER A VALID NAME.
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-6">
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={handleSelectChange}
                  name="choosenIdField"
                  value={values.choosenIdField}
                >
                  <option value="passport">Passport</option>
                  <option value="cpf">CPF</option>
                  <option value="securityId">Security ID</option>
                  <option value="idCard">ID Card</option>
                  <option value="driverLicence">Driver&apos;s Licence</option>
                </select>
                {renderSelect()}
                {renderErrorSelect()}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Date of birth:</label>
                <Input
                  className="form-input"
                  defaultValue={initialCustomer.birthDate}
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
                  name="birthDate"
                  onChange={handleBirthdateChange}
                  placeholder="__/__/____"
                  type="text"
                />
                {errors.birthDate && (
                  <span className="text-validation">
                    Please enter a valid Birthdate.
                  </span>
                )}
                {!errors.birthDate && !isOfAge && (
                  <span className="text-validation">
                    In order to register you must be over 18 years old.
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-12">
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
                  defaultValue={initialCustomer.password}
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
              <Button input="submit" className="btn">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default PhysicalPersonStepOne;
