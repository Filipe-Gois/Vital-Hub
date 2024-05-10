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
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

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
  setDialog,
}) => {
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <DialogStyle status={status} visible={visible} onDismiss={hideDialog}>
        {status === "erro" ? (
          <MaterialIcons
            name="disabled-by-default"
            size={70}
            color={Theme.colors.redColor}
            style={{ alignSelf: "center" }}
          />
        ) : status === "sucesso" ? (
          <AntDesign
            name="checksquare"
            size={60}
            color={Theme.colors.primary}
            style={{ alignSelf: "center" }}
          />
        ) : (
          <FontAwesome5
            name="exclamation-triangle"
            size={60}
            color={Theme.colors.orangeColor}
            style={{ alignSelf: "center" }}
          />
        )}

        {/* <DialogIcon
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
        /> */}

        <DialogTitle status={status}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentMessage}</DialogContentText>
        </DialogContent>
      </DialogStyle>
    </Portal>
  );
};

export default DialogComponent;
