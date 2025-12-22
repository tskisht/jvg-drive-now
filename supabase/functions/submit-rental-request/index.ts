import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const ALLOWED_ORIGINS = [
  "https://www.jvg-premium.de",
  "https://jvg-premium.de",
  "https://rental.jvg-premium.de",
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:3000",
];

const isAllowedOrigin = (origin: string | null): boolean => {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Allow all Lovable preview domains
  if (origin.endsWith(".lovable.app") || origin.endsWith(".lovableproject.com")) return true;
  return false;
};

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = isAllowedOrigin(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin || ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
};

interface RentalRequestData {
  vehicle: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  privacyAccepted: boolean;
  // Spam protection fields
  honeypot: string;
  timestamp: number;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: RentalRequestData = await req.json();
    
    console.log("Received rental request:", { 
      vehicle: data.vehicle, 
      email: data.email,
      hasHoneypot: !!data.honeypot,
      timestamp: data.timestamp 
    });

    // Spam protection: Check honeypot field
    if (data.honeypot && data.honeypot.trim() !== "") {
      console.log("Spam detected: honeypot field filled");
      // Return success to not alert spammers, but don't submit
      return new Response(
        JSON.stringify({ success: true, message: "Request received" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Spam protection: Check timestamp (form must be filled in at least 3 seconds)
    const now = Date.now();
    const timeDiff = now - data.timestamp;
    if (timeDiff < 3000) {
      console.log("Spam detected: form submitted too quickly", { timeDiff });
      return new Response(
        JSON.stringify({ success: true, message: "Request received" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Input length validation to prevent resource exhaustion
    if (data.firstName?.length > 100 || data.lastName?.length > 100) {
      console.error("Validation error: Name too long");
      return new Response(
        JSON.stringify({ error: "Name too long" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (data.email?.length > 255) {
      console.error("Validation error: Email too long");
      return new Response(
        JSON.stringify({ error: "Email too long" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (data.phone?.length > 20) {
      console.error("Validation error: Phone too long");
      return new Response(
        JSON.stringify({ error: "Phone too long" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (data.message && data.message.length > 5000) {
      console.error("Validation error: Message too long");
      return new Response(
        JSON.stringify({ error: "Message too long" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (data.vehicle?.length > 100) {
      console.error("Validation error: Invalid vehicle selection");
      return new Response(
        JSON.stringify({ error: "Invalid vehicle selection" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate required fields
    if (!data.vehicle || !data.startDate || !data.endDate || !data.firstName || !data.lastName || !data.email || !data.phone) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.error("Invalid email format");
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get NocoDB API token from environment
    const nocodbToken = Deno.env.get("NOCODB_API_TOKEN");
    if (!nocodbToken) {
      console.error("NOCODB_API_TOKEN not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Prepare data for NocoDB
    // Format dates as YYYY-MM-DD for NocoDB date fields
    const nocodbData = {
      "Title": `${data.firstName} ${data.lastName} - ${data.vehicle}`,
      "Gewünschtes Fahrzeug": data.vehicle,
      "Mietbeginn": data.startDate,
      "Mietbeginn Uhrzeit": data.startTime,
      "Mietende": data.endDate,
      "Mietende Uhrzeit": data.endTime,
      "Vorname": data.firstName,
      "Nachname": data.lastName,
      "E-Mail Adresse": data.email,
      "Telefonnummer": data.phone,
      "Nachricht": data.message || "",
      "Datenschutz": data.privacyAccepted
    };

    console.log("Sending to NocoDB:", nocodbData);

    // Submit to NocoDB
    const nocodbResponse = await fetch(
      "https://nocodb.srv916689.hstgr.cloud/api/v2/tables/mq3m5lvf24glts4/records",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xc-token": nocodbToken,
        },
        body: JSON.stringify(nocodbData),
      }
    );

    if (!nocodbResponse.ok) {
      const errorText = await nocodbResponse.text();
      console.error("NocoDB error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to submit request" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const result = await nocodbResponse.json();
    console.log("NocoDB response:", result);

    return new Response(
      JSON.stringify({ success: true, message: "Request submitted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in submit-rental-request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
