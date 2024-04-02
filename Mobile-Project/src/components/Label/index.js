import { Input } from "../Input";
import { ParagraphSemiBold } from "../Paragraph/style";
import { LabelStyle } from "./style";

const Label = ({
  titulo = "",
  placeholder,
  fieldValue,
  onChangeText,
  keyType,
  maxLength,
  onEndEditing,
  fieldWidth = 100,
  fieldHeight = 55,
  backGround = "",
  border = "",
  fieldMaxWidth = 100,
  widthLabel,
  maxWidthLabel,
  placeholderTextColor,
  fieldPaddingBottom,
  textColor,
  fieldTextAlign,
  isTitulo = true,
  fieldMinHeight,
  editable,
  pointerEvents,
  autoFocus,
  refInput,
}) => {
  return (
    <LabelStyle
      pointerEvents={pointerEvents}
      widthLabel={widthLabel}
      maxWidthLabel={maxWidthLabel}
    >
      {isTitulo && <ParagraphSemiBold>{titulo}</ParagraphSemiBold>}

      <Input
        ref={refInput}
        autoFocus={autoFocus}
        editable={editable}
        textColor={textColor}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        fieldValue={fieldValue}
        onChangeText={onChangeText}
        keyType={keyType}
        maxLength={maxLength}
        onEndEditing={onEndEditing}
        fieldWidth={fieldWidth}
        fieldHeight={fieldHeight}
        border={border}
        backGround={backGround}
        fieldMaxWidth={fieldMaxWidth}
        fieldPaddingBottom={fieldPaddingBottom}
        fieldTextAlign={fieldTextAlign}
        fieldMinHeight={fieldMinHeight}
      />
    </LabelStyle>
  );
};

export default Label;
