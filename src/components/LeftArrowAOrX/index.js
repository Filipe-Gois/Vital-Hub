import { Theme } from "../../themes";
import { LeftArrowAndXStyle, LeftArrowAndXStyleCamera } from "./style";
import { AntDesign } from "@expo/vector-icons"; //import para os ícones leftarrow e close X

export const LeftArrowAOrXComponent = ({
  size = 26,
  color = "#34898f",
  isLefArrow = true,
  navigation,
}) => {
  return (
    // <GreenCircleComponent>
    //     <LeftArrowStyle source={require('../../assets/leftarrowback.svg')} />
    // </GreenCircleComponent>

    <LeftArrowAndXStyle>
      <AntDesign
        onPress={() => navigation.goBack()}
        name={isLefArrow ? "arrowleft" : "close"}
        size={size}
        color={color}
      />
    </LeftArrowAndXStyle>
  );
};

export const LeftArrowAOrXCameraComponent = ({
  size = 26,
  color = Theme.colors.primary,
  isLefArrow = true,
  navigation,
  onPress,
}) => {
  return (
    <LeftArrowAndXStyleCamera onPress={onPress}>
      <AntDesign
        name={isLefArrow ? "arrowleft" : "close"}
        size={size}
        color={color}
      />
    </LeftArrowAndXStyleCamera>
  );
};
