import { createGlobalStyle } from 'styled-components';
import * as colors from './colors';

export default createGlobalStyle`
  body {
    background-color: ${colors.background};
    padding: 0 32px;
    color: ${colors.textMain};
    font-family: 'Roboto';
  }
`;
