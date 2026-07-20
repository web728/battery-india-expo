// Exhibitor Profile categories, taken directly from the official show brochure.
export type Sector = {
  slug: string;
  name: string;
  icon:
    | "battery"
    | "layers"
    | "cpu"
    | "warehouse"
    | "recycle"
    | "plug-zap"
    | "flask"
    | "microscope"
    | "brain"
    | "landmark"
    | "newspaper"
    | "briefcase"
    | "shield-check";
  description: string;
};

export const sectors: Sector[] = [
  {
    slug: "battery-cell-manufacturers",
    name: "Battery Cell Manufacturers",
    icon: "battery",
    description: "Li-ion, LFP, NMC, solid-state, cylindrical, pouch, prismatic cells.",
  },
  {
    slug: "battery-pack-integrators",
    name: "Battery Pack Integrators",
    icon: "layers",
    description: "EV packs, industrial packs, modular packs, BMS integration.",
  },
  {
    slug: "battery-management-systems",
    name: "Battery Management Systems (BMS)",
    icon: "cpu",
    description: "Hardware & software providers, monitoring & diagnostic systems.",
  },
  {
    slug: "energy-storage-solutions",
    name: "Energy Storage Solutions",
    icon: "warehouse",
    description: "Grid storage, microgrids, hybrid renewable storage, stationary ESS.",
  },
  {
    slug: "battery-recycling-second-life",
    name: "Battery Recycling & Second-Life Solutions",
    icon: "recycle",
    description: "Recycling plants, refurbishment, second-life battery applications.",
  },
  {
    slug: "charging-power-electronics",
    name: "Charging & Power Electronics Components",
    icon: "plug-zap",
    description: "Inverters, converters, controllers, thermal management.",
  },
  {
    slug: "battery-materials-components",
    name: "Battery Materials & Components",
    icon: "flask",
    description: "Electrodes, separators, electrolytes, anode/cathode materials.",
  },
  {
    slug: "rd-institutes-universities",
    name: "R&D Institutes & Universities",
    icon: "microscope",
    description: "Research labs, innovation centers, technology incubation hubs.",
  },
  {
    slug: "startups-innovators",
    name: "Startups & Innovators",
    icon: "brain",
    description: "Battery technology startups, AI/automation for batteries, solid-state solutions.",
  },
  {
    slug: "government-policy-bodies",
    name: "Government / Policy Bodies",
    icon: "landmark",
    description: "MNRE, state energy & EV cells, energy & industrial development boards.",
  },
  {
    slug: "industry-media-associations",
    name: "Industry Media & Associations",
    icon: "newspaper",
    description: "Battery trade publications, industry associations, EV advocacy organizations.",
  },
  {
    slug: "consultancy-advisory-firms",
    name: "Consultancy & Advisory Firms",
    icon: "briefcase",
    description: "Market research, policy advisory, financial advisory for battery projects.",
  },
  {
    slug: "testing-certification-labs",
    name: "Testing & Certification Labs",
    icon: "shield-check",
    description: "Battery testing, safety, compliance, and standardization labs.",
  },
];
