import {
  Container,
  InputBox,
  FormBox,
  ButtonBox,
  CreateAccountBox,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
// import LogoVitalHub from "../../assets/logo.svg"
import { LogoComponent } from "../../components/Logo";
import { Title } from "../../components/Title/style";

import { Input } from "../../components/Input";
import { LinkMedium } from "../../components/Link/style";
import {
  Button,
  ButtonGoogle,
  ButtonSecondary,
} from "../../components/Button/style";
import {
  ButtonTitle,
  ButtonTitleGoogle,
} from "../../components/ButtonTitle/style";

import { FontAwesome6 } from "@expo/vector-icons";
import { Theme } from "../../themes";

import {
  TextCreateAccount1,
  TextCreateAccount2,
} from "../../components/Paragraph/style.js";
import { useContext, useState } from "react";
import {
  apiFilipe,
  loginResource,
  pacientesResource,
} from "../../Services/Service.js";
import { ActivityIndicator, Alert, TouchableHighlight } from "react-native";
import os from "react-native-os";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserContext,
  userDecodeToken,
  userDecodeToken2,
} from "../../Utils/Auth.js";
import { AuthContext } from "../../Context/AuthProvider.js";
import { ButtonAsync } from "../../components/Button/index.js";
import { jwtDecode } from "jwt-decode";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState({ email: "m@m.com", senha: "12345" });
  const [user, setUser] = useState({
    email: "fythoy@gmail.com",
    senha: "12345",
  });

  const Login = async () => {
    setLoading(true); //ao ficar como true, indica que o spinner de loading do botão deve aparecer
    try {
      const response = await apiFilipe.post(loginResource, user);

      await AsyncStorage.setItem("token", JSON.stringify(response.data));

      const decoded = jwtDecode(response.data.token);

      if (decoded.role === "Paciente") {
        const responsePaciente = await apiFilipe.get(
          `${pacientesResource}/PerfilLogado`,
          {
            headers: { Authorization: `Bearer ${response.data.token}` },
          }
        );
        if (
          !responsePaciente.data.dataNascimento ||
          !responsePaciente.data.cpf ||
          !responsePaciente.data.rg ||
          !responsePaciente.data.endereco.cep ||
          !responsePaciente.data.endereco.logradouro ||
          !responsePaciente.data.endereco.cidade
        ) {
          navigation.replace("Perfil");
          return;
        }
      }

      navigation.replace("Main");
    } catch (error) {
      Alert.alert("Erro");
      setLoading(false);
    }
    setLoading(false); //ao ficar como false, indica que o spinner de loading do botão deve desaparecer
  };

  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <LogoComponent />

          <FormBox>
            <Title>Entrar ou criar conta</Title>

            <InputBox gap={"20px"}>
              <Input
                keyboardType={"email-address"}
                fieldValue={user.email}
                onChangeText={(txt) => setUser({ ...user, email: txt })}
                placeholder={"Email:"}
              />
              <Input
                keyboardType={"visible-password"}
                fieldValue={user.senha}
                onChangeText={(txt) => setUser({ ...user, senha: txt })}
                placeholder={"Senha:"}
              />
            </InputBox>
            <ButtonSecondary
              alignSelf={"flex-start"}
              padding={"0"}
              onPress={() => navigation.navigate("RecoverPassword")}
            >
              <LinkMedium
                onPress={() => navigation.navigate("RecoverPassword")}
              >
                Esqueceu sua senha?
              </LinkMedium>
            </ButtonSecondary>

            <ButtonBox>
              <ButtonAsync
                onPress={() => Login()}
                disabled={loading}
                loading={loading}
                textButton={"Entrar"}
              />

              <ButtonGoogle>
                <FontAwesome6
                  name="google"
                  size={16}
                  color={Theme.colors.secondary}
                />

                {/* ícone sendo importado diretamente da biblioteca do expo */}

                <ButtonTitleGoogle>Entrar com Google</ButtonTitleGoogle>
              </ButtonGoogle>
            </ButtonBox>
          </FormBox>

          <CreateAccountBox>
            <TextCreateAccount1
              onPress={(e) => navigation.navigate("CreateAccount")}
            >
              Não tem conta ? {""}
            </TextCreateAccount1>

            <ButtonSecondary
              padding={"0"}
              onPress={() => navigation.navigate("CreateAccount")}
            >
              <TextCreateAccount2>Crie uma conta agora!</TextCreateAccount2>
            </ButtonSecondary>
          </CreateAccountBox>
        </MainContent>
      </MainContentScroll>
    </Container>
  );
};

export default LoginScreen;
