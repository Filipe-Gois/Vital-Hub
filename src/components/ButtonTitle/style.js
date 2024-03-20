import styled, { css } from "styled-components";
import { Theme } from "../../themes";

export const ButtonTitle = styled.Text`
  color: ${(props) =>
    props.buttonStatus ? props.buttonStatus : Theme.colors.whiteColor};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  text-transform: uppercase;
  font-family: "MontserratAlternates_700Bold";
`;

export const ButtonTitleModal = styled.Text`
  font-family: "MontserratAlternates_600SemiBold";
  color: ${Theme.colors.primary};
`;

export const ButtonTitleGoogle = styled(ButtonTitle)`
  color: ${Theme.colors.secondary};
`;

export const ButtonTitleHome = styled(ButtonTitle)`
  font-family: "MontserratAlternates_600SemiBold";
  font-size: 12px;
  text-transform: none;
`;

export const ButtonTextStyle = styled.Text`
  font-size: 12px;
  font-family: "MontserratAlternates_600SemiBold";

  ${(props) =>
    props.clickButton
      ? css`
          color: ${Theme.colors.lightWhite};
        `
      : css`
          color: ${Theme.colors.secondary};
        `}
`;
