/* Modules */
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

/* Styles */
import { useTheme } from '@/contexts/themeContext';

type TextProps = {
  $textColor?: string;
  disabled?: boolean;
};

const ButtonText = styled(Text)<TextProps>`
  font-size: 20px;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${(props: TextProps) => props.$textColor};
`;

type ButtonContainerProps = {
  $bgColor?: string;
  $size?: string;
  disabled?: boolean;
};

const ButtonContainer = styled(TouchableOpacity)<ButtonContainerProps>`
  background-color: ${(props: ButtonContainerProps) => props.$bgColor};
  height: ${(props: ButtonContainerProps) => (props.$size ? props.$size : '50px')};
  width: ${(props: ButtonContainerProps) => (props.$size ? props.$size : '50px')};
  display: flex;
  margin: 5px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  align-self: center;
  opacity: ${(props: ButtonContainerProps) => (props.disabled ? 0.5 : 1)};
`;

type PressableButtonProps = {
  onPress: () => void;
  title: string;
  bgColor?: string;
  textColor?: string;
  size?: string;
  disabled?: boolean;
  disabledTime?: number;
};

const SquareButton = ({
  onPress,
  title,
  bgColor,
  textColor,
  size,
  disabled,
  disabledTime = 0,
  ...rest
}: PressableButtonProps) => {
  const { theme } = useTheme(); // Use the useTheme hook
  const [remainingTime, setRemainingTime] = useState(disabledTime);
  const [isButtonDisabled, setIsButtonDisabled] = useState(disabled);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (disabledTime > 0) {
      setIsButtonDisabled(true);
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            setIsButtonDisabled(false);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [disabledTime]);

  return (
    <ButtonContainer
      onPress={onPress}
      $bgColor={bgColor || theme.primaryColor}
      $size={size}
      disabled={isButtonDisabled}
      {...rest}
    >
      <ButtonText $textColor={textColor || theme.blankSpace}>
        {remainingTime > 0 ? remainingTime : title}
      </ButtonText>
    </ButtonContainer>
  );
};

export default SquareButton;