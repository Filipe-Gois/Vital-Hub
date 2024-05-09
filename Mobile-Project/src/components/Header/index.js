import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "../../themes";
import { HeaderContentBox, HeaderStyle } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { WelCome } from "../WelCome";
import BadgeComponent from "../Badge/Badge";
import { View } from "react-native";
import { useState } from "react";

export const Header = ({
  viewProfile,
  user = {},
  number = 0,
  exibeBadge,
  setExibeBadge,
  setVerModalProximasConsultas,
}) => {
  // const [exibeBadge, setExibeBadge] = useState(false);
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
          <View>
            {exibeBadge && <BadgeComponent number={number} />}
            <MaterialIcons
              onPress={() => {
                setExibeBadge(false);
                setVerModalProximasConsultas(true);
              }}
              name="notifications"
              size={25}
              color="white"
            />
          </View>
        </HeaderContentBox>
      </LinearGradient>
    </HeaderStyle>
  );
};
