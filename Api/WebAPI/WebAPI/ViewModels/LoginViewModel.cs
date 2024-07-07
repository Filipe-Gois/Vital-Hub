using System.ComponentModel.DataAnnotations;

namespace WebAPI.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Informe o e-mail do usuário!")]
        public string? Email { get; set; }

        public string? Senha { get; set; }

        public string? IdGoogleAccount { get; set; }
    }
}
