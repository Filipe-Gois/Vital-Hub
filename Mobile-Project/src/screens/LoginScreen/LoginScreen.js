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
import api, { loginResource } from "../../Services/Service.js";
import { ActivityIndicator, Alert, TouchableHighlight } from "react-native";
import os from "react-native-os";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserContext,
  userDecodeToken,
  userDecodeToken2,
} from "../../Utils/Auth.js";
import { AuthContext } from "../../Context/AuthProvider.js";
import axios from 'axios';


const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "f@f.com", senha: "12345" });
  // const { userData, setUserData } = useContext(AuthContext);

  const Login = async () => {
    setLoading(loading); //ao ficar como true, indica que o spinner de loading do botão deve aparecer
    try {
      const response = await api.post(loginResource, user);

      await AsyncStorage.setItem("token", JSON.stringify(response.data));

      navigation.replace("Main");
    } catch (error) {
      console.log(error);
    }
    setLoading(!loading); //ao ficar como false, indica que o spinner de loading do botão deve desaparecer
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
                fieldValue={user.email}
                onChangeText={(txt) => setUser({ ...user, email: txt })}
                placeholder={"Email:"}
              />
              <Input
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
              <Button onPress={() => Login()} disabled={loading}>
                {loading ? (
                  <ActivityIndicator
                    size={20}
                    color={Theme.colors.whiteColor}
                  />
                ) : (
                  <ButtonTitle>Entrar</ButtonTitle>
                )}
              </Button>

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
