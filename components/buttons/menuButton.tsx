import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { router } from 'expo-router';

import { useTheme } from '@/contexts/themeContext';

type TextProps = {
  $inverseBlankSpace?: string;
};

const ButtonText = styled(Text)<TextProps>`
  font-size: 30px;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${(props: TextProps) => props.$inverseBlankSpace};
`;

type ButtonContainerProps = {
  $bgColor?: string;
};

const ButtonContainer = styled(TouchableOpacity)<ButtonContainerProps>`
  background-color: ${(props: ButtonContainerProps) => props.$bgColor};
  height: 30px;
  width: 30px;
  display: flex;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  align-self: center;;
`;

type PressableButtonProps = {
  bgColor?: string;
  inverseBlankSpace?: string;
};

const MenuButton: React.FC<PressableButtonProps> = ({
  bgColor,
  inverseBlankSpace,
  ...rest
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ButtonContainer
      onPress={() => router.push('/settings')}
      $bgColor={bgColor || theme.secondaryColor}
      {...rest}
    >
      <ButtonText $inverseBlankSpace={inverseBlankSpace || theme.blankSpace}>
        &#9776;
      </ButtonText>
    </ButtonContainer>
  );
};

export default MenuButton;