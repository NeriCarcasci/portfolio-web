<script lang="ts">
  import SeoHead from '$components/SeoHead.svelte';
  import { about } from '$content/about';
  import { BASE_URL } from '$lib/config';

  const pageKeywords = [
    'Software Engineer',
    'AI Engineer',
    'Machine Learning',
    'Systems Engineering',
    'Production ML',
    'Graph Neural Networks',
    'Explainable AI',
    'Startup CTO',
    'Technical Leadership'
  ];

  const profileSchema = {
    '@type': 'ProfilePage',
    name: `About ${about.name}`,
    url: `${BASE_URL}/about`,
    description: about.summary
  };

  // Engineering principles
  const principles = [
    {
      title: 'Reliability over novelty',
      desc: 'Systems should work consistently under expected conditions.'
    },
    {
      title: 'Testability is non-negotiable',
      desc: 'If it can\'t be tested, it can\'t be trusted in production.'
    },
    {
      title: 'Clarity over cleverness',
      desc: 'Code is read more than written. Make it obvious.'
    },
    {
      title: 'Production realism',
      desc: 'Build for how systems actually behave, not how they should behave.'
    },
    {
      title: 'Traceability matters',
      desc: 'Especially in AI systems—if reasoning can\'t be explained, it can\'t be used.'
    },
    {
      title: 'Long-term maintainability',
      desc: 'Choose boring technology. Future you will be grateful.'
    }
  ];

  // Timeline experiences - chronological order
  const timeline = [
    {
      year: '2019',
      role: 'Co-Founder',
      company: 'SnapStudy',
      duration: '~1 year',
      description: 'Developed an AI-powered EdTech mobile application, successfully launching it on both the App Store and Google Play. Played a key role in the platform\'s growth before transitioning out after the company\'s acquisition.',
      tags: ['Startups', 'Mobile', 'AI/ML', 'EdTech']
    },
    {
      year: '2021–2025',
      role: 'CTO & Co-Founder',
      company: 'Frensei',
      duration: '4 years',
      description: 'Led product design, development, and go-to-market for an AI planning intelligence platform recognized with multiple national and international awards (LaunchBox, New Frontiers, ISEF). Secured $50k+ in funding and $500k+ in signed pilots. Built a production system used by planning professionals across Ireland and beyond, with enterprise pilots across multiple continents.',
      tags: ['Enterprise', 'Leadership', 'AI/ML', 'Systems Architecture', 'Go-to-Market'],
      highlight: true
    },
    {
      year: '2022–2026',
      role: 'BSc (Hons) Computing with ML & AI',
      company: 'TU Dublin',
      duration: 'Sept 2022 – Aug 2026 (in progress)',
      description: 'Pursuing specialized degree in machine learning and artificial intelligence. Graduate thesis focuses on explainable Graph Neural Networks for financial crime detection, evaluating multiple explainability methods (SHAP, LIME, GNNExplainer, Counterfactual-GNN) on real-world cryptocurrency transaction datasets.',
      tags: ['Education', 'GNNs', 'Explainability', 'Research'],
      gpa: '3.7'
    },
    {
      year: '2023',
      role: 'Cybersecurity Consultant',
      company: 'Ernst & Young',
      duration: 'May–Aug 2023 (Internship)',
      description: 'Gained practical experience in penetration testing, cyber campaign management, and client engagement. Contributed to innovation initiatives including the EY Sustainability Challenge and Open Science AI/ML competitions.',
      tags: ['Security', 'Consulting', 'Penetration Testing']
    },
    {
      year: '2023–2024',
      role: 'Applied Maths & Computer Science Teacher',
      company: 'Educating Éire',
      duration: 'May 2023 – June 2024 (1 year)',
      description: 'Taught senior cycle students in Applied Maths and Computer Science. Built on 2,000+ hours of freelance tutoring experience across secondary, undergraduate, and professional levels, helping learners develop systems thinking and problem decomposition skills.',
      tags: ['Education', 'Mentoring', 'Teaching'],
      note: 'Continued concurrent with Frensei'
    },
    {
      year: '2024–2025',
      role: 'AI & ML Engineer',
      company: 'Red Hat Trusted AI',
      duration: 'Jan–Aug 2025 (Internship, 9 months)',
      description: 'Spearheaded Python rewrite and API exposure of core NLP evaluation metrics (BLEU, ROUGE, Levenshtein). Architected robust test infrastructure with dependency injection for service endpoints. Redesigned and reimplemented drift detection metrics including Jensen-Shannon divergence. Led educational outreach with robotics and Python workshops.',
      tags: ['Enterprise ML', 'Python', 'API Design', 'Testing', 'Open Source'],
      highlight: true
    }
  ];

  // Achievements - notable recognitions
  const achievements = [
    {
      year: '2024',
      title: 'ISEF Finalist & Podium',
      description: '2-time ISEF finalist with podium placement in 2024, winning $5,000 in recognition of outstanding achievement',
      org: 'ISEF'
    },
    {
      year: '2023',
      title: 'Huawei Seeds for the Future',
      description: 'Selected for Huawei\'s global leadership development programme',
      org: 'Huawei'
    },
    {
      year: '2022',
      title: 'Venture Lab GrowthHub Pre-Accelerator',
      description: 'Accepted into pre-accelerator programme for early-stage founders',
      org: 'Venture Lab'
    },
    {
      year: '2021–2025',
      title: 'Enterprise Ireland New Frontiers',
      description: 'Phase 2 backing and funding for Frensei through Enterprise Ireland\'s New Frontiers programme',
      org: 'Enterprise Ireland'
    }
  ];

  // Logos configuration
  const recognitions = [
    { name: 'Red Hat', img: '/about/redhat.svg', alt: 'Red Hat' },
    { name: 'TU Dublin', img: '/about/tudublin.jpg', alt: 'TU Dublin' },
    { name: 'Enterprise Ireland', img: '/about/newfrontiers.jpg', alt: 'Enterprise Ireland New Frontiers' },
    { name: 'ISEF', img: '/about/isef.png', alt: 'ISEF' }
  ];
