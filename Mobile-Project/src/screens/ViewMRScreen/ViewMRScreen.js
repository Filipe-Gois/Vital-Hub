import React, { useEffect, useState } from "react";
import {
  ButtonBox,
  Container,
  FormBox,
  Line,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import DoctorImage from "../../assets/DoctorBanner.png";
import { BannerUserComponent } from "../../components/BannerUser";
import Label from "../../components/Label";
import { Theme } from "../../themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ButtonSecondary } from "../../components/Button/style";
import {
  ParagraphMA500,
  TextCreateAccount2,
} from "../../components/Paragraph/style";
import { ButtonAqua, ButtonAsync } from "../../components/Button";
import CameraComponent from "../../components/CameraComponent/CameraComponent";
import { userDecodeToken } from "../../Utils/Auth";
import { TextInput } from "react-native";
import { apiFilipe, examesResource } from "../../Services/Service";

const ViewMRScreen = ({ navigation, route }) => {
  const [cameraConfigs, setCameraConfigs] = useState({
    showCameraModal: false,
    uriCameraCapture: "",
  });

  const [userGlobalData, setUserGlobalData] = useState({});
  const [showCamera, setShowCamera] = useState(false);
  const [uriCamera, setUriCamera] = useState();
  const [editUserInfo, setEditUserInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const [prontuario, setProntuario] = useState(null);

  //pega as propriedades do token
  const fetchProfileData = async () => {
    const userInfo = await userDecodeToken();

    if (userInfo) {
      setUserGlobalData(userInfo);
    }
  };

  const removePicture = () => {};

  const handleUpdate = async () => {
    try {
      const response = await apiFilipe.put(examesResource, {
        descricao: "",
        consultaId: prontuario.consulta.idConsulta,
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  const showUpdateForm = () => {
    setEditUserInfo(true);
  };

  const editActionAbort = () => {
    setEditUserInfo(false);
  };

  useEffect(() => {
    fetchProfileData();

    if (!prontuario) {
      setProntuario(route.params);
    }
    console.log(route.params);

    return (cleanUp = () => {});
  }, [route.params]);
  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <BannerUserComponent
            src={DoctorImage}
            name={prontuario ? prontuario.consulta.nome : ""}
            isUser={userGlobalData.role !== "Paciente"}
            specialty={
              prontuario ? prontuario.consulta.medico.especialidade : ""
            }
            crm={prontuario ? prontuario.consulta.medico.crm : ""}
            age={prontuario ? prontuario.consulta.paciente.idade : ""}
            email={prontuario ? prontuario.consulta.paciente.email : ""}
          />

          <FormBox>
            <Label
              autoCorrect={false}
              pointerEvents={
                !editUserInfo || userGlobalData.role === "Paciente"
                  ? "none"
                  : "auto"
              }
              textColor={
                userGlobalData.role !== "Paciente" && editUserInfo
                  ? Theme.colors.primary
                  : Theme.colors.grayV1
              }
              border={
                userGlobalData.role !== "Paciente" && editUserInfo
                  ? Theme.colors.primary
                  : "none"
              }
              backGround={
                userGlobalData.role !== "Paciente" && editUserInfo
                  ? Theme.colors.whiteColor
                  : Theme.colors.v2LightWhite
              }
              placeholderTextColor={Theme.colors.grayV2}
              titulo="Descrição da consulta"
              fieldValue={prontuario ? prontuario.consulta.descricao : ""}
              placeholder={"Descrição da consulta"}
              fieldHeight={121}
            />
            <Label
              autoCorrect={false}
              pointerEvents={
                !editUserInfo || userGlobalData.role === "Paciente"
                  ? "none"
                  : "auto"
              }
              textColor={
                userGlobalData.role !== "Paciente" && editUserInfo
                  ? Theme.colors.primary
                  : Theme.colors.grayV1
              }
              border={
                userGlobalData.role !== "Paciente" && editUserInfo
                  ? Theme.colors.primary
                  : "none"
              }
              backGround={
                userGlobalData.role !== "Paciente" && editUserInfo
                  ? Theme.colors.whiteColor
                  : Theme.colors.v2LightWhite
              }
              placeholderTextColor={Theme.colors.grayV2}
              titulo="Diagnóstico do paciente"
              fieldValue={prontuario ? prontuario.consulta.diagnostico : ""}
              placeholder={"Diagnóstico"}
            />
            <Label
              autoCorrect={false}
              pointerEvents={
                !editUserInfo || userGlobalData.role === "Paciente"
                  ? "none"
                  : "auto"
              }
              textColor={
                userGlobalData.role !== "Paciente" && editUserInfo
                  ? Theme.colors.primary
                  : Theme.colors.grayV1
              }
              border={
                userGlobalData.role !== "Paciente" && editUserInfo
                  ? Theme.colors.primary
                  : "none"
              }
              backGround={
                userGlobalData.role !== "Paciente" && editUserInfo
                  ? Theme.colors.whiteColor
                  : Theme.colors.v2LightWhite
              }
              placeholderTextColor={Theme.colors.grayV2}
              titulo="Prescrição médica"
              //   fieldValue={
              //     "Medicamento: Advil Dosagem: 50 mg Frequência: 3 vezes ao dia Duração: 3 dias"
              //   }
              placeholder={"Prescrição médica"}
              fieldHeight={121}
            />
            {userGlobalData.role === "Paciente" ? (
              <>
                <Label
                  textColor={Theme.colors.grayV2}
                  border={"none"}
                  backGround={Theme.colors.v2LightWhite}
                  placeholderTextColor={Theme.colors.grayV2}
                  titulo="Exames médicos"
                  //   fieldValue={
                  //     "Medicamento: Advil Dosagem: 50 mg Frequência: 3 vezes ao dia Duração: 3 dias"
                  //   }
                  placeholder={"Nenhuma foto informada"}
                  fieldHeight={"100%"}
                  fieldMinHeight={"111px"}
                  fieldTextAlign={"center"}
                />

                <ButtonBox
                  fieldFlexDirection={"row"}
                  fieldJustifyContent={"space-around"}
                >
                  <ButtonAqua
                    // onPress={() => {
                    //   setCameraConfigs({ ...cameraConfigs, showCameraModal: true });
                    //   console.log(cameraConfigs.showCameraModal);
                    // }}
                    onPress={() => setShowCamera(true)}
                  />

                  <ButtonSecondary fieldWidth={"50%"} onPress={removePicture}>
                    <ParagraphMA500 color={Theme.colors.red}>
                      {userGlobalData.role === "Paciente"
                        ? "Voltar"
                        : "Cancelar"}
                    </ParagraphMA500>
                  </ButtonSecondary>
                </ButtonBox>
                <Line />
                <Label
                  pointerEvents={"none"}
                  textColor={Theme.colors.grayV2}
                  border={"none"}
                  backGround={Theme.colors.v2LightWhite}
                  placeholderTextColor={Theme.colors.grayV2}
                  //   titulo="Exames médicos"
                  //   fieldValue={
                  //     "Medicamento: Advil Dosagem: 50 mg Frequência: 3 vezes ao dia Duração: 3 dias"
                  //   }
                  placeholder={"Resultado do exame de sangue : tudo normal"}
                  fieldHeight={103}
                  isTitulo={false}
                />
              </>
            ) : (
              <>
                {editUserInfo && (
                  <ButtonAsync
                    loading={loading}
                    disabled={loading}
                    textButton={"Salvar"}
                    onPress={() => handleUpdate()}
                  />
                )}

                <ButtonAsync
                  onPress={() =>
                    !editUserInfo ? showUpdateForm() : editActionAbort()
                  }
                  textButton={editUserInfo ? "Cancelar" : "Editar"}
                  loading={false}
                />
              </>
            )}
            <ButtonSecondary onPress={() => navigation.goBack()}>
              <TextCreateAccount2>Voltar</TextCreateAccount2>
            </ButtonSecondary>
          </FormBox>
        </MainContent>

        <CameraComponent
          visible={showCamera}
          // setShowCameraModal={setCameraConfigs({
          //   ...cameraConfigs,
          //   showCameraModal,
          // })}
          setShowCameraModal={setShowCamera}
        />
      </MainContentScroll>
    </Container>
  );
};

export default ViewMRScreen;
