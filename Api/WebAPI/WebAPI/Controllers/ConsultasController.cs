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

        [Authorize]
        [HttpGet("ConsultasPaciente")]
        public IActionResult GetByIdPatient()
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                List<Consulta> consultas = consultaRepository.ListarPorPaciente(idUsuario);
                return Ok(consultas);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Medico")]
        [HttpGet("ConsultasMedico")]
        public IActionResult GetByIdDoctor()
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                List<Consulta> consultas = consultaRepository.ListarPorMedico(idUsuario);
                return Ok(consultas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("Cadastrar")]
        public IActionResult Post(ConsultaViewModel consultaViewModel)
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                Consulta consulta = new();

                consulta.SituacaoId = consultaViewModel.SituacaoId;
                consulta.PacienteId = idUsuario;
                consulta.MedicoClinicaId = consultaViewModel.MedicoClinicaId;

                consulta.Receita = new Receita();

                consulta.PrioridadeId = consultaViewModel.PrioridadeId;
                consulta.DataConsulta = consultaViewModel.DataConsulta;
                consulta.Descricao = consultaViewModel.Descricao;
                consulta.Diagnostico = consultaViewModel.Diagnostico;

                consultaRepository.Cadastrar(consulta);

                return StatusCode(201, consulta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("CancelarConsulta")]
        public IActionResult CancelarConsulta(Guid idConsulta)
        {
            try
            {
                consultaRepository.CancelarConsulta(idConsulta);

                return StatusCode(204);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("EditarProntuario")]
        public IActionResult UpdateMedicalRecord(Guid idConsulta, ProntuarioViewModel prontuarioviewModel)
        {
            try
            {


                consultaRepository.EditarProntuario(idConsulta, prontuarioviewModel);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                Consulta consultaBuscada = consultaRepository.BuscarPorId(id);

                return Ok(consultaBuscada);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
    }
}