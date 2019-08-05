import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { H2Text } from '../library/typography';
import { PrimaryButton } from '../library/buttons';
import { TextInput } from '../library/inputs';

import {
  changeCurrentName,
  changeCurrentAddress,
  attemptSubmitNewStop,
  displayToast,
} from '../../store';

const FormWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 75%;

  > * {
    :not(:last-child) {
      margin-right: 8px;
    }
  }
`;

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
      <>
        <H2Text>Add a new stop:</H2Text>
        <FormWrapper>
          <TextInput
            value={curName}
            type="text"
            name="fullname"
            autoComplete="name"
            onChange={this.updateName}
            onKeyPress={this.keyHandler}
            placeholder="Name"
          />
          <TextInput
            value={curAddr}
            type="text"
            name="street-address"
            autoComplete="street-address"
            onChange={this.updateAddress}
            onKeyPress={this.keyHandler}
            placeholder="Address"
          />
          <PrimaryButton onClick={this.submit} onKeyPress={this.keyHandler}>
            Add Stop
          </PrimaryButton>
        </FormWrapper>
      </>
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
