using Microsoft.Identity.Client;
using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IConsultaRepository
    {
        public void Cadastrar(Consulta consulta);
        public Consulta BuscarPorId(Guid id);
        public void EditarStatus(Guid idConsulta, string status);

        /// <summary>
        /// Método responsável por verificar periodicamente se a data da consulta já passou. Caso tenha passado, alterar a situação para "Realizada"
        /// </summary>
        /// <param name="id"></param>
        /// <param name="consultaModel"></param>
        public void AtualizarStatus();
        public void EditarProntuario(Guid idConsulta, ProntuarioViewModel prontuarioviewModel);
        public List<Consulta> ListarTodos();
        public List<Consulta> ListarPorMedico(Guid IdMedico);
        public List<Consulta> ListarPorPaciente(Guid IdPaciente);
        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid id);
        public void CancelarConsulta(Guid idConsulta);



        /// <summary>
        /// Método responsável por verificar periodicamente se a data da consulta já passou. Caso tenha passado, alterar a situação para "Realizada"
        /// </summary>
        /// <param name="id"></param>
        /// <param name="consultaModel"></param>


    }
}