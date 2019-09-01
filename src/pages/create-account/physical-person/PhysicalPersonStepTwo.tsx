import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';
import * as yup from 'yup';

import { Input, Select, Modal } from '../../../components';

import {
 useCountries, useForm, useStates, useCities,
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
  ppe: boolean | undefined;
  terms: boolean | undefined;
}

const PhysicalPersonStepTwo: React.FC<OwnProps> = ({ prevStep }: OwnProps) => {
  const { data: customer, loading } = useSelector((state: ApplicationState) => state.customer);
  const dispatch = useDispatch();

  const [initialCustomer, setInitialCustomer] = useState<CustomerForm>();
  const [openModal, setModal] = useState(false);

  useEffect(() => {
    setInitialCustomer({
      country: customer.address.country,
      state: customer.address.state,
      city: customer.address.city,
      phoneNumber: customer.contactInfo.phoneNumber.number,
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
    const dataState = states.data.find(element => element.name === values.state);
    setState(dataState);
  }, [states.data, values.state]);

  const save = (data: CustomerForm) => {
    const updatedCustomer: Customer = {
      ...customer,
      type: 'person',
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
    };

    // Caso PPE, o cadastro não deve prosseguir
    if (updatedCustomer.politicallyExposedPerson) {
      // Somente aceita pessoas "NÂO" PPE's
    }

    return updatedCustomer;
  };

  const saveAndContinue = (data: CustomerForm) => {
    const updatedCustomer = save(data);
    dispatch(createAccount(updatedCustomer));
  };

  const back = (e: any) => {
    e.preventDefault();
    const updatedCustomer = save(values as CustomerForm);
    dispatch(saveCustomer(updatedCustomer));
    prevStep();
  };

  const renderState = () => (values.country === 'BRA' ? (
    <Select
      value={values.state}
      disabled={!values.country}
      name="state"
      onChange={handleChange}
      values={states.data.map((data: State) => ({
          id: data.id,
          value: data.name,
          name: data.name,
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
      {openModal ? (
        <Modal
          title="Sorry, but..."
          titleButton="OK!"
          className="modal-ppe"
          close={() => setModal(false)}
        >
          <div className="modal-confirmation modal-confirmation-ok">
            We are currently not accepting PPE&apos;s
          </div>
        </Modal>
      ) : null}
      <ul className="create-account-steps">
        <li className="create-account-steps-item">
          <span>passo 1</span>
        </li>
        <li className="create-account-steps-item is-active">
          <span>passo 2</span>
        </li>
      </ul>
      <form onSubmit={handleSubmit(saveAndContinue)}>
        <div className="create-account-form-content">
          <div className="col-group">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">País:</label>
                <Select
                  value={values.country}
                  disabled={countries.loading}
                  name="country"
                  onChange={handleChange}
                  values={countries.data.map((country: Country) => ({
                    id: country.id,
                    value: country.id,
                    name: country.name,
                  }))}
                />
                {errors.country && (
                  <span className="text-validation">Por favor, selecione um pais.</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="state_name">Estado:</label>
                {renderState()}
                {errors.state && (
                  <span className="text-validation text-left">Por favor, selecione um estado.</span>
                )}
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Cidade:</label>
                {renderCity()}
                {errors.city && <span className="text-validation">Por favor, selecione uma cidade.</span>}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Celular:</label>
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
                  <span className="text-validation">Por favor, insira um celular.</span>
                )}
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-3">
              <div className="form-group">
                <label>Você é uma PEP?</label>
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
                    onClick={() => setModal(true)}
                  />
                  <label htmlFor="ppe_yes">Sim</label>
                </div>
                <div className="radio">
                  <input
                    id="ppe_no"
                    onChange={handleChange}
                    name="ppe"
                    type="radio"
                    value="false"
                  />
                  <label htmlFor="ppe_no">Não</label>
                </div>
              </div>
            </div>
          </div>
          {errors.ppe && (
            <span className="text-validation" style={{ marginTop: '-10px' }}>
              Por favor, informe se você é uma pessoa politicamente exposta.
            </span>
          )}
          <div className="col-group">
            <div className="col-12">
              <div className="create-account-aceite-termos">
                <input
                  id="aceite-termos"
                  name="terms"
                  onChange={handleChange}
                  type="checkbox"
                  value={values.terms ? 'checked' : 'unchecked'}
                />
                <label htmlFor="aceite-termos">
                  {'Ao se cadastrar você aceita nossos '}
                  <Link to="/">Termos de Uso</Link>
                  {' and '}
                  <Link to="/">Política de Privacidade</Link>
                </label>
              </div>
              {errors.terms && (
                <span className="text-validation" style={{ marginTop: '-20px' }}>
                  Por favor, leia e concorde com os Termos de Uso e a Política de Privacidade.
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
                input="submit"
                disabled={!values.terms || values.ppe}
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

export default PhysicalPersonStepTwo;
