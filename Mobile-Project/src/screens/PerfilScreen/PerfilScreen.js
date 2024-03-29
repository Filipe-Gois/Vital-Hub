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
import { useEffect, useState } from "react";
import { userDecodeToken } from "../../Utils/Auth";
import api, { pacientesResource } from "../../Services/Service";
import {
  cepMasked,
  cpfMasked,
  dateDbToView,
} from "../../Utils/stringFunctions";
import { Alert, Text } from "react-native";
import { ButtonAsync } from "../../components/Button";
import { unMask, unmask } from "remask";

export const PerfilScreen = ({ navigation }) => {
  const [editUserInfo, setEditUserInfo] = useState(false);

  const [userGlobalData, setUserGlobalData] = useState({});

  const [dadosPessoaisDoUsuario, setDadosPessoaisDoUsuario] = useState({});

  const [cep, setCep] = useState("");

  const [cpf, setCpf] = useState("");

  const [loading, setLoading] = useState(false);

  //pega as propriedades do token
  const fetchProfileData = async () => {
    const userInfo = await userDecodeToken();

    if (userInfo) {
      setUserGlobalData(userInfo);
    }
  };

  //traz os dados pessoais do usuario Ex: cpf, logradouro, etc
  const getUserInfo = async () => {
    try {
      const response = await api.get(
        `${pacientesResource}/BuscarPorId?id=${userGlobalData.id}`
      );

      setCep(response.data.endereco.cep);
      setCpf(response.data.cpf);
      setDadosPessoaisDoUsuario(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put(
        pacientesResource + `/AtualizarPerfil?id=${userGlobalData.id}`,
        {
          // rg: unMask(dadosPessoaisDoUsuario.rg),
          cpf: unMask(cpf),
          dataNascimento: dadosPessoaisDoUsuario.dataNascimento,
          cep: unMask(cep),
          logradouro: dadosPessoaisDoUsuario.endereco.logradouro,
          // numero: dadosPessoaisDoUsuario.endereco.numero,
          cidade: dadosPessoaisDoUsuario.endereco.cidade,
          // nome: userGlobalData.nome,
          // email: userGlobalData.email,
          // senha: "12345",

          foto: dadosPessoaisDoUsuario.idNavigation.foto,
        }
      );

      console.log(response.status);
    } catch (error) {
      console.log(error);
    }

    setEditUserInfo(!editUserInfo);
  };

  const showUpdateForm = () => {
    setEditUserInfo(true);
  };

  const editActionAbort = () => {
    setEditUserInfo(false);
  };

  useEffect(() => {
    fetchProfileData();
    if (userGlobalData.id) {
      getUserInfo();
    }
    return (cleanUp = () => {});
  }, [userGlobalData.id]);

  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <BannerUserComponent
            src={UserImage}
            name={userGlobalData.name}
            isAge={false}
            email={userGlobalData.email}
          />

          <FormBox>
            <Label
              onChangeText={(txt) =>
                setDadosPessoaisDoUsuario({
                  ...dadosPessoaisDoUsuario,
                  dataNascimento: txt,
                })
              }
              fieldValue={
                dadosPessoaisDoUsuario.dataNascimento &&
                dateDbToView(dadosPessoaisDoUsuario.dataNascimento)
              }
              editable={false}
              placeholderTextColor={Theme.colors.grayV1}
              titulo="Data de nascimento:"
              placeholder={"14/01/2000"}
              border="none"
              backGround={Theme.colors.v2LightWhite}
            />

            {userGlobalData.role === "Paciente" && (
              <Label
                onChangeText={(txt) => setCpf(cpfMasked(txt))}
                fieldValue={
                  // dadosPessoaisDoUsuario.cpf &&
                  cpfMasked(cpf)
                }
                editable={editUserInfo}
                placeholderTextColor={Theme.colors.grayV1}
                titulo="CPF"
                placeholder={"999.999.999-99"}
                border="none"
                backGround={Theme.colors.v2LightWhite}
              />
            )}

            {/* <Text>{cpf}</Text> */}

            <Label
              onChangeText={(txt) =>
                setDadosPessoaisDoUsuario({
                  ...dadosPessoaisDoUsuario.endereco,
                  logradouro: txt,
                })
              }
              fieldValue={
                dadosPessoaisDoUsuario.endereco
                  ? dadosPessoaisDoUsuario.endereco.logradouro
                  : "Ex: Rua Niterói, 180."
              }
              editable={editUserInfo}
              placeholderTextColor={Theme.colors.grayV1}
              titulo="Endereço"
              placeholder={"Rua Niterói, 180."}
              border="none"
              backGround={Theme.colors.v2LightWhite}
            />

            <ContainerInputBox
              fieldDirection="row"
              fieldJustifyContent="space-between"
            >
              <Label
                onChangeText={(txt) => setCep(cepMasked(txt))}
                fieldValue={
                  dadosPessoaisDoUsuario.endereco ? cepMasked(cep) : "99999-999"
                }
                editable={editUserInfo}
                placeholderTextColor={Theme.colors.grayV1}
                widthLabel={"45%"}
                fieldWidth={"100"}
                fieldMaxWidth={100}
                titulo="Cep"
                placeholder={"Ex: 99999-999"}
                border="none"
                backGround={Theme.colors.v2LightWhite}
              />

              <Label
                onChangeText={(txt) =>
                  setDadosPessoaisDoUsuario({
                    ...dadosPessoaisDoUsuario.endereco,
                    cidade: txt,
                  })
                }
                fieldValue={
                  dadosPessoaisDoUsuario.endereco &&
                  dadosPessoaisDoUsuario.endereco.cidade
                }
                editable={editUserInfo}
                placeholderTextColor={Theme.colors.grayV1}
                widthLabel={"45%"}
                fieldWidth={"100"}
                fieldMaxWidth={100}
                titulo="Cidade"
                placeholder={"Cidade"}
                border="none"
                backGround={Theme.colors.v2LightWhite}
              />
            </ContainerInputBox>

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

            <ButtonGray
              onPress={async () => {
                await AsyncStorage.removeItem("token");
                navigation.replace("Login");
              }}
            >
              <ButtonTitle>Sair do app</ButtonTitle>
            </ButtonGray>
          </FormBox>
        </MainContent>
      </MainContentScroll>
    </Container>
  );
};
