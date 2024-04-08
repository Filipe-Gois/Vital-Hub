import React, { useEffect, useState } from "react";
import {
  Container,
  FormBox,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { FlatListStyle } from "../../components/FlatList/style";
import { Button, ButtonSecondary } from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import { TextCreateAccount2 } from "../../components/Paragraph/style";
import { Theme } from "../../themes";
import DoctorAlessandra from "../../assets/doctorAlessandra.png";
import DoctorKumushiro from "../../assets/doctorKumushiro.png";
import DoctorRodrigo from "../../assets/doctorRodrigo.png";
import DoctorCard from "../../components/DoctorCard";
import api, { apiFilipe, medicosResource } from "../../Services/Service";

const SelectDoctorScreen = ({ navigation }) => {
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [doctors, setDoctors] = useState([]);



  const getDoctors = async () => {
    try {
      const response = await apiFilipe.get(medicosResource);

      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();

    return (cleanUp = () => {});
  }, []);

  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <FormBox margin={"30px 0 0 0"}>
            <Title>Selecionar médico</Title>

            <FlatListStyle
              fieldWidth={"100%"}
              data={doctors}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <DoctorCard
                  clickButton={item.id === selectedDoctor}
                  onPress={() => setSelectedDoctor(item.id)}
                  dados={item}
                />
              )}
              keyExtractor={(item) => item.id}
            />

            <Button
              onPress={() => navigation.navigate("SelectDate")}
              padding={"0"}
            >
              <ButtonTitle>Continuar</ButtonTitle>
            </Button>

            <ButtonSecondary onPress={() => navigation.goBack()}>
              <TextCreateAccount2>Cancelar</TextCreateAccount2>
            </ButtonSecondary>
          </FormBox>
        </MainContent>
      </MainContentScroll>
    </Container>
  );
};

export default SelectDoctorScreen;
