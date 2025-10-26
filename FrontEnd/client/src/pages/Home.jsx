import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import { Target, TrendingUp, DollarSign } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Target,
      title: "Akıllı Hedefleme",
      description: "Yapay zeka ile hedef kitlenizi analiz eder ve en uygun demografiyi belirler."
    },
    {
      icon: TrendingUp,
      title: "Gerçek Zamanlı Performans",
      description: "Kampanyalarınızın performansını anlık olarak izleyin ve optimize edin."
    },
    {
      icon: DollarSign,
      title: "Düşük Maliyetli Reklam Stratejileri",
      description: "Bütçenizi en verimli şekilde kullanarak maksimum getiri elde edin."
    }
  ];

  return (
    <div>
      <Hero />
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
