import styled from 'styled-components';
import { View } from 'react-native';
import { colors } from '../../assets/colors';

export const NavBar = styled(View)`
  background-color: ${colors.canvasBrown};
  height: 15%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`;