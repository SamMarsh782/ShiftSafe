import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  
  
  useEffect(() => {
    if (deviceName) {
      getDevice(deviceName).then(device => {
        if (device.Owner) {
          getUserByID(device.Owner).then(user => {
            setUser(user);
          });
        } else {
          router.replace({
            pathname: "./users",
          });
        }
        if (device.Mount) {
          getEquipByID(device.Mount).then(equip => {
            setEquipment(equip);
          });
        }
        if (device.Warehouse) {
          getWarehouseByID(device.Warehouse).then(warehouse => {
            setWarehouse(warehouse);
          });
        }
      });
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.secondaryColor }}>
      <BackgroundView>
        <Header title='Select A Task'/>
          <ScrollBGView>
            <StandardButton title='Change User' onPress={() => router.push('./users')}/>
            <StandardButton title='Complete Pretrip' onPress={() => router.push('./equipment')}/>
            <StandardButton title='Report Problem' onPress={() => router.push('./report')}/>
          </ScrollBGView>
      </BackgroundView>
    </SafeAreaView>
  );
}