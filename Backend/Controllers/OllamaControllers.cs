using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace OllamaApi.Controllers
{
    public class OpenRouterSettings
    {
        public string BaseUrl { get; set; } = "https://openrouter.ai/api/v1/chat/completions";
        public string ApiKey { get; set; } = "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"; // appsettings.json’dan da okunabilir
        public string Model { get; set; } = "meta-llama/llama-4-maverick"; // veya "meta-llama/llama-3.1-70b-instruct"
    }

    [ApiController]
    [Route("api/[controller]")]
    public class LlamaController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly OpenRouterSettings _settings;

        public LlamaController(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClient = httpClientFactory.CreateClient();
            _settings = config.GetSection("OpenRouter").Get<OpenRouterSettings>() ?? new OpenRouterSettings();
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _settings.ApiKey);
            _httpClient.Timeout = TimeSpan.FromMinutes(5);
        }

        [HttpPost("generate-reklam-json")]
        public async Task<IActionResult> GenerateReklamJson([FromBody] ProductRequest request)
        {
            try
            {
                var urunIsmiSafe = request.UrunIsmi.Replace("\"", "\\\"");
                var kategoriSafe = request.Kategori.Replace("\"", "\\\"");
                var urunTanitimiSafe = request.UrunTanitimi.Replace("\"", "\\\"");
                var imageUrlSafe = request.ImageUrl.Replace("\"", "\\\"");
                // 🔹 Prompt
                var prompt = $@"
You are a digital marketing expert, specialized in Instagram and Meta ads.
Using the provided product information, **generate 5 completely different ad ideas**. 
Each idea should target **different audiences and markets**: e.g., students, wealthy/luxury users, outdoor enthusiasts, comfort seekers, gift buyers, minimalists, housewives, white-collar workers, office employees, economically constrained, etc.
The response **must be in JSON format**. For each ad include:

- ""keywords"": product-related, trending, short **10 words**
- ""insta_caption"": compelling, sales-oriented Instagram-ready caption
- ""music"": Instagram Reels compatible, suitable for the product and target audience

Return exactly like this (JSON array of objects):
[
  {{ ""insta_caption"": ""..."", ""keywords"": ""..."", ""music"": ""..."" }},
  {{ ""insta_caption"": ""..."", ""keywords"": ""..."", ""music"": ""..."" }},
  {{ ""insta_caption"": ""..."", ""keywords"": ""..."", ""music"": ""..."" }}
]

Example product information:
- Product Name: AirFlex Running Shoes
- Category: Sports Shoes
- Product Description: <AI GENERATED PRODUCT DETAILS>.
- Image URL: https://example.com/airflex.jpg
- Daily Budget (TL): 150

Now generate 5 ads in JSON format using **the provided product information**:

- Product Name: {urunIsmiSafe}
- Category: {kategoriSafe}
- Product Description: {urunTanitimiSafe}
- Image URL: {imageUrlSafe}
- Daily Budget (TL): {request.Butce}

Do NOT include:
- Explanations
- Additional instructions
- Markdown, code blocks, or headings
- Any text outside the JSON array

Additional instructions:
1. Each ad should reflect a different lifestyle and way of living.
2. Keywords must be optimized for the Instagram algorithm.
3. Instagram captions should be short and compelling.
4. Music suggestions must be trendy and suitable for the target audience.
5. All ideas must be completely different from each other, no repetition!.
6.Make the description text Instagram-ready: catchy, engaging, and enhanced with emojis!.
";

                // 🔹 API isteği
                var payload = new
                {
                    model = _settings.Model,
                    messages = new[] { new { role = "user", content = prompt } },
                    temperature = 0.7,
                    max_tokens = 1024,
                    top_p = 1.0
                };

                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(_settings.BaseUrl, content);
                var resultJson = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                    return StatusCode((int)response.StatusCode, new { error = "OpenRouter API hatası", details = resultJson });

                using var doc = JsonDocument.Parse(resultJson);
                var messageContent = doc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

                // Temizle (sadece kod bloklarını ve escape karakterleri kaldır)
                messageContent = messageContent
                    .Trim()
                    .Replace("```json", "")
                    .Replace("```", "")
                    .Replace("\\\"", "\"")
                    .Replace("\r", "");

                // JSON array of objects olarak parse et
                List<AdIdea> reklamArray;
                try
                {
                    reklamArray = JsonSerializer.Deserialize<List<AdIdea>>(messageContent);
                }
                catch (Exception ex)
                {
                    return Ok(new { error = "JSON parse hatası", details = ex.Message, raw = messageContent });
                }

                return Ok(reklamArray);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "İstek işlenirken hata oluştu", details = ex.Message });
            }
        }
    }

    public class ProductRequest
    {
        public string UrunIsmi { get; set; }
        public string Kategori { get; set; }
        public string UrunTanitimi { get; set; }
        public string ImageUrl { get; set; }
        public double Butce { get; set; }
    }

    public class AdIdea
    {
        public string insta_caption { get; set; }
        public string keywords { get; set; }
        public string music { get; set; }
    }
}