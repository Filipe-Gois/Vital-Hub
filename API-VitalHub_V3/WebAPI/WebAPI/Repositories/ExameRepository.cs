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
            Consulta consultaBuscada = ctx.Consultas.FirstOrDefault(c => c.Id == idConsulta)! ?? throw new Exception("Consulta não encontrada"); //mesma coisa do if (consultaBuscada == null)

            consultaBuscada
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