import styled, { css } from "styled-components";
import { Theme } from "../../themes";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const MenuStyle = styled.View`
  width: 100%;
  height: 60px;
  background-color: ${Theme.colors.whiteColor};
  flex-direction: row;
  justify-content: center;
  background-color: red;
  border-radius: 15px 15px 0px 0px;
  position: absolute;
  bottom: 0;
  padding: 14px 0;

  box-shadow: 0 -1px 10px #000;

  /* box-shadow para android */
  shadow-color: "black";
  shadow-opacity: 0.08;
  shadow-offset: 0px -1px;
  shadow-radius: 10px;
  elevation: 15;
`;



const Tab = createBottomTabNavigator();

export const MenuContainerStyle = styled(Tab.Navigator)`
  width: 100%;
  height: 60px;
  background-color: ${Theme.colors.whiteColor};
  flex-direction: row;
  justify-content: center;
  background-color: red;
  border-radius: 15px 15px 0px 0px;
  position: absolute;
  bottom: 0;
  padding: 14px 0;

  box-shadow: 0 -1px 10px #000;

  /* box-shadow para android */
  shadow-color: "black";
  shadow-opacity: 0.08;
  shadow-offset: 0px -1px;
  shadow-radius: 10px;
  elevation: 15;
`;











export const MenuContent = styled.View`
  width: 90%;
  height: 100%;
  border: 1px solid black;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const IconWindowBox = styled.View`
  width: 30px;
  height: 30px;
`;

export const TextWindowBox = styled.Text`
  font-size: 12px;
  color: ${Theme.colors.grayV2};
  font-family: "Quicksand_500Medium";
`;

export const ButtonMenuStyle = styled.TouchableHighlight`
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
