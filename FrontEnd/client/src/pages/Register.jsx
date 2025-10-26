import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register submitted:', formData);
    
    toast({
      title: "Kayıt Başarılı",
      description: "Hesabınız oluşturuldu. Yönlendiriliyorsunuz...",
    });

    setTimeout(() => {
      setLocation("/");
    }, 1000);
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="flex items-center justify-center py-24 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Kayıt Ol</CardTitle>
            <CardDescription>
              AdwiseAI ile yapay zeka destekli reklam yönetimine başlayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Ad Soyad</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ahmet Yılmaz"
                  required
                  data-testid="input-fullname"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ornek@email.com"
                  required
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  data-testid="input-password"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" data-testid="button-register-submit">
                Kayıt Ol
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Zaten hesabınız var mı?{" "}
              <Link href="/login">
                <a className="text-primary hover:underline" data-testid="link-login">
                  Giriş Yap
                </a>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
