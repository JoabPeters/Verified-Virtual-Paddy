/**
 * Verified Virtual Paddy - Master Site Configuration
 * 
 * SITE OWNER / ADMINISTRATOR NOTICE:
 * To update website contact info, voluntary support account numbers, FAQs, 
 * or service details without requiring a paid database or server backend,
 * edit the fields in this configuration file.
 */

export const SITE_CONFIG = {
  brand: {
    name: "Verified Virtual Paddy",
    tagline: "Your Digital Buddy for Document Assistance.",
    shortDescription: "A 100% free digital assistance platform for Nigerians to locate genuine electricity bill channels or generate self-prepared address statements in private browser memory.",
    establishedYear: 2025,
    version: "1.0.0",
  },

  support: {
    title: "Support Verified Virtual Paddy",
    voluntaryNotice: "Verified Virtual Paddy is completely free. If our service has helped you, you can voluntarily support its development. Contributions are never required to use our services.",
    accountNumber: "8167224874",
    channels: [
      {
        provider: "OPay",
        accountNumber: "8167224874",
        appHint: "Search 'OPay' or open OPay app -> Transfer -> Enter Account Number",
        color: "#00B875",
      },
      {
        provider: "PalmPay",
        accountNumber: "8167224874",
        appHint: "Open PalmPay app -> Send Money -> To Bank / PalmPay Account",
        color: "#673AB7",
      },
      {
        provider: "Moniepoint",
        accountNumber: "8167224874",
        appHint: "Open your bank app or Moniepoint -> Transfer to Moniepoint MFB",
        color: "#0D47A1",
      },
    ],
    preTransferDisclaimer: "Before transferring, open your chosen payment app and confirm the recipient details shown by your payment provider. Transfers are optional. Verified Virtual Paddy will never require a donation to generate a basic document.",
  },

  contact: {
    email: "talk2joabpeters2007@gmail.com",
    complaintsEmail: "talk2joabpeters2007@gmail.com",
    physicalAddress: "Nigeria (Digital Civic Technology Project)",
    hours: "Digital Service Available 24/7",
    note: "For inquiries, provider directory updates, or complaint resolution under Nigerian consumer protection standards.",
  },

  privacyPrinciples: {
    zeroCostPolicy: "We believe essential civil document assistance should not be locked behind paywalls, high data costs, or recurring fees.",
    clientSideOnly: "100% of PDF generation is processed in your local device browser using open-source JavaScript. Your personal address, full name, phone number, and meter information are never uploaded to any remote server or stored in persistent browser cookies.",
    zeroTrackers: "No third-party advertising cookies, behavioural trackers, or surveillance pixels are installed.",
  },

  faqs: [
    {
      question: "Is Verified Virtual Paddy really 100% free?",
      answer: "Yes, completely free. You will never be required to pay, sign up, input a credit/debit card, or make a donation to use any of our tools. We provide an optional voluntary support section if you appreciate our service and wish to assist with project hosting, but you are completely welcome to use the service for free indefinitely.",
    },
    {
      question: "What is the difference between a genuine electricity bill and a Customer-Prepared Address Statement?",
      answer: "A genuine electricity bill is an official fiscal document issued directly by your licensed Electricity Distribution Company (such as Ikeja Electric, Eko DisCo, AEDC, IBEDC, etc.) reflecting actual energy consumption and metered billing. A Customer-Prepared Address Statement is a document prepared solely by you stating your residential address and contact details under your own declaration. It is NOT a utility bill and must NEVER be misrepresented as one.",
    },
    {
      question: "Can I use the Customer-Prepared Address Statement for official bank verification?",
      answer: "Acceptance depends entirely on the receiving institution's compliance policies. Many Nigerian institutions, fintech platforms, or embassies specifically demand a utility-issued bill or statutory court affidavit. Our statement clearly disclaims that it is user-supplied and not an official utility bill. You should always ask the requesting party if a user-declared address statement is acceptable.",
    },
    {
      question: "Why can't this site automatically pull my official DisCo bill with my meter number?",
      answer: "Distribution Companies in Nigeria (DisCos) require authorized, contracted business integrations with strict data access rights to query customer billing and consumption databases. We refuse to fake or simulate results with fabricated data. Instead, our Service A gives you direct, verified links to official DisCo customer portals, WhatsApp channels, and USSD codes where you can retrieve your genuine bill straight from the source without paying middlemen.",
    },
    {
      question: "Where is my personal data stored after I generate a PDF?",
      answer: "Nowhere. Your data is stored strictly in your device's temporary browser memory (RAM) while you fill the form. The PDF is assembled and downloaded directly onto your phone or computer. The moment you refresh the page or click 'Start Again', all entered data is immediately erased.",
    },
    {
      question: "How do I verify the voluntary support account?",
      answer: "When entering the voluntary support account number (8167224874) into OPay, PalmPay, or Moniepoint, your banking app will automatically display the registered account owner's legal name before you confirm the transaction. Always verify this recipient name in your app before sending any money.",
    },
  ],
};
