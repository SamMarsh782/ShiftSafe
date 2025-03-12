import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import { useTheme } from '@/contexts/themeContext';

const NavBarComponent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { theme } = useTheme();

  const NavBar = styled(View)`
    background-color: ${theme.secondaryColor};
    height: 15%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
  `;

  return <NavBar>{children}</NavBar>;
};

export default NavBarComponent;