export const METADATA = {
  author: "Hrithik Shetty",
  title: "Portfolio | Hrithik Shetty",
  description:
    "Myself a passionate Frontend Developer, Backend Developer, Competitive Programmer dedicated to crafting aesthetic and modern apps that captivate and engage users.",
  siteUrl: "hrithikshetty.vercel.app",
  twitterHandle: "@hrithik_shetty",
  keywords: [
    "Hrithik Shetty",
    "Frontend Engineer",
    "React Native Developer",
    "Software Engineer",
    "Portfolio",
    "Devfolio",
    "Folio",
  ].join(", "),
  image:
    "",
  language: "English",
  themeColor: "#000000",
};

export const MENULINKS = [
  {
    name: "Home",
    ref: "home",
  },
  {
    name: "Education",
    ref: "education",
  },
  {
    name: "Skills",
    ref: "skills",
  },
  {
    name: "Projects",
    ref: "projects",
  },
  {
    name: "Gallery",
    ref: "gallery",
  },
  // {
  //   name: "Work",
  //   ref: "work",
  // },
  {
    name: "Contact",
    ref: "contact",
  },
];

export const GALLERY_META = {
  title: "My Gallery",
  headline: "Life in frames",
  tagline:
    "Photos, achievements, and random memories — the human side behind the code.",
  pageDescription:
    "A curated wall of moments, wins, and chaos worth keeping forever.",
};

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "photos", label: "Photos" },
  { id: "achievements", label: "Achievements" },
  { id: "memories", label: "Memories" },
];

/** Add images under public/gallery — paths below must match your files */
export const GALLERY_ITEMS = [
  {
    id: "p1",
    category: "photos",
    src: "/gallery/photos/01.jpg",
    title: "Moment one",
    caption: "Replace with your photo — public/gallery/photos/01.jpg",
  },
  {
    id: "p2",
    category: "photos",
    src: "/gallery/photos/02.jpg",
    title: "Moment two",
    caption: "A frame from the story you're building.",
  },
  {
    id: "p3",
    category: "photos",
    src: "/gallery/photos/03.jpg",
    title: "Moment three",
    caption: "Drop 02.jpg, 03.jpg in public/gallery/photos/",
  },
  {
    id: "a1",
    category: "achievements",
    src: "/gallery/achievements/01.jpg",
    title: "Achievement",
    caption: "Certs, awards, hackathons — public/gallery/achievements/01.jpg",
  },
  {
    id: "a2",
    category: "achievements",
    src: "/gallery/achievements/02.jpg",
    title: "Another win",
    caption: "Proof that late nights sometimes pay off.",
  },
  {
    id: "m1",
    category: "memories",
    src: "/gallery/memories/01.jpg",
    title: "Core memory",
    caption: "Trips, people, inside jokes — public/gallery/memories/01.jpg",
  },
  {
    id: "m2",
    category: "memories",
    src: "/gallery/memories/02.jpg",
    title: "Random favorite",
    caption: "The stuff that doesn't fit a folder but still matters.",
  },
  {
    id: "m3",
    category: "memories",
    src: "/gallery/memories/03.jpg",
    title: "Still here",
    caption: "More memories coming soon.",
  },
];

export const TYPED_STRINGS = [
  "A Frontend Developer",
  "A systematic Backend Developer",
  "I build things for the web",
  "I create aesthetic and modern apps",
  "A competitive programmer"
];

export const SOCIAL_LINKS = [
  {
    name: "mail",
    url: "mailto: hrithikshetty44@gmail.com",
  },
  {
    name: "linkedin",
    url: "https://linkedin.com/in/hrithik-j-shetty-80a989220/",
  },
  {
    name: "github",
    url: "https://github.com/Hrithikshetty/",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/_hrithik__shetty_",
  },
  {
    name: "twitter",
    url: "https://twitter.com/hrithikshetty44",
  },
];

export const SKILLS = {
  languagesAndTools: [
    "html",
    "css",
    "javascript",
    "typescript",
    "nodejs",
    "vite",
    "firebase",
    "figma",
    "cpp",
    "c",
    "python",


  ],
  librariesAndFrameworks: [
    "react",
    "redux",
    "nextjs",
    "tailwindcss",
    "chakra-ui",
    "bootstrap",

  ],
  databases: ["mysql", "mongodb"],
  other: ["git","vscode","docker","twilio"],
};

