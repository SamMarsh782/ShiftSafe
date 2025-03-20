import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, Text, View } from 'react-native';
import { router } from 'expo-router';
import * as Device from 'expo-device';

import ScrollBGView from '@/components/views/scrollBGView';
import Header from '@/components/views/header';
import BackgroundView from '@/components/views/backgroundView';
import StandardButton from '@/components/buttons/standardButton';

import { useTheme } from '@/contexts/themeContext';
import { useUser } from '@/contexts/userContext';
import { useEquipment } from '@/contexts/equipmentContext';

import { getDevice } from '@/utils/apis/getDevice';
import { getUserByID } from '@/utils/apis/getUserByID';
import { getEquipByID } from '@/utils/apis/getEquipByID';
import { getWarehouseByID } from '@/utils/apis/getWarehouseByID';
import { useWarehouse } from '@/contexts/warehouseContext';

export default function Menu() {
  const { theme } = useTheme();
  const { user, setUser } = useUser();
  const { equipment, setEquipment } = useEquipment();
  const { warehouse, setWarehouse } = useWarehouse();
  const [deviceName] = useState<string | null>(Device.deviceName);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (deviceName) {
      getDevice(deviceName)
        .then((device) => {
          const promises = [];

          if (device.Owner) {
            promises.push(
              getUserByID(device.Owner).then((user) => {
                setUser(user);
              })
            );
          } else {
            router.replace({
              pathname: './users',
            });
          }

          if (device.Mount) {
            promises.push(
              getEquipByID(device.Mount).then((equip) => {
                setEquipment([...(equipment || []), equip]);
              })
            );
          }

          if (device.Warehouse) {
            promises.push(
              getWarehouseByID(device.Warehouse).then((warehouse) => {
                setWarehouse(warehouse);
              })
            );
          }

          Promise.all(promises).finally(() => {
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error('Error fetching device data:', error);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.secondaryColor, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.primaryColor} />
        <Text style={{ marginTop: 10, color: theme.inverseBlankSpace }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.secondaryColor }}>
      <BackgroundView>
        <Header title="Select A Task" />
        <ScrollBGView>
          <StandardButton title="Change User" onPress={() => router.push('./users')} />
          <StandardButton title="Complete Pretrip" onPress={() => router.push('./equipment')} />
          <StandardButton title="Report Problem" onPress={() => router.push('./report')} />
        </ScrollBGView>
      </BackgroundView>
    </SafeAreaView>
  );
}