import React, { useState } from "react";
import {
  ButtonBox,
  Container,
  FormBox,
  Line,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import DoctorImage from "../../assets/DoctorBanner.png";
import { BannerUserComponent } from "../../components/BannerUser";
import Label from "../../components/Label";
import { Theme } from "../../themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ButtonSecondary } from "../../components/Button/style";
import {
  ParagraphMA500,
  TextCreateAccount2,
} from "../../components/Paragraph/style";
import { ButtonAqua } from "../../components/Button";
import CameraComponent from "../../components/CameraComponent/CameraComponent";

const ViewMRScreen = ({ navigation }) => {
  const [cameraConfigs, setCameraConfigs] = useState({
    showCameraModal: false,
    uriCameraCapture: "",
  });

  const [showCamera, setShowCamera] = useState(false);
  const [uriCamera, setUriCamera] = useState();
  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <BannerUserComponent
            src={DoctorImage}
            name="Dr. Claudio"
            isUser={false}
            specialty="Clínico geral"
            crm="CRM-15286"
          />

          <FormBox>
            <Label
              textColor={Theme.colors.grayV2}
              border={"none"}
              backGround={Theme.colors.v2LightWhite}
              placeholderTextColor={Theme.colors.grayV2}
              titulo="Descrição da consulta"
              //   fieldValue={
              //     "O paciente possuí uma infecção no ouvido. Necessário repouse de 2 dias e acompanhamento médico constante"
              //   }
              placeholder={"Diagnóstico"}
              fieldHeight={121}
            />
            <Label
              textColor={Theme.colors.grayV2}
              border={"none"}
              backGround={Theme.colors.v2LightWhite}
              placeholderTextColor={Theme.colors.grayV2}
              titulo="Diagnóstico do paciente"
              //   fieldValue={"Infecção no ouvido"}
              placeholder={"Descrição"}
            />
            <Label
              textColor={Theme.colors.grayV2}
              border={"none"}
              backGround={Theme.colors.v2LightWhite}
              placeholderTextColor={Theme.colors.grayV2}
              titulo="Prescrição médica"
              //   fieldValue={
              //     "Medicamento: Advil Dosagem: 50 mg Frequência: 3 vezes ao dia Duração: 3 dias"
              //   }
              placeholder={"Prescrição médica"}
              fieldHeight={121}
            />

            <Label
              textColor={Theme.colors.grayV2}
              border={"none"}
              backGround={Theme.colors.v2LightWhite}
              placeholderTextColor={Theme.colors.grayV2}
              titulo="Exames médicos"
              //   fieldValue={
              //     "Medicamento: Advil Dosagem: 50 mg Frequência: 3 vezes ao dia Duração: 3 dias"
              //   }
              placeholder={"Nenhuma foto informada"}
              fieldHeight={"100%"}
              fieldMinHeight={"111px"}
              fieldTextAlign={"center"}
            />

            <ButtonBox
              fieldFlexDirection={"row"}
              fieldJustifyContent={"space-around"}
            >
              <ButtonAqua
                // onPress={() => {
                //   setCameraConfigs({ ...cameraConfigs, showCameraModal: true });
                //   console.log(cameraConfigs.showCameraModal);
                // }}
                onPress={() => setShowCamera(true)}
              />

              <ButtonSecondary
                fieldWidth={"50%"}
                onPress={() => setShowModalCancel(false)}
              >
                <ParagraphMA500 color={Theme.colors.red}>
                  Cancelar
                </ParagraphMA500>
              </ButtonSecondary>
            </ButtonBox>

            <Line />

            <Label
              textColor={Theme.colors.grayV2}
              border={"none"}
              backGround={Theme.colors.v2LightWhite}
              placeholderTextColor={Theme.colors.grayV2}
              //   titulo="Exames médicos"
              //   fieldValue={
              //     "Medicamento: Advil Dosagem: 50 mg Frequência: 3 vezes ao dia Duração: 3 dias"
              //   }
              placeholder={"Resultado do exame de sangue : tudo normal"}
              fieldHeight={103}
              isTitulo={false}
            />

            <ButtonSecondary onPress={() => navigation.goBack()}>
              <TextCreateAccount2>Voltar</TextCreateAccount2>
            </ButtonSecondary>
          </FormBox>
        </MainContent>

        <CameraComponent
          visible={showCamera}
          // setShowCameraModal={setCameraConfigs({
          //   ...cameraConfigs,
          //   showCameraModal,
          // })}
          setShowCameraModal={setShowCamera}
        />
      </MainContentScroll>
    </Container>
  );
};

export default ViewMRScreen;
