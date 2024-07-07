import { Image } from "react-native";
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
import { ActivityIndicator } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";

export const ButtonGoogleComponent = ({
  onPress = () => {},
  loading = false,
  colorsizeActivityIndicator = Theme.colors.secondary,
}) => {
  return (
    <ButtonGoogle onPress={onPress}>
      {!loading ? (
        <>
          <FontAwesome6
            name="google"
            size={16}
            color={Theme.colors.secondary}
          />

          <ButtonTitleGoogle>Entrar com Google</ButtonTitleGoogle>
        </>
      ) : (
        <ActivityIndicator size={"small"} color={colorsizeActivityIndicator} />
      )}
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

export const ButtonAqua = ({
  onPress,
  exameExists = false,
  loading = false,
  disabled = false,
  colorsizeActivityIndicator = Theme.colors.whiteColor,
}) => {
  return (
    <ButtonAquaStyle disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator size={"small"} color={colorsizeActivityIndicator} />
      ) : (
        <>
          <MaterialIcons name="add-a-photo" size={20} color="white" />
          <ButtonTitle>{!exameExists ? "Enviar" : "Alterar Foto"}</ButtonTitle>
        </>
      )}
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
        <ActivityIndicator size={"small"} color={colorsizeActivityIndicator} />
      ) : (
        <ButtonTitle>{textButton}</ButtonTitle>
      )}
    </ButtonAsyncStyle>
  );
};
