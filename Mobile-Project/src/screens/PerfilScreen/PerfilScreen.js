import { BannerUserComponent } from "../../components/BannerUser";
import {
  Container,
  FormBox,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import UserImage from "../../assets/UserProfileImage.jpg";
import Label from "../../components/Label";
import { Button, ButtonGray } from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import { Theme } from "../../themes";
import { ContainerInputBox } from "../../components/Container";
import { Input } from "../../components/Input";
import { ParagraphSemiBold } from "../../components/Paragraph/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { userDecodeToken } from "../../Utils/Auth";

export const PerfilScreen = ({ navigation }) => {
  const [user, setUser] = useState({});

  const fetchProfileData = async () => {
    const userInfo = await userDecodeToken();

    if (userInfo) {
      setUser(userInfo);
    }
  };

  useEffect(() => {
    fetchProfileData();
    return (cleanUp = () => {});
  }, []);

  return (
    <Container>
      <MainContentScroll>
        <MainContent>
          <BannerUserComponent
            src={UserImage}
            name={user.name}
            isAge={false}
            email={user.email}
          />

          <FormBox>
            <Label
              placeholderTextColor={Theme.colors.grayV1}
              titulo="Data de nascimento:"
              placeholder={"04/05/1999"}
              border="none"
              backGround={Theme.colors.v2LightWhite}
            />

            <Label
              placeholderTextColor={Theme.colors.grayV1}
              titulo="CPF"
              placeholder={"859********"}
              border="none"
              backGround={Theme.colors.v2LightWhite}
            />

            <Label
              placeholderTextColor={Theme.colors.grayV1}
              titulo="Endereço"
              placeholder={"Rua Vicenso Silva, 987"}
              border="none"
              backGround={Theme.colors.v2LightWhite}
            />

            <ContainerInputBox
              fieldDirection="row"
              fieldJustifyContent="space-between"
            >
              <Label
                placeholderTextColor={Theme.colors.grayV1}
                widthLabel={"45%"}
                fieldWidth={"100"}
                fieldMaxWidth={100}
                titulo="Cep"
                placeholder={"06548-909"}
                border="none"
                backGround={Theme.colors.v2LightWhite}
              />

              <Label
                placeholderTextColor={Theme.colors.grayV1}
                widthLabel={"45%"}
                fieldWidth={"100"}
                fieldMaxWidth={100}
                titulo="Cidade"
                placeholder={"Moema-SP"}
                border="none"
                backGround={Theme.colors.v2LightWhite}
              />
            </ContainerInputBox>

            <Button>
              <ButtonTitle>Salvar</ButtonTitle>
            </Button>
            <Button>
              <ButtonTitle>Editar</ButtonTitle>
            </Button>

            <ButtonGray
              onPress={async () => {
                await AsyncStorage.removeItem("token");
                navigation.replace("Login");
              }}
            >
              <ButtonTitle>Sair do app</ButtonTitle>
            </ButtonGray>
          </FormBox>
        </MainContent>
      </MainContentScroll>
    </Container>
  );
};
