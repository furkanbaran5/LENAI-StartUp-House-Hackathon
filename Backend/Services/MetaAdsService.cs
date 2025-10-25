using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using OllamaApi.Models;

namespace OllamaApi.Services
{
    public class MetaAdsService
    {
        private readonly HttpClient _httpClient;

        public MetaAdsService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> CreateCampaign(MetaAdRequest request)
        {
            var url = $"https://graph.facebook.com/v17.0/act_{request.AccountId}/campaigns";

            var payload = new
            {
                name = request.CampaignName,
                objective = "LINK_CLICKS",
                status = "PAUSED",
                daily_budget = (int)(request.Budget * 100), // kuruş/cent cinsinden
                targeting = JsonSerializer.Deserialize<object>(request.Targeting)
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", request.AccessToken);

            var response = await _httpClient.PostAsync(url, content);
            return await response.Content.ReadAsStringAsync();
        }
    }
}
