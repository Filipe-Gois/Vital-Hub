import styled from "styled-components";
import { Theme } from "../../themes";

export const Title = styled.Text`
  color: ${(props) => (props.color ? props.color : Theme.colors.blackColor)};
  font-family: "MontserratAlternates_600SemiBold";
  font-size: 20px;
  text-align: center;
`;
