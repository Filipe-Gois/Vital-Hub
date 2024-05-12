import React from "react";
import { IllustrationImage, IllustrationStyle } from "./style";
import NoContentImage from "../../assets/noData.png";
import HospitalImageDefault from "../../assets/hospital.png";
import { Title } from "react-native-paper";
import { Theme } from "../../themes";
import { ParagraphMA500, ParagraphSemiBold } from "../Paragraph/style";

const Illustration = ({
  titleNote = "Título não informado",
  textNote = "Mensagem não informada",
  imgIcon = "default",
  imgAlt = "Icone da ilustração",
  showMessage = false,
  setNotifyUser,
}) => {
  const imageRender = (nameImage) => {
    let imgIllustrator;
    switch (nameImage.toLowerCase()) {
      case "nocontent":
        imgIllustrator = NoContentImage;
        break;
      // case "warning":
      //   imgIllustrator = warningIlustrator;
      //   break;
      // case "danger":
      //   imgIllustrator = dangerIllustrator;
      //   break;

      // case "login":
      //   imgIllustrator = loginIllustrator;
      //   break;

      default:
        imgIllustrator = HospitalImageDefault;
        break;
    }

    return imgIllustrator;
  };

  return (
    <IllustrationStyle>
      <IllustrationImage source={imageRender(imgIcon)} />
      <ParagraphSemiBold color={Theme.colors.blackColor}>{textNote}</ParagraphSemiBold>
    </IllustrationStyle>
  );
};

export default Illustration;
