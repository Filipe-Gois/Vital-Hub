using WebAPI.Domains;

namespace WebAPI.Interfaces
{
    public interface IUsuarioRepository
    {
        void Cadastrar(Usuario usuario, bool isCreateAccountGoogle = false);
        Usuario BuscarPorId(Guid id);
        Usuario BuscarPorEmailEGoogleId(string email, string idGoogleAccount);

        Usuario BuscarPorEmailESenha(string email, string senha);

        bool AlterarSenha(string email, string senhaNova);

        public Task AtualizarFoto(Guid id, Usuario user);
    }
}