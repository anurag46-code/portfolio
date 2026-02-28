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
  },
  {
    name: "Python",
    category: "Language",
    level: "expert",
    years: "3y",
    icon: "python",
    color: "3776AB",
  },
  {
    name: "JavaScript",
    category: "Language",
    level: "proficient",
    years: "2y",
    icon: "javascript",
    color: "F7DF1E",
  },
  {
    name: "Java",
    category: "Language",
    level: "proficient",
    years: "2y",
    icon: "openjdk",
    color: "007396",
  },

  // Frontend
  {
    name: "React",
    category: "Frontend",
    level: "proficient",
    years: "2y",
    icon: "react",
    color: "61DAFB",
  },
  {
    name: "Next.js",
    category: "Frontend",
    level: "proficient",
    years: "1y",
    icon: "nextdotjs",
    color: "FFFFFF",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: "proficient",
    years: "2y",
    icon: "tailwindcss",
    color: "06B6D4",
  },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
    level: "proficient",
    years: "2y",
    icon: "nodedotjs",
    color: "339933",
  },
  {
    name: "Express.js",
    category: "Backend",
    level: "proficient",
    years: "2y",
    icon: "express",
    color: "FFFFFF",
  },

  // Databases
  {
    name: "MongoDB",
    category: "Database",
    level: "proficient",
    years: "2y",
    icon: "mongodb",
    color: "47A248",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    level: "proficient",
    years: "1y",
    icon: "postgresql",
    color: "4169E1",
  },
  {
    name: "SQL",
    category: "Database",
    level: "proficient",
    years: "3y",
    icon: "mysql",
    color: "4479A1",
  },

  // Cloud & DevOps
  {
    name: "AWS",
    category: "Cloud",
    level: "proficient",
    years: "2y",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    color: undefined, // Using full URL, no color needed
  },
  {
    name: "Docker",
    category: "DevOps",
    level: "proficient",
    years: "2y",
    icon: "docker",
    color: "2496ED",
  },
  {
    name: "Terraform",
    category: "DevOps",
    level: "proficient",
    years: "1y",
    icon: "terraform",
    color: "7B42BC",
  },
  {
    name: "Kubernetes",
    category: "DevOps",
    level: "familiar",
    years: "1y",
    icon: "kubernetes",
    color: "326CE5",
  },
  {
    name: "Git",
    category: "Tools",
    level: "expert",
    years: "4y",
    icon: "git",
    color: "F05032",
  },
  {
    name: "GitLab CI/CD",
    category: "DevOps",
    level: "proficient",
    years: "2y",
    icon: "gitlab",
    color: "FC6D26",
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
