using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacientesController : ControllerBase
    {
        private IPacienteRepository pacienteRepository { get; set; }

        public PacientesController()
        {
            pacienteRepository = new PacienteRepository();
        }

        [Authorize]
        [HttpGet("ConsultasAgendadas")]
        public IActionResult BuscarAgendadas()
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(pacienteRepository.BuscarAgendadas(idUsuario));
        }

        [Authorize]
        [HttpGet("ConsultasRealizadas")]
        public IActionResult BuscarRealizadas()
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(pacienteRepository.BuscarRealizadas(idUsuario));
        }

        [Authorize]
        [HttpGet("ConsultasCanceladas")]
        public IActionResult BuscarCanceladas()
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(pacienteRepository.BuscarRealizadas(idUsuario));
        }

        [HttpGet("PerfilLogado")]
        public IActionResult BuscarLogado()
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(pacienteRepository.BuscarPorId(idUsuario));

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }

        [Authorize]
        [HttpGet("BuscarPorID")]
        public IActionResult BuscarPorID(Usuario user)
        {
            try
            {
                Guid idUsuario = user.Id;

                return Ok(pacienteRepository.BuscarPorId(idUsuario));

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }

        [HttpPost]
        public IActionResult Post(PacienteViewModel pacienteModel)
        {
            try
            {
                Usuario user = new Usuario();

                user.Nome = pacienteModel.Nome;
                user.Email = pacienteModel.Email;
                user.TipoUsuarioId = pacienteModel.IdTipoUsuario;
                user.Foto = pacienteModel.Foto;
                user.Senha = pacienteModel.Senha;

                user.Paciente = new Paciente();

                user.Paciente.DataNascimento = pacienteModel.DataNascimento;
                user.Paciente.Rg = pacienteModel.Rg;
                user.Paciente.Cpf = pacienteModel.Cpf;

                user.Paciente.Endereco = new Endereco();

                user.Paciente.Endereco.Cep = pacienteModel.Cep;
                user.Paciente.Endereco.Logradouro = pacienteModel.Logradouro;
                user.Paciente.Endereco.Numero = pacienteModel.Numero;



                pacienteRepository.Cadastrar(user);

                return Ok();
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

<<<<<<< HEAD:API-VitalHub/WebAPI/WebAPI/Controllers/PacientesController.cs
            user.Paciente.Endereco = new Endereco();

            user.Paciente.Endereco.Cep = pacienteModel.Cep;
            user.Paciente.Endereco.Logradouro = pacienteModel.Logradouro;
            user.Paciente.Endereco.Numero = pacienteModel.Numero;



            pacienteRepository.Cadastrar(user);
=======
>>>>>>> e50e9a2cfa207f035779d6e3bb4ce585c0638816:API-VitalHub_V1/WebAPI/WebAPI/Controllers/PacientesController.cs

        }
    }
}