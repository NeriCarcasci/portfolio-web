export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["cv.pdf","favicon.svg"]),
	mimeTypes: {".pdf":"application/pdf",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.BiiiTQcC.js",app:"_app/immutable/entry/app.YcfG8Qyv.js",imports:["_app/immutable/entry/start.BiiiTQcC.js","_app/immutable/chunks/Cr9WP4GD.js","_app/immutable/chunks/DtJa-QzH.js","_app/immutable/chunks/DnJ5QhxQ.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/Bq8c2gde.js","_app/immutable/chunks/CBgLnzEE.js","_app/immutable/entry/app.YcfG8Qyv.js","_app/immutable/chunks/DtJa-QzH.js","_app/immutable/chunks/sE9xILkw.js","_app/immutable/chunks/Bq8c2gde.js","_app/immutable/chunks/CBgLnzEE.js","_app/immutable/chunks/BCuiBAxe.js","_app/immutable/chunks/Db-3-XRS.js","_app/immutable/chunks/DeG8hgrU.js","_app/immutable/chunks/DnJ5QhxQ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
