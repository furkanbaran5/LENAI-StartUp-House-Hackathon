import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import aiAnalysisImage from "@assets/generated_images/AI_data_analysis_illustration_cbb90ac8.png";
import campaignImage from "@assets/generated_images/Campaign_optimization_dashboard_illustration_287597d8.png";
import successImage from "@assets/generated_images/Success_metrics_and_growth_449974f6.png";

export default function About() {
  const sections = [
    {
      title: "Yapay Zekâ ile Veri Analizi",
      description: "Gelişmiş makine öğrenimi algoritmaları ile hedef kitlenizi detaylı bir şekilde analiz eder, en etkili reklam stratejilerini belirleriz.",
      image: aiAnalysisImage
    },
    {
      title: "Kampanya Optimizasyonu",
      description: "Reklamlarınız gerçek zamanlı olarak izlenir ve performans verilerine göre otomatik olarak optimize edilir.",
      image: campaignImage
    },
    {
      title: "Başarı Örnekleri",
      description: "Müşterilerimiz ortalama %300 daha yüksek ROI ve %65 daha düşük reklam maliyetleri elde ediyor.",
      image: successImage
    }
  ];

  return (
    <div className="pt-16">
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hakkımızda</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              DAY EYE, yapay zeka destekli reklam stratejileri geliştiren ve Meta (Facebook & Instagram) üzerinden otomatik reklam yönetimi yapan yenilikçi bir platformdur.
            </p>
          </div>

          <div className="space-y-24">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {section.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <img
                    src={section.image}
                    alt={section.title}
                    className="rounded-xl shadow-lg w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl">Misyonumuz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Küçük ve orta ölçekli işletmelere, büyük markaların kullandığı profesyonel düzeyde yapay zeka destekli reklam araçlarını erişilebilir kılmak. Her işletmenin, bütçesi ne olursa olsun, etkili ve verimli reklam kampanyaları yürütebilmesini sağlamak.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
