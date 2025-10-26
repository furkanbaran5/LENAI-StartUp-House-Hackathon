import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/AI_advertising_tech_hero_background_5dbf911d.png";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Yapay Zekâ ile Reklamlarını Akıllandır!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Reklamlarını optimize eden, hedef kitleyi analiz eden ve kampanyanı Meta üzerinde senin için yöneten sistem.
        </p>
        <Link href="/register">
          <Button size="lg" className="text-lg px-8 py-6" data-testid="button-get-started">
            Hemen Başla
          </Button>
        </Link>
      </div>
    </div>
  );
}
