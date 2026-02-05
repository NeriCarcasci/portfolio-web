const posts = [
  {
    "slug": "building_ml_pipelines",
    "title": "Building Production ML Pipelines",
    "description": "Practical lessons from building ML pipelines that actually work in production, including monitoring, testing, and deployment strategies.",
    "date": "2024-11-15",
    "modified": "2024-12-01",
    "tags": [
      "machine-learning",
      "mlops",
      "python",
      "production"
    ],
    "people": [
      "author"
    ],
    "type": "article",
    "draft": false,
    "html": '<h1>Building Production ML Pipelines</h1>\n<p>Most ML tutorials focus on model training. The harder part is everything else: getting data in, keeping models healthy, and catching problems before users do.</p>\n<h2>The Reality of Production ML</h2>\n<p>Training a model is maybe 10% of the work. The rest is:</p>\n<ul>\n<li>Data pipelines that don&#39;t break</li>\n<li>Monitoring that catches drift</li>\n<li>Tests that actually test something</li>\n<li>Deployment that doesn&#39;t require a PhD</li>\n</ul>\n<h2>Key Principles</h2>\n<h3>1. Start with Monitoring</h3>\n<p>Before you deploy anything, know how you&#39;ll answer &quot;is it working?&quot; Define metrics upfront:</p>\n<ul>\n<li>Prediction latency (p50, p95, p99)</li>\n<li>Input data distributions</li>\n<li>Output distributions</li>\n<li>Error rates by category</li>\n</ul>\n<h3>2. Test Like You Mean It</h3>\n<p>Unit tests for ML are tricky but necessary:</p>\n<pre><code class="hljs language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">test_model_output_shape</span>():\n    model = load_model()\n    input_data = create_test_input()\n    output = model.predict(input_data)\n    <span class="hljs-keyword">assert</span> output.shape == (<span class="hljs-number">1</span>, NUM_CLASSES)\n\n<span class="hljs-keyword">def</span> <span class="hljs-title function_">test_model_deterministic</span>():\n    model = load_model()\n    input_data = create_test_input()\n    out1 = model.predict(input_data)\n    out2 = model.predict(input_data)\n    <span class="hljs-keyword">assert</span> np.allclose(out1, out2)\n</code></pre><h3>3. Version Everything</h3>\n<p>Not just code—data, models, configs. When something breaks at 3am, you need to know what changed.</p>\n<h2>Drift Detection</h2>\n<p>Models degrade silently. Input distributions shift, user behavior changes, the world moves on. Build drift detection into your pipeline from day one.</p>\n<p>Simple approach: track statistical properties of inputs and outputs. Alert when they diverge from training distributions.</p>\n<h2>Conclusion</h2>\n<p>Production ML is software engineering with extra uncertainty. Treat it that way: test, monitor, version, and automate.</p>\n',
    "wordCount": 242,
    "readingTime": 2,
    "assets": []
  },
  {
    "slug": "api_design_patterns",
    "title": "API Design Patterns That Scale",
    "description": "Patterns and practices for building APIs that remain maintainable as your system grows, from versioning to error handling.",
    "date": "2024-10-20",
    "tags": [
      "api",
      "backend",
      "architecture",
      "typescript"
    ],
    "people": [
      "author"
    ],
    "type": "article",
    "draft": false,
    "html": '<h1>API Design Patterns That Scale</h1>\n<p>Good API design isn&#39;t about following REST religiously. It&#39;s about building interfaces that remain usable and maintainable as requirements change.</p>\n<h2>Versioning Strategy</h2>\n<p>Pick one and stick with it:</p>\n<ul>\n<li><strong>URL versioning</strong>: <code>/v1/users</code> - Simple, explicit, easy to route</li>\n<li><strong>Header versioning</strong>: <code>Accept: application/vnd.api+json;version=1</code> - Cleaner URLs, harder to test</li>\n</ul>\n<p>I prefer URL versioning. It&#39;s obvious, cacheable, and works with every HTTP client.</p>\n<h2>Error Handling</h2>\n<p>Return structured errors. Always.</p>\n<pre><code class="hljs language-json"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;error&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VALIDATION_ERROR&quot;</span><span class="hljs-punctuation">,</span>\n    <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Invalid request parameters&quot;</span><span class="hljs-punctuation">,</span>\n    <span class="hljs-attr">&quot;details&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n      <span class="hljs-punctuation">{</span>\n        <span class="hljs-attr">&quot;field&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;email&quot;</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Must be a valid email address&quot;</span>\n      <span class="hljs-punctuation">}</span>\n    <span class="hljs-punctuation">]</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span>\n</code></pre><p>Use appropriate HTTP status codes:</p>\n<ul>\n<li>400: Client did something wrong</li>\n<li>401: Not authenticated</li>\n<li>403: Authenticated but not authorized</li>\n<li>404: Resource doesn&#39;t exist</li>\n<li>500: We messed up</li>\n</ul>\n<h2>Pagination</h2>\n<p>For lists, use cursor-based pagination:</p>\n<pre><code class="hljs language-json"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;pagination&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;next_cursor&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;eyJpZCI6MTAwfQ==&quot;</span><span class="hljs-punctuation">,</span>\n    <span class="hljs-attr">&quot;has_more&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span>\n</code></pre><p>Offset pagination breaks with concurrent writes. Cursors don&#39;t.</p>\n<h2>Rate Limiting</h2>\n<p>Always implement rate limiting. Return remaining quota in headers:</p>\n<pre><code>X-RateLimit-Limit: 100\nX-RateLimit-Remaining: 95\nX-RateLimit-Reset: 1699900800\n</code></pre><h2>Idempotency</h2>\n<p>For mutations, support idempotency keys. Clients should be able to retry safely.</p>\n<pre><code>POST /v1/payments\nIdempotency-Key: abc-123-def-456\n</code></pre><h2>Conclusion</h2>\n<p>APIs are contracts. Design them carefully, document them thoroughly, and change them reluctantly.</p>\n',
    "wordCount": 217,
    "readingTime": 2,
    "assets": []
  },
  {
    "slug": "startup_lessons",
    "title": "Technical Lessons from Startup CTO Life",
    "description": "What I learned about technology choices, team building, and shipping fast while leading engineering at an early-stage startup.",
    "date": "2024-09-10",
    "modified": "2024-09-15",
    "tags": [
      "startup",
      "leadership",
      "engineering",
      "career"
    ],
    "people": [
      "author"
    ],
    "type": "article",
    "draft": false,
    "html": "<h1>Technical Lessons from Startup CTO Life</h1>\n<p>Being a startup CTO taught me more about engineering than any other role. Not because the problems were harder, but because every decision had immediate, visible consequences.</p>\n<h2>Ship First, Optimize Later</h2>\n<p>Premature optimization isn&#39;t just about code. It&#39;s about architecture, tooling, processes.</p>\n<p>We spent two weeks building a &quot;scalable&quot; message queue system before we had paying customers. We should have used a managed service and moved on.</p>\n<p><strong>Rule</strong>: If you&#39;re not embarrassed by your first version, you shipped too late.</p>\n<h2>Choose Boring Technology</h2>\n<p>Every new technology is a liability:</p>\n<ul>\n<li>Learning curve for the team</li>\n<li>Unknown failure modes</li>\n<li>Smaller talent pool</li>\n<li>Less documentation</li>\n</ul>\n<p>PostgreSQL, Redis, and proven frameworks get you far. Save the experiments for problems that actually require them.</p>\n<h2>Debt is Real</h2>\n<p>Technical debt compounds. That &quot;temporary&quot; hack becomes permanent. That missing test becomes a production incident.</p>\n<p>Budget time for cleanup. Not as a separate project—as part of every sprint.</p>\n<h2>Documentation Matters</h2>\n<p>&quot;The code is self-documenting&quot; is a lie we tell ourselves. Write:</p>\n<ul>\n<li>Architecture decisions (ADRs)</li>\n<li>API contracts</li>\n<li>Runbooks for common issues</li>\n<li>Onboarding guides</li>\n</ul>\n<p>Future you (and your team) will be grateful.</p>\n<h2>Hire for Adaptability</h2>\n<p>In a startup, roles blur. The best engineers I worked with could:</p>\n<ul>\n<li>Debug production issues at 2am</li>\n<li>Write user-facing copy</li>\n<li>Talk to customers</li>\n<li>Question product decisions</li>\n</ul>\n<p>Technical skill matters, but flexibility matters more.</p>\n<h2>Conclusion</h2>\n<p>Startups are chaos. Your job as a technical leader is to build systems—both technical and human—that can handle that chaos without breaking.</p>\n",
    "wordCount": 266,
    "readingTime": 2,
    "assets": []
  }
];
const publishedPosts = posts.filter((p) => !p.draft);
function getAllPosts() {
  return publishedPosts;
}
function getFeaturedPosts(limit = 3) {
  return publishedPosts.slice(0, limit);
}
function getPostBySlug(slug) {
  return publishedPosts.find((p) => p.slug === slug);
}
function getAllTags() {
  const tagSet = /* @__PURE__ */ new Set();
  for (const post of publishedPosts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}
function searchPosts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);
  if (tokens.length === 0) return [];
  return publishedPosts.map((post) => {
    const searchText = [
      post.title,
      post.description,
      ...post.tags
    ].join(" ").toLowerCase();
    let score = 0;
    for (const token of tokens) {
      if (searchText.includes(token)) {
        score += 1;
        if (post.title.toLowerCase().includes(token)) {
          score += 2;
        }
      }
    }
    return { post, score };
  }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score).map((r) => r.post);
}
function getAdjacentPosts(slug) {
  const index = publishedPosts.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    // Posts are sorted newest first, so "next" is older (higher index)
    next: index < publishedPosts.length - 1 ? publishedPosts[index + 1] : null,
    // "prev" is newer (lower index)
    prev: index > 0 ? publishedPosts[index - 1] : null
  };
}
export {
  getFeaturedPosts as a,
  getAllTags as b,
  getAdjacentPosts as c,
  getPostBySlug as d,
  getAllPosts as g,
  searchPosts as s
};
