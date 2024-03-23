import { useEffect, useState } from "react";

import { Calendar, LocaleConfig } from "react-native-calendars";

const CalendarMaximized = () => {
  const [selected, setSelected] = useState("");

  const currentDate = new Date();
  const startingDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  LocaleConfig.locales["pt-br"] = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  };
  LocaleConfig.defaultLocale = "pt-br";

  return (
    <Calendar
      style={{
        width: 360,
        alignSelf: "center",
        backgroundColor: "#FAFAFA",
      }}
      onDayPress={(day) => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true,
        },
      }}
      minDate={startingDate.toString()}
      theme={{
        calendarBackground: "#FAFAFA",
        arrowColor: "#49B3BA",
        textDisabledColor: "#C6C5CE",
        todayTextColor: "#5F5C6B",
        selectedDayTextColor: "#FAFAFA",
        selectedDayBackgroundColor: "#60BFC5",

        textDayFontSize: 16,
        textMonthFontSize: 20,
        textDayHeaderFontSize: 12,

        textDayStyle: { color: "#5F5C6B" },

        textDayFontFamily: "Quicksand_600SemiBold",
        textDayHeaderFontFamily: "Quicksand_600SemiBold",
        textMonthFontFamily: "MontserratAlternates_600SemiBold",
      }}
      hideArrows={true}
      enableSwipeMonths={true}
    />
  );
};

export default CalendarMaximized;

//Implementar transition para passar os meses

//------

// import { useEffect, useState } from "react";
// import { StyleSheet, View } from "react-native";
// import { Calendar, LocaleConfig } from "react-native-calendars";
// import Animated, {
//   Easing,
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
// } from "react-native-reanimated";

// const CalendarMaximized = () => {
//   const [selected, setSelected] = useState("");

//   // Variável animada para controlar a transição
//   const translateX = useSharedValue(0);

//   // Função para animar a transição
//   const animateTransition = (toValue) => {
//     translateX.value = withTiming(toValue, {
//       duration: 300,
//       easing: Easing.ease,
//     });
//   };

//   // Gesture Handler para detectar o deslizamento
//   const gestureHandler = useAnimatedGestureHandler({
//     onStart: (_, ctx) => {
//       ctx.startX = translateX.value;
//     },
//     onActive: (event, ctx) => {
//       translateX.value = ctx.startX + event.translationX;
//     },
//     onEnd: (event, _) => {
//       const offset = event.translationX;
//       if (offset > 100) {
//         // Se o usuário deslizou mais de  100 pixels para a direita
//         animateTransition(-360); // Transita para o mês anterior
//         // Aqui você pode adicionar a lógica para atualizar a data exibida no calendário
//       } else if (offset < -100) {
//         // Se o usuário deslizou mais de  100 pixels para a esquerda
//         animateTransition(360); // Transita para o próximo mês
//         // Aqui você pode adicionar a lógica para atualizar a data exibida no calendário
//       }
//     },
//   });

//   // Estilo animado para aplicar a transição
//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: translateX.value }],
//     };
//   });

//   const currentDate = new Date();
//   const startingDate = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     currentDate.getDate()
//   );

//   LocaleConfig.locales["pt-br"] = {
//     monthNames: [
//       "Janeiro",
//       "Fevereiro",
//       "Março",
//       "Abril",
//       "Maio",
//       "Junho",
//       "Julho",
//       "Agosto",
//       "Setembro",
//       "Outubro",
//       "Novembro",
//       "Dezembro",
//     ],
//     monthNamesShort: [
//       "Jan",
//       "Fev",
//       "Mar",
//       "Abr",
//       "Mai",
//       "Jun",
//       "Jul",
//       "Ago",
//       "Set",
//       "Out",
//       "Nov",
//       "Dez",
//     ],
//     dayNames: [
//       "Domingo",
//       "Segunda",
//       "Terça",
//       "Quarta",
//       "Quinta",
//       "Sexta",
//       "Sábado",
//     ],
//     dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
//   };
//   LocaleConfig.defaultLocale = "pt-br";

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.calendarContainer, animatedStyle]}>
//         <Calendar
//           style={{
//             width: 360,
//             alignSelf: "center",
//             backgroundColor: "#FAFAFA",
//           }}
//           onDayPress={(day) => {
//             setSelected(day.dateString);
//           }}
//           markedDates={{
//             [selected]: {
//               selected: true,
//               disableTouchEvent: true,
//             },
//           }}
//           minDate={startingDate.toString()}
//           theme={{
//             calendarBackground: "#FAFAFA",
//             arrowColor: "#49B3BA",
//             textDisabledColor: "#C6C5CE",
//             todayTextColor: "#5F5C6B",
//             selectedDayTextColor: "#FAFAFA",
//             selectedDayBackgroundColor: "#60BFC5",

//             textDayFontSize: 16,
//             textMonthFontSize: 20,
//             textDayHeaderFontSize: 12,

//             textDayStyle: { color: "#5F5C6B" },

//             textDayFontFamily: "Quicksand_600SemiBold",
//             textDayHeaderFontFamily: "Quicksand_600SemiBold",
//             textMonthFontFamily: "MontserratAlternates_600SemiBold",
//           }}
//           hideArrows={true}
//           enableSwipeMonths={true}
//         />
//       </Animated.View>
//       <Animated.View
//         style={[styles.gestureArea, animatedStyle]}
//         {...gestureHandler}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   calendarContainer: {
//     width: 360,
//     height: 300,
//     backgroundColor: "#FAFAFA",
//     borderRadius: 10,
//   },
//   gestureArea: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });

// export default CalendarMaximized;
