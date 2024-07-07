using WebAPI.Domains;
using WebAPI.ViewModels.PacienteViewModel.PacienteViewModel;

namespace WebAPI.Interfaces
{
    public interface IPacienteRepository
    {
        public void Cadastrar(Usuario paciente, bool isCreateAccountGoogle = false);
        public Paciente BuscarPorId(Guid Id);
        public Paciente AtualizarPerfil(Guid id, AtualizarPacienteViewModel paciente);
        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid id);
        public List<Consulta> ListarProximasConsultasPaciente(Guid idPaciente);
    }
}