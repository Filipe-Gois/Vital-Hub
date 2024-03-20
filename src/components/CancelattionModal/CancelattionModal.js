import React from "react";
import { Modal, View } from "react-native";
import { Title } from "../Title/style";
import { Paragraph, TextCreateAccount2 } from "../Paragraph/style";
import { Button, ButtonSecondary } from "../Button/style";
import { ButtonTitle } from "../ButtonTitle/style";
import { ModalContent, ModalStyle, PatientModal } from "./style";

export const CancelattionModal = ({ visible, setShowModalCancel, ...rest }) => {
  return (
    <ModalStyle
      {...rest}
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <PatientModal>
        <ModalContent>
          <Title>Cancelar consulta</Title>
          <Paragraph>
            Ao cancelar essa consulta, abrirá uma possível disponibilidade no
            seu horário, deseja mesmo cancelar essa consulta?
          </Paragraph>
          <Button padding={"0"} >
            <ButtonTitle>Confirmar</ButtonTitle>
          </Button>

          <ButtonSecondary onPress={() => setShowModalCancel(false)}>
            <TextCreateAccount2>Cancelar</TextCreateAccount2>
          </ButtonSecondary>
        </ModalContent>
      </PatientModal>
    </ModalStyle>
  );
};
