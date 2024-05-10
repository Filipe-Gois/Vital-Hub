import styled from "styled-components";
import { Theme } from "../../themes";

export const LeftArrowAndXStyle = styled.View`
  width: 30px;
  height: 30px;
  position: absolute;
  border-radius: 30px;
  top: ${(props) => (props.top ? props.top : "20px")};
  left: ${(props) => (props.left ? props.left : "20px")};
  align-items: center;
  justify-content: center;
  background-color: ${Theme.colors.lightGreen};
  z-index: 2;
`;

export const LeftArrowAndXStyleCamera = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  top: 0px;
  left: 0px;
  width: auto;
  height: auto;
  position: relative;
  background-color: ${Theme.colors.whiteColor};
`;
