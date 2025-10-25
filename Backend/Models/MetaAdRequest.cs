using System.ComponentModel.DataAnnotations;

namespace OllamaApi.Models
{
    public class MetaAdRequest
    {
        [Required]
        public string AccessToken { get; set; }  // Meta API token

        [Required]
        public string AccountId { get; set; }    // Reklam hesabı ID

        [Required]
        public string CampaignName { get; set; } // Kampanya adı

        [Required]
        public decimal Budget { get; set; }      // Bütçe

        [Required]
        public string Targeting { get; set; }    // Hedefleme JSON string olarak
    }
}