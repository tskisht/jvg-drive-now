import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

export const Location = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Besuchen Sie{" "}
            <span className="text-transparent bg-clip-text bg-gradient-gold">uns</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Holen Sie Ihr Fahrzeug direkt in Bad Vilbel ab
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-card-premium h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2553.8!2d8.7367!3d50.1789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0f4e3e0d0001%3A0x0!2sZeppelinstra%C3%9Fe%2010%2C%2061118%20Bad%20Vilbel!5e0!3m2!1sde!2sde!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JVG Premium Standort"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-card rounded-2xl p-8 shadow-card-premium">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">Adresse</h3>
                  <p className="text-muted-foreground">
                    JVG Premium<br />
                    Zeppelinstraße 10<br />
                    61118 Bad Vilbel
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">Telefon</h3>
                  <a 
                    href="tel:+4961015063010" 
                    className="text-gold hover:text-gold-light transition-colors text-lg font-semibold"
                  >
                    06101 506 301 0
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">Öffnungszeiten</h3>
                  <div className="text-muted-foreground space-y-1">
                    <p>Montag - Freitag: 8:00 - 18:00 Uhr</p>
                    <p>Samstag: 9:00 - 14:00 Uhr</p>
                    <p>Sonntag: Geschlossen</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
