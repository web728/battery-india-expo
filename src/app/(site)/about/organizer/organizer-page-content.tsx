
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Mail,
  Phone,
} from "lucide-react";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease,
    },
  },
};

const organizerLogo = "/partners/futurex-logo.png";


export function OrganizerPageContent() {
  const reduceMotion = useReducedMotion();

  const motionProps = {
    initial: reduceMotion ? false : "hidden",
    whileInView: "visible",
    viewport: {
      once: true,
      amount: 0.15,
    },
  } as const;

  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-labelledby="organizer-heading"
        className="bg-white py-14 text-[#19191c] sm:py-16 lg:py-20"
      >
        <Container>
          <div className="grid items-center gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 xl:gap-20">
            {/* Organizer identity */}
            <m.div
              {...motionProps}
              variants={reveal}
              className="min-w-0"
            >
              <div className="overflow-hidden rounded-xl border border-[#eae8e5] bg-[#faf9f7] p-6 sm:p-8">
                <div className="flex min-h-[180px] items-center justify-center rounded-lg border border-[#eeece9] bg-white px-7 py-9 sm:min-h-[220px]">
                <Image
  src={organizerLogo}
  alt={`${siteConfig.organizer.name} official logo`}
  width={600}
  height={250}
  priority
  className="h-auto max-h-[110px] w-auto max-w-full object-contain"
/>
                </div>

                <div className="mt-5 border-t border-[#e6e3df] pt-5">
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
                    Exhibition Organizer
                  </p>

                  <h3 className="mt-2 font-heading text-xl font-bold tracking-[-0.025em] text-[#202024]">
                    {siteConfig.organizer.name}
                  </h3>
                </div>
              </div>
            </m.div>

            {/* About the organizer */}
            <m.div
              {...motionProps}
              variants={reveal}
              className="min-w-0"
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-[2px] w-8 bg-[#ed3138]"
                />

                <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
                  About the Organizer
                </span>
              </div>

              <h2
                id="organizer-heading"
                className="max-w-[620px] font-heading text-[clamp(1.9rem,3.3vw,2.85rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-[#19191c]"
              >
                Organized by{" "}
                <span className="text-[#ed3138]">
                  {siteConfig.organizer.name}
                </span>
              </h2>

              <p className="mt-6 max-w-[620px] text-[15px] leading-8 text-[#626269] sm:text-base">
                {siteConfig.organizer.name} organizes India
                Battery International Show, a business exhibition
                dedicated to battery technologies, manufacturing
                and energy storage.
              </p>

              <p className="mt-4 max-w-[620px] text-[15px] leading-8 text-[#626269] sm:text-base">
                The 2027 edition will take place from 14–16 October
                at Auto Cluster Exhibition Centre,
                Pimpri-Chinchwad, Pune, alongside India EV Show
                and India Solar International Show.
              </p>

              <p className="mt-4 max-w-[620px] text-[15px] leading-8 text-[#626269] sm:text-base">
                The exhibition provides a setting for product
                displays, industry meetings and discussions
                related to battery manufacturing, electric
                mobility and energy storage applications.
              </p>

              <div className="mt-7 border-t border-[#e9e7e4] pt-6">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 font-heading text-sm font-bold text-[#d52d35] transition-colors hover:text-[#aa222a] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed3138]"
                >
                  Contact the organizing team

                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </m.div>
          </div>
        </Container>
      </section>

      {/* Contact information */}
      {siteConfig.contacts.length > 0 && (
        <section
          aria-labelledby="organizer-contact-heading"
          className="border-t border-[#eceae7] bg-[#faf9f7] py-14 text-[#19191c] sm:py-16"
        >
          <Container>
            <m.div
              {...motionProps}
              variants={reveal}
              className="mb-7 max-w-2xl"
            >
              <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
                Contact
              </p>

              <h2
                id="organizer-contact-heading"
                className="font-heading text-[clamp(1.6rem,2.7vw,2.2rem)] font-extrabold leading-tight tracking-[-0.035em]"
              >
                Get in touch with our team.
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#6b6b70] sm:text-[15px]">
                For exhibition participation and
                event-related enquiries.
              </p>
            </m.div>

            <div className="grid gap-4 md:grid-cols-2">
              {siteConfig.contacts.map((contact, index) => (
                <m.article
                  key={`${contact.email}-${index}`}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion
                      ? 0
                      : index * 0.07,
                    ease,
                  }}
                  className="rounded-xl border border-[#e9e7e4] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#ed3138]/25 hover:shadow-[0_10px_26px_rgba(0,0,0,0.035)] sm:p-6"
                >
                  <h3 className="font-heading text-base font-bold text-[#202024]">
                    {contact.name}
                  </h3>

                  <div className="mt-5 space-y-3 border-t border-[#efeeeb] pt-4">
                    {contact.phone && (
                      <a
                        href={`tel:${contact.phone.replace(/[\s()-]/g, "")}`}
                        className="flex items-start gap-3 text-sm leading-6 text-[#606067] transition-colors hover:text-[#d52d35]"
                      >
                        <Phone
                          className="mt-1 h-4 w-4 shrink-0 text-[#d52d35]"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />

                        <span>{contact.phone}</span>
                      </a>
                    )}

                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-start gap-3 break-all text-sm leading-6 text-[#606067] transition-colors hover:text-[#d52d35]"
                      >
                        <Mail
                          className="mt-1 h-4 w-4 shrink-0 text-[#d52d35]"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />

                        <span>{contact.email}</span>
                      </a>
                    )}
                  </div>
                </m.article>
              ))}
            </div>
          </Container>
        </section>
      )}
    </LazyMotion>
  );
}
