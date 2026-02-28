// =============================================================================
// PORTFOLIO DATA - Edit this file to customize your portfolio
// =============================================================================
//
// All portfolio content is centralized here. Update the values below with your
// own information. Fields marked with [PLACEHOLDER] should be replaced.
//
// IMPORTANT: Do NOT modify component files directly. All customization should
// be done through this data file.
// =============================================================================

// -----------------------------------------------------------------------------
// Type Definitions
// -----------------------------------------------------------------------------

export interface HeroData {
  /** Your full name */
  name: string;
  /** Your professional title / role */
  role: string;
  /** A short tagline or bio (1-2 sentences) */
  tagline: string;
}

export interface CpStat {
  /** Platform name (e.g., "Codeforces", "LeetCode", "CodeChef") */
  platform: string;
  /** Your current rating on the platform */
  rating: string;
  /** Number of problems solved */
  solved: string;
  /** Your rank or tier (e.g., "Expert", "Knight", "5-star") */
  rank: string;
}

export interface DsaSkillCategory {
  /** Category name (e.g., "Graph Algorithms", "Dynamic Programming") */
  category: string;
  /** List of specific skills within this category */
  skills: string[];
}

export interface Experience {
  /** Company or organization name */
  company: string;
  /** Your job title */
  role: string;
  /** Employment period (e.g., "Jan 2023 - Present") */
  duration: string;
  /** Brief description of your responsibilities and achievements */
  description: string[];
  /** Technologies used in this role */
  technologies: string[];
  /** Work location (e.g., "Pune, India" or "Remote") */
  location?: string;
  /** Employment type (e.g., "Full-time", "Internship", "Contract") */
  employmentType?: string;
}

export interface TechStack {
  /** Frontend frameworks and libraries */
  frontend: string[];
  /** Backend frameworks and languages */
  backend: string[];
  /** Databases and data stores */
  databases: string[];
  /** DevOps, tools, and other technologies */
  tools: string[];
}

export interface ContactInfo {
  /** Your contact email address */
  email: string;
  /** GitHub profile URL */
  github: string;
  /** LinkedIn profile URL */
  linkedin: string;
}

export interface PortfolioData {
  hero: HeroData;
  cpStats: CpStat[];
  dsaSkills: DsaSkillCategory[];
  experience: Experience[];
  techStack: TechStack;
  contact: ContactInfo;
}

// -----------------------------------------------------------------------------
// Portfolio Data - Replace [PLACEHOLDER] values with your own
// -----------------------------------------------------------------------------

export const portfolioData: PortfolioData = {
  // ---------------------------------------------------------------------------
  // Hero Section
  // Displayed at the top of the page as the main introduction.
  // ---------------------------------------------------------------------------
  hero: {
    name: "Anurag Mundada",
    role: "Software Developer @ Siemens",
    tagline: "Building scalable cloud solutions and solving complex algorithmic problems. AWS Certified | 1000+ DSA problems solved",
  },

  // ---------------------------------------------------------------------------
  // Competitive Programming Stats
  // Shown in the CP Stats section. Add or remove entries as needed.
  // Set to an empty array [] if you don't do competitive programming.
  // ---------------------------------------------------------------------------
  cpStats: [
    {
      platform: "Codeforces",
      rating: "1440",
      solved: "500+",
      rank: "Specialist",
    },
    {
      platform: "LeetCode",
      rating: "1800+",
      solved: "1000+",
      rank: "Knight",
    },
    {
      platform: "CodeChef",
      rating: "1828",
      solved: "300+",
      rank: "4-star",
    },
  ],

  // ---------------------------------------------------------------------------
  // DSA Skills
  // Grouped by category. Add or remove categories and skills as needed.
  // Set to an empty array [] if you prefer not to list these.
  // ---------------------------------------------------------------------------
  dsaSkills: [
    {
      category: "Graph Algorithms",
      skills: ["DFS/BFS", "Shortest Path", "MST", "Topological Sort"],
    },
    {
      category: "Dynamic Programming",
      skills: ["DP on Trees", "Knapsack", "LIS/LCS", "Bitmask DP"],
    },
    {
      category: "Data Structures",
      skills: ["Segment Trees", "Binary Search", "Heaps", "Tries"],
    },
    {
      category: "Core Concepts",
      skills: ["OOP", "DBMS", "Operating Systems", "Computer Networks"],
    },
  ],

  // ---------------------------------------------------------------------------
  // Work Experience
  // Listed in reverse chronological order (most recent first).
  // Add or remove entries as needed.
  // ---------------------------------------------------------------------------
  experience: [
    {
      company: "Siemens Digital Industries Software",
      role: "Software Developer",
      duration: "Jul 2025 - Present",
      location: "Pune, India",
      employmentType: "Full-time",
      description: [
        "Engineered AWS SSO automation for multi-account environments by refactoring assignment logic and enforcing validation across sandbox and production setups",
        "Standardized AWS account onboarding using Account Factory for Terraform (AFT), enabling scalable tagging, cost categorization, and deployment workflows",
        "Extended an internal AI chatbot used by platform teams with account-aware inputs and stateful threading to streamline AWS SSO operations",
        "Orchestrated ingestion of non CUR AWS resource costs, surfacing indirectly billed resources to improve FinOps governance and cost accountability",
      ],
      technologies: ["AWS", "Terraform", "Python", "boto3", "GitLab CI/CD"],
    },
    {
      company: "Siemens Digital Industries Software",
      role: "Software Developer Intern",
      duration: "Jun 2024 - Jul 2024 | Jan 2025 - Apr 2025",
      location: "Pune, India",
      employmentType: "Internship",
      description: [
        "Validated OIDC IDP, SSO authentication flows for Mendix applications, ensuring secure identity federation",
        "Developed Power Automate workflows to track expiring subscriptions and automatically notify stakeholders, reducing manual follow-ups and service disruptions",
        "Automated AWS SSO sandbox onboarding with validated admin provisioning for all users types",
      ],
      technologies: ["AWS SSO", "OIDC", "Power Automate", "Python"],
    },
  ],

  // ---------------------------------------------------------------------------
  // Tech Stack
  // Organized by category. Add or remove items in each array as needed.
  // ---------------------------------------------------------------------------
  techStack: {
    frontend: ["React.js", "Tailwind CSS", "JavaScript"],
    backend: ["Node.js", "Express.js", "Python", "Java", "C/C++"],
    databases: ["MongoDB", "SQL"],
    tools: ["AWS", "Docker", "Terraform", "GitLab CI/CD", "Git", "boto3"],
  },

  // ---------------------------------------------------------------------------
  // Contact Information
  // Used in the contact section and footer.
  // ---------------------------------------------------------------------------
  contact: {
    email: "anuragmundada46@gmail.com",
    github: "https://github.com/anurag46-code",
    linkedin: "https://www.linkedin.com/in/anuragmundada06/",
  },
};
