using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.Utils.BlobStorage;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository usuarioRepository { get; set; }

        public UsuarioController()
        {
            usuarioRepository = new UsuarioRepository();
        }

        [HttpPut("AlterarSenha")]
        public IActionResult UpdatePassword(string email, AlterarSenhaViewModel senha)
        {
            try
            {
                usuarioRepository.AlterarSenha(email, senha.SenhaNova!);

                return Ok("Senha alterada com sucesso !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("AlterarFotoPerfil")]
        public async Task<IActionResult> UploadProfileImage(Guid id, [FromForm] UsuarioViewModel user)
        {


            //lógica para upload de imagem

            Usuario userPreenchido = await AzureBlobStorageHelper.UploadImageBlobAsync(user.Arquivo!);

            //user.Foto = userPreenchido.Foto;
            //user.BlobNameUsuario = userPreenchido.BlobNameUsuario;
            //fim do upload de imagem

            await usuarioRepository.AtualizarFoto(id, userPreenchido);

            return Ok();

        }

        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                return Ok(usuarioRepository.BuscarPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorIdGoogle")]
        public IActionResult BuscarPorEmailEGoogleId(string email, string idGoogleAccount)
        {
            try
            {
                return StatusCode(200, usuarioRepository.BuscarPorEmailEGoogleId(email, idGoogleAccount));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
