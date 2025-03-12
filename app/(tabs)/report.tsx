import React, { useState, useEffect } from 'react';
import { Text, Button, Image, View, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';

import { postImage } from '@/utils/apis/getObject';

import BGScrollView from '@/components/views/scrollBGView';
import StandardButton from '@/components/buttons/standardButton';
import NavBar from '@/components/views/navBar';

import { useTheme } from '@/contexts/themeContext';

export default function Report() {
  const { theme } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
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
      let apiResult;
      if (imageData) {
        apiResult = await postImage(imageData);
      } else {
        console.error('Image data is null or undefined');
      }
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
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
      let apiResult;
      if (imageData) {
        apiResult = await postImage(imageData);
      } else {
        console.error('Image data is null or undefined');
      }
      console.log('API call result:', apiResult);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.secondaryColor }}>
      <BGScrollView>
        <NavBar title="Report a Problem" />
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
            <Image source={require('@/assets/images/testIcon.png')} style={{ width: 200, height: 200 }} />
          )}
        </View>
      </BGScrollView>
    </SafeAreaView>
  );
}