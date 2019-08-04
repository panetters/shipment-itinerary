import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { MenuButton } from '../library/buttons';

import { hideToast, attemptSubmitNewStop } from '../../store';

const ToastWrapper = styled.div`
  position: fixed;
  width: 30%;
  top: 10%;
  left: 35%;
  display: flex;
  flex-flow: column nowrap;
  background-color: green;
`;

const MessageSpan = styled.span`
  color: blue;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

function Toast({ messages, type, curName, clearMessage, submitStop }) {
  if (!messages.length) return null;

  const submit = () => {
    submitStop(curName, messages[0]);
    clearMessage();
  };

  return (
    <ToastWrapper>
      {type === 'confirm' && <MessageSpan>Did you mean:</MessageSpan>}
      {messages.map(msg => (
        <MessageSpan key={msg.slice(3)}>{msg}</MessageSpan>
      ))}
      <ButtonWrapper>
        <MenuButton onClick={clearMessage}>Close</MenuButton>
        {type === 'confirm' && <MenuButton onClick={submit}>Yes</MenuButton>}
      </ButtonWrapper>
    </ToastWrapper>
  );
}

Toast.propTypes = {
  messages: PropTypes.array,
  type: PropTypes.string,
  curName: PropTypes.string,
  clearMessage: PropTypes.func,
  submitStop: PropTypes.func,
};

const mapStateToProps = state => ({
  messages: state.toastMessages,
  type: state.toastType,
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
