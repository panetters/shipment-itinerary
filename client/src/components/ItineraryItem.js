import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PrimaryButton } from '../library/buttons';
import { TextInput, Checkbox } from '../library/inputs';
import { TableCell } from '../library/layout';

import {
  enableStopEditing,
  updateStopName,
  updateStopAddress,
  checkOffItinteraryStop,
  removeStopFromItinerary,
} from '../../store';

function ItineraryItem({
  index,
  stop: { name, address, complete, edit },
  toggleEdit,
  updateName,
  updateAddress,
  checkStop,
  removeStop,
}) {
  const editClick = () => {
    toggleEdit(!edit, index);
  };

  const editName = e => {
    updateName(e.target.value, index);
  };

  const editAddress = e => {
    updateAddress(e.target.value, index);
  };

  const completeClick = () => {
    checkStop(!complete, index);
  };

  const removeClick = () => {
    removeStop(index);
  };

  return (
    <>
      <TableCell size={1}>
        <Checkbox checked={complete} onChange={completeClick} />
      </TableCell>
      <TableCell size={1}>{index + 1}</TableCell>
      <TableCell size={3}>
        <TextInput value={name} onChange={editName} disabled={!edit} />
      </TableCell>
      <TableCell size={5}>
        <TextInput value={address} onChange={editAddress} disabled={!edit} />
      </TableCell>
      <TableCell size={1}>
        <PrimaryButton onClick={removeClick} full>
          Remove
        </PrimaryButton>
      </TableCell>
      <TableCell size={1}>
        <PrimaryButton onClick={editClick} full alternate={edit}>
          {edit ? 'Save' : 'Edit'}
        </PrimaryButton>
      </TableCell>
    </>
  );
}

ItineraryItem.propTypes = {
  index: PropTypes.number,
  stop: PropTypes.object,
  toggleEdit: PropTypes.func,
  updateName: PropTypes.func,
  updateAddress: PropTypes.func,
  checkStop: PropTypes.func,
  removeStop: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    toggleEdit: (edit, index) => dispatch(enableStopEditing(edit, index)),
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
