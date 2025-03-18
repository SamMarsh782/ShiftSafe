import React, { useState, useRef } from 'react';
import { Text, Button, Image, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

import { reportIssue } from '@/utils/apis/reportIssue';

import BGScrollView from '@/components/views/scrollBGView';
import StandardButton from '@/components/buttons/standardButton';
import Header from '@/components/views/header';
import DescriptionBox from '@/components/inputs/descriptionBox';

import { useTheme } from '@/contexts/themeContext';

export default function Report() {
  const { theme } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [imageData, setImageData] = useState<string | null>(null);
  const descriptionBoxRef = useRef<{ getText: () => string }>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const imageData = result.assets[0].base64;
      setSelectedImage(imageUri);
      if (imageData) {
        setImageData(imageData);
      }
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const imageData = result.assets[0].base64;
      setSelectedImage(imageUri);
      if (imageData) {
        setImageData(imageData);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedImage && imageData) {
      const currentDescription = descriptionBoxRef.current?.getText() || '';
      reportIssue(imageData, currentDescription);
      setDescription('');
      setSelectedImage(null);
      setImageData(null);
      router.push('./');
    } else {
      Alert.alert('Please select an image before submitting');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.secondaryColor }}>
      <BGScrollView>
        <Header title="Report a Problem" />
        <StandardButton
          title="Pick an image from camera roll"
          onPress={pickImage}
          bgColor={theme.primaryColor}
        />
        <StandardButton
          title="Take a photo"
          onPress={takePhoto}
          bgColor={theme.primaryColor}
        />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
          ) : (
            null
          )}
        </View>
        {selectedImage && (
          <DescriptionBox ref={descriptionBoxRef} initialValue={description} onSubmit={setDescription} />
        )}
        <StandardButton
          title="Submit Report"
          onPress={handleSubmit}
          bgColor={theme.successColor}
        />
      </BGScrollView>
    </SafeAreaView>
  );
}