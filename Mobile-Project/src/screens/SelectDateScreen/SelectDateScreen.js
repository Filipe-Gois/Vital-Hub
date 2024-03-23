import React, { useState } from "react";
import {
  Container,
  FormBox,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import { Button, ButtonSecondary } from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import {
  ParagraphSemiBold,
  TextCreateAccount2,
} from "../../components/Paragraph/style";
import { Theme } from "../../themes";
import { Title } from "../../components/Title/style";
import CalendarMaximized from "../../components/CalendarMaximized";
import { InputSelect } from "../../components/Input";
import { LabelStyle } from "../../components/Label/style";
import { ModalConfirmarAgendamento } from "../../components/Modal";

const SelectDateScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <FormBox margin={"30px 0 0 0"}>
            <Title>Selecionar clínica</Title>

            <CalendarMaximized />

            <LabelStyle>
              <ParagraphSemiBold color={Theme.colors.blackColor}>
                Selecione um horário disponível
              </ParagraphSemiBold>

              <InputSelect />
            </LabelStyle>

            <Button onPress={() => setShowModal(true)} padding={"0"}>
              <ButtonTitle>Continuar</ButtonTitle>
            </Button>

            <ButtonSecondary onPress={() => navigation.goBack()}>
              <TextCreateAccount2>Cancelar</TextCreateAccount2>
            </ButtonSecondary>
          </FormBox>
        </MainContent>
      </MainContentScroll>

      <ModalConfirmarAgendamento
        visible={showModal}
        setShowModalCancel={setShowModal}
        navigation={navigation}
        setNavigation="Main"
      />
    </Container>
  );
};

export default SelectDateScreen;
