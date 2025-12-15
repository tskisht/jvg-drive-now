import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroCar from "@/assets/hero-premium-fleet.jpg";

export const Hero = () => {
  const scrollToVehicles = () => {
    document.getElementById('vehicles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-10" />
        <img
          src={heroCar} 
          alt="Premium Fahrzeuge" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Günstige Mietwagen im{" "}
            <span className="text-transparent bg-clip-text bg-gradient-gold">
              Raum Frankfurt
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 max-w-3xl mx-auto"
        >
          <span className="text-lg md:text-xl font-medium text-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/30">
            Ohne Kreditkarte
          </span>
          <span className="text-lg md:text-xl font-medium text-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/30">
            Schnell & unkompliziert
          </span>
          <span className="text-lg md:text-xl font-medium text-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/30">
            Top Service
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            onClick={scrollToVehicles}
            size="lg"
            className="bg-gradient-gold text-primary-foreground hover:opacity-90 transition-opacity font-semibold text-lg px-8 py-6 shadow-gold"
          >
            Fahrzeuge entdecken
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        onClick={scrollToVehicles}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
};
