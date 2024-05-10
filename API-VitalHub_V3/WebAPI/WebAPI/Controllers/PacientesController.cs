using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.Utils.BlobStorage;
using WebAPI.Utils.Maill;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacientesController : ControllerBase
    {
        private IPacienteRepository pacienteRepository { get; set; }
        private EmailSendingService _emailSendingService { get; set; }

        public PacientesController(EmailSendingService emailSendingService)
        {
            pacienteRepository = new PacienteRepository();
            _emailSendingService = emailSendingService;
        }

        [Authorize]
        [HttpGet("PerfilLogado")]
        public IActionResult GetLogged()
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(pacienteRepository.BuscarPorId(idUsuario));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[Authorize]
        [HttpGet("BuscarPorId")]
        public IActionResult BuscarPorId(Guid id)
        {
            return Ok(pacienteRepository.BuscarPorId(id));
        }

        //[HttpPost]
        //public async Task<IActionResult> Post(PacienteViewModel pacienteModel)
        //{
        //    Usuario user = new Usuario();

        //    user.Nome = pacienteModel.Nome;
        //    user.Email = pacienteModel.Email;
        //    user.TipoUsuarioId = pacienteModel.IdTipoUsuario;
        //    user.Foto = pacienteModel.Foto;
        //    user.Senha = pacienteModel.Senha;

        //    user.Paciente = new Paciente();

        //    user.Paciente.DataNascimento = pacienteModel.DataNascimento;
        //    user.Paciente.Rg = pacienteModel.Rg;
        //    user.Paciente.Cpf = pacienteModel.Cpf;

        //    user.Paciente.Endereco = new Endereco();

        //    user.Paciente.Endereco.Logradouro = pacienteModel.Logradouro;
        //    user.Paciente.Endereco.Numero = pacienteModel.Numero;
        //    user.Paciente.Endereco.Cep = pacienteModel.Cep;
        //    user.Paciente.Endereco.Cidade = pacienteModel.Cidade;

        //    pacienteRepository.Cadastrar(user);

        //    await _emailSendingService.SendWelcomeEmail(user.Email!, user.Nome!);

        //    return Ok();
        //}


        [HttpPost]
        public async Task<IActionResult> Post(PacienteViewModel pacienteModel)
        {
            try
            {
                //objeto a ser cadastrado
                Usuario user = new();

                user = await AzureBlobStorageHelper.UploadImageBlobAsync(pacienteModel.Arquivo!);

                //recebe os valores e preenche as propriedades específicas
                user.Nome = pacienteModel.Nome;
                user.Email = pacienteModel.Email;
                user.TipoUsuarioId = pacienteModel.IdTipoUsuario;




                //aqui vamos chamar o metodo de upload de imagem

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

                await _emailSendingService.SendWelcomeEmail(user.Email!, user.Nome!);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet("BuscarPorData")]
        public IActionResult GetByDate(DateTime data)
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                return Ok(pacienteRepository.BuscarPorData(data, idUsuario));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("ListarProximas")]
        public IActionResult ListarProximasConsultas()
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                List<Consulta> consultas = pacienteRepository.ListarProximasConsultasPaciente(idUsuario);

                if (consultas.Count != 0)
                {
                    return StatusCode(200, consultas);

                }

                return StatusCode(404);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }


        [Authorize]
        [HttpPut]
        public IActionResult UpdateProfile(PacienteViewModel paciente)
        {
            try
            {
                //pega o id do paciente logado através da context
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(m => m.Type == JwtRegisteredClaimNames.Jti).Value);
                pacienteRepository.AtualizarPerfil(idUsuario, paciente);
                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
