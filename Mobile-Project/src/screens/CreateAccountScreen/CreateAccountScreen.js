import { Alert, Text, TextInput } from "react-native";
import api, { loginResource, pacientesResource } from "../../Services/Service";
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

const CreateAccountScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [user, setUser] = useState({
    rg: "449574398",
    cpf: "45459168481",
    dataNascimento: "1990-02-14",
    cep: "77001213",
    logradouro: "Plano Diretor Norte",
    numero: 114,
    nome: "",
    email: "",
    senha: "",
    idTipoUsuario: "F727FBD3-03E9-467E-81B5-E2DBA9E70CD4",
    foto: "12321312312",
  });
  const HandleSubmit = async () => {
    try {
      if (user.senha !== confirmPassword) {
        console.log("OPS!", "As senhas devem ser iguais!");
        return;
      }

      const responseCreateAccount = await api.post(pacientesResource, user);

      if (responseCreateAccount.status !== 200) {
        console.log("Erro ao criar conta.");
        return;
      }

      //essa parte é responsável por logar o usuário na conta que acabou de ser criada

      const responseLogin = await api.post(loginResource, user);

      console.log("Token: ", responseLogin.data);

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

            <Button onPress={() => HandleSubmit()}>
              <ButtonTitle>CADASTRAR</ButtonTitle>
            </Button>

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
