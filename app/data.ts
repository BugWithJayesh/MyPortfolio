import {
  Braces,
  BrainCircuit,
  Code2,
  Dumbbell,
  GitBranch,
  Globe2,
  type LucideIcon,
  Trophy,
} from "lucide-react";

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const currentSkills = [
  {
    name: "C++",
    description: "Building a strong foundation in programming and problem-solving.",
    icon: Code2,
  },
] satisfies Array<{ name: string; description: string; icon: LucideIcon }>;

export const learningSkills = [
  { name: "Java", icon: Braces },
  { name: "Data Structures & Algorithms", icon: BrainCircuit },
  { name: "Git & GitHub", icon: GitBranch },
  { name: "Web Development", icon: Globe2 },
] satisfies Array<{ name: string; icon: LucideIcon }>;

export const journey = [
  {
    year: "2024",
    title: "Started Computer Science",
    description:
      "Began a Bachelor of Technology in Computer Science at MIT College, with an expected graduation in 2028.",
  },
  {
    year: "Now",
    title: "Strengthening the foundations",
    description:
      "Learning Java, data structures, Git, GitHub, and web development while practicing consistently.",
  },
  {
    year: "Next",
    title: "Building for the real world",
    description:
      "Focused on turning new skills into useful projects and earning a software development internship.",
  },
] as const;

export const projects = [
  { number: "01", focus: "Web development" },
  { number: "02", focus: "Problem solving" },
  { number: "03", focus: "Learning in public" },
] as const;

export const interests = [
  { name: "Web Development", icon: Globe2 },
  { name: "Artificial Intelligence", icon: BrainCircuit },
  { name: "Fitness", icon: Dumbbell },
  { name: "Football & Badminton", icon: Trophy },
] satisfies Array<{ name: string; icon: LucideIcon }>;
