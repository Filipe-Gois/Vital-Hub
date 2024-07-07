using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs.Specialized;
using WebAPI.Domains;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        private static readonly string containerName = "containervitalhubfilipegoisg2";

        private static readonly string connectionString = "DefaultEndpointsProtocol=https;AccountName=blobvitalhubfilipegoisg2;AccountKey=hfM4sN0TXxZyi9/g/T0AJTvRTYXeP05PE9WiZX37UOH5t9ERfLrtevegeuXLUsau/Uw6A4XajeaW+AStVhyL7Q==;EndpointSuffix=core.windows.net";
        public static async Task<Usuario> UploadImageBlobAsync(IFormFile arquivo)
        {
            try
            {
                Usuario usuarioUpado = new();
                if (arquivo != null)
                {
                    //Path.GetExtension(arquivo.FileName): pega o nome do arquivo e obtém a extensao dele. Ex: A754E556CFD4457D908D309849E44475.png

                    //gera um nome unico + extensao do arquivo
                    var blobName = "ProfilePicture" + Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);


                    //cria uma instancia do cliente blob service e passa a string de conexao
                    var blobServiceClient = new BlobServiceClient(connectionString);

                    //obtem um containerclient usando o nome do container dp blob
                    var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);

                    //obtem um blob client usando o blob name
                    var blobClient = blobContainerClient.GetBlobClient(blobName);

                    //abre o fluxo de entrada do arquivo(foto)
                    using (var stream = arquivo.OpenReadStream())
                    {

                        //carrega o arquivo para o blob storage de forma assincrona
                        await blobClient.UploadAsync(stream, true);
                    }


                    usuarioUpado.Foto = blobClient.Uri.ToString();

                    usuarioUpado.BlobNameUsuario = blobName;


                    //retorna o exame com algumas propriedades preenchidas
                    return usuarioUpado;
                }
                else
                {
                    usuarioUpado.Foto = "https://blobvitalhubfilipegoisg2.blob.core.windows.net/containervitalhubfilipegoisg2/defaultImage.png";
                    //retorna a uri de uma imagem padrao caso nenhum arquivo seja enviado
                    return usuarioUpado;
                }
            }
            catch (Exception e)
            {

                throw;
            }
        }

        //public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        //{
        //    try
        //    {
        //        if (arquivo != null)
        //        {
        //            //Path.GetExtension(arquivo.FileName): pega o nome do arquivo e obtém a extensao dele. Ex: A754E556CFD4457D908D309849E44475.png

        //            //gera um nome unico + extensao do arquivo
        //            var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);


        //            //cria uma instancia do cliente blob service e passa a string de conexao
        //            var blobServiceClient = new BlobServiceClient(stringConexao);

        //            //obtem um containerclient usando o nome do container dp blob
        //            var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

        //            //obtem um blob client usando o blob name
        //            var blobClient = blobContainerClient.GetBlobClient(blobName);

        //            //abre o fluxo de entrada do arquivo(foto)
        //            using (var stream = arquivo.OpenReadStream())
        //            {

        //                //carrega o arquivo para o blob storage de forma assincrona
        //                await blobClient.UploadAsync(stream, true);
        //            }

        //            //retorna a uri do blob como uma string
        //            return blobClient.Uri.ToString();
        //        }
        //        else
        //        {
        //            //retorna a uri de uma imagem padrao caso nenhum arquivo seja enviado
        //            return "https://blobvitalhubfilipegoisg2.blob.core.windows.net/containervitalhubfilipegoisg2/defaultImage.png";
        //        }
        //    }
        //    catch (Exception e)
        //    {

        //        throw;
        //    }
        //}
        public static async Task<Exame> UploadExameImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
            try
            {
                if (arquivo != null)
                {
                    //Path.GetExtension(arquivo.FileName): pega o nome do arquivo e obtém a extensao dele. Ex: A754E556CFD4457D908D309849E44475.png

                    //gera um nome unico + extensao do arquivo
                    var blobName = "Exame" + Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);


                    //cria uma instancia do cliente blob service e passa a string de conexao
                    var blobServiceClient = new BlobServiceClient(stringConexao);

                    //obtem um containerclient usando o nome do container dp blob
                    var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

                    //obtem um blob client usando o blob name
                    var blobClient = blobContainerClient.GetBlobClient(blobName);

                    //abre o fluxo de entrada do arquivo(foto)
                    using (var stream = arquivo.OpenReadStream())
                    {

                        //carrega o arquivo para o blob storage de forma assincrona
                        await blobClient.UploadAsync(stream, true);


                    }

                    Exame exameUpado = new();
                    exameUpado.FotoExame = blobClient.Uri.ToString();

                    exameUpado.BlobNameExame = blobName;


                    //retorna o exame com algumas propriedades preenchidas
                    return exameUpado;


                }
                else
                {
                    throw new Exception("Nenhuma imagem informada!");
                }
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public static async Task DeleteBlobAsync(Uri blobUri)
        {
            try
            {
                // Cria uma instância do BlobClient usando a URI do blob
                BlobClient blobClient = new BlobClient(blobUri);

                // Deleta o blob de forma assíncrona, incluindo snapshots se houver
                await blobClient.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);

            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static async Task DeleteBlobAsync(string blobName)
        {
            try
            {
                // Cria uma instância do cliente BlobService usando a string de conexão
                var blobServiceClient = new BlobServiceClient(connectionString);

                // Obtém um BlobContainerClient para o container onde o blob está localizado
                var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);

                // Obtém um BlobClient para o blob que deseja deletar
                var blobClient = blobContainerClient.GetBlobClient(blobName);

                // Deleta o blob de forma assíncrona
                await blobClient.DeleteIfExistsAsync();
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }


}
