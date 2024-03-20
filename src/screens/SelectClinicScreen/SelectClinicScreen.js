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

const SelectClinicScreen = ({ navigation }) => {
  //variável que armazena o id da clinica selecionada
  const [selectedClinic, setSelectedClinic] = useState();

  const [clinics, setClinics] = useState([
    {
      id: "1",
      name: "Clínica Natureh",
      city: "São Paulo",
      state: "SP",
      rate: "4,5",
      opening: "Seg-Sex",
    },
    {
      id: "2",
      name: "Diamond Pró-Mulher",
      city: "São Paulo",
      state: "SP",
      rate: "4,8",
      opening: "Seg-Sex",
    },
    {
      id: "3",
      name: "Clinica Villa Lobos",
      city: "Taboão",
      state: "SP",
      rate: "4,2",
      opening: "Seg-Sab",
    },
    {
      id: "4",
      name: "SP Oncologia Clínica",
      city: "Taboão",
      state: "SP",
      rate: "4,2",
      opening: "Seg-Sab",
    },
  ]);

  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <FormBox margin={"30px 0 0 0"}>
            <Title>Selecionar clínica</Title>

            {/* <ClinicCard dados={clinics[0]} /> */}

            <FlatListStyle
              fieldWidth={"100%"}
              data={clinics}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <ClinicCard
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
