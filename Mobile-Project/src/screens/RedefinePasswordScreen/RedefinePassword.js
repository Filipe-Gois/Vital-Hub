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
import { ButtonAsync } from "../../components/Button";

const RedefinePasswordScreen = ({ navigation, route }) => {
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [loading, setLoading] = useState(false);

  const alterarSenha = async () => {
    setLoading(true);
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
        .catch((error) => {});
    } else {
      Alert.alert("Ops!", "Senhas incompatíveis!");
    }
    setLoading(false);
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

          <ButtonAsync
            onPress={() => alterarSenha()}
            disabled={loading}
            loading={loading}
            textButton={"CONFIRMAR NOVA SENHA"}
          />
        </FormBox>
      </MainContent>
    </Container>
  );
};

export default RedefinePasswordScreen;
