import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Button, Image, View, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';

import { postImage } from '@/utils/apis/getObject'; // Import the postImage function

import { BackgroundView } from '@/components/views/backgroundView';
import StandardButton from '@/components/buttons/standardButton';

export default function Tasks() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanValue, setScanValue] = useState<string | null>(null);
  const { qrData } = useLocalSearchParams();

  useEffect(() => {
    if (qrData) {
      console.log('Received qrData:', qrData);
      if (typeof qrData === 'string') {
        setScanValue(qrData);
      } else {
        setScanValue('Invalid QR Code');
      }
    }
  }, [qrData]);

  const handleNavigateToHome = () => {
    router.replace("./");
  };

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
      base64: true, // Request base64 representation
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const imageData = result.assets[0].base64; // Get base64 data
      setSelectedImage(imageUri);
      let apiResult;
      if (imageData) {
        apiResult = await postImage(imageData); // Send base64 data
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
      base64: true, // Request base64 representation
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const imageData = result.assets[0].base64; // Get base64 data
      setSelectedImage(imageUri);
      let apiResult;
      if (imageData) {
        apiResult = await postImage(imageData); // Send base64 data
      } else {
        console.error('Image data is null or undefined');
      }
      console.log('API call result:', apiResult);
    }
  };

  const ScanQR = () => {
    router.replace("./qrScan");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackgroundView>
        <StandardButton
          title={scanValue ?? "Default Title"}
          onPress={handleNavigateToHome}
        />
        <StandardButton
          title="Pick an image from camera roll"
          onPress={pickImage}
        />
        <StandardButton
          title="Take a photo"
          onPress={takePhoto}
        />
        <StandardButton title="Scan QR Code" onPress={ScanQR} />
        {selectedImage && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
            <Text>{scanValue}</Text>
          </View>
        )}
      </BackgroundView>
    </SafeAreaView>
  );
}