import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5562993294573";
const WHATSAPP_MESSAGE = encodeURIComponent("Olá! Gostaria de solicitar uma análise laboratorial.");

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(142,70%,45%)] text-white shadow-lg hover:bg-[hsl(142,70%,40%)] transition-all hover:scale-110 animate-fade-in"
      aria-label="Atendimento via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
