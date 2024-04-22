using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;

namespace WebAPI.Repositories
{
    public class ConsultaRepository : IConsultaRepository, IHostedService, IDisposable
    {
        private Timer? _timer;

        public VitalContext ctx = new VitalContext();

        public void CancelarConsulta(Guid idConsulta)
        {

            string Cancelar = "Cancelada";

            SituacaoConsulta situacaoCancelada = ctx.Situacoes.FirstOrDefault(s => s.Situacao == Cancelar)!;

            Consulta consultaBuscada = ctx.Consultas.Include(c => c.Situacao).FirstOrDefault(c => c.Id == idConsulta)!;

            if (consultaBuscada != null && situacaoCancelada != null && consultaBuscada.Situacao!.Situacao == "Pendente")
            {


                consultaBuscada.Situacao = situacaoCancelada;
                ctx.Consultas.Update(consultaBuscada);

                ctx.SaveChanges();


            }



        }

        public void AtualizarStatus()
        {
            string Realizada = "Realizada";
            string Pendente = "Pendente";
            SituacaoConsulta SituacaoRealizada = ctx.Situacoes.FirstOrDefault(x => x.Situacao == Realizada)!;


            List<Consulta> consultasASeremAtualizadas = ctx.Consultas.Include(x => x.Situacao).Where(x => x.Situacao!.Situacao == Pendente && x.DataConsulta < DateTime.Now).ToList();




            if (consultasASeremAtualizadas.Count != 0 && SituacaoRealizada != null)
            {
                foreach (var item in consultasASeremAtualizadas)
                {
                    item.Situacao = SituacaoRealizada;

                    ctx.Update(item);
                }


                ctx.SaveChanges();

            }
        }

        /// <summary>
        /// Esses 3 métodos rodam o método de atualizar status da consulta periodicamente
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer
            (
                callback => AtualizarStatus(),
                null,
                //quanto tempo vai demorar até efetuar o primeiro disparo
                TimeSpan.FromSeconds(5),
                //os disparos ocorrerão a cada 12 horas
                TimeSpan.FromMinutes(10)
            );
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }

        public Consulta BuscarPorId(Guid id)
        {
            try
            {
                return ctx.Consultas
                    .Include(x => x.Exames)
                    .Include(x => x.MedicoClinica!.Medico!.Especialidade)
                    .Include(x => x.MedicoClinica!.Medico!.IdNavigation)
                    .Include(x => x.Paciente!.IdNavigation)
                    .Include(x => x.Prioridade)
                    .Include(x => x.Situacao)
                    .Include(x => x.Receita)
                    .FirstOrDefault(x => x.Id == id)!;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Consulta clinica)
        {
            ctx.Consultas.Add(clinica);
            ctx.SaveChanges();
        }



        public void EditarProntuario(Consulta consulta)
        {
            try
            {
                Consulta buscada = ctx.Consultas.Find(consulta.Id)!;

                buscada.Descricao = consulta.Descricao;
                buscada.Diagnostico = consulta.Diagnostico;

                if (buscada.ReceitaId != null)
                {
                    buscada.Receita = consulta.Receita;

                }
                else
                {
                    ctx.Add(consulta.Receita);
                }

                ctx.Update(buscada);
                ctx.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public void EditarStatus(Guid idConsulta, string status)
        {
            try
            {
                SituacaoConsulta situacao = ctx.Situacoes.FirstOrDefault(x => x.Situacao == status)!;

                Consulta buscada = ctx.Consultas.Find(idConsulta)!;

                buscada.SituacaoId = situacao.Id;
                ctx.Update(buscada);
                ctx.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }


        public List<Consulta> ListarPorMedico(Guid IdMedico)
        {
            try
            {
                List<Consulta> listaConsultas = ctx.Consultas
                    .Include(x => x.Paciente!.IdNavigation)
                    .Include(x => x.Situacao)
                    .Include(x => x.Prioridade)
                    .Where(x => x.MedicoClinica != null && x.MedicoClinica.MedicoId == IdMedico)
                    .ToList();

                return listaConsultas;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Consulta> ListarPorPaciente(Guid IdPaciente)
        {
            try
            {
                List<Consulta> listaConsultas = ctx.Consultas
                    .Include(x => x.MedicoClinica!.Medico!.IdNavigation)
                    .Include(x => x.Situacao)
                    .Include(x => x.Prioridade)
                    .Where(x => x.PacienteId != null && x.PacienteId == IdPaciente)
                    .ToList();

                return listaConsultas;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Consulta> ListarTodos()
        {
            return ctx.Consultas.ToList();
        }

        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
