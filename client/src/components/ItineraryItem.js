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
  revalidateStopAddress,
  checkOffItinteraryStop,
  removeStopFromItinerary,
  displayToast,
} from '../../store';

function ItineraryItem({
  index,
  stop: { name, address, complete, edit },
  toggleEdit,
  updateName,
  updateAddress,
  resubmitStop,
  checkStop,
  removeStop,
  showMessage,
}) {
  const editClick = () => {
    if (!edit) {
      toggleEdit(true, index);
    } else if (!name || !address) {
      showMessage(['Please fill out both fields.']);
    } else if (address.length < 3) {
      showMessage(['Please enter a valid address.']);
    } else {
      resubmitStop(address, index);
    }
  };

  const keyHandler = e => {
    if (e.key === 'Enter') {
      editClick();
    }
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
        <TextInput value={name} onChange={editName} onKeyPress={keyHandler} disabled={!edit} />
      </TableCell>
      <TableCell size={5}>
        <TextInput
          value={address}
          onChange={editAddress}
          onKeyPress={keyHandler}
          disabled={!edit}
        />
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
  resubmitStop: PropTypes.func,
  checkStop: PropTypes.func,
  removeStop: PropTypes.func,
  showMessage: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    toggleEdit: (edit, index) => dispatch(enableStopEditing(edit, index)),
    updateName: (name, index) => dispatch(updateStopName(name, index)),
    updateAddress: (address, index) => dispatch(updateStopAddress(address, index)),
    resubmitStop: (address, index) => dispatch(revalidateStopAddress(address, index)),
    checkStop: (checked, index) => dispatch(checkOffItinteraryStop(checked, index)),
    removeStop: index => dispatch(removeStopFromItinerary(index)),
    showMessage: msg => dispatch(displayToast(msg)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(ItineraryItem);
