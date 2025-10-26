import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    
    toast({
      title: "Giriş Başarılı",
      description: "Hoş geldiniz!",
    });

    setLocation("/");
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="flex items-center justify-center py-24 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Giriş Yap</CardTitle>
            <CardDescription>
              AdwiseAI hesabınıza giriş yapın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <Button type="submit" className="w-full" size="lg" data-testid="button-login-submit">
                Giriş Yap
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Hesabınız yok mu?{" "}
              <Link href="/register">
                <a className="text-primary hover:underline" data-testid="link-register">
                  Kayıt Ol
                </a>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
