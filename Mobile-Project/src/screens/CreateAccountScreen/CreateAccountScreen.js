import { Alert, Text, TextInput } from "react-native";
import api, {
  apiFilipe,
  loginResource,
  pacientesResource,
} from "../../Services/Service";
import { Button, ButtonSecondary } from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import {
  Container,
  FormBox,
  InputBox,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import { Input, InputEmail, InputPassword } from "../../components/Input";
import { LogoComponent } from "../../components/Logo";
import {
  Paragraph,
  TextCreateAccount2,
} from "../../components/Paragraph/style";
import { Title } from "../../components/Title/style";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonAsync } from "../../components/Button";
import DialogComponent from "../../components/Dialog/Dialog";

const CreateAccountScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [loginError, setLoginError] = useState(false);

  const [dialog, setDialog] = useState({});

  const [showDialog, setShowDialog] = useState(false);

  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senhaVisivelConfirmar, setSenhaVisivelConfirmar] = useState(false);

  const HandleSubmit = async () => {
    setLoading(true);
    try {
      if (
        user.email.trim() === "" ||
        user.nome.trim() === "" ||
        user.senha.trim() === ""
      ) {
        setDialog({
          status: "alerta",
          contentMessage: "Preencha todos os campos!",
        });
        setShowDialog(true);
        setLoading(false);
        return;
      }

      if (user.senha !== confirmPassword) {
        setDialog({
          status: "alerta",
          contentMessage: "As senhas devem ser iguais!",
        });
        setLoading(false);
        setShowDialog(true);
        return;
      }

      //idTipoUsuario já é setado automaticamente na api
      const responseCreateAccount = await apiFilipe.post(
        pacientesResource,
        user
      );

      if (responseCreateAccount.status !== 200) {
        setDialog({
          status: "erro",
          contentMessage: "Erro ao criar conta.",
        });
        setShowDialog(true);
        return;
      }

      //essa parte é responsável por logar o usuário na conta que acabou de ser criada

      const responseLogin = await apiFilipe.post(loginResource, user);

      await AsyncStorage.setItem("token", JSON.stringify(responseLogin.data));

      navigation.replace("Perfil");
    } catch (error) {
      setDialog({
        status: "erro",
        contentMessage: "Erro ao criar conta.",
      });
      setShowDialog(true);
    }
    setLoading(false);
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
        {...dialog}
        visible={showDialog}
        setVisible={setShowDialog}
        setDialog={setDialog}
      />
      <MainContentScroll>
        <MainContent>
          <LogoComponent />
          <FormBox>
            <Title>Criar conta</Title>
            <Paragraph>
              Insira seu endereço de e-mail e senha para realizar seu cadastro.
            </Paragraph>

            <InputBox gap={"10px"}>
              <Input
                // keyType={"email-address"}
                onChangeText={(txt) => setUser({ ...user, nome: txt })}
                fieldValue={user.nome}
                placeholder={"Nome:"}
              />

              <InputEmail
                visible={loginError}
                value={user.email}
                onChangeText={(txt) => {
                  setUser({ ...user, email: txt });
                  handleErrors();
                }}
              />

              <InputPassword
                label={"Senha"}
                senhaVisivel={senhaVisivel}
                setSenhaVisivel={setSenhaVisivel}
                value={user.senha}
                onChangeText={(txt) => setUser({ ...user, senha: txt })}
              />

              <InputPassword
                label={"Confirmar senha"}
                senhaVisivel={senhaVisivelConfirmar}
                setSenhaVisivel={setSenhaVisivelConfirmar}
                value={confirmPassword}
                onChangeText={(txt) => setconfirmPassword(txt)}
              />
            </InputBox>

            <ButtonAsync
              buttonAtivado={
                !loginError &&
                user.email &&
                user.senha &&
                user.nome &&
                confirmPassword
              }
              onPress={
                !loginError &&
                user.email &&
                user.senha &&
                user.nome &&
                confirmPassword
                  ? () => HandleSubmit()
                  : null
              }
              disabled={loading}
              loading={loading}
              textButton={"CADASTRAR"}
            />

            <ButtonSecondary padding={"0"} onPress={() => navigation.goBack()}>
              <TextCreateAccount2>Cancelar</TextCreateAccount2>
            </ButtonSecondary>
          </FormBox>
        </MainContent>
      </MainContentScroll>
    </Container>
  );
};

export default CreateAccountScreen;
