import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Modal } from "../../components";

interface OwnState {
  termsValidate: boolean;
  visible?: boolean;
  checked: any[];
}

interface OwnProps {
  submitTermsValidate(): any;
}

type Props = OwnProps;

class ModalTermsValidate extends Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visible: true,
      termsValidate: false,
      checked: [false, false, false, false, false]
    };

  }

  handleChange = (event: any, index: number) => {
    let checked = this.state.checked;
    checked[index] = event.target.checked;
    this.setState({
      checked: checked
    });
    const result = this.allTrue(this.state.checked);
    if (result) {
      this.setState({ termsValidate: true });
    }
  };

  allTrue = (list: any) => {
    for (var i in list) {
      if (!list[i]) return false;
    }

    return true;
  };

  close = () => {
    this.setState({ visible: false });
  };

  handleSubmit = () => {
    this.close();
    this.props.submitTermsValidate();
  };

  renderFooter = (termsValidateOk: boolean) => (
    <div className="modal-footer text-center">
      <div className="col-group">
        <div className="col-6 text-left">
        </div>
        <div className="col-6 text-right">
          <Button
            disabled={termsValidateOk ? false : true}
            onClick={() => this.handleSubmit()}
            className="btn">Submit!
          </Button>
        </div>
      </div>
    </div>
  );

  render() {
    const { termsValidate, visible } = this.state;

    return (
      visible ?
        <Modal
          renderFooter={() => this.renderFooter(termsValidate)}
          className="modal-terms-validate"
          title="Safety Risk Notice!"
          close={() => this.close()}
        >
          <i className="fas fa-check-double icon-success" />
          <div className="text-left">
            <hr/>
            <input className="reset-checkbox m-4" type="checkbox" name="checkbox1" id="checkbox1" checked={this.state.checked[0]} onChange={(e) => this.handleChange(e, 0)}/>
            <label htmlFor="checkbox1">
              Make sure you are visiting 'www.ftcorpex.com' to prevent any phishing attacks.
              We recommend that you install the Netcraft Anti-Phishing Extension (offered by www.netcraft.com).
            </label>
            <hr/>
            <input className="reset-checkbox m-4" type="checkbox" name="checkbox2" id="checkbox2" checked={this.state.checked[1]} onChange={(e) => this.handleChange(e, 1)}/>
            <label htmlFor="checkbox2">
              "Never install any browser plug-ins that claim to be associated with FT Corpex
              (except Netcraft Anti-Phishing Extension).
            </label>
            <hr/>
            <input className="reset-checkbox m-4" type="checkbox" name="checkbox3" id="checkbox3" checked={this.state.checked[2]} onChange={(e) => this.handleChange(e, 2)}/>
            <label htmlFor="checkbox3">
              Never call a phone number from anyone claiming to be a member of FT Corpex Support.
            </label>
            <hr/>
            <input className="reset-checkbox m-4" type="checkbox" name="checkbox4" id="checkbox4" checked={this.state.checked[3]} onChange={(e) => this.handleChange(e, 3)}/>
            <label htmlFor="checkbox4">
              Never tell your passowrd or 2FA codes/keys to anyone, including FT Corpex Support.
            </label>
            <hr/>
            <input className="reset-checkbox m-4" type="checkbox" name="checkbox5" id="checkbox5" checked={this.state.checked[4]} onChange={(e) => this.handleChange(e, 4)}/>
            <label htmlFor="checkbox5">
              Never send funds to anyone claiming to be a member of FT Corpex Support.
            </label>
          </div>
        </Modal> : null
    );
  };
}

export default ModalTermsValidate;
