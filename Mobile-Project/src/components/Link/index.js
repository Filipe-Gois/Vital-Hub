import { Text } from "react-native"
import { LinkStyle } from "./style"

export const LinkForget = ({ texto = "", onPress = null }) => {

    return (
        <LinkStyle onPress={onPress}>
            <Text>{texto}
            </Text>
        </LinkStyle>
    )
}