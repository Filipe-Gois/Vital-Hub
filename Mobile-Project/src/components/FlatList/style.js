import { FlatList } from "react-native";
import styled from "styled-components";
import { Theme } from "../../themes";

export const FlatListStyle = styled(FlatList)`
  width: ${(props) => (props.fieldWidth ? props.fieldWidth : "100%")};
  box-shadow: 0 4px 4px #000;
  margin: ${(props) => (props.fieldMargin ? props.fieldMargin : "0px")};
  padding: ${(props) => (props.fieldPadding ? props.fieldPadding : "0px")};
  /* gap: ${(props) => props.fieldGap && props.fieldGap}; */

  background-color: ${Theme.colors.lightWhite};
`;
