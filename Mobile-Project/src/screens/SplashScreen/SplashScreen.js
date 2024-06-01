import React, { useEffect } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import SplashAnimation from "../../assets/Animations/SplashAnimationFitTrack.json";
import { LinearGradientView } from "./style";
import { Dimensions } from "react-native";

const SplashScreen = () => {
  const size = Dimensions.get("window").width * 0.5;
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    }, 2000);

    return (cleanUp = () => {});
  }, []);

  return (
    <LinearGradientView>
      <LottieView
        source={SplashAnimation}
        autoPlay
        loop
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </LinearGradientView>
  );
};

export default SplashScreen;
