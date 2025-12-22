import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

const locations = [
  {
    name: "Bad Vilbel",
    address: ["JVG GmbH", "Homburger Straße 69", "61118 Bad Vilbel"],
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2556.5!2d8.7333!3d50.1833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0db0e1234567%3A0x0!2sHomburger%20Stra%C3%9Fe%2070%2C%2061118%20Bad%20Vilbel!5e0!3m2!1sde!2sde!4v1234567890",
  },
  {
    name: "Wehrheim",
    address: ["JVG GmbH", "Johann-Gutenberg-Straße 9", "61273 Wehrheim"],
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2553.8!2d8.5833!3d50.3333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0f4e3e0d0001%3A0x0!2sJohann-Gutenberg-Stra%C3%9Fe%209%2C%2061273%20Wehrheim!5e0!3m2!1sde!2sde!4v1234567890",
  },
];

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
            Unsere <span className="text-transparent bg-clip-text bg-gradient-gold">Standorte</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Holen Sie Ihr Fahrzeug in Bad Vilbel oder Wehrheim ab
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-card-premium"
            >
              <div className="h-56">
                <iframe
                  src={location.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`JVG GmbH Standort ${location.name}`}
                />
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">{location.name}</h3>
                    <p className="text-muted-foreground">
                      {location.address.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < location.address.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-8 shadow-card-premium">
            <div className="space-y-6">
              <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                Rufen Sie uns an:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground mb-1">Standort Wehrheim</p>
                  <a
                    href="tel:+4960819569000"
                    className="text-gold hover:text-gold-light transition-colors text-xl font-bold"
                  >
                    06081 956 900 0
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Standort Bad Vilbel</p>
                  <a
                    href="tel:+4961015063010"
                    className="text-gold hover:text-gold-light transition-colors text-xl font-bold"
                  >
                    06101 506 301 0
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-6 mt-6">

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">Öffnungszeiten</h3>
                  <p className="text-muted-foreground">Mo - Fr: 8:00 - 17:00 Uhr</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
