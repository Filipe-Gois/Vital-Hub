import { BannerUserComponent } from "../../components/BannerUser";
import {
  Container,
  FormBox,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import UserImage from "../../assets/UserProfileImage.jpg";
import Label from "../../components/Label";
import { Button, ButtonGray } from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import { Theme } from "../../themes";
import { ContainerInputBox } from "../../components/Container";
import { Input } from "../../components/Input";
import { ParagraphSemiBold } from "../../components/Paragraph/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { userDecodeToken } from "../../Utils/Auth";
import {
  apiFilipe,
  medicosResource,
  pacientesResource,
  usuarioResource,
} from "../../Services/Service";
import {
  cepMasked,
  cpfMasked,
  dateDbToViewFull,
  dateViewToDb,
  getLocation,
  rgMasked,
} from "../../Utils/stringFunctions";
import { ActivityIndicator, Alert, Text, TouchableOpacity } from "react-native";
import { ButtonAsync } from "../../components/Button";
import { unMask, unmask } from "remask";
import DialogComponent from "../../components/Dialog/Dialog";
import { useAuth, useUser } from "@clerk/clerk-expo";

export const PerfilScreen = ({ navigation }) => {
  //dados do usuario
  const [userGlobalData, setUserGlobalData] = useState({});
  const [dadosPessoaisDoUsuario, setDadosPessoaisDoUsuario] = useState({});
  const [userFoto, setUserFoto] = useState("");

  //Endereço
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [enderecoLocalizado, setEnderecoLocalizado] = useState({
    street: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    stateShortname: "",
    zipcode: "",
  });

  //Dados do médico
  const [crm, setCrm] = useState("");
  const [especialidadeMedico, setEspecialidadeMedico] = useState("");

  //Dados do paciente
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  //Rotas
  const url =
    userGlobalData.role === "Paciente" ? pacientesResource : medicosResource;

  //Propriedades da tela
  const [editUserInfo, setEditUserInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingExit, setLoadingExit] = useState(false);
  const [dialog, setDialog] = useState({});
  const [showDialog, setShowDialog] = useState(false);

  //Câmera
  const [showCamera, setShowCamera] = useState(false);
  const [uriPhoto, setUriPhoto] = useState(null);

  const { signOut } = useAuth();

  const { isSignedIn } = useUser();

  //pega as propriedades do token
  const fetchProfileData = async () => {
    const userInfo = await userDecodeToken();

    if (userInfo) {
      setUserGlobalData(userInfo);
    }
  };

  const handleLogout = async () => {
    console.log(isSignedIn);
    // if (isSignedIn) {
    await signOut();
    // }

    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  const getUserInfo = async () => {
    try {
      const response = await apiFilipe.get(`${url}/PerfilLogado`, {
        headers: { Authorization: `Bearer ${userGlobalData.token}` },
      });

      setDadosPessoaisDoUsuario(response.data);

      setUserFoto(response.data.idNavigation.foto);

      setLogradouro(response.data.endereco.logradouro);
      setCidade(response.data.endereco.cidade);
      setCep(response.data.endereco.cep);

      if (userGlobalData.role === "Paciente") {
        setDataNascimento(response.data.dataNascimento);
        setCpf(response.data.cpf);
        setRg(response.data.rg);
      } else {
        setCrm(response.data.crm);
        setEspecialidadeMedico(response.data.especialidade.especialidade1);
      }
    } catch (error) {}
  };

  //traz os dados pessoais do usuario Ex: cpf, logradouro, etc
  const getUserInfoUpload = async () => {
    try {
      const response = await apiFilipe.get(`${url}/PerfilLogado`, {
        headers: { Authorization: `Bearer ${userGlobalData.token}` },
      });
      setUserFoto(response.data.idNavigation.foto);

      if (
        userGlobalData.role === "Paciente" &&
        response.data.dataNascimento &&
        response.data.rg &&
        response.data.cpf &&
        response.data.endereco.cep &&
        response.data.endereco.logradouro &&
        response.data.endereco.cidade
      ) {
        setDadosPessoaisDoUsuario(response.data);

        setLogradouro(response.data.endereco.logradouro);
        setCidade(response.data.endereco.cidade);
        setCep(response.data.endereco.cep);

        setDataNascimento(response.data.dataNascimento);
        setCpf(response.data.cpf);
        setRg(response.data.rg);
      }

      if (userGlobalData.role === "Medico") {
        setCrm(response.data.crm);
        setEspecialidadeMedico(response.data.especialidade.especialidade1);
      }
    } catch (error) {}
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await apiFilipe.get(`${url}/PerfilLogado`, {
        headers: { Authorization: `Bearer ${userGlobalData.token}` },
      });

      if (new Date(dataNascimento) > Date.now()) {
        setDialog({
          status: "alerta",
          contentMessage: "Insira uma data de nascimento válida!",
        });
        setShowDialog(true);
        setLoading(false);
        return;
      }

      if (
        userGlobalData.role === "Paciente" &&
        !dataNascimento &&
        !cpf &&
        !rg &&
        !cep
      ) {
        setDialog({
          status: "alerta",
          contentMessage: "Preencha todos os campos!",
        });
        setShowDialog(true);
        setLoading(false);
        return;
      }

      await apiFilipe.put(
        url,
        {
          //Endereço
          cep: enderecoLocalizado.zipcode ? enderecoLocalizado.zipcode : cep,
          logradouro: enderecoLocalizado.street
            ? enderecoLocalizado.street
            : logradouro,
          cidade: enderecoLocalizado.city ? enderecoLocalizado.city : cidade,

          //paciente:

          rg: unMask(rg),
          cpf: unMask(cpf),
          dataNascimento: dateViewToDb(dataNascimento),
        },
        {
          headers: {
            Authorization: `Bearer ${userGlobalData.token}`,
          },
        }
      );

      if (
        userGlobalData.role === "Paciente" &&
        !response.data.dataNascimento &&
        !response.data.cpf &&
        !response.data.rg &&
        !response.data.endereco.cep &&
        !response.data.endereco.logradouro &&
        !response.data.endereco.cidade
      ) {
        navigation.replace("Main");
        return;
      }

      getUserInfoUpload();
      setDialog({
        status: "sucesso",
        contentMessage: "Dados atualizados com sucesso!",
      });
      setShowDialog(true);
    } catch (error) {
      editActionAbort();
      setDialog({
        status: "erro",
        contentMessage: "Não foi possível atualizar os dados!",
      });
      setShowDialog(true);
    }

    setEditUserInfo(!editUserInfo);
    setLoading(false);
  };

  const showUpdateForm = () => {
    setEditUserInfo(true);
  };

  const editActionAbort = () => {
    setEditUserInfo(false);
    getUserInfoUpload();
    setEnderecoLocalizado({});
  };

  const getCidadeELogradouro = async () => {
    try {
      const enderecoApi = await getLocation(cep, { setDialog, setShowDialog });

      if (enderecoApi) {
        setEnderecoLocalizado(enderecoApi);
      }
    } catch (error) {}
  };

  //A FOTO ESTÁ VINDO COM .EXP, TRATAR ISSO!!!!!!
  const alterarFotoPerfil = async () => {
    const formData = new FormData();

    formData.append("Arquivo", {
      uri: uriPhoto,
      name: `image.${uriPhoto.split(".")[1]}`,
      type: `image/${uriPhoto.split(".")[1]}`,
    });
    try {
      await apiFilipe.put(
        `${usuarioResource}/AlterarFotoPerfil?id=${userGlobalData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // setUserFoto(uriPhoto)
      setUriPhoto(null);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProfileData();
    if (userGlobalData.id) {
      getUserInfo();
    }
    getUserInfoUpload();

    if (uriPhoto !== null) {
      alterarFotoPerfil();
    }
  }, [userGlobalData.id, uriPhoto]);

  return (
    <Container>
      <DialogComponent
        {...dialog}
        visible={showDialog}
        setVisible={setShowDialog}
        setDialog={setDialog}
      />
      <MainContentScroll>
        <MainContent>
          <BannerUserComponent
            src={userFoto ? userFoto : null}
            name={userGlobalData.name}
            isAge={false}
            email={userGlobalData.email}
            isUser={userGlobalData.role === "Medico" ? false : true}
            crm={crm}
            isProfile={true}
            showCamera={showCamera}
            setShowCamera={setShowCamera}
            setUriCameraCapture={setUriPhoto}
          />

          <FormBox>
            {userGlobalData.role !== "Medico" && (
              <>
                <Label
                  keyboardType={"numeric"}
                  pointerEvents={
                    !editUserInfo || userGlobalData.role !== "Paciente"
                      ? "none"
                      : "auto"
                  }
                  textColor={
                    userGlobalData.role === "Paciente" && editUserInfo
                      ? Theme.colors.primary
                      : Theme.colors.grayV1
                  }
                  onChangeText={(txt) =>
                    setDataNascimento(dateDbToViewFull(txt))
                  }
                  fieldValue={
                    userGlobalData.role === "Paciente"
                      ? dataNascimento && dateDbToViewFull(dataNascimento)
                      : crm
                  }
                  editable={false}
                  placeholderTextColor={Theme.colors.grayV1}
                  titulo={
                    userGlobalData.role === "Paciente"
                      ? "Data de nascimento:"
                      : "CRM:"
                  }
                  placeholder={
                    userGlobalData.role === "Paciente"
                      ? "Ex: 14/01/2000"
                      : "Ex: 99999"
                  }
                  border={
                    userGlobalData.role === "Paciente" && editUserInfo
                      ? Theme.colors.primary
                      : "none"
                  }
                  backGround={
                    userGlobalData.role === "Paciente" && editUserInfo
                      ? Theme.colors.whiteColor
                      : Theme.colors.v2LightWhite
                  }
                />

                <Label
                  keyboardType={"numeric"}
                  pointerEvents={
                    !editUserInfo || userGlobalData.role !== "Paciente"
                      ? "none"
                      : "auto"
                  }
                  textColor={
                    userGlobalData.role === "Paciente" && editUserInfo
                      ? Theme.colors.primary
                      : Theme.colors.grayV1
                  }
                  onChangeText={(txt) => setRg(rgMasked(txt))}
                  fieldValue={rg && rgMasked(rg)}
                  editable={editUserInfo}
                  placeholderTextColor={Theme.colors.grayV1}
                  titulo={"RG: "}
                  placeholder={"99.999.999-9"}
                  border={
                    userGlobalData.role === "Paciente" && editUserInfo
                      ? Theme.colors.primary
                      : "none"
                  }
                  backGround={
                    userGlobalData.role === "Paciente" && editUserInfo
                      ? Theme.colors.whiteColor
                      : Theme.colors.v2LightWhite
                  }
                />
              </>
            )}

            <Label
              keyboardType={"numeric"}
              pointerEvents={
                !editUserInfo || userGlobalData.role !== "Paciente"
                  ? "none"
                  : "auto"
              }
              textColor={
                userGlobalData.role === "Paciente" && editUserInfo
                  ? Theme.colors.primary
                  : Theme.colors.grayV1
              }
              onChangeText={(txt) => setCpf(cpfMasked(txt))}
              fieldValue={
                userGlobalData.role === "Paciente"
                  ? cpf && cpfMasked(cpf)
                  : especialidadeMedico
              }
              editable={editUserInfo}
              placeholderTextColor={Theme.colors.grayV1}
              titulo={
                userGlobalData.role === "Paciente" ? "CPF:" : "Especialidade:"
              }
              placeholder={
                userGlobalData.role === "Paciente"
                  ? "Ex: 999.999.999-99"
                  : "Ex: Pediatra"
              }
              border={
                userGlobalData.role === "Paciente" && editUserInfo
                  ? Theme.colors.primary
                  : "none"
              }
              backGround={
                userGlobalData.role === "Paciente" && editUserInfo
                  ? Theme.colors.whiteColor
                  : Theme.colors.v2LightWhite
              }
            />

            <Label
              textColor={Theme.colors.grayV1}
              pointerEvents={"none"}
              onChangeText={(txt) =>
                setLogradouro(
                  enderecoLocalizado.street ? enderecoLocalizado.street : txt
                )
              }
              fieldValue={
                editUserInfo && enderecoLocalizado.street
                  ? enderecoLocalizado.street
                  : logradouro && logradouro
              }
              editable={editUserInfo}
              placeholderTextColor={Theme.colors.grayV1}
              titulo="Endereço"
              placeholder={"Rua Niterói, 180."}
              border={"none"}
              backGround={Theme.colors.v2LightWhite}
            />

            <ContainerInputBox
              fieldDirection="row"
              fieldJustifyContent="space-between"
            >
              <Label
                keyboardType={"numeric"}
                textColor={
                  editUserInfo ? Theme.colors.primary : Theme.colors.grayV1
                }
                onEndEditing={() => {
                  getCidadeELogradouro();

                  setCep(
                    enderecoLocalizado.zipcode
                      ? enderecoLocalizado.zipcode
                      : cep
                  );
                }}
                pointerEvents={!editUserInfo ? "none" : "auto"}
                onChangeText={(txt) => setCep(cepMasked(txt))}
                fieldValue={cep && cepMasked(cep)}
                editable={editUserInfo}
                placeholderTextColor={
                  editUserInfo ? Theme.colors.primary : Theme.colors.grayV1
                }
                widthLabel={"45%"}
                fieldWidth={"100"}
                fieldMaxWidth={100}
                titulo="Cep"
                placeholder={"Ex: 99999-999"}
                border={editUserInfo ? Theme.colors.primary : "none"}
                backGround={
                  editUserInfo
                    ? Theme.colors.whiteColor
                    : Theme.colors.v2LightWhite
                }
              />

              <Label
                textColor={Theme.colors.grayV1}
                pointerEvents={"none"}
                onChangeText={(txt) => {
                  setCidade(
                    dadosPessoaisDoUsuario.endereco.cidade
                      ? dadosPessoaisDoUsuario.endereco.cidade
                      : txt
                  );
                }}
                fieldValue={
                  editUserInfo && enderecoLocalizado.city
                    ? enderecoLocalizado.city
                    : cidade && cidade
                }
                placeholderTextColor={Theme.colors.grayV1}
                widthLabel={"45%"}
                fieldWidth={"100"}
                fieldMaxWidth={100}
                titulo="Cidade"
                placeholder={"Cidade"}
                border={"none"}
                backGround={Theme.colors.v2LightWhite}
              />
            </ContainerInputBox>

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

            <ButtonGray
              onPress={
                userGlobalData.token && !loadingExit ? handleLogout : null
              }
            >
              {loadingExit ? (
                <ActivityIndicator color={Theme.colors.whiteColor} />
              ) : (
                <ButtonTitle>Sair</ButtonTitle>
              )}
            </ButtonGray>
          </FormBox>
        </MainContent>
      </MainContentScroll>
    </Container>
  );
};
