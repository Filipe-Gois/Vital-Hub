import React, { useEffect, useState } from "react";
import {
  ButtonBox,
  Container,
  ContainerBoxStyle,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import { Header } from "../../components/Header";
import UserImage from "../../assets/UserProfileImageWelcome.png";
import Doctor from "../../assets/doctor.png";
import { CalendarList } from "../../components/Calendar";
import { ButtonListAppontment } from "../../components/Button";
import { ButtonTextStyle } from "../../components/ButtonTitle/style";
import Nicole from "../../assets/nicole-sarga.png";
import DoctorBanner from "../../assets/DoctorBanner.png";
import User from "../../assets/UserProfileImageWelcome.png";
import { ModalComponent } from "../../components/Modal";
import { FlatListStyle } from "../../components/FlatList/style";
import { CardConsulta } from "../../components/CardConsulta";
import Stethoscope from "../../components/stethoscope";
import { FontAwesome6 } from "@expo/vector-icons";
import { WelComeImage } from "../../components/ImageProfile";
import { HandleCallNotification } from "../../components/Notification/Notification";
import { Alert, Text } from "react-native";
import { userDecodeToken } from "../../Utils/Auth";

const HomeScreen = ({ navigation }) => {
  const [profile, setProfile] = useState("");

  const [statusLista, setStatusLista] = useState("Pendente");
  const [agendarConsulta, setAgendarConsulta] = useState(false);
  const [dadosPaciente, setDadosPaciente] = useState([
    {
      id: "1",
      name: "Dr. Claudio",
      type: "Rotina",
      age: "22",
      horario: "14:00",
      srcImage: Doctor,
      situacao: "Pendente",
    },
    {
      id: "2",
      name: "Richard Kosta",
      type: "Urgência",
      age: "28",
      horario: "15:00",
      srcImage: User,
      situacao: "Cancelada",
    },
    {
      id: "3",
      name: "Niccole Sarga",
      type: "Rotina",
      age: "22",
      horario: "14:00",
      srcImage: Nicole,
      situacao: "Pendente",
    },
    {
      id: "4",
      name: "Richard Kosta",
      type: "Urgência",
      age: "28",
      horario: "15:00",
      srcImage: User,
      situacao: "Cancelada",
    },
    {
      id: "5",
      name: "Niccole Sarga",
      type: "Rotina",
      age: "22",
      horario: "14:00",
      srcImage: Nicole,
      situacao: "Pendente",
    },
    {
      id: "6",
      name: "Richard Kosta",
      type: "Urgência",
      age: "28",
      horario: "15:00",
      srcImage: User,
      situacao: "Cancelada",
    },
    {
      id: "7",
      name: "Niccole Sarga",
      type: "Rotina",
      age: "22",
      horario: "14:00",
      srcImage: Nicole,
      situacao: "Realizada",
    },
    {
      id: "8",
      name: "Richard Kosta",
      type: "Urgência",
      age: "28",
      horario: "15:00",
      srcImage: User,
      situacao: "Cancelada",
    },
    {
      id: "9",
      name: "Richard Kosta",
      type: "Urgência",
      age: "28",
      horario: "15:00",
      srcImage: User,
      situacao: "Pendente",
    },
    {
      id: "10",
      name: "Fefe",
      type: "Urgência",
      age: "28",
      horario: "15:00",
      srcImage: User,
      situacao: "Pendente",
    },
    {
      id: "11",
      name: "Fefe",
      type: "Urgência",
      age: "28",
      horario: "15:00",
      srcImage: User,
      situacao: "Pendente",
    },
  ]);

  //state para a exibição dos modais
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);

  const fetchUserName = async () => {
    const userInfo = await userDecodeToken();
    if (userInfo) {
      setProfile(userInfo.role);
    }
  };

  useEffect(() => {
    fetchUserName();
    return (cleanUp = () => {});
  }, []);

  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <Header
            src={UserImage}
            viewProfile={() => navigation.navigate("Perfil")}
          />

          <CalendarList />
          <ButtonBox
            fieldFlexDirection={"row"}
            fieldJustifyContent={"space-between"}
            fieldWidth={"90%"}
          >
            <ButtonListAppontment
              clickButton={statusLista === "Pendente"}
              onPress={() => setStatusLista("Pendente")}
            >
              <ButtonTextStyle clickButton={statusLista === "Pendente"}>
                Pendentes
              </ButtonTextStyle>
            </ButtonListAppontment>

            <ButtonListAppontment
              clickButton={statusLista === "Realizada"}
              onPress={() => setStatusLista("Realizada")}
            >
              <ButtonTextStyle clickButton={statusLista === "Realizada"}>
                Realizadas
              </ButtonTextStyle>
            </ButtonListAppontment>

            <ButtonListAppontment
              clickButton={statusLista === "Cancelada"}
              onPress={() => setStatusLista("Cancelada")}
            >
              <ButtonTextStyle clickButton={statusLista === "Cancelada"}>
                Canceladas
              </ButtonTextStyle>
            </ButtonListAppontment>
          </ButtonBox>
          <ContainerBoxStyle fieldAlignItems="center" fieldGap={"15px"}>
            <FlatListStyle
              data={dadosPaciente}
              scrollEnabled={false}
              renderItem={({ item }) =>
                statusLista === item.situacao && (
                  <CardConsulta
                    onPress={
                      profile === "Paciente"
                        ? () => setShowModalAppointment(true)
                        : null
                    }
                    onPressCancel={() => setShowModalCancel(true)}
                    onPressAppointment={
                      profile !== "Paciente"
                        ? () => setShowModalAppointment(true)
                        : () => navigation.navigate("ViewMedicalRecord")
                    }
                    dados={item}
                    statusLista={item.situacao}
                  />
                )
              }
              keyExtractor={(item) => item.id}
            />

            {/* modal cancelar */}

            <ModalComponent
              visible={showModalCancel}
              setShowModalCancel={setShowModalCancel}
              title={"Cancelar consulta"}
              texto1={
                "Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?"
              }
              textButton1={"Confirmar"}
              textButton2={"Cancelar"}
              // goBack={true}
              HandleModal={() => {
                setShowModalCancel(false);
                HandleCallNotification({
                  body: "Notificação recebida!",
                  title: "Bem-vindo ao Senai!",
                });
              }}
            />

            <ModalComponent
              visible={showModalAppointment}
              setShowModalCancel={setShowModalAppointment}
              srcImage={profile === "Paciente" ? DoctorBanner : Nicole}
              title={profile === "Paciente" ? "Dr. Claudio" : "Niccole Sarga"}
              texto1={profile === "Paciente" ? "Cliníco geral" : "22 anos"}
              texto2={
                profile === "Paciente" ? "CRM-15286" : "niccole.sarga@gmail.com"
              }
              textButton1={
                profile === "Paciente"
                  ? "Ver local da consulta"
                  : "Inserir Prontuário"
              }
              textButton2={"Cancelar"}
              cancel={false}
              HandleModal={() =>
                navigation.navigate(
                  profile === "Paciente" ? "ClinicAddress" : "MedicalRecord"
                )
              }
            />
          </ContainerBoxStyle>
        </MainContent>
      </MainContentScroll>

      {profile.trim !== "Paciente" && (
        <Stethoscope
          agendarConsulta={agendarConsulta}
          onPressAgendar={() => setAgendarConsulta(true)}
          setAgendarConsulta={() => setAgendarConsulta(false)}
          navigation={navigation}
          setNavigation={"SelectClinic"}
        />
      )}
    </Container>
  );
};

export default HomeScreen;