export const PROJECTS = [
  {
    name: "Sahara",
    image: "/projects/sahara.png",
    blurImage: "/projects/blur/sahara-blur.png",
    description: "A Disaster Management with Web and MobileApplication Using NextJS + Tailwind CSS",
    gradient: ["#F14658", "#DC2537"],
    url: "https://github.com/Hrithikshetty/SAHARA/",
    tech: ["flutter", "nextjs", "flask","twilio","mongodb"],
  },
  {
    name: "job-hai",
    image: "/projects/jobsco.png",
    blurImage: "/projects/blur/jobsco-blur.png",
    description: "Job Application and Recruting Portal using NextJS + Tailwind CSS ✍🏻",
    gradient: ["#FFA62E", "#EA4D2C"],
    url: "https://github.com/Hrithikshetty/JOBSCO/",
    tech: ["react", "nextjs", "tailwindcss", "mongodb"],
  },
  {
    name: "Secret Pixels",
    image: "/projects/secret-pixels.png",
    blurImage: "/projects/blur/secret-pixels.png",
    description:
      "System That Employs AI Services and Steganography Techniques to Secure Sensitive Information Within Digital Images,",
    gradient: ["#000066", "#6699FF"],
    url: "https://github.com/Hrithikshetty/Secret-Pixels/",
    tech: ["react", "nextjs", "flask", "openai","python"],
  },
  {
    name: "Auto-Fis",
    image: "/projects/auto-fis.png",
    blurImage: "/projects/blur/autofis-blur.png",
    description: "An ML Web Application to Accurately Identify Fish Spicies from Imagery.",
    gradient: ["#142D46", "#2E4964"],
    url: "https://github.com/Hrithikshetty/Marine_Classification/",
    tech: ["nextjs","python", "flask","tailwindcss","nodejs"],
  }
];

export const WORK_CONTENTS = {
  DUKAAN: [
    {
      title: "Dukaan",
      description:
        "Dukaan is a platform that enables businesses to launch their online stores at ease.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Revolutionizing commerce, one click at a time
        </div>
      ),
    },
    {
      title: "Transformation",
      description:
        "Since 2023, the Dukaan Seller Dashboard struggled with technical issues and a broken user experience due to accumulated technical debt. Leading a team of two junior developers, we migrated the dashboard from CSR to SSR, redesigned the UI, and overhauled the codebase in the process. This resolved the technical debt and vastly improved the user experience, making it Dukaan's largest and most impactful migration.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Senior Frontend Engineer
        </div>
      ),
    },
    {
      title: "Evolution",
      description:
        "Recognizing the need for improved performance and user engagement, I spearheaded the migration of the Dukaan App from native to React-Native for iOS and Android platforms. This strategic move led to a X% enhancement in app performance and a Y% boost in user engagement, representing a significant milestone in the app's evolution.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Frontend Engineer
        </div>
      ),
    },
    {
      title: "Optimization",
      description:
        "Leveraging user feedback and analytics, I improved the seller web dashboard design, reducing bounce rates. Simultaneously, I overhauled the build process, slashing bundle size and boosting overall performance.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Frontend Engineer Intern
        </div>
      ),
    },
  ],
  INTERNSHIP : [
    {
      title: "DSC",
      description:
        "Aviate is a preparation and mentorship platform for job-seekers that are seeking non-technical roles across top companies",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">

        </div>
      ),
      
    },
    {
      title: "Devtown",
      description:
        "I spearheaded the development of Q-Rate, their flagship product, a voice-based applicant screening platform. Moreover, I took initiatives to enhance user engagement and drive substantial increases in daily traffic. Additionally, I implemented an error-logging and bug reporting system, significantly diminishing user-reported bugs.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Frontend Developer Intern
        </div>
      ),
    },
  ],
  SPACENOS: [
    {
      title: "DSI",
      description:
        "A dynamic startup dedicated to creating innovative products that make the world a better place.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
           build a e-commerce web application in which user can purchase products
        </div>
      ),
      href:""
    },
    {
      title: "DevTown",
      description:
        " Implemented cutting-edge technologies like React.js and Redux Toolkit, applying them in practical projects. Acquired firsthand experience in professional web development, gaining insights into real-world project workflows.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Web Developer Intern
        </div>
      ),
      href:""
    },
  ],
};

export const GTAG = "G-K4M09RT4DT";




