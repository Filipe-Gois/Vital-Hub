import React, { useEffect, useState, useContext } from "react";
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
import { ModalComponent, ModalProximasConsultas } from "../../components/Modal";
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
import { StatusBar } from "expo-status-bar";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { Dialog } from "react-native-paper";
import CardProximasConsultas from "../../components/CardProximasConsultas/CardProximasConsultas";
import Illustration from "../../components/Illustration/Illustration";
import DialogComponent from "../../components/Dialog/Dialog";
import { AuthContext } from "../../Contexts/Auth";

const HomeScreen = ({ navigation }) => {
  const { userGlobalData, setUserGlobalData } = useContext(AuthContext);

  const [contador, setContador] = useState(0);

  const [profile, setProfile] = useState({});

  //pega o id da consulta ao clicar no card
  const [consultaSelecionada, setConsultaSelecionada] = useState({
    dataConsulta: "",
    descricao: "",
    diagnostico: "",
    exames: [],
    id: "",
    medicoClinica: {
      clinicaId: "",
      consulta: [],
      id: "",
      medico: {
        crm: "",
        enderecoId: "",
        especialidade: {},
        especialidadeId: "",
        id: "",
        medicosClinicas: [],
        idNavigation: {
          email: "",
          foto: "",
          id: "",
          nome: "",
          senha: "",
          tipoUsuarioId: "",
        },
      },
      medicoId: "",
    },
    medicoClinicaId: "",
    paciente: {
      consulta: [],
      cpf: "",
      dataNascimento: "",
      enderecoId: "",
      id: "",
      idNavigation: {
        email: "",
        foto: "",
        id: "",
        nome: "",
        senha: "",
        tipoUsuarioId: "",
      },
      rg: "",
    },
    pacienteId: "",
    prioridade: {
      consulta: [],
      id: "",
      prioridade: 0,
    },
    prioridadeId: "",
    receita: {
      consulta: [],
      id: "",
      medicamento: "",
    },
    receitaId: "",
    situacao: {
      consulta: [],
      id: "",
      situacao: "",
    },
    situacaoId: "",
  });

  const [dataConsulta, setDataConsulta] = useState(getDataAtual());

  const url = profile.role === "Paciente" ? pacientesResource : medicosResource;

  const [statusLista, setStatusLista] = useState("Pendente");
  const [agendarConsulta, setAgendarConsulta] = useState(false);
  const [consultas, setConsultas] = useState([]);

  const [proximasConsultas, setProximasConsultas] = useState([]);

  //state para a exibição dos modais
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);

  const [exibeBadge, setExibeBadge] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [verModalProximasConsultas, setVerModalProximasConsultas] =
    useState(false);

  const [dialog, setDialog] = useState({});

  const [showDialog, setShowDialog] = useState(false);

  const fetchUserName = async () => {
    const userInfo = await userDecodeToken();

    if (userInfo) {
      setProfile(userInfo);
    }
  };

  const getProximasConsultas = async () => {
    try {
      const response = await apiFilipe.get(`${url}/ListarProximas`, {
        headers: { Authorization: `Bearer ${profile.token}` },
      });

      if (response.data.length > 0 && contador === 1) {
        setExibeBadge(true);
      }

      setProximasConsultas(response.data);
    } catch (error) {}
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
      setDialog({
        status: "erro",
        contentMessage: "Erro ao desmarcar consulta.",
      });
      setShowDialog(true);
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

      console.log("oioi", response.data)

      setConsultas(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getProximasConsultas();
    listarConsultas();
    fetchUserName();
    setRefreshing(false);
    setContador(contador + 1);
  };

  const handleButtonModal = () => (profile.role !== "Paciente" ? false : false);

  useEffect(() => {
    fetchUserName();
    getProximasConsultas();
    listarConsultas();

    setContador(contador + 1);
  }, [dataConsulta, consultaSelecionada, profile.token]);

  return (
    <Container>
      <DialogComponent
        {...dialog}
        visible={showDialog}
        setVisible={setShowDialog}
        setDialog={setDialog}
      />
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
            exibeBadge={exibeBadge}
            setExibeBadge={setExibeBadge}
            number={proximasConsultas.length}
            setVerModalProximasConsultas={setVerModalProximasConsultas}
          />

          <CalendarList
            setDataConsulta={setDataConsulta}
            dataConsulta={dataConsulta}
          />

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
                fieldMargin={"0px 0 0 0"}
                // fieldPadding={"0 0 20px 0"}
                data={consultas && consultas}
                scrollEnabled={false}
                renderItem={({ item }) =>
                  statusLista === item.situacao.situacao && (
                    <CardConsulta
                      profileData={profile}
                      onPress={() => {
                        if (item.situacao.situacao !== "Cancelada") {
                          setConsultaSelecionada(item);
                          setShowModalAppointment(true);
                        }
                      }}
                      onPressCancel={() => {
                        setConsultaSelecionada(item);
                        setShowModalCancel(true);
                      }}
                      onPressAppointment={
                        profile !== "Paciente" &&
                        item.situacao.situacao === "Pendente"
                          ? () => {
                              setConsultaSelecionada(item);
                              setShowModalAppointment(true);
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
              // <Illustration
              //   textNote="Nenhuma consulta para hoje"
              //   imgIcon="nocontent"
              // />
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
              HandleModal={() => {
                handleCancelarConsulta(consultaSelecionada.id);
                setShowModalCancel(false);
                HandleCallNotification({
                  body: "Notificação recebida!",
                  title: "Consulta desmarcada com sucesso!",
                  setDialog: setDialog,
                  setShowDialog: setShowDialog,
                });
              }}
            />

            <ModalComponent
              visible={showModalAppointment}
              setShowModalCancel={setShowModalAppointment}
              uriImage={
                profile.role === "Paciente" && consultaSelecionada
                  ? consultaSelecionada.medicoClinica.medico.idNavigation.foto
                  : profile.role === "Medico" && consultaSelecionada
                  ? consultaSelecionada.paciente.idNavigation.foto
                  : !consultaSelecionada && ""
              }
              title={
                profile.role === "Paciente" && consultaSelecionada
                  ? consultaSelecionada.medicoClinica.medico.idNavigation.nome
                  : profile.role === "Medico" && consultaSelecionada
                  ? consultaSelecionada.paciente.idNavigation.nome
                  : !consultaSelecionada && ""
              }
              texto1={
                profile.role === "Paciente" && consultaSelecionada
                  ? consultaSelecionada.medicoClinica.medico.especialidade
                      .especialidade1
                  : profile.role === "Medico" && consultaSelecionada
                  ? calcularIdadeDoUsuario(
                      consultaSelecionada.paciente.dataNascimento
                    ) + " anos"
                  : !consultaSelecionada && ""
              }
              texto2={
                profile.role === "Paciente" && consultaSelecionada
                  ? "CRM: " + consultaSelecionada.medicoClinica.medico.crm
                  : profile.role === "Medico" && consultaSelecionada
                  ? consultaSelecionada.paciente.idNavigation.email
                  : !consultaSelecionada && ""
              }
              textButton1={
                profile.role === "Paciente"
                  ? "Ver local da consulta"
                  : profile.role === "Medico" &&
                    !consultaSelecionada.receita.medicamento &&
                    !consultaSelecionada.descricao &&
                    !consultaSelecionada.diagnostico
                  ? "Inserir Prontuário"
                  : "Atualizar prontuário"
              }
              textButton2={"Cancelar"}
              cancel={false}
              buttonAtivado={
                profile.role === "Paciente" ||
                (profile.role === "Medico" &&
                  new Date(consultaSelecionada.dataConsulta) < Date.now())
              }
              HandleModal={() => {
                setVerModalProximasConsultas(false);

                profile.role === "Paciente"
                  ? navigation.navigate("ClinicAddress", {
                      clinicaId: consultaSelecionada.medicoClinica.clinicaId,
                    })
                  : profile.role === "Medico" &&
                    new Date(consultaSelecionada.dataConsulta) < Date.now()
                  ? navigation.navigate("ViewMedicalRecord", {
                      consulta: {
                        idConsulta: consultaSelecionada.id,
                        descricao: consultaSelecionada.descricao,
                        diagnostico: consultaSelecionada.diagnostico,
                        prescricao: consultaSelecionada.receita.medicamento,
                        foto:
                          profile.role === "Medico"
                            ? consultaSelecionada.paciente.idNavigation.foto
                            : consultaSelecionada.medicoClinica.medico
                                .idNavigation.foto,
                        nome:
                          profile.role !== "Medico"
                            ? consultaSelecionada.medicoClinica.medico
                                .idNavigation.nome
                            : consultaSelecionada.paciente.idNavigation.nome,

                        medico: {
                          idMedico: consultaSelecionada.medicoClinica.medico.id,
                          // fotoMedico:
                          //   consultaSelecionada.medicoClinica.medico.idNavigation.foto,

                          crm: consultaSelecionada.medicoClinica.medico.crm,
                          especialidade:
                            consultaSelecionada.medicoClinica.medico
                              .especialidade.especialidade1,
                        },

                        paciente: {
                          idPaciente: consultaSelecionada.paciente.id,
                          // fotoPaciente: consultaSelecionada.paciente.idNavigation.foto,
                          email:
                            consultaSelecionada.paciente.idNavigation.email,
                          idade: calcularIdadeDoUsuario(
                            consultaSelecionada.paciente.dataNascimento
                          ),
                        },
                      },
                    })
                  : null;
                setShowModalAppointment(false);
              }}
            />

            <ModalProximasConsultas
              setStatusLista={setStatusLista}
              setVerModalProximasConsultas={setVerModalProximasConsultas}
              verModalProximasConsultas={verModalProximasConsultas}
              profileData={profile}
              proximasConsultas={proximasConsultas}
              setConsultaSelecionada={setConsultaSelecionada}
              setShowModalAppointment={setShowModalAppointment}
              setShowModalCancel={setShowModalCancel}
              getProximasConsultas={getProximasConsultas}
              navigation={navigation}
              setDataSelecionada={setDataConsulta}
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
