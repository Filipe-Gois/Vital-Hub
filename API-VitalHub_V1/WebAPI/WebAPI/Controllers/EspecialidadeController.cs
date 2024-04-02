using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EspecialidadeController : ControllerBase
    {
        private IEspecialidadeRepository _repository;
        public EspecialidadeController()
        {
            _repository = new EspecialidadeRepository();
        }

        [HttpGet]
        public ActionResult Get()
        {

            try
            {
                return Ok(_repository.Listar());

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public ActionResult Post(Especialidade especialidade)
        {

            try
            {
                _repository.Cadastrar(especialidade);

                return StatusCode(201);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

    }
}
