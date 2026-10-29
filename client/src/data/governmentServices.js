const governmentServices = [
  {
    id: "income-certificate",
    name: "Income Certificate",
    shortName: "Income Certificate",
    department: "Revenue Department",
    category: "Certificates",

    description:
      "An Income Certificate is an official document that records the annual income of an individual or family. It may be required for scholarships, fee concessions, government schemes and other official purposes.",

    icon: "📄",

    eligibility:
      "Residents who need an official certificate to establish their income for government or other authorized purposes.",

    applicationMode: "Online",

    applicationSteps: [
      {
        step: 1,
        title: "Visit the Official Portal",
        description:
          "Open the relevant official government service portal and select the Income Certificate service."
      },
      {
        step: 2,
        title: "Register or Login",
        description:
          "Create an account or sign in using the authentication method provided by the official portal."
      },
      {
        step: 3,
        title: "Fill the Application",
        description:
          "Enter the required personal, address and income-related information carefully."
      },
      {
        step: 4,
        title: "Upload Documents",
        description:
          "Upload the documents requested by the official portal in the required format."
      },
      {
        step: 5,
        title: "Submit the Application",
        description:
          "Review the information and submit the application through the official portal."
      },
      {
        step: 6,
        title: "Track the Application",
        description:
          "Keep the application or reference number so that you can check the application status later."
      }
    ],

    requiredDocuments: [
      "Identity proof",
      "Address proof",
      "Income-related supporting documents",
      "Passport-size photograph",
      "Other documents requested by the issuing authority"
    ],

    officialSource: {
      name: "Tamil Nadu Government",
      url: "https://www.tn.gov.in/",
      description:
        "Use the official Tamil Nadu Government website to access government information and relevant services."
    },

    lastVerified: "23 September 2026"
  },

  {
    id: "nativity-certificate",
    name: "Nativity Certificate",
    shortName: "Nativity Certificate",
    department: "Revenue Department",
    category: "Certificates",

    description:
      "A Nativity Certificate is an official document used to establish the nativity or permanent connection of a person with a particular state or locality for eligible official purposes.",

    icon: "📍",

    eligibility:
      "Residents who need to establish their nativity for education, employment, government schemes or other authorized purposes.",

    applicationMode: "Online / Offline",

    applicationSteps: [
      {
        step: 1,
        title: "Check the Official Service",
        description:
          "Check the relevant official government portal or local revenue authority for the available Nativity Certificate service."
      },
      {
        step: 2,
        title: "Register or Login",
        description:
          "Complete the required registration or login process provided by the official service."
      },
      {
        step: 3,
        title: "Enter Applicant Details",
        description:
          "Provide the applicant's personal details, address information and other required information."
      },
      {
        step: 4,
        title: "Submit Supporting Documents",
        description:
          "Upload or provide the documents required to support the application."
      },
      {
        step: 5,
        title: "Submit the Application",
        description:
          "Review the information carefully and submit the application."
      },
      {
        step: 6,
        title: "Track the Status",
        description:
          "Use the application or acknowledgement number to track the status when the official service provides tracking."
      }
    ],

    requiredDocuments: [
      "Identity proof",
      "Address proof",
      "Residence-related supporting documents",
      "Birth or educational records, if requested",
      "Other documents requested by the issuing authority"
    ],

    officialSource: {
      name: "Tamil Nadu Government",
      url: "https://www.tn.gov.in/",
      description:
        "Use the official Tamil Nadu Government website for information about government departments and services."
    },

    lastVerified: "23 September 2026"
  },

  {
    id: "community-certificate",
    name: "Community Certificate",
    shortName: "Community Certificate",
    department: "Revenue Department",
    category: "Certificates",

    description:
      "A Community Certificate is an official document used to establish the community or social category of an eligible applicant for authorized government, education and employment purposes.",

    icon: "📋",

    eligibility:
      "Eligible residents who require official community-category documentation for government, education, employment or other authorized purposes.",

    applicationMode: "Online / Offline",

    applicationSteps: [
      {
        step: 1,
        title: "Visit the Official Portal",
        description:
          "Open the relevant official government service portal and locate the Community Certificate service."
      },
      {
        step: 2,
        title: "Register or Login",
        description:
          "Complete the required registration or login process."
      },
      {
        step: 3,
        title: "Enter Applicant Details",
        description:
          "Provide the applicant's personal details, address and other information requested in the application."
      },
      {
        step: 4,
        title: "Provide Supporting Documents",
        description:
          "Upload or submit the documents required by the issuing authority."
      },
      {
        step: 5,
        title: "Submit the Application",
        description:
          "Check all entered information and submit the completed application."
      },
      {
        step: 6,
        title: "Track the Application",
        description:
          "Save the acknowledgement or application number for future reference and status tracking."
      }
    ],

    requiredDocuments: [
      "Identity proof",
      "Address proof",
      "Existing community-related supporting records, if applicable",
      "Parent or family supporting documents, if requested",
      "Other documents requested by the issuing authority"
    ],

    officialSource: {
      name: "Tamil Nadu Government",
      url: "https://www.tn.gov.in/",
      description:
        "Use the official Tamil Nadu Government website for information about departments and public services."
    },

    lastVerified: "23 September 2026"
  }
];

export { governmentServices };
export default governmentServices;