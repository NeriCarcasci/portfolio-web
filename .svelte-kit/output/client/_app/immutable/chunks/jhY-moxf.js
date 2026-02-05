const r=[{slug:"building_ml_pipelines",title:"Building Production ML Pipelines",description:"Practical lessons from building ML pipelines that actually work in production, including monitoring, testing, and deployment strategies.",date:"2024-11-15",modified:"2024-12-01",tags:["machine-learning","mlops","python","production"],people:["author"],type:"article",draft:!1,html:`<h1>Building Production ML Pipelines</h1>
<p>Most ML tutorials focus on model training. The harder part is everything else: getting data in, keeping models healthy, and catching problems before users do.</p>
<h2>The Reality of Production ML</h2>
<p>Training a model is maybe 10% of the work. The rest is:</p>
<ul>
<li>Data pipelines that don&#39;t break</li>
<li>Monitoring that catches drift</li>
<li>Tests that actually test something</li>
<li>Deployment that doesn&#39;t require a PhD</li>
</ul>
<h2>Key Principles</h2>
<h3>1. Start with Monitoring</h3>
<p>Before you deploy anything, know how you&#39;ll answer &quot;is it working?&quot; Define metrics upfront:</p>
<ul>
<li>Prediction latency (p50, p95, p99)</li>
<li>Input data distributions</li>
<li>Output distributions</li>
<li>Error rates by category</li>
</ul>
<h3>2. Test Like You Mean It</h3>
<p>Unit tests for ML are tricky but necessary:</p>
<pre><code class="hljs language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">test_model_output_shape</span>():
    model = load_model()
    input_data = create_test_input()
    output = model.predict(input_data)
    <span class="hljs-keyword">assert</span> output.shape == (<span class="hljs-number">1</span>, NUM_CLASSES)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">test_model_deterministic</span>():
    model = load_model()
    input_data = create_test_input()
    out1 = model.predict(input_data)
    out2 = model.predict(input_data)
    <span class="hljs-keyword">assert</span> np.allclose(out1, out2)
</code></pre><h3>3. Version Everything</h3>
<p>Not just code—data, models, configs. When something breaks at 3am, you need to know what changed.</p>
<h2>Drift Detection</h2>
<p>Models degrade silently. Input distributions shift, user behavior changes, the world moves on. Build drift detection into your pipeline from day one.</p>
<p>Simple approach: track statistical properties of inputs and outputs. Alert when they diverge from training distributions.</p>
<h2>Conclusion</h2>
<p>Production ML is software engineering with extra uncertainty. Treat it that way: test, monitor, version, and automate.</p>
`,wordCount:242,readingTime:2,assets:[]},{slug:"api_design_patterns",title:"API Design Patterns That Scale",description:"Patterns and practices for building APIs that remain maintainable as your system grows, from versioning to error handling.",date:"2024-10-20",tags:["api","backend","architecture","typescript"],people:["author"],type:"article",draft:!1,html:`<h1>API Design Patterns That Scale</h1>
<p>Good API design isn&#39;t about following REST religiously. It&#39;s about building interfaces that remain usable and maintainable as requirements change.</p>
<h2>Versioning Strategy</h2>
<p>Pick one and stick with it:</p>
<ul>
<li><strong>URL versioning</strong>: <code>/v1/users</code> - Simple, explicit, easy to route</li>
<li><strong>Header versioning</strong>: <code>Accept: application/vnd.api+json;version=1</code> - Cleaner URLs, harder to test</li>
</ul>
<p>I prefer URL versioning. It&#39;s obvious, cacheable, and works with every HTTP client.</p>
<h2>Error Handling</h2>
<p>Return structured errors. Always.</p>
<pre><code class="hljs language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;error&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VALIDATION_ERROR&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Invalid request parameters&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;details&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;email&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Must be a valid email address&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre><p>Use appropriate HTTP status codes:</p>
<ul>
<li>400: Client did something wrong</li>
<li>401: Not authenticated</li>
<li>403: Authenticated but not authorized</li>
<li>404: Resource doesn&#39;t exist</li>
<li>500: We messed up</li>
</ul>
<h2>Pagination</h2>
<p>For lists, use cursor-based pagination:</p>
<pre><code class="hljs language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pagination&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;next_cursor&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;eyJpZCI6MTAwfQ==&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;has_more&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre><p>Offset pagination breaks with concurrent writes. Cursors don&#39;t.</p>
<h2>Rate Limiting</h2>
<p>Always implement rate limiting. Return remaining quota in headers:</p>
<pre><code>X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699900800
</code></pre><h2>Idempotency</h2>
<p>For mutations, support idempotency keys. Clients should be able to retry safely.</p>
<pre><code>POST /v1/payments
Idempotency-Key: abc-123-def-456
</code></pre><h2>Conclusion</h2>
<p>APIs are contracts. Design them carefully, document them thoroughly, and change them reluctantly.</p>
`,wordCount:217,readingTime:2,assets:[]},{slug:"startup_lessons",title:"Technical Lessons from Startup CTO Life",description:"What I learned about technology choices, team building, and shipping fast while leading engineering at an early-stage startup.",date:"2024-09-10",modified:"2024-09-15",tags:["startup","leadership","engineering","career"],people:["author"],type:"article",draft:!1,html:`<h1>Technical Lessons from Startup CTO Life</h1>
<p>Being a startup CTO taught me more about engineering than any other role. Not because the problems were harder, but because every decision had immediate, visible consequences.</p>
<h2>Ship First, Optimize Later</h2>
<p>Premature optimization isn&#39;t just about code. It&#39;s about architecture, tooling, processes.</p>
<p>We spent two weeks building a &quot;scalable&quot; message queue system before we had paying customers. We should have used a managed service and moved on.</p>
<p><strong>Rule</strong>: If you&#39;re not embarrassed by your first version, you shipped too late.</p>
<h2>Choose Boring Technology</h2>
<p>Every new technology is a liability:</p>
<ul>
<li>Learning curve for the team</li>
<li>Unknown failure modes</li>
<li>Smaller talent pool</li>
<li>Less documentation</li>
</ul>
<p>PostgreSQL, Redis, and proven frameworks get you far. Save the experiments for problems that actually require them.</p>
<h2>Debt is Real</h2>
<p>Technical debt compounds. That &quot;temporary&quot; hack becomes permanent. That missing test becomes a production incident.</p>
<p>Budget time for cleanup. Not as a separate project—as part of every sprint.</p>
<h2>Documentation Matters</h2>
<p>&quot;The code is self-documenting&quot; is a lie we tell ourselves. Write:</p>
<ul>
<li>Architecture decisions (ADRs)</li>
<li>API contracts</li>
<li>Runbooks for common issues</li>
<li>Onboarding guides</li>
</ul>
<p>Future you (and your team) will be grateful.</p>
<h2>Hire for Adaptability</h2>
<p>In a startup, roles blur. The best engineers I worked with could:</p>
<ul>
<li>Debug production issues at 2am</li>
<li>Write user-facing copy</li>
<li>Talk to customers</li>
<li>Question product decisions</li>
</ul>
<p>Technical skill matters, but flexibility matters more.</p>
<h2>Conclusion</h2>
<p>Startups are chaos. Your job as a technical leader is to build systems—both technical and human—that can handle that chaos without breaking.</p>
`,wordCount:266,readingTime:2,assets:[]}],e=r.filter(t=>!t.draft);function p(){return e}function u(t=3){return e.slice(0,t)}function c(t){return e.find(s=>s.slug===t)}function h(){const t=new Set;for(const s of e)for(const a of s.tags)t.add(a);return Array.from(t).sort()}function d(t){const s=t.toLowerCase().trim();if(!s)return[];const a=s.split(/\s+/).filter(n=>n.length>2);return a.length===0?[]:e.map(n=>{const i=[n.title,n.description,...n.tags].join(" ").toLowerCase();let o=0;for(const l of a)i.includes(l)&&(o+=1,n.title.toLowerCase().includes(l)&&(o+=2));return{post:n,score:o}}).filter(n=>n.score>0).sort((n,i)=>i.score-n.score).map(n=>n.post)}function g(t){const s=e.findIndex(a=>a.slug===t);return s===-1?{prev:null,next:null}:{next:s<e.length-1?e[s+1]:null,prev:s>0?e[s-1]:null}}export{h as a,p as b,c,g as d,u as g,d as s};
