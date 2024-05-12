import React from "react";
import { DoctorCardColumn, DoctorCardStyle } from "./style";
import { Paragraph, TextCreateAccount1 } from "../Paragraph/style";
import { WelComeImage } from "../ImageProfile";

import DoctorAlessandra from "../../assets/doctorAlessandra.png";

const DoctorCard = ({ dados = [], clickButton, onPress, fieldWidth }) => {
  return (
    <DoctorCardStyle
      clickButton={clickButton}
      fieldWidth={fieldWidth}
      onPress={onPress}
    >
      <WelComeImage
        widthImage="26%"
        heigthImage="100%"
        uri={dados.idNavigation.foto}
      />

      <DoctorCardColumn>
        <TextCreateAccount1>{dados.idNavigation.nome}</TextCreateAccount1>

        <Paragraph textAlign={"left"}>
          {dados.especialidade.especialidade1}
        </Paragraph>
      </DoctorCardColumn>
    </DoctorCardStyle>
  );
};

export default DoctorCard;
