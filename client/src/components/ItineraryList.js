import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Table, TableRow, TableCell } from '../library/layout';
import { H2Text, MainText } from '../library/typography';
import ItineraryItem from './ItineraryItem';

function ItineraryList({ stops }) {
  return (
    <>
      <H2Text>Itinerary:</H2Text>
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
          <TableRow key={stop.id} fade={stop.complete}>
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
