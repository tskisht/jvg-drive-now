import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Car, Users, Zap, Settings, Calendar, MapPin } from "lucide-react";

interface VehicleCardProps {
  name: string;
  image: string;
  category: string;
  transmission: string;
  seats: number;
  fuel: string;
  pricePerDay: number;
  weekendPrice?: number;
  freeKm?: string;
  extraKmPrice?: string;
  onInquire: () => void;
}

export const VehicleCard = ({
  name,
  image,
  category,
  transmission,
  seats,
  fuel,
  pricePerDay,
  weekendPrice,
  freeKm,
  extraKmPrice,
  onInquire,
}: VehicleCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-border bg-card hover:shadow-card-premium transition-all duration-300 group">
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-gradient-gold px-3 py-1 rounded-full">
            <span className="text-sm font-semibold text-primary-foreground">{category}</span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">{name}</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Settings className="w-4 h-4" />
              <span className="text-sm">{transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">{seats} Sitze</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-4 h-4" />
              <span className="text-sm">{fuel}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Car className="w-4 h-4" />
              <span className="text-sm">200km/Tag</span>
            </div>
          </div>

          {/* Weekend & Kilometer Conditions */}
          {(weekendPrice || freeKm) && (
            <div className="bg-muted/50 rounded-lg p-3 mb-4 space-y-2">
              {weekendPrice && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span className="text-muted-foreground">Wochenende (Fr-So):</span>
                  <span className="font-semibold text-foreground">{weekendPrice}€</span>
                </div>
              )}
              {freeKm && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-muted-foreground">{freeKm}</span>
                  {extraKmPrice && (
                    <span className="text-muted-foreground">• {extraKmPrice} Mehrkilometer</span>
                  )}
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold text-gold">{pricePerDay}€</span>
              <span className="text-muted-foreground ml-2">/ Tag</span>
            </div>
            <Button 
              onClick={onInquire}
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            >
              Jetzt anfragen
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
