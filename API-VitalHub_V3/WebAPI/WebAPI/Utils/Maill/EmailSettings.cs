namespace WebAPI.Utils.Maill
{
    public class EmailSettings
    {
        //email do remetente
        public string? Email { get; set; }
        //senha do remetente
        public string? Password { get; set; }
        //host do servidor SMTP - SIMPLE MAIL TRANSFER PROTOCOL
        public string? Host { get; set; }

        //Nome exibido do remetente
        public string? DisplayName { get; set; }

        //Porta do servidor SMTP
        public int Port { get; set; }
    }
}
