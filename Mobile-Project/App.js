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
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import Routes from "./src/Routes/Routes";

const App = () => {
  // const [userData, setUserData] = useState({});

  const requestGaleriaPermissions = async () => {
    await MediaLibrary.requestPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  };

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

    //PaperProvider: usado para envolver os componentes do react native paper
    <Routes />
  );
};

export default App;
