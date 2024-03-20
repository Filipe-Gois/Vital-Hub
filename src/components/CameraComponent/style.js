import styled from "styled-components";
// import da camera
import { Camera } from "expo-camera";
import { Theme } from "../../themes";

export const CameraStyle = styled.View`
  flex: 1;
`;

export const CameraModalStyle = styled.Modal`
  flex: 1;
`;

export const CameraModalContent = styled.View`
  flex: 1;
`;

export const CameraComponentStyle = styled(Camera)`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const CameraFlip = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  /* background-color: red; */
  margin: 0 0 50px 0;
`;

export const CameraTypeSwitchButton = styled.TouchableOpacity`
  padding: 20px;
`;

export const CameraTypeSwitchText = styled.Text`
  font-size: 20px;
  color: ${Theme.colors.whiteColor};
  margin-bottom: 20px;
`;

export const CapturePhotoButton = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${Theme.colors.whiteColor};
  justify-content: center;
  align-items: center;
`;

export const CloseCameraButton = styled.TouchableOpacity``;
