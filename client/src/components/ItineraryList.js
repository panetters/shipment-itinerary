import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ItineraryItem from './ItineraryItem';
import { Table, TableRow, TableCell } from '../library/layout';
import { H1Text, MainText } from '../library/typography';

function ItineraryList({ stops }) {
  return (
    <>
      <H1Text>Itinerary</H1Text>
      <Table>
        <TableRow>
          <TableCell size={1}>
            <MainText>Complete</MainText>
          </TableCell>
          <TableCell size={1}>
            <MainText>Number</MainText>
          </TableCell>
          <TableCell size={3}>
            <MainText>Name</MainText>
          </TableCell>
          <TableCell size={5}>
            <MainText>Address</MainText>
          </TableCell>
        </TableRow>
        {stops.map((stop, ind) => (
          <TableRow key={stop.id}>
            <ItineraryItem index={ind} stop={stop} />
          </TableRow>
        ))}
      </Table>
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
