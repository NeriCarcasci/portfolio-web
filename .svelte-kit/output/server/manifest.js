export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["about/README.md","cv.pdf","favicon.png","favicon.svg","projects/building-an-ai-planning-intelligence-platform-for-ireland_demo_59c10df13a4a.mp4","projects/building-an-ai-planning-intelligence-platform-for-ireland_preview_video_59c10df13a4a.mp4","projects/building-trust-in-ai_diagram_8f77a7c9ae94.webp","projects/building-trust-in-ai_preview_8f77a7c9ae94.webp","projects/leo_image_a1a843283215.webp"]),
	mimeTypes: {".md":"text/markdown",".pdf":"application/pdf",".png":"image/png",".svg":"image/svg+xml",".mp4":"video/mp4",".webp":"image/webp"},
	_: {
		client: {start:"_app/immutable/entry/start.CEBKztLq.js",app:"_app/immutable/entry/app.Cmo-y7Bf.js",imports:["_app/immutable/entry/start.CEBKztLq.js","_app/immutable/chunks/Cwa-NJ8l.js","_app/immutable/chunks/_eWs1X5C.js","_app/immutable/chunks/DtM9XZlj.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/45n6dgAp.js","_app/immutable/entry/app.Cmo-y7Bf.js","_app/immutable/chunks/_eWs1X5C.js","_app/immutable/chunks/CzMFQgrY.js","_app/immutable/chunks/45n6dgAp.js","_app/immutable/chunks/CMxh1oUs.js","_app/immutable/chunks/BfQRXcNO.js","_app/immutable/chunks/Cnogj6Rd.js","_app/immutable/chunks/DtM9XZlj.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/ask",
				pattern: /^\/api\/ask\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/ask/_server.ts.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/blog/[slug]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/projects/[slug]",
				pattern: /^\/projects\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/robots.txt",
				pattern: /^\/robots\.txt\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/robots.txt/_server.ts.js'))
			},
			{
				id: "/rss.xml",
				pattern: /^\/rss\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/rss.xml/_server.ts.js'))
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap.xml/_server.ts.js'))
			},
			{
				id: "/terminal",
				pattern: /^\/terminal\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
