import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Upload, Sparkles } from "lucide-react";
import { mockCardData } from "@/data/mockCards";
import PersonaCard from "@/components/PersonaCard";
import { motion } from "framer-motion";

export default function Product() {
  const { toast } = useToast();
  const [filterTopThree, setFilterTopThree] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    photo: "",
    description: "",
    budget: ""
  });
  const [showResults, setShowResults] = useState(false);

  // Form submit fonksiyonuna fetch ekleme
  const handleSubmit = async (e) => {
    e.preventDefault();

    toast({
      title: "Ürün Bilgisi Kaydedildi",
      description: "Yapay zeka analizi başlatılıyor...",
    });

    try {
      const response = await fetch(
        "http://localhost:5172/api/llama/generate-reklam-json/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            UrunIsmi: formData.productName,
            Kategori: formData.category,
            UrunTanitimi: formData.description,
            ImageUrl: formData.photo,
            Butce: Number(formData.budget),
          }),
        }
      );

      if (!response.ok) throw new Error("Sunucudan veri alınamadı");

      const data = await response.json(); // artık array of objects

      // Artık her obje doğrudan insta_caption, keywords, music içeriyor
      console.log(data)
      const formattedData = data.map((item, index) => ({
        index: index || "",
        instaText: item.insta_caption || "",
        keywords: item.keywords || "",
        music: item.music || "",
      }));

      setAiGeneratedData(formattedData);
      setShowResults(true);

      toast({
        title: "Analiz Tamamlandı!",
        description: "Persona kartları ve reklam verileri hazır.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Hata!",
        description: "Yapay zeka analizinde bir hata oluştu.",
        variant: "destructive",
      });
    }
  };
  // State tanımı
  const [aiGeneratedData, setAiGeneratedData] = useState([]);


  return (
    <div className="pt-16">
      {!showResults ? (
        <section className="py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Product Information Entry</h1>
              <p className="text-lg text-muted-foreground">
                Provide details about your product and let our AI create a personalized advertising strategy for you.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Please fill in all fields completely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                      id="productName"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      placeholder="Enter your product's name"
                      required
                      data-testid="input-product-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Enter your product's category"
                      required
                      data-testid="input-category"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Product Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your product in detail"
                      className="min-h-[120px]"
                      required
                      data-testid="textarea-description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Product Photo</Label>
                    <Textarea
                      id="photo"
                      value={formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      placeholder="Enter the link to your product's photo"
                      className="min-h-[120px]"
                      required
                      data-testid="textarea-photo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Daily Budget (₺)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="500"
                      required
                      data-testid="input-budget"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" data-testid="button-submit-product">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Analyze
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      ) : (
        <section className="py-12 min-h-screen bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Persona Analysis Results
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Target audience personas generated by AI
              </p>
              <Button
                variant="outline"
                onClick={() => setFilterTopThree((prev) => !prev)}
                className="mb-6"
              >
                {filterTopThree ? "Show All" : "Show Best 2 Option"}
              </Button>
            </motion.div>

            {/* Tabs for Categories */}
            <Tabs className="w-full">
              <TabsContent >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {aiGeneratedData.map((card, index) => (
                      < PersonaCard
                        card={card}
                        isTopPerformer={filterTopThree && index < 3}
                        index={index}
                        photo={formData.photo}
                        filterTopThree={filterTopThree}
                      />
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

            </Tabs>
          </div>
        </section>
      )}
    </div>
  );
}
