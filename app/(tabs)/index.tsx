import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Device from 'expo-device';
import { router } from 'expo-router';

import { getUsers } from '@/utils/apis/getUsers';
import { getDeviceUser } from '@/utils/apis/getDeviceUser';

import ScrollBGView from '@/components/views/scrollBGView';
import ListButton from '@/components/buttons/listButton';
import NavBar from '@/components/views/navBar';
import CheckDigitModal from '@/components/modals/checkDigitModal';
import { User } from '@/types/user';
import BackgroundView from '@/components/views/backgroundView';

import { useTheme } from '@/contexts/themeContext';
import { setParams } from 'expo-router/build/global-state/routing';

export default function Login() {
  const { theme } = useTheme();
  const [deviceName, setDeviceName] = useState<string | null>(Device.deviceName);
  useEffect(() => {
    if (deviceName) {
      getDeviceUser(deviceName).then(user => {
        if (user) {
          router.replace({
            pathname: "./equipment",
            params: {userId: user}
          });
        }
      });
    }
  }, []);

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

  const handleSelectItem = (itm: any) => {
    setCDModalVisible(true);
    setSelectedUser(itm);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.secondaryColor }}>
      <BackgroundView>
        <NavBar title='Select User'/>
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
            .sort((a, b) => a.User.localeCompare(b.User))
            .map(user => (
              <ListButton
                key={user.ID}
                title={`${user.User}`}
                onPress={() => handleSelectItem(user)}
              />
            ))}
        </ScrollBGView>
      </BackgroundView>
    </SafeAreaView>
  );
}