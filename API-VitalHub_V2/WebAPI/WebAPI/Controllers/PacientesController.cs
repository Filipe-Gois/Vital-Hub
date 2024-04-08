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
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(pacienteRepository.BuscarAgendadas(idUsuario));

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpGet("ConsultasRealizadas")]
        public IActionResult BuscarRealizadas()
        {

            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(pacienteRepository.BuscarRealizadas(idUsuario));

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpGet("ConsultasCanceladas")]
        public IActionResult BuscarCanceladas()
        {
            try
            {

                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(pacienteRepository.BuscarRealizadas(idUsuario));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
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

        //[Authorize]
        [HttpGet("BuscarPorId")]
        public IActionResult BuscarPorId(Guid id)
        {
            try
            {
                return Ok(pacienteRepository.BuscarPorId(id));
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

                user.Paciente.Endereco.Logradouro = pacienteModel.Logradouro;
                user.Paciente.Endereco.Numero = pacienteModel.Numero;
                user.Paciente.Endereco.Cep = pacienteModel.Cep;
                user.Paciente.Endereco.Cidade = pacienteModel.Cidade;

                pacienteRepository.Cadastrar(user);

                return Ok();
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }

        [HttpGet("BuscarPorData")]
        public IActionResult BuscarPorData(DateTime data, Guid id)
        {
            try
            {

                List<Consulta> buscadas = pacienteRepository.BuscarPorData(data, id);

                if (buscadas.Count != 0)
                {
                    return StatusCode(200, buscadas);
                }

                return StatusCode(404, "Nenhuma consulta para esse dia.");
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPut("AtualizarPerfil")]
        public IActionResult Put(Guid id, PacienteViewModel pacienteViewModel)
        {
            try
            {
                pacienteRepository.AtualizarPerfil(id, pacienteViewModel);
                return StatusCode(204);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
