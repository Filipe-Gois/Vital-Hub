import { Paragraph } from "../Paragraph/style"
import { Title } from "../Title/style"
import { AgeAndEmailBox, ContainerBannerUser, ImageProfileStyle, UserInfoBox } from "./style"

// esse componente será responsável por exibir os dados do paciente ou do médico, alterar o boolean "isUser" para "false" para exibir os dados comn um médico

export const BannerUserComponent = ({ src = "",
    isUser = true,
    name = "",
    age = "",
    isAge = true,
    email = "",
    specialty = "",
    crm = "",


}) => {
    return (

        <ContainerBannerUser>


            <ImageProfileStyle source={src} />

            <UserInfoBox>

                

                <Title>{name}</Title>

                <AgeAndEmailBox>

                    {isUser ? isAge && <Paragraph>{age}</Paragraph> : <Paragraph>{specialty}</Paragraph>}




                    <Paragraph>{isUser ? email : crm}</Paragraph>

                </AgeAndEmailBox>

            </UserInfoBox>
        </ContainerBannerUser>
    )
}