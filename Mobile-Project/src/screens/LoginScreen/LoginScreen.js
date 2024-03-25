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
import { useState } from "react";
import api, { loginResource } from "../../Services/Service.js";
import { Alert } from "react-native";
import os from "react-native-os";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState({ email: "l@l.com", senha: "12345" });

  const Login = async () => {
    // await api
    //   .post(loginResource, user)
    //   .then(async (response) => {
    //     await AsyncStorage.setItem("token", JSON.stringify(response.data));

    //     navigation.replace("Main");
    //   })
    //   .catch((error) => console.log(error));

    try {
      const response = await api.post(loginResource, user);
      await AsyncStorage.setItem("token", JSON.stringify(response.data));

      // console.log("setItem:", await AsyncStorage.getItem("token"));

      navigation.replace("Main");
    } catch (error) {
      console.log(error);
    }
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
              <Button onPress={() => Login()}>
                <ButtonTitle>Entrar</ButtonTitle>
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
              onPress={(e) => navigation.replace("CreateAccount")}
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
