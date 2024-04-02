using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicaController : ControllerBase
    {
        private IClinicaRepository clinicaRepository;
        public ClinicaController()
        {
            clinicaRepository = new ClinicaRepository();
        }

        [HttpGet("ListarTodas")]
        public IActionResult Get()
        {
            try
            {
                return Ok(clinicaRepository.Listar());

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPost("Cadastrar")]
        public IActionResult Post(Clinica clinica)
        {
            try
            {
                clinicaRepository.Cadastrar(clinica);
                return StatusCode(201);

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id)
        {

            try
            {

                return Ok(clinicaRepository.BuscarPorId(id));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpGet("BuscarPorCidade")]
        public IActionResult GetByCity(string cidade)
        {
            try
            {

                return Ok(clinicaRepository.ListarPorCidade(cidade));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
