export type StatCard = {
  label: string;
  value: string;
  editable: true;
};

// Editable via the admin CMS (event_settings / website statistics module).
// No figure is published without confirmation — unconfirmed fields show
// status text instead of a number.
export const statCards: StatCard[] = [
  { label: "Exhibitors", value: "To Be Announced", editable: true },
  { label: "Business Visitors", value: "Registrations Opening Soon", editable: true },
  { label: "Exhibitor Categories", value: "13", editable: true },
];
