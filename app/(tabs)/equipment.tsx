import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, BackHandler } from 'react-native';

import ScrollBGView from '@/components/views/scrollBGView';
import ListButton from '@/components/buttons/listButton';
import NavBar from '@/components/views/navBar';
import QuestionsModal from '@/components/modals/questionsModal';
import StandardButton from '@/components/buttons/standardButton';
import { router } from 'expo-router';

export default function Equipment() {

  const navigateHome = () => {
    router.replace({
      pathname: "./",
  });
  };

  const getQuestions = () => {
    const questions = [
      { ID: 12345, Equipment: 11111, Question: "Are the forks good?" },
      { ID: 23456, Equipment: 11111, Question: "Do the lights work?" },
      { ID: 34567, Equipment: 11111, Question: "Are all of the labels and warnings attached in all of the locations that the labels need to be attached?" },
      { ID: 45678, Equipment: 22222, Question: "Are the forks good?" },
      { ID: 56789, Equipment: 22222, Question: "Are the wheels good?" },
      { ID: 67890, Equipment: 22222, Question: "Does steering work?" },
      { ID: 78901, Equipment: 22222, Question: "Is the item in good working condition?" },
      { ID: 78901, Equipment: 22222, Question: "Is the item in good working condition?" },
      { ID: 78901, Equipment: 22222, Question: "Is the item in good working condition?" },
      { ID: 78901, Equipment: 22222, Question: "Is the item in good working condition?" },
      { ID: 78901, Equipment: 22222, Question: "Is the item in good working condition?" },
      { ID: 78901, Equipment: 22222, Question: "Is the item in good working condition?" },
      { ID: 78901, Equipment: 22222, Question: "Is the item in good working condition?" },
      { ID: 78901, Equipment: 22222, Question: "Is the item in good working condition?" },
      { ID: 78901, Equipment: 22222, Question: "Is the item in good working condition?" },
      { ID: 89012, Equipment: 33333, Question: "Filler question" },
      { ID: 90123, Equipment: 44444, Question: "Filler question" },
      { ID: 99999, Equipment: 55555, Question: "Filler question" }
    ];
    return questions;
  }

  const [newAnswers, setNewAnswers] = useState([]);

  const [questionsModalVisible, setQuestionsModalVisible] = useState(false);

  const [equipmentData, setEquipmentData] = useState([
    {
      "ID": 11111,
      "Equipment": "Forklift",
    },
    {
      "ID": 22222,
      "Equipment": "Pallet Jack",
    },
    {
      "ID": 33333,
      "Equipment": "Scissor Lift",
    },
    {
      "ID": 44444,
      "Equipment": "Boom Lift",
    },
    {
      "ID": 55555,
      "Equipment": "RF Scanner",
    }
  ]);

  const handleSelectItem = (itm: any) => {
    setQuestionsModalVisible(true);
    setSelectedEquipment(itm);
  };

  const [selectedEquipment, setSelectedEquipment] = useState(equipmentData[0]);

  

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavBar>
        <StandardButton
          title="Back"
          onPress={() => navigateHome()}
        >
        </StandardButton>
      </NavBar>
      {questionsModalVisible ? (
        <QuestionsModal
          equipment={selectedEquipment}
          modalVisible={questionsModalVisible}
          setModalVisible={setQuestionsModalVisible}
          navigateToPage={navigateHome}
          questions={getQuestions()}
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
    </SafeAreaView>
  );
};