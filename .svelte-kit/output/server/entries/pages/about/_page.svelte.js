import { a2 as ensure_array_like, a9 as attr } from "../../../chunks/index2.js";
import { S as SeoHead } from "../../../chunks/SeoHead.js";
import { a as about } from "../../../chunks/about.js";
import { B as BASE_URL } from "../../../chunks/config.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const pageKeywords = [
      "Software Engineer",
      "AI Engineer",
      "Machine Learning",
      "Systems Engineering",
      "Production ML",
      "Graph Neural Networks",
      "Explainable AI",
      "Startup CTO",
      "Technical Leadership"
    ];
    const profileSchema = {
      "@type": "ProfilePage",
      name: `About ${about.name}`,
      url: `${BASE_URL}/about`,
      description: about.summary
    };
    const principles = [
      {
        title: "Reliability over novelty",
        desc: "Systems should work consistently under expected conditions."
      },
      {
        title: "Testability is non-negotiable",
        desc: "If it can't be tested, it can't be trusted in production."
      },
      {
        title: "Clarity over cleverness",
        desc: "Code is read more than written. Make it obvious."
      },
      {
        title: "Production realism",
        desc: "Build for how systems actually behave, not how they should behave."
      },
      {
        title: "Traceability matters",
        desc: "Especially in AI systems—if reasoning can't be explained, it can't be used."
      },
      {
        title: "Long-term maintainability",
        desc: "Choose boring technology. Future you will be grateful."
      }
    ];
    const recognitions = [
      { name: "Red Hat", img: "/about/redhat.svg", alt: "Red Hat" },
      {
        name: "TU Dublin",
        img: "/about/tudublin.svg",
        alt: "TU Dublin"
      },
      {
        name: "Enterprise Ireland",
        img: "/about/enterprise-ireland.svg",
        alt: "Enterprise Ireland New Frontiers"
      },
      { name: "ISEF", img: "/about/isef.svg", alt: "ISEF" }
    ];
    SeoHead($$renderer2, {
      title: `About - ${about.name}`,
      description: about.summary,
      canonical: "/about",
      keywords: pageKeywords,
      breadcrumbs: [{ name: "Home", url: "/" }, { name: "About", url: "/about" }],
      jsonLd: profileSchema
    });
    $$renderer2.push(`<!----> <div class="container-main svelte-cwls5q"><header class="mb-16 max-w-3xl svelte-cwls5q"><h1 class="text-4xl md:text-5xl font-semibold mb-6 text-white svelte-cwls5q">Who I Am</h1> <p class="text-xl text-neutral-300 leading-relaxed svelte-cwls5q">Software &amp; AI Engineer focused on building systems that solve real problems.</p></header> <div class="max-w-4xl space-y-20 svelte-cwls5q"><section class="space-y-6 svelte-cwls5q"><div class="embedded-panel space-y-4 svelte-cwls5q"><p class="text-lg leading-relaxed text-neutral-200 svelte-cwls5q">I build production systems at the intersection of software engineering and machine learning. My work spans 
          enterprise ML infrastructure, regulated decision-support platforms, and applied research in explainable AI.</p> <p class="text-lg leading-relaxed text-neutral-200 svelte-cwls5q">My background combines hands-on engineering with systems thinking—whether that's rebuilding metrics 
          platforms for model governance, architecting AI systems for regulated planning environments, or 
          developing explainability frameworks for graph neural networks in financial crime detection.</p> <p class="text-lg leading-relaxed text-neutral-200 svelte-cwls5q">I approach engineering pragmatically: systems should be reliable, testable, and maintainable. 
          AI should be traceable and explainable. Code should be clear. Production matters more than polish in prototypes.</p></div></section> <section class="space-y-10 svelte-cwls5q"><h2 class="text-3xl font-semibold text-white svelte-cwls5q">Experience &amp; Trajectory</h2> <div class="space-y-4 svelte-cwls5q"><h3 class="text-xl font-semibold text-emerald-400 svelte-cwls5q">Startup &amp; Entrepreneurship</h3> <div class="embedded-panel space-y-4 svelte-cwls5q"><p class="leading-relaxed text-neutral-200 svelte-cwls5q">As co-founder and technical lead of an <strong class="svelte-cwls5q">AI-enhanced planning intelligence platform</strong>, I designed and 
            built a production system now used by planning professionals across Ireland. The work focused on building 
            traceable, explainable AI infrastructure for regulated decision-making—combining document ingestion pipelines, 
            retrieval-augmented reasoning, and workflow-aware tooling into a system where every output can be audited 
            and defended.</p> <p class="leading-relaxed text-neutral-200 svelte-cwls5q">The core principle: if the reasoning cannot be traced and explained, the output cannot be used. This shaped 
            every architectural decision, from citation enforcement to strict separation between AI assistance and human 
            decision authority.</p> <p class="leading-relaxed text-neutral-200 svelte-cwls5q">The platform is live in production, operating commercially with enterprise pilots, and backed by <strong class="svelte-cwls5q">Enterprise Ireland's New Frontiers</strong> programme. This taught me how to balance technical 
            rigor with commercial realism—building systems that work under actual use, not just in ideal conditions.</p></div></div> <div class="space-y-4 svelte-cwls5q"><h3 class="text-xl font-semibold text-emerald-400 svelte-cwls5q">Enterprise &amp; Production Engineering</h3> <div class="embedded-panel space-y-4 svelte-cwls5q"><p class="leading-relaxed text-neutral-200 svelte-cwls5q">At <strong class="svelte-cwls5q">Red Hat's Trusted AI team</strong>, I rebuilt the internal metrics platform for ML model governance, 
            added drift detection capabilities, and exposed new APIs for cross-team integration. The work required navigating 
            existing production infrastructure, understanding how teams actually use ML monitoring tools, and delivering 
            improvements without breaking existing workflows.</p> <p class="leading-relaxed text-neutral-200 svelte-cwls5q">This experience reinforced the importance of backwards compatibility, incremental improvement, and building for 
            maintainability in large-scale engineering environments. Production ML is software engineering with extra 
            uncertainty—it requires monitoring, versioning, testing, and realistic expectations about model behavior over time.</p> <p class="leading-relaxed text-neutral-200 svelte-cwls5q">Earlier work at <strong class="svelte-cwls5q">EY</strong> involved backend development, API design, database optimization, and CI/CD 
            pipeline construction—core engineering that matters regardless of whether AI is involved.</p></div></div> <div class="space-y-4 svelte-cwls5q"><h3 class="text-xl font-semibold text-emerald-400 svelte-cwls5q">Teaching &amp; Mentoring</h3> <div class="embedded-panel space-y-4 svelte-cwls5q"><p class="leading-relaxed text-neutral-200 svelte-cwls5q">I've taught technical workshops, mentored students, and tutored in computer science fundamentals. Through <strong class="svelte-cwls5q">Educating Éire</strong> and independent tutoring, I've worked with learners at different levels—from 
            secondary school through university—helping them understand not just syntax, but systems thinking and problem 
            decomposition.</p> <p class="leading-relaxed text-neutral-200 svelte-cwls5q">Teaching clarifies thinking. Explaining how something works forces you to understand it more deeply. This applies 
            to code reviews, documentation, and technical communication just as much as formal instruction.</p></div></div></section> <section class="space-y-6 svelte-cwls5q"><h2 class="text-3xl font-semibold text-white svelte-cwls5q">Education &amp; Foundations</h2> <div class="embedded-panel space-y-4 svelte-cwls5q"><p class="leading-relaxed text-neutral-200 svelte-cwls5q">I'm completing a <strong class="svelte-cwls5q">BSc (Hons) in Computing with Machine Learning &amp; AI at TU Dublin</strong>, where my 
          graduate thesis focuses on explainable Graph Neural Networks for financial crime detection. The work involves 
          implementing and evaluating multiple explainability methods (SHAP, LIME, GNNExplainer, Counterfactual-GNN) 
          on the Elliptic2 dataset—a real-world benchmark for anti-money laundering detection in cryptocurrency networks.</p> <p class="leading-relaxed text-neutral-200 svelte-cwls5q">The research addresses a practical problem: GNNs can model complex relational patterns in financial transactions, 
          but they operate as black boxes. For regulated financial institutions, this lack of transparency is a barrier to 
          adoption. Building explainability into these models means balancing performance with interpretability—making 
          systems that are both effective and trustworthy.</p> <p class="leading-relaxed text-neutral-200 svelte-cwls5q">My academic work emphasizes applied learning—understanding not just how algorithms work, but when and why to 
          use them, what their failure modes are, and how they behave in production contexts.</p></div></section> <section class="space-y-6 svelte-cwls5q"><h2 class="text-3xl font-semibold text-white svelte-cwls5q">What I Care About as an Engineer</h2> <div class="grid md:grid-cols-2 gap-4 svelte-cwls5q"><!--[-->`);
    const each_array = ensure_array_like(principles);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let principle = each_array[$$index];
      $$renderer2.push(`<div class="border border-white/10 bg-black/40 rounded-lg p-5 hover:border-emerald-500/30 transition-colors svelte-cwls5q"><h4 class="font-semibold text-emerald-400 mb-2 svelte-cwls5q">${escape_html(principle.title)}</h4> <p class="text-sm text-neutral-300 leading-relaxed svelte-cwls5q">${escape_html(principle.desc)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="space-y-6 svelte-cwls5q"><h2 class="text-2xl font-semibold text-neutral-400 text-center svelte-cwls5q">Worked With / Recognised By</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center py-8 svelte-cwls5q"><!--[-->`);
    const each_array_1 = ensure_array_like(recognitions);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let org = each_array_1[$$index_1];
      $$renderer2.push(`<div class="group flex items-center justify-center h-16 w-full opacity-40 grayscale hover:opacity-90 hover:grayscale-0 transition-all duration-300 svelte-cwls5q"><img${attr("src", org.img)}${attr("alt", org.alt)} class="max-h-full max-w-full object-contain filter brightness-200 group-hover:brightness-100 transition-all svelte-cwls5q" loading="lazy"/></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="border-t border-white/10 pt-12 space-y-6 svelte-cwls5q"><p class="text-lg text-neutral-300 leading-relaxed svelte-cwls5q">If you want to see what I've built, explore <a href="/projects" class="text-emerald-400 hover:underline svelte-cwls5q">Projects</a>. 
        For technical thinking and lessons learned, check out the <a href="/blog" class="text-emerald-400 hover:underline svelte-cwls5q">Blog</a>. 
        Or try the <a href="/terminal" class="text-emerald-400 hover:underline svelte-cwls5q">Terminal</a> if you prefer navigating that way.</p></section></div></div>`);
  });
}
export {
  _page as default
};
