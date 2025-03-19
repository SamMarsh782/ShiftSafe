import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import styled from 'styled-components';
import { router } from 'expo-router';

import SquareButton from '../buttons/squareButton';
import StandardButton from '../buttons/standardButton';
import StyledScrollView from '../views/styledScrollView';

import { Equipment } from '../../types/equipment';

import { useTheme } from '@/contexts/themeContext';
import { useEquipment } from '@/contexts/equipmentContext';
import { useUser } from '@/contexts/userContext';
import { submitPretrip } from '@/utils/apis/submitPretrip';

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
  const { user } = useUser();

  const [answers, setAnswers] = useState<string[]>([]);

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
    color: ${theme.inverseBlankSpace};
    margin: 10px 10px 0px 10px;
    text-align: center;
  `;

  const QuestionText = styled(Text)`
    font-size: 15px;
    margin: 10px;
    text-align: flex-start;
    color: ${theme.inverseBlankSpace};
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

  function handleYesPress(index: number) {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = 'Yes';
      return updatedAnswers;
    });
  }
  
  function handleNoPress(index: number) {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = 'No';
      return updatedAnswers;
    });
  }

  function allQuestionsAnswered(answers: string[]) {
    return answers.length === questions.length && answers.every((answer) => answer !== undefined);
  }

  function problemIndicated(answers: string[]) {
    return answers.some((answer) => answer === 'No');
  }

  function handleSubmitPress(setModalVisible: (modalVisible: boolean) => void, setSelectedEquipment: (equipment: Equipment | null) => void) {
    if (!allQuestionsAnswered(answers)) {
      alert('Please answer all questions before submitting.');
      return;
    }
  
    const answersArray = questions.map((question: any, index: number) => ({
      User_ID: user?.ID,
      Asset_ID: selectedEquipment.ID,
      Question_ID: question.ID,
      Answer: answers[index] || 'Unanswered',
      Time_Submitted: new Date().toISOString(),
    }));
    submitPretrip(answersArray);
    if(problemIndicated(answers)) {
      alert('Problem indicated. Please provide a picture of the issue and a description.');
      router.push('./report');
    } else {
      setEquipment(selectedEquipment);
      router.push('./');
    }
    setModalVisible(false);
    setSelectedEquipment(null);
  }

  function handleCancelPress(setModalVisible: (modalVisible: boolean) => void, setSelectedEquipment: (equipment: Equipment | null) => void) {
    setModalVisible(false);
    setSelectedEquipment(null);
  }

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
              {questions.map((question: any, index: number) => (
                <LeftHoView key={index}>
                  <SquareButton
                    bgColor={
                      answers[index] === 'Yes'
                        ? theme.neutralGray
                        : theme.successColor
                    }
                    inverseBlankSpace={theme.blankSpace}
                    onPress={() => handleYesPress(index)}
                    title="Yes"
                    size="40px"
                    disabled={answers[index] === 'Yes'}
                  />
                  <SquareButton
                    bgColor={
                      answers[index] === 'No'
                        ? theme.neutralGray
                        : theme.dangerColor
                    }
                    inverseBlankSpace={theme.blankSpace}
                    onPress={() => handleNoPress(index)}
                    title="No"
                    size="40px"
                    disabled={answers[index] === 'No'}
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
            inverseBlankSpace={theme.blankSpace}
            onPress={() => handleSubmitPress(setModalVisible, setSelectedEquipment)}
            title="Submit"
          />
          <StandardButton
            bgColor={theme.dangerColor}
            inverseBlankSpace={theme.blankSpace}
            onPress={() => handleCancelPress(setModalVisible, setSelectedEquipment)}
            title="Cancel"
          />
        </ModalView>
      </CenteredView>
    </Modal>
  );
};

export default QuestionsModal;