import styled from "styled-components";
import { Theme } from "../../themes";
import { Animated } from "react-native";

export const CardConsultaStyle = styled.TouchableOpacity`
  width: 90%;
  height: 102px;
  padding: 10px 30px 10px 10px;
  background-color: ${Theme.colors.whiteColor};
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 5px;
  border-radius: 5px;
  box-shadow: 0 4px 4px #000;
  align-self: center;

  /* box-shadow para android */
  shadow-color: "black";
  shadow-opacity: 0.25;
  shadow-offset: 0px 4px;
  shadow-radius: 4px;
  elevation: 10;
`;

export const InfoTextBox = styled.View`
  margin-left: 10px;
  width: max-content;
  height: 100%;
  /* border: 2px solid red; */
  justify-content: space-between;
`;

export const AgeAndTypeBox = styled(InfoTextBox)`
  height: max-content;
  flex-direction: row;
  width: 100%;
  border: none;
  justify-content: flex-start;
  margin-left: 0;
`;

export const Point = styled.View`
  border-radius: 3px;
  width: 3px;
  height: 3px;
  background-color: ${Theme.colors.lightGray};
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: 0 6px;
`;

export const CancelBox = styled.View`
  width: max-content;
  height: 100%;
  justify-content: flex-end;
  position: absolute;
  right: 20px;
  bottom: 15px;
  /* border: 1px solid red; */
`;

export const HourBox = styled.View`
  width: 100px;
  height: 25px;
  background-color: ${(props) =>
    props.situacao === "Pendente"
      ? Theme.colors.lightAqua
      : Theme.colors.v3LightWhite};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

export const FlipContainer = styled.View`
  width: 200px;
  height: 200px;
  perspective: 1000px;
`;

export const FlipCard = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f00;
  border-radius: 10px;
  backface-visibility: hidden;
  position: absolute;
`;

export const FlipCardFront = styled(FlipCard)`
  justify-content: center;
  align-items: center;
`;

export const FlipCardBack = styled(FlipCard)`
  background-color: #00f;
  transform: rotateY(180deg);
`;
