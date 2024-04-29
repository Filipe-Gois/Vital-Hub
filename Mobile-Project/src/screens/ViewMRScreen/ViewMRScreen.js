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
import { Alert, TextInput } from "react-native";
import {
  apiFilipe,
  consultasResource,
  examesResource,
} from "../../Services/Service";

const ViewMRScreen = ({ navigation, route }) => {
  //Dados do usuário
  const [userGlobalData, setUserGlobalData] = useState({});

  //Prontuário
  const [prontuario, setProntuario] = useState(null);
  const [diagnostico, setDiagnostico] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prescricao, setPrescricao] = useState("");

  //Propriedades da página
  const [showCamera, setShowCamera] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uriCameraCapture, setUriCameraCapture] = useState(null);

  //pega as propriedades do token
  const fetchProfileData = async () => {
    const userInfo = await userDecodeToken();

    if (userInfo) {
      setUserGlobalData(userInfo);
    }
  };

  const removePicture = () => {};

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await apiFilipe.put(
        examesResource +
          `/AtualizarProntuario?idConsulta=${prontuario.consulta.idConsulta}`,
        {
          descricao,
          diagnostico,
          prescricao,
        }
      );

      if (response.status === 204) {
        Alert.alert("Sucesso", "Prontuário atualizado!");
        getConsulta();
      }
    } catch (error) {
      console.log(error);
    }
    setEditUserInfo(false);
    setLoading(false);
  };

  const showUpdateForm = () => {
    setEditUserInfo(true);
  };

  const editActionAbort = () => {
    setEditUserInfo(false);
  };

  const inserirExame = async () => {
    const formData = new FormData();

    formData.append("ConsultaId", prontuario.consulta.idConsulta);
    formData.append("Imagem", {
      uri: uriCameraCapture,
      name: `image.${uriCameraCapture.split(".")[1].pop()}`,
      type: `image/${uriCameraCapture.split(".")[1].pop()}`,
    });
    try {
      const response = await apiFilipe.post(
        `${examesResource}/Cadastrar` + formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrescricao(descricao + "\n" + response.data.descricao);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getConsulta = async () => {
    try {
      const response = await apiFilipe.get(
        consultasResource + `/BuscarPorId?id=${prontuario.consulta.idConsulta}`
      );

      console.log(response.data);

      setDescricao(response.data.descricao);
      setDiagnostico(response.data.diagnostico);
      setPrescricao(response.data.receita.medicamento);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfileData();

    if (!prontuario || !diagnostico || !descricao) {
      setProntuario(route.params);
      setDiagnostico(route.params.consulta.diagnostico);
      setDescricao(route.params.consulta.descricao);
      setPrescricao(route.params.consulta.prescricao);
    }

    return (cleanUp = () => {});
  }, [route.params]);
  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <BannerUserComponent
            src={prontuario ? prontuario.consulta.foto : null}
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
              fieldValue={descricao}
              onChangeText={(txt) => setDescricao(txt)}
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
              fieldValue={diagnostico}
              onChangeText={(txt) => setDiagnostico(txt)}
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
              onChangeText={(txt) => setPrescricao(txt)}
              fieldValue={prescricao}
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
          getMediaLibrary={true}
          visible={showCamera}
          // setShowCameraModal={setCameraConfigs({
          //   ...cameraConfigs,
          //   showCameraModal,
          // })}
          setUriCameraCapture={setUriCameraCapture}
          setShowCameraModal={setShowCamera}
        />
      </MainContentScroll>
    </Container>
  );
};

export default ViewMRScreen;
