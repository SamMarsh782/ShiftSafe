/* Modules */
import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

/* Styles */
import {colors} from '../../assets/colors';

type TextProps = {
  $textColor?: string;
};

const ButtonText = styled(Text)<TextProps>`
  font-size: 20px;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${props => props.$textColor || colors.white};
`;

type ButtonContainerProps = {
  $bgColor?: string;
  $width?: string;
};

const ButtonContainer = styled(TouchableOpacity)<ButtonContainerProps>`
  background-color: ${props => props.$bgColor || colors.buttonColor};
  height: 50px;
  width: ${props => props.$width || '100%'};
  display: flex;
  margin: 1px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  align-self: center;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

type PressableButtonProps = {
  onPress: () => void;
  title: string;
  bgColor?: string;
  textColor?: string;
  width?: string;
  disabled?: boolean;
  disabledTime?: number;
};

const ListButton = ({
  onPress,
  title,
  bgColor,
  textColor,
  width,
  disabled,
  disabledTime = 0,
  ...rest
}: PressableButtonProps) => {
  const [remainingTime, setRemainingTime] = useState(disabledTime);
  const [isButtonDisabled, setIsButtonDisabled] = useState(disabled);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (disabledTime > 0) {
      setIsButtonDisabled(true);
      intervalId = setInterval(() => {
        setRemainingTime(prevTime => {
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
    // @ts-ignore
    <ButtonContainer
      onPress={onPress}
      $bgColor={bgColor}
      $width={width}
      disabled={isButtonDisabled}
      {...rest}>
      <ButtonText $textColor={textColor}>
        {remainingTime > 0 ? remainingTime : title}
      </ButtonText>
    </ButtonContainer>
  );
};

export default ListButton;