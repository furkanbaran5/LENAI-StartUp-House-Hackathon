import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PricingCard({ name, price, features, popular, onPurchase }) {
  return (
    <Card className={`flex flex-col justify-between h-full hover-elevate transition-all duration-300 hover:-translate-y-1 ${popular ? 'border-primary shadow-lg' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
        </div>
      )}
      <CardHeader className="text-center pb-8 pt-8">
        <CardTitle className="text-2xl mb-2">{name}</CardTitle>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold">{price}</span>
          <span className="text-muted-foreground">/ay</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-0.5">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>

        <Button
          className="w-full"
          variant={popular ? "default" : "outline"}
          onClick={onPurchase}
          data-testid={`button-purchase-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {price === "-" ? "Contact Us" : "Purchase"}
        </Button>
      </CardFooter>
    </Card>
  );
}
