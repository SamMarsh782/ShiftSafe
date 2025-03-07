import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SafeAreaView, Text, Button, Image, View, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { RootStackParamList } from '@/types/rootStackParamList';

import { BackgroundView } from '@/components/views/backgroundView';
import StandardButton from '@/components/buttons/standardButton';

export default function Tasks() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleNavigateToHome = () => {
    navigation.navigate('index');
  };

  const pickImage = async () => {
    // Ask for permission to access the camera roll
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
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
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackgroundView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >

        <Button title="Close" onPress={() => setModalVisible(false)} />
      </Modal>
        <StandardButton
          title="Go to Home"
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
        <StandardButton title="Scan QR Code" onPress={() => setModalVisible(true)} />
        {selectedImage && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
          </View>
        )}
      </BackgroundView>
    </SafeAreaView>
  );
}