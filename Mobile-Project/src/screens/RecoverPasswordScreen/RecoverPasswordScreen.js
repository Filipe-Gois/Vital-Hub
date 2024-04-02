import { Text } from "react-native";
import {
  Container,
  FormBox,
  MainContent,
} from "../../components/Container/style";
import { LogoComponent } from "../../components/Logo";
import { Title } from "../../components/Title/style";
import { Paragraph } from "../../components/Paragraph/style";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import { LeftArrowAOrXComponent } from "../../components/LeftArrowAOrX";

const RecoverPasswordScreen = ({ navigation }) => {
  return (
    <Container>
      <MainContent>
        <LeftArrowAOrXComponent navigation={navigation} />

        <LogoComponent />

        <FormBox>
          <Title>Recuperar senha</Title>
          <Paragraph>
            Digite abaixo seu email cadastrado que enviaremos um link para
            recuperação de senha
          </Paragraph>

          <Input placeholder={"Usuário ou E-mail"} />
          <Button onPress={() => navigation.navigate("CheckEmail")}>
            <ButtonTitle>Continuar</ButtonTitle>
          </Button>
        </FormBox>
      </MainContent>
    </Container>
  );
};

export default RecoverPasswordScreen;
