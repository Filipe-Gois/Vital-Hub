import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "../../themes";
import { HeaderContentBox, HeaderStyle } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { WelCome } from "../WelCome";

export const Header = ({ src = "", viewProfile }) => {
  return (
    <HeaderStyle onPress={viewProfile}>
      <LinearGradient
        style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
        colors={[Theme.colors.aqua, Theme.colors.darkBlue]}
        start={{ x: 0, y: 1 }} // Início no canto superior esquerdo
        end={{ x: 1, y: 0 }} // Fim no canto inferior direito
      >
        <HeaderContentBox>
          <WelCome viewProfile={viewProfile} src={src} />
          <MaterialIcons name="notifications" size={25} color="white" />
        </HeaderContentBox>
      </LinearGradient>
    </HeaderStyle>
  );
};
