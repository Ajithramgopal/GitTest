import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function Whatsapp() {
  return (
    // <FloatingWhatsApp
    //   phoneNumber="8903472854"
    //   accountName="Support"
    //   chatMessage="Hi there! How can we help?"
    //   placeholder="Type a message.."
    // />
    <FloatingWhatsApp
      phoneNumber="919876543210" // Your WhatsApp number (with country code)
      accountName="Ajith Support" // Name shown in chat
      avatar="/avatar.png" // Path to your image/logo
      chatMessage="Hi there! How can I help you?" // Preloaded message in chat
      placeholder="Type a message.." // Input placeholder
      darkMode={false} // true for dark mode
      allowEsc={true} // Close on Esc key
      allowClickAway={true} // Close on outside click
      notification={true} // Show notification badge
      notificationDelay={5} // Delay before notification shows (seconds)
      notificationSound={true} // Play sound on notification
    />
  );
}
