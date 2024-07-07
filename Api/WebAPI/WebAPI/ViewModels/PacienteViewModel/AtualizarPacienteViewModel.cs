using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.ViewModels.PacienteViewModel.PacienteViewModel
{
    public class AtualizarPacienteViewModel
    {
        public string? Rg { get; set; }

        public string? Cpf { get; set; }
        
        public DateTime? DataNascimento { get; set; }

        public string? Cep { get; set; }

        public string? Logradouro { get; set; }

        public int? Numero { get; set; }

        public string? Cidade { get; set; }
    }
}
