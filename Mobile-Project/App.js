import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import {
  MontserratAlternates_500Medium,
  MontserratAlternates_600SemiBold,
  MontserratAlternates_700Bold,
} from "@expo-google-fonts/montserrat-alternates";
import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Navegacao } from "./src/screens/Navegacao/Navegacao";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import RecoverPasswordScreen from "./src/screens/RecoverPasswordScreen/RecoverPasswordScreen";
import CheckEmailSreen from "./src/screens/CheckEmailSreen/CheckEmailSreen";
import RedefinePasswordScreen from "./src/screens/RedefinePasswordScreen/RedefinePassword";
import CreateAccountScreen from "./src/screens/CreateAccountScreen/CreateAccountScreen";
import MedicalRecordScreen from "./src/screens/MedicalRecordScreen/MedicalRecordScreen";
import { PerfilScreen } from "./src/screens/PerfilScreen/PerfilScreen";
import { ConsultasScreen } from "./src/screens/ConsultasScreen/ConsultasScreen";
import SelectClinicScreen from "./src/screens/SelectClinicScreen/SelectClinicScreen";
import SelectDoctorScreen from "./src/screens/SelectDoctorScreen/SelectDoctorScreen";
import SelectDateScreen from "./src/screens/SelectDateScreen/SelectDateScreen";
import ViewMRScreen from "./src/screens/ViewMRScreen/ViewMRScreen";
import ClinicAddressScreen from "./src/screens/ClinicAddressScreen/ClinicAddressScreen";
import Main from "./src/screens/Main/Main";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext, userDecodeToken } from "./src/Utils/Auth";
import AuthProvider from "./src/Context/AuthProvider";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

const App = () => {
  // const [userData, setUserData] = useState({});

  const requestGaleriaPermissions = async () => {
    await MediaLibrary.requestPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  };

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    // async () => {
    //   const token = await AsyncStorage.getItem("token");
    //   setUserData(token === null ? {} : JSON.parse(token));

    //   if (!token) {
    //     return null;
    //   }
    // };
    async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
    };
    requestGaleriaPermissions();

    return (cleanUp = () => {});
  }, []);

  let [fontsLoaded, fontError] = useFonts({
    MontserratAlternates_500Medium,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_700Bold,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    //container: envolve toda a estrutura da navegação
    //navigator: componente para a navegação
    //screen: tela
    //component: componente que será chamado
    //options(title): titulo da tela

    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Navegacao"
          component={Navegacao}
          options={{ title: "Navegacao" }}
        /> */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />

        <Stack.Screen name="Main" component={Main} />

        {/* <Stack.Screen
          name="Navegação"
          component={Navegacao}
          options={{ title: "Navegação" }}
        /> */}

        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPasswordScreen}
          options={{ title: "RecoverPassword", headerShown: false }}
        />

        <Stack.Screen
          name="CheckEmail"
          component={CheckEmailSreen}
          options={{ title: "CheckyourEmail" }}
        />

        <Stack.Screen
          name="RedefinePassword"
          component={RedefinePasswordScreen}
          options={{ title: "Redefineyourpassword" }}
        />

        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={{ title: "CreateAccount" }}
        />

        <Stack.Screen
          name="MedicalRecord"
          component={MedicalRecordScreen}
          options={{ title: "MedicalRecord" }}
        />

        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{ title: "Perfil" }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />

        <Stack.Screen
          name="SelectClinic"
          component={SelectClinicScreen}
          options={{ title: "SelectClinic" }}
        />
        <Stack.Screen
          name="SelectDoctor"
          component={SelectDoctorScreen}
          options={{ title: "SelectDoctor" }}
        />

        <Stack.Screen
          name="SelectDate"
          component={SelectDateScreen}
          options={{ title: "SelectDate" }}
        />

        <Stack.Screen
          name="ViewMedicalRecord"
          component={ViewMRScreen}
          options={{ title: "ViewMedicalRecord" }}
        />

        <Stack.Screen
          name="ClinicAddress"
          component={ClinicAddressScreen}
          options={{ title: "ClinicAddress" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
