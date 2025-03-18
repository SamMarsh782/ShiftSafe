import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { router } from 'expo-router';

import { useTheme } from '@/contexts/themeContext';

const routeBack = () => {
  if(router.canGoBack()) {
    router.back();
  } else {
    router.replace('/');
  }
}

type TextProps = {
  $textColor?: string;
};

const ButtonText = styled(Text)<TextProps>`
  font-size: 30px;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${(props: TextProps) => props.$textColor};
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
  align-self: center;
`;

type PressableButtonProps = {
  bgColor?: string;
  textColor?: string;
};

const BackButton: React.FC<PressableButtonProps> = ({
  bgColor,
  textColor,
  ...rest
}) => {
  const { theme } = useTheme();

  return (
    <ButtonContainer
      onPress={() => routeBack()}
      $bgColor={bgColor || theme.secondaryColor}
      {...rest}
    >
      <ButtonText $textColor={textColor || theme.blankSpace}>
        {'<'}
      </ButtonText>
    </ButtonContainer>
  );
};

export default BackButton;