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
import { ActivityIndicator, Alert, RefreshControl, Text } from "react-native";
import { userDecodeToken } from "../../Utils/Auth";
import {
  apiFilipe,
  consultasResource,
  medicosResource,
  pacientesResource,
} from "../../Services/Service";
import {
  calcularIdadeDoUsuario,
  getDataAtual,
} from "../../Utils/stringFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({});

  //pega o id da consulta ao clicar no card
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  const [dataConsulta, setDataConsulta] = useState(getDataAtual());

  const url = profile.role === "Paciente" ? pacientesResource : medicosResource;

  const [statusLista, setStatusLista] = useState("Pendente");
  const [agendarConsulta, setAgendarConsulta] = useState(false);
  const [consultas, setConsultas] = useState([]);

  //state para a exibição dos modais
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const fetchUserName = async () => {
    const userInfo = await userDecodeToken();

    if (userInfo) {
      setProfile(userInfo);
    }
  };

  const handleCancelarConsulta = async (id) => {
    try {
      const response = await apiFilipe.put(
        consultasResource + `/CancelarConsulta?idConsulta=${id}`
      );

      if (response.status === 204) {
        listarConsultas();
      }
    } catch (error) {
      Alert.alert("Erro!", "Erro ao desmarcar consulta.");
    }
  };

  const listarConsultas = async () => {
    try {
      const response = await apiFilipe.get(
        `${url}/BuscarPorData?data=${dataConsulta}`,
        {
          headers: {
            Authorization: `Bearer ${profile.token}`,
          },
        }
      );

      setConsultas(response.data);
    } catch (error) {}
  };

  const onRefresh = () => {
    setRefreshing(true);

    listarConsultas();
    fetchUserName();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUserName();

    listarConsultas();

    //passar o profile como dependencia dá looping infinito
  }, [dataConsulta, consultaSelecionada]);

  return (
    <Container>
      <MainContentScroll
        //lógica para scrollar para cima e atualizar página
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <MainContent>
          <Header
            user={profile}
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
                Agendadas
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
            {consultas ? (
              <FlatListStyle
                data={consultas && consultas}
                scrollEnabled={false}
                renderItem={({ item }) =>
                  statusLista === item.situacao.situacao && (
                    <CardConsulta
                      profileData={profile}
                      onPress={
                        profile.role === "Paciente"
                          ? () => {
                              setShowModalAppointment(true);
                              setConsultaSelecionada(item);
                            }
                          : null
                      }
                      onPressCancel={() => {
                        setShowModalCancel(true);
                        setConsultaSelecionada(item);
                      }}
                      onPressAppointment={
                        profile !== "Paciente" &&
                        item.situacao.situacao === "Pendente"
                          ? () => {
                              setShowModalAppointment(true);
                              setConsultaSelecionada(item);
                            }
                          : () => {
                              navigation.navigate("ViewMedicalRecord", {
                                consulta: {
                                  idConsulta: item.id,
                                  descricao: item.descricao,
                                  diagnostico: item.diagnostico,
                                  prescricao: item.receita.medicamento,
                                  foto:
                                    profile.role === "Medico"
                                      ? item.paciente.idNavigation.foto
                                      : item.medicoClinica.medico.idNavigation
                                          .foto,
                                  nome:
                                    profile.role !== "Medico"
                                      ? item.medicoClinica.medico.idNavigation
                                          .nome
                                      : item.paciente.idNavigation.nome,

                                  medico: {
                                    idMedico: item.medicoClinica.medico.id,
                                    // fotoMedico:
                                    //   item.medicoClinica.medico.idNavigation.foto,

                                    crm: item.medicoClinica.medico.crm,
                                    especialidade:
                                      item.medicoClinica.medico.especialidade
                                        .especialidade1,
                                  },

                                  paciente: {
                                    idPaciente: item.paciente.id,
                                    // fotoPaciente: item.paciente.idNavigation.foto,
                                    email: item.paciente.idNavigation.email,
                                    idade: calcularIdadeDoUsuario(
                                      item.paciente.dataNascimento
                                    ),
                                  },
                                },
                              });
                            }
                      }
                      dados={item}
                      statusLista={item.situacao}
                    />
                  )
                }
                keyExtractor={(item) => item.id}
              />
            ) : (
              <ActivityIndicator />
            )}
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
