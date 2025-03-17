import React from 'react';
import styled from 'styled-components';
import { Text, View } from 'react-native';
import { useTheme } from '@/contexts/themeContext';

import BackButton from '@/components/buttons/backButton';
import MenuButton from '../buttons/menuButton';

type headerProps = {
  title?: string;
};

const HeaderComponent: React.FC<React.PropsWithChildren<headerProps>> = ({ children, title }) => {
  const { theme } = useTheme();

  const Header = styled(View)`
    background-color: ${theme.secondaryColor};
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
  `;

  const Title = styled(Text)`
    color: ${theme.blankSpace};
    font-size: 20px;
    font-weight: bold;
  `;

  return (
    <Header>
      <BackButton />
        <Title>{title}</Title>
      {children}
      <MenuButton />
    </Header>
  );
};

export default HeaderComponent;