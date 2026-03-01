// =============================================================================
// TECH STACK DATA - Skills with proficiency levels
// =============================================================================

export type SkillLevel = "expert" | "proficient" | "familiar";

export interface TechSkill {
  name: string;
  category: string;
  level: SkillLevel;
  years?: string; // e.g., "3y", "2y"
  icon?: string; // Simple Icons slug
  color?: string; // Hex color for icon
  projects?: string[]; // Notable projects using this technology
}

export const techSkills: TechSkill[] = [
  // Programming Languages
  {
    name: "C++",
    category: "Language",
    level: "expert",
    years: "4y",
    icon: "cplusplus",
    color: "00599C",
    projects: ["Competitive Programming", "System Design", "Game Development"],
  },
  {
    name: "Python",
    category: "Language",
    level: "expert",
    years: "3y",
    icon: "python",
    color: "3776AB",
    projects: ["Data Analysis", "Automation Scripts", "ML Experiments"],
  },
  {
    name: "JavaScript",
    category: "Language",
    level: "proficient",
    years: "2y",
    icon: "javascript",
    color: "F7DF1E",
    projects: ["Web Frontend", "Interactive UX", "Browser APIs"],
  },
  {
    name: "Java",
    category: "Language",
    level: "proficient",
    years: "2y",
    icon: "openjdk",
    color: "007396",
    projects: ["Enterprise Apps", "Android Dev", "Backend Services"],
  },

  // Frontend
  {
    name: "React",
    category: "Frontend",
    level: "proficient",
    years: "2y",
    icon: "react",
    color: "61DAFB",
    projects: ["Interactive Dashboards", "Component Libraries", "SPA Development"],
  },
  {
    name: "Next.js",
    category: "Frontend",
    level: "proficient",
    years: "1y",
    icon: "nextdotjs",
    color: "FFFFFF",
    projects: ["Server-side Rendering", "Portfolio Site", "API Routes"],
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: "proficient",
    years: "2y",
    icon: "tailwindcss",
    color: "06B6D4",
    projects: ["Responsive Design", "Theme Systems", "Utility-first Styling"],
  },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
    level: "proficient",
    years: "2y",
    icon: "nodedotjs",
    color: "339933",
    projects: ["REST APIs", "Real-time Services", "Backend Infrastructure"],
  },
  {
    name: "Express.js",
    category: "Backend",
    level: "proficient",
    years: "2y",
    icon: "express",
    color: "FFFFFF",
    projects: ["Web Servers", "API Endpoints", "Middleware Systems"],
  },

  // Databases
  {
    name: "MongoDB",
    category: "Database",
    level: "proficient",
    years: "2y",
    icon: "mongodb",
    color: "47A248",
    projects: ["NoSQL Design", "Document Storage", "Scalable Queries"],
  },
  {
    name: "PostgreSQL",
    category: "Database",
    level: "proficient",
    years: "1y",
    icon: "postgresql",
    color: "4169E1",
    projects: ["Relational Schemas", "Advanced Queries", "ACID Transactions"],
  },
  {
    name: "SQL",
    category: "Database",
    level: "proficient",
    years: "3y",
    icon: "mysql",
    color: "4479A1",
    projects: ["Data Modeling", "Query Optimization", "Database Design"],
  },

  // Cloud & DevOps
  {
    name: "AWS",
    category: "Cloud",
    level: "proficient",
    years: "2y",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    color: undefined, // Using full URL, no color needed
    projects: ["EC2 Instances", "S3 Storage", "Lambda Functions"],
  },
  {
    name: "Docker",
    category: "DevOps",
    level: "proficient",
    years: "2y",
    icon: "docker",
    color: "2496ED",
    projects: ["Containerization", "Multi-stage Builds", "Docker Compose"],
  },
  {
    name: "Terraform",
    category: "DevOps",
    level: "proficient",
    years: "1y",
    icon: "terraform",
    color: "7B42BC",
    projects: ["Infrastructure as Code", "Resource Management", "Cloud Provisioning"],
  },
  {
    name: "Kubernetes",
    category: "DevOps",
    level: "familiar",
    years: "1y",
    icon: "kubernetes",
    color: "326CE5",
    projects: ["Orchestration", "Deployment Automation", "Service Management"],
  },
  {
    name: "Git",
    category: "Tools",
    level: "expert",
    years: "4y",
    icon: "git",
    color: "F05032",
    projects: ["Version Control", "Branching Strategies", "Collaboration"],
  },
  {
    name: "GitLab CI/CD",
    category: "DevOps",
    level: "proficient",
    years: "2y",
    icon: "gitlab",
    color: "FC6D26",
    projects: ["Pipeline Automation", "Continuous Integration", "Release Management"],
  },

  // AI/ML Frameworks
  {
    name: "LangGraph",
    category: "AI/ML",
    level: "proficient",
    years: "1y",
    icon: "langchain",
    color: "1C3C3C",
    projects: ["Agent Workflows", "LLM Applications", "Multi-Actor Systems"],
  },
  {
    name: "Strands",
    category: "AI/ML",
    level: "familiar",
    years: "1y",
    icon: "python",
    color: "3776AB",
    projects: ["Data Processing", "AI Pipelines"],
  },
];

// Skill level metadata
export const skillLevels = {
  expert: {
    label: "Expert",
    color: "#00FF00", // Green
    description: "Advanced proficiency with extensive experience",
  },
  proficient: {
    label: "Proficient",
    color: "#00BFFF", // Blue
    description: "Strong working knowledge and practical experience",
  },
  familiar: {
    label: "Familiar",
    color: "#FFA500", // Orange
    description: "Basic understanding and some hands-on experience",
  },
} as const;
