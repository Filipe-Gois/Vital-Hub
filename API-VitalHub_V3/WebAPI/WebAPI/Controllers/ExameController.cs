using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils.BlobStorage;
using WebAPI.Utils.OCR;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExameController : ControllerBase
    {
        private readonly IExameRepository _exameRepository;
        private readonly OcrService _ocrService;

        private readonly string containerName = "containervitalhubfilipegoisg2";

        private readonly string connectionString = "DefaultEndpointsProtocol=https;AccountName=blobvitalhubfilipegoisg2;AccountKey=hfM4sN0TXxZyi9/g/T0AJTvRTYXeP05PE9WiZX37UOH5t9ERfLrtevegeuXLUsau/Uw6A4XajeaW+AStVhyL7Q==;EndpointSuffix=core.windows.net";


        public ExameController(IExameRepository exameRepository, OcrService ocrService)
        {
            _exameRepository = exameRepository;
            _ocrService = ocrService;
        }

        [HttpPut("AtualizarExame")]
        public async Task<IActionResult> Put([FromForm] ExameViewModel exameViewModel)
        {

            try
            {
                if (exameViewModel.Imagem == null || exameViewModel == null)
                {
                    return BadRequest("Nenhuma imagem fornecida!");
                }

                using (var stream = exameViewModel.Imagem.OpenReadStream())
                {
                    var result = await _ocrService.RecognizeTextAsync(stream);

                    if (result == null || result == "")
                    {
                        return StatusCode(400);
                    }





                    Exame exame = new();

                    exame = await AzureBlobStorageHelper.UploadExameImageBlobAsync(exameViewModel.Imagem!, connectionString, containerName);
                    exame.Descricao = result;
                    exame.ConsultaId = exameViewModel.ConsultaId;

                    await _exameRepository.AtualizarExame(exame);

                    return StatusCode(204);

                }



            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPost("Cadastrar")]
        public async Task<IActionResult> Post([FromForm] ExameViewModel exameViewModel)
        {
            //define o nome do container do blob


            try
            {
                if (exameViewModel.Imagem == null || exameViewModel == null)
                {
                    return BadRequest("Nenhuma imagem fornecida!");
                }

                using (var stream = exameViewModel.Imagem.OpenReadStream())
                {
                    var result = await _ocrService.RecognizeTextAsync(stream);


                    if (result == null || result == "")
                    {
                        return StatusCode(400);
                    }



                    Exame exame = new();

                    exame = await AzureBlobStorageHelper.UploadExameImageBlobAsync(exameViewModel.Imagem!, connectionString, containerName);
                    exame.Descricao = result;
                    exame.ConsultaId = exameViewModel.ConsultaId;


                    _exameRepository.Cadastrar(exame);

                    return StatusCode(201, exame);

                }
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }


        //[HttpPut("AtualizarProntuario")]
        //public IActionResult Put(Guid idConsulta, ConsultaViewModel consulta)
        //{
        //    try
        //    {
        //        _exameRepository.AtualizarExame(idConsulta, consulta);
        //        return StatusCode(204);
        //    }
        //    catch (Exception e)
        //    {

        //        return BadRequest(e.Message);
        //    }
        //}

        [HttpGet("BuscarPorIdConsulta")]
        public IActionResult GetByIdConsult(Guid idConsulta)
        {
            try
            {
                Exame exameBuscado = _exameRepository.BuscarPorIdConsulta(idConsulta);

                if (exameBuscado == null)
                {
                    return StatusCode(404);
                }
                return StatusCode(200, exameBuscado);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteBlob(string blobName)
        {
            var containerName = "containervitalhubfilipegoisg2";

            var connectionString = "DefaultEndpointsProtocol=https;AccountName=blobvitalhubfilipegoisg2;AccountKey=hfM4sN0TXxZyi9/g/T0AJTvRTYXeP05PE9WiZX37UOH5t9ERfLrtevegeuXLUsau/Uw6A4XajeaW+AStVhyL7Q==;EndpointSuffix=core.windows.net";
            try
            {
                await AzureBlobStorageHelper.DeleteBlobAsync(blobName);

                return StatusCode(204);
            }
            catch (Exception e)
            {

                throw;
            }
        }
        //aqui vai a lógica da OCR
    }
}