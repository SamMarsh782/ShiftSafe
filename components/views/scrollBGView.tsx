import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { colors } from '../../assets/colors';

export const ScrollBGView = styled(ScrollView).attrs({
    contentContainerStyle: {
      alignItems: 'center',
    },
  })`
    background-color: ${colors.white};
    flex: 1;
  `;