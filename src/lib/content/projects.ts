export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  featured: boolean;
  problem: string;
  approach: string;
  impact: string;
  tech: string[];
  links?: Array<{ label: string; url: string }>;
}

export const projects: Project[] = [
  {
    slug: 'trusted-ai-metrics',
    title: 'Trusted AI Metrics Platform',
    summary: 'Rebuilt ML model monitoring metrics from scratch, enabling drift detection and API exposure for production systems.',
    tags: ['Python', 'ML Ops', 'API', 'Testing'],
    featured: true,
    problem: 'Legacy metrics code was brittle, untested, and blocked integration with model drift detection pipelines. Teams lacked visibility into model health.',
    approach: 'Rewrote the metrics calculation layer with clean abstractions. Added drift detection algorithms. Exposed metrics via REST API. Built comprehensive test coverage.',
    impact: 'Reduced false alerts by 40%. Enabled automated drift monitoring across 12 production models. Test coverage from 0% to 85%.',
    tech: ['Python', 'FastAPI', 'scikit-learn', 'pytest', 'Docker'],
    links: [
      { label: 'Internal Documentation', url: '#' }
    ]
  },
  {
    slug: 'anomaly-detection-api',
    title: 'Anomaly Detection Service',
    summary: 'Designed and built a real-time anomaly detection API for time-series data with configurable sensitivity.',
    tags: ['Python', 'ML', 'API', 'Real-time'],
    featured: true,
    problem: 'Operations teams manually reviewed dashboards for anomalies. Detection was inconsistent and often too late.',
    approach: 'Built a stateless API accepting time-series windows. Implemented multiple detection algorithms (Z-score, Isolation Forest, DBSCAN). Added adaptive thresholds based on historical patterns.',
    impact: 'Automated anomaly detection for 3 critical systems. Mean detection time dropped from hours to seconds.',
    tech: ['Python', 'FastAPI', 'NumPy', 'scikit-learn', 'Redis'],
    links: []
  },
  {
    slug: 'startup-platform',
    title: 'Startup Platform (CTO/Co-founder)',
    summary: 'Led technical architecture and development for an early-stage startup, from MVP to pilot customers and seed funding.',
    tags: ['Architecture', 'Full-stack', 'Leadership', 'Containers'],
    featured: true,
    problem: 'Needed to build and ship a product with limited resources while establishing technical foundations that could scale.',
    approach: 'Chose pragmatic stack (containerized services, managed databases). Built core API and client applications. Established CI/CD early. Balanced speed with maintainability.',
    impact: 'Launched MVP in 4 months. Secured 3 pilot customers. Raised seed funding. Technical architecture supported 10x growth without major rewrites.',
    tech: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Docker', 'AWS'],
    links: []
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjects(): Project[] {
  return projects;
}
