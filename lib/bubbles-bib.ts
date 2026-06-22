export const BUBBLES_BIB_SECTIONS = [
  { id: "wat-is-bubbles", label: "Wat is Bubbles", href: "/waardes" },
  { id: "die-bubbles", label: "Die Bubbles", href: "/waardes/die-bubbles" },
  { id: "bubbleblaaie", label: "Bubbleblaaie", href: "/plakkate" },
] as const;

export type BubblesBibSectionId = (typeof BUBBLES_BIB_SECTIONS)[number]["id"];

export const BUBBLES_BIB_IMAGES = {
  watIsBubbles: {
    src: "/bubbles-bib/wat-is-bubbles.png",
    src2x: "/bubbles-bib/wat-is-bubbles@2x.png",
    width: 682,
    height: 1024,
  },
} as const;

/** @deprecated Use BUBBLES_BIB_IMAGES.watIsBubbles */
export const BUBBLES_BIB_IMAGE_DIMENSIONS = {
  watIsBubbles: { width: 682, height: 1024 },
} as const;

export const AXIS_ICON_PATHS = {
  ek: "/axis-icons/ek.png",
  ons: "/axis-icons/ons.png",
  stabiliteit: "/axis-icons/stabiliteit.png",
  verandering: "/axis-icons/verandering.png",
} as const;

export const BUBBLES_AXIS_QUADRANTS = [
  {
    id: "ons-stabiliteit",
    position: "top-left" as const,
    title: "Ons + Stabiliteit",
    label: "Ons hou bymekaar",
  },
  {
    id: "ek-stabiliteit",
    position: "top-right" as const,
    title: "Ek + Stabiliteit",
    label: "Ek bou \u2019n stewige fondament",
  },
  {
    id: "ons-verandering",
    position: "bottom-left" as const,
    title: "Ons + Verandering",
    label: "Ons maak dinge beter",
  },
  {
    id: "ek-verandering",
    position: "bottom-right" as const,
    title: "Ek + Verandering",
    label: "Ek ontdek wat moontlik is",
  },
] as const;

export function getActiveBubblesBibSectionId(
  pathname: string,
): BubblesBibSectionId {
  if (pathname === "/plakkate") {
    return "bubbleblaaie";
  }

  if (pathname === "/waardes/die-bubbles") {
    return "die-bubbles";
  }

  return "wat-is-bubbles";
}
