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
import {
  Button,
  ButtonActive,
  ButtonSecondary,
} from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import { TextCreateAccount2 } from "../../components/Paragraph/style";
import { Theme } from "../../themes";
import ClinicCard from "../../components/ClinicCard";
import { FlatListStyle } from "../../components/FlatList/style";
import axios from "axios";
import api, { apiFilipe, clinicaResource } from "../../Services/Service";
import Illustration from "../../components/Illustration/Illustration";

const SelectClinicScreen = ({ navigation, route }) => {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState({
    clinicaId: "",
    clinicaLabel: "",
  });

  const handleContinue = async () => {
    navigation.navigate("SelectDoctor", {
      ...route.params,
      ...selectedClinic,
    });
  };

  const fetchClinics = async () => {
    try {
      const response = await apiFilipe.get(
        `${clinicaResource}/BuscarPorCidade?cidade=${route.params.localizacao}`
      );
      setClinics(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchClinics();
  }, [route]);

  return (
    <Container>
      <MainContentScroll>
        <MainContent
          fieldHeight={clinics.length === 0 ? "100%" : "max-content"}
        >
          <ContainerBoxStyle
            // fieldWidth={"90%"}
            // fieldHeight={"100%"}
            fieldMargin={"30px 0 0 0"}
            fieldAlignItems="center"
            fieldJustifyContent={"center"}
            fieldGap={clinics.length === 0 ? "120px" : "0px"}
          >
            <Title>Selecionar Clínica</Title>

            {clinics.length > 0 ? (
              <FlatListStyle
                // fieldWidth={"100%"}
                data={clinics}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <ClinicCard
                    key={item.id}
                    //ao clicar no card da clinica, o id é capturado e passado p variavel que o armazenará
                    onPress={() => {
                      setSelectedClinic({
                        clinicaId: item.id,
                        clinicaLabel: item.nomeFantasia,
                      });
                    }}
                    //se o id armazenado no state "selectedClinic" for identico ao id do item atual do FlatList, será aplicada a borda, senão, seguirá para o proximo item, e por aí vai :)
                    clickButton={selectedClinic.clinicaId === item.id}
                    dados={item}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <Illustration
                textNote="Ops, nenhuma clínica nessa região."
                imgIcon="nocontent"
              />
            )}

            <ButtonBox fieldWidth={"90%"} fieldAlignItems={"center"}>
              <ButtonActive
                buttonAtivado={selectedClinic.clinicaId}
                onPress={selectedClinic.clinicaId ? handleContinue : null}
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

export default SelectClinicScreen;
