import { Image } from "react-native";
import {
  ButtonTextStyle,
  ButtonTitle,
  ButtonTitleGoogle,
} from "../ButtonTitle/style";
import { ButtonAquaStyle, ButtonGoogle, ButtonTabStyle } from "./style";
import { MaterialIcons } from "@expo/vector-icons";

export const ButtonGoogleComponent = () => {
  return (
    <ButtonGoogle>
      <ButtonTitleGoogle>Entrar com Google</ButtonTitleGoogle>
    </ButtonGoogle>
  );
};

export const ButtonListAppontment = ({
  textButton,
  clickButton = false,
  onPress,
  children,
  fieldWidth,
}) => {
  return (
    <ButtonTabStyle
      fieldWidth={fieldWidth}
      clickButton={clickButton}
      onPress={onPress}
    >
      {/* <ButtonTextStyle clickButton={clickButton}>{textButton}</ButtonTextStyle> */}
      {children}
    </ButtonTabStyle>
  );
};

export const ButtonAqua = ({ onPress }) => {
  return (
    <ButtonAquaStyle onPress={onPress}>
      <MaterialIcons name="add-a-photo" size={20} color="white" />
      <ButtonTitle>Enviar</ButtonTitle>
    </ButtonAquaStyle>
  );
};
