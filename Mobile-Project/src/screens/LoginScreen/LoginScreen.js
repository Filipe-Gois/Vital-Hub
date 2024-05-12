import * as LocalAuthentication from "expo-local-authentication";
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

import { Input, InputEmail, InputPassword } from "../../components/Input";
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
import { useContext, useEffect, useState } from "react";
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
import { HelperText, TextInput } from "react-native-paper";
import { InputLibrary } from "../../components/Input/style.js";
import { Text } from "react-native";
import DialogComponent, {
  DialogSelectLocation,
} from "../../components/Dialog/Dialog.js";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState({ email: "m@m.com", senha: "12345" });
  const [user, setUser] = useState({
    email: "fythoy@gmail.com",
    senha: "12345",
  });

  const [dialog, setDialog] = useState({});

  const [showDialog, setShowDialog] = useState(false);

  const [loginError, setLoginError] = useState(false);

  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const [biometricExist, setBiometricExist] = useState(false);

  //função para verificar se o aparelho tem suoprte a biometria
  const checkExistAuthentications = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync(); //salvar a referencia de suporte a biometria

    const biometricExistsValidation =
      await LocalAuthentication.isEnrolledAsync();

    setBiometricExist(biometricExistsValidation);

    setIsBiometricSupported(compatible);
  };

  const handleAuthentication = async () => {};

  const Login = async () => {
    setLoading(true); // Indica que o spinner de loading do botão deve aparecer

    try {
      const response = await apiFilipe.post(loginResource, user);

      // Verifica se existe uma biometria cadastrada no dispositivo
      const biometricExist = await LocalAuthentication.isEnrolledAsync();
      const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();

      if (!biometricExist || !isBiometricSupported) {
        await AsyncStorage.setItem("token", JSON.stringify(response.data));
        handlePostAuthentication(response.data);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Por favor, autentique-se para acessar o aplicativo.",
        fallbackLabel: "Usar senha do dispositivo?",
        disableDeviceFallback: false, // Permite o fallback para a senha do dispositivo
      });

      if (result.success) {
        await AsyncStorage.setItem("token", JSON.stringify(response.data));
        handlePostAuthentication(response.data);
        return;
      } else {
        setDialog({
          status: "erro",
          contentMessage: "Erro",
        });
        setShowDialog(true);
        setLoading(false);
        return;
      }
    } catch (error) {
      setDialog({
        status: "erro",
        contentMessage: "Usuário ou senha incorretos!",
      });
      setShowDialog(true);
    }
    setLoading(false); // Indica que o spinner de loading do botão deve desaparecer
  };

  const handlePostAuthentication = async (responseData) => {
    const decoded = jwtDecode(responseData.token);

    if (decoded.role === "Paciente") {
      const responsePaciente = await apiFilipe.get(
        `${pacientesResource}/PerfilLogado`,
        {
          headers: { Authorization: `Bearer ${responseData.token}` },
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
    navigation.replace("Main", { token: responseData.token });
  };

  const handleErrors = () => {
    setLoginError(!user.email.includes("@") && user.email);
  };

  useEffect(() => {
    checkExistAuthentications();
    setLoginError(!user.email.includes("@") && user.email);
  }, [user.email]);

  return (
    <Container>
      <DialogComponent
        {...dialog}
        visible={showDialog}
        setVisible={setShowDialog}
        setDialog={setDialog}
      />
      {/* <DialogSelectLocation visible={true} setVisible={setDialog} /> */}
      <MainContentScroll>
        <MainContent>
          <LogoComponent />

          <FormBox>
            <Title>Entrar ou criar conta</Title>

            <InputBox gap={"20px"}>
              <InputEmail
                visible={loginError}
                value={user.email}
                onChangeText={(txt) => {
                  setUser({ ...user, email: txt });
                  handleErrors();
                }}
              />

              <InputPassword
                senhaVisivel={senhaVisivel}
                setSenhaVisivel={setSenhaVisivel}
                value={user.senha}
                onChangeText={(txt) => setUser({ ...user, senha: txt })}
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
                buttonAtivado={!loginError && user.email && user.senha}
                onPress={
                  !loginError && user.email && user.senha ? () => Login() : null
                }
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
