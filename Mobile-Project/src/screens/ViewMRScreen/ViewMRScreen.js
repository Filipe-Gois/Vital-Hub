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
  const [exameExists, setExameExists] = useState(false);
  const [exameDescicao, setExameDescicao] = useState("");
  const [exameFoto, setExameFoto] = useState(null);

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

  const removePicture = () => {
    setUriCameraCapture(null);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await apiFilipe.put(
        consultasResource +
          `/EditarProntuario?idConsulta=${prontuario.consulta.idConsulta}`,
        {
          descricao,
          diagnostico,
          medicamento: prescricao,
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
    setLoading(true);
    const formData = new FormData();

    if (!uriCameraCapture) {
      Alert.alert("Erro", "Nenhuma imagem selecionada!");
      setLoading(false);
      return;
    }

    formData.append("ConsultaId", prontuario.consulta.idConsulta);
    formData.append("Imagem", {
      uri: uriCameraCapture,
      name: `image.${uriCameraCapture.split(".").pop()}`,
      type: `image/${uriCameraCapture.split(".").pop()}`,
    });
    try {
      const response = await apiFilipe.post(
        `${examesResource}/Cadastrar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setProntuario({ ...prontuario, exame: response.data.descricao });
        setExameDescicao(response.data.descricao);
        setExameExists(true);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const atualizarExame = async () => {
    setLoading(true);
    const formData = new FormData();

    if (!uriCameraCapture) {
      Alert.alert("Erro", "Nenhuma imagem selecionada!");
      setLoading(false);

      return;
    }

    formData.append("ConsultaId", prontuario.consulta.idConsulta);
    formData.append("Imagem", {
      uri: uriCameraCapture,
      name: `image.${uriCameraCapture.split(".").pop()}`,
      type: `image/${uriCameraCapture.split(".").pop()}`,
    });
    try {
      const response = await apiFilipe.put(
        `${examesResource}/AtualizarExame`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Atualizado");
        setExameDescicao(response.data.descricao);
      }
    } catch (error) {}
    setLoading(false);
  };

  const getConsulta = async () => {
    try {
      const response = await apiFilipe.get(
        consultasResource + `/BuscarPorId?id=${prontuario.consulta.idConsulta}`
      );

      setDescricao(response.data.descricao);
      setDiagnostico(response.data.diagnostico);
      setPrescricao(response.data.receita.medicamento);
    } catch (error) {}
  };

  const getExame = async () => {
    try {
      const respose = await apiFilipe.get(
        `${examesResource}/BuscarPorIdConsulta?idConsulta=${route.params.consulta.idConsulta}`
      );

      if (respose.status === 200 && respose.data.descricao) {
        setExameExists(true);
        setExameDescicao(respose.data.descricao);
        setExameFoto(respose.data.fotoExame);
      } else {
        setExameExists(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchProfileData();
    getExame();

    if (!prontuario || !diagnostico || !descricao) {
      setProntuario(route.params);
      setDiagnostico(route.params.consulta.diagnostico);
      setDescricao(route.params.consulta.descricao);
      setPrescricao(route.params.consulta.prescricao);
    }

    console.log("uriCameraCapture123", uriCameraCapture);

    return (cleanUp = () => {});
  }, [route.params, uriCameraCapture, exameDescicao, exameFoto]);
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
            {userGlobalData.role === "Paciente" && (
              <>
                <Label
                  textColor={Theme.colors.grayV2}
                  border={"none"}
                  backGround={Theme.colors.v2LightWhite}
                  placeholderTextColor={Theme.colors.grayV2}
                  titulo="Exames médicos"
                  fieldHeight={"100%"}
                  fieldMinHeight={"111px"}
                  fieldTextAlign={"center"}
                  isImage={true}
                  uri={uriCameraCapture ? uriCameraCapture : exameFoto}
                  imageExists={uriCameraCapture || exameExists}
                  onPressImage={() => setShowCamera(true)}
                />

                <ButtonBox
                  fieldFlexDirection={"row"}
                  fieldJustifyContent={"space-around"}
                >
                  <ButtonAqua
                    loading={loading}
                    disabled={loading}
                    exameExists={exameExists}
                    onPress={() => {
                      !exameExists ? inserirExame() : atualizarExame();
                    }}
                  />

                  {uriCameraCapture && !exameExists && (
                    <ButtonSecondary fieldWidth={"50%"} onPress={removePicture}>
                      <ParagraphMA500 color={Theme.colors.red}>
                        Cancelar
                      </ParagraphMA500>
                    </ButtonSecondary>
                  )}
                </ButtonBox>
              </>
            )}
            <Line />
            {exameExists && (
              <Label
                pointerEvents={"none"}
                textColor={Theme.colors.grayV2}
                border={"none"}
                backGround={Theme.colors.v2LightWhite}
                placeholderTextColor={Theme.colors.grayV2}
                fieldValue={exameDescicao ? exameDescicao : ""}
                fieldHeight={200}
                titulo="Receita"
              />
            )}
            {userGlobalData.role !== "Paciente" && (
              <>
                {editUserInfo && (
                  <ButtonAsync
                    buttonAtivado
                    loading={loading}
                    disabled={loading}
                    textButton={"Salvar"}
                    onPress={() => handleUpdate()}
                  />
                )}

                <ButtonAsync
                  buttonAtivado
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
