import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addStopToItinerary } from '../../store';

import { TextInput } from '../library/inputs';
import { PrimaryButton } from '../library/buttons';

class ItineraryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: '',
    };
  }

  updateName = e => {
    this.setState({
      name: e.target.value,
    });
  };

  updateAddress = e => {
    this.setState({
      address: e.target.value,
    });
  };

  submitStop = () => {
    const { name, address } = this.state;
    const { addStop } = this.props;

    addStop({ name, address });
    this.setState({
      name: '',
      address: '',
    });
  };

  render() {
    const { name, address } = this.state;
    return (
      <div>
        <TextInput value={name} onChange={this.updateName} placeholder="Name" />
        <TextInput value={address} onChange={this.updateAddress} placeholder="Address" />
        <PrimaryButton onClick={this.submitStop}>Save</PrimaryButton>
      </div>
    );
  }
}

ItineraryForm.propTypes = {
  addStop: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    addStop: stop => {
      dispatch(addStopToItinerary(stop));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(ItineraryForm);
