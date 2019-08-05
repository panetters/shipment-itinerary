import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import * as colors from '../library/colors';
import { MenuButton } from '../library/buttons';

import { hideToast, attemptSubmitNewStop } from '../../store';

const ToastWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  width: ${({ isConfirm }) => (isConfirm ? '30%' : '20%')};
  left: ${({ isConfirm }) => (isConfirm ? '35%' : '40%')};
  text-align: ${({ isConfirm }) => (isConfirm ? 'left' : 'center')};
  top: ${({ showToast }) => (showToast ? '24px' : '-96px')};
  visibility: ${({ showToast }) => (showToast ? 'visible' : 'hidden')};
  transition: top 1s ease-out;
  padding: 8px;
  background-color: ${({ isConfirm }) => (isConfirm ? colors.accent : colors.error)};
  border-radius: 8px;
  cursor: ${({ isConfirm }) => (isConfirm ? 'default' : 'pointer')};
`;

const MessageSpan = styled.span`
  color: ${({ isConfirm }) => (isConfirm ? colors.textMain : 'white')};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 8px;
  justify-content: space-around;
`;

function Toast({ messages, type, curName, clearMessage, submitStop }) {
  const submit = () => {
    submitStop(curName, messages[0]);
    clearMessage();
  };

  const showToast = messages.length > 0;
  const isConfirm = type === 'confirm';

  return (
    <ToastWrapper
      showToast={showToast}
      isConfirm={isConfirm}
      onClick={isConfirm ? null : clearMessage}
    >
      {isConfirm && <MessageSpan isConfirm={isConfirm}>Did you mean:</MessageSpan>}
      {messages.map(msg => (
        <MessageSpan key={msg.slice(3)} isConfirm={isConfirm}>
          {msg}
        </MessageSpan>
      ))}
      {isConfirm && (
        <ButtonWrapper>
          <MenuButton onClick={clearMessage}>Reenter Address</MenuButton>
          <MenuButton onClick={submit}>Use This Address</MenuButton>
        </ButtonWrapper>
      )}
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
