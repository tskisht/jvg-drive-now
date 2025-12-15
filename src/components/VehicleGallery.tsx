import { useState } from "react";
import { motion } from "framer-motion";
import { VehicleCard } from "./VehicleCard";
import { Button } from "@/components/ui/button";

// Import vehicle images
import fiat500e from "@/assets/vehicles/fiat-500e.jpg";
import citroenC3 from "@/assets/vehicles/citroen-c3.jpg";
import fiatPanda from "@/assets/vehicles/fiat-panda.jpg";
import seatIbiza from "@/assets/vehicles/seat-ibiza.jpg";
import fordFocus from "@/assets/vehicles/ford-focus.jpg";
import seatArona from "@/assets/vehicles/seat-arona.png";
import bmw2er from "@/assets/vehicles/bmw-2er.jpg";
import skodaKaroq from "@/assets/vehicles/skoda-karoq.jpg";
import alfaStelvio from "@/assets/vehicles/alfa-stelvio.jpg";
import porscheTaycan from "@/assets/vehicles/porsche-taycan.jpg";
import renaultMaster from "@/assets/vehicles/renault-master.jpg";

interface Vehicle {
  id: string;
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
}

const vehicles: Vehicle[] = [
  {
    id: "1",
    name: "FIAT 500e",
    image: fiat500e,
    category: "Kleinwagen",
    transmission: "Automatik",
    seats: 4,
    fuel: "Elektro",
    pricePerDay: 39,
    freeKm: "Unbegrenzt",
  },
  {
    id: "2",
    name: "Citroen C3",
    image: citroenC3,
    category: "Kleinwagen",
    transmission: "Schalter",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 49,
    freeKm: "350km pro Woche",
    extraKmPrice: "0,50€/km",
  },
  {
    id: "3",
    name: "FIAT Panda",
    image: fiatPanda,
    category: "Kleinwagen",
    transmission: "Schalter",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 39,
    freeKm: "350km pro Woche",
    extraKmPrice: "0,30€/km",
  },
  {
    id: "4",
    name: "Seat Ibiza Style Edition",
    image: seatIbiza,
    category: "Kleinwagen",
    transmission: "Schalter",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 49,
    freeKm: "350km pro Woche",
    extraKmPrice: "0,30€/km",
  },
  {
    id: "5",
    name: "Ford Focus",
    image: fordFocus,
    category: "Kompaktklasse",
    transmission: "Automatik",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 59,
    freeKm: "400km pro Woche",
    extraKmPrice: "0,40€/km",
  },
  {
    id: "6",
    name: "Seat Arona",
    image: seatArona,
    category: "Kompaktklasse SUV",
    transmission: "Automatik",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 59,
    freeKm: "500km pro Woche",
    extraKmPrice: "0,30€/km",
  },
  {
    id: "7",
    name: "BMW 2er Grand Coupé",
    image: bmw2er,
    category: "Mittelklasse",
    transmission: "Automatik",
    seats: 4,
    fuel: "Benzin",
    pricePerDay: 89,
    freeKm: "500km pro Woche",
    extraKmPrice: "0,50€/km",
  },
  {
    id: "8",
    name: "Skoda Karoq",
    image: skodaKaroq,
    category: "Mittelklasse",
    transmission: "Automatik",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 65,
    freeKm: "400km pro Woche",
    extraKmPrice: "0,50€/km",
  },
  {
    id: "9",
    name: "Alfa Romeo Stelvio",
    image: alfaStelvio,
    category: "Premium",
    transmission: "Automatik",
    seats: 5,
    fuel: "Benzin",
    pricePerDay: 119,
    freeKm: "150km pro Tag",
    extraKmPrice: "1,00€/km",
  },
  {
    id: "10",
    name: "Porsche Taycan 4S",
    image: porscheTaycan,
    category: "Luxus",
    transmission: "Automatik",
    seats: 4,
    fuel: "Elektro",
    pricePerDay: 159,
    weekendPrice: 390,
    freeKm: "200km pro Tag",
    extraKmPrice: "1,49€/km",
  },
  {
    id: "11",
    name: "Renault Master",
    image: renaultMaster,
    category: "Transporter",
    transmission: "Schalter",
    seats: 3,
    fuel: "Diesel",
    pricePerDay: 99,
    weekendPrice: 250,
    freeKm: "200km pro Tag",
    extraKmPrice: "1,00€/km",
  },
];

const categories = [
  "Alle",
  "Kleinwagen",
  "Kompaktklasse",
  "Kompaktklasse SUV",
  "Mittelklasse",
  "Premium",
  "Luxus",
  "Transporter",
];

interface VehicleGalleryProps {
  onVehicleSelect: (vehicleName: string) => void;
}

export const VehicleGallery = ({ onVehicleSelect }: VehicleGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  const filteredVehicles =
    selectedCategory === "Alle" ? vehicles : vehicles.filter((v) => v.category === selectedCategory);

  const handleInquire = (vehicleName: string) => {
    onVehicleSelect(vehicleName);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
              <VehicleCard {...vehicle} onInquire={() => handleInquire(vehicle.name)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
