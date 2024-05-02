import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import styled, { css } from "styled-components";
import { Theme } from "../../themes";

export const LabelStyle = styled.View`
  width: ${(props) => (props.widthLabel ? props.widthLabel : "100%")};
  max-width: ${(props) => (props.maxWidthLabel ? props.maxWidthLabel : "100%")};
  height: max-content;
  display: flex;
  gap: 10px;
`;

export const LabelImageButton = styled(TouchableOpacity)`
  width: 100%;
  height: 200px;
  background-color: ${Theme.colors.v2LightWhite};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const LabelImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const ImageTextContainer = styled(View)`
  width: 100%;
  height: 200px;
  flex-direction: row;
  gap: 10px;
  background-color: ${Theme.colors.v2LightWhite};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
