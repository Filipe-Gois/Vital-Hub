using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
using WebAPI.Utils.BlobStorage;

namespace WebAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        VitalContext ctx = new();


        public bool AlterarSenha(string email, string senhaNova)
        {
            try
            {
                var user = ctx.Usuarios.FirstOrDefault(x => x.Email == email);

                if (user == null) return false;

                user.Senha = Criptografia.GerarHash(senhaNova);

                ctx.Usuarios.Update(user);

                ctx.SaveChanges();

                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task AtualizarFoto(Guid id, Usuario user)
        {
            try
            {
                Usuario usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.Id == id)! ?? throw new Exception("Usuário não encontrado!");



                if (usuarioBuscado.BlobNameUsuario != null)
                {
                    await AzureBlobStorageHelper.DeleteBlobAsync(usuarioBuscado.BlobNameUsuario);
                }

                usuarioBuscado.Foto = user.Foto;
                usuarioBuscado.BlobNameUsuario = user.BlobNameUsuario;


                ctx.Usuarios.Update(usuarioBuscado);
                ctx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Usuario BuscarPorEmailEGoogleId(string email, string idGoogleAccount)
        {
            return ctx.Usuarios.Select(u => new Usuario
            {
                Id = u.Id,
                Nome = u.Nome,
                Email = u.Email,
                Senha = u.Senha,
                IdGoogleAccount = u.IdGoogleAccount,

                TipoUsuario = new TiposUsuario
                {
                    Id = u.Id,
                    TipoUsuario = u.TipoUsuario!.TipoUsuario,
                }
            }).FirstOrDefault(x => x.Email == email && x.IdGoogleAccount == idGoogleAccount)! ?? throw new Exception("Usuário não encontrado!");
        }

        public Usuario BuscarPorEmailESenha(string email, string senha)
        {
            try
            {
                var user = ctx.Usuarios.Select(u => new Usuario
                {
                    Id = u.Id,
                    Email = u.Email,
                    Senha = u.Senha,
                    Nome = u.Nome,
                    TipoUsuario = new TiposUsuario
                    {
                        Id = u.TipoUsuario!.Id,
                        TipoUsuario = u.TipoUsuario.TipoUsuario
                    }
                }).FirstOrDefault
                (x => x.Email == email);

                if (user == null) return null!;

                if (!Criptografia.CompararHash(senha, user.Senha!)) return null!;

                return user;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Usuario BuscarPorId(Guid id)
        {
            try
            {
                return ctx.Usuarios.FirstOrDefault(x => x.Id == id)!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Usuario usuario, bool isCreateAccountGoogle = false)
        {
            try
            {
                if (!isCreateAccountGoogle && usuario.Senha != null)
                {
                    usuario.Senha = Criptografia.GerarHash(usuario.Senha!);
                }

                if (usuario.Senha != null && usuario.IdGoogleAccount != null)
                {
                    throw new Exception("Não é possível cadastrar uma conta google com senha!");
                }

                if (usuario.Senha == null && usuario.IdGoogleAccount == null)
                {
                    throw new Exception("Informe uma senha ou um Google id!");
                }

                if (usuario.Senha == null && !isCreateAccountGoogle)
                {
                    throw new Exception("Cadastre uma senha!");
                }

                if (usuario.IdGoogleAccount == null && isCreateAccountGoogle)
                {
                    throw new Exception("Cadastre um id google!");
                }

                ctx.Usuarios.Add(usuario);
                ctx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
