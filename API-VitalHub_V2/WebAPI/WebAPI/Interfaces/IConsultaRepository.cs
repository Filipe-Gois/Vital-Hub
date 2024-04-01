using Microsoft.Identity.Client;
using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IConsultaRepository
    {
        public void Cadastrar(Consulta consulta);

        public Consulta BuscarPorId(Guid id);

        public void EditarStatus(ConsultaViewModel consultaModel);
        public void EditarProntuario(ConsultaViewModel consultaModel);

        public List<Consulta> ListarTodos();
        public List<Consulta> ListarPorMedico(Guid IdMedico);
        public List<Consulta> ListarPorPaciente(Guid IdPaciente);
        
    }
}
