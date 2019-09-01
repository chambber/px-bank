import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Logo from '../assets/images/logo-ft-corpex.png';
import { Modal } from '../components';
import PhysicalPerson from '../pages/create-account/physical-person/PhysicalPerson';
import LegalPerson from '../pages/create-account/legal-person/LegalPerson';
import { clearCustomer } from '../store/ducks/customer/actions';
import { ApplicationState } from '../models';

const CreateAccount: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const customerCreated = useSelector(
    (state: ApplicationState) => state.customer.created
  );
  const [tipoPessoa, setTipoPessoa] = useState(1);

  useEffect(() => {
    if (customerCreated) {
      props.history.push('/dashboard');
    }
  }, [customerCreated]);

  const pessoa = () => {
    switch (tipoPessoa) {
      case 1:
        return <PhysicalPerson />;
      case 2:
        return <LegalPerson />;
      default:
        return null;
    }
  };

  const showPessoaFisica = (e: any) => {
    e.preventDefault();
    setTipoPessoa(1);

    const buttonPessoaFisica = document.getElementsByClassName(
      'create-account-tabs-link'
    )[0];
    const buttonPessoaJuridica = document.getElementsByClassName(
      'create-account-tabs-link'
    )[1];
    buttonPessoaFisica.classList.add('is-active');
    buttonPessoaJuridica.classList.remove('is-active');
  };

  const showPessoaJurica = (e: any) => {
    e.preventDefault();
    setTipoPessoa(2);

    const buttonPessoaFisica = document.getElementsByClassName(
      'create-account-tabs-link'
    )[0];
    const buttonPessoaJuridica = document.getElementsByClassName(
      'create-account-tabs-link'
    )[1];
    buttonPessoaFisica.classList.remove('is-active');
    buttonPessoaJuridica.classList.add('is-active');
  };

  const closeModal = () => {
    dispatch(clearCustomer());
    props.history.push('/');
  };

  return (
    <>
      <section className="create-account">
        <div className="create-account-columns">
          <div className="create-account-column-left">
            <div className="create-account-left-content">
              <img src={Logo} className="create-account-logo" alt="PX Investimentos" />
              <h3 className="create-account-title">
                Crie uma
                <span>conta gratuita</span>
              </h3>
            </div>
          </div>
          <div className="create-account-column-right">
            <div className="create-account-content">
              <div className="create-account-tabs">
                <Button
                  onClick={showPessoaFisica}
                  className="create-account-tabs-link is-active"
                >
                  Pessoa Física
                </Button>
                <Button
                  onClick={showPessoaJurica}
                  className="create-account-tabs-link"
                  disabled
                >
                  Pessoa Jurídica
                </Button>
              </div>
              <div className="create-account-form">{pessoa()}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateAccount;
