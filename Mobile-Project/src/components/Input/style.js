import styled, { css } from "styled-components";
import { Theme } from "../../themes";
import { TextInput as TextInputPaper } from "react-native-paper";
import { TextInput } from "react-native";

export const InputStyle = styled(TextInput).attrs((props) => ({
  placeholderTextColor: props.placeholderTextColor
    ? props.placeholderTextColor
    : "#49B3BA",
}))`
  ${(props) =>
    props.fieldMinHeight &&
    css`
      min-height: ${props.fieldMinHeight};
    `}
  width: ${(props) => ` ${props.fieldWidth}%`};
  max-width: ${(props) => ` ${props.fieldMaxWidth}%`};
  height: ${(props) => ` ${props.fieldHeight}px`};
  color: ${(props) =>
    props.textColor ? props.textColor : Theme.colors.primary};
  border-radius: 5px;
  border: ${(props) =>
    props.border ? props.border : `2px solid ${Theme.colors.primary}`};
  background-color: ${(props) =>
    props.backGround ? props.backGround : Theme.colors.whiteColor};
  font-size: 14px;
  padding: 16px;
  /* text-align: justify; */
  /* padding-bottom: ${(props) =>
    props.fieldPaddingBottom ? "80px" : "0px"}; */

  /* padding-bottom: 80px; */

  /* text-align: center; */
  ${(props) =>
    props.fieldTextAlign &&
    css`
      text-align: ${props.fieldTextAlign};
    `}
`;

export const InputLibrary = styled(TextInputPaper)`
  color: ${(props) =>
    props.textColor ? props.textColor : Theme.colors.primary};
  background-color: ${(props) =>
    props.backGround ? props.backGround : Theme.colors.whiteColor};
  border: ${(props) =>
    props.border ? props.border : `2px solid ${Theme.colors.primary}`};
  border-bottom: 1px solid red;
  border-bottom: none;
`;

export const InputVerification = styled(InputStyle)`
  width: 65px;
  height: 62px;
`;

export const InputMedicalRecord = styled(InputStyle)`
  width: 100%;
  height: 121px;
`;

export const InputCheckEmailStyle = styled(InputStyle)`
  text-align: center;
  font-size: 40px;
  padding: 5px 10px;
`;

export const InputSelectBox = styled.View`
  width: 100%;
  height: 55px;
  border: 2px solid ${Theme.colors.primary};
  border-radius: 5px;
`;
