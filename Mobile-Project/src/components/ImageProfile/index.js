import { WelComeImageStyle } from "./style";

export const WelComeImage = ({
  widthImage = "",
  heigthImage = "",
  uri,
  alt = "",
}) => {
  return (
    <WelComeImageStyle
      widthImage={widthImage}
      heigthImage={heigthImage}
      source={{ uri: uri }}
      alt={alt}
    />
  );
};
