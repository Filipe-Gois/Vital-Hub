import { WelComeImage } from "../ImageProfile";
import {
  AgeAndTypeBox,
  CancelBox,
  CardConsultaStyle,
  HourBox,
  InfoTextBox,
  Point,
} from "./style";
import {
  ParagraphMA500,
  ParagraphRegular,
  ParagraphSemiBold,
  TextCreateAccount1,
} from "../Paragraph/style";
import { Theme } from "../../themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Nicole from "../../assets/nicole-sarga.png";
import { ButtonSecondary } from "../Button/style";
import { useState } from "react";

export const CardConsulta = ({
  dados = [],
  onPressCancel,
  onPressAppointment,
  onPress,
}) => {
  const [profile, setProfile] = useState("Paciente");
  return (
    <CardConsultaStyle onPress={onPress}>
      <WelComeImage widthImage="26%" heigthImage="100%" src={dados.srcImage} />

      <InfoTextBox>
        <TextCreateAccount1>{dados.name}</TextCreateAccount1>

        <AgeAndType type={dados.type} age={dados.age} />
        <Hour situacao={dados.situacao} horario={dados.horario} />
      </InfoTextBox>

      <CancelBox>
        {dados.situacao === "Pendente" ? (
          <ButtonSecondary padding={"0"} onPress={onPressCancel}>
            <ParagraphMA500
              color={
                dados.situacao === "Pendente"
                  ? Theme.colors.red
                  : Theme.colors.grayBlue
              }
            >
              Cancelar
            </ParagraphMA500>
          </ButtonSecondary>
        ) : (
          dados.situacao === "Realizada" && (
            <ButtonSecondary padding={"0"} onPress={onPressAppointment}>
              <ParagraphMA500 color={Theme.colors.grayBlue}>
                Ver prontuário
              </ParagraphMA500>
            </ButtonSecondary>
          )
        )}

        {/* <ButtonSecondary padding={"0"} onPress={onPressCancel}>
          <ParagraphMA500
            color={
              dados.situacao === "Pendente"
                ? Theme.colors.red
                : Theme.colors.grayBlue
            }
          >
            {dados.situacao === "Pendente"
              ? "Cancelar"
              : dados.situacao === "Realizada" && "Ver prontuário"}
          </ParagraphMA500>
        </ButtonSecondary> */}
      </CancelBox>
    </CardConsultaStyle>
  );
};

const AgeAndType = ({ type = "", age = "" }) => {
  return (
    <AgeAndTypeBox>
      <ParagraphRegular>{age} anos</ParagraphRegular>

      <Point />

      <ParagraphSemiBold>{type}</ParagraphSemiBold>
    </AgeAndTypeBox>
  );
};

export const Hour = ({ horario = "", situacao = "", isHour = true }) => {
  return (
    <HourBox situacao={situacao}>
      {isHour ? (
        <MaterialCommunityIcons
          name="clock"
          size={14}
          color={
            situacao === "Pendente" ? Theme.colors.primary : Theme.colors.grayV1
          }
        />
      ) : (
        <MaterialCommunityIcons
          name="calendar-today"
          size={14}
          color={Theme.colors.primary}
        />
      )}

      <ParagraphSemiBold
        color={
          situacao === "Pendente" ? Theme.colors.primary : Theme.colors.grayV1
        }
      >
        {horario}
      </ParagraphSemiBold>
    </HourBox>
  );
};
