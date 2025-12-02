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
    name: "Porsche Taycan 4S",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80",
    category: "Luxus",
    transmission: "Automatik",
    seats: 4,
    fuel: "Elektro",
    pricePerDay: 299,
  },
  {
    id: "2",
    name: "Alfa Romeo Stelvio",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    category: "SUV",
    transmission: "Automatik",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 149,
  },
  {
    id: "3",
    name: "BMW 3er",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    category: "Limousine",
    transmission: "Automatik",
    seats: 5,
    fuel: "Diesel",
    pricePerDay: 99,
  },
  {
    id: "4",
    name: "VW Golf",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    category: "Kleinwagen",
    transmission: "Manuell",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 59,
  },
  {
    id: "5",
    name: "Mercedes E-Klasse",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    category: "Luxus",
    transmission: "Automatik",
    seats: 5,
    fuel: "Hybrid",
    pricePerDay: 189,
  },
  {
    id: "6",
    name: "Audi Q5",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    category: "SUV",
    transmission: "Automatik",
    seats: 5,
    fuel: "Diesel",
    pricePerDay: 139,
  },
];

const categories = ["Alle", "Kleinwagen", "Limousine", "SUV", "Luxus"];

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
