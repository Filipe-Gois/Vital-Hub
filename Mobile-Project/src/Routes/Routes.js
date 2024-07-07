import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import Main from "../screens/Main/Main";
import RecoverPasswordScreen from "../screens/RecoverPasswordScreen/RecoverPasswordScreen";
import CheckEmailScreen from "../screens/CheckEmailSreen/CheckEmailSreen";
import RedefinePasswordScreen from "../screens/RedefinePasswordScreen/RedefinePassword";
import CreateAccountScreen from "../screens/CreateAccountScreen/CreateAccountScreen";
import { PerfilScreen } from "../screens/PerfilScreen/PerfilScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SelectClinicScreen from "../screens/SelectClinicScreen/SelectClinicScreen";
import SelectDoctorScreen from "../screens/SelectDoctorScreen/SelectDoctorScreen";
import SelectDateScreen from "../screens/SelectDateScreen/SelectDateScreen";
import ViewMRScreen from "../screens/ViewMRScreen/ViewMRScreen";
import ClinicAddressScreen from "../screens/ClinicAddressScreen/ClinicAddressScreen";
import { StatusBar } from "react-native";
import AuthProvider from "../Contexts/Auth";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "../Storage/tokenCache";
import { useEffect } from "react";

const Routes = () => {
  const Stack = createNativeStackNavigator();

  const InitialLayout = () => {
    return (
      <>
        <StatusBar backgroundColor="#000" barStyle="default" />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Splash"
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ title: "Splash" }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen name="Main" component={Main} />

          <Stack.Screen
            name="RecoverPassword"
            component={RecoverPasswordScreen}
            options={{ title: "RecoverPassword" }}
          />

          <Stack.Screen
            name="CheckEmail"
            component={CheckEmailScreen}
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
      </>
    );
  };

  const PUBLIC_CLERK_PUBLISHABLE_KEY =
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider
      publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <PaperProvider>
        <AuthProvider>
          <NavigationContainer>
            <InitialLayout />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </ClerkProvider>
  );
};

export default Routes;
