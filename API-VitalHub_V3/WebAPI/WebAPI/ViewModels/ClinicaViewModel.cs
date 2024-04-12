namespace WebAPI.ViewModels
{
    public class ClinicaViewModel
    {
        public string? NomeFantasia { get; set; }

        public string? Cnpj { get; set; }

        public string? RazaoSocial { get; set; }

        public string? Email { get; set; }


        //Endereço

        public string? Cep { get; set; }

        public string? Logradouro { get; set; }

        public int? Numero { get; set; }

        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }


        public string? Cidade { get; set; }
    }
}
