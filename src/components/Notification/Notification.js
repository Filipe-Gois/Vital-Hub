//importar recursos do expo notification

import * as Notifications from "expo-notifications";

//solicita permissões de notificação ao iniciar o APP
Notifications.requestPermissionsAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const HandleCallNotification = async ({ title, body, sound }) => {
  const { granted } = await Notifications.requestPermissionsAsync();

  if (!granted) {
    alert("Você não ativou as notificações!");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: null,
  });
};
