import * as SecureStore from "expo-secure-store";

const getToken = async (key = "") => {
  try {
    return SecureStore.getItem(key);
  } catch (error) {
    console.log(error);
  }
};

const saveToken = async (key = "", value = "") => {
  try {
    return SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const tokenCache = { getToken, saveToken };
