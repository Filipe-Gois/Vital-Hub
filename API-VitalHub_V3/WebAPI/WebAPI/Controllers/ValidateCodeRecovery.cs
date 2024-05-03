using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Utils.Maill;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidateCodeRecovery : ControllerBase
    {
        private readonly VitalContext _context;
        private readonly EmailSendingService _emailSendingService;
        public ValidateCodeRecovery(VitalContext context, EmailSendingService emailSending)
        {
            _context = context;
            _emailSendingService = emailSending;
        }

        [HttpPost]
        public async Task<IActionResult> SendRecoveryCodePassword(string email, int code)
        {
            try
            {
                var usuarioBuscado = await _context.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

                if (usuarioBuscado == null)
                {
                    return StatusCode(404);
                }

                if (usuarioBuscado.CodRecupSenha != code)
                {
                    return StatusCode(404, "Código não encontrado!");
                }


                usuarioBuscado.CodRecupSenha = null;
                await _context.SaveChangesAsync();


                return StatusCode(204);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
