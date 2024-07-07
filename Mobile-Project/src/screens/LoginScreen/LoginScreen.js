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
import { useCallback, useContext, useEffect, useState } from "react";
import {
  apiFilipe,
  loginResource,
  pacientesResource,
  usuarioResource,
} from "../../Services/Service.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ButtonAsync,
  ButtonGoogleComponent,
} from "../../components/Button/index.js";
import { jwtDecode } from "jwt-decode";
import DialogComponent from "../../components/Dialog/Dialog.js";
import { Link, useFocusEffect, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Contexts/Auth.js";
import * as WebBrowser from "expo-web-browser";
import { useAuth, useClerk, useOAuth, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import axios from "axios";
import { AppState } from "react-native";

WebBrowser.maybeCompleteAuthSession();

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

  const googleOAuth = useOAuth({ strategy: "oauth_google" });

  const { user: userGoogle, isLoaded, isSignedIn } = useUser();

  const { session } = useClerk();

  const [usuarioGoogleData, setUsuarioGoogleData] = useState({
    id: "",
    nome: "",
    email: "",
    foto: "",
  });
  // const [usuarioGoogleData, setUsuarioGoogleData] = useState({
  //   id: "user_2isplsGm6E9BKvrhC7hcTv9WcsB",
  //   nome: "Filipe Góis",
  //   email: "fythoy@gmail.com",
  //   foto: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaXNwbHR2SUREV2ROUXRXclFWUnVJem55VE4ifQ",
  // });

  // console.log("cima", {
  //   id: userGoogle?.id,
  //   nome: userGoogle?.fullName,
  //   email: userGoogle?.emailAddresses[0].emailAddress,
  //   foto: userGoogle?.imageUrl,
  // });

  useEffect(() => {
    checkExistAuthentications();
    setLoginError(!user.email.includes("@") && user.email);
    WebBrowser.warmUpAsync();

    if (userGoogle && isSignedIn) {
      handleLoginGoogle();
    }

    console.log("isSignedIn", isSignedIn);
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, [user.email, userGoogle, isSignedIn]);

  //função para verificar se o aparelho tem suoprte a biometria
  const checkExistAuthentications = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync(); //salvar a referencia de suporte a biometria

    const biometricExistsValidation =
      await LocalAuthentication.isEnrolledAsync();

    setBiometricExist(biometricExistsValidation);

    setIsBiometricSupported(compatible);
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

  const authGoogleFlow = async () => {
    try {
      setLoading(true);

      const redirectUrl = Linking.createURL("Main");
      const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl });

      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
        } else {
          console.log("n foi!!");
          setLoading(false);
        }
      } else {
        setLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      setLoading(false);
      console.log("authGoogleFlow erro", error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      setLoading(true);

      // const redirectUrl = Linking.createURL("Main");
      // const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl });

      // if (oAuthFlow.authSessionResult?.type === "success") {
      //   if (oAuthFlow.setActive) {
      //     await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
      //   }
      // } else {
      //   setLoading(false);
      //   return;
      // }

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (isSignedIn) {
        const existeUserGoogle = await existeUsuarioGoogle(
          userGoogle?.emailAddresses[0].emailAddress,
          userGoogle?.id
        );

        if (existeUserGoogle) {
          await logar(
            userGoogle?.emailAddresses[0].emailAddress,
            "",
            userGoogle?.id,
            true
          );
          console.log("google logado!");
        } else {
          await criarContaComGoogle(
            userGoogle?.fullName,
            userGoogle?.emailAddresses[0].emailAddress,
            userGoogle?.id,
            userGoogle?.imageUrl
          );
        }
        setLoading(false);
      } else {
        console.log("usuarioGoogleData n tem nada");
        setLoading(false);
      }
    } catch (error) {
      setDialog({
        status: "erro",
        contentMessage: "Erro ao logar com Google!",
      });
      setShowDialog(true);
      setLoading(false);
    }
  };
  // const handleLoginGoogle = async () => {
  //   try {
  //     setLoading(true);

  //     // const redirectUrl = Linking.createURL("Main");
  //     // const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl });

  //     // if (oAuthFlow.authSessionResult?.type === "success") {
  //     //   if (oAuthFlow.setActive) {
  //     //     await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
  //     //   }
  //     // } else {
  //     //   setLoading(false);
  //     //   return;
  //     // }

  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     console.log("id do google ajdasld", userGoogle.id);
  //     if (isSignedIn) {
  //       const existeUserGoogle = await existeUsuarioGoogle(
  //         usuarioGoogleData.id ? usuarioGoogleData.email : "",
  //         usuarioGoogleData.id ? usuarioGoogleData.id : ""
  //       );

  //       console.log(
  //         `Esse usuario existe no nosso DB ? Resposta: ${
  //           existeUserGoogle ? "Sim" : "Não"
  //         }. Email dele: ${usuarioGoogleData.email}. Id dele: ${
  //           usuarioGoogleData.id
  //         }`
  //       );

  //       if (existeUserGoogle) {
  //         await logar(usuarioGoogleData.email, "", usuarioGoogleData.id, true);
  //         console.log("google logado!");
  //       } else {
  //         await criarContaComGoogle(
  //           usuarioGoogleData.nome,
  //           usuarioGoogleData.email,
  //           usuarioGoogleData.id,
  //           usuarioGoogleData.foto
  //         );
  //       }
  //       setLoading(false);
  //     } else {
  //       console.log("usuarioGoogleData n tem nada");
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setDialog({
  //       status: "erro",
  //       contentMessage: "Erro ao logar com Google!",
  //     });
  //     setShowDialog(true);
  //     setLoading(false);
  //   }
  // };

  const existeUsuarioGoogle = async (email, idGoogleAccount) => {
    try {
      const { status } = await apiFilipe.get(
        `${usuarioResource}/BuscarPorIdGoogle?email=${email}&idGoogleAccount=${idGoogleAccount}`
      );
      return status === 200;
    } catch (error) {}
  };

  const logar = async (
    email,
    senha,
    idGoogleAccount,
    isGoogleLogin = false
  ) => {
    setLoading(true); // Indica que o spinner de loading do botão deve aparecer

    try {
      const response = await apiFilipe.post(
        `${loginResource}?isGoogleLogin=${isGoogleLogin}
        `,
        isGoogleLogin ? { email, idGoogleAccount } : { email, senha }
      );

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
      console.log("erreba:", error);
      setDialog({
        status: "erro",
        contentMessage: "Usuário ou senha incorretos!",
      });
      setShowDialog(true);
    }
    setLoading(false); // Indica que o spinner de loading do botão deve desaparecer
  };

  const handleSubmit = () => {
    logar(user.email, user.senha, "", false);
  };

  const criarContaComGoogle = async (nome, email, IdGoogleAccount, foto) => {
    try {
      const { status } = await apiFilipe.post(
        `${pacientesResource}?IdGoogleAccount=${IdGoogleAccount}&Nome=${nome}&Email=${email}&Foto=${foto}&isCreateAccountGoogle=true`
      );

      if (status === 200) {
        await logar(email, "", IdGoogleAccount, true);
      }
    } catch (error) {
      console.log("erro ao criar conta com Google!", error);
      console.log(
        `errinho ao criar com google. Obj: Nome: ${nome}, Email: ${email}, IdGoogleAccount: ${IdGoogleAccount}, foto: ${foto}`
      );
      console.log("msg", error.message);
    }
  };

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
                  !loginError && user.email && user.senha
                    ? () => handleSubmit()
                    : null
                }
                disabled={loading}
                loading={loading}
                textButton={"Entrar"}
              />

              <ButtonGoogleComponent
                onPress={authGoogleFlow}
                loading={loading}
              />
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
