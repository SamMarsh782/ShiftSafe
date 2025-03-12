import React, { useEffect, useState } from 'react';
import { Text, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import ScrollBGView from '@/components/views/scrollBGView';
import ListButton from '@/components/buttons/listButton';
import NavBar from '@/components/views/navBar';
import QuestionsModal from '@/components/modals/questionsModal';
import BackgroundView from '@/components/views/backgroundView';

import { useTheme } from '@/contexts/themeContext';

import { Equipment } from '@/types/equipment';
import { Question } from '@/types/question';

import { getEquipment } from '@/utils/apis/getEquipment';
import { getQuestions } from '@/utils/apis/getQuestions';

export default function EquipmentPage() {
  const { theme } = useTheme();

  const navigateHome = () => {
    router.replace({
      pathname: "./",
  });
  };

  const [newAnswers, setNewAnswers] = useState([]);

  const [questionsModalVisible, setQuestionsModalVisible] = useState(false);

  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const { userId } = useLocalSearchParams();
  const numericUserId = Array.isArray(userId) ? parseInt(userId[0], 10) : parseInt(userId, 10);

    useEffect(() => {
      getEquipment(numericUserId).then(equips => {
        setEquipmentData(equips);
        setSelectedEquipment(equips[0]);
      }).catch(error => {
        console.error('Error fetching users:', error.message);
      });
    }, [userId]);

  const [questionData, setQuestionData] = useState<Question[]>([]);

    useEffect(() => {
      if (selectedEquipment) {
        getQuestions(selectedEquipment.ID).then(questions => {
          setQuestionData(questions);
        }).catch(error => {
          console.error('Error fetching users:', error.message);
        });
      }
    }, [selectedEquipment]);

  const handleSelectItem = (itm: any) => {
    setQuestionsModalVisible(true);
    setSelectedEquipment(itm);
  };


  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.secondaryColor }}>
      <BackgroundView>
        <NavBar title='Select Your Equipment' />
        {questionsModalVisible && selectedEquipment ? (
          <QuestionsModal
            equipment={selectedEquipment}
            modalVisible={questionsModalVisible}
            setModalVisible={setQuestionsModalVisible}
            navigateToPage={navigateHome}
            questions={questionData}
            newAnswers={newAnswers}
            setNewAnswers={setNewAnswers}
          />
        ) : null}
          <ScrollBGView>
            {equipmentData
              .sort((a, b) => a.Equipment.localeCompare(b.Equipment))
              .map(eqpt => (
                <ListButton
                  key={eqpt.ID}
                  title={`${eqpt.Equipment}`}
                  onPress={() => handleSelectItem(eqpt)}
                />
              ))}
          </ScrollBGView>
      </BackgroundView>
    </SafeAreaView>
  );
};