import { WelComeImage } from "../ImageProfile";
import { WelComeStyle, WelComeTextBox } from "./style";
import Doctor from "../../assets/doctorFull.png";
import { Paragraph, TextCreateAccount1 } from "../Paragraph/style";
import { Theme } from "../../themes";

export const WelCome = ({ uri = "", viewProfile, name = "" }) => {
  return (
    <WelComeStyle onPress={viewProfile}>
      <WelComeImage
        widthImage="32%"
        heigthImage="100%"
        src={{ uri: uri }}
        alt="Foto do usuário."
      />

      <WelComeTextBox>
        <Paragraph textAlign={"left"}>Bem-Vindo</Paragraph>
        <TextCreateAccount1 color={Theme.colors.lightWhite}>
          {name}
        </TextCreateAccount1>
      </WelComeTextBox>
    </WelComeStyle>
  );
};
