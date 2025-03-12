import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, BackHandler } from 'react-native';
import { router } from 'expo-router';

import { postImage } from '@/utils/apis/getObject';
import { getUsers } from '@/utils/apis/getUsers';

import { RootStackParamList } from '@/types/rootStackParamList';

import ScrollBGView from '@/components/views/scrollBGView';
import WideContainer from '@/components/views/wideContainer';
import ListButton from '@/components/buttons/listButton';
import NavBar from '@/components/views/navBar';
import CheckDigitModal from '@/components/modals/checkDigitModal';
import StandardButton from '@/components/buttons/standardButton';
import { User } from '@/types/user';

export default function Login() {
  
  const navigateToEquipment = () => {
    router.replace(`/equipment`);
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

  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers().then(users => {
      setUserData(users);
      setSelectedUser(users[0]);
    }).catch(error => {
      console.error('Error fetching users:', error.message);
    });
    generateCheckDigits();
  }, []);

  const handleSelectItem = (itm: any) => {
    setCDModalVisible(true);
    setSelectedUser(itm);
  };


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
      {cdModalVisible && selectedUser ? (
        <CheckDigitModal
          user={selectedUser}
          modalVisible={cdModalVisible}
          setModalVisible={setCDModalVisible}
          randomDigits={checkDigits}
          generateRandomDigits={generateCheckDigits}
          navigateToPage={navigateToEquipment}
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