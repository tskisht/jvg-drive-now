import { motion } from "framer-motion";
import { Search, Send, Car } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Fahrzeug auswählen",
    description: "Wählen Sie Ihr Wunschauto aus unserer Flotte.",
  },
  {
    number: "02",
    icon: Send,
    title: "Anfrage senden",
    description: "Füllen Sie unser kurzes Formular aus oder rufen Sie uns an.",
  },
  {
    number: "03",
    icon: Car,
    title: "Losfahren",
    description: "Holen Sie Ihr Fahrzeug in Bad Vilbel (Homburger Str. 69) oder Wehrheim (Johann-Gutenberg-Str. 9) ab.",
  },
];

export const Process = () => {
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
            In 3 Schritten zu <span className="text-transparent bg-clip-text bg-gradient-gold">Ihrem Mietwagen</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">So einfach ist der Prozess bei JVG GmbH</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                {/* Connector Line (hidden on mobile, shown on md+) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gold to-transparent z-0" />
                )}

                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-card border-2 border-gold mb-6 shadow-card-premium">
                    <div className="relative">
                      <Icon className="w-12 h-12 text-gold" />
                      <span className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl font-semibold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
