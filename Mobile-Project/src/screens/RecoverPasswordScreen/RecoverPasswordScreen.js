import React, { useState } from "react";
import { Text, Alert } from "react-native";
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
import {
  apiFilipe,
  apiGabriel,
  recuperarSenhaResource,
} from "../../Services/Service";
import { ButtonAsync } from "../../components/Button";

const RecoverPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarEmail = async () => {
    setLoading(true);
    try {
      const response = await apiFilipe.post(
        `${recuperarSenhaResource}?email=${email}`
      );

      if (response.data) {
        // Após o envio do email navegar para a próxima tela
        navigation.navigate("CheckEmail", { emailRecuperacao: email });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <MainContent fieldMargin={"50px 0 90px 0"} fieldWidth={"90%"}>
        <LeftArrowAOrXComponent navigation={navigation} />

        <LogoComponent />

        <FormBox fieldWidth={"100%"}>
          <Title>Recuperar senha</Title>
          <Paragraph>
            Digite abaixo seu email cadastrado que enviaremos um link para
            recuperação de senha
          </Paragraph>

          <Input
            placeholder={"Usuário ou E-mail"}
            fieldValue={email}
            onChangeText={(txt) => setEmail(txt)}
          />

          <ButtonAsync
            onPress={() => enviarEmail()}
            disabled={loading}
            loading={loading}
            textButton={"Continuar"}
          />
        </FormBox>
      </MainContent>
    </Container>
  );
};

export default RecoverPasswordScreen;
