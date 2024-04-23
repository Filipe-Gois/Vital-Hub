using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class ExameRepository : IExameRepository
    {
        public VitalContext ctx = new VitalContext();

        public void AtualizarExame(Guid idConsulta, ConsultaViewModel consultaViewModel)
        {
            Consulta consultaBuscada = ctx.Consultas.Include(x => x.Receita).FirstOrDefault(c => c.Id == idConsulta)! ?? throw new Exception("Consulta não encontrada"); //mesma coisa do if (consultaBuscada == null)

            consultaBuscada.Descricao = consultaViewModel.Descricao;
            consultaBuscada.Diagnostico = consultaViewModel.Diagnostico;
            consultaBuscada.Receita!.Medicamento = consultaViewModel.Prescricao;


            ctx.Consultas.Update(consultaBuscada);
            ctx.SaveChanges();

        }

        public List<Exame> BuscarPorIdConsulta(Guid idConsulta)
        {
            try
            {
                return ctx.Exames
                    .Where(x => x.ConsultaId == idConsulta)
                    .ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Exame exame)
        {
            try
            {
                ctx.Exames.Add(exame);
                ctx.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}