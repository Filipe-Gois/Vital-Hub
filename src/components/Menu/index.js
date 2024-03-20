import React from "react";
import { ButtonMenuStyle, MenuContent, MenuStyle, TextWindowBox } from "./style";
import { Text } from "react-native";

//import do tab navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MenuBar = () => {
  return (
    <MenuStyle>
      <MenuContent>
        <ButtonMenu fieldWidth={"30%"}>
          <Text>asdadsa</Text>
        </ButtonMenu>
        <ButtonMenu fieldWidth={"30%"}>
          <Text>asdadsa</Text>
        </ButtonMenu>
        <ButtonMenu fieldWidth={"30%"}>
          <Text>asdadsa</Text>
        </ButtonMenu>
      </MenuContent>
    </MenuStyle>
  );
};

export default MenuBar;


export const ButtonMenu = ({
    textButton,
    clickButton = false,
    onPress,
    children,
    fieldWidth,
  }) => {
    return (
      <ButtonMenuStyle fieldWidth={fieldWidth} clickButton={clickButton} onPress={onPress}>
        {/* <ButtonTextStyle clickButton={clickButton}>{textButton}</ButtonTextStyle> */}
        {children}
      </ButtonMenuStyle>
    );
  };
  