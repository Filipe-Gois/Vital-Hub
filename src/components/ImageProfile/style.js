// import styled from "styled-components";

import styled from "styled-components";

// export const ImageProfileStyle = styled.Image`
// width: 100%;
// height: 280px;
// `

export const WelComeImageStyle = styled.Image`
  width: ${(props) => (props.widthImage ? props.widthImage : "32%")};
  height: ${(props) => (props.heigthImage ? props.heigthImage : "100%")};
  border-radius: 5px;
`;
