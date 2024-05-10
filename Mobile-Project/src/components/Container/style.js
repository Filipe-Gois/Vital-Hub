import styled from "styled-components";
import { Theme } from "../../themes";
import { ScrollView } from "react-native";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${Theme.colors.lightWhite};
`;

export const ContainerBoxStyle = styled.View`
  display: flex;
  flex-direction: ${(props) => props.fieldDirection};
  justify-content: ${(props) => props.fieldJustifyContent};
  align-items: ${(props) => props.fieldAlignItems};
  width: 100%;
  height: ${(props) => (props.fieldHeight ? props.fieldHeight : "100%")};
  margin: ${(props) => (props.fieldMargin ? props.fieldMargin : "0")};
  gap: ${(props) => (props.fieldGap ? props.fieldGap : "0")};
`;

export const MainContentScroll = styled(ScrollView)`
  width: 100%;
  background-color: ${Theme.colors.lightWhite};
`;

export const MainContent = styled.View`
  background-color: ${Theme.colors.lightWhite};
  width: ${(props) => (props.fieldWidth ? props.fieldWidth : "100%")};
  height: 100%;
  margin: ${(props) => (props.fieldMargin ? props.fieldMargin : "0 0 90px 0")};
  align-items: center;
  background-color: ${Theme.colors.lightWhite};
  /* margin-top: 10px; */
`;

export const ContainerText = styled(MainContent)`
  height: max-content;
`;

export const FormBox = styled.View`
  width: ${(props) => (props.fieldWidth ? props.fieldWidth : "90%")};
  max-height: 100%;
  align-items: center;
  gap: ${(props) => (props.gap ? props.gap : "20px")};
  margin: ${(props) => (props.margin ? props.margin : "0")};
`;

export const InputBox = styled(FormBox)`
  width: 100%;
  align-items: center;
  gap: ${(props) => (props.gap ? props.gap : "0px")};
  margin: ${(props) => (props.margin ? props.margin : "0")};
  flex-direction: ${(props) =>
    props.fieldFlexDirection ? props.fieldFlexDirection : "column"};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "start"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "stretch")};
`;

export const InputBoxCheckEmail = styled(InputBox)`
  flex-direction: row;
  justify-content: space-between;
`;
export const ButtonBox = styled(FormBox)`
  width: ${(props) => (props.fieldWidth ? props.fieldWidth : "100%")};

  justify-content: ${(props) =>
    props.fieldJustifyContent ? props.fieldJustifyContent : "start"};

  align-items: ${(props) =>
    props.fieldAlignItems ? props.fieldAlignItems : "stretch"};

  flex-direction: ${(props) =>
    props.fieldFlexDirection ? props.fieldFlexDirection : "column"};
`;

export const CreateAccountBox = styled.View`
  width: 100%;
  max-height: 100%;
  justify-content: center;
  text-align: center;
  flex-direction: row;
  margin-top: 30px;
`;

export const FormBoxModal = styled(FormBox)`
  padding: 30px 30px 10px;
  height: 55%;
  width: 100%;
  border-radius: 10px 10px 0 0;
  background-color: ${Theme.colors.whiteColor};
  align-items: center;
  gap: 30px;
`;

export const Line = styled.View`
  width: 100%;
  border: 1px solid ${Theme.colors.grayV4};
`;
