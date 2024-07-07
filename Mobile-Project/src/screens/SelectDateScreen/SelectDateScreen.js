import React, { useEffect, useState } from "react";
import {
  Container,
  FormBox,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import {
  Button,
  ButtonActive,
  ButtonSecondary,
} from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import {
  ParagraphSemiBold,
  TextCreateAccount2,
} from "../../components/Paragraph/style";
import { Theme } from "../../themes";
import { Title } from "../../components/Title/style";
import CalendarMaximized from "../../components/CalendarMaximized";
import { InputSelectHours } from "../../components/Input";
import { LabelStyle } from "../../components/Label/style";
import { ModalConfirmarAgendamento } from "../../components/Modal";
import { Text, View } from "react-native";
import TimeInput from "@tighten/react-native-time-input";

const SelectDateScreen = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);

  const [dateSelected, setDateSelected] = useState("");
  const [horaSelecionada, setHoraSelecionada] = useState("");
  const [agendamento, setAgendamento] = useState(null);

  const handleContinue = async () => {
    setAgendamento({
      ...route.params,
      dataConsulta: `${dateSelected} ${horaSelecionada}`,
    });
    setShowModal(true);
  };

  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <FormBox margin={"30px 0 0 0"}>
            <Title>Selecionar data</Title>

            <CalendarMaximized
              selected={dateSelected}
              setSelected={setDateSelected}
            />

            <LabelStyle>
              <ParagraphSemiBold color={Theme.colors.blackColor}>
                Selecione um horário disponível
              </ParagraphSemiBold>

              <InputSelectHours setHoraSelecionada={setHoraSelecionada} />
            </LabelStyle>

            <ButtonActive
              buttonAtivado={dateSelected && horaSelecionada}
              onPress={dateSelected && horaSelecionada ? handleContinue : null}
              padding={"0"}
            >
              <ButtonTitle>Confirmar</ButtonTitle>
            </ButtonActive>

            <ButtonSecondary onPress={() => navigation.goBack()}>
              <TextCreateAccount2>Cancelar</TextCreateAccount2>
            </ButtonSecondary>
          </FormBox>
        </MainContent>
      </MainContentScroll>

      <ModalConfirmarAgendamento
        agendamento={agendamento}
        visible={showModal}
        setShowModalCancel={setShowModal}
        navigation={navigation}
        setNavigation="Main"
      />
    </Container>
  );
};

export default SelectDateScreen;
