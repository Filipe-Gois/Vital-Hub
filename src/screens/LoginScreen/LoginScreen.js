import {
  Container,
  InputBox,
  FormBox,
  ButtonBox,
  CreateAccountBox,
  MainContent,
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

const LoginScreen = ({ navigation }) => {
  const Login = async () => {
    navigation.replace("Main");
  };

  return (
    <Container>
      <MainContent>
        <LogoComponent />

        <FormBox>
          <Title>Entrar ou criar conta</Title>

          <InputBox gap={"20px"}>
            <Input placeholder={"Email:"} />
            <Input placeholder={"Senha:"} />
          </InputBox>
          <ButtonSecondary
            alignSelf={"flex-start"}
            padding={"0"}
            onPress={() => navigation.navigate("RecoverPassword")}
          >
            <LinkMedium onPress={() => navigation.navigate("RecoverPassword")}>Esqueceu sua senha?</LinkMedium>
          </ButtonSecondary>

          <ButtonBox>
            <Button onPress={(e) => Login()}>
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
          <TextCreateAccount1 onPress={(e) => navigation.replace("CreateAccount")}>Não tem conta ? {""}</TextCreateAccount1>

          <ButtonSecondary
            padding={"0"}
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <TextCreateAccount2>Crie uma conta agora!</TextCreateAccount2>
          </ButtonSecondary>
        </CreateAccountBox>
      </MainContent>
    </Container>
  );
};

export default LoginScreen;
