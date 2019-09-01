import React, { useState } from 'react';
import PhysicalPersonStepOne from './PhysicalPersonStepOne';
import PhysicalPersonStepTwo from './PhysicalPersonStepTwo';

const PhysicalPerson: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    default:
    case 1:
      return <PhysicalPersonStepOne nextStep={nextStep} />;
    case 2:
      return <PhysicalPersonStepTwo prevStep={prevStep} />;
  }
};

export default PhysicalPerson;
