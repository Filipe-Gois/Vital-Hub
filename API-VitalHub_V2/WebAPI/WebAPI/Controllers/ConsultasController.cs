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
    public class ConsultasController : ControllerBase
    {

        private IConsultaRepository consultaRepository;
        public ConsultasController()
        {
            consultaRepository = new ConsultaRepository();
        }

        //[Authorize]
        [HttpGet("ConsultasPacienteLogado")]
        public IActionResult BuscarConsultasPaciente(Guid idUsuario)
        {
            try
            {

                //Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

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
        public IActionResult Cadastrar(ConsultaViewModel consultaModel)
        {
            try
            {
                Consulta consulta = new Consulta();

                consulta.DataConsulta = consultaModel.DataConsulta;
                consulta.Descricao = consultaModel.Descricao;
                consulta.Diagnostico = consultaModel.Diagnostico;


                consulta.Receita = new Receita();

                consulta.Receita.Medicamento = consultaModel.Medicamento;
                consulta.Receita.Observacoes = consultaModel.Observacoes;





                consulta.PacienteId = consultaModel.PacienteId;
                consulta.MedicoClinicaId = consultaModel.MedicoClinicaId;

                consulta.PrioridadeId = consultaModel.PrioridadeId;






                consultaRepository.Cadastrar(consulta);
                return StatusCode(201);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }



        [HttpPut("CancelarConsulta")]
        public IActionResult CancelarConsulta(Guid id)
        {
            try
            {
                consultaRepository.CancelarConsulta(id);
                return StatusCode(204);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPut("Prontuario")]
        public IActionResult EditarProntuario(Guid id, ConsultaViewModel consultaModel)
        {
            try
            {
                consultaRepository.EditarProntuario(id, consultaModel);
                return Ok();

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
