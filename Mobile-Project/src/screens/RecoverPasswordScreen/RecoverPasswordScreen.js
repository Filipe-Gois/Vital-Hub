import React, { useEffect, useState } from "react";
import { Text, Alert } from "react-native";
import {
  Container,
  FormBox,
  MainContent,
} from "../../components/Container/style";
import { LogoComponent } from "../../components/Logo";
import { Title } from "../../components/Title/style";
import { Paragraph } from "../../components/Paragraph/style";
import { Input, InputEmail } from "../../components/Input";
import { Button } from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import { LeftArrowAOrXComponent } from "../../components/LeftArrowAOrX";
import {
  apiFilipe,
  apiGabriel,
  recuperarSenhaResource,
} from "../../Services/Service";
import { ButtonAsync } from "../../components/Button";
import DialogComponent from "../../components/Dialog/Dialog";

const RecoverPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dialog, setDialog] = useState({});

  const [showDialog, setShowDialog] = useState(false);

  const enviarEmail = async () => {
    setLoading(true);
    try {
      if (!email) {
        Alert.alert("Alerta", "Preencha o campo de e-mail.");
      }

      const response = await apiFilipe.post(
        `${recuperarSenhaResource}?email=${email}`
      );

      if (response.data) {
        // Após o envio do email navegar para a próxima tela
        navigation.navigate("CheckEmail", { emailRecuperacao: email });
      }
    } catch (error) {
      setDialog({
        status: "erro",
        contentMessage: "Email inválido!",
      });
      setShowDialog(true);
    }
    setLoading(false);
  };

  const handleErrors = () => {
    setLoginError(!email.includes("@") && email);
  };

  useEffect(() => {
    setLoginError(!email.includes("@") && email);
  }, [email]);

  return (
    <Container>
      <DialogComponent
        {...dialog}
        visible={showDialog}
        setVisible={setShowDialog}
        setDialog={setDialog}
      />
      <MainContent fieldMargin={"20px 0 90px 0"} fieldWidth={"90%"}>
        <LeftArrowAOrXComponent navigation={navigation} />

        <LogoComponent />

        <FormBox fieldWidth={"100%"}>
          <Title>Recuperar senha</Title>
          <Paragraph>
            Digite abaixo seu email cadastrado que enviaremos um link para
            recuperação de senha
          </Paragraph>

          <InputEmail
            visible={loginError}
            value={email}
            onChangeText={(txt) => {
              setEmail(txt);
              handleErrors();
            }}
          />

          <ButtonAsync
            buttonAtivado={!loginError && email}
            onPress={!loginError && email ? () => enviarEmail() : null}
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
