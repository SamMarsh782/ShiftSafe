import { CameraView } from "expo-camera";
import { Platform, StatusBar, View, Modal, Text } from "react-native";
import { styled } from "styled-components";

import { useTheme } from "@/contexts/themeContext";

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  onScan?: (data: string) => void;
};

const QRModal = ({
  modalVisible,
  setModalVisible,
  onScan,
}: ModalProps) => {
  const { theme } = useTheme();

  const ModalTitle = styled(Text)`
    font-size: 20px;
    text-align: center;
    color: ${theme.inverseBlankSpace};
  `;

  const CenteredView = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  `;

  const ModalView = styled(View)`
    background-color: ${theme.blankSpace};
    border-radius: 20px;
    padding: 20px;
    align-items: center;
    justify-content: center;
    height: 75%;
    width: 90%;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 5;
  `;

  const StyledCamera = styled(CameraView)`
    width: 90%;
    height: 60%;
    border-radius: 10px;
    overflow: hidden;
  `;

  const handleQRScan = (data: string) => {
    setModalVisible(false);
    if (onScan) {
      onScan(data);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <CenteredView>
        <ModalView>
          <ModalTitle>Scan QR Code</ModalTitle>
          {Platform.OS === "android" ? <StatusBar hidden /> : null}
          <StyledCamera
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={(event) => {
              console.log("Scanned QR Code:", event.data);
              handleQRScan(event.data);
            }}
          />
        </ModalView>
      </CenteredView>
    </Modal>
  );
};

export default QRModal;