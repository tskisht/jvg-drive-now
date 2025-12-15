import { useState } from "react";
import { Hero } from "@/components/Hero";
import { VehicleGallery } from "@/components/VehicleGallery";
import { PricingInfo } from "@/components/PricingInfo";
import { USPs } from "@/components/USPs";
import { Process } from "@/components/Process";
import { ContactForm } from "@/components/ContactForm";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  return (
    <div className="min-h-screen">
      <Hero />
      <VehicleGallery onVehicleSelect={setSelectedVehicle} />
      <PricingInfo />
      <USPs />
      <Process />
      <ContactForm selectedVehicle={selectedVehicle} />
      <Location />
      <Footer />
    </div>
  );
};

export default Index;
