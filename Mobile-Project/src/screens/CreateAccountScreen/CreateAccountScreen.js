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
import { Input } from "../../components/Input";
import { LogoComponent } from "../../components/Logo";
import {
  Paragraph,
  TextCreateAccount2,
} from "../../components/Paragraph/style";
import { Title } from "../../components/Title/style";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonAsync } from "../../components/Button";

const CreateAccountScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const HandleSubmit = async () => {
    setLoading(true);
    try {
      if (
        user.email.trim() === "" ||
        user.nome.trim() === "" ||
        user.senha.trim() === ""
      ) {
        Alert.alert("Erro!", "Preencha todos os campos!");
        return;
      }

      if (user.senha !== confirmPassword) {
        Alert.alert("Erro!", "OPS!", "As senhas devem ser iguais!");
        return;
      }

      //idTipoUsuario já é setado automaticamente na api
      const responseCreateAccount = await apiFilipe.post(
        pacientesResource,
        user
      );

      if (responseCreateAccount.status !== 200) {
        Alert.alert("Erro!", "Erro ao criar conta.");
        return;
      }

      //essa parte é responsável por logar o usuário na conta que acabou de ser criada

      const responseLogin = await apiFilipe.post(loginResource, user);

      await AsyncStorage.setItem("token", JSON.stringify(responseLogin.data));

      navigation.replace("Perfil");
    } catch (error) {
      Alert.alert("OPS!", "Já existe um usuário com esse Email!");
    }
    setLoading(false);
  };

  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <LogoComponent />
          <FormBox>
            <Title>Criar conta</Title>
            <Paragraph>
              Insira seu endereço de e-mail e senha para realizar seu cadastro.
            </Paragraph>

            <InputBox gap={"20px"}>
              <Input
                // keyType={"email-address"}
                onChangeText={(txt) => setUser({ ...user, nome: txt })}
                fieldValue={user.nome}
                placeholder={"Nome:"}
              />

              <Input
                keyType={"email-address"}
                onChangeText={(txt) => setUser({ ...user, email: txt })}
                fieldValue={user.email}
                placeholder={"E-mail"}
              />

              <Input
                secureTextEntry={hidePassword}
                // keyType={"visible-password"}
                onChangeText={(txt) => setUser({ ...user, senha: txt })}
                fieldValue={user.senha}
                placeholder={"Senha"}
              />

              <Input
                secureTextEntry={hidePassword}
                // keyType={"visible-password"}
                onChangeText={(txt) => setconfirmPassword(txt)}
                fieldValue={confirmPassword}
                placeholder={"Confirmar Senha"}
              />
            </InputBox>

            <ButtonAsync
              onPress={() => HandleSubmit()}
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
