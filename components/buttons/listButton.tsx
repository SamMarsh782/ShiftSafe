import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import { useTheme } from '@/contexts/themeContext';

type TextProps = {
  $inverseBlankSpace?: string;
  disabled?: boolean;
};

const ButtonText = styled(Text)<TextProps>`
  font-size: 20px;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${(props: TextProps) => props.$inverseBlankSpace};
`;

type ButtonContainerProps = {
  $bgColor?: string;
  $width?: string;
  disabled?: boolean;
};

const ButtonContainer = styled(TouchableOpacity)<ButtonContainerProps>`
  background-color: ${(props: ButtonContainerProps) => props.$bgColor};
  height: 50px;
  width: ${(props: ButtonContainerProps & { theme: any }) => props.$width || '100%'};
  display: flex;
  margin: 1px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  align-self: center;
  opacity: ${(props: ButtonContainerProps & { theme: any }) => (props.disabled ? 0.5 : 1)};
`;

interface PressableButtonProps {
  onPress: () => void;
  title: string;
  bgColor?: string;
  inverseBlankSpace?: string;
  width?: string;
  disabled?: boolean;
  disabledTime?: number;
};

const ListButton = ({
  onPress,
  title,
  bgColor,
  inverseBlankSpace,
  width,
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
      $width={width}
      disabled={isButtonDisabled}
      {...rest}
    >
      <ButtonText $inverseBlankSpace={inverseBlankSpace || theme.blankSpace}>
        {remainingTime > 0 ? remainingTime : title}
      </ButtonText>
    </ButtonContainer>
  );
};

export default ListButton;