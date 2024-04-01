using WebAPI.Domains;

namespace WebAPI.ViewModels
{
    public class ConsultaViewModel
    {
        public Guid? SituacaoId { get; set; }

        public Guid? PacienteId { get; set; }

        public Guid? MedicoClinicaId { get; set; }




        public Guid? PrioridadeId { get; set; }
        public DateTime? DataConsulta { get; set; }
        public string? Descricao { get; set; }

        public string? Diagnostico { get; set; }

        //receita
        public string? Medicamento { get; set; }
        public string? Observacoes { get; set; }

    }
}
