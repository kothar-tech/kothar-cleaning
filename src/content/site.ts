/**
 * REAL content, taken from the Kothar Cleaning Services brochure.
 * Anything invented or unconfirmed lives in `placeholders.ts` instead.
 */

export type ServiceId =
  | "commercial"
  | "office"
  | "end-of-lease"
  | "disability-home"
  | "glass"
  | "carpet";

export type IconKey =
  | "building"
  | "office"
  | "key"
  | "heart"
  | "window"
  | "sofa"
  | "tile"
  | "pressure"
  | "shield"
  | "trash"
  | "party"
  | "door"
  | "assess"
  | "select"
  | "prepare"
  | "clean"
  | "inspect"
  | "spray"
  | "flask"
  | "bath"
  | "mop"
  | "layers"
  | "camera"
  | "map";

export interface Photo {
  src: string;
  alt: string;
  /** CSS object-position for cards that crop the photo */
  position?: string;
}

export interface CoreService {
  id: ServiceId;
  title: string;
  /** Short label for the estimator and form */
  shortTitle: string;
  summary: string;
  items: string[];
  icon: IconKey;
  photo: Photo;
}

export const site = {
  name: "Kothar Cleaning Services",
  tagline: "Clean Spaces. Healthier Lives.",
  description:
    "Professional commercial, office, end of lease, disability house, glass and carpet cleaning. Send photos or a short video for a clear, tailored quotation.",
  email: "kotharcleaning@gmail.com",
  phones: [
    { display: "0424 344 135", tel: "+61424344135" },

    { display: "0421 466 057", tel: "+61421466057" },
  ],
  // Confirmed by the client: use the brochure numbers. The logo artwork prints a different landline
  // (02 7252 4500), but the logo crops used on the site stop above that contact bar.
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Estimate", href: "#estimator" },
  { label: "Process", href: "#process" },
  { label: "Why Kothar", href: "#why" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const coreServices: CoreService[] = [
  {
    id: "commercial",
    title: "Commercial Cleaning",
    shortTitle: "Commercial",
    summary: "Keep your business premises clean, presentable and hygienic.",
    items: [
      "Dust and wipe surfaces",
      "Vacuum and mop floors",
      "Restroom cleaning and restocking",
      "Waste removal",
      "High-touch surface cleaning",
    ],
    icon: "building",
    photo: {
      src: "/images/commercial-mop.jpg",
      alt: "Cleaner in protective coveralls mopping a bright white commercial floor",
      position: "50% 60%",
    },
  },
  {
    id: "office",
    title: "Office Cleaning",
    shortTitle: "Office",
    summary:
      "A clean workplace supports productivity and creates a professional impression.",
    items: [
      "Desks and workstations",
      "Kitchen and common areas",
      "Floors and carpets",
      "Bins and touchpoints",
      "Regular or one-off visits",
    ],
    icon: "office",
    photo: {
      src: "/images/office-vacuum.jpg",
      alt: "Cleaner in yellow gloves vacuuming the carpet of a glass-walled office",
      position: "50% 45%",
    },
  },
  {
    id: "end-of-lease",
    title: "End of Lease Cleaning",
    shortTitle: "End of lease",
    summary:
      "Detailed cleaning designed to help tenants leave the property ready for inspection.",
    items: [
      "Bedrooms and living areas",
      "Kitchen and appliances",
      "Bathrooms and showers",
      "Floors, skirting and surfaces",
      "Spot cleaning and final checks",
    ],
    icon: "key",
    photo: {
      src: "/images/end-of-lease.jpg",
      alt: "Empty, spotless room with white walls, hardwood floor and high windows",
      position: "50% 55%",
    },
  },
  {
    id: "disability-home",
    title: "Disability House Cleaning",
    shortTitle: "Home / disability",
    summary:
      "Respectful, reliable cleaning tailored to individual living arrangements and support needs.",
    items: [
      "Bedroom, bathroom and kitchen",
      "Dusting, mopping and vacuuming",
      "High-touch areas",
      "Hygienic cleaning practices",
      "Flexible scheduling",
    ],
    icon: "heart",
    photo: {
      src: "/images/disability-home.jpg",
      alt: "Cleaner in yellow gloves wiping a table beside a vase of flowers",
      position: "50% 50%",
    },
  },
  {
    id: "glass",
    title: "Glass Cleaning",
    shortTitle: "Glass",
    summary:
      "Streak-free cleaning for windows, glass doors, mirrors and partitions.",
    items: [
      "Glass surfaces",
      "Frames and sills",
      "Interior and exterior where accessible",
      "Mirrors and partitions",
      "Detail finishing",
    ],
    icon: "window",
    photo: {
      src: "/images/glass-squeegee.jpg",
      alt: "Hand pulling a squeegee down a soapy window to leave a clear streak-free stripe",
      position: "50% 76%",
    },
  },
  {
    id: "carpet",
    title: "Carpet Cleaning",
    shortTitle: "Carpet",
    summary: "Deep cleaning to remove accumulated dirt, stains and odours.",
    items: [
      "Vacuuming and pre-treatment",
      "Spot and stain treatment",
      "Extraction cleaning",
      "Odour control",
      "Final grooming and drying advice",
    ],
    icon: "sofa",
    photo: {
      src: "/images/carpet-extraction.jpg",
      alt: "Cleaner in black gloves using an extraction tool on upholstery",
      position: "50% 40%",
    },
  },
];

export interface AdditionalService {
  title: string;
  summary: string;
  icon: IconKey;
  photo?: Photo;
}

export const additionalServices: AdditionalService[] = [
  {
    title: "Tile & Grout Cleaning",
    summary:
      "Deep cleaning of tile surfaces and grout lines to remove built-up dirt, soap residue and discolouration.",
    icon: "tile",
    photo: {
      src: "/images/tile-bathroom.jpg",
      alt: "Bright tiled bathroom with a glass shower screen",
      position: "50% 50%",
    },
  },
  {
    title: "High-Pressure Cleaning",
    summary:
      "Suitable for exterior hard surfaces such as concrete, paths, driveways and selected outdoor areas.",
    icon: "pressure",
    photo: {
      src: "/images/pressure-wash.jpg",
      alt: "Worker in a hi-vis vest using a surface cleaner to pressure wash paving",
      position: "50% 70%",
    },
  },
  {
    title: "Sanitisation & Disinfection",
    summary:
      "Targeted cleaning and disinfection of suitable high-touch and hard surfaces using appropriate products and procedures.",
    icon: "shield",
    photo: {
      src: "/images/sanitise-wipe.jpg",
      alt: "Blue-gloved hands wiping a white surface with a spray bottle and paper towel",
      position: "50% 50%",
    },
  },
  {
    title: "Common-Area Cleaning",
    summary:
      "Cleaning of shared areas including entrances, corridors, foyers, lifts, stairways and amenities.",
    icon: "door",
    photo: {
      src: "/images/corridor-cart.jpg",
      alt: "Housekeeping cart and vacuum cleaner in a long carpeted corridor",
      position: "50% 55%",
    },
  },
  {
    title: "Event Cleaning",
    summary:
      "Pre-event, during-event and post-event cleaning to help maintain a clean and presentable venue.",
    icon: "party",
    photo: {
      src: "/images/event-confetti.jpg",
      alt: "Cleaner mopping confetti and streamers off a floor among party balloons",
      position: "60% 50%",
    },
  },
  {
    title: "Rubbish Removal",
    summary:
      "Removal and tidy-up of general rubbish and light waste, subject to site access, volume and disposal requirements.",
    icon: "trash",
    photo: {
      src: "/images/rubbish-ute.jpg",
      alt: "White ute with its tray piled high with black rubbish bags",
      position: "45% 40%",
    },
  },
];

export const processSteps = [
  {
    title: "Assess",
    text: "Identify the surface, soil type, level of contamination and any site-specific requirements.",
    icon: "assess",
  },
  {
    title: "Select",
    text: "Choose the appropriate professional-grade product, equipment and PPE for the task.",
    icon: "select",
  },
  {
    title: "Prepare",
    text: "Follow the manufacturer's label, dilution instructions, ventilation requirements and contact time.",
    icon: "prepare",
  },
  {
    title: "Clean",
    text: "Work systematically, using appropriate mechanical action, dwell time and clean equipment.",
    icon: "clean",
  },
  {
    title: "Inspect",
    text: "Complete a final visual check and detail high-touch, edges, corners and other priority areas.",
    icon: "inspect",
  },
] as const;

/** Described by task on purpose: no third-party brand names on the site. */
export const productTypes = [
  {
    title: "Hospital-grade multi-purpose disinfectant",
    text: "Routine hard-surface cleaning and disinfection where the product label permits.",
    icon: "shield",
  },
  {
    title: "Bathroom disinfectant",
    text: "Soap scum, grime and suitable hard surfaces in bathrooms and showers.",
    icon: "bath",
  },
  {
    title: "Mould and mildew remover",
    text: "Treatment for mould and mildew on suitable surfaces, with ventilation requirements followed.",
    icon: "flask",
  },
  {
    title: "Carpet and upholstery extraction solution",
    text: "Professional solution designed for compatible carpet-cleaning machines.",
    icon: "sofa",
  },
  {
    title: "Glass cleaner",
    text: "Windows, mirrors and suitable glass surfaces, finished streak-free.",
    icon: "window",
  },
  {
    title: "Oven and BBQ degreaser",
    text: "Heavy-duty degreasing for compatible surfaces, with label and PPE requirements followed.",
    icon: "spray",
  },
  {
    title: "Descaler",
    text: "Scale and mineral build-up on appliances and fixtures, used only on compatible surfaces.",
    icon: "layers",
  },
  {
    title: "Commercial laundry detergent",
    text: "A professional detergent option for suitable commercial laundry applications.",
    icon: "mop",
  },
] as const;

export const safetyRules = [
  "We never use one chemical for every surface.",
  "Products are chosen by surface, task and manufacturer directions.",
  "Chemicals are never mixed.",
  "Appropriate PPE, ventilation, dilution and contact times are followed.",
  "Safety Data Sheets (SDS) are used where applicable.",
] as const;

export const quotePaths = [
  {
    title: "Send photos or videos",
    icon: "camera",
    text: "Send clear photos or short videos showing the areas you need cleaned. Include bathrooms, kitchens, floors, windows, carpet and any heavily soiled areas where possible.",
    strong: "We can provide a quotation based on the visible scope.",
  },
  {
    title: "Arrange a site visit",
    icon: "map",
    text: "For larger commercial premises, ongoing contracts, complex cleaning or where the scope cannot be accurately assessed remotely, we can arrange a site visit.",
    strong:
      "This allows us to assess access, frequency, equipment and cleaning requirements.",
  },
] as const;

export const quoteConsiderations = [
  "Type and size of the property",
  "Number and condition of rooms, bathrooms and common areas",
  "Flooring type, carpet condition and glass/windows",
  "One-off, end-of-lease or recurring cleaning frequency",
  "Level of dirt, stains, grease and build-up",
  "Access, parking, operating hours and site requirements",
  "Special cleaning, disability-home or hygiene requirements",
] as const;

export const whyKothar = [
  {
    title: "Reliable and professional service",
    text: "Show up, do the job properly, and leave the space ready to use.",
  },
  {
    title: "Flexible one-off or recurring cleaning",
    text: "A single deep clean, an end-of-lease job or a regular visit that fits your hours.",
  },
  {
    title: "Clear scope and transparent quotations",
    text: "You see what is included before any work starts.",
  },
  {
    title: "Professional products and appropriate equipment",
    text: "Matched to the surface and the soil, not one chemical for everything.",
  },
  {
    title: "Attention to high-touch and detail areas",
    text: "Handles, switches, edges and corners get a final check.",
  },
  {
    title: "Tailored to homes, offices and commercial premises",
    text: "The same care whether it is a bedroom or a building.",
  },
] as const;

export const faqs = [
  {
    q: "How do I get a quote?",
    a: "Send clear photos or short videos of the areas to be cleaned, including bathrooms, kitchens, floors, windows, carpet and heavily soiled spots. We quote from the visible scope. For larger or more complex jobs we can arrange a site visit.",
  },
  {
    q: "Do you do one-off and regular cleaning?",
    a: "Both. We clean one-off, end-of-lease and recurring jobs, and the quote reflects the frequency you choose.",
  },
  {
    q: "When is a site visit needed?",
    a: "For larger commercial premises, ongoing contracts, complex cleaning, or whenever the scope cannot be assessed accurately from photos. It lets us check access, frequency, equipment and requirements.",
  },
  {
    q: "What affects the price?",
    a: "Property type and size, the number and condition of rooms and bathrooms, flooring and glass, how often you want us, how heavy the dirt and grease are, and access, parking and operating hours.",
  },
  {
    q: "Do you use the same chemical on every surface?",
    a: "No. Products are selected for the surface and the job, following the manufacturer's directions. Chemicals are never mixed, and PPE, ventilation, dilution and contact times are followed.",
  },
  {
    q: "Can you clean disability homes?",
    a: "Yes. Disability house cleaning is tailored to individual living arrangements and support needs, with hygienic practices and flexible scheduling.",
  },
  {
    q: "Do you clean outdoor areas and windows?",
    a: "Yes. High-pressure cleaning suits exterior hard surfaces such as concrete, paths and driveways, and glass cleaning covers interior and exterior where accessible.",
  },
] as const;

/** Options for the contact form's service select */
export const serviceChoices = [
  ...coreServices.map((s) => ({ value: s.id as string, label: s.title })),
  { value: "tile-grout", label: "Tile & Grout Cleaning" },
  { value: "high-pressure", label: "High-Pressure Cleaning" },
  { value: "sanitisation", label: "Sanitisation & Disinfection" },
  { value: "common-area", label: "Common-Area Cleaning" },
  { value: "event", label: "Event Cleaning" },
  { value: "rubbish", label: "Rubbish Removal" },
  { value: "not-sure", label: "Not sure yet" },
];

export const photoCredits = [
  {
    file: "hero-room.jpg",
    by: "Point3D Commercial Imaging Ltd.",
    url: "https://unsplash.com/photos/white-wooden-framed-glass-window-5d-aYsO2g7U",
  },
  {
    file: "home-living.jpg",
    by: "Vitaly Gariev",
    url: "https://unsplash.com/photos/woman-with-headphones-cleaning-and-dancing-KPKt9et9vJc",
  },
  {
    file: "office-vacuum.jpg",
    by: "web seo",
    url: "https://unsplash.com/photos/a-man-in-yellow-gloves-vacuums-a-carpeted-office-floor-CVcIMnH_7so",
  },
  {
    file: "commercial-mop.jpg",
    by: "Toon Lambrechts",
    url: "https://unsplash.com/photos/person-mopping-floor-in-sterile-room-TpNA_02AzXY",
  },
  {
    file: "end-of-lease.jpg",
    by: "Salvo Media LLC",
    url: "https://unsplash.com/photos/empty-room-with-white-walls-hardwood-floor-and-high-windows-bG8rvtDeExE",
  },
  {
    file: "disability-home.jpg",
    by: "Vitaly Gariev",
    url: "https://unsplash.com/photos/woman-in-yellow-gloves-cleaning-a-table-ViXT4S89hS0",
  },
  {
    file: "glass-squeegee.jpg",
    by: "Joshua Bowers",
    url: "https://unsplash.com/photos/a-person-is-drawing-a-picture-on-a-window-jr9wXKcwjt0",
  },
  {
    file: "carpet-extraction.jpg",
    by: "Giorgio Trovato",
    url: "https://unsplash.com/photos/a-woman-in-a-green-shirt-and-black-gloves-vacuuming-a-gray-ottoman-5TXz228u4eo",
  },
  {
    file: "tile-bathroom.jpg",
    by: "Lotus Design N Print",
    url: "https://unsplash.com/photos/modern-bathroom-with-shower-and-vanity-g51F6-WYzyU",
  },
  {
    file: "pressure-wash.jpg",
    by: "The Graphic Space",
    url: "https://unsplash.com/photos/a-man-in-a-yellow-vest-is-cleaning-a-street-gal5jKCgDVo",
  },
  {
    file: "sanitise-wipe.jpg",
    by: "Anton",
    url: "https://unsplash.com/photos/hands-cleaning-surface-with-spray-bottle-y-bjqTUUw2Q",
  },
  {
    file: "floor-suds.jpg",
    by: "PuroClean of Fort Worth",
    url: "https://unsplash.com/photos/a-person-in-yellow-gloves-and-blue-gloves-cleaning-a-floor--dc38HdQR1M",
  },
  {
    file: "corridor-cart.jpg",
    by: "Ashwini Chaudhary (Monty)",
    url: "https://unsplash.com/photos/housekeeping-cart-in-hotel-corridor-Iu6parQAO-U",
  },
  {
    file: "living-mop.jpg",
    by: "Vitaly Gariev",
    url: "https://unsplash.com/photos/a-woman-mops-a-bright-modern-living-room-floor-2NcTLdFHpH8",
  },
] as const;
