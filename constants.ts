import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Project, Certificate, Achievement, LibraryItem, NavItem, SocialLink } from './types';

// Import assets from src
import oryonAiImage from '/src/Oryon AI Pics.png';
import oryonWebImage from '/src/Oryonwebpics.png';
import portfolioV1Image from '/src/PortfolioV1.png';
import profileImage from '/src/profile.jpg';

export const MOTTO_TEXT: string[] = [
  "DIGITAL CRAFTER",
  "WEB DEVELOPER",
  "UI/UX ENTHUSIAST",
  "CREATIVE CODER",
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Arsenal', href: '#skills' },
  { label: 'Library', href: '#library' }, // Updated Label
];

const PROJECTS: Project[] = [
  {
    id: 1,
    type: 'project',
    title: "Oryon AI",
    category: "Web Application",
    description: "Partner Of Your Rutinities & Friend Of Your Boring.",
    image: oryonAiImage,
    tech: ["React", "Tailwind", "Gemini API"],
    link: "https://oryon-ai-three.vercel.app",
    span: "md:col-span-2"
  },
  {
    id: 2,
    type: 'project',
    title: "Oryon Web",
    category: "Website Creation Services",
    description: "Real-time cryptocurrency tracking dashboard with interactive D3.js charts.",
    image: oryonWebImage,
    tech: ["Next.js"],
    link: "https://oryonweb.com",
    span: "md:col-span-1"
  },
  {
    id: 3,
    type: 'project',
    title: "Sakuku Wallet",
    category: "Web App",
    description: "For manage your wallet.",
    image: "/src/sakukupics.png",
    tech: ["React", "Vite"],
    link: "https://sakuku-wallet.vercel.app/",
    span: "md:col-span-1"
  },
  {
    id: 4,
    type: 'project',
    title: "Portfolio V1",
    category: "Design",
    description: "The first iteration of my personal portfolio focusing on minimal typography.",
    image: portfolioV1Image,
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://hernataportfolio.netlify.app",
    span: "md:col-span-2"
  }
];

const CERTIFICATES: Certificate[] = [
  {
    id: 5,
    type: 'certificate',
    title: 'Belajar Fundamental Front-End Web Development',
    issuer: 'Dicoding',
    description: 'Mastering the fundamentals of front-end web development, including HTML, CSS, JavaScript, and modern frameworks.',
    image: '/src/dicodinglogo.jpg',
    certificateImage: '/src/sertifikat1.png', // Image for the modal
    link: '#', // Add actual link to certificate
    year: 2025,
    span: 'md:col-span-1',
  },
  {
    id: 6,
    type: 'certificate',
    title: 'Photoghapy Mastery',
    issuer: 'LESKOFI',
    description: 'Mastering the art and technique of photography, from composition and lighting to post-processing.',
    image: '/src/logoleskofi.webp', // Placeholder
    certificateImage: '/src/sertifikat2.jpg', // Placeholder for modal
    link: '#',
    year: 2024,
    span: 'md:col-span-1',
  }
];

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 7,
    type: 'achievement',
    title: '1st Place Hackathon',
    award: 'Innovatech 2023',
    description: 'Led a team to victory by developing a novel solution for urban mobility using real-time data analytics.',
    image: portfolioV1Image, // Re-using for placeholder
    year: 2023,
    span: 'md:col-span-2',
  },
];

export const LIBRARY_ITEMS: LibraryItem[] = [...PROJECTS, ...CERTIFICATES, ...ACHIEVEMENTS];


export const SKILLS: string[] = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", 
  "C++", "Python", "JavaScript", "UI/UX", "Figma", 
  "PostgreSQL", "GraphQL", "HTML", "CSS"
];

export const SKILLS_DETAILED = [
  { name: "Frontend Development", level: 95 },
  { name: "UI/UX Design", level: 90 },
  { name: "Backend Architecture", level: 80 },
  { name: "Motion & Animation", level: 100 },
  { name: "Web Developer", level: 80 },
];

export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/hernataramadhan79-bit", label: "Check Code", icon: Github },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/hernata-ramadhan-176b68338", label: "Connect", icon: Linkedin },
  { platform: "Instagram", url: "https://www.instagram.com/heropakentanq15_?igsh=eWJqaW5qMGoxZWVh", label: "Gallery", icon: Instagram },
];