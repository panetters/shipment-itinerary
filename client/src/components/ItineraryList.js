import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import styled from 'styled-components';

import ItineraryItem from './ItineraryItem';

function ItineraryList({ stops }) {
  return (
    <>
      {stops.map((stop, ind) => (
        <ItineraryItem key={stop.id} index={ind} stop={stop} />
      ))}
    </>
  );
}

ItineraryList.propTypes = {
  stops: PropTypes.array,
};

const mapStateToProps = state => ({
  stops: state.stops,
});

export default connect(mapStateToProps)(ItineraryList);
