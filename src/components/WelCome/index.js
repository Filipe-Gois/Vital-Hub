import { WelComeImage } from "../ImageProfile";
import { WelComeStyle, WelComeTextBox } from "./style";
import Doctor from "../../assets/doctorFull.png";
import { Paragraph, TextCreateAccount1 } from "../Paragraph/style";
import { Theme } from "../../themes";

export const WelCome = ({ src = "", viewProfile }) => {
  return (
    <WelComeStyle onPress={viewProfile}>
      <WelComeImage
        widthImage="32%"
        heigthImage="100%"
        src={src}
        alt="Foto do usuário."
      />

      <WelComeTextBox>
        <Paragraph textAlign={"left"}>Bem-Vindo</Paragraph>
        <TextCreateAccount1 color={Theme.colors.lightWhite}>
          Richard Kosta
        </TextCreateAccount1>
      </WelComeTextBox>
    </WelComeStyle>
  );
};
