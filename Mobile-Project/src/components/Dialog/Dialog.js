import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";
import { Theme } from "../../themes";
import {
  DialogContent,
  DialogContentText,
  DialogIcon,
  DialogStyle,
  DialogTitle,
} from "./style";

const DialogComponent = ({
  visible,
  setVisible,
  status = "erro",
  title = status === "erro"
    ? "Erro"
    : status === "sucesso"
    ? "Sucesso"
    : "Alerta",
  contentMessage = "This is simple dialog",
}) => {
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <DialogStyle status={status} visible={visible} onDismiss={hideDialog}>
        <DialogIcon
          size={26}
          status={status}
          icon={
            status === "erro"
              ? "alert"
              : status === "alerta"
              ? "alert"
              : "check"
          }
          color={
            status === "erro"
              ? Theme.colors.redColor
              : status === "sucesso"
              ? Theme.colors.primary
              : Theme.colors.orangeColor
          }
        />
        <DialogTitle status={status}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentMessage}</DialogContentText>
        </DialogContent>
      </DialogStyle>
    </Portal>
  );
};

export default DialogComponent;
