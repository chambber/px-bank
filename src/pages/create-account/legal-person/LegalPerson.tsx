import React, { Component } from 'react';
import LegalPersonStepOne from './LegalPersonStepOne';
import LegalPersonStepTwo from './LegalPersonStepTwo';

class LegalPerson extends Component {
  state = {
    step: 1
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  render() {
    const { step } = this.state;
    switch (step) {
      default:
      case 1:
        return <LegalPersonStepOne nextStep={this.nextStep} />
      case 2:
        return <LegalPersonStepTwo prevStep={this.prevStep} />
    }
  }
}

export default LegalPerson;
