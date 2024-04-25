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
            Usuario usuarioBuscado = usuarioRepository.BuscarPorId(id);

            if (usuarioBuscado == null)
            {
                return NotFound();
            }

            //lógica para upload de imagem
            var connectionString = "DefaultEndpointsProtocol=https;AccountName=blobvitalhubfilipegoisg2;AccountKey=hfM4sN0TXxZyi9/g/T0AJTvRTYXeP05PE9WiZX37UOH5t9ERfLrtevegeuXLUsau/Uw6A4XajeaW+AStVhyL7Q==;EndpointSuffix=core.windows.net";

            var containerName = "containervitalhubfilipegoisg2";

            string fotoUrl = await AzureBlobStorageHelper.UploadImageBlobAsync(user.Arquivo!, connectionString, containerName);
            //fim do upload de imagem

            usuarioRepository.AtualizarFoto(id, fotoUrl);

            return Ok(usuarioBuscado);

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
}
}
