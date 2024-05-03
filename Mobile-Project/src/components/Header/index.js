import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "../../themes";
import { HeaderContentBox, HeaderStyle } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { WelCome } from "../WelCome";

export const Header = ({ viewProfile, user = {} }) => {
  return (
    <HeaderStyle onPress={viewProfile}>
      <LinearGradient
        style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
        colors={[Theme.colors.aqua, Theme.colors.darkBlue]}
        start={{ x: 0, y: 1 }} // Início no canto superior esquerdo
        end={{ x: 1, y: 0 }} // Fim no canto inferior direito
      >
        <HeaderContentBox>
          <WelCome
            viewProfile={viewProfile}
            uri={user.foto ? user.foto : null}
            name={user.role === "Medico" ? `Dr. ${user.name}` : user.name}
          />
          <MaterialIcons name="notifications" size={25} color="white" />
        </HeaderContentBox>
      </LinearGradient>
    </HeaderStyle>
  );
};
