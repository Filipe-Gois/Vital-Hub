import React from "react";
import { DoctorCardColumn, DoctorCardStyle } from "./style";
import { Paragraph, TextCreateAccount1 } from "../Paragraph/style";
import { WelComeImage } from "../ImageProfile";

const DoctorCard = ({ dados = [], clickButton, onPress }) => {
  return (
    <DoctorCardStyle clickButton={clickButton} onPress={onPress}>
      <WelComeImage widthImage="26%" heigthImage="100%" src={dados.srcImage} />

      <DoctorCardColumn>
        <TextCreateAccount1>{dados.name}</TextCreateAccount1>

        <Paragraph textAlign={"left"}>
          {dados.specialty1}, {dados.specialty2}
        </Paragraph>
      </DoctorCardColumn>
    </DoctorCardStyle>
  );
};

export default DoctorCard;
