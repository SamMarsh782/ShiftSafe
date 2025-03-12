import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import ScrollBGView from '@/components/views/scrollBGView';
import NavBar from '@/components/views/navBar';
import BackgroundView from '@/components/views/backgroundView';

import { useTheme } from '@/contexts/themeContext';
import StandardButton from '@/components/buttons/standardButton';

export default function Menu() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.secondaryColor }}>
      <BackgroundView>
        <NavBar title='Select A Task'/>
          <ScrollBGView>
            <StandardButton title='Complete Pretrip' onPress={() => router.push('./equipment')}/>
            <StandardButton title='Report Problem' onPress={() => router.push('./report')}/>
          </ScrollBGView>
      </BackgroundView>
    </SafeAreaView>
  );
}