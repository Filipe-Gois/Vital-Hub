import React, { useEffect } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import SplashAnimation from "../../assets/Animations/SplashAnimationFitTrack.json";
import { LinearGradientView } from "./style";
import { Dimensions } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

const SplashScreen = () => {
  const size = Dimensions.get("window").width * 0.5;
  const navigation = useNavigation();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      if (isSignedIn) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Main" }],
          })
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      }
    }, 2000);

    return (cleanUp = () => {});
  }, [isSignedIn]);

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
