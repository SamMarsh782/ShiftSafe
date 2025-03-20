import React, { useEffect, useState, useRef } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

import { getUsersByWarehouse } from '@/utils/apis/getUsersByWarehouse';

import Header from '@/components/views/header';
import CheckDigitModal from '@/components/modals/checkDigitModal';
import BackgroundView from '@/components/views/backgroundView';
import SearchBar from '@/components/inputs/searchBar';
import ButtonList from '@/components/buttons/buttonList';
import StandardButton from '@/components/buttons/standardButton';
import ScrollBGView from '@/components/views/scrollBGView';

import { User } from '@/types/user';

import { useTheme } from '@/contexts/themeContext';
import { useWarehouse } from '@/contexts/warehouseContext';

export default function Login() {
  const { theme } = useTheme();
  const { warehouse } = useWarehouse();

  const [searchText, setSearchText] = useState('');
  const [cdModalVisible, setCDModalVisible] = useState(false);
  const [checkDigits, setCheckDigits] = useState([0, 0, 0]);
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const generateCheckDigits = () => {
    const digits = [];
    for (let i = 0; i < 3; i++) {
      digits.push(Math.floor(Math.random() * 100));
    }
    setCheckDigits(digits);
  };

  useEffect(() => {
    if (warehouse && warehouse.ID !== null) {
      getUsersByWarehouse(warehouse.ID)
        .then((users) => {
          setUserData(users);
          setSelectedUser(users[0]);
        })
        .catch((error) => {
          console.error('Error fetching users:', error.message);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after data is fetched
        });
    } else {
      setLoading(false); // Stop loading if warehouse is not available
    }
    generateCheckDigits();
  }, []);

  const handleSelectItem = (itm: any) => {
    setCDModalVisible(true);
    setSelectedUser(itm);
  };

  if (loading) {
    // Show loading indicator while data is being fetched
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
        <Header title="Select User" />
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
        {userData && userData.length > 0 ? (
          <ButtonList
            items={userData}
            filter={searchText}
            onPress={handleSelectItem}
          >
            <StandardButton
              title="cancel"
              bgColor={theme.dangerColor}
              onPress={() => router.push('./')}
            />
          </ButtonList>
        ) : (
          <ScrollBGView>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                color: theme.inverseBlankSpace,
              }}
            >
              Something went wrong while loading warehouse or users. Please
              reload the app.
            </Text>
            <StandardButton
              title="Go Back"
              bgColor={theme.dangerColor}
              onPress={() => router.push('./')}
            />
          </ScrollBGView>
        )}
      </BackgroundView>
    </SafeAreaView>
  );
}