
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/about" | "/api" | "/api/ask" | "/blog" | "/blog/[slug]" | "/contact" | "/projects" | "/projects/[slug]" | "/robots.txt" | "/rss.xml" | "/sitemap.xml" | "/terminal";
		RouteParams(): {
			"/blog/[slug]": { slug: string };
			"/projects/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/about": Record<string, never>;
			"/api": Record<string, never>;
			"/api/ask": Record<string, never>;
			"/blog": { slug?: string };
			"/blog/[slug]": { slug: string };
			"/contact": Record<string, never>;
			"/projects": { slug?: string };
			"/projects/[slug]": { slug: string };
			"/robots.txt": Record<string, never>;
			"/rss.xml": Record<string, never>;
			"/sitemap.xml": Record<string, never>;
			"/terminal": Record<string, never>
		};
		Pathname(): "/" | "/about" | "/about/" | "/api" | "/api/" | "/api/ask" | "/api/ask/" | "/blog" | "/blog/" | `/blog/${string}` & {} | `/blog/${string}/` & {} | "/contact" | "/contact/" | "/projects" | "/projects/" | `/projects/${string}` & {} | `/projects/${string}/` & {} | "/robots.txt" | "/robots.txt/" | "/rss.xml" | "/rss.xml/" | "/sitemap.xml" | "/sitemap.xml/" | "/terminal" | "/terminal/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/about/README.md" | "/about/educatingeire.png" | "/about/eireplan.png" | "/about/ey.webp" | "/about/frensei.jpg" | "/about/isef.png" | "/about/newfrontiers.jpg" | "/about/redhat.svg" | "/about/seedsforthefuture.jpg" | "/about/tudublin.jpg" | "/about/udacity.png" | "/cv.pdf" | "/favicon.png" | "/favicon.svg" | "/projects/building-an-ai-planning-intelligence-platform-for-ireland_demo_59c10df13a4a.mp4" | "/projects/building-an-ai-planning-intelligence-platform-for-ireland_preview_video_59c10df13a4a.mp4" | "/projects/building-trust-in-ai_diagram_8f77a7c9ae94.webp" | "/projects/building-trust-in-ai_preview_8f77a7c9ae94.webp" | "/projects/leo_image_a1a843283215.webp" | "/tudublin.png" | string & {};
	}
}