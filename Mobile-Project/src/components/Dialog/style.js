import { Dialog } from "react-native-paper";
import { Theme } from "../../themes";
import styled from "styled-components";
import { Paragraph } from "../Paragraph/style";

export const DialogStyle = styled(Dialog)`
  background-color: ${(props) =>
    props.status === "erro" ? Theme.colors.lightWhite : "#fff"};
`;

export const DialogTitle = styled(Dialog.Title)`
  text-align: center;
  font-family: "MontserratAlternates_500Medium";
  color: ${(props) =>
    props.status === "erro"
      ? Theme.colors.redColor
      : props.status === "sucesso"
      ? Theme.colors.primary
      : Theme.colors.orangeColor};
`;

export const DialogIcon = styled(Dialog.Icon)`
  color: ${(props) =>
    props.status === "erro"
      ? Theme.colors.redColor
      : props.status === "sucesso"
      ? Theme.colors.primary
      : Theme.colors.orangeColor};
`;

export const DialogContent = styled(Dialog.Content)``;

export const DialogContentText = styled(Paragraph)``;
