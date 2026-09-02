
export interface Service {
  id: number;
  title: string;
  description: string[];
  longDescription: string[];
  icon: string;
  subServices?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CareerOffer {
  id: number;
  title: string;
  type: string;
  location: string;
  description: string;
  tasks: string[];
  benefits: string[];
  profile: string[];
}
