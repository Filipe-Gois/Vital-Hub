using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;

namespace WebAPI.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {

        private readonly VitalContext _context;
        public Clinica BuscarPorId(Guid id)
        {
            return _context.Clinicas.FirstOrDefault(c => c.Id == id)!;
        }

        public void Cadastrar(Clinica clinica)
        {
            _context.Clinicas.Add(clinica);
            _context.SaveChanges();
        }

        public List<Clinica> ListarPorCidade(string cidade)
        {
            return _context.Clinicas.ToList();
        }

        public List<Clinica> ListarTodos()
        {
            return _context.Clinicas.ToList();
        }
    }
}
