import {
  Container,
  FormBox,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import { BannerUserComponent } from "../../components/BannerUser";
import UserImage from "../../assets/UserProfileImage.jpg";
import { Button, ButtonSecondary } from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import Label from "../../components/Label";
import { TextCreateAccount2 } from "../../components/Paragraph/style";

const DoctorHomeScreen = ({ navigation }) => {
  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <BannerUserComponent
            src={UserImage}
            name="Richard Kosta"
            // isUser={false}
            // specialty="Clínico geral"
            // crm="123123"
            age="22 anos"
            email="richard.kosta@gmail.com"
          />

          <FormBox>
            <Label
              titulo="Descrição da consulta"
              placeholder={"Diagnóstico"}
              fieldHeight={121}
            />
            <Label titulo="Diagnóstico do paciente" placeholder={"Descrição"} />
            <Label
              titulo="Prescrição médica"
              placeholder={"Prescrição médica"}
              fieldHeight={121}
            />

            <Button>
              <ButtonTitle>Salvar</ButtonTitle>
            </Button>

            <ButtonSecondary padding={"0"} onPress={() => navigation.goBack()}>
              <TextCreateAccount2>Cancelar</TextCreateAccount2>
            </ButtonSecondary>
          </FormBox>
        </MainContent>
      </MainContentScroll>
    </Container>
  );
};
export default DoctorHomeScreen;
