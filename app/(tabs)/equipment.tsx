import React, { useEffect, useState } from 'react';
import { Text, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import ScrollBGView from '@/components/views/scrollBGView';
import ButtonList from '@/components/buttons/buttonList';
import Header from '@/components/views/header';
import QuestionsModal from '@/components/modals/questionsModal';
import BackgroundView from '@/components/views/backgroundView';
import StandardButton from '@/components/buttons/standardButton';
import SearchBar from '@/components/inputs/searchBar';

import { useTheme } from '@/contexts/themeContext';
import { useUser } from '@/contexts/userContext';
import { useEquipment } from '@/contexts/equipmentContext';

import { Equipment } from '@/types/equipment';
import { Question } from '@/types/question';

import { getEquipment } from '@/utils/apis/getEquipment';
import { getQuestions } from '@/utils/apis/getQuestions';

export default function EquipmentPage() {
  const { theme } = useTheme();
  const { user } = useUser();
  const { equipment, setEquipment } = useEquipment();
  const [searchText, setSearchText] = useState('');

  const [newAnswers, setNewAnswers] = useState([]);

  const [questionsModalVisible, setQuestionsModalVisible] = useState(false);

  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

    useEffect(() => {
      if (user) {
        if (user.ID !== null) {
          getEquipment(user.ID).then(equips => {
            setEquipmentData(equips);
          }).catch(error => {
            console.error('Error fetching equipment:', error.message);
          });
        }
      }
    }, [user]);

  const [questionData, setQuestionData] = useState<Question[]>([]);

    useEffect(() => {
      if (selectedEquipment) {
        getQuestions(selectedEquipment.ID!).then(questions => {
          setQuestionData(questions);
          if(selectedEquipment) {
            setQuestionsModalVisible(true);
          }
        }).catch(error => {
          console.error('Error fetching users:', error.message);
        });
      }
    }, [selectedEquipment]);

  const handleSelectItem = (itm: any) => {
    setSelectedEquipment(itm);
  };


  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.secondaryColor }}>
      <BackgroundView>
        <Header title='Select Your Equipment' />
        <SearchBar
          initialValue={searchText}
          setSearchText={setSearchText}
          label='Search Equipment'
          icon={<Icon name="search" size={20} color={theme.primaryColor} />}
        />
        {questionsModalVisible && selectedEquipment ? (
          <QuestionsModal
            selectedEquipment={selectedEquipment}
            setSelectedEquipment={setSelectedEquipment}
            modalVisible={questionsModalVisible}
            setModalVisible={setQuestionsModalVisible}
            questions={questionData}
            newAnswers={newAnswers}
            setNewAnswers={setNewAnswers}
          />
        ) : null}
        {user ? (
          <ButtonList
            items={equipmentData}
            filter={''}
            onPress={handleSelectItem}
          >
            <StandardButton title='Cancel' bgColor={theme.dangerColor} onPress={() => router.push('./')}/>
          </ButtonList>
        ) : (
          <ScrollBGView>
            <Text style={{  textAlign: 'center', marginTop: 20 }}>
              No user selected. Please select a user first.
            </Text>
            <StandardButton title='Go Back' bgColor={theme.dangerColor} onPress={() => router.push('./')}/>
          </ScrollBGView>
        )}
      </BackgroundView>
    </SafeAreaView>
  );
};