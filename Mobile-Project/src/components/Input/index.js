import React, { useEffect, useState } from "react";
import {
  InputCheckEmailStyle,
  InputLibrary,
  InputSelectBox,
  InputStyle,
} from "./style";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import moment from "moment";
import { HelperText, TextInput } from "react-native-paper";
import { Theme } from "../../themes";
import { LabelStyle } from "../Label/style";

// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesome } from "@expo/vector-icons";

export const Input = ({
  placeholder,
  fieldValue,
  onChangeText,
  keyboardType,
  maxLength,
  onEndEditing,
  fieldWidth = 100,
  fieldMaxWidth = 100,
  fieldHeight = 55,
  backGround = "",
  border = "",
  placeholderTextColor,
  fieldPaddingBottom,
  textColor,
  fieldTextAlign,
  fieldMinHeight,
  secureTextEntry = false,
  autoFocus,
  autoCorrect,
}) => {
  return (
    <InputStyle
      autoCorrect={autoCorrect}
      secureTextEntry={secureTextEntry}
      fieldMinHeight={fieldMinHeight}
      fieldWidth={fieldWidth}
      textColor={textColor}
      fieldMaxWidth={fieldMaxWidth}
      fieldHeight={fieldHeight}
      placeholder={placeholder}
      value={fieldValue}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      maxLength={maxLength}
      onEndEditing={onEndEditing}
      border={border}
      backGround={backGround}
      placeholderTextColor={placeholderTextColor}
      fieldPaddingBottom={fieldPaddingBottom}
      fieldTextAlign={fieldTextAlign}
      multiline={true}
      numberOfLines={4}
      autoFocus={autoFocus}
    />
  );
};

export const InputCheckEmail = ({
  placeholder,
  inputRef,
  fieldValue,
  onChangeText,
  keyboardType,
  maxLength,
  onEndEditing,
  fieldWidth = 100,
  fieldMaxWidth = 100,
  fieldHeight = 55,
  backGround = "",
  border = "",
  placeholderTextColor,
}) => {
  return (
    <InputCheckEmailStyle
      ref={inputRef}
      fieldWidth={fieldWidth}
      fieldMaxWidth={fieldMaxWidth}
      fieldHeight={fieldHeight}
      placeholder={placeholder}
      fieldValue={fieldValue}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      maxLength={maxLength}
      onEndEditing={onEndEditing}
      border={border}
      backGround={backGround}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

export const InputSelectHours = ({ setHoraSelecionada }) => {
  const dataAtual = moment().format("YYYY-MM-DD");
  const [arrayOptions, setArrayOptions] = useState(null);

  const loadOptions = async () => {
    //capturar a quantidade de horas q faltam p dar meia noite

    const horasRestantes = moment(dataAtual)
      .add(24, "hours")
      .diff(moment(), "hours");

    const options = Array.from({ length: horasRestantes }, (_, index) => {
      let valor = new Date().getHours() + (index + 1);

      return {
        label: `${valor}:00`,
        value: `${valor}:00`,
      };
    });

    setArrayOptions(options);
  };

  useEffect(() => {
    loadOptions();
    return (cleanUp = () => {});
  }, []);
  return (
    <InputSelectBox>
      {arrayOptions ? (
        <RNPickerSelect
          style={style}
          // Icon={() => {
          // return (
          // <FontAwesomeIcon icon={faCaretDown} color="#34898F" size={22} />
          // <FontAwesome name="sort-down" size={22} color="#34898F" />
          // );
          // }}
          placeholder={{
            label: "Selecionar horário",
            value: null,
            color: "#34898F",
          }}
          onValueChange={(value) => setHoraSelecionada(value)}
          items={arrayOptions}
        />
      ) : (
        <ActivityIndicator />
      )}
    </InputSelectBox>
  );
};

const style = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#60BFC5",
    borderRadius: 5,
    color: "#34898F",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "MontserratAlternates_600SemiBold",
  },
  inputAndroid: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#60BFC5",
    borderRadius: 5,
    color: "#34898F",
    alignItems: "center",
    justifyContent: "center",

    fontFamily: "MontserratAlternates_600SemiBold",
  },
  iconContainer: {
    top: "25%",
    marginRight: 10,
  },
  placeholder: {
    color: "#34898F",
  },
});

export const InputEmail = ({ value, onChangeText, visible }) => {
  return (
    <View style={{ width: "100%", height: "max-content", marginBottom: 10 }}>
      <InputLibrary
        multiline={false}
        keyboardType="email-address"
        activeUnderlineColor={Theme.colors.primary}
        textColor={Theme.colors.primary}
        outlineColor="transparent"
        label={"Email:"}
        value={value}
        onChangeText={onChangeText}
        // hasErrors={hasErrors}
      />
      <HelperText style={{ padding: 0 }} type="error" visible={visible}>
        Insira um formato de e-mail válido!
      </HelperText>
    </View>
  );
};

export const InputPassword = ({
  senhaVisivel,
  setSenhaVisivel,
  onPressIcon,
  value,
  onChangeText,
}) => {
  return (
    <InputLibrary
      multiline={false}
      secureTextEntry={!senhaVisivel}
      right={
        <TextInput.Icon
          style={{ margin: 10 }}
          icon={senhaVisivel ? "eye" : "eye-off"}
          onPress={() =>
            senhaVisivel ? setSenhaVisivel(false) : setSenhaVisivel(true)
            //setSenhaVisivel(!senhaVisivel) testar com essa lógica
          }
          color={senhaVisivel ? Theme.colors.primary : Theme.colors.grayV5}
        />
      }
      keyboardType="default"
      activeUnderlineColor={Theme.colors.primary}
      textColor={Theme.colors.primary}
      outlineColor="transparent"
      label={"Senha:"}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export const SelectInput = () => {
  return <></>;
};
