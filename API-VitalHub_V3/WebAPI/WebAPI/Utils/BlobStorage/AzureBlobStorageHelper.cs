using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Specialized;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
            try
            {
                if (arquivo != null)
                {
                    //Path.GetExtension(arquivo.FileName): pega o nome do arquivo e obtém a extensao dele. Ex: A754E556CFD4457D908D309849E44475.png

                    //gera um nome unico + extensao do arquivo
                    var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);


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

                    //retorna a uri do blob como uma string
                    return blobClient.Uri.ToString();
                }
                else
                {
                    //retorna a uri de uma imagem padrao caso nenhum arquivo seja enviado
                    return "https://blobvitalhubfilipegoisg2.blob.core.windows.net/containervitalhubfilipegoisg2/defaultImage.png";
                }
            }
            catch (Exception e)
            {

                throw;
            }
        }
        public static async Task<string> UploadExameImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
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

                    //retorna a uri do blob como uma string
                    return blobClient.Uri.ToString();
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

        public static async Task DeleteBlobAsync(string connectionString, string containerName, string blobName)
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
