import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/5531975469010"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Fale pelo WhatsApp"
    className="fixed bottom-8 right-8 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-xl"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1, duration: 0.3 }}
  >
    <MessageCircle size={28} />
  </motion.a>
);

export default WhatsAppButton;
