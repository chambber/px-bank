import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class PhysicalPerson extends Component {

  render() {
    return (
      <div>
        <div className="meu-perfil-content">
          <div className="col-group">
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="">Nome Completo:</label>
                <input type="text" placeholder="Digite o nome completo" className="form-input"/>
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">CPF:</label>
                <input type="text" placeholder="___.___.___-__" className="form-input"/>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Data de Nascimento:</label>
                <input type="text" placeholder="__ /__ / ____" className="form-input"/>
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="">E-mail:</label>
                <input type="text" placeholder="Digite o seu melhor e-mail" className="form-input"/>
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Senha Forte:</label>
                <input type="password" className="form-input"/>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Confirme sua senha:</label>
                <input type="password" className="form-input"/>
              </div>
            </div>
          </div>

          <div className="col-group">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Selecione o país:</label>
                <select className="form-select">
                  <option value="selecione">Selecione</option>
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Selecione o estado:</label>
                <select className="form-select">
                  <option value="selecione">Selecione</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-group">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Cidade:</label>
                <select className="form-select">
                  <option value="selecione">Selecione</option>
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="">Celular:</label>
                <input type="text" placeholder="(00) 0 0000-0000" className="form-input"/>
              </div>
            </div>
          </div>

        </div>
        <div className="col-group">
          <div className="col-12 text-right">
            <Button className="btn">Alterar dados</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default PhysicalPerson;
