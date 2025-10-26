import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-muted-foreground mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Sayfa Bulunamadı</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link href="/">
          <Button size="lg" data-testid="button-home">
            Ana Sayfaya Dön
          </Button>
        </Link>
      </div>
    </div>
  );
}
