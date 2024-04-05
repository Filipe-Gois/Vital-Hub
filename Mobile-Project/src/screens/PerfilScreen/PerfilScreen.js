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
} from "../../Services/Service";
import {
  cepMasked,
  cpfMasked,
  dateDbToView,
  dateMasked,
  dateViewToDb,
  getLocation,
  rgMasked,
} from "../../Utils/stringFunctions";
import { Alert, Text, TouchableOpacity } from "react-native";
import { ButtonAsync } from "../../components/Button";
import { unMask, unmask } from "remask";

export const PerfilScreen = ({ navigation }) => {
  const [editUserInfo, setEditUserInfo] = useState(false);

  const [userGlobalData, setUserGlobalData] = useState({});

  const [dadosPessoaisDoUsuario, setDadosPessoaisDoUsuario] = useState({});

  const [editDadosPessoaisDoUsuario, setEditDadosPessoaisDoUsuario] = useState(
    dadosPessoaisDoUsuario
  );

  const [dataNascimento, setDataNascimento] = useState("");

  const [logradouro, setLogradouro] = useState("");

  const [cidade, setCidade] = useState("");

  const [cep, setCep] = useState("03736170");

  const [crm, setCrm] = useState("");

  const [especialidadeMedico, setEspecialidadeMedico] = useState("");

  const [enderecoLocalizado, setEnderecoLocalizado] = useState({
    street: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    stateShortname: "",
    zipcode: "",
  });

  const [cpf, setCpf] = useState("");

  const [rg, setRg] = useState("");

  const [loading, setLoading] = useState(false);

  const url =
    userGlobalData.role === "Paciente" ? pacientesResource : medicosResource;

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
      const response = await apiFilipe.get(
        `${url}/BuscarPorId?id=${userGlobalData.id}`
      );

      setDadosPessoaisDoUsuario(response.data);

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // if (
      //   cpf === undefined ||
      //   dataNascimento === undefined ||
      //   cep === undefined ||
      //   cidade.trim() === "" ||
      //   cpf.trim() === "" ||
      //   dataNascimento.trim() === "" ||
      //   cep.trim() === "" ||
      //   cidade.trim() === ""
      // ) {
      //   Alert.alert(
      //     "Atenção",
      //     "Todos os campos devem ser preenchidos corretamente!"
      //   );
      //   setLoading(false);
      //   return;
      // }

      const response = await apiFilipe.put(
        `${url}/AtualizarPerfil?id=${userGlobalData.id}`,

        {
          // rg: unMask(dadosPessoaisDoUsuario.rg),
          cpf: unMask(cpf),
          dataNascimento: dateViewToDb(dataNascimento),
          cep: enderecoLocalizado.zipcode,
          logradouro: enderecoLocalizado.street,
          // numero: dadosPessoaisDoUsuario.endereco.numero,
          cidade: enderecoLocalizado.city,
          // nome: userGlobalData.nome,
          // email: userGlobalData.email,
          // senha: "12345",
          rg: unMask(rg),
          foto: "fefe123.png",
        }
      );
      getUserInfo();
      console.log(response.status);
    } catch (error) {
      editActionAbort();
      console.log(error);
    }

    setEditUserInfo(!editUserInfo);
    setLoading(false);
  };

  const showUpdateForm = () => {
    setEditUserInfo(true);
  };

  const editActionAbort = () => {
    setEditUserInfo(false);
    getUserInfo();
  };

  const getCidadeELogradouro = async () => {
    try {
      const enderecoApi = await getLocation(cep);

      if (enderecoApi) {
        console.log("enderecoApi:", enderecoApi);
        setEnderecoLocalizado(enderecoApi);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
    if (userGlobalData.id) {
      getUserInfo();
    }

    return (cleanUp = () => {});
  }, [userGlobalData.id, enderecoLocalizado.zipcode]);

  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <BannerUserComponent
            src={UserImage}
            name={userGlobalData.name}
            isAge={false}
            email={userGlobalData.email}
            isUser={userGlobalData.role === "Medico" ? false : true}
            crm={crm}
          />

          <FormBox>
            {userGlobalData.role !== "Medico" && (
              <Label
                // autoFocus={false}
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
                onChangeText={
                  userGlobalData.role === "Paciente" &&
                  ((txt) =>
                    // setDadosPessoaisDoUsuario({
                    //   ...dadosPessoaisDoUsuario,
                    //   dataNascimento: txt,
                    // })
                    setDataNascimento(dateDbToView(txt)))
                }
                fieldValue={
                  // dadosPessoaisDoUsuario.dataNascimento &&
                  // dateDbToView(dadosPessoaisDoUsuario.dataNascimento)
                  userGlobalData.role === "Paciente"
                    ? dataNascimento && dateDbToView(dataNascimento)
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
                backGround={Theme.colors.v2LightWhite}
              />
            )}

            {userGlobalData.role !== "Medico" && (
              <Label
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
                onChangeText={
                  userGlobalData.role === "Paciente" &&
                  ((txt) => setRg(rgMasked(txt)))
                }
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
                backGround={Theme.colors.v2LightWhite}
              />
            )}
            <Label
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
              onChangeText={
                userGlobalData.role === "Paciente" &&
                ((txt) => setCpf(cpfMasked(txt)))
              }
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
              backGround={Theme.colors.v2LightWhite}
            />

            <Label
              textColor={
                editUserInfo ? Theme.colors.primary : Theme.colors.grayV1
              }
              pointerEvents={"none"}
              onChangeText={(txt) =>
                // setDadosPessoaisDoUsuario({
                //   ...dadosPessoaisDoUsuario.endereco,
                //   logradouro: txt,
                // })
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
              placeholderTextColor={
                editUserInfo ? Theme.colors.primary : Theme.colors.grayV1
              }
              titulo="Endereço"
              placeholder={"Rua Niterói, 180."}
              border={editUserInfo ? Theme.colors.primary : "none"}
              backGround={Theme.colors.v2LightWhite}
            />

            <ContainerInputBox
              fieldDirection="row"
              fieldJustifyContent="space-between"
            >
              <Label
                textColor={
                  editUserInfo ? Theme.colors.primary : Theme.colors.grayV1
                }
                onEndEditing={() => {
                  getCidadeELogradouro();
                  enderecoLocalizado.zipcode &&
                    setCep(enderecoLocalizado.zipcode);
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
                backGround={Theme.colors.v2LightWhite}
              />

              <Label
                textColor={
                  editUserInfo ? Theme.colors.primary : Theme.colors.grayV1
                }
                pointerEvents={"none"}
                onChangeText={(txt) => {
                  // setDadosPessoaisDoUsuario({
                  //   ...dadosPessoaisDoUsuario.endereco,
                  //   cidade: txt,
                  // });
                  setCidade(
                    dadosPessoaisDoUsuario.endereco.cidade
                      ? dadosPessoaisDoUsuario.endereco.cidade
                      : txt
                  );
                }}
                fieldValue={
                  // dadosPessoaisDoUsuario.endereco &&
                  // dadosPessoaisDoUsuario.endereco.cidade
                  editUserInfo && enderecoLocalizado.city
                    ? enderecoLocalizado.city
                    : cidade && cidade
                }
                placeholderTextColor={
                  editUserInfo ? Theme.colors.primary : Theme.colors.grayV1
                }
                widthLabel={"45%"}
                fieldWidth={"100"}
                fieldMaxWidth={100}
                titulo="Cidade"
                placeholder={"Cidade"}
                border={editUserInfo ? Theme.colors.primary : "none"}
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
