using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }
        //post
        [HttpPost]
        public IActionResult Login(LoginViewModel usuario, bool isGoogleLogin = false)
        {
            try
            {
                Usuario usuarioBuscado = !isGoogleLogin ? _usuarioRepository.BuscarPorEmailESenha(usuario.Email!, usuario.Senha!) ?? throw new Exception("Usuário não encontrado!") : _usuarioRepository.BuscarPorEmailEGoogleId(usuario.Email!, usuario.IdGoogleAccount!) ?? throw new Exception("Usuário google não encontrado!");


                //informações que serão fornecidas no token
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email!),
                    new Claim(JwtRegisteredClaimNames.Name,usuarioBuscado.Nome!),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.Id.ToString()),
                    new Claim("role", usuarioBuscado.TipoUsuario!.TipoUsuario!)
                };

                //chave de segurança
                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("vital-webapi-chave-symmetricsecuritykey"));

                //credenciais
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                //token
                var meuToken = new JwtSecurityToken(
                        issuer: "Vital-WebAPI",
                        audience: "Vital-WebAPI",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: creds
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(meuToken)
                });
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }
    }
}
