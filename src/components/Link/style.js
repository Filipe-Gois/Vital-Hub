import styled from "styled-components";
import { Theme } from "../../themes";

export const LinkMedium = styled.Text`
  font-size: 14px;
  font-family: "MontserratAlternates_500Medium";
  text-decoration: underline;
  margin: -10px 0 15px 0;
  color: #8c8a97;
  align-self: flex-start;
`;

export const LinkCreateAccount = styled(LinkMedium)`
  color: ${Theme.colors.secondary};
  margin: 0;
`;
