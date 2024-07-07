using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.Utils.BlobStorage;
using WebAPI.Utils.Maill;
using WebAPI.ViewModels.PacienteViewModel;
using WebAPI.ViewModels.PacienteViewModel.PacienteViewModel;

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

        [HttpGet("BuscarPorId")]
        public IActionResult BuscarPorId(Guid id)
        {
            return Ok(pacienteRepository.BuscarPorId(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post(PacienteViewModel pacienteModel, bool isCreateAccountGoogle = false)
        {
            try
            {
                //objeto a ser cadastrado
                Usuario user = new();

                if (!isCreateAccountGoogle)
                {
                    user = await AzureBlobStorageHelper.UploadImageBlobAsync(pacienteModel.Arquivo!);
                    user.Senha = pacienteModel.Senha;
                }
                else
                {
                    user.IdGoogleAccount = pacienteModel.IdGoogleAccount;
                    user.Foto = pacienteModel.Foto;
                    user.BlobNameUsuario = "ProfileGoogle" + pacienteModel.IdGoogleAccount;
                }

                user.Nome = pacienteModel.Nome;
                user.Email = pacienteModel.Email;

                user.Paciente = new()
                {
                    DataNascimento = pacienteModel.DataNascimento,
                    Rg = pacienteModel.Rg,
                    Cpf = pacienteModel.Cpf,
                    Endereco = new Endereco()
                    {
                        Logradouro = pacienteModel.Logradouro,
                        Numero = pacienteModel.Numero,
                        Cep = pacienteModel.Cep,
                        Cidade = pacienteModel.Cidade
                    }
                };

                if (user.Paciente.DataNascimento >= DateTime.Now)
                {
                    throw new Exception("Insira uma data de nascimento válida!");
                }

                pacienteRepository.Cadastrar(user, isCreateAccountGoogle);

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
        public IActionResult UpdateProfile(AtualizarPacienteViewModel paciente)
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
