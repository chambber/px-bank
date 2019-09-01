import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';
import * as yup from 'yup';

import { Input, Select } from '../../../components';

import {
  useCities, useCountries, useForm, useStates,
} from '../../../hooks';

import {
  ApplicationState, City, Country, Customer, State,
} from '../../../models';


import { createAccount, saveCustomer } from '../../../store/ducks/customer/actions';

interface OwnProps {
  prevStep(): void;
}

interface CustomerForm {
  country: string;
  state: string;
  city: string;
  phoneNumber: string;
  origin: string;
  ppe: boolean | undefined;
  terms: boolean | undefined;
  otherOrigin?: string;
}

const LegalPersonStepTwo: React.FC<OwnProps> = ({ prevStep }: OwnProps) => {
  const { data: customer, loading } = useSelector((state: ApplicationState) => state.customer);
  const dispatch = useDispatch();

  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [initialCustomer, setInitialCustomer] = useState<CustomerForm>();

  useEffect(() => {
    setInitialCustomer({
      country: customer.address.country,
      state: customer.address.state,
      city: customer.address.city,
      phoneNumber: customer.contactInfo.phoneNumber.number,
      origin: customer.origin,
      ppe: customer.politicallyExposedPerson,
      terms: undefined,
    });
  }, [customer]);

  const formSchema = yup.object().shape({
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    phoneNumber: yup
      .string()
      .required()
      .matches(/^\(\d\d\) \d \d\d\d\d-\d\d\d\d$/),
    origin: yup.string().required(),
    otherOrigin: yup.string().when('origin', {
      is: value => value && value === 'other',
      then: yup.string().required(),
      otherwise: yup.string().notRequired(),
    }),
    ppe: yup.boolean().required(),
    terms: yup.boolean().required(),
  });

  const {
    handleChange, handleSubmit, errors, values,
  } = useForm(initialCustomer, formSchema);

  const countries = useCountries();
  const states = useStates();
  const [state, setState] = useState<State>();
  const cities = useCities(state);

  useEffect(() => {
    const stateData = states.data.find(element => element.name === values.state);
    setState(stateData);
  }, [states.data, values.state]);

  const save = (data: CustomerForm) => {
    const updatedCustomer: Customer = {
      ...customer,
      type: 'company',
      address: {
        country: data.country,
        state: data.state,
        city: data.city,
      },
      contactInfo: {
        ...customer.contactInfo,
        phoneNumber: {
          number: data.phoneNumber,
        },
      },
      politicallyExposedPerson: data.ppe,
      origin: data.origin,
      otherOrigin: data.otherOrigin ? data.otherOrigin : undefined,
    };

    // Caso PPE, o cadastro não deve prosseguir
    if (updatedCustomer.politicallyExposedPerson) {
      // TODO: Verificar o que deve ser feito caso seja PPE
    }

    return updatedCustomer;
  };

  const saveAndContinue = (data: CustomerForm) => {
    dispatch(createAccount(save(data)));
  };

  const back = (e: any) => {
    e.preventDefault();
    const updatedCustomer = save(values as CustomerForm);
    dispatch(saveCustomer(updatedCustomer));
    prevStep();
  };

  const handleOriginChange = (e: any) => {
    setSelectedOrigin(e.target.value);
    handleChange(e);
  };

  const renderState = () => (values.country === 'BRA' ? (
    <Select
      value={values.state}
      disabled={!values.country}
      name="state"
      onChange={handleChange}
      values={states.data.map((stateData: State) => ({
        id: stateData.id,
        value: stateData.name,
        name: stateData.name,
      }))}
    />
  ) : (
      <Input
        className="form-input"
        defaultValue={values.state}
        name="state"
        placeholder="State"
        onChange={handleChange}
        type="text"
      />
    ));

  const renderCity = () => (values.country === 'BRA' ? (
    <Select
      value={values.city}
      disabled={!state || cities.loading}
      name="city"
      onChange={handleChange}
      values={cities.data.map((city: City) => ({
        id: city.id,
        value: city.name,
        name: city.name,
      }))}
    />
  ) : (
      <Input
        className="form-input"
        defaultValue={values.city}
        name="city"
        placeholder="City"
        onChange={handleChange}
        type="text"
      />
    ));

  return (
    <Container>
      <ul className="create-account-steps">
        <li className="create-account-steps-item">
          <span>step 1</span>
        </li>
        <li className="create-account-steps-item is-active">
          <span>step 2</span>
        </li>
      </ul>

      <form onSubmit={handleSubmit(saveAndContinue)}>
        <div className="create-account-form-content">
          <div className="col-group">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Select country:</label>
                <Select
                  value={values.country}
                  name="country"
                  onChange={handleChange}
                  values={countries.data.map((country: Country) => ({
                    id: country.id,
                    value: country.id,
                    name: country.name,
                  }))}
                />
                {errors.country && (
                  <span className="text-validation">Please select a country.</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="state_name">Select state:</label>
                {renderState()}
                {errors.state && <span className="text-validation">Please select a state.</span>}
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">City:</label>
                {renderCity()}
                {errors.city && <span className="text-validation">Please select a city.</span>}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Cell Phone:</label>
                <Input
                  defaultValue={values.phoneNumber}
                  className="form-input"
                  name="phoneNumber"
                  mask={[
                    '(',
                    /\d/,
                    /\d/,
                    ')',
                    ' ',
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  placeholder="(00) 0 0000-0000"
                  onChange={handleChange}
                  type="text"
                />
                {errors.phoneNumber && (
                  <span className="text-validation">Please enter a cell phone.</span>
                )}
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="">How did you hear about us?</label>
                <select
                  value={values.origin}
                  className="form-select"
                  name="origin"
                  onChange={handleOriginChange}
                >
                  <option value="">Select</option>
                  <option value="other">Others</option>
                  <option value="tv">TV</option>
                  <option value="event">Events</option>
                  <option value="facebook">Facebook</option>
                  <option value="google">Google</option>
                </select>
                {errors.origin && (
                  <span className="text-validation">
                    Please let me know how you heard about us.
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-group" hidden={selectedOrigin !== 'other'}>
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="">Where?</label>
                <Input
                  defaultValue={values.otherOrigin}
                  className="form-input"
                  name="otherOrigin"
                  placeholder="Indication, friends, etc"
                  onChange={handleChange}
                  type="text"
                />
                {errors.otherOrigin && (
                  <span className="text-validation">
                    Please tell the other way you heard about us.
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-3">
              <div className="form-group">
                <label>You are a PEP?</label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <div className="radio">
                  <input
                    id="ppe_yes"
                    onChange={handleChange}
                    name="ppe"
                    type="radio"
                    value="true"
                  />
                  <label htmlFor="ppe_yes">Yes</label>
                </div>
                <div className="radio">
                  <input
                    id="ppe_no"
                    onChange={handleChange}
                    name="ppe"
                    type="radio"
                    value="false"
                  />
                  <label htmlFor="ppe_no">No</label>
                </div>
              </div>
            </div>
          </div>
          {errors.ppe && (
            <span className="text-validation" style={{ marginTop: '-10px' }}>
              Please let me know if you are a politically exposed person.
            </span>
          )}
          <div className="col-group">
            <div className="col-12">
              <div className="create-account-aceite-termos">
                <input id="aceite-termos" name="terms" onChange={handleChange} type="checkbox" />
                <label htmlFor="aceite-termos">
                  By clicking Sign you accept our
                  {' '}
                  <Link to="/">Terms of use</Link>
                  {' '}
                  and
                  {' '}
                  <Link to="/">Privacy Policy</Link>
                </label>
              </div>
              {errors.terms && (
                <span className="text-validation" style={{ marginTop: '-20px' }}>
                  Please read and agree to the Terms of Use and Policy Privacy.
                </span>
              )}
            </div>
          </div>
          <div className="col-group">
            <div className="col-6">
              <Button onClick={back} className="btn btn-outilne">
                Back
              </Button>
            </div>
            <div className="col-6 text-right">
              <Button
                className={`btn ${loading && 'btn-loading'}`}
                disabled={!values.terms || values.ppe}
                input="submit"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default LegalPersonStepTwo;
