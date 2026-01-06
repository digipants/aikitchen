export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918881904094";

export const PHONE_NUMBER_DISPLAY =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 88819 04094";

export function waLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export const SITE_NAME = "AIKitchen";
