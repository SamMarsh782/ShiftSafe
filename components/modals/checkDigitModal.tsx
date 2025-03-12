import React from 'react';
import { Alert, Modal, Text, View } from 'react-native';
import styled from 'styled-components';

import SquareButton from '../buttons/squareButton';
import StandardButton from '../buttons/standardButton';

import { useTheme } from '@/contexts/themeContext';

import { User } from '../../types/user';
import { RootStackParamList } from '@/types/rootStackParamList';

type ModalProps = {
  user: User;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  randomDigits: number[];
  generateRandomDigits: () => void;
  navigateToPage: (page: keyof RootStackParamList) => void;
};

const CheckDigitModal = ({
  user,
  modalVisible,
  setModalVisible,
  randomDigits,
  generateRandomDigits,
  navigateToPage,
}: ModalProps) => {
  const { theme } = useTheme();

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

  const handleCancelPress = (
    setModalVisible: (modalVisible: boolean) => void,
    generateRandomDigits: () => void
  ) => {
    setModalVisible(false);
    generateRandomDigits();
  };

  const handleCDPress = (
    checkDigit: number,
    user: User,
    setModalVisible: (modalVisible: boolean) => void,
    navigateToPage: (page: keyof RootStackParamList) => void,
    generateRandomDigits: () => void
  ) => {
    generateRandomDigits();
    if (checkDigit === user.Check_Digit) {
      setModalVisible(false);
      navigateToPage('equipment');
    } else {
      Alert.alert('Guess again, idiot!');
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <CenteredView>
        <ModalView>
          <ModalTitle>Select check digit for:</ModalTitle>
          <ModalTitle>{user.User}</ModalTitle>
          <SpacedView>
            <SquareButton
              bgColor={theme.tertiaryColor}
              textColor={theme.blankSpace}
              size="50px"
              onPress={() =>
                handleCDPress(
                  randomDigits[0],
                  user,
                  setModalVisible,
                  navigateToPage,
                  generateRandomDigits
                )
              }
              title={randomDigits[0].toString()}
            />
            <SquareButton
              bgColor={theme.tertiaryColor}
              textColor={theme.blankSpace}
              size="50px"
              onPress={() =>
                handleCDPress(
                  randomDigits[1],
                  user,
                  setModalVisible,
                  navigateToPage,
                  generateRandomDigits
                )
              }
              title={randomDigits[1].toString()}
            />
            <SquareButton
              bgColor={theme.tertiaryColor}
              textColor={theme.blankSpace}
              size="50px"
              onPress={() =>
                handleCDPress(
                  randomDigits[2],
                  user,
                  setModalVisible,
                  navigateToPage,
                  generateRandomDigits
                )
              }
              title={randomDigits[2].toString()}
            />
            <SquareButton
              bgColor={theme.tertiaryColor}
              textColor={theme.blankSpace}
              size="50px"
              onPress={() =>
                handleCDPress(
                  user.Check_Digit,
                  user,
                  setModalVisible,
                  navigateToPage,
                  generateRandomDigits
                )
              }
              title={user.Check_Digit.toString()}
            />
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