<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	// Phrases to reveal
	const phrases = [
		'Neri Carcasci',
		'BSc (Hons) Computing — ML & AI',
		'AI & ML Engineer',
		'OpenShift / Kubernetes',
		'NLP Evaluation',
		'Drift & Anomaly Detection',
		'LLM Safety',
		'Entrepreneur',
		'FastAPI / Python',
		'Testing & CI',
		'Production ML Systems',
		'API Design',
		'Model Monitoring'
	];

	// Random character set
	const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+=<>?/\\|{}[]~';

	// Grid configuration
	const CELL_WIDTH = 12;
	const CELL_HEIGHT = 20;
	const REVEAL_RADIUS = 140;
	const DECAY_TIME = 800; // ms for decrypted text to fade back
	const THROTTLE_MS = 50;

	// State
	let containerEl: HTMLDivElement;
	let canvasEl: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let cols = 0;
	let rows = 0;
	let grid: string[][] = [];
	let groundTruth: (string | null)[][] = [];
	let cellRevealTime: number[][] = [];
	let mouseX = -1000;
	let mouseY = -1000;
	let lastMouseMove = 0;
	let animationId: number | null = null;
	let isReducedMotion = false;
	let isSmallScreen = false;
	let isInitialized = false;

	// Seeded random for deterministic phrase placement
	function seededRandom(seed: number): () => number {
		return function () {
			seed = (seed * 1103515245 + 12345) & 0x7fffffff;
			return seed / 0x7fffffff;
		};
	}

	function getRandomChar(rng: () => number): string {
		return randomChars[Math.floor(rng() * randomChars.length)];
	}

	function initializeGrid() {
		if (!browser || !containerEl) return;

		const rect = containerEl.getBoundingClientRect();
		cols = Math.floor(rect.width / CELL_WIDTH);
		rows = Math.floor(rect.height / CELL_HEIGHT);

		// Clamp to reasonable limits
		cols = Math.min(cols, 200);
		rows = Math.min(rows, 100);

		if (cols <= 0 || rows <= 0) return;

		// Initialize arrays
		grid = [];
		groundTruth = [];
		cellRevealTime = [];

		const rng = seededRandom(42);

		for (let y = 0; y < rows; y++) {
			grid[y] = [];
			groundTruth[y] = [];
			cellRevealTime[y] = [];
			for (let x = 0; x < cols; x++) {
				grid[y][x] = getRandomChar(rng);
				groundTruth[y][x] = null;
				cellRevealTime[y][x] = 0;
			}
		}

		// Place phrases deterministically
		placePhrases();
		isInitialized = true;
	}

	function placePhrases() {
		const rng = seededRandom(12345);
		const placed: { x: number; y: number; width: number }[] = [];

		for (const phrase of phrases) {
			let attempts = 0;
			const maxAttempts = 100;

			while (attempts < maxAttempts) {
				const x = Math.floor(rng() * (cols - phrase.length - 2));
				const y = Math.floor(rng() * (rows - 2)) + 1;

				if (x < 0 || y < 0) {
					attempts++;
					continue;
				}

				// Check for overlap
				let overlaps = false;
				for (const p of placed) {
					if (
						y === p.y &&
						x < p.x + p.width + 2 &&
						x + phrase.length + 2 > p.x
					) {
						overlaps = true;
						break;
					}
					// Also check row above and below
					if (
						Math.abs(y - p.y) <= 1 &&
						x < p.x + p.width + 1 &&
						x + phrase.length + 1 > p.x
					) {
						overlaps = true;
						break;
					}
				}

				if (!overlaps && x >= 0 && x + phrase.length < cols) {
					// Place the phrase
					for (let i = 0; i < phrase.length; i++) {
						if (groundTruth[y] && x + i < cols) {
							groundTruth[y][x + i] = phrase[i];
						}
					}
					placed.push({ x, y, width: phrase.length });
					break;
				}
				attempts++;
			}
		}
	}

	function setupCanvas() {
		if (!canvasEl || !containerEl) return;

		const rect = containerEl.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;

		canvasEl.width = rect.width * dpr;
		canvasEl.height = rect.height * dpr;
		canvasEl.style.width = `${rect.width}px`;
		canvasEl.style.height = `${rect.height}px`;

		ctx = canvasEl.getContext('2d');
		if (ctx) {
			ctx.scale(dpr, dpr);
		}
	}

	function render() {
		if (!ctx || !isInitialized || cols === 0 || rows === 0) return;

		const rect = containerEl.getBoundingClientRect();
		ctx.clearRect(0, 0, rect.width, rect.height);

		const now = Date.now();
		const rng = seededRandom(now % 10000); // Slow-changing random for ambient animation

		ctx.font = '14px "JetBrains Mono", monospace';
		ctx.textBaseline = 'top';

		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				const cellX = x * CELL_WIDTH;
				const cellY = y * CELL_HEIGHT;

				// Distance from cursor
				const dx = cellX + CELL_WIDTH / 2 - mouseX;
				const dy = cellY + CELL_HEIGHT / 2 - mouseY;
				const dist = Math.sqrt(dx * dx + dy * dy);

				const truthChar = groundTruth[y]?.[x];
				const timeSinceReveal = now - (cellRevealTime[y]?.[x] || 0);

				let char: string;
				let alpha: number;
				let color: string;

				if (dist < REVEAL_RADIUS) {
					// Within reveal radius
					cellRevealTime[y][x] = now;

					if (truthChar) {
						// Reveal the actual character
						char = truthChar;
						const intensity = 1 - dist / REVEAL_RADIUS;
						alpha = 0.4 + intensity * 0.5;
						color = `rgba(52, 211, 153, ${alpha})`; // emerald-400
					} else {
						// No phrase here - show subtle dot or space
						char = rng() > 0.7 ? '·' : ' ';
						alpha = 0.1;
						color = `rgba(100, 100, 100, ${alpha})`;
					}
				} else if (timeSinceReveal < DECAY_TIME && truthChar) {
					// Decaying from revealed state
					const decay = timeSinceReveal / DECAY_TIME;
					const eased = decay * decay; // ease-in

					if (eased < 0.5) {
						// Still showing truth char, fading
						char = truthChar;
						alpha = 0.4 * (1 - eased * 2);
						color = `rgba(52, 211, 153, ${alpha})`;
					} else {
						// Transitioning to random
						char = grid[y]?.[x] || getRandomChar(rng);
						alpha = 0.08;
						color = `rgba(74, 222, 128, ${alpha})`; // green-400 very dim
					}
				} else {
					// Default random state
					// Occasionally shuffle random chars for ambient effect
					if (!isReducedMotion && rng() > 0.995) {
						grid[y][x] = getRandomChar(rng);
					}
					char = grid[y]?.[x] || ' ';
					alpha = 0.06 + rng() * 0.04;
					color = `rgba(74, 222, 128, ${alpha})`;
				}

				ctx.fillStyle = color;
				ctx.fillText(char, cellX, cellY);
			}
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (isReducedMotion || isSmallScreen) return;

		const now = Date.now();
		if (now - lastMouseMove < THROTTLE_MS) return;
		lastMouseMove = now;

		if (containerEl) {
			const rect = containerEl.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
			render();
		}
	}

	function handleMouseLeave() {
		mouseX = -1000;
		mouseY = -1000;
		render();
	}

	function handleResize() {
		if (!browser) return;

		isSmallScreen = window.innerWidth < 1024;

		if (!isSmallScreen) {
			initializeGrid();
			setupCanvas();
			render();
		}
	}

	function startAmbientAnimation() {
		if (isReducedMotion || isSmallScreen) return;

		let lastFrame = 0;
		const interval = 200; // Update ambient every 200ms

		function animate(timestamp: number) {
			if (timestamp - lastFrame > interval) {
				lastFrame = timestamp;
				render();
			}
			animationId = requestAnimationFrame(animate);
		}

		animationId = requestAnimationFrame(animate);
	}

	function stopAmbientAnimation() {
		if (animationId !== null) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}
	}

	onMount(() => {
		if (!browser) return;

		// Check for reduced motion preference
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		isReducedMotion = mediaQuery.matches;

		mediaQuery.addEventListener('change', (e) => {
			isReducedMotion = e.matches;
			if (isReducedMotion) {
				stopAmbientAnimation();
			} else {
				startAmbientAnimation();
			}
		});

		// Check screen size
		isSmallScreen = window.innerWidth < 1024;

		if (!isSmallScreen) {
			// Small delay to ensure container is rendered
			setTimeout(() => {
				initializeGrid();
				setupCanvas();
				render();

				if (!isReducedMotion) {
					startAmbientAnimation();
				}
			}, 100);
		}

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove);
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
			stopAmbientAnimation();
		}
	});
</script>

<div
	bind:this={containerEl}
	class="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
	on:mouseleave={handleMouseLeave}
	role="presentation"
	aria-hidden="true"
>
	{#if !isSmallScreen}
		<canvas
			bind:this={canvasEl}
			class="absolute inset-0 w-full h-full"
		></canvas>
		<!-- Center vignette to keep content readable -->
		<div
			class="absolute inset-0"
			style="background: radial-gradient(ellipse 50% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.95) 100%);"
		></div>
	{/if}
</div>
