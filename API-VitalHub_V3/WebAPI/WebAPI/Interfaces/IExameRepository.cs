using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IExameRepository
    {
        public void Cadastrar(Exame exame);

        public Exame BuscarPorIdConsulta(Guid idConsulta);
        public Task AtualizarExame(Exame exame);
    }
}