import PricingCard from "@/components/PricingCard";
import { useToast } from "@/hooks/use-toast";

export default function Packages() {
  const { toast } = useToast();

  const packages = [
    {
      name: "Starter Package",
      price: "$10",
      features: [
        "Advertising campaign for 5 posts",
        "Basic AI recommendations for campaigns",
        "Photo and video production for 5 posts",
        "Technical support via email"
      ]
    },
    {
      name: "Professional Package",
      price: "$60",
      features: [
        "Advertising campaign for 20 posts",
        "Advanced AI analytics for campaigns",
        "Advanced audience targeting manipulations",
        "Photo or video production for 10 posts",
        "Live support line"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "-",
      features: [
        "Custom solutions for large, corporate-scale companies",
        "24/7 live support"
      ]
    }
  ];

  const handlePurchase = async (packageName, price) => {
    console.log('Purchase initiated:', { packageName, price });

    toast({
      title: "Satın Alma İsteği Gönderildi",
      description: `${packageName} için satın alma işlemi başlatıldı.`,
    });
  };

  return (
    <div className="pt-16">
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Packages</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that best fits your needs and discover the power of AI-driven advertising management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <PricingCard
                key={index}
                name={pkg.name}
                price={pkg.price}
                features={pkg.features}
                popular={pkg.popular}
                onPurchase={() => handlePurchase(pkg.name, pkg.price)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
