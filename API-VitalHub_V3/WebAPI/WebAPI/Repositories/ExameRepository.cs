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



        public void AtualizarExame(ExameViewModel exame)
        {
            Exame exameBuscado = BuscarPorIdConsulta(exame.ConsultaId) ?? throw new Exception("Exame não encontrado!");

            exameBuscado.Descricao = exame.Descricao;

            exameBuscado.FotoExame = exame.FotoExame;

            ctx.Exames.Update(exameBuscado);
            ctx.SaveChanges();

        }

        public Exame BuscarPorIdConsulta(Guid idConsulta)
        {
            try
            {
                return ctx.Exames
                    .FirstOrDefault(x => x.ConsultaId == idConsulta)!;
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
                Exame exameBuscado = ctx.Exames.Include(x => x.Consulta)
                    .FirstOrDefault(x => x.ConsultaId == exame.ConsultaId)!;

                if (exameBuscado != null)
                {
                    throw new Exception("Já existe um exame para essa conmsulta!");
                }
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