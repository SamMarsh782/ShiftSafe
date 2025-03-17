import React from 'react';
import { Modal, Text, View } from 'react-native';
import styled from 'styled-components';
import { router } from 'expo-router';

import SquareButton from '../buttons/squareButton';
import StandardButton from '../buttons/standardButton';
import StyledScrollView from '../views/styledScrollView';

import { Equipment } from '../../types/equipment';

import { useTheme } from '@/contexts/themeContext';
import { useEquipment } from '@/contexts/equipmentContext';

type ModalProps = {
  selectedEquipment: Equipment;
  setSelectedEquipment: (equipment: Equipment | null) => void;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  questions: any;
  newAnswers: any;
  setNewAnswers: (newAnswers: any) => void;
};

const QuestionsModal = ({
  selectedEquipment,
  setSelectedEquipment,
  modalVisible,
  setModalVisible,
  questions,
  newAnswers,
  setNewAnswers,
}: ModalProps) => {
  const { theme } = useTheme();
  const { setEquipment } = useEquipment();

  const ModalView = styled(View)`
    background-color: ${theme.blankSpace};
    border-radius: 20px;
    align-items: center;
    height: 80%;
    width: 95%;
    margin: 20px;
    padding: 5px;
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

  const LeftHoView = styled(View)`
    background-color: ${theme.blankSpace};
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    height: 75px;
    margin: 5px;
    border-radius: 10px;
    outline: 0;
    elevation: 5;
  `;

  const ModalTitle = styled(Text)`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.textColor};
    margin: 10px 10px 0px 10px;
    text-align: center;
  `;

  const QuestionText = styled(Text)`
    font-size: 15px;
    margin: 10px;
    text-align: flex-start;
    color: ${theme.textColor};
  `;

  const QuestionTextContainer = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 10px;
  `;

  const StyledScrollViewContainer = styled(View)`
    width: 100%;
    height: 60%;
  `;

  function handleSubmitPress(setModalVisible: (modalVisible: boolean) => void, setSelectedEquipment: (equipment: Equipment | null) => void) {
    setModalVisible(false);
    setEquipment(selectedEquipment);
    router.push('./');
    setSelectedEquipment(null);
  }

  function handleCancelPress(setModalVisible: (modalVisible: boolean) => void, setSelectedEquipment: (equipment: Equipment | null) => void) {
    setModalVisible(false);
    setSelectedEquipment(null);
  }

  function handleYesPress() {}

  function handleNoPress() {}

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <CenteredView>
        <ModalView>
          <ModalTitle>Questions</ModalTitle>
          <StyledScrollViewContainer>
            <StyledScrollView
              width='100%'
              height='60%'
              bgColor={theme.blankSpace}
            >
              {questions.map((question: any) => (
                <LeftHoView key={question.ID}>
                  <SquareButton
                    bgColor={theme.successColor}
                    textColor={theme.blankSpace}
                    onPress={() => handleYesPress()}
                    title="Yes"
                    size="40px"
                  />
                  <SquareButton
                    bgColor={theme.dangerColor}
                    textColor={theme.blankSpace}
                    onPress={() => handleNoPress()}
                    title="No"
                    size="40px"
                  />
                  <QuestionTextContainer>
                    <QuestionText>{question.Question}</QuestionText>
                  </QuestionTextContainer>
                </LeftHoView>
              ))}
            </StyledScrollView>
          </StyledScrollViewContainer>
          <StandardButton
            bgColor={theme.successColor}
            textColor={theme.blankSpace}
            onPress={() => handleSubmitPress(setModalVisible, setSelectedEquipment)}
            title="Submit"
          />
          <StandardButton
            bgColor={theme.dangerColor}
            textColor={theme.blankSpace}
            onPress={() => handleCancelPress(setModalVisible, setSelectedEquipment)}
            title="Cancel"
          />
        </ModalView>
      </CenteredView>
    </Modal>
  );
};

export default QuestionsModal;