import { motion } from "framer-motion";
import { Clock, Gauge, Percent } from "lucide-react";

export const PricingInfo = () => {
  return (
    <section className="py-16 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Long-term rental discount */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card-premium">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-gold">
                <Percent className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Sonderpreise bei Langzeitmiete
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold" />
                    <span>Ab 7 Tagen: <strong className="text-foreground">10% Rabatt</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold" />
                    <span>Ab 14 Tagen: <strong className="text-foreground">15% Rabatt</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold" />
                    <span>Ab 30 Tagen: <strong className="text-foreground">20% Rabatt</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mileage info */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card-premium">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-gold">
                <Gauge className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Kilometerbegrenzung
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <span>Inklusive: <strong className="text-foreground">250 km pro Tag</strong></span>
                  </li>
                  <li>
                    <span>Mehrkilometer: <strong className="text-foreground">0,25 € / km</strong></span>
                  </li>
                  <li className="text-sm pt-1">
                    Bei Langzeitmieten individuelle Kilometerpakete möglich
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
