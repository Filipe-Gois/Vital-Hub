using Microsoft.Identity.Client;
using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IConsultaRepository
    {
        public void Cadastrar(Consulta consulta);

        public Consulta BuscarPorId(Guid id);


        //Guid idUsuario talvez precise colocar como parametro junto com o idConsulta no metodo de cancelar consulta || , ConsultaViewModel consultaCancelada
        public void CancelarConsulta(Guid idConsulta);

        /// <summary>
        /// Método responsável por verificar periodicamente se a data da consulta já passou. Caso tenha passado, alterar a situação para "Realizada"
        /// </summary>
        /// <param name="id"></param>
        /// <param name="consultaModel"></param>
        public void AtualizarStatus();
        public void EditarProntuario(Guid id, ConsultaViewModel consultaModel);

        public List<Consulta> ListarTodos();
        public List<Consulta> ListarPorMedico(Guid IdMedico);
        public List<Consulta> ListarPorPaciente(Guid IdPaciente);

    }
}
