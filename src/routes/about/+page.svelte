<script lang="ts">
  import SeoHead from '$components/SeoHead.svelte';
  import Timeline from '$lib/components/Timeline.svelte';
  import TimelineItem from '$lib/components/TimelineItem.svelte';
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



  // Timeline experiences - reverse chronological (newest first)
  const timeline = [
    {
      date: 'November 2025 – Present',
      role: 'Co-Founder',
      company: 'Eireplan',
      description: 'Building next-generation planning intelligence platform for Ireland.',
      tags: ['Startups', 'AI/ML', 'GovTech'],
      logo: '/about/eireplan.png',
      highlight: true
    },
    {
      date: 'January 2025 – August 2025',
      role: 'AI & ML Engineer Intern',
      company: 'Red Hat Trusted AI',
      description: 'Rewrote trustyAI service in Python, exposed core NLP metrics (BLEU, ROUGE, Levenshtein) via API, built drift detection using Jensen-Shannon divergence. Ran Python and robotics workshops.',
      tags: ['Enterprise ML', 'Python', 'API Design', 'Testing', 'Open Source'],
      logo: '/about/redhat.svg',
      highlight: false
    },
    {
      date: '2021 – 2025',
      role: 'CTO & Co-Founder',
      company: 'Frensei',
      description: 'Built AI planning platform for regulated environments. Won awards including ISEF finalist, Enterprise Ireland New Frontiers. Signed pilots in multiple countries.',
      tags: ['Leadership', 'AI/ML', 'Systems Architecture', 'Go-to-Market'],
      logo: '/about/frensei.jpg',
      highlight: false
    },
    {
      date: 'May 2023 – June 2024',
      role: 'Applied Maths & Computer Science Teacher',
      company: 'Educating Éire',
      description: 'Taught senior cycle computing and applied maths. Built on 2,000+ hours of freelance tutoring across secondary, undergraduate, and professional levels.',
      tags: ['Education', 'Mentoring', 'Teaching'],
      logo: '/about/educatingeire.png',
      note: 'Concurrent with Frensei'
    },
    {
      date: 'May 2023 – August 2023',
      role: 'Cybersecurity Consultant Internship',
      company: 'Ernst & Young',
      description: 'Penetration testing and cyber campaign management. Contributed to EY Sustainability Challenge and Open Science innovation initiatives.',
      tags: ['Security', 'Consulting', 'Penetration Testing'],
      logo: '/about/ey.webp'
    }
  ];

  // Achievements - notable recognitions
  const achievements = [
    {
      year: '2024',
      title: 'ISEF Finalist & Podium',
      description: 'ISEF finalist podium placement, $5,000 award',
      org: 'ISEF',
      logo: '/about/isef.png'
    },
    {
      year: '2021–2025',
      title: 'Enterprise Ireland New Frontiers',
      description: 'Phase 2 funding for Frensei through New Frontiers programme',
      org: 'Enterprise Ireland',
      logo: '/about/newfrontiers.jpg'
    },
    {
      year: '2023',
      title: 'Huawei Seeds for the Future',
      description: 'Selected for global leadership development programme',
      org: 'Huawei',
      logo: '/about/seedsforthefuture.jpg'
    },
    {
      year: '2023',
      title: 'Udacity Deep Learning Nanodegree',
      description: 'Completed 6-month deep learning certification',
      org: 'Udacity',
      logo: '/about/udacity.png'
    }
  ];

  // Education
  const education = {
    degree: 'BSc (Hons) Computing with ML & AI',
    institution: 'TU Dublin',
    duration: 'September 2022 – August 2026',
    gpa: '3.7',
    logo: '/about/tudublin.jpg',
    description: 'Thesis: Explainable Graph Neural Networks for financial crime detection. Comparing explainability methods (SHAP, LIME, GNNExplainer) on cryptocurrency transaction datasets.',
    tags: ['GNNs', 'Explainability', 'Financial Crime Detection']
  };
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
          I'm interested in systems that solve hard problems: how do you make AI explainable? How do you build planning intelligence for regulated environments? How do you scale production ML at enterprise?
        </p>
        <p class="text-lg leading-relaxed text-neutral-200">
          I've explored these through building a startup (Frensei), contributing to enterprise ML platforms (Red Hat), and researching explainability methods for graph neural networks. The work teaches you what matters: reliability, clarity, and systems that actually work in production.
        </p>
      </div>
    </section>

    <!-- Experience Timeline -->
    <section class="space-y-10">
      <h2 class="text-3xl font-semibold text-white">Experience Timeline</h2>
      
      <Timeline class="ms-4">
        {#each timeline as exp}
          <TimelineItem 
            title="{exp.role} · {exp.company}" 
            date={exp.date}
            logo={exp.logo}
            highlight={exp.highlight}
          >
            <p class="mb-4">
              {exp.description}
            </p>
            
            {#if exp.note}
              <p class="text-xs text-gray-400 dark:text-gray-500 italic mb-3">{exp.note}</p>
            {/if}

            {#if exp.tags && exp.tags.length > 0}
              <div class="flex flex-wrap gap-2">
                {#each exp.tags as tag}
                  <span class="px-2 py-1 text-xs rounded border border-neutral-600 text-neutral-300 bg-neutral-900/50">
                    {tag}
                  </span>
                {/each}
              </div>
            {/if}
          </TimelineItem>
        {/each}
      </Timeline>
    </section>

    <!-- Education -->
    <section class="space-y-6">
      <h2 class="text-3xl font-semibold text-white">Education</h2>
      
      <div class="embedded-panel">
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-1 space-y-3">
            <div>
              <h3 class="text-xl font-semibold text-white">{education.degree}</h3>
              <p class="text-emerald-400">{education.institution}</p>
              <p class="text-sm text-neutral-400 mt-1">{education.duration}</p>
              <p class="text-sm text-emerald-400 font-medium mt-1">GPA: {education.gpa}</p>
            </div>

            <p class="text-base leading-relaxed text-neutral-200">
              {education.description}
            </p>

            {#if education.tags && education.tags.length > 0}
              <div class="flex flex-wrap gap-2 pt-2">
                {#each education.tags as tag}
                  <span class="px-2 py-1 text-xs rounded border border-neutral-600 text-neutral-300 bg-neutral-900/50">
                    {tag}
                  </span>
                {/each}
              </div>
            {/if}
          </div>

          <div class="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <img src={education.logo} alt="{education.institution} logo" class="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>

    <!-- Achievements Section -->
    <section class="space-y-6">
      <h2 class="text-3xl font-semibold text-white">Recognitions & Awards</h2>
      
      <div class="grid md:grid-cols-2 gap-4">
        {#each achievements as achievement}
          <div class="embedded-panel">
            <div class="flex flex-col md:flex-row gap-4 items-start">
              <div class="flex-1 space-y-2">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h4 class="font-semibold text-emerald-400">{achievement.title}</h4>
                    <p class="text-sm text-neutral-400">{achievement.org}</p>
                  </div>
                  <span class="text-sm font-mono text-neutral-500 whitespace-nowrap">{achievement.year}</span>
                </div>
                <p class="text-sm leading-relaxed text-neutral-200">{achievement.description}</p>
              </div>

              {#if achievement.logo}
                <div class="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg">
                  <img src={achievement.logo} alt="{achievement.org} logo" class="w-full h-full object-contain" />
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
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

