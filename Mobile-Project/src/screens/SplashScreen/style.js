import { LinearGradient } from "expo-linear-gradient";
import { styled } from "styled-components";

export const LinearGradientView = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  colors: ["#49B3BA", "#496BBA"],
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
