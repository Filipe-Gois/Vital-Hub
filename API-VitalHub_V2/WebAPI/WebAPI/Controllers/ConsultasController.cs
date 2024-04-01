using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {

        private IConsultaRepository consultaRepository;
        public ConsultasController()
        {
            consultaRepository = new ConsultaRepository();
        }

        //[Authorize]
        [HttpGet("ConsultasPacienteLogado")]
        public IActionResult BuscarConsultasPaciente()
        {
            try
            {

                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                List<Consulta> consultas = consultaRepository.ListarPorPaciente(idUsuario);
                return Ok(consultas);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [Authorize(Roles = "Medico")]
        [HttpGet("ConsultasMedico")]
        public IActionResult BuscarConsultasMedico()
        {
            try
            {

                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                List<Consulta> consultas = consultaRepository.ListarPorMedico(idUsuario);
                return Ok(consultas);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPost("Cadastrar")]
        public IActionResult Cadastrar(Consulta consulta)
        {
            try
            {
                consultaRepository.Cadastrar(consulta);
                return StatusCode(201);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPut("Status")]
        public IActionResult EditarStatus(Consulta consulta)
        {
            try
            {
                consultaRepository.EditarStatus(consulta);
                return Ok();

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPut("Prontuario")]
        public IActionResult EditarProntuario(Consulta consulta)
        {
            try
            {
                consultaRepository.EditarProntuario(consulta);
                return Ok();

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
