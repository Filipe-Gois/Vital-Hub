import { WelComeImageStyle } from "./style";

export const WelComeImage = ({
  widthImage = "",
  heigthImage = "",
  src = "",
  alt = "",
}) => {
  return (
    <WelComeImageStyle
      widthImage={widthImage}
      heigthImage={heigthImage}
      source={src}
      alt={alt}
    />
  );
};
