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

export const ModalImage = styled.Image`
  width: 300px;
  height: 181px;
  border-radius: 10px;
`;

export const AgendarConsultaContent = styled(PatientModal)`
  justify-content: flex-end;
`;

export const AgendarConsultaContentBox = styled(ModalContent)`
  padding: 30px 30px 10px;
  height: 60%;
  border: 1px solid red;
  width: 100%;
  border-radius: 10px 10px 0 0;
  background-color: ${Theme.colors.whiteColor};
  align-items: center;
  gap: 30px;
`;

export const ModalTextBox = styled.View`
  flex-direction: row;
  gap: 20px;
`;

export const ModalContentAgendarConsulta = styled(ModalContent)`
  /* height: 80%; */
  padding: 30px 30px 15px;
`;

export const TitleBox = styled.View`
  width: 100%;
  height: max-content;
  align-items: center;
  gap: 16px;
  /* border: 1px solid red; */
`;

export const ConsultaInfoContent = styled.View`
  width: 100%;
  /* border: 1px solid red; */
  gap: 20px;
`;

export const ConsultaInfoBoxStyle = styled.View`
  width: 100%;
  /* border: 1px solid red; */
  gap: 7px;
`;
