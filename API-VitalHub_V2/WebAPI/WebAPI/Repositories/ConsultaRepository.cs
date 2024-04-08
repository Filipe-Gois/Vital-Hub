using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Diagnostics;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class ConsultaRepository : IConsultaRepository, IHostedService, IDisposable
    {
        private Timer? _timer;

        public VitalContext ctx = new VitalContext();




        public Consulta BuscarPorId(Guid id)
        {
            return ctx.Consultas.Find(id)!;
        }

        public void Cadastrar(Consulta consulta)
        {
            string Pendente = "Pendente";

            SituacaoConsulta situacaoPendente = ctx.Situacoes.FirstOrDefault(s => s.Situacao == Pendente)!;

            if (consulta.DataConsulta < DateTime.Now)
            {
                throw (new Exception("A data da consulta deve ser posterior à data atual."));


            }

            if (situacaoPendente == null)
            {
                throw (new Exception("Não existe um registro de situação pendente no banco de dados."));

            }

            //já cadastra a consulta com a situação setada em Pendente
            consulta.Situacao = situacaoPendente;

            ctx.Consultas.Add(consulta);
            ctx.SaveChanges();



        }



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



        public void EditarProntuario(Guid id, ConsultaViewModel consultaModel)
        {
            Consulta buscada = ctx.Consultas.Find(id)!;

            buscada.Descricao = consultaModel.Descricao;
            buscada.Diagnostico = consultaModel.Diagnostico;
            ctx.Update(buscada);
            ctx.SaveChanges();
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
                .Include(x => x.MedicoClinica!.Clinica!.Endereco)
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
    }
}
