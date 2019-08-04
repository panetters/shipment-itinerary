import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TextInput } from '../library/inputs';
import { PrimaryButton } from '../library/buttons';

import {
  changeCurrentName,
  changeCurrentAddress,
  attemptSubmitNewStop,
  displayToast,
} from '../../store';

class ItineraryForm extends React.Component {
  updateName = e => {
    const { changeName } = this.props;
    changeName(e.target.value);
  };

  updateAddress = e => {
    const { changeAddress } = this.props;
    changeAddress(e.target.value);
  };

  keyHandler = e => {
    if (e.key === 'Enter') {
      this.submit();
    }
  };

  submit = () => {
    const { curName, curAddr, showMessage, submitStop } = this.props;
    if (!curName || !curAddr) {
      showMessage(['Please fill out both fields.']);
    } else if (curAddr.length < 3) {
      showMessage(['Please enter a valid address.']);
    } else {
      submitStop(curName, curAddr);
    }
  };

  render() {
    const { curName, curAddr } = this.props;

    return (
      <div>
        <TextInput
          value={curName}
          onChange={this.updateName}
          onKeyPress={this.keyHandler}
          placeholder="Name"
        />
        <TextInput
          value={curAddr}
          onChange={this.updateAddress}
          onKeyPress={this.keyHandler}
          placeholder="Address"
        />
        <PrimaryButton onClick={this.submit} onKeyPress={this.keyHandler}>
          Add Stop
        </PrimaryButton>
      </div>
    );
  }
}

ItineraryForm.propTypes = {
  curName: PropTypes.string,
  curAddr: PropTypes.string,
  changeName: PropTypes.func,
  changeAddress: PropTypes.func,
  submitStop: PropTypes.func,
  showMessage: PropTypes.func,
};

const mapStateToProps = state => ({
  curName: state.currentName,
  curAddr: state.currentAddress,
});

const mapDispatchToProps = dispatch => {
  return {
    changeName: name => dispatch(changeCurrentName(name)),
    changeAddress: address => dispatch(changeCurrentAddress(address)),
    submitStop: (name, address) => dispatch(attemptSubmitNewStop(name, address)),
    showMessage: msg => dispatch(displayToast(msg)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItineraryForm);
