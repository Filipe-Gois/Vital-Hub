namespace WebAPI.Utils.Maill
{
    public class MailRequest
    {
        //email do destinatario
        public string? ToEmail { get; set; }

        //assunto do email
        public string? Subject { get; set; }
        //corpo do email
        public string? Body { get; set; }
    }
}
