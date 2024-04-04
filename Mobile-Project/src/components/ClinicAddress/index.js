import React from "react";
import { Container, FormBox, InputBox } from "../Container/style";
import { Title } from "../Title/style";
import { ParagraphSemiBold } from "../Paragraph/style";
import Label from "../Label";
import { ClinicAddressStyle } from "./style";
import { Theme } from "../../themes";

const ClinicAddress = ({ dados = {} }) => {
  return (
    <ClinicAddressStyle>
      <FormBox gap={"8px"}>
        {/* <Title>{dados.nomeFantasia && dados.nomeFantasia}</Title> */}
        <ParagraphSemiBold>
          {/* {dados.endereco.cidade && dados.endereco.cidade} */}
        </ParagraphSemiBold>

        <InputBox margin={"12px 0 0 0"} gap={"20px"}>
          <Label
            textColor={Theme.colors.grayV1}
            placeholderTextColor={Theme.colors.grayV1}
            border="none"
            backGround={Theme.colors.v2LightWhite}
            titulo="Endereço"
            // placeholder={dados.endereco.logradouro && dados.endereco.logradouro}
            // fieldValue={dados.endereco.logradouro && dados.endereco.logradouro}
          />

          <InputBox fieldFlexDirection={"row"} justifyContent={"space-between"}>
            <Label
              textColor={Theme.colors.grayV1}
              widthLabel={"45%"}
              placeholderTextColor={Theme.colors.grayV1}
              border="none"
              backGround={Theme.colors.v2LightWhite}
              titulo="Número"
              // placeholder={dados && dados.endereco.numero}
              // fieldValue={dados.endereco.numero && dados.endereco.numero}
            />
            <Label
              textColor={Theme.colors.grayV1}
              widthLabel={"45%"}
              placeholderTextColor={Theme.colors.grayV1}
              border="none"
              backGround={Theme.colors.v2LightWhite}
              titulo="Bairro"
              // placeholder={dados && dados.bairro}
              // fieldValue={}
            />
          </InputBox>
        </InputBox>
      </FormBox>
    </ClinicAddressStyle>
  );
};

export default ClinicAddress;
