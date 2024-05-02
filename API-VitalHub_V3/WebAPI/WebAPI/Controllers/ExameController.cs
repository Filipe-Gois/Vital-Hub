﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domains;
using WebAPI.Interfaces;
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
        public ExameController(IExameRepository exameRepository, OcrService ocrService)
        {
            _exameRepository = exameRepository;
            _ocrService = ocrService;
        }

        [HttpPost("Cadastrar")]
        public async Task<IActionResult> Post([FromForm] ExameViewModel exameViewModel)
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

                    exameViewModel.Descricao = result;

                    Exame exame = new Exame();

                    exame.Descricao = exameViewModel.Descricao;
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
        //aqui vai a lógica da OCR
    }
}