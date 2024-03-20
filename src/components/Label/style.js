import styled, { css } from "styled-components";

export const LabelStyle = styled.View`
  width: ${(props) => (props.widthLabel ? props.widthLabel : "100%")};
  max-width: ${(props) => (props.maxWidthLabel ? props.maxWidthLabel : "100%")};
  height: max-content;
  display: flex;
  gap: 10px;
`;
