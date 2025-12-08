import { useState } from "react";
import { motion } from "framer-motion";
import { VehicleCard } from "./VehicleCard";
import { Button } from "@/components/ui/button";

interface Vehicle {
  id: string;
  name: string;
  image: string;
  category: string;
  transmission: string;
  seats: number;
  fuel: string;
  pricePerDay: number;
}

const vehicles: Vehicle[] = [
  {
    id: "1",
    name: "FIAT 500e",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80",
    category: "Kleinwagen",
    transmission: "Automatik",
    seats: 4,
    fuel: "Elektro",
    pricePerDay: 39,
  },
  {
    id: "2",
    name: "Citroen C3",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    category: "Kleinwagen",
    transmission: "Schalter",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 49,
  },
  {
    id: "3",
    name: "FIAT Panda",
    image: "https://images.unsplash.com/photo-1606611013016-969c19ba4f4e?w=800&q=80",
    category: "Kleinwagen",
    transmission: "Schalter",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 39,
  },
  {
    id: "4",
    name: "Seat Ibiza Style Edition",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
    category: "Kleinwagen",
    transmission: "Schalter",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 49,
  },
  {
    id: "5",
    name: "Ford Focus",
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?w=800&q=80",
    category: "Kompaktklasse",
    transmission: "Automatik",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 59,
  },
  {
    id: "6",
    name: "Seat Arona",
    image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80",
    category: "Kompaktklasse SUV",
    transmission: "Automatik",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 59,
  },
  {
    id: "7",
    name: "BMW 2er Coupe",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    category: "Mittelklasse",
    transmission: "Automatik",
    seats: 4,
    fuel: "Benzin",
    pricePerDay: 89,
  },
  {
    id: "8",
    name: "Skoda Karoq",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    category: "Mittelklasse",
    transmission: "Automatik",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 65,
  },
  {
    id: "9",
    name: "Alfa Romeo Stelvio",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    category: "Premium",
    transmission: "Automatik",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 119,
  },
  {
    id: "10",
    name: "Porsche Taycan 4S",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80",
    category: "Luxus",
    transmission: "Automatik",
    seats: 4,
    fuel: "Elektro",
    pricePerDay: 159,
  },
  {
    id: "11",
    name: "Renault Master",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Transporter",
    transmission: "Schalter",
    seats: 3,
    fuel: "Diesel",
    pricePerDay: 99,
  },
];

const categories = ["Alle", "Kleinwagen", "Kompaktklasse", "Kompaktklasse SUV", "Mittelklasse", "Premium", "Luxus", "Transporter"];

interface VehicleGalleryProps {
  onVehicleSelect: (vehicleName: string) => void;
}

export const VehicleGallery = ({ onVehicleSelect }: VehicleGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  const filteredVehicles = selectedCategory === "Alle" 
    ? vehicles 
    : vehicles.filter(v => v.category === selectedCategory);

  const handleInquire = (vehicleName: string) => {
    onVehicleSelect(vehicleName);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="vehicles" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Unsere <span className="text-transparent bg-clip-text bg-gradient-gold">Fahrzeugflotte</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Wählen Sie aus unserer vielfältigen Auswahl an Premium-Fahrzeugen
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={
                selectedCategory === category
                  ? "bg-gradient-gold text-primary-foreground hover:opacity-90"
                  : "border-border hover:border-gold"
              }
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Vehicle Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VehicleCard
                {...vehicle}
                onInquire={() => handleInquire(vehicle.name)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
