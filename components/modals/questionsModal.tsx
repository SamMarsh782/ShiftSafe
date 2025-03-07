import React, {useState} from 'react';
import {Alert, Modal, Text, View} from 'react-native';
import styled from 'styled-components';

import SquareButton from '../buttons/squareButton';
import StandardButton from '../buttons/standardButton';
import { StyledScrollView } from '../views/styledScrollView';

import {colors} from '../../assets/colors';

import {Equipment} from '../../types/equipment';
import { RootStackParamList } from '@/types/rootStackParamList';

type ModalProps = {
  equipment: Equipment;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  navigateToPage: (page: keyof RootStackParamList) => void;
  questions: any;
  newAnswers: any;
  setNewAnswers: (newAnswers: any) => void;
};

const ModalView = styled(View)`
  background-color: ${colors.canvasBrown};
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
`;

const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LeftHoView = styled(View)`
    background-color: ${colors.white};
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    height: 75px;
    margin: 5px;
    border-radius: 10px;
`;

const ModalTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 10px 0px 10px;
  text-align: center;
`;

const QuestionText = styled(Text)`
  font-size: 15px;
  margin: 10px;
  text-align: flex-start;
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

function filterQuestions(questions: any, equipment: Equipment) {
  console.log(questions);
  console.log(equipment);
    return questions.filter((question: any) => question.Equipment === equipment.ID);  
}

function handleSubmitPress(setModalVisible: (modalVisible: boolean) => void) {
    setModalVisible(false);
}

function handleCancelPress(setModalVisible: (modalVisible: boolean) => void) {
        setModalVisible(false);
}

function handleYesPress() {
    
}

function handleNoPress() {

}


const CheckDigitModal = ({
    equipment,
    modalVisible,
    setModalVisible,
    navigateToPage,
    questions,
    newAnswers,
    setNewAnswers,
}: ModalProps) => {

  const [filteredQuestions, setFilteredQuestions] = useState(filterQuestions(questions, equipment));

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <CenteredView>
            <ModalView>
            <ModalTitle>
              Questions
            </ModalTitle>
            <StyledScrollViewContainer>
              <StyledScrollView
                style={{ width: '100%', height: '60%' }}
              >
                {filteredQuestions.map((question: any) => (
                  <LeftHoView key={question.ID}>
                    <SquareButton
                      bgColor={colors.safariGreen}
                      textColor={colors.white}
                      onPress={() => handleYesPress()}
                      title="Yes"
                      size="40px"
                    />
                    <SquareButton
                      bgColor={colors.dangerRed}
                      textColor={colors.white}
                      onPress={() => handleNoPress()}
                      title="No"
                      size="40px"
                    />
                    <QuestionTextContainer>
                      <QuestionText>
                        {question.Question}
                      </QuestionText>
                    </QuestionTextContainer>
                  </LeftHoView>
                ))}
              </StyledScrollView>
            </StyledScrollViewContainer>
              <StandardButton
                bgColor={colors.safariGreen}
                textColor={colors.white}
                onPress={() => handleSubmitPress(setModalVisible)}
                title="Submit"
              />
              <StandardButton
                bgColor={colors.dangerRed}
                textColor={colors.white}
                onPress={() => handleCancelPress(setModalVisible)}
                title="Cancel"
              />
            </ModalView>
      </CenteredView>
    </Modal>
  );
};

export default CheckDigitModal;