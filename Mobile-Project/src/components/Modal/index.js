import React, { useState } from "react";
import { Alert, Modal, View } from "react-native";
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
  consulta,
  roleUsuario,
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

  const handlePress = (rota) => {
    navigation.replace(rota, { clinicaId: consulta.medicoClinica.clinicaId });
  };

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
  const [agendamento, setAgendamento] = useState({
    prioridadeId: "",
    prioridadeLabel: "",
    localizacao: "",
  });

  const niveisPrioridade = {
    rotina: {
      prioridadeId: "283600B3-EFD3-4E58-B7A7-C8DE22A48839",
      prioridadeLabel: "Rotina",
    },
    exame: {
      prioridadeId: "76C4AAC2-E570-4985-97EA-F9BC5ECD280C",
      prioridadeLabel: "Exame",
    },
    urgencia: {
      prioridadeId: "790307E0-E8E9-443A-8E57-A5BA87934EEC",
      prioridadeLabel: "Urgência",
    },
  };

  const handleContinue = async () => {
    if (
      (agendamento.prioridadeId !== "" && agendamento.localizacao !== "") ||
      agendamento.localizacao !== undefined
    ) {
      await setShowModalCancel(false);
      navigation.navigate("SelectClinic", agendamento);
      setAgendamento({});
    } else {
      Alert.alert("Insira todos os dados!");
    }
  };
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

            {/* <ButtonTitleModal>{agendamento}</ButtonTitleModal> */}

            <ButtonBox fieldFlexDirection={"row"}>
              <ButtonBorderCyan
                clickButton={
                  agendamento.prioridadeId === niveisPrioridade.rotina.prioridadeId
                }
                onPress={() =>
                  setAgendamento({
                    ...agendamento,
                    prioridadeId: niveisPrioridade.rotina.prioridadeId,
                    prioridadeLabel: niveisPrioridade.rotina.prioridadeLabel,
                  })
                }
                fieldWidth={"30%"}
              >
                <ButtonTitleModal
                  clickButton={
                    agendamento.prioridadeId ===
                    niveisPrioridade.rotina.prioridadeId
                  }
                >
                  Rotina
                </ButtonTitleModal>
              </ButtonBorderCyan>

              <ButtonBorderCyan
                clickButton={
                  agendamento.prioridadeId ===
                  niveisPrioridade.exame.prioridadeId
                }
                onPress={() =>
                  setAgendamento({
                    ...agendamento,
                    prioridadeId: niveisPrioridade.exame.prioridadeId,
                    prioridadeLabel: niveisPrioridade.exame.prioridadeLabel,
                  })
                }
                fieldWidth={"30%"}
              >
                <ButtonTitleModal
                  clickButton={
                    agendamento.prioridadeId ===
                    niveisPrioridade.exame.prioridadeId
                  }
                >
                  Exame
                </ButtonTitleModal>
              </ButtonBorderCyan>

              <ButtonBorderCyan
                clickButton={
                  agendamento.prioridadeId ===
                  niveisPrioridade.urgencia.prioridadeId
                }
                onPress={() =>
                  setAgendamento({
                    ...agendamento,
                    prioridadeId: niveisPrioridade.urgencia.prioridadeId,
                    prioridadeLabel: niveisPrioridade.urgencia.prioridadeLabel,
                  })
                }
                fieldWidth={"29%"}
              >
                <ButtonTitleModal
                  clickButton={
                    agendamento.prioridadeId ===
                    niveisPrioridade.urgencia.prioridadeId
                  }
                >
                  Urgência
                </ButtonTitleModal>
              </ButtonBorderCyan>
            </ButtonBox>
          </LabelStyle>

          <Label
            fieldValue={agendamento ? agendamento.localizacao : null}
            titulo="Informe a localização desejada"
            placeholder={"Informe a localização"}
            onChangeText={(txt) => {
              setAgendamento({ ...agendamento, localizacao: txt });
            }}
          />

          <Button
            onPress={() => {
              goBack ? navigation.goBack() : handleContinue();
            }}
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
