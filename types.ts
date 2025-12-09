import { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  type: 'project'; // Added to distinguish item type
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  span: string; 
}

export interface Certificate {
  id: number;
  type: 'certificate';
  title: string;
  issuer: string;
  description: string;
  image: string;
  certificateImage?: string; // This will hold the URL for the popup image
  link: string;
  year: number;
  span: string;
}

export interface Achievement {
  id: number;
  type: 'achievement';
  title: string;
  award: string;
  description: string;
  image: string;
  year: number;
  span: string;
}

export type LibraryItem = Project | Certificate | Achievement;

export interface Skill {
  name: string;
  icon?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon: LucideIcon;
}