// =============================================================================
// ICON MAPPINGS - Tech and Platform Logo URLs
// =============================================================================
//
// Uses Simple Icons CDN: https://cdn.simpleicons.org/[slug]/[color]
// Terminal green color: 00FF00
// Note: Some icons may need alternative slugs or colors for visibility
//
// =============================================================================

const ICON_COLOR = "00FF00"; // Terminal green
const CDN_BASE = "https://cdn.simpleicons.org";

// Tech Stack Icons
export const techIcons: Record<string, string> = {
  // Frontend
  "React.js": `${CDN_BASE}/react/${ICON_COLOR}`,
  "React": `${CDN_BASE}/react/${ICON_COLOR}`,
  "Tailwind CSS": `${CDN_BASE}/tailwindcss/${ICON_COLOR}`,
  "TailwindCSS": `${CDN_BASE}/tailwindcss/${ICON_COLOR}`,
  "JavaScript": `${CDN_BASE}/javascript/${ICON_COLOR}`,
  "TypeScript": `${CDN_BASE}/typescript/${ICON_COLOR}`,
  "Next.js": `${CDN_BASE}/nextdotjs/${ICON_COLOR}`,
  "HTML": `${CDN_BASE}/html5/${ICON_COLOR}`,
  "CSS": `${CDN_BASE}/css3/${ICON_COLOR}`,

  // Backend
  "Node.js": `${CDN_BASE}/nodedotjs/${ICON_COLOR}`,
  "Express.js": `${CDN_BASE}/express/${ICON_COLOR}`,
  "Python": `${CDN_BASE}/python/${ICON_COLOR}`,
  "Java": `${CDN_BASE}/openjdk/${ICON_COLOR}`,
  "C/C++": `${CDN_BASE}/cplusplus/${ICON_COLOR}`,
  "C++": `${CDN_BASE}/cplusplus/${ICON_COLOR}`,
  "C": `${CDN_BASE}/c/${ICON_COLOR}`,
  "Go": `${CDN_BASE}/go/${ICON_COLOR}`,
  "Rust": `${CDN_BASE}/rust/${ICON_COLOR}`,

  // Databases
  "MongoDB": `${CDN_BASE}/mongodb/${ICON_COLOR}`,
  "SQL": `${CDN_BASE}/mysql/${ICON_COLOR}`,
  "MySQL": `${CDN_BASE}/mysql/${ICON_COLOR}`,
  "PostgreSQL": `${CDN_BASE}/postgresql/${ICON_COLOR}`,
  "Redis": `${CDN_BASE}/redis/${ICON_COLOR}`,

  // Cloud & DevOps
  "AWS": "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  "Docker": `${CDN_BASE}/docker/2496ED`,
  "Terraform": `${CDN_BASE}/terraform/7B42BC`,
  "GitLab CI/CD": `${CDN_BASE}/gitlab/FC6D26`,
  "GitLab": `${CDN_BASE}/gitlab/FC6D26`,
  "Git": `${CDN_BASE}/git/F05032`,
  "GitHub": `${CDN_BASE}/github/${ICON_COLOR}`,
  "Kubernetes": `${CDN_BASE}/kubernetes/326CE5`,
  "Jenkins": `${CDN_BASE}/jenkins/${ICON_COLOR}`,
  "boto3": `${CDN_BASE}/python/3776AB`,

  // Other Tools
  "VS Code": `${CDN_BASE}/visualstudiocode/${ICON_COLOR}`,
  "Linux": `${CDN_BASE}/linux/${ICON_COLOR}`,
  "Nginx": `${CDN_BASE}/nginx/${ICON_COLOR}`,
  "Postman": `${CDN_BASE}/postman/${ICON_COLOR}`,
};

// Competitive Programming Platform Icons (with brand colors)
export const cpPlatformIcons: Record<string, string> = {
  "Codeforces": `${CDN_BASE}/codeforces/1F8ACB`, // Codeforces blue
  "LeetCode": `${CDN_BASE}/leetcode/FFA116`, // LeetCode orange
  "CodeChef": `${CDN_BASE}/codechef/5B4638`, // CodeChef brown
  "HackerRank": `${CDN_BASE}/hackerrank/00EA64`, // HackerRank green
  "GeeksforGeeks": `${CDN_BASE}/geeksforgeeks/2F8D46`, // GFG green
  "AtCoder": `${CDN_BASE}/atcoder/${ICON_COLOR}`,
};

// Social/Contact Icons
export const socialIcons = {
  github: `${CDN_BASE}/github/${ICON_COLOR}`,
  linkedin: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  email: `${CDN_BASE}/gmail/EA4335`,
  twitter: `${CDN_BASE}/x/${ICON_COLOR}`,
  portfolio: `${CDN_BASE}/aboutdotme/${ICON_COLOR}`,
};

// Helper function to get tech icon URL
export function getTechIcon(techName: string): string | undefined {
  return techIcons[techName];
}

// Helper function to get CP platform icon URL
export function getCpPlatformIcon(platformName: string): string | undefined {
  return cpPlatformIcons[platformName];
}

// Helper function to get social icon URL
export function getSocialIcon(platform: keyof typeof socialIcons): string {
  return socialIcons[platform];
}
