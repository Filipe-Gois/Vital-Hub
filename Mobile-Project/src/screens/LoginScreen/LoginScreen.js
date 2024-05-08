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
import DialogComponent from "../../components/Dialog/Dialog.js";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState({ email: "a@a.com", senha: "12345" });
  const [user, setUser] = useState({
    email: "fythoy@gmail.com",
    senha: "12345",
  });

  const [showDialog, setShowDialog] = useState(false);

  const [loginError, setLoginError] = useState(false);

  const [senhaVisivel, setSenhaVisivel] = useState(false);

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
      navigation.replace("Main", { token: response.data.token });
    } catch (error) {
      setShowDialog(true);
    }
    setLoading(false); //ao ficar como false, indica que o spinner de loading do botão deve desaparecer
  };

  const handleErrors = () => {
    setLoginError(!user.email.includes("@") && user.email);
  };

  useEffect(() => {
    setLoginError(!user.email.includes("@") && user.email);
  }, [user.email]);

  return (
    <Container>
      <DialogComponent
        contentMessage="Usuário ou senha incorretos!"
        status={"erro"}
        visible={showDialog}
        setVisible={setShowDialog}
      />
      <MainContentScroll>
        <MainContent>
          <LogoComponent />

          <FormBox>
            <Title>Entrar ou criar conta</Title>

            <InputBox>
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
