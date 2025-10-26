import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function PersonaCard({ card, isTopPerformer, index, photo, filterTopThree }) {
  const [displayCount, setDisplayCount] = useState(0);
  const [visibleCards, setVisibleCards] = useState(["all"]);

  // sayaç animasyonu
  useEffect(() => {
    let interval;
    console.log(card)
    if (filterTopThree) {
      interval = setInterval(() => {
        setDisplayCount((prev) => {
          const target = card.interactions;
          const next = prev + Math.ceil(target / 25);
          if (next >= target) {
            clearInterval(interval);
            return target;
          }
          return next;
        });
      }, 20);
    } else {
      setDisplayCount(0);
    }

    return () => clearInterval(interval);
  }, [filterTopThree, card.interactions]);

  // 5 saniye sonra dimmed kartları kaldır
  useEffect(() => {
    if (filterTopThree) {
      setVisibleCards(["all"]);

      const timeout = setTimeout(() => {
        setVisibleCards(["top2"]);
      }, 5000);

      return () => clearTimeout(timeout);
    } else {
      setVisibleCards(["all"]);
    }
  }, [filterTopThree]);

  const cardVariants = {
    normal: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      zIndex: 1,
      position: "relative",
      x: 0,
      y: 0,
    },
    highlighted: {
      scale: 1.05,
      filter: "blur(0px)",
      opacity: 1,
      zIndex: 10,
      boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
      position: "relative",
      x: 0,
      y: 0,
    },
    dimmed: {
      scale: 0.95,
      filter: "blur(1px)",
      opacity: 0.6,
      zIndex: 0,
      position: "relative",
    }
  };

  const getAnimationState = () => {
    if (!filterTopThree) return "normal";
    if (index === 2 || index === 4) return "highlighted";
    return "dimmed";
  };
  // Eğer dimmed ve 5 saniye sonrasıysa kartı gösterme
  if (visibleCards.includes("top2") && !(index === 2 || index === 4)) return null;

  return (
    <div className="space-y-4 relative">
      <motion.div
        variants={cardVariants}
        initial="normal"
        animate={getAnimationState()}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 1.5 }}
        data-testid={`card-persona-${card.id}`}
      >
        <Card className="overflow-hidden hover-elevate transition-all">
          <CardContent className="p-0">
            {/* Stats in top right */}
            <div className="absolute top-3 right-3 z-10 flex gap-3">
              <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
                <span
                  className="text-xs text-green-900 font-medium"
                >
                  {card.music}
                </span>
              </div>
            </div>

            {/* Image */}
            <div className="aspect-square relative overflow-hidden bg-muted">
              <img
                src={photo}       // URL veya local path
                alt="Persona"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Info */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">

                {card.instaText}
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Anahtar Kelimeler:</p>
                <div
                  className="flex flex-wrap gap-1"
                >
                  {card.keywords.split(" ").map((keyword, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="text-xs px-2 py-0.5"
                    >
                      {keyword}
                    </Badge>
                  ))}...
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
