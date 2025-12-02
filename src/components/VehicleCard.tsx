import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Car, Users, Zap, Settings } from "lucide-react";

interface VehicleCardProps {
  name: string;
  image: string;
  category: string;
  transmission: string;
  seats: number;
  fuel: string;
  pricePerDay: number;
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
          
          <div className="grid grid-cols-2 gap-3 mb-6">
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
              <span className="text-sm">Premium</span>
            </div>
          </div>
          
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
