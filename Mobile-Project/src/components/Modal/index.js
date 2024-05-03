import React, { useEffect, useState } from "react";
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
import moment from "moment";
import { apiFilipe, consultasResource } from "../../Services/Service";
import { userDecodeToken } from "../../Utils/Auth";

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
      //senai
      prioridadeId: "283600B3-EFD3-4E58-B7A7-C8DE22A48839",
      //casa
      // prioridadeId: "CD8C8459-0951-47E3-8791-EA3CEBF4A772",
      prioridadeLabel: "Rotina",
    },
    exame: {
      //senai
      prioridadeId: "76C4AAC2-E570-4985-97EA-F9BC5ECD280C",
      //casa
      // prioridadeId: "060D1BE9-0140-4371-92A8-DBDED76ABC9B",
      prioridadeLabel: "Exame",
    },
    urgencia: {
      //senai
      prioridadeId: "790307E0-E8E9-443A-8E57-A5BA87934EEC",
      //casa
      // prioridadeId: "0FF3D388-012E-4BC9-85D5-F6D80DB63B0D",
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
                  agendamento.prioridadeId ===
                  niveisPrioridade.rotina.prioridadeId
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
  agendamento,
  ...rest
}) => {
  const [profile, setProfile] = useState({});

  const profileLoad = async () => {
    try {
      const token = await userDecodeToken();

      if (token) {
        setProfile(token);
      }
    } catch (error) {}
  };

  const handleConfirm = async () => {
    try {
      const response = await apiFilipe.post(
        `${consultasResource}/Cadastrar`,
        { ...agendamento },
        //a situação já é setada como pendente automaticamente na api

        { headers: { Authorization: `Bearer ${profile.token}` } }
      );

      if (response.status === 201) {
        Alert.alert("Sucesso", "Consulta agendada!");
        navigation.replace("Main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    profileLoad();

    return (cleanUp = () => {});
  }, []);

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

          {agendamento && (
            <ConsultaInfoContent>
              <ConsultaInfoBox
                title="Data da consulta"
                info={moment(agendamento.dataConsulta).format(
                  `DD/MM/YYYY HH:mm`
                )}
              />
              <ConsultaInfoBox
                title="Médico(a) da consulta"
                info={agendamento.medicoNome}
                doctor={true}
                especialidade1={agendamento.medicoEspecialidade}
              />
              <ConsultaInfoBox
                title="Local da consulta"
                info={agendamento.localizacao}
              />
              <ConsultaInfoBox
                title="Tipo da consulta"
                info={agendamento.prioridadeLabel}
              />
            </ConsultaInfoContent>
          )}

          <Button
            onPress={() => (goBack ? navigation.goBack() : handleConfirm())}
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
      {doctor && <Paragraph textAlign={"left"}>{especialidade1}</Paragraph>}
    </ConsultaInfoBoxStyle>
  );
};
