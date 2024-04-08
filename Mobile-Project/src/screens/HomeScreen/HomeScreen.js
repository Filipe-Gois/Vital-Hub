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
import {
  apiFilipe,
  consultasResource,
  medicosResource,
  pacientesResource,
} from "../../Services/Service";

const HomeScreen = ({ navigation }) => {
  const [profile, setProfile] = useState("");

  //pega o id da consulta ao clicar no card
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  const [dataConsulta, setDataConsulta] = useState("");

  const url = profile.role === "Paciente" ? pacientesResource : medicosResource;

  const [statusLista, setStatusLista] = useState("Pendente");
  const [agendarConsulta, setAgendarConsulta] = useState(false);
  const [consultas, setConsultas] = useState([]);

  //state para a exibição dos modais
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);

  const fetchUserName = async () => {
    const userInfo = await userDecodeToken();
    if (userInfo) {
      setProfile(userInfo);
    }
  };

  const mostrarModal = (modal, consulta) => {
    setConsultaSelecionada(consulta);
    if (modal === "cancelar") {
      setShowModalCancel(true);
    } else if (modal === "prontuario") {
      setShowModalAppointment(true);
    } else {
    }
  };

  const handleCancelarConsulta = async (id) => {
    try {
      const response = await apiFilipe.put(
        consultasResource + "/CancelarConsulta" + `?id=${id}`
      );

      if (response.status === 204) {
        listarConsultas();
      }
    } catch (error) {
      console.log("Erro ao desmarcar consulta!", error);
    }
  };

  const listarConsultas = async () => {
    try {
      const response = await apiFilipe.get(
        url + `/BuscarPorData?data=${dataConsulta}&id=${profile.id}`
      );

      setConsultas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserName();
    return (cleanUp = () => {});
  }, [consultaSelecionada]);

  useEffect(() => {
    listarConsultas();
  }, [dataConsulta, consultaSelecionada]);

  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <Header
            src={UserImage}
            viewProfile={() => navigation.navigate("Perfil")}
          />

          <CalendarList setDataConsulta={setDataConsulta} />
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
              data={consultas && consultas}
              scrollEnabled={false}
              renderItem={({ item }) =>
                statusLista === item.situacao.situacao && (
                  <CardConsulta
                    profileData={profile}
                    onPress={
                      profile.role === "Paciente" &&
                      (() => {
                        setShowModalAppointment(true);
                        setConsultaSelecionada(item);
                      })
                    }
                    onPressCancel={() => {
                      setShowModalCancel(true);
                      setConsultaSelecionada(item);
                    }}
                    onPressAppointment={
                      profile !== "Paciente"
                        ? () => {
                            setShowModalAppointment(true);
                            setConsultaSelecionada(item);
                          }
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
              textButton1={"Cancelar consulta"}
              textButton2={"Voltar"}
              // goBack={true}
              HandleModal={() => {
                handleCancelarConsulta(consultaSelecionada.id);
                setShowModalCancel(false);
                HandleCallNotification({
                  body: "Notificação recebida!",
                  title: "Consulta desmarcada com sucesso!",
                });
              }}
            />

            <ModalComponent
              visible={showModalAppointment}
              setShowModalCancel={setShowModalAppointment}
              srcImage={profile.role === "Paciente" ? DoctorBanner : Nicole}
              title={
                profile.role === "Paciente" && consultaSelecionada
                  ? consultaSelecionada.medicoClinica.medico.idNavigation.nome
                  : "Niccole Sarga"
              }
              texto1={
                profile.role === "Paciente" && consultaSelecionada
                  ? consultaSelecionada.medicoClinica.medico.especialidade
                      .especialidade1
                  : ""
              }
              texto2={
                profile.role === "Paciente" && consultaSelecionada
                  ? "crm: " + consultaSelecionada.medicoClinica.medico.crm
                  : "niccole.sarga@gmail.com"
              }
              textButton1={
                profile.role === "Paciente"
                  ? "Ver local da consulta"
                  : "Inserir Prontuário"
              }
              textButton2={"Cancelar"}
              cancel={false}
              HandleModal={() => {
                navigation.navigate("ClinicAddress", {
                  clinicaId: consultaSelecionada.medicoClinica.clinicaId,
                });
                setShowModalAppointment(false);
              }}
            />
          </ContainerBoxStyle>
        </MainContent>
      </MainContentScroll>

      {profile.role === "Paciente" && (
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
