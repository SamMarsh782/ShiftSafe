import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

import { useTheme } from '@/contexts/themeContext';

type TextProps = {
  $textColor?: string;
};

const ButtonText = styled(Text)<TextProps>`
  font-size: 10px;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${props => props.$textColor};
`;

type ButtonContainerProps = {
  $bgColor?: string;
  $width?: string;
};

const ButtonContainer = styled(TouchableOpacity)<ButtonContainerProps>`
  height: 40px;
  width: ${props => props.$width || '80%'};
  display: flex;
  margin: 10px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  align-self: center;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const TopContainer = styled(View)<ButtonContainerProps>`
  background-color: ${props => props.$bgColor};
  height: 20px;
  width: 100%;
  display: flex;
  border-radius: 15px 15px 0 0;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const BottomContainer = styled(View)<ButtonContainerProps>`
  background-color: ${props => props.$bgColor};
  height: 20px;
  width: 100%;
  display: flex;
  border-radius: 0 0 15px 15px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

type PressableButtonProps = {
  title: string;
  bgColor?: string;
  textColor?: string;
  width?: string;
  condition: boolean;
  setCondition: (condition: boolean) => void;
};

const ToggleButton = ({
  title,
  bgColor,
  textColor,
  width,
  condition,
  setCondition,
}: PressableButtonProps) => {

    const { theme } = useTheme();

  return (

    <ButtonContainer
      onPress={() => {
        setCondition(!condition);
      }}
      $bgColor={bgColor}
      $width={width}>
      <TopContainer
        $bgColor={condition ? bgColor : theme.darkGray}
        $width={width}>
        <ButtonText $textColor={textColor}>
          {title}
          <Text style={{fontSize: 15}}>&#8593;</Text>
        </ButtonText>
      </TopContainer>
      <BottomContainer
        $bgColor={condition ? theme.darkGray : bgColor}
        $width={width}>
        <ButtonText $textColor={textColor}>
          {title}
          <Text style={{fontSize: 15}}>&#8595;</Text>
        </ButtonText>
      </BottomContainer>
    </ButtonContainer>
  );
};

export default ToggleButton;