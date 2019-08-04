import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const StopsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const StopItem = styled.div`
  background-color: red;
`;

function ItineraryList({ stops }) {
  return (
    <StopsWrapper>
      {stops.map(stop => (
        <StopItem key={stop.name}>{`${stop.name} - ${stop.address}`}</StopItem>
      ))}
    </StopsWrapper>
  );
}

ItineraryList.propTypes = {
  stops: PropTypes.array,
};

const mapStateToProps = state => ({
  stops: state.stops,
});

export default connect(mapStateToProps)(ItineraryList);
