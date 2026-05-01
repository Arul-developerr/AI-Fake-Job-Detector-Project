const scannedJobs = [
  {
    _id: "64b8f9c1a3e2d1f4b5c6a7d8",
    jobDetails: {
      title: "Remote Data Entry Clerk",
      company: "TechData Global Solutions",
      email: "hiring.techdata@gmail.com",
      url: "https://techdataglobal-careers.weebly.com",
      description:
        "Earn $4,000/week from home! No experience required. We provide a MacBook Pro and home office setup. You must pay a $50 refundable background check fee to our vendor before starting.",
    },
    aiAnalysis: {
      verdict: "SCAM",
      authenticityScore: 12.5,
      flagsDetected: [
        {
          type: "UPFRONT_FEE",
          message: "Requests payment for background check.",
        },
        {
          type: "UNREALISTIC_COMPENSATION",
          message:
            "$4,000/week is unusually high for entry-level data entry.",
        },
        {
          type: "UNPROFESSIONAL_EMAIL",
          message:
            "Uses a free email provider (@gmail.com) instead of a corporate domain.",
        },
        {
          type: "SUSPICIOUS_DOMAIN",
          message:
            "Company website is hosted on a free builder (Weebly).",
        },
      ],
    },
    timestamp: "2026-05-01T09:15:00Z",
  },
  {
    _id: "64b8f9c1a3e2d1f4b5c6a7d9",
    jobDetails: {
      title: "Junior Frontend Developer Intern",
      company: "CloudSync Innovations",
      email: "careers@cloudsync.io",
      url: "https://cloudsync.io/careers",
      description:
        "We are looking for a motivated Frontend Intern to join our team for the summer. Familiarity with React and CSS is required. This is a paid internship ($25/hr). Please submit your portfolio and resume.",
    },
    aiAnalysis: {
      verdict: "LEGITIMATE",
      authenticityScore: 96.0,
      flagsDetected: [],
    },
    timestamp: "2026-05-01T09:42:00Z",
  },
  {
    _id: "64b8f9c1a3e2d1f4b5c6a7e0",
    jobDetails: {
      title: "Package Reshipper - Logistics Manager",
      company: "Rapid Delivery Co",
      email: "hr@rapiddelivery-co.net",
      url: "https://rapiddelivery-co.net",
      description:
        "Receive packages at your home, inspect them, and ship them to our international clients. We cover shipping costs. Keep 10% of the item value as your salary. Hiring immediately, no interview required.",
    },
    aiAnalysis: {
      verdict: "SCAM",
      authenticityScore: 5.2,
      flagsDetected: [
        {
          type: "KNOWN_SCAM_TYPOLOGY",
          message:
            "Matches the exact pattern of a 'Reshipping Scam' often tied to stolen credit cards.",
        },
        {
          type: "NO_INTERVIEW",
          message:
            "Claims to hire immediately without an interview process.",
        },
        {
          type: "PAYMENT_STRUCTURE",
          message:
            "Commission based on physical item value rather than a standard wage.",
        },
      ],
    },
    timestamp: "2026-05-01T10:05:00Z",
  },
];

export default scannedJobs;
