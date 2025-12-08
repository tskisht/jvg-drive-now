import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const vehicles = [
  { name: "FIAT 500e", pricePerDay: 39 },
  { name: "Citroen C3", pricePerDay: 49 },
  { name: "FIAT Panda", pricePerDay: 39 },
  { name: "Seat Ibiza Style Edition", pricePerDay: 49 },
  { name: "Ford Focus", pricePerDay: 59 },
  { name: "Seat Arona", pricePerDay: 59 },
  { name: "BMW 2er Coupe", pricePerDay: 89 },
  { name: "Skoda Karoq", pricePerDay: 65 },
  { name: "Alfa Romeo Stelvio", pricePerDay: 119 },
  { name: "Porsche Taycan 4S", pricePerDay: 159 },
  { name: "Renault Master", pricePerDay: 99 },
];

interface ContactFormProps {
  selectedVehicle?: string;
}

export const ContactForm = ({ selectedVehicle }: ContactFormProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [startTime, setStartTime] = useState("09:00");
  const [endDate, setEndDate] = useState<Date>();
  const [vehicle, setVehicle] = useState(selectedVehicle || "");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const formTimestamp = useRef(Date.now());

  // Update vehicle when selectedVehicle prop changes
  useEffect(() => {
    if (selectedVehicle) {
      setVehicle(selectedVehicle);
    }
  }, [selectedVehicle]);

  // Reset timestamp when form mounts
  useEffect(() => {
    formTimestamp.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!privacyAccepted) {
      toast.error("Bitte akzeptieren Sie die Datenschutzerklärung");
      return;
    }

    if (!startDate || !endDate || !vehicle) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const { data, error } = await supabase.functions.invoke("submit-rental-request", {
        body: {
          vehicle,
          startDate: format(startDate, "yyyy-MM-dd"),
          startTime,
          endDate: format(endDate, "yyyy-MM-dd"),
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message") || "",
          privacyAccepted,
          honeypot,
          timestamp: formTimestamp.current,
        },
      });

      if (error) {
        console.error("Submission error:", error);
        toast.error("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
        return;
      }

      toast.success("Anfrage erfolgreich gesendet! Wir melden uns innerhalb von 30 Minuten.");
      
      // Reset form
      e.currentTarget.reset();
      setStartDate(undefined);
      setStartTime("09:00");
      setEndDate(undefined);
      setVehicle("");
      setPrivacyAccepted(false);
      setHoneypot("");
      formTimestamp.current = Date.now();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-anthracite">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Unverbindliche{" "}
            <span className="text-transparent bg-clip-text bg-gradient-gold">Anfrage</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Füllen Sie das Formular aus – Rückmeldung innerhalb von 30min
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card-premium space-y-6">
            {/* Honeypot field - hidden from users, visible to bots */}
            <div className="absolute opacity-0 -z-10 pointer-events-none" aria-hidden="true">
              <Label htmlFor="website">Website</Label>
              <Input 
                id="website"
                name="website"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Vehicle Selection */}
            <div className="space-y-2">
              <Label htmlFor="vehicle">Gewünschtes Fahrzeug *</Label>
              <Select value={vehicle} onValueChange={setVehicle} required>
                <SelectTrigger id="vehicle" className="bg-background border-border">
                  <SelectValue placeholder="Wählen Sie ein Fahrzeug" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((v) => (
                    <SelectItem key={v.name} value={v.name}>
                      {v.name} – {v.pricePerDay}€/Tag
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Mietbeginn *</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex-1 justify-start text-left font-normal bg-background border-border",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: de }) : "Datum wählen"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <Select value={startTime} onValueChange={setStartTime}>
                    <SelectTrigger className="w-24 bg-background border-border">
                      <SelectValue placeholder="Uhrzeit" />
                    </SelectTrigger>
                    <SelectContent>
                    {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"].map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Mietende *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-background border-border",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP", { locale: de }) : "Datum wählen"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => date < (startDate || new Date())}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">Vorname *</Label>
                <Input 
                  id="firstName"
                  name="firstName"
                  required 
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nachname *</Label>
                <Input 
                  id="lastName"
                  name="lastName"
                  required 
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-Mail-Adresse *</Label>
              <Input 
                id="email"
                name="email"
                type="email" 
                required 
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefonnummer *</Label>
              <Input 
                id="phone"
                name="phone"
                type="tel" 
                required 
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Nachricht (optional)</Label>
              <Textarea 
                id="message"
                name="message"
                rows={4}
                className="bg-background border-border resize-none"
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="privacy" 
                checked={privacyAccepted}
                onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                required
              />
              <Label 
                htmlFor="privacy" 
                className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
              >
                Ich akzeptiere die{" "}
                <a 
                  href="https://www.jvg-premium.de/datenschutzerklaerung/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  Datenschutzerklärung
                </a>{" "}
                und stimme zu, dass meine Daten zur Bearbeitung meiner Anfrage gespeichert werden.
              </Label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-gold text-primary-foreground hover:opacity-90 transition-opacity font-semibold text-lg py-6 shadow-gold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                "Anfrage jetzt senden"
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
