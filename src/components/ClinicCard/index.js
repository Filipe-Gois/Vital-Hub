import React from "react";
import { ClinicCardRow, ClinicCardStyle } from "./style";
import { ParagraphSemiBold, TextCreateAccount1 } from "../Paragraph/style";
import { Theme } from "../../themes";
import { Hour } from "../CardConsulta";
import { AntDesign } from "@expo/vector-icons";

const ClinicCard = ({ dados = [], onPress, clickButton }) => {
  return (
    <ClinicCardStyle clickButton={clickButton} onPress={onPress}>
      <ClinicCardRow>
        <TextCreateAccount1>{dados.name}</TextCreateAccount1>
        <ParagraphSemiBold color={Theme.colors.orangeColorV2}>
          <AntDesign name="star" size={20} color={Theme.colors.orangeColorV2} />
          {dados.rate}
        </ParagraphSemiBold>
      </ClinicCardRow>

      <ClinicCardRow>
        <ParagraphSemiBold>
          {dados.city}, {dados.state}
        </ParagraphSemiBold>

        <Hour situacao="Pendente" isHour={false} horario={dados.opening} />
      </ClinicCardRow>
    </ClinicCardStyle>
  );
};

export default ClinicCard;
