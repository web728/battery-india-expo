export type FaqItem = { question: string; answer: string };
export type FaqGroup = { group: string; items: FaqItem[] };

export const exhibitorFaqs: FaqGroup[] = [
  {
    group: "Booking & Stands",
    items: [
      {
        question: "How do I book a stand at India Battery International Show 2026?",
        answer:
          "Submit an enquiry through the Book a Stand page or the Exhibitor Enquiry form. Our sales team will contact you with available stand options, rates and next steps.",
      },
      {
        question: "What stand formats are available?",
        answer:
          "Stand sizes, formats and rates are confirmed directly with our exhibitor sales team based on your requirements — share what you need through the Book a Stand form.",
      },
      {
        question: "Is there a deadline to book a stand?",
        answer: "Booking deadlines will be confirmed by our sales team based on availability. Contact us for the current status.",
      },
    ],
  },
  {
    group: "Participation & Logistics",
    items: [
      {
        question: "What is included in exhibitor passes?",
        answer: "Pass allocation is confirmed at the time of booking. Details are available on request from our sales team.",
      },
      {
        question: "Can international companies exhibit?",
        answer: "Yes. International exhibitors are welcome. Contact our team for guidance on customs, logistics and travel.",
      },
      {
        question: "Where can I find move-in and move-out schedules?",
        answer: "Move-in and move-out timings are shared directly with confirmed exhibitors closer to the show dates.",
      },
    ],
  },
];

export const visitorFaqs: FaqGroup[] = [
  {
    group: "Registration",
    items: [
      {
        question: "How do I register to visit the show?",
        answer: "Use the Visitor Registration form. On submission you will receive a confirmation email with your reference number and a downloadable pass.",
      },
      {
        question: "Is visitor registration free?",
        answer: "Registration terms and any applicable fees will be confirmed and published here and on the Registration Terms page before the show opens.",
      },
      {
        question: "Can I register on-site?",
        answer: "On-site registration details will be confirmed closer to the event. Pre-registration online is recommended to avoid queues.",
      },
    ],
  },
  {
    group: "At the Show",
    items: [
      {
        question: "Who can attend as a trade visitor?",
        answer: "The show is designed for industry professionals — OEMs, manufacturers, energy companies, researchers, investors, regulators, consultants and media. See the Visitor Profile page for the full list.",
      },
      {
        question: "Is the show open to students?",
        answer: "Students and research scholars are welcome to register as trade visitors, subject to the registration terms published closer to the event.",
      },
    ],
  },
];
