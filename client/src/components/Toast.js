import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { hideToast } from '../../store';

const ToastWrapper = styled.div`
  position: fixed;
  width: 25%;
  top: 10%;
  left: 25%;
  background-color: green;
`;

function Toast({ message, clearMessage }) {
  return message ? <ToastWrapper onClick={clearMessage}>{message}</ToastWrapper> : null;
}

Toast.propTypes = {
  message: PropTypes.string,
  clearMessage: PropTypes.func,
};

const mapStateToProps = state => ({
  message: state.toastMessage,
});

const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => {
      dispatch(hideToast());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toast);
