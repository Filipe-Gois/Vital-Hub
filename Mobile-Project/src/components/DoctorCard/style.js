import styled, { css } from "styled-components";
import { Theme } from "../../themes";

export const DoctorCardStyle = styled.TouchableOpacity`
  width: ${(props) => (props.fieldWidth ? fieldWidth : "90%")};
  height: 102px;
  padding: 11px;
  border-radius: 5px;
  box-shadow: 0 4px 4px #000;
  flex-direction: row;
  align-self: center;
  align-items: center;
  background-color: ${Theme.colors.whiteColor};
  margin: 15px 0;
  gap: 10px;

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

export const DoctorCardColumn = styled.View`
  justify-content: center;
`;
