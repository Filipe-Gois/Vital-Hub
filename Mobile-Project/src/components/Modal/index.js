import React, { useState } from "react";
import { Modal, View } from "react-native";
import { Title } from "../Title/style";
import {
  Paragraph,
  ParagraphSemiBold,
  TextCreateAccount2,
} from "../Paragraph/style";
import { Button, ButtonBorderCyan, ButtonSecondary } from "../Button/style";
import { ButtonTitle, ButtonTitleModal } from "../ButtonTitle/style";
import {
  AgendarConsultaContent,
  AgendarConsultaContentBox,
  ConsultaInfoBoxStyle,
  ConsultaInfoContent,
  ModalContent,
  ModalContentAgendarConsulta,
  ModalImage,
  ModalStyle,
  ModalTextBox,
  PatientModal,
  TitleBox,
} from "./style";
import Nicole from "../../assets/nicole-sarga-modal.png";
import Label from "../Label";
import { ButtonBox, FormBoxModal } from "../Container/style";
import { LabelStyle } from "../Label/style";
import { Theme } from "../../themes";

export const ModalComponent = ({
  visible,
  setShowModalCancel,
  title = "",
  texto1 = "",
  texto2 = "",
  textButton1 = "",
  textButton2 = "",
  cancel = true,
  srcImage = "",
  setNavigation = "",
  onPressNotification,
  navigation,
  HandleModal,

  ...rest
}) => {
  const handleClose = async () => {
    await setShowModalCancel(false);
    if (navigation) {
      navigation.navigation(setNavigation);
    }
  };

  // const HandleModal = () => {
  //   if (navigation) {
  //     navigation.navigate(setNavigation);
  //   }
  //   onPressNotification;
  // };
  return (
    <ModalStyle
      visible={visible}
      transparent={true}
      animationType="fade"
      title=""
      animationOutTiming={0}
      {...rest}
    >
      <PatientModal>
        <ModalContent>
          {!cancel && <ModalImage source={srcImage} />}
          <Title>{title}</Title>

          <ModalTextBox>
            <Paragraph>{texto1}</Paragraph>
            {!cancel && <Paragraph>{texto2}</Paragraph>}
          </ModalTextBox>

          <Button
            onPress={HandleModal}
            // onPress={() =>setShowModalCancel(false)}
            padding={"0"}
          >
            <ButtonTitle>{textButton1}</ButtonTitle>
          </Button>

          <ButtonSecondary onPress={() => handleClose()}>
            <TextCreateAccount2>{textButton2}</TextCreateAccount2>
          </ButtonSecondary>
        </ModalContent>
      </PatientModal>
    </ModalStyle>
  );
};

export const ModalAgendarConsulta = ({
  visible,
  setShowModalCancel,
  title = "",
  texto = "",
  textButton1 = "",
  textButton2 = "",
  cancel = true,
  srcImage = Nicole,
  navigation,
  setNavigation,
  goBack = false,
  ...rest
}) => {
  const [statusList, setStatusList] = useState();
  return (
    <ModalStyle
      visible={visible}
      transparent={true}
      animationType="fade"
      title=""
      {...rest}
    >
      <AgendarConsultaContent>
        <FormBoxModal>
          <Title>{title}</Title>

          <LabelStyle>
            <ParagraphSemiBold>Qual o nível da consulta</ParagraphSemiBold>

            <ButtonBox fieldFlexDirection={"row"}>
              <ButtonBorderCyan
                clickButton={statusList === "Rotina"}
                onPress={() => setStatusList("Rotina")}
                fieldWidth={"30%"}
              >
                <ButtonTitleModal clickButton={statusList === "Rotina"}>
                  Rotina
                </ButtonTitleModal>
              </ButtonBorderCyan>

              <ButtonBorderCyan
                clickButton={statusList === "Exame"}
                onPress={() => setStatusList("Exame")}
                fieldWidth={"30%"}
              >
                <ButtonTitleModal clickButton={statusList === "Exame"}>
                  Exame
                </ButtonTitleModal>
              </ButtonBorderCyan>

              <ButtonBorderCyan
                clickButton={statusList === "Urgencia"}
                onPress={() => setStatusList("Urgencia")}
                fieldWidth={"29%"}
              >
                <ButtonTitleModal clickButton={statusList === "Urgencia"}>
                  Urgência
                </ButtonTitleModal>
              </ButtonBorderCyan>
            </ButtonBox>
          </LabelStyle>

          <Label
            titulo="Informe a localização desejada"
            placeholder={"Informe a localização"}
          />

          <Button
            onPress={() =>
              goBack ? navigation.goBack() : navigation.navigate(setNavigation)
            }
            padding={"0"}
          >
            <ButtonTitle>{textButton1}</ButtonTitle>
          </Button>

          <ButtonSecondary onPress={() => setShowModalCancel(false)}>
            <TextCreateAccount2>{textButton2}</TextCreateAccount2>
          </ButtonSecondary>
        </FormBoxModal>
      </AgendarConsultaContent>
    </ModalStyle>
  );
};

export const ModalConfirmarAgendamento = ({
  visible,
  setShowModalCancel,
  title = "",
  texto1 = "",
  texto2 = "",
  textButton1 = "",
  textButton2 = "",
  cancel = true,
  srcImage = Nicole,
  navigation,
  setNavigation = "",
  goBack = false,
  ...rest
}) => {
  return (
    <ModalStyle
      visible={visible}
      transparent={true}
      animationType="fade"
      title=""
      {...rest}
    >
      <PatientModal>
        <ModalContentAgendarConsulta>
          <TitleBox>
            <Title>Agendar consulta</Title>

            <Paragraph>
              Consulte os dados selecionados para a sua consulta
            </Paragraph>
          </TitleBox>

          <ConsultaInfoContent>
            <ConsultaInfoBox
              title="Data da consulta"
              info="1 de Novembro de 2023"
            />
            <ConsultaInfoBox
              title="Médico(a) da consulta"
              info="Dra Alessandra"
              doctor={true}
              especialidade1="Demartologa"
              especialidade2="Esteticista"
            />
            <ConsultaInfoBox title="Local da consulta" info="São Paulo, SP" />
            <ConsultaInfoBox title="Tipo da consulta" info="Rotina" />
          </ConsultaInfoContent>

          <Button
            onPress={() =>
              goBack ? navigation.goBack() : navigation.replace(setNavigation)
            }
          >
            <ButtonTitle>Confirmar</ButtonTitle>
          </Button>

          <ButtonSecondary onPress={() => setShowModalCancel(false)}>
            <TextCreateAccount2>Cancelar</TextCreateAccount2>
          </ButtonSecondary>
        </ModalContentAgendarConsulta>
      </PatientModal>
    </ModalStyle>
  );
};

const ConsultaInfoBox = ({
  title = "",
  info = "",
  doctor = false,
  especialidade1 = "",
  especialidade2 = "",
}) => {
  return (
    <ConsultaInfoBoxStyle>
      <ParagraphSemiBold>{title}</ParagraphSemiBold>
      <Paragraph textAlign={"left"}>{info}</Paragraph>
      {doctor ? (
        <Paragraph textAlign={"left"}>
          {especialidade1}, {especialidade2}
        </Paragraph>
      ) : null}
    </ConsultaInfoBoxStyle>
  );
};
