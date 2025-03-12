import React, { useEffect, useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';
import styled from 'styled-components';
import { router } from 'expo-router';

import SquareButton from '../buttons/squareButton';
import StandardButton from '../buttons/standardButton';

import { useTheme } from '@/contexts/themeContext';

import { User } from '../../types/user';

type ModalProps = {
  user: User;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  randomDigits: number[];
  generateRandomDigits: () => void;
};

const CheckDigitModal = ({
  user,
  modalVisible,
  setModalVisible,
  randomDigits,
  generateRandomDigits,
}: ModalProps) => {
  const { theme } = useTheme();
  const [shuffledDigits, setShuffledDigits] = useState<number[]>([]);

  useEffect(() => {
    shuffleDigits();
  }, [randomDigits]);

  const shuffleDigits = () => {
    const digits = [...randomDigits, user.Check_Digit];
    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    setShuffledDigits(digits);
  };

  const ModalView = styled(View)`
    background-color: ${theme.blankSpace};
    border-radius: 20px;
    padding: 10px;
    align-items: center;
    height: 50%;
    width: 70%;
    margin: 20px;
    shadow-color: #000;
    shadow-offset-width: 0px;
    shadow-offset-height: 2px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    outline: 0;
    elevation: 5;
  `;

  const CenteredView = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
  `;

  const SpacedView = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 50%;
  `;

  const ModalTitle = styled(Text)`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.textColor};
    margin: 10px 10px 0px 10px;
    text-align: center;
  `;

  const reloadDigits = () => {
    generateRandomDigits();
    shuffleDigits();
  };

  const handleCancelPress = (
    setModalVisible: (modalVisible: boolean) => void,
    reloadDigits: () => void
  ) => {
    setModalVisible(false);
    reloadDigits();
  };

  const handleCDPress = (
    checkDigit: number,
    user: User,
    setModalVisible: (modalVisible: boolean) => void,
    reloadDigits: () => void
  ) => {
    if (checkDigit === user.Check_Digit) {
      setModalVisible(false);
      router.replace({
        pathname: "./equipment",
        params: {userId: user.ID}
      });
    } else {
      Alert.alert('Incorrect Check Digit', 'Please try again.', [
        { text: 'OK', onPress: () => reloadDigits() },
      ]);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <CenteredView>
        <ModalView>
          <ModalTitle>Select check digit for:</ModalTitle>
          <ModalTitle>{user.User}</ModalTitle>
          <SpacedView>
            {shuffledDigits.map((digit, index) => (
              <SquareButton
                key={index}
                bgColor={theme.tertiaryColor}
                textColor={theme.blankSpace}
                size="50px"
                onPress={() =>
                  handleCDPress(
                    digit,
                    user,
                    setModalVisible,
                    reloadDigits
                  )
                }
                title={digit.toString()}
              />
            ))}
          </SpacedView>
          <StandardButton
            bgColor={theme.tertiaryColor}
            textColor={theme.blankSpace}
            onPress={() => handleCancelPress(setModalVisible, generateRandomDigits)}
            title="Cancel"
          />
        </ModalView>
      </CenteredView>
    </Modal>
  );
};

export default CheckDigitModal;