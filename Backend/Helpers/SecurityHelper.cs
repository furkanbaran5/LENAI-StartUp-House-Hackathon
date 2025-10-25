using System;
using System.Text.RegularExpressions;

namespace OllamaApi.Helpers
{
    /*public static class SecurityHelper
    {
        public static bool IsInputSafe(string content)
        {
            if (string.IsNullOrWhiteSpace(content))
                return true;

            if (ContainsPII(content))
            {
                AuditLogger.Instance.Log("PII detected", content);
                return false;
            }

            if (ContainsToxicLanguage(content))
            {
                AuditLogger.Instance.Log("Toxic content detected", content);
                return false;
            }

            if (IsPolicyViolation(content))
            {
                AuditLogger.Instance.Log("Policy violation detected", content);
                return false;
            }

            return true;
        }

        private static bool ContainsPII(string text)
        {
            string[] piiPatterns =
            {
                @"\b\d{11}\b", // TC kimlik
                @"\b\d{16}\b", // kredi kartı
                @"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b", // e-posta
                @"\b\d{3}[- ]?\d{3}[- ]?\d{4}\b" // telefon
            };

            foreach (var pattern in piiPatterns)
                if (Regex.IsMatch(text, pattern))
                    return true;

            return false;
        }

        private static bool ContainsToxicLanguage(string text)
        {
            string[] toxicWords = {
                "hate", "kill", "violence", "terror", "rape", "abuse",
                "bomb", "suicide", "nazi", "racist"
            };

            foreach (var word in toxicWords)
                if (text.IndexOf(word, StringComparison.OrdinalIgnoreCase) >= 0)
                    return true;

            return false;
        }

        private static bool IsPolicyViolation(string text)
        {
            string[] policyViolations =
            {
                @"<script.*?>",
                @"(;|\|\||&&)\s*(rm|del|curl|wget|powershell|bash)",
                @"(http|https)://"
            };

            foreach (var pattern in policyViolations)
                if (Regex.IsMatch(text, pattern, RegexOptions.IgnoreCase))
                    return true;

            return false;
        }
    }*/
}
