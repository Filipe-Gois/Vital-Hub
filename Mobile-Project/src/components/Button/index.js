import { ActivityIndicator, Image } from "react-native";
import {
  ButtonTextStyle,
  ButtonTitle,
  ButtonTitleGoogle,
} from "../ButtonTitle/style";
import {
  ButtonAquaStyle,
  ButtonAsyncStyle,
  ButtonGoogle,
  ButtonTabStyle,
} from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { Theme } from "../../themes";

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

//botão utilizado em requisições de api. Tem as seguintes validações: exibe um componente de loading ao processar requisição e trava o botão ao realizar uma requisição
export const ButtonAsync = ({
  textButton,
  loading = false,
  onPress,
  disabled = false,
  sizeActivityIndicator = 20,
  colorsizeActivityIndicator = Theme.colors.whiteColor,
  buttonAtivado,
}) => {
  return (
    <ButtonAsyncStyle
      buttonAtivado={buttonAtivado}
      disabled={disabled}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator
          size={sizeActivityIndicator}
          color={colorsizeActivityIndicator}
        />
      ) : (
        <ButtonTitle>{textButton}</ButtonTitle>
      )}
    </ButtonAsyncStyle>
  );
};
