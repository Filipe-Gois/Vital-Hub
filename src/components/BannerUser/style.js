import styled from "styled-components";
import { Theme } from "../../themes";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const halfScreenWidth = screenWidth * 0.5;

export const ImageProfileStyle = styled.Image`
width: 100%;
height: 280px;

position: relative;
`


export const ContainerBannerUser = styled.View`
width: 100%;
height: max-content;
margin: 0 0 80px 0 ;
`

export const UserInfoBox = styled.View`
width:300px;
height: 100px;
justify-content: center;
align-items: center;
/* margin: 20px 0 0 0; */
gap: 10px;
border-radius: 5px;



position: absolute;
bottom:  -50px;
left: ${halfScreenWidth - 150}px;


/* box-shadow para IOS */
box-shadow: 4px 4px 15px rgba(0,  0,  0,  0.7);

/* box-shadow para android */
shadow-color: 'black';
shadow-opacity: 0.25;
shadow-offset: 20px 20px;
shadow-radius: 10px;
elevation: 25;
background-color: ${Theme.colors.whiteColor};
`

export const AgeAndEmailBox = styled.View`
flex-direction: row;
gap: 20px;
`
