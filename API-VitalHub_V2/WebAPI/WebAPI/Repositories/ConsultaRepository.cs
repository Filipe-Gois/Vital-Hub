using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {

        public VitalContext ctx = new VitalContext();

        public Consulta BuscarPorId(Guid id)
        {
            return ctx.Consultas.Find(id);
        }

        public void Cadastrar(Consulta consulta)
        {
            ctx.Consultas.Add(consulta);
            ctx.SaveChanges();


        }



        public void EditarProntuario(Guid id, ConsultaViewModel consultaModel)
        {
            Consulta buscada = ctx.Consultas.Find(id)!;

            buscada.Descricao = consultaModel.Descricao;
            buscada.Diagnostico = consultaModel.Diagnostico;
            ctx.Update(buscada);
            ctx.SaveChanges();
        }



        public void EditarStatus(Guid id, ConsultaViewModel consultaModel)
        {
            Consulta buscada = ctx.Consultas.Find(id)!;

            buscada.SituacaoId = consultaModel.SituacaoId;
            ctx.Update(buscada);
            ctx.SaveChanges();
        }

        public void EditarStatus(ConsultaViewModel consultaModel)
        {
            throw new NotImplementedException();
        }

        public List<Consulta> ListarPorMedico(Guid IdMedico)
        {
            List<Consulta> listaConsultas = ctx.Consultas
                .Include(x => x.Paciente!.IdNavigation)
                .Include(x => x.Situacao)
                .Include(x => x.Prioridade)
                .Where(x => x.MedicoClinica != null && x.MedicoClinica.MedicoId == IdMedico)
                .ToList();

            return listaConsultas;

        }

        public List<Consulta> ListarPorPaciente(Guid IdPaciente)
        {
            List<Consulta> listaConsultas = ctx.Consultas
                .Include(x => x.MedicoClinica!.Medico!.IdNavigation)
                .Include(x => x.Situacao)
                .Include(x => x.Prioridade)
                .Where(x => x.PacienteId != null && x.PacienteId == IdPaciente)
                .ToList();

            return listaConsultas;
        }

        public List<Consulta> ListarTodos()
        {
            return ctx.Consultas.ToList();
        }
    }
}
