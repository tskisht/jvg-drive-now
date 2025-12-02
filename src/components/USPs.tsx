import { motion } from "framer-motion";
import { MapPin, Clock, CreditCard, Star } from "lucide-react";

const usps = [
  {
    icon: MapPin,
    title: "Lokale Nähe",
    description: "Direkt in Bad Vilbel. Kein langes Suchen, einfach abholen.",
  },
  {
    icon: Clock,
    title: "Flexible Mietdauer",
    description: "Ob für einen Tag, ein Wochenende oder mehrere Monate – wir haben das passende Angebot.",
  },
  {
    icon: CreditCard,
    title: "Einfache Zahlung",
    description: "Mieten Sie Ihr Auto ganz einfach ohne Kreditkarte. Wir akzeptieren auch Bar- und EC-Zahlung.",
  },
  {
    icon: Star,
    title: "Exklusive Auswahl",
    description: "Vom sparsamen Kleinwagen bis zum luxuriösen Sportwagen – finden Sie Ihr Traumauto.",
  },
];

export const USPs = () => {
  return (
    <section className="py-24 bg-anthracite">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Ihre Vorteile bei{" "}
            <span className="text-transparent bg-clip-text bg-gradient-gold">JVG Premium</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-gold mb-6 shadow-gold"
                >
                  <Icon className="w-10 h-10 text-primary-foreground" />
                </motion.div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-foreground group-hover:text-gold transition-colors">
                  {usp.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {usp.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
