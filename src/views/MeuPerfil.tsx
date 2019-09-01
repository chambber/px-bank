import React from "react";

import PhysicalPerson from '../pages/my-profile/PhysicalPerson';

const MeuPerfil: React.FC = () => {
  return (
    <section className="dashboard">
      <div className="main">
        <h2 className="breadcrumb-title">
          Meu Perfil
        </h2>
        <PhysicalPerson/>
        {/*<PessoaJuridica/>*/}

      </div>
    </section>

  );
};

export default MeuPerfil;