</script>

<SeoHead
  title={`About - ${about.name}`}
  description={about.summary}
  canonical="/about"
  keywords={pageKeywords}
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' }
  ]}
  jsonLd={profileSchema}
/>

<div class="container-main">
  <!-- Page Header -->
  <header class="mb-16 max-w-3xl">
    <h1 class="text-4xl md:text-5xl font-semibold mb-6 text-white">Who I Am</h1>
    <p class="text-xl text-neutral-300 leading-relaxed">
      Software & AI Engineer focused on building systems that solve real problems.
    </p>
  </header>

  <div class="max-w-4xl space-y-20">
    
    <!-- Intro Section -->
    <section class="space-y-6">
      <div class="embedded-panel space-y-4">
        <p class="text-lg leading-relaxed text-neutral-200">
          I build production systems at the intersection of software engineering and machine learning. My work spans 
          enterprise ML infrastructure, regulated decision-support platforms, and applied research in explainable AI.
        </p>
        <p class="text-lg leading-relaxed text-neutral-200">
          My background combines hands-on engineering with systems thinking—whether that's rebuilding metrics 
          platforms for model governance, architecting AI systems for regulated planning environments, or 
          developing explainability frameworks for graph neural networks in financial crime detection.
        </p>
        <p class="text-lg leading-relaxed text-neutral-200">
          I approach engineering pragmatically: systems should be reliable, testable, and maintainable. 
          AI should be traceable and explainable. Code should be clear. Production matters more than polish in prototypes.
        </p>
      </div>
    </section>

    <!-- Experience & Trajectory -->
    <section class="space-y-10">
      <h2 class="text-3xl font-semibold text-white">Timeline & Experience</h2>
      
      <div class="space-y-6">
        {#each timeline as exp, index}
          <div class="relative pl-6 border-l-2 {exp.highlight ? 'border-emerald-500/50' : 'border-neutral-700'} hover:border-emerald-500/30 transition-colors">
            <!-- Year badge -->
            <div class="absolute -left-4 top-0 w-6 h-6 rounded-full {exp.highlight ? 'bg-emerald-500/30 border-2 border-emerald-400' : 'bg-neutral-700 border-2 border-neutral-600'} flex items-center justify-center">
              <div class="w-2 h-2 rounded-full {exp.highlight ? 'bg-emerald-400' : 'bg-neutral-400'}"></div>
            </div>

            <div class="embedded-panel space-y-3">
              <div class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div>
                  <h3 class="text-xl font-semibold text-white">{exp.role}</h3>
                  <p class="text-emerald-400">{exp.company}</p>
                </div>
                <div class="text-sm text-neutral-400 whitespace-nowrap">
                  {exp.year} · {exp.duration}
                </div>
              </div>

              {#if exp.gpa}
                <p class="text-sm text-emerald-400 font-medium">GPA: {exp.gpa}</p>
              {/if}

              <p class="text-base leading-relaxed text-neutral-200">
                {exp.description}
              </p>

              {#if exp.note}
                <p class="text-xs text-neutral-400 italic">{exp.note}</p>
              {/if}

              {#if exp.tags && exp.tags.length > 0}
                <div class="flex flex-wrap gap-2 pt-2">
                  {#each exp.tags as tag}
                    <span class="px-2 py-1 text-xs rounded border border-neutral-600 text-neutral-300 bg-neutral-900/50">
                      {tag}
                    </span>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Achievements Section -->
    <section class="space-y-6">
      <h2 class="text-3xl font-semibold text-white">Recognitions & Awards</h2>
      
      <div class="grid md:grid-cols-2 gap-4">
        {#each achievements as achievement}
          <div class="embedded-panel space-y-2">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h4 class="font-semibold text-emerald-400">{achievement.title}</h4>
                <p class="text-sm text-neutral-400">{achievement.org}</p>
              </div>
              <span class="text-sm font-mono text-neutral-500 whitespace-nowrap">{achievement.year}</span>
            </div>
            <p class="text-sm leading-relaxed text-neutral-200">{achievement.description}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Key Learnings -->
    <section class="space-y-6">
      <h2 class="text-3xl font-semibold text-white">Key Learnings from the Journey</h2>
      <div class="embedded-panel space-y-4">
        <p class="leading-relaxed text-neutral-200">
          Building production systems taught me that engineering pragmatism matters. Frensei forced me to balance 
          technical rigor with commercial reality—systems must be reliable, testable, and maintainable, but they also 
          need to ship and adapt to real user feedback.
        </p>
        <p class="leading-relaxed text-neutral-200">
          At Red Hat, I learned that scale changes everything. What works in a startup doesn't necessarily work at 
          enterprise scale. Backwards compatibility, incremental improvement, and institutional knowledge become 
          critical. Production ML is software engineering with extra uncertainty—monitoring, versioning, and realistic 
          expectations about model behavior compound the engineering challenges.
        </p>
        <p class="leading-relaxed text-neutral-200">
          Research (through my thesis on explainable GNNs) taught me that the most interesting problems sit at the 
          intersection of rigor and pragmatism. Explainability in AI isn't an academic exercise—it's a fundamental 
          requirement for regulated systems where decisions must be defensible.
        </p>
      </div>
    </section>

    <!-- Engineering Principles -->
    <section class="space-y-6">
      <h2 class="text-3xl font-semibold text-white">What I Care About as an Engineer</h2>
      <div class="grid md:grid-cols-2 gap-4">
        {#each principles as principle}
          <div class="border border-white/10 bg-black/40 rounded-lg p-5 hover:border-emerald-500/30 transition-colors">
            <h4 class="font-semibold text-emerald-400 mb-2">{principle.title}</h4>
            <p class="text-sm text-neutral-300 leading-relaxed">{principle.desc}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Recognition / Trust Strip -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-neutral-400 text-center">Worked With / Recognised By</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center py-8">
        {#each recognitions as org}
          <div class="group flex items-center justify-center h-16 w-full opacity-40 grayscale hover:opacity-90 hover:grayscale-0 transition-all duration-300">
            <img 
              src={org.img} 
              alt={org.alt}
              class="max-h-full max-w-full object-contain filter brightness-200 group-hover:brightness-100 transition-all"
              loading="lazy"
            />
          </div>
        {/each}
      </div>
    </section>

    <!-- Closing -->
    <section class="border-t border-white/10 pt-12 space-y-6">
      <p class="text-lg text-neutral-300 leading-relaxed">
        If you want to see what I've built, explore <a href="/projects" class="text-emerald-400 hover:underline">Projects</a>. 
        For technical thinking and lessons learned, check out the <a href="/blog" class="text-emerald-400 hover:underline">Blog</a>. 
        Or try the <a href="/terminal" class="text-emerald-400 hover:underline">Terminal</a> if you prefer navigating that way.
      </p>
    </section>

  </div>
</div>

<style>
  .embedded-panel {
    @apply relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 md:p-8;
  }

  .embedded-panel::before {
    content: '';
    @apply absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-lg pointer-events-none;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
</style>

