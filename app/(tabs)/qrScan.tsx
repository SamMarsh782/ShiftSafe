import { CameraView } from "expo-camera";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { router } from 'expo-router';


export default function QRScan() {

    return (
        <SafeAreaView style={styleSheet.container}>

            {Platform.OS === "android" ? <StatusBar hidden /> : null}

            <CameraView
                style={styleSheet.camStyle}
                facing="back"
                barcodeScannerSettings={
                    {
                        barcodeTypes: ['qr'],
                    }
                }

                onBarcodeScanned={
                    ({ data }) => {
                        router.replace({
                            pathname: "./",
                            params: {qrData: data}
                        });
                    }
                }
            />

        </SafeAreaView>
    );

}

const styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 20
    },
    camStyle: {
        position: 'absolute',
        width: 300,
        height: 300
    }
});