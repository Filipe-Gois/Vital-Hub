namespace WebAPI.Utils.Maill
{
    public interface IEmailService
    {
        //metodo assincrono para envio de email
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
