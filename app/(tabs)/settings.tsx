import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Field from '@/components/views/field';
import WideContainer from '@/components/views/wideContainer';
import ScrollBGViewComponent from '@/components/views/scrollBGView';
import RadioList from '@/components/pickers/radioList';
import BackgroundView from '@/components/views/backgroundView';
import Header from '@/components/views/header';

import { useTheme } from '@/contexts/themeContext';
import { useUser } from '@/contexts/userContext';
import { useEquipment } from '@/contexts/equipmentContext';

const Settings = () => {

  const { user } = useUser();
  const { equipment } = useEquipment();
  const { theme, toggleTheme, themeOption, setThemeOption } = useTheme();

  const SectionTitleText = styled(Text)`
    font-size: 24px;
    color: ${theme.primaryColor};
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: left;
  `;

  useEffect(() => {
    const loadThemeSetting = async () => {
      const savedThemeOption = await AsyncStorage.getItem('themeOption');
      if (savedThemeOption) {
        setThemeOption(savedThemeOption);
      }
    };
    loadThemeSetting();
  }, []);

  useEffect(() => {
    const saveThemeSetting = async () => {
      await AsyncStorage.setItem('themeOption', themeOption);
    };
    saveThemeSetting();

    if (themeOption === 'auto') {
      const hour = new Date().getHours();
      if (hour >= 18 || hour < 6) {
        if (theme.version !== 'dark') {
          toggleTheme();
        }
      } else if (theme.version !== 'light') {
        toggleTheme();
      }
    } else if (themeOption === 'light' && theme.version !== 'light') {
      toggleTheme();
    } else if (themeOption === 'dark' && theme.version !== 'dark') {
      toggleTheme();
    }
  }, [themeOption]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.secondaryColor }}>
      <BackgroundView>
        <ScrollBGViewComponent>
          <Header />
          <Image
            source={require('@/assets/images/settings-icon.png')}
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              marginTop: 50,
            }}
          />
          <SectionTitleText>Settings</SectionTitleText>
          <WideContainer>
            <SectionTitleText>Info</SectionTitleText>
            <Field label="User:" value={user?.Name ?? ''} />
            <Field
              label="Asset:"
              value={`${(equipment && equipment[0]?.Name) ?? ''} ${(equipment && equipment[0]?.Type) ?? ''}`}
            />
          </WideContainer>
          <WideContainer>
            <SectionTitleText>Theme</SectionTitleText>
            <RadioList
              items={[
                { label: 'Auto', value: 'auto' },
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
              ]}
              selectedValue={themeOption}
              setSelectedValue={setThemeOption}
            />
          </WideContainer>
        </ScrollBGViewComponent>
      </BackgroundView>
    </SafeAreaView>
  );
};

export default Settings;