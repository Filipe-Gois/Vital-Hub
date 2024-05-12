import { View, Image } from "react-native";
import { styled } from "styled-components";

export const IllustrationStyle = styled(View)`
  width: 100%;
  height: max-content;
  z-index: 100;
  align-items: center;
  align-self: center;
`;

export const IllustrationImage = styled(Image)`
  width: 150px;
  height: 150px;
`;
