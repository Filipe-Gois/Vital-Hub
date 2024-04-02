import styled from "styled-components";
import { Theme } from "../../themes";

export const StethoscopeBox = styled.TouchableOpacity`
  background-color: ${Theme.colors.primary};
  border-radius: 7px;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 15px;
  right: 5%;
`;
