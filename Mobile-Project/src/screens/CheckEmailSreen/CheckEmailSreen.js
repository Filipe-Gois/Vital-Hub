import { useState } from "react";
import {
  Container,
  ContainerText,
  FormBox,
  InputBoxCheckEmail,
  MainContent,
} from "../../components/Container/style";
import { LogoComponent } from "../../components/Logo";
import {
  Paragraph,
  TextCreateAccount2,
  UserEmailText,
} from "../../components/Paragraph/style";
import { Title } from "../../components/Title/style";
import { Input, InputCheckEmail } from "../../components/Input";
import { Button, ButtonSecondary } from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import { LeftArrowAOrXComponent } from "../../components/LeftArrowAOrX";

const CheckEmailSreen = ({ navigation }) => {
  const [user, setUser] = useState({
    userEmail: "username@email.com",
    number1: 0,
    number2: 0,
    number3: 0,
    number4: 0,
  });
  return (
    <Container>
      <MainContent>
        <LeftArrowAOrXComponent isLefArrow={false} navigation={navigation} />
        <LogoComponent />

        <FormBox>
          <Title>Verifique seu e-mail</Title>

          <ContainerText>
            <Paragraph>Digite o código de 4 dígitos enviado para </Paragraph>
            <UserEmailText>{user.userEmail}</UserEmailText>
          </ContainerText>

          <InputBoxCheckEmail>
            <InputCheckEmail
              placeholder={"0"}
              fieldWidth={18}
              fieldHeight={62}
              maxLength={1}
              keyType={"numeric"}
              fieldValue={user.number1}
            />
            <InputCheckEmail
              fieldHeight={62}
              placeholder={"0"}
              fieldWidth={18}
              maxLength={1}
              keyType={"numeric"}
              fieldValue={user.number2}
            />
            <InputCheckEmail
              fieldHeight={62}
              placeholder={"0"}
              fieldWidth={18}
              maxLength={1}
              keyType={"numeric"}
              fieldValue={user.number3}
            />
            <InputCheckEmail
              fieldHeight={62}
              placeholder={"0"}
              fieldWidth={18}
              maxLength={1}
              keyType={"numeric"}
              fieldValue={user.number4}
            />
          </InputBoxCheckEmail>

          <Button onPress={() => navigation.navigate("RedefinePassword")}>
            <ButtonTitle>ENTRAR</ButtonTitle>
          </Button>

          <ButtonSecondary padding={"0"} onPress={() => navigation.goBack()}>
            <TextCreateAccount2>Cancelar</TextCreateAccount2>
          </ButtonSecondary>
        </FormBox>
      </MainContent>
    </Container>
  );
};

export default CheckEmailSreen;
