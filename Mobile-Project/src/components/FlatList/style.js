import { FlatList } from "react-native";
import styled from "styled-components";

export const FlatListStyle = styled(FlatList)`
  width: ${(props) => (props.fieldWidth ? props.fieldWidth : "90%")};
  height: max-content;
  box-shadow: 0 4px 4px #000;
  /* background-color: red; */
`;
