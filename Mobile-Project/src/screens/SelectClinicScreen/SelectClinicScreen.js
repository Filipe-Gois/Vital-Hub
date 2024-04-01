import React, { useEffect, useState } from "react";
import {
  Container,
  FormBox,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { Button, ButtonSecondary } from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import { TextCreateAccount2 } from "../../components/Paragraph/style";
import { Theme } from "../../themes";
import ClinicCard from "../../components/ClinicCard";
import { FlatListStyle } from "../../components/FlatList/style";
import axios from "axios";


const SelectClinicScreen = ({navigation}) => {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState();

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get(
          "http://172.16.39.101:4466/api/Clinica/ListarTodas"
        );
        setClinics(response.data);
      } catch (error) {
        console.error("Erro ao carregar as Clinicas:", error);
      }
    };

    fetchClinics();
  }, []);

  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <FormBox margin={"30px 0 0 0"}>
            <Title>Selecionar Clínica</Title>

            {/* <ClinicCard dados={clinics[0]} /> */}

            <FlatListStyle
              fieldWidth={"100%"}
              data={clinics}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <ClinicCard
                  key={item.id}
                  //ao clicar no card da clinica, o id é capturado e passado p variavel que o armazenará
                  onPress={() => setSelectedClinic(item.id)}
                  //se o id armazenado no state "selectedClinic" for identico ao id do item atual do FlatList, será aplicada a borda, senão, seguirá para o proximo item, e por aí vai :)
                  clickButton={selectedClinic === item.id}
                  dados={item}
                />
              )}
              keyExtractor={(item) => item.id}
            />

            <Button
              onPress={() => navigation.navigate("SelectDoctor")}
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

export default SelectClinicScreen;
