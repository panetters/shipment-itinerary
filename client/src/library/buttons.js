import styled from 'styled-components';
import * as colors from './colors';

export const PrimaryButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: ${({ full }) => (full ? '100%' : '')};
  width: ${({ full }) => (full ? '100%' : '64px')};
  flex-shrink: 0;
  background-color: ${({ alternate }) => (alternate ? colors.highlight : colors.primary)};
  cursor: pointer;
`;

export const MenuButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 24px;
  width: 128px;
  background-color: ${colors.primary};
  border-radius: 8px;
  cursor: pointer;
`;
