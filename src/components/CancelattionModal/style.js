import styled from "styled-components";
import { Theme } from "../../themes";

export const ModalStyle = styled.Modal`
  flex: 1;
  background-color: ${Theme.colors.grayV4};
`;

export const PatientModal = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${Theme.colors.grayV4};
`;

export const ModalContent = styled.View`
  padding: 30px 30px 10px;
  width: 90%;
  border-radius: 10px;
  background-color: ${Theme.colors.whiteColor};
  align-items: center;
  gap: 30px;
`;

export const ModalText = styled.Text`
  width: 270px;
  font-size: 16px;
  color: ${Theme.colors.grayV3};
  line-height: 22px;
  text-align: center;
  margin-top: 10px;
`;
