export const STORAGE_KEY_SHARE_CONTACT = "komma_share_contact";

export type ShareContact = {
  name: string;
  email: string;
};

export type ShareLeadBubbleResult = {
  id: string;
  rank: number;
  score: number;
  nameAf: string;
  nameEn: string;
  category: string;
};

export type ShareLeadRequest = {
  name: string;
  email: string;
  bubbleResults: ShareLeadBubbleResult[];
};

export type ShareLeadResponse = {
  ok: boolean;
  message: string;
};

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateShareContact(name: string, email: string): string | null {
  if (!name.trim()) {
    return "Naam is verplig.";
  }

  if (!email.trim()) {
    return "E-pos is verplig.";
  }

  if (!isValidEmail(email)) {
    return "Voer 'n geldige e-posadres in.";
  }

  return null;
}
