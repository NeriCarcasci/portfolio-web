export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface AboutContent {
  name: string;
  role: string;
  summary: string;
  bio: string;
  timeline: TimelineEntry[];
  skills: string[];
  email: string;
  github: string;
  linkedin: string;
  cvUrl: string;
}

export const about: AboutContent = {
  name: 'Neri Carcasci',
  role: 'AI/ML Engineer',
  summary: 'I build production ML systems and scalable APIs. I care about clean code, reliable infrastructure, and shipping things that work.',
  bio: `Engineer with experience across ML ops, backend development, and technical leadership.
I've rebuilt ML metrics platforms, designed anomaly detection services, and led a startup from MVP to funding.
I focus on practical solutions: code that's tested, systems that scale, and documentation that helps.`,
  timeline: [
    {
      year: '2024',
      title: 'AI/ML Engineer Intern',
      description: 'Trusted AI team. Rebuilt metrics platform, added drift detection, exposed APIs.'
    },
    {
      year: '2023',
      title: 'CTO & Co-founder',
      description: 'Led technical development for early-stage startup. Built platform, secured pilots and funding.'
    },
    {
      year: '2022',
      title: 'Software Engineer',
      description: 'Backend development. API design, database optimization, CI/CD pipelines.'
    }
  ],
  skills: [
    'Python, TypeScript, Go',
    'FastAPI, Node.js, React',
    'PostgreSQL, Redis, Docker',
    'ML Ops, Model Monitoring',
    'System Design, API Development'
  ],
  email: 'hello@example.com',
  github: 'https://github.com/NeriCarcasci',
  linkedin: 'https://www.linkedin.com/in/neri-carcasci/',
  cvUrl: '/cv.pdf'
};
