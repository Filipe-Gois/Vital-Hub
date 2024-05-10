import { useState } from "react";
import { apiFilipe, apiGabriel, usuarioResource } from "../../Services/Service";
import { Button } from "../../components/Button/style";
import { ButtonTitle } from "../../components/ButtonTitle/style";
import {
  Container,
  FormBox,
  InputBox,
  MainContent,
  MainContentScroll,
} from "../../components/Container/style";
import { Input, InputPassword } from "../../components/Input";
import { LogoComponent } from "../../components/Logo";
import { Paragraph } from "../../components/Paragraph/style";
import { Title } from "../../components/Title/style";
import { LeftArrowAOrXComponent } from "../../components/LeftArrowAOrX";
import { Alert } from "react-native";
import { ButtonAsync } from "../../components/Button";
import DialogComponent from "../../components/Dialog/Dialog";

const RedefinePasswordScreen = ({ navigation, route }) => {
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senhaVisivelConfirmar, setSenhaVisivelConfirmar] = useState(false);

  const [loading, setLoading] = useState(false);

  const [dialog, setDialog] = useState({});
  const [showDialog, setShowDialog] = useState(false);

  const alterarSenha = async () => {
    setLoading(true);
    if (senha === confirmar) {
      await apiFilipe
        .put(
          `${usuarioResource}/AlterarSenha?email=${route.params.emailRecuperacao}`,
          {
            senhaNova: senha,
          }
        )
        .then(() => {
          navigation.replace("Login");
        })
        .catch((error) => {});
    } else {
      setDialog({
        status: "erro",
        contentMessage: "As senhas devem ser iguais!",
      });
      setShowDialog(true);
    }
    setLoading(false);
  };

  return (
    <Container>
      <DialogComponent
        {...dialog}
        visible={showDialog}
        setVisible={setShowDialog}
        setDialog={setDialog}
      />
      <MainContentScroll>
        <MainContent>
          <LeftArrowAOrXComponent isLefArrow={false} navigation={navigation} />
          <LogoComponent />
          <FormBox>
            <Title>Redefinir senha</Title>
            <Paragraph>Insira e confirme a sua nova senha</Paragraph>
            <InputBox gap={"20px"}>
              <InputPassword
                label={"Nova Senha"}
                senhaVisivel={senhaVisivel}
                setSenhaVisivel={setSenhaVisivel}
                value={senha}
                onChangeText={(txt) => setSenha(txt)}
              />

              <InputPassword
                label={"Confirmar nova senha"}
                senhaVisivel={senhaVisivelConfirmar}
                setSenhaVisivel={setSenhaVisivelConfirmar}
                value={confirmar}
                onChangeText={(txt) => setConfirmar(txt)}
              />
            </InputBox>

            <ButtonAsync
              buttonAtivado={senha && confirmar}
              onPress={senha && confirmar ? () => alterarSenha() : null}
              disabled={loading}
              loading={loading}
              textButton={"CONFIRMAR NOVA SENHA"}
            />
          </FormBox>
        </MainContent>
      </MainContentScroll>
    </Container>
  );
};

export default RedefinePasswordScreen;
