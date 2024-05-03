import React, { useRef, useState } from "react";
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
import {
  apiFilipe,
  apiGabriel,
  recuperarSenhaResource,
} from "../../Services/Service";
import { Text } from "react-native";

const CheckEmailScreen = ({ navigation, route }) => {
  const [codigo, setCodigo] = useState("");
  const [focusedInput, setFocusedInput] = useState(0);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  function focusNextInput(index) {
    if (index < inputRefs.length - 1) {
      console.log(inputRefs);
      inputRefs[index + 1].current.focus();
    }
  }

  function focusPrevInput(index) {
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }
  }

  function InserirCodigo(event) {
    if (event.nativeEvent.key === "Backspace" && focusedInput > 0) {
      setFocusedInput(focusedInput - 1);
    } else if (
      event.nativeEvent.key.length === 1 &&
      (event.nativeEvent.key.match(/[0-9]/) || event.nativeEvent.key === "0") &&
      focusedInput < 3
    ) {
      setCodigo((prevCodigo) => prevCodigo + event.nativeEvent.key);
      setFocusedInput(focusedInput + 1);
    }
  }

  const validarCodigo = async () => {
    try {
      const response = await apiFilipe.post(
        `${recuperarSenhaResource}/ValidarCodigo?email=${route.params.emailRecuperacao}&codigo=${codigo}`
      );
      console.log(response.data);
      navigation.replace("RedefinePassword", {
        emailRecuperacao: route.params.emailRecuperacao,
      });
    } catch (error) {
      console.log(error);
      console.log(route.params.emailRecuperacao);
      console.log(codigo);
    }
  };

  return (
    <Container>
      <MainContent>
        <LeftArrowAOrXComponent isLefArrow={false} navigation={navigation} />
        <LogoComponent />

        <FormBox>
          <Title>Verifique seu e-mail</Title>

          <ContainerText>
            <Paragraph>Digite o código de 4 dígitos enviado para </Paragraph>
            <UserEmailText>{route.params.emailRecuperacao}</UserEmailText>
          </ContainerText>

          <InputBoxCheckEmail>
            {[0, 1, 2, 3].map((index) => (
              <InputCheckEmail
                inputRef={inputRefs[index]}
                key={index}
                placeholder={"0"}
                fieldWidth={18}
                fieldHeight={62}
                maxLength={1}
                value={codigo[index]}
                // onFocus={() => focusInput(index)}
                onChangeText={(txt) => {
                  if (txt == "") {
                    focusPrevInput(index);
                  } else {
                    const novoCodigo = [...codigo];
                    novoCodigo[index] = txt;
                    setCodigo(novoCodigo.join(""));

                    focusNextInput(index);
                  }
                }}
                onKeyPress={InserirCodigo}
              />
            ))}
          </InputBoxCheckEmail>
          <Text>{codigo[0]}</Text>
          <Text>{codigo[1]}</Text>
          <Text>{codigo[2]}</Text>
          <Text>{codigo[3]}</Text>

          <Button onPress={() => validarCodigo(codigo)}>
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

export default CheckEmailScreen;
