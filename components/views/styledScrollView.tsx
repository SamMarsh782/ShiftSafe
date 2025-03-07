import { ScrollView } from 'react-native';

import styled from 'styled-components';

import { colors } from '../../assets/colors';

interface StyledScrollViewProps {
    width?: string;
    height?: string;
}

export const StyledScrollView = styled(ScrollView).attrs({
    contentContainerStyle: {
      alignItems: 'center',
    },
  })`
    background-color: ${colors.canvasBrown};
    flex: 1;
    width: ${(props) => (props as StyledScrollViewProps).width || '100%'};
    height: ${(props) => (props as StyledScrollViewProps).height || '100%'};
  `;