import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';

import { useTheme } from '@/contexts/themeContext';

interface WideContainerProps {
  children: React.ReactNode;
}

const WideContainerComponent: React.FC<WideContainerProps> = ({ children }) => {
  const { theme } = useTheme();

  const WideContainer = styled(View)`
    flex-direction: column;
    justify-content: space-between;
    width: 95%;
    background-color: ${theme.blankSpace};
    border-radius: 20px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 15px;
    shadow-opacity: 0.3;
    shadow-radius: 3.84px;
    elevation: 5;
  `;

  return <WideContainer>{children}</WideContainer>;
};

export default WideContainerComponent;