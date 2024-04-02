import styled, { css } from "styled-components";
import { Theme } from "../../themes";

export const Button = styled.TouchableOpacity`
  width: ${(props) => (props.fieldWidth ? props.fieldWidth : "100%")};
  height: ${(props) => (props.fieldHeight ? props.fieldHeight : "44px")};
  background-color: ${(props) =>
    props.buttonStatus ? Theme.colors.whiteColor : Theme.colors.secondary};
  border: 1px solid ${Theme.colors.secondary};
  border-radius: 5px;
  /* margin-top: 15px; */
  padding: ${(props) => (props.padding ? props.padding : "12px 8px 12px 8px")};
  align-items: center;
  justify-content: center;
`;

export const ButtonAsyncStyle = styled(Button)`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : Theme.colors.secondary};
`;

export const ButtonGray = styled(Button)`
  background-color: ${Theme.colors.grayV5};
  width: 50%;
  border: 1px solid ${Theme.colors.grayV5};
`;

export const ButtonGoogle = styled(Button)`
  background-color: ${Theme.colors.whiteColor};
  border: 1px solid ${Theme.colors.secondary};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const ButtonTabStyle = styled.TouchableHighlight`
  padding: ${(props) =>
    props.padding ? props.padding : "12px 14px 12px 14px"};
  border-radius: 5px;

  width: ${(props) => (props.fieldWidth ? props.fieldWidth : "auto")};

  ${(props) =>
    props.clickButton
      ? css`
          background-color: ${Theme.colors.secondary};
        `
      : css`
          background-color: ${Theme.colors.lightWhite};
          border: ${Theme.colors.secondary};
        `}
`;

export const ButtonSecondary = styled(Button)`
  background-color: transparent;
  border: none;
  width: ${(props) => (props.fieldWidth ? props.fieldWidth : "max-content")};
  height: max-content;
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : "auto")};
`;

export const ButtonBorderCyan = styled.TouchableHighlight`
  background-color: transparent;
  border: 2px solid ${Theme.colors.primary};
  padding: 9px 10px;

  width: ${(props) => (props.fieldWidth ? props.fieldWidth : "100%")};
  height: ${(props) => (props.fieldHeight ? props.fieldHeight : "44px")};

  border-radius: 5px;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.clickButton
      ? css`
          background-color: ${Theme.colors.primary};
        `
      : css`
          background-color: ${"transparent"};
        `}
`;

export const ButtonAquaStyle = styled(Button)`
  background-color: ${Theme.colors.primary};
  border: 1px solid ${Theme.colors.primary};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 50%;
`;
