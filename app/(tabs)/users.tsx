import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { getUsers } from '@/utils/apis/getUsers';

import Header from '@/components/views/header';
import CheckDigitModal from '@/components/modals/checkDigitModal';
import { User } from '@/types/user';
import BackgroundView from '@/components/views/backgroundView';
import SearchBar from '@/components/inputs/searchBar';
import ButtonList from '@/components/buttons/buttonList';

import { useTheme } from '@/contexts/themeContext';

export default function Login() {
  const { theme, toggleTheme } = useTheme();

  const [searchText, setSearchText] = useState('');
  const [cdModalVisible, setCDModalVisible] = useState(false);
  const [checkDigits, setCheckDigits] = useState([0, 0, 0]);
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const generateCheckDigits = () => {
    const digits = [];
    for (let i = 0; i < 3; i++) {
      digits.push(Math.floor(Math.random() * 100));
    }
    setCheckDigits(digits);
  };

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
        <SearchBar
          initialValue={searchText}
          setSearchText={setSearchText}
          label="Search"
          icon={<Icon name="search" size={20} color={theme.primaryColor} />}
        />
        {cdModalVisible && selectedUser ? (
          <CheckDigitModal
            user={selectedUser}
            modalVisible={cdModalVisible}
            setModalVisible={setCDModalVisible}
            randomDigits={checkDigits}
            generateRandomDigits={generateCheckDigits}
          />
        ) : null}
        <ButtonList
          items={userData}
          filter={searchText}
          onPress={handleSelectItem}
        />
      </BackgroundView>
    </SafeAreaView>
  );
}