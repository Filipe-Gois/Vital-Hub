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
import { LogoComponent } from "../../components/Logo";
import { Title } from "../../components/Title/style";

import { InputEmail, InputPassword } from "../../components/Input";
import { LinkMedium } from "../../components/Link/style";
import { ButtonGoogle, ButtonSecondary } from "../../components/Button/style";
import { ButtonTitleGoogle } from "../../components/ButtonTitle/style";

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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonAsync } from "../../components/Button/index.js";
import { jwtDecode } from "jwt-decode";
import DialogComponent from "../../components/Dialog/Dialog.js";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Contexts/Auth.js";

const LoginScreen = () => {
  const navigation = useNavigation();

  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "f@f.com", senha: "12345" });
  // const [user, setUser] = useState({
  //   email: "m@m.com",
  //   senha: "12345",
  // });

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
        // setUserGlobalData({ token: response.data });
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
    setUserGlobalData(decoded);

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

  const handleLoginGoogle = async () => {
    try {
    } catch (error) {
      switch (error.code) {
        case value:
          break;

        default:
          break;
      }
      console.log("erro ao logar com google:", error);
    }
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
