import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { PrimaryButton } from '../library/buttons';
import { TextInput, Checkbox } from '../library/inputs';

import {
  updateStopName,
  updateStopAddress,
  checkOffItinteraryStop,
  removeStopFromItinerary,
} from '../../store';

const StopsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const StopItem = styled.div`
  background-color: red;

  text-decoration: ${({ complete }) => (complete ? 'line-through' : 'none')};
`;

function ItineraryItem({
  index,
  stop: { name, address, complete },
  updateName,
  updateAddress,
  checkStop,
  removeStop,
}) {
  const completeClick = () => {
    checkStop(!complete, index);
  };

  const removeClick = () => {
    removeStop(index);
  };

  const editName = e => {
    updateName(e.target.value, index);
  };

  const editAddress = e => {
    updateAddress(e.target.value, index);
  };

  return (
    <StopsWrapper>
      <Checkbox checked={complete} onChange={completeClick} />
      <StopItem complete={complete}>
        {index + 1}
        <TextInput value={name} onChange={editName} />
        <TextInput value={address} onChange={editAddress} />
      </StopItem>
      <PrimaryButton onClick={removeClick}>X</PrimaryButton>
    </StopsWrapper>
  );
}

ItineraryItem.propTypes = {
  index: PropTypes.number,
  stop: PropTypes.object,
  updateName: PropTypes.func,
  updateAddress: PropTypes.func,
  checkStop: PropTypes.func,
  removeStop: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    updateName: (name, index) => dispatch(updateStopName(name, index)),
    updateAddress: (address, index) => dispatch(updateStopAddress(address, index)),
    checkStop: (checked, index) => dispatch(checkOffItinteraryStop(checked, index)),
    removeStop: index => dispatch(removeStopFromItinerary(index)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(ItineraryItem);
