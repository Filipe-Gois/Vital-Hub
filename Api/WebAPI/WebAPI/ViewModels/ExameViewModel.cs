using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.ViewModels
{
    public class ExameViewModel
    {
        public Guid ConsultaId { get; set; }
        [NotMapped]
        [JsonIgnore]
        public IFormFile? Imagem { get; set; }
        public string? Descricao { get; set; }
        public string? FotoExame { get; set; }

        //vai receber do metodo assincrono ao upar a img
        public string? BlobNameExame { get; set; }
    }
}
