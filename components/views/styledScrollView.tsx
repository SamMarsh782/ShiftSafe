import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '@/contexts/themeContext';

interface StyledScrollViewProps extends ScrollViewProps {
  width?: string;
  height?: string;
  bgColor?: string;
}

const StyledScrollViewComponent: React.FC<StyledScrollViewProps> = ({ width, height, bgColor, ...props }) => {
  const { theme } = useTheme();

  const StyledScrollView = styled(ScrollView).attrs({
    contentContainerStyle: {
      alignItems: 'center',
    },
  })`
    background-color: ${bgColor ? bgColor : theme.secondaryColor};
    flex: 1;
    width: ${width || '100%'};
    height: ${height || '100%'};
  `;

  return <StyledScrollView {...props} />;
};

export default StyledScrollViewComponent;