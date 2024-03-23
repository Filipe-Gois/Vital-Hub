import styled from "styled-components";

export const HeaderStyle = styled.View`
  width: 100%;
  height: 120px;
  border-radius: 0 0 15px 15px;

  /* box-shadow para android */
  shadow-color: "black";
  shadow-opacity: 0.25;
  shadow-offset: 20px 20px;
  shadow-radius: 15px;
  elevation: 15;
`;

export const HeaderContentBox = styled.View`
  width: 100%;
  height: 100%;
  padding: 20px 0;
  border-radius: 0 0 15px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
