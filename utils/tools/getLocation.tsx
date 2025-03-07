/* Modules */
import {Alert} from 'react-native';
import * as Location from 'expo-location';

export async function getCurrentLocation() {
  let {status} = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission to access location was denied');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  return location;
}