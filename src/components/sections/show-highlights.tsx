import {
  BatteryCharging,
  Warehouse,
  PlayCircle,
  Presentation,
  Wrench,
  Users,
  Landmark,
  Trophy,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const highlightIcons = [
  BatteryCharging,
  Warehouse,
  PlayCircle,
  Presentation,
  Wrench,
  Users,
  Landmark,
  Trophy,
];

const highlights = [
  "Comprehensive Battery Exhibition",
  "Energy Storage Systems Showcase",
  "Live Demonstrations",
  "Technical Conferences",
  "Workshops",
  "B2B Matchmaking",
  "Government & Policy Discussions",
  "Innovation & Technology Awards",
];

export function ShowHighlights() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Show Highlights" title="A Complete Business and Technology Experience" align="center" />
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {highlights.map((highlight, i) => {
            const Icon = highlightIcons[i];
            return (
              <div key={highlight} className="flex flex-col items-center rounded-xl bg-grey-light p-6 text-center">
                <Icon className="mb-3 h-8 w-8 text-red" aria-hidden="true" />
                <p className="text-sm font-semibold text-navy-dark">{highlight}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
