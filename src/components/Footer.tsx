import { motion } from "framer-motion";
import { Car } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-anthracite-dark border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold text-foreground">JVG Premium</span>
            </div>
            <p className="text-muted-foreground">
              Ihre erste Wahl für Premium-Mietwagen in Bad Vilbel
            </p>
          </motion.div>

          {/* Kontakt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading text-lg font-semibold mb-4 text-foreground">Kontakt</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>Zeppelinstraße 10</p>
              <p>61118 Bad Vilbel</p>
              <p>
                <a href="tel:+4961015063010" className="hover:text-gold transition-colors">
                  06101 506 301 0
                </a>
              </p>
              <p>
                <a href="mailto:info@jvg-premium.de" className="hover:text-gold transition-colors">
                  info@jvg-premium.de
                </a>
              </p>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-heading text-lg font-semibold mb-4 text-foreground">Rechtliches</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                Impressum
              </a>
              <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                Datenschutz
              </a>
              <a href="#" className="block text-muted-foreground hover:text-gold transition-colors">
                AGB
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-border text-center text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} JVG Premium. Alle Rechte vorbehalten.</p>
        </motion.div>
      </div>
    </footer>
  );
};
