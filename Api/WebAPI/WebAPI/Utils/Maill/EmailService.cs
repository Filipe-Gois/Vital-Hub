
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Security;

namespace WebAPI.Utils.Maill
{
    public class EmailService : IEmailService
    {
        //variavel que armazena as configs de EmailSettings
        private readonly EmailSettings emailSettings;

        //construtor que recebe a dependence injection de EmailSettings
        public EmailService(IOptions<EmailSettings> options)
        {
            emailSettings = options.Value;
        }


        /// <summary>
        /// Método para envio de email
        /// </summary>
        /// <param name="mailRequest"></param>
        /// <returns></returns>
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //objeto que representa o email
                var email = new MimeMessage();

                //define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                //define o destinatario do email
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));

                //define o assunto do email
                email.Subject = mailRequest.Subject;


                //cria o corpo do email
                var builder = new BodyBuilder();

                //define o corpo do email como HTML
                builder.HtmlBody = mailRequest.Body;

                //define o corpo do email no objeto MimeMessage
                email.Body = builder.ToMessageBody();


                //cria um client SMTP para envio de email
                using (var smtp = new SmtpClient())
                {
                    //conecta-se ao servidor SMTP usando os dados de emailSettings
                    smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);

                    //autentica-se no servidor
                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    //envia o email
                    await smtp.SendAsync(email);
                }

                //ou
                //using var smtp = new SmtpClient();

            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}
