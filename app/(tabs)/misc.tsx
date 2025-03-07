import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image } from 'react-native';
import * as Device from 'expo-device';

import { Field } from '@/components/views/field';
import { WideContainer } from '@/components/views/wideContainer';
import { ScrollBGView } from '@/components/views/scrollBGView';
import StandardButton from '@/components/buttons/standardButton';
import { getCurrentLocation } from '@/utils/tools/getLocation';
import { LocationObject } from 'expo-location';

export default function Tasks() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [deviceType, setDeviceType] = useState<string | null>(null);
  const [deviceModel, setDeviceModel] = useState<string | null>(null);

  const getLocation = async () => {
    const location = await getCurrentLocation();
    if (location !== undefined && location !== null) {
      setLocation(location);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    setTime(currentTime);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const currentDate = now.toLocaleDateString();
    setDate(currentDate);
  };

  const getDeviceInfo = () => {
    setDeviceId(Device.osBuildId ?? 'n/a');
    setDeviceName(Device.deviceName ?? 'n/a');
    setDeviceType(Device.modelName ?? 'n/a');
    setDeviceModel(Device.modelId ?? 'n/a');
  };

  useEffect(() => {
    getCurrentTime();
    getCurrentDate();
    getDeviceInfo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollBGView>
        <WideContainer>
          <Field label="Location:" value={location ? JSON.stringify(location) : 'n/a'} />
          <Field label="Time:" value={time ?? 'n/a'} />
          <Field label="Date:" value={date ?? 'n/a'} />
          <Field label="Device ID:" value={deviceId ?? 'n/a'} />
          <Field label="Device Name:" value={deviceName ?? 'n/a'} />
          <Field label="Device Type:" value={deviceType ?? 'n/a'} />
          <Field label="Device Model:" value={deviceModel ?? 'n/a'} />
        </WideContainer>
        <StandardButton title="Get Location" onPress={() => getLocation()} />
        <StandardButton title="Get Current Time" onPress={() => getCurrentTime()} />
        <StandardButton title="Get Current Date" onPress={() => getCurrentDate()} />
        <StandardButton title="Get Device Info" onPress={() => getDeviceInfo()} />
      </ScrollBGView>
    </SafeAreaView>
  );
}