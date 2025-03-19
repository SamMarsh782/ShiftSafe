import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { router } from 'expo-router';

import { useTheme } from '@/contexts/themeContext';

const routeBack = (issue: boolean) => {
  if(router.canGoBack()) {
    if(!issue) {
      router.back();
    } else {
      alert('Please report the issue before leaving the page.');
    }
  } else {      
    router.replace('/');
  }
}

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
  align-self: center;
`;

type PressableButtonProps = {
  bgColor?: string;
  inverseBlankSpace?: string;
  issue?: boolean;
};

const BackButton: React.FC<PressableButtonProps> = ({
  bgColor,
  inverseBlankSpace,
  issue,
  ...rest
}) => {
  const { theme } = useTheme();

  return (
    <ButtonContainer
      onPress={() => routeBack(issue || false)}
      $bgColor={bgColor || theme.secondaryColor}
      {...rest}
    >
      <ButtonText $inverseBlankSpace={inverseBlankSpace || theme.blankSpace}>
        {'<'}
      </ButtonText>
    </ButtonContainer>
  );
};

export default BackButton;