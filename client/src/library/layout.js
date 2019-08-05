import styled from 'styled-components';

export const Table = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const TableRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  margin-top: 8px;

  opacity: ${({ fade }) => (fade ? 0.5 : 1)};
`;

export const TableCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: ${({ size }) => `${(100 * size) / 12}%`};

  :not(:last-child) {
    margin-right: 8px;
  }
`;
