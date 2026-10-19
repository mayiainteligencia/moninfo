export type Status = 'live' | 'roadmap';

export const statusLabel: Record<Status, string> = {
  live: 'Operativo',
  roadmap: 'En despliegue',
};

export interface Capability {
  id: string;
  title: string;
  description: string;
  status: Status;
  icon: string;
}

export interface Faq {
  q: string;
  a: string;
}
