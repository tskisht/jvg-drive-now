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
              <span className="font-heading text-xl font-bold text-foreground">JVG GmbH</span>
            </div>
            <p className="text-muted-foreground">
              Günstige Mietwagen im Raum Frankfurt
            </p>
          </motion.div>

          {/* Standorte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading text-lg font-semibold mb-4 text-foreground">Standorte</h4>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">Bad Vilbel</p>
                <p className="text-sm">Homburger Straße 70</p>
                <p className="text-sm">61118 Bad Vilbel</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Wehrheim</p>
                <p className="text-sm">Johann-Gutenberg-Straße 9</p>
                <p className="text-sm">61273 Wehrheim</p>
              </div>
              <p>
                <a href="tel:+4960819569000" className="hover:text-gold transition-colors">
                  +49 6081 956 9000
                </a>
              </p>
              <p className="text-sm">Mo - Fr: 8:00 - 17:00 Uhr</p>
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
              <a href="https://www.jvg-premium.de/impressum/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-gold transition-colors">
                Impressum
              </a>
              <a href="https://www.jvg-premium.de/datenschutzerklaerung/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-gold transition-colors">
                Datenschutz
              </a>
              <a href="https://www.jvg-premium.de/agb/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-gold transition-colors">
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
          <p>© {new Date().getFullYear()} JVG GmbH. Alle Rechte vorbehalten.</p>
        </motion.div>
      </div>
    </footer>
  );
};
