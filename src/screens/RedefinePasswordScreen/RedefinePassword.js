import { Image } from "react-native";
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

const RedefinePasswordScreen = ({ navigation }) => {
  return (
    <Container>
      <MainContent>
        <LeftArrowAOrXComponent isLefArrow={false} navigation={navigation} />

        <LogoComponent />

        <FormBox>
          <Title>Redefinir senha</Title>
          <Paragraph>Insira e confirme a sua nova senha</Paragraph>

          <InputBox gap={"20px"}>
            <Input placeholder={"Nova Senha"} />
            <Input placeholder={"Confirmar nova senha"} />
          </InputBox>

          <Button onPress={() => navigation.replace("Login")}>
            <ButtonTitle>CONFIRMAR NOVA SENHA</ButtonTitle>
          </Button>
        </FormBox>
      </MainContent>
    </Container>
  );
};
export default RedefinePasswordScreen;
