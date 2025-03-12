/* Modules */
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { router } from 'expo-router';

/* Styles */
import { useTheme } from '@/contexts/themeContext';

const handlePress = () => {
  console.log('Not implemented yet');
}

type TextProps = {
  $textColor?: string;
};

const ButtonText = styled(Text)<TextProps>`
  font-size: 30px;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${(props: TextProps & { theme: any }) => props.$textColor || props.theme.blankSpace};
`;

type ButtonContainerProps = {
  $bgColor?: string;
};

const ButtonContainer = styled(TouchableOpacity)<ButtonContainerProps>`
  background-color: ${(props: ButtonContainerProps & { theme: any }) => props.$bgColor || props.theme.primaryColor};
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
  textColor?: string;
};

const MenuButton: React.FC<PressableButtonProps> = ({
  bgColor,
  textColor,
  ...rest
}) => {
  const { theme } = useTheme();

  return (
    <ButtonContainer
      onPress={() => handlePress()}
      $bgColor={bgColor || theme.secondaryColor}
      {...rest}
    >
      <ButtonText $textColor={textColor || theme.blankSpace}>
        &#9776;
      </ButtonText>
    </ButtonContainer>
  );
};

export default MenuButton;