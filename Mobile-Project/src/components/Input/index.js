import React from "react";
import { InputCheckEmailStyle, InputSelectBox, InputStyle } from "./style";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesome } from "@expo/vector-icons";

export const Input = React.forwardRef((props, ref) => {
  const {
    placeholder,
    fieldValue,
    onChangeText,
    keyType,
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
  } = props;

  return (
    <InputStyle
      ref={ref}
      secureTextEntry={secureTextEntry}
      fieldMinHeight={fieldMinHeight}
      fieldWidth={fieldWidth}
      textColor={textColor}
      fieldMaxWidth={fieldMaxWidth}
      fieldHeight={fieldHeight}
      placeholder={placeholder}
      value={fieldValue}
      onChangeText={onChangeText}
      keyboardType={keyType}
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
});

export const InputCheckEmail = ({
  placeholder,
  fieldValue,
  onChangeText,
  keyType,
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
      fieldWidth={fieldWidth}
      fieldMaxWidth={fieldMaxWidth}
      fieldHeight={fieldHeight}
      placeholder={placeholder}
      fieldValue={fieldValue}
      onChangeText={onChangeText}
      keyType={keyType}
      maxLength={maxLength}
      onEndEditing={onEndEditing}
      border={border}
      backGround={backGround}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

export const InputSelect = () => {
  return (
    <InputSelectBox>
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
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "JavaScript", value: "JavaScript" },
          { label: "TypeScript", value: "TypeScript" },
          { label: "Python", value: "Python" },
          { label: "Java", value: "Java" },
          { label: "C++", value: "C++" },
          { label: "C", value: "C" },
        ]}
      />
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
