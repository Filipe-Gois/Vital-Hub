import { Image, ScrollView, View } from "react-native";
import styled, { css } from "styled-components";
import { Theme } from "../../themes";

export const LabelStyle = styled.View`
  width: ${(props) => (props.widthLabel ? props.widthLabel : "100%")};
  max-width: ${(props) => (props.maxWidthLabel ? props.maxWidthLabel : "100%")};
  height: max-content;
  display: flex;
  gap: 10px;
  ${(props) =>
    props.isImage &&
    css`
      background-color: ${Theme.colors.v2LightWhite};
    `}
`;

export const LabelImageView = styled(ScrollView)`
  width: 100%;
  height: 100%;
  max-height: 200px;
`;

export const LabelImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const ImageTextContainer = styled(View)`
  width: 100%;
  height: 100%;
`;
