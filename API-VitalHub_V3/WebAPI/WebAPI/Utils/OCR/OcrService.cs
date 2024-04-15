using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptKey = "f428b33c676943358ad151055e50e18f";
        private readonly string _endpoint = "https://cvvitalhubfilipegois.cognitiveservices.azure.com/";

        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptKey))
                {
                    Endpoint = _endpoint,
                };

                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception e)
            {

                return "Erro ao reconhecer o texto: " + e.Message;
            }
        }

        private static string ProcessRecognitionResult(OcrResult result)
        {
            try
            {
                string recognizedText = "";

                foreach (var region in result.Regions)
                {
                    foreach (var row in region.Lines)
                    {
                        foreach (var word in row.Words)
                        {
                            //if ()
                            recognizedText += word.Text + " ";

                        }
                        recognizedText += "\n";

                    }
                }
                return recognizedText;

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
