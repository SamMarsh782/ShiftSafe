import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';

import { useTheme } from '@/contexts/themeContext';

interface BackgroundViewProps {
  children: React.ReactNode;
}

const BackgroundView: React.FC<BackgroundViewProps> = ({ children }) => {
  const { theme } = useTheme();

  const BackgroundView = styled(View)`
    background-color: ${theme.secondaryColor};
    display: flex;
    height: 100%;
    width: 100%;
  `;

  return <BackgroundView>{children}</BackgroundView>;
};

export default BackgroundView;