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
import {
  calcularIdadeDoUsuario,
  hourDbToView,
} from "../../Utils/stringFunctions";

export const CardConsulta = ({
  dados = {},
  onPressCancel,
  onPressAppointment,
  onPress,
  profileData = {},
}) => {
  return (
    <CardConsultaStyle onPress={onPress}>
      <WelComeImage
        widthImage="26%"
        heigthImage="100%"
        uri={
          profileData.role === "Paciente"
            ? dados.medicoClinica.medico.idNavigation.foto
            : dados.paciente.idNavigation.foto
        }
      />

      <InfoTextBox>
        <TextCreateAccount1>
          {profileData.role === "Paciente"
            ? dados.medicoClinica.medico.idNavigation.nome
            : dados.paciente.idNavigation.nome}
        </TextCreateAccount1>

        <AgeAndType
          // crm={dados.medicoClinica.medico.crm}
          ageOrCrm={
            profileData.role === "Paciente"
              ? dados.medicoClinica.medico.crm
              : calcularIdadeDoUsuario(dados.paciente.dataNascimento)
          }
          prioridade={dados.prioridade.prioridade}
          profileData={profileData}
        />
        <Hour
          situacao={dados.situacao.situacao}
          horario={hourDbToView(dados.dataConsulta)}
        />
      </InfoTextBox>

      <CancelBox>
        {dados.situacao.situacao === "Pendente" ? (
          <ButtonSecondary padding={"0"} onPress={onPressCancel}>
            <ParagraphMA500
              color={
                // dados.situacao === "Pendente"

                // ?
                Theme.colors.red
                // : Theme.colors.grayBlue
              }
            >
              Cancelar
            </ParagraphMA500>
          </ButtonSecondary>
        ) : (
          dados.situacao.situacao === "Realizada" &&
          profileData.role === "Paciente" && (
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

const AgeAndType = ({
  prioridade,
  ageOrCrm = "",
  profileData = {},
  crm = "",
}) => {
  return (
    <AgeAndTypeBox>
      <ParagraphRegular>
        {profileData.role !== "Paciente"
          ? ageOrCrm + " anos"
          : "crm: " + ageOrCrm}
      </ParagraphRegular>

      <Point />
      <ParagraphSemiBold>
        {prioridade === 0 ? "Rotina" : prioridade === 1 ? "Exame" : "Urgência"}
      </ParagraphSemiBold>
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
