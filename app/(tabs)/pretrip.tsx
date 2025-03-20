import React, { useState, useEffect } from 'react';
import { Modal, Text, View, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import BackgroundView from '@/components/views/backgroundView';
import Header from '@/components/views/header';
import ScrollBGView from '@/components/views/styledScrollView';
import SquareButton from '@/components/buttons/squareButton';
import StandardButton from '@/components/buttons/standardButton';
import QRModal from '@/components/modals/qrModal';

import { Question } from '@/types/question';

import { useTheme } from '@/contexts/themeContext';
import { useEquipment } from '@/contexts/equipmentContext';
import { useUser } from '@/contexts/userContext';

import { getQuestions } from '@/utils/apis/getQuestions';
import { submitPretrip } from '@/utils/apis/submitPretrip';

export default function Pretrip() {
  const { theme } = useTheme();
  const { equipment } = useEquipment();
  const { user } = useUser();

  const [qrModalVisible, setQRModalVisible] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [expectedQR, setexpectedQR] = useState<string>('');
  const [questionData, setQuestionData] = useState<Question[]>([]);
  const [answerIndex, setAnswerIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (equipment && equipment.length > 0) {
      getQuestions(equipment[0].ID!)
        .then((questions) => {
          setQuestionData(questions);
        })
        .catch((error) => {
          console.error('Error fetching questions:', error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [equipment]);

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

  function checkValue(data: string) {
    if (data === expectedQR) {
      updateAnswer(answerIndex, 'Yes');
    } else {
      alert('QR code does not match expected value. Please try again.');
    }
  }

  function updateAnswer(index: number, answer: string) {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = answer;
      return updatedAnswers;
    });
  }

  function handleYesPress(index: number) {
    if (questionData[index].Check_String) {
      setAnswerIndex(index);
      setexpectedQR(questionData[index].Check_String);
      setQRModalVisible(true);
    }
  }

  function handleNoPress(index: number) {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = 'No';
      return updatedAnswers;
    });
  }

  function allQuestionsAnswered(answers: string[]) {
    return (
      answers.length === questionData.length &&
      answers.every((answer) => answer !== undefined)
    );
  }

  function problemIndicated(answers: string[]) {
    return answers.some((answer) => answer === 'No');
  }

  function handleSubmitPress() {
    if (!allQuestionsAnswered(answers)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const answersArray = questionData.map((question: any, index: number) => ({
      User_ID: user?.ID,
      Asset_ID: equipment && equipment[0]?.ID,
      Question_ID: question.ID,
      Answer: answers[index] || 'Unanswered',
      Time_Submitted: new Date().toISOString(),
    }));
    submitPretrip(answersArray);
    if (problemIndicated(answers)) {
      alert(
        'Problem indicated. Please provide a picture of the issue and a description.'
      );
      router.push({
        pathname: './report',
        params: { issue: 'true' },
      });
    } else {
      router.push('./');
    }
    setAnswers([]);
  }

  function handleCancelPress() {
    setAnswers([]);
    router.push('./equipment');
  }

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.secondaryColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={theme.primaryColor} />
        <Text style={{ marginTop: 10, color: theme.inverseBlankSpace }}>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.secondaryColor }}>
      <BackgroundView>
        <Header title="Submit a Pretrip" />
        {qrModalVisible && (
          <QRModal
            modalVisible={qrModalVisible}
            setModalVisible={setQRModalVisible}
            onScan={checkValue}
          />
        )}
        <ScrollBGView bgColor={theme.blankSpace}>
          {questionData.map((question: any, index: number) => (
            <LeftHoView key={index}>
              <SquareButton
                bgColor={
                  answers[index] === 'Yes'
                    ? theme.neutralGray
                    : theme.successColor
                }
                textColor={theme.blankSpace}
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
                textColor={theme.blankSpace}
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
          <StandardButton
            bgColor={theme.successColor}
            inverseBlankSpace={theme.blankSpace}
            onPress={() => handleSubmitPress()}
            title="Submit"
          />
          <StandardButton
            bgColor={theme.dangerColor}
            inverseBlankSpace={theme.blankSpace}
            onPress={() => handleCancelPress()}
            title="Cancel"
          />
        </ScrollBGView>
      </BackgroundView>
    </SafeAreaView>
  );
}