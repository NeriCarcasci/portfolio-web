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
	const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>[]{}';

	// Grid configuration
	const CELL_WIDTH = 10;
	const CELL_HEIGHT = 16;
	const REVEAL_RADIUS = 150;
	const DECAY_TIME = 800;
	const SCRAMBLE_RATE = 0.005; // ~0.5% of cells change per frame for subtle cyphertext effect
	const BASE_OPACITY = 0.12; // Base visibility of background characters

	// Element refs
	let containerEl: HTMLDivElement | undefined;
	let canvasEl: HTMLCanvasElement | undefined;

	// Internal state
	let ctx: CanvasRenderingContext2D | null = null;
	let cols = 0;
	let rows = 0;
	let grid: string[][] = [];
	let groundTruth: (string | null)[][] = [];
	let cellRevealTime: number[][] = [];
	let cellScrambleOffset: number[][] = []; // For staggered scrambling
	let mouseX = -1000;
	let mouseY = -1000;
	let animationId: number | null = null;
	let isReducedMotion = false;
	let isInitialized = false;
	let frameCount = 0;

	// Seeded random for deterministic phrase placement
	function seededRandom(seed: number): () => number {
		return function () {
			seed = (seed * 1103515245 + 12345) & 0x7fffffff;
			return seed / 0x7fffffff;
		};
	}

	function getRandomChar(): string {
		return randomChars[Math.floor(Math.random() * randomChars.length)];
	}

	function initializeGrid() {
		if (!browser || !containerEl) return;

		const rect = containerEl.getBoundingClientRect();
		cols = Math.floor(rect.width / CELL_WIDTH);
		rows = Math.floor(rect.height / CELL_HEIGHT);

		// Clamp to reasonable limits
		cols = Math.min(cols, 300);
		rows = Math.min(rows, 150);

		if (cols <= 0 || rows <= 0) return;

		// Initialize arrays
		grid = [];
		groundTruth = [];
		cellRevealTime = [];
		cellScrambleOffset = [];

		for (let y = 0; y < rows; y++) {
			grid[y] = [];
			groundTruth[y] = [];
			cellRevealTime[y] = [];
			cellScrambleOffset[y] = [];
			for (let x = 0; x < cols; x++) {
				grid[y][x] = getRandomChar();
				groundTruth[y][x] = null;
				cellRevealTime[y][x] = 0;
				cellScrambleOffset[y][x] = Math.random() * 100; // Random phase offset for staggered animation
			}
		}

		// Place phrases deterministically
		placePhrases();
		isInitialized = true;
	}

	function placePhrases() {
		const rng = seededRandom(12345);
		const placed: { x: number; y: number; width: number }[] = [];

		// Place each phrase multiple times across the grid
		for (let repeat = 0; repeat < 4; repeat++) {
			for (const phrase of phrases) {
				let attempts = 0;
				const maxAttempts = 80;

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
							Math.abs(y - p.y) <= 1 &&
							x < p.x + p.width + 2 &&
							x + phrase.length + 2 > p.x
						) {
							overlaps = true;
							break;
						}
					}

					if (!overlaps && x >= 0 && x + phrase.length < cols) {
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
		if (!ctx || !isInitialized || cols === 0 || rows === 0 || !containerEl) return;

		const rect = containerEl.getBoundingClientRect();
		ctx.clearRect(0, 0, rect.width, rect.height);

		const now = Date.now();
		frameCount++;

		ctx.font = '11px "JetBrains Mono", monospace';
		ctx.textBaseline = 'top';

		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				const cellX = x * CELL_WIDTH;
				const cellY = y * CELL_HEIGHT;

				const dx = cellX + CELL_WIDTH / 2 - mouseX;
				const dy = cellY + CELL_HEIGHT / 2 - mouseY;
				const dist = Math.sqrt(dx * dx + dy * dy);

				const truthChar = groundTruth[y]?.[x];
				const timeSinceReveal = now - (cellRevealTime[y]?.[x] || 0);
				const offset = cellScrambleOffset[y]?.[x] || 0;

				let char: string;
				let color: string;

				if (dist < REVEAL_RADIUS) {
					// Within hover radius - radial gradient reveal
					cellRevealTime[y][x] = now;
					const intensity = 1 - dist / REVEAL_RADIUS;
					const easedIntensity = intensity * intensity; // Quadratic falloff for smoother gradient

					if (truthChar) {
						// Reveal the actual character - bright green with radial gradient
						char = truthChar;
						const alpha = 0.5 + easedIntensity * 0.5;
						color = `rgba(52, 211, 153, ${alpha})`;
					} else {
						// No phrase here - show active scrambling effect near cursor
						if (Math.random() < 0.15 + easedIntensity * 0.3) {
							grid[y][x] = getRandomChar();
						}
						char = grid[y]?.[x] || ' ';
						const alpha = BASE_OPACITY + easedIntensity * 0.25;
						color = `rgba(74, 222, 128, ${alpha})`;
					}
				} else if (timeSinceReveal < DECAY_TIME && truthChar) {
					// Decaying from revealed state
					const decay = timeSinceReveal / DECAY_TIME;
					const eased = decay * decay;

					if (eased < 0.5) {
						char = truthChar;
						const alpha = 0.7 * (1 - eased * 2);
						color = `rgba(52, 211, 153, ${alpha})`;
					} else {
						// Transition back to scrambled
						const scrambleProgress = (eased - 0.5) * 2;
						if (Math.random() < 0.1 + scrambleProgress * 0.4) {
							grid[y][x] = getRandomChar();
						}
						char = grid[y]?.[x] || getRandomChar();
						const alpha = BASE_OPACITY * (1 - scrambleProgress * 0.5);
						color = `rgba(74, 222, 128, ${Math.max(BASE_OPACITY * 0.5, alpha)})`;
					}
				} else {
					// Default state - cyphertext effect with random changes
					if (!isReducedMotion && Math.random() < SCRAMBLE_RATE) {
						grid[y][x] = getRandomChar();
					}
					char = grid[y]?.[x] || ' ';
					// Subtle variation in brightness
					const alpha = BASE_OPACITY + (Math.random() * 0.03);
					color = `rgba(74, 222, 128, ${alpha})`;
				}

				ctx.fillStyle = color;
				ctx.fillText(char, cellX, cellY);
			}
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (isReducedMotion || !containerEl) return;

		const rect = containerEl.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
	}

	function handleMouseLeave() {
		mouseX = -1000;
		mouseY = -1000;
	}

	function handleResize() {
		if (!browser) return;
		initializeGrid();
		setupCanvas();
		render();
	}

	function startAnimation() {
		if (animationId !== null) return;

		let lastLog = 0;
		function animate() {
			render();
			// Log every 5 seconds to confirm animation is running
			if (Date.now() - lastLog > 5000) {
				console.log('DecryptingGutter: animation running, frame', frameCount);
				lastLog = Date.now();
			}
			animationId = requestAnimationFrame(animate);
		}

		animationId = requestAnimationFrame(animate);
	}

	function stopAnimation() {
		if (animationId !== null) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}
	}

	onMount(() => {
		if (!browser) return;

		// Check for reduced motion preference
		// Note: Set to false to force animation even with reduced motion preference
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		isReducedMotion = false; // mediaQuery.matches;

		mediaQuery.addEventListener('change', (e) => {
			isReducedMotion = e.matches;
			if (isReducedMotion) {
				stopAnimation();
				render();
			} else {
				startAnimation();
			}
		});

		// Initialize after a brief delay to ensure DOM is ready
		const initTimeout = setTimeout(() => {
			if (containerEl && canvasEl) {
				initializeGrid();
				setupCanvas();
				render();

				console.log('DecryptingGutter: initialized', { isReducedMotion, cols, rows });

				if (!isReducedMotion) {
					startAnimation();
					console.log('DecryptingGutter: animation started');
				}
			}
		}, 50);

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			clearTimeout(initTimeout);
		};
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseleave', handleMouseLeave);
			stopAnimation();
		}
	});
</script>

<div
	bind:this={containerEl}
	class="fixed inset-0 z-0 overflow-hidden pointer-events-none"
	role="presentation"
	aria-hidden="true"
>
	<canvas
		bind:this={canvasEl}
		class="absolute inset-0 w-full h-full"
	></canvas>
</div>
