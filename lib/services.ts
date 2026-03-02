export interface ServiceItem {
  name: string;
  price: string;
  note?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  items: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "pants",
    title: "Pants & Bottoms",
    description:
      "Hemming, tapering, and waist adjustments for trousers, jeans, shorts, and more.",
    items: [
      { name: "Hem pants (no cuff)", price: "$22" },
      { name: "Hem pants (with cuff)", price: "$28" },
      { name: "Shorten shorts", price: "$18" },
      { name: "Taper / slim legs", price: "$40" },
      { name: "Take in waist", price: "$30" },
      { name: "Let out waist", price: "$30" },
      { name: "Take in seat", price: "$28" },
      { name: "Add belt loops", price: "$20" },
      { name: "Replace zipper (pants)", price: "$25" },
    ],
  },
  {
    id: "tops",
    title: "Tops & Jackets",
    description:
      "Alterations to shirts, blouses, blazers, and jackets for a precise, tailored fit.",
    items: [
      { name: "Take in sides (shirt/blouse)", price: "$35" },
      { name: "Shorten sleeves (shirt)", price: "$28" },
      { name: "Shorten sleeves (jacket/blazer)", price: "$38" },
      { name: "Take in jacket/blazer", price: "$55–$85" },
      { name: "Shorten jacket body", price: "$45" },
      { name: "Replace zipper (jacket)", price: "$30" },
      { name: "Repair seam", price: "$18" },
    ],
  },
  {
    id: "dresses",
    title: "Dresses & Formal Wear",
    description:
      "Hem, fit, and fine-tune dresses, gowns, and formal garments with the care they deserve.",
    items: [
      { name: "Hem dress (casual/unlined)", price: "$30" },
      { name: "Hem dress (formal/lined)", price: "$50" },
      { name: "Take in dress", price: "$45–$65" },
      { name: "Let out dress", price: "$35–$55" },
      { name: "Shorten dress straps", price: "$22" },
      { name: "Add/replace zipper (dress)", price: "$30–$45" },
      {
        name: "Bridal & formal alterations",
        price: "$75–$200",
        note: "Quoted by garment",
      },
    ],
  },
  {
    id: "custom",
    title: "Custom Work & Repairs",
    description:
      "Custom garment creation, repairs, mending, and specialty work — quoted individually.",
    items: [
      { name: "Repairs & mending", price: "From $15" },
      { name: "Patch work", price: "From $18" },
      { name: "Lining replacement", price: "From $40" },
      {
        name: "Custom garment creation",
        price: "Quoted by project",
        note: "Contact us for a quote",
      },
    ],
  },
];

export const mailInFee = {
  label: "Mail-In Handling Fee",
  amount: "$10 per order",
  note: "Added to any service for mail-in orders. You ship to Walterboro, SC. We alter and ship back.",
};
