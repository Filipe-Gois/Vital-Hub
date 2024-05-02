import { Theme } from "../../themes";
import CameraComponent from "../CameraComponent/CameraComponent";
import { Paragraph } from "../Paragraph/style";
import { Title } from "../Title/style";
import {
  AgeAndEmailBox,
  ButtonCamera,
  ContainerBannerUser,
  ImageProfileStyle,
  UserInfoBox,
} from "./style";

import { MaterialCommunityIcons } from "@expo/vector-icons";

// esse componente será responsável por exibir os dados do paciente ou do médico, alterar o boolean "isUser" para "false" para exibir os dados comn um médico

export const BannerUserComponent = ({
  src = "",
  isUser = true,
  name = "",
  age = "",
  isAge = true,
  email = "",
  specialty = "",
  crm = "",
  isProfile = false,
  showCamera,
  setShowCamera,
  showCameraInfo,
  setShowCameraInfo,
  setUriCameraCapture,
  uriCameraCapture,
}) => {
  return (
    <>
      <ContainerBannerUser>
        <ImageProfileStyle source={{ uri: src }} />

        <UserInfoBox>
          <Title>
            {!isUser && "Dr. "} {name}
          </Title>

          <AgeAndEmailBox>
            {isUser ? (
              isAge && <Paragraph>{age} anos</Paragraph>
            ) : (
              <Paragraph>{specialty}</Paragraph>
            )}

            <Paragraph>{isUser ? email : `CRM-${crm}`}</Paragraph>
          </AgeAndEmailBox>
        </UserInfoBox>

        {isProfile && (
          <ButtonCamera onPress={() => setShowCamera(true)}>
            <MaterialCommunityIcons
              name="camera-plus"
              size={20}
              color={Theme.colors.lightWhite}
            />
          </ButtonCamera>
        )}
      </ContainerBannerUser>

      {isProfile && (
        <CameraComponent
          getMediaLibrary={true}
          visible={showCamera}
          setUriCameraCapture={setUriCameraCapture}
          // setShowCameraModal={setCameraConfigs({
          //   ...cameraConfigs,
          //   showCameraModal,
          // })}
          setShowCameraModal={setShowCamera}
        />
      )}
    </>
  );
};
