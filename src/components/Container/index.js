import { ContainerBoxStyle } from "./style";

export const ContainerInputBox = ({
  fieldDirection = "column",
  children,
  fieldJustifyContent = "flex-start",
  fieldAlignItems = "stretch",
  fieldGap = 0,
  fieldMargin = 0,
}) => {
  return (
    <ContainerBoxStyle
      fieldAlignItems={fieldAlignItems}
      fieldJustifyContent={fieldJustifyContent}
      fieldDirection={fieldDirection}
      fieldGap={fieldGap}
      fieldMargin={fieldMargin}
    >
      {children}
    </ContainerBoxStyle>
  );
};
