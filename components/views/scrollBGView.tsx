import React from 'react';
import styled from 'styled-components';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useTheme } from '@/contexts/themeContext';

interface ScrollBGViewProps extends ScrollViewProps {}

const ScrollBGViewComponent: React.FC<ScrollBGViewProps> = (props) => {
  const { theme } = useTheme();

  const StyledScrollView = styled(ScrollView).attrs({
    contentContainerStyle: {
      alignItems: 'center',
    },
  })`
    background-color: ${theme.blankSpace};
    flex: 1;
  `;

  return <StyledScrollView {...props} />;
};

export default ScrollBGViewComponent;