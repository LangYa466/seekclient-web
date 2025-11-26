import { ReactNode } from 'react';

export interface SocialLinkItem {
  name: string;
  url: string;
  icon: ReactNode;
  colorHover: string;
}

export interface Feature {
  title: string;
  description: string;
}