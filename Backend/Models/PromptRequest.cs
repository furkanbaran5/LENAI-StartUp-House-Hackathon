using System.Text.Json.Serialization;

namespace OllamaApi.Models
{
    public class PromptRequest
    {
        [JsonPropertyName("prompt")]
        public string Prompt { get; set; } = string.Empty;

        [JsonPropertyName("temperature")]
        public double Temperature { get; set; } = 0.7;

        [JsonPropertyName("max_tokens")]
        public int MaxTokens { get; set; } = 150;

        [JsonPropertyName("top_p")]
        public double TopP { get; set; } = 0.9;
    }
}