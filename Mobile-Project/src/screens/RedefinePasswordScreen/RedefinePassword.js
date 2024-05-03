import { useState } from "react";
import { apiFilipe, apiGabriel, usuarioResource } from "../../Services/Service";
import { Button } from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import {
  Container,
  FormBox,
  InputBox,
  MainContent,
} from "../../components/Container/style";
import { Input } from "../../components/Input";
import { LogoComponent } from "../../components/Logo";
import { Paragraph } from "../../components/Paragraph/style";
import { Title } from "../../components/Title/style";
import { LeftArrowAOrXComponent } from "../../components/LeftArrowAOrX";
import { Alert } from "react-native";

const RedefinePasswordScreen = ({ navigation, route }) => {
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const AlterarSenha = async () => {
    if (senha === confirmar) {
      await apiFilipe
        .put(
          `${usuarioResource}/AlterarSenha?email=${route.params.emailRecuperacao}`,
          {
            senhaNova: senha,
          }
        )
        .then(() => {
          navigation.replace("Login");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert("Ops!", "Senhas incompatíveis!");
    }
  };

  return (
    <Container>
      <MainContent>
        <LeftArrowAOrXComponent isLefArrow={false} navigation={navigation} />
        <LogoComponent />
        <FormBox>
          <Title>Redefinir senha</Title>
          <Paragraph>Insira e confirme a sua nova senha</Paragraph>
          <InputBox gap={"20px"}>
            <Input
              placeholder={"Nova Senha"}
              value={senha}
              onChangeText={(txt) => setSenha(txt)}
            />
            <Input
              placeholder={"Confirmar nova senha"}
              value={confirmar}
              onChangeText={(txt) => setConfirmar(txt)}
            />
          </InputBox>
          <Button onPress={() => AlterarSenha()}>
            <ButtonTitle>CONFIRMAR NOVA SENHA</ButtonTitle>
          </Button>
        </FormBox>
      </MainContent>
    </Container>
  );
};

export default RedefinePasswordScreen;
