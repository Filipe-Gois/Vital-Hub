import styled, { css } from "styled-components";
import { Theme } from "../../themes";

export const ClinicCardStyle = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
  padding: 12px;
  border-radius: 5px;
  box-shadow: 0 4px 4px #000;
  justify-content: center;
  align-items: center;
  background-color: ${Theme.colors.whiteColor};
  margin: 15px 0;

  /* se a variavel "clickButton" for igual a true, aplicará a borda */
  ${(props) =>
    props.clickButton &&
    css`
      border: 2px solid ${Theme.colors.secondary};
    `}

  /* box-shadow para android */
  shadow-color: ${Theme.colors.grayV1};
  shadow-opacity: 0.5;
  shadow-offset: 5px 5px;
  shadow-radius: 5px;
  elevation: 10;
  /* border: 1px solid red; */
`;

export const ClinicCardRow = styled.View`
  width: 100%;
  height: 50%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
