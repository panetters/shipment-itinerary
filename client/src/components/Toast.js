import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { MenuButton } from '../library/buttons';

import { hideToast, attemptSubmitNewStop } from '../../store';

const ToastWrapper = styled.div`
  position: fixed;
  width: 25%;
  top: 10%;
  left: 25%;
  background-color: green;
`;

const MessageSpan = styled.span`
  color: blue;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

function Toast({ message, confirm, curName, clearMessage, submitStop }) {
  if (!message) return null;

  const submit = () => {
    submitStop(curName, message);
  };

  return (
    <ToastWrapper>
      {confirm && <MessageSpan>Did you mean:</MessageSpan>}
      {typeof message === 'string' ? (
        <MessageSpan>{message}</MessageSpan>
      ) : (
        message.map(msg => <MessageSpan>{msg}</MessageSpan>)
      )}
      <ButtonWrapper>
        <MenuButton onClick={clearMessage}>Close</MenuButton>
        {confirm && <MenuButton onClick={submit}>Yes</MenuButton>}
      </ButtonWrapper>
    </ToastWrapper>
  );
}

Toast.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  confirm: PropTypes.bool,
  curName: PropTypes.string,
  clearMessage: PropTypes.func,
  submitStop: PropTypes.func,
};

const mapStateToProps = state => ({
  message: state.toastMessage,
  confirm: state.toastConfirm,
  curName: state.currentName,
});

const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => dispatch(hideToast()),
    submitStop: (name, address) => dispatch(attemptSubmitNewStop(name, address)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toast);
