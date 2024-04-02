// import da camera
import { Camera, requestCameraPermissionsAsync, CameraType } from "expo-camera";

import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";

// import style
import {
  CameraFlip,
  CameraComponentStyle,
  CameraModalContent,
  CameraModalStyle,
  CameraView,
  CameraTypeSwitchButton,
  CameraTypeSwitchText,
  CapturePhotoButton,
  CloseCameraButton,
} from "./style";

// import do modal
import { Modal } from "react-native";

// import do react
import { useEffect, useRef, useState } from "react";
import { Theme } from "../../themes";
import { LeftArrowAOrXCameraComponent } from "../LeftArrowAOrX";

const CameraComponent = ({
  visible,
  setShowCameraModal,
  setUriCameraCapture,
  navigation,
}) => {
  const [photo, setPhoto] = useState();
  const cameraReference = useRef(null);
  const [tipoCamera, setTipoCamera] = useState(CameraType.front);
  const [openModal, setOpenModal] = useState(false);

  const SendPhotoForm = async () => {
    await setUriCameraCapture(photo);
    HandleClose();
  };
  const HandleClose = () => setShowCameraModal(false);

  const CapturePhoto = async () => {
    if (cameraReference) {
      const photo = await cameraReference.current.takePictureAsync();
      setPhoto(photo.uri);
      setOpenModal(openModal);

      console.log(photo);
    }
  };

  useEffect(() => {
    async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
    };

    return (cleanUp = () => {});
  }, [visible]);

  return (
    <CameraModalStyle visible={visible}>
      <CameraModalContent>
        <CameraComponentStyle
          ref={cameraReference}
          ratio="16:9"
          type={tipoCamera}
        >
          <CameraFlip>
            {/* <CloseCameraButton> */}
            <LeftArrowAOrXCameraComponent
              navigation={navigation}
              isLefArrow={false}
              onPress={() => HandleClose()}
            />
            {/* </CloseCameraButton> */}

            <CapturePhotoButton onPress={() => CapturePhoto()}>
              <FontAwesome
                name="camera"
                size={23}
                color={Theme.colors.primary}
              />
            </CapturePhotoButton>

            <CameraTypeSwitchButton
              onPress={() =>
                setTipoCamera(
                  tipoCamera === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                )
              }
            >
              <FontAwesome6
                name="arrows-rotate"
                size={23}
                color={Theme.colors.whiteColor}
              />
            </CameraTypeSwitchButton>
          </CameraFlip>
        </CameraComponentStyle>
      </CameraModalContent>
    </CameraModalStyle>
  );
};

export default CameraComponent;
