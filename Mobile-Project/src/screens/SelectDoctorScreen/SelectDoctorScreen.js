import React, { useEffect, useState } from "react";
import {
  ButtonBox,
  Container,
  ContainerBoxStyle,
  FormBox,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { FlatListStyle } from "../../components/FlatList/style";
import {
  Button,
  ButtonActive,
  ButtonSecondary,
} from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import { TextCreateAccount2 } from "../../components/Paragraph/style";
import { Theme } from "../../themes";
import DoctorAlessandra from "../../assets/doctorAlessandra.png";
import DoctorKumushiro from "../../assets/doctorKumushiro.png";
import DoctorRodrigo from "../../assets/doctorRodrigo.png";
import DoctorCard from "../../components/DoctorCard";
import api, { apiFilipe, medicosResource } from "../../Services/Service";
import Illustration from "../../components/Illustration/Illustration";

const SelectDoctorScreen = ({ navigation, route }) => {
  const [selectedDoctor, setSelectedDoctor] = useState({
    medicoClinicaId: "",
    medicoNome: "",
    medicoEspecialidade: "",
  });
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const response = await apiFilipe.get(
        `${medicosResource}/BuscarPorIdClinica?id=${route.params.clinicaId}`
      );

      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinue = async () => {
    navigation.navigate("SelectDate", {
      ...route.params,
      ...selectedDoctor,
    });
  };

  useEffect(() => {
    getDoctors();
    return (cleanUp = () => {});
  }, [route]);

  return (
    <Container>
      <MainContentScroll>
        <MainContent
          fieldHeight={doctors.length === 0 ? "100%" : "max-content"}
        >
          <ContainerBoxStyle
            // fieldHeight={"100%"}
            fieldMargin={"30px 0 0 0"}
            fieldAlignItems="center"
            fieldJustifyContent={"center"}
            fieldGap={doctors.length === 0 ? "120px" : "0px"}
          >
            <Title>Selecionar médico</Title>

            {doctors.length > 0 ? (
              <FlatListStyle
                // fieldWidth={"100%"}
                data={doctors}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <DoctorCard
                    // fieldWidth={"90%"}
                    clickButton={item.id === selectedDoctor.medicoClinicaId}
                    onPress={() =>
                      setSelectedDoctor({
                        ...selectedDoctor,
                        medicoClinicaId: item.id,
                        medicoNome: item.idNavigation.nome,
                        medicoEspecialidade: item.especialidade.especialidade1,
                      })
                    }
                    dados={item}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <Illustration
                textNote="Ops, não há nenhum médico nessa clínica."
                imgIcon="nocontent"
              />
            )}

            <ButtonBox fieldAlignItems={"center"}>
              <ButtonActive
                fieldWidth={"90%"}
                buttonAtivado={selectedDoctor.medicoClinicaId}
                onPress={selectedDoctor.medicoClinicaId ? handleContinue : null}
                padding={"0"}
              >
                <ButtonTitle>Continuar</ButtonTitle>
              </ButtonActive>

              <ButtonSecondary onPress={() => navigation.goBack()}>
                <TextCreateAccount2>Cancelar</TextCreateAccount2>
              </ButtonSecondary>
            </ButtonBox>
          </ContainerBoxStyle>
        </MainContent>
      </MainContentScroll>
    </Container>
  );
};

export default SelectDoctorScreen;
