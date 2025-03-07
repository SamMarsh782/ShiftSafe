import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, BackHandler } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { getObject } from '@/utils/apis/getObject';

import { RootStackParamList } from '@/types/rootStackParamList';

import { ScrollBGView } from '@/components/views/scrollBGView';
import { WideContainer } from '@/components/views/wideContainer';
import ListButton from '@/components/buttons/listButton';
import { NavBar } from '@/components/views/navBar';
import CheckDigitModal from '@/components/modals/checkDigitModal';
import StandardButton from '@/components/buttons/standardButton';

export default function HomeScreen() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const navigateToPage = (page: keyof RootStackParamList) => {
    navigation.navigate(page);
  };

  const [cdModalVisible, setCDModalVisible] = useState(false);

  const [checkDigits, setCheckDigits] = useState([0, 0, 0,]);
  const generateCheckDigits = () => {
    const digits = [];
    for (let i = 0; i < 3; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }
    setCheckDigits(digits);
  };

  useEffect(() => {
    generateCheckDigits();
  }, []);

  const [userData, setUserData] = useState([
    {
      "ID": 11111,
      "User": "Sam Marshall",
      "Check_Digit": 55
    },
    {
      "ID": 22222,
      "User": "Matt Lovell",
      "Check_Digit": 44
    },
    {
      "ID": 33333,
      "User": "Dave Eichler",
      "Check_Digit": 33
    },
    {
      "ID": 44444,
      "User": "Jake Thompson",
      "Check_Digit": 22
    },
    {
      "ID": 55555,
      "User": "Brandon Stanley",
      "Check_Digit": 11
    }
  ]);

  const handleSelectItem = (itm: any) => {
    setCDModalVisible(true);
    setSelectedUser(itm);
  };

  const [selectedUser, setSelectedUser] = useState(userData[0]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  /*useEffect(() => {
    getObject()
      .then(data => {
        if (data) {
          setJsonData(data);
        } else {
          console.error('Received null data');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
  }, []);*/

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavBar>
      <StandardButton
          title="Back"
          onPress={() => BackHandler.exitApp()}
        >
        </StandardButton>
      </NavBar>
      {cdModalVisible ? (
        <CheckDigitModal
          user={selectedUser}
          modalVisible={cdModalVisible}
          setModalVisible={setCDModalVisible}
          randomDigits={checkDigits}
          generateRandomDigits={generateCheckDigits}
          navigateToPage={navigateToPage}
        />
      ) : null}
        <ScrollBGView>
          {userData
            .sort((a, b) => a.User.localeCompare(b.User))
            .map(user => (
              <ListButton
                key={user.ID}
                title={`${user.User}`}
                onPress={() => handleSelectItem(user)}
              />
            ))}
        </ScrollBGView>
    </SafeAreaView>
  );
};