import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getUsers } from '@/utils/apis/getUsers';

import ScrollBGView from '@/components/views/scrollBGView';
import ListButton from '@/components/buttons/listButton';
import Header from '@/components/views/header';
import CheckDigitModal from '@/components/modals/checkDigitModal';
import { User } from '@/types/user';
import BackgroundView from '@/components/views/backgroundView';

import { useTheme } from '@/contexts/themeContext';

export default function Login() {
  const { theme, toggleTheme } = useTheme();

  const [cdModalVisible, setCDModalVisible] = useState(false);

  const [checkDigits, setCheckDigits] = useState([0, 0, 0]);
  const generateCheckDigits = () => {
    const digits = [];
    for (let i = 0; i < 3; i++) {
      digits.push(Math.floor(Math.random() * 100));
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

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      if (theme.version !== 'dark') {
        toggleTheme();
      }
    } else if (theme.version !== 'light') {
      toggleTheme();
    }
  }, []);

  const handleSelectItem = (itm: any) => {
    setCDModalVisible(true);
    setSelectedUser(itm);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.secondaryColor }}>
      <BackgroundView>
        <Header title='Select User'/>
        {cdModalVisible && selectedUser ? (
          <CheckDigitModal
            user={selectedUser}
            modalVisible={cdModalVisible}
            setModalVisible={setCDModalVisible}
            randomDigits={checkDigits}
            generateRandomDigits={generateCheckDigits}
          />
        ) : null}
        <ScrollBGView>
          {userData
            .sort((a, b) => (a.First_Name ?? '').localeCompare(b.First_Name ?? ''))
            .map(user => (
              <ListButton
                key={user.ID}
                title={`${user.First_Name} ${user.Last_Name}`}
                onPress={() => handleSelectItem(user)}
              />
            ))}
        </ScrollBGView>
      </BackgroundView>
    </SafeAreaView>
  );
}