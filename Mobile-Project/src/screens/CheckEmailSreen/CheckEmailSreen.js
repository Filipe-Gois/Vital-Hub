import React, { useRef, useState } from "react";
import {
  Container,
  ContainerText,
  FormBox,
  InputBoxCheckEmail,
  MainContent,
  MainContentScroll,
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
  validarCodigoResource,
} from "../../Services/Service";
import { Alert, Text } from "react-native";
import { ButtonAsync } from "../../components/Button";
import DialogComponent from "../../components/Dialog/Dialog";

const CheckEmailScreen = ({ navigation, route }) => {
  const [codigo, setCodigo] = useState("");
  const [focusedInput, setFocusedInput] = useState(0);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [loading, setLoading] = useState(false);

  const [dialog, setDialog] = useState({});
  const [showDialog, setShowDialog] = useState(false);

  const focusNextInput = (index) => {
    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const focusPrevInput = (index) => {
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const inserirCodigo = (e) => {
    if (e.nativeEvent.key === "Backspace" && focusedInput > 0) {
      setFocusedInput(focusedInput - 1);
    } else if (
      e.nativeEvent.key.length === 1 &&
      (e.nativeEvent.key.match(/[0-9]/) || e.nativeEvent.key === "0") &&
      focusedInput < 3
    ) {
      setCodigo((prevCodigo) => prevCodigo + e.nativeEvent.key);
      setFocusedInput(focusedInput + 1);
    }
  };

  const validarCodigo = async () => {
    setLoading(true);
    try {
      const response = await apiFilipe.post(
        `${validarCodigoResource}?email=${route.params.emailRecuperacao}&code=${codigo}`
      );

      navigation.replace("RedefinePassword", {
        emailRecuperacao: route.params.emailRecuperacao,
      });
    } catch (error) {
      setDialog({
        status: "erro",
        contentMessage: "Código inválido!",
      });
      setShowDialog(true);

      setCodigo([]);
      setFocusedInput(0);
    }
    setLoading(false);
  };

  return (
    <Container>
      <DialogComponent
        {...dialog}
        visible={showDialog}
        setVisible={setShowDialog}
        setDialog={setDialog}
      />
      <MainContentScroll>
        <MainContent fieldMargin={"20px 0 90px 0"}>
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
                  keyboardType={"numeric"}
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
                  onKeyPress={inserirCodigo}
                />
              ))}
            </InputBoxCheckEmail>

            {/* <Text>{codigo[0]}</Text>
            <Text>{codigo[1]}</Text>
            <Text>{codigo[2]}</Text>
            <Text>{codigo[3]}</Text>
            <Text>{codigo.split("")}</Text>
             */}

            <ButtonAsync
              // buttonAtivado={
              //   typeof codigo === "string" && codigo.split("").length === 4
              // }
              buttonAtivado={codigo.length === 4}
              onPress={codigo ? () => validarCodigo() : null}
              disabled={loading}
              loading={loading}
              textButton={"ENTRAR"}
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

export default CheckEmailScreen;
