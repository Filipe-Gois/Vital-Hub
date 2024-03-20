import { CardConsulta } from "../../components/CardConsulta";
import {
  Container,
  ContainerBoxStyle,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import { Header } from "../../components/Header";
import Doctor from "../../assets/doctor.png";

export const ConsultasScreen = () => {
  return (
    <Container>
      <Header />

      <MainContentScroll>
        <MainContent>
          <ContainerBoxStyle
            fieldAlignItems="center"
            fieldGap={"15px"}
            fieldMargin={"20px 0 0 0"}
          >
            <CardConsulta srcImage={Doctor} />
            <CardConsulta />
          </ContainerBoxStyle>
        </MainContent>
      </MainContentScroll>
    </Container>
  );
};
