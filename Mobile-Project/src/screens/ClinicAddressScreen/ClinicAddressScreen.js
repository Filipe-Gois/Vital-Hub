import React, { useEffect, useState } from "react";
import {
  Container,
  FormBox,
  MainContent,
} from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import GPS from "../../components/GPS";
import GpsMap from "../../assets/MapImage.png";
import ClinicAddress from "../../components/ClinicAddress";
import { ButtonSecondary } from "../../components/Button/style";
import { TextCreateAccount2 } from "../../components/Paragraph/style";
import MapaGps from "../../components/MapaGps";
import { ActivityIndicator, View } from "react-native";
import { apiFilipe, clinicaResource } from "../../Services/Service";

const ClinicAddressScreen = ({ navigation, route }) => {
  const [clinic, setClinic] = useState({});

  const getClinic = async () => {
    try {
      const response = await apiFilipe.get(
        clinicaResource + `/BuscarPorId?id=${route.params.clinicaId}`
      );
      console.log(response.data);
      setClinic(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(route.params.clinicaId);
    if (clinic === null || clinic === undefined || !clinic) {
      getClinic();
      
    }

    return (cleanUp = () => {});
  }, [clinic]);
  return (
    <Container>
      <MainContent>
        {clinic !== null ? (
          <>
            <MapaGps />

            <ClinicAddress dados={clinic} />

            <ButtonSecondary onPress={() => navigation.goBack()}>
              <TextCreateAccount2>Voltar</TextCreateAccount2>
            </ButtonSecondary>
          </>
        ) : (
          <ActivityIndicator />
        )}
      </MainContent>
    </Container>
  );
};

export default ClinicAddressScreen;
