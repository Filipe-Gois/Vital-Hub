import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

export const useGoogleUserData = () => {
  const { user: userGoogle } = useUser();
  const [usuarioGoogleData, setUsuarioGoogleData] = useState({
    id: "",
    nome: "",
    email: "",
    foto: "",
  });

  useEffect(() => {
    if (userGoogle) {
      setUsuarioGoogleData({
        id: userGoogle.id,
        nome: userGoogle.fullName,
        email: userGoogle.emailAddresses[0].emailAddress,
        foto: userGoogle.imageUrl,
      });
    }
  }, [userGoogle]);

  return usuarioGoogleData;
};
