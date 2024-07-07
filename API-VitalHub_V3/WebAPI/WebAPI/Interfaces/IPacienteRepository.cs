using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IPacienteRepository
    {
        public void Cadastrar(Usuario paciente, bool isCreateAccountGoogle = false);
        public Paciente BuscarPorId(Guid Id);
        public Paciente AtualizarPerfil(Guid id, PacienteViewModel paciente);
        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid id);
        public List<Consulta> ListarProximasConsultasPaciente(Guid idPaciente);
    }
}