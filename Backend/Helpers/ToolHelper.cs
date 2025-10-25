using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using OllamaApi.Controllers;

namespace OllamaApi.Helpers
{
    /*public class ToolHelper
    {
        private readonly HttpClient _httpClient;
        private readonly OllamaSettings _settings;

        public ToolHelper(HttpClient httpClient, OllamaSettings settings)
        {
            _httpClient = httpClient;
            _settings = settings;
        }

        public string GetCurrentWeather(string location)
        {
            if (location.Contains("Istanbul", StringComparison.OrdinalIgnoreCase))
                return "Istanbul'da hava 19°C ve parçalı bulutlu.";
            else if (location.Contains("New York", StringComparison.OrdinalIgnoreCase))
                return "New York'ta hava 12°C ve yağmurlu.";
            else
                return $"Hata: {location} için güncel hava durumu bilgisi bulunamadı.";
        }

        public async Task<string> SendToolResultToLlmAsync(string originalPrompt, string toolResult, string toolName, string locationArg)
        {
            var requestUri = $"{_settings.BaseUrl}/api/chat";

            var messages = new List<object>
            {
                new { role = "system", content = "You are a helpful assistant that interprets tool results." },
                new { role = "user", content = originalPrompt },
                new { role = "assistant", content = $@"{{""tool_call"": {{""name"": ""{toolName}"", ""args"": {{""location"": ""{locationArg}""}}}}}}" },
                new { role = "tool", content = toolResult }
            };

            var payload = new
            {
                model = _settings.ModelName,
                messages,
                stream = false,
                temperature = 0.1
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            using var httpRequest = new HttpRequestMessage(HttpMethod.Post, requestUri) { Content = content };
            using var response = await _httpClient.SendAsync(httpRequest);

            var responseJson = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(responseJson);

            if (doc.RootElement.TryGetProperty("message", out var messageElement) &&
                messageElement.TryGetProperty("content", out var contentElement))
            {
                return contentElement.GetString() ?? "LLM content parse error.";
            }

            return "LLM final parse error.";
        }
    }*/
}
