import React, { useEffect, useState } from 'react';
import { Text, BackHandler, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import ScrollBGView from '@/components/views/scrollBGView';
import ButtonList from '@/components/buttons/buttonList';
import Header from '@/components/views/header';
import BackgroundView from '@/components/views/backgroundView';
import StandardButton from '@/components/buttons/standardButton';
import SearchBar from '@/components/inputs/searchBar';

import { useTheme } from '@/contexts/themeContext';
import { useUser } from '@/contexts/userContext';
import { useEquipment } from '@/contexts/equipmentContext';
import { useWarehouse } from '@/contexts/warehouseContext';

import { Equipment } from '@/types/equipment';
import { Question } from '@/types/question';

import { getEquipment } from '@/utils/apis/getEquipment';
import { getQuestions } from '@/utils/apis/getQuestions';

export default function EquipmentPage() {
  const { theme } = useTheme();
  const { user } = useUser();
  const { equipment, setEquipment } = useEquipment();
  const { warehouse } = useWarehouse();
  const [searchText, setSearchText] = useState('');
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.ID !== null) {
      if (warehouse && warehouse.ID !== null) {
        getEquipment(user.ID, warehouse.ID)
          .then((equips) => {
            setEquipmentData(equips);
          })
          .catch((error) => {
            console.error('Error fetching equipment:', error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user, warehouse]);

  const handleSelectItem = (itm: any) => {
    setEquipment([...(equipment || []), itm]);
    router.push('./pretrip');
  };

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
        <Header title="Select Your Equipment" />
        <SearchBar
          initialValue={searchText}
          setSearchText={setSearchText}
          label="Search Equipment"
          icon={<Icon name="search" size={20} color={theme.primaryColor} />}
        />
        {user ? (
          equipmentData && equipmentData.length > 0 ? (
            <ButtonList
              items={equipmentData}
              filter={searchText}
              onPress={handleSelectItem}
            >
              <StandardButton
                title="Cancel"
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
                No equipment found. Please add equipment to your profile.
              </Text>
              <StandardButton
                title="Go Back"
                bgColor={theme.dangerColor}
                onPress={() => router.push('./')}
              />
            </ScrollBGView>
          )
        ) : (
          <ScrollBGView>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                color: theme.inverseBlankSpace,
              }}
            >
              No user selected. Please select a user first.
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