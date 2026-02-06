<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { about } from '$content/about';

	// Props
	interface Props {
		showHero?: boolean;
		maskCenterColumn?: boolean;
	}
	let { showHero = false, maskCenterColumn = false }: Props = $props();

	// Phrases to reveal on hover (scattered in background)
	const phrases = [
		'BSc (Hons) Computing — ML & AI',
		'Cloud-Native Systems Engineering',
		'Trustworthy and Responsible AI',
		'Founder-Engineer',
		'LLM Safety',
		'Entrepreneur',
		'Backend Engineering for ML Systems',
		'Responsible AI & Model Governance',
		'Production ML Systems',
		'Sofware Engineer'
	];

	// Hero content - rendered directly on canvas
	function obfuscateEmail(email: string): string {
		return email.replace('@', ' [at] ').replace(/\./g, ' (dot) ');
	}

	const heroContent = {
		name: 'Neri Carcasci',
		role: 'Software & AI Engineer',
		taglines: ['Reliable systems.', 'Practical AI.', 'Usable Solutions.'],
		email: { text: obfuscateEmail(about.email), href: `mailto:${about.email}` }
	};

	// Font sizes for hero elements
	const HERO_NAME_SIZE = 56;
	const HERO_ROLE_SIZE = 24;
	const HERO_TAGLINE_SIZE = 18;
	const HERO_EMAIL_SIZE = 14;

	// Random character set
	const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>[]{}';

	// Grid configuration
	const CELL_WIDTH = 10;
	const CELL_HEIGHT = 16;
	const REVEAL_RADIUS = 150;
	const DECAY_TIME = 800;
	const SCRAMBLE_RATE = 0.005;
	const BASE_OPACITY = 0.12;
	const CONTENT_COLUMN_MAX = 1040; // Approx max content width (center column)
	const CONTENT_GUTTER_FADE = 90; // Width of fade zone into the column
	const CONTENT_EDGE_NOISE = 70; // Ragged edge variation in px

	// Hero animation config
	const HERO_REVEAL_DURATION = 2500; // 2.5 seconds to reveal from cyphertext
	const HERO_HOVER_RADIUS = 80; // Closer trigger for hero glow
	const HERO_EDGE_NOISE = 25; // Pixels of ragged edge variation
	const SCROLL_FADE_START = 300; // Start fading after 300px scroll (delayed until content is closer)
	const SCROLL_FADE_END = 800; // Fully covered by 800px scroll (slower, more control)
	const TARGET_FPS_IDLE = 30;
	const TARGET_FPS_ACTIVE = 60;
	const POINTER_ACTIVE_WINDOW = 200;

	// Element refs
	let containerEl: HTMLDivElement | undefined;
	let canvasEl: HTMLCanvasElement | undefined;

	// Internal state
	let ctx: CanvasRenderingContext2D | null = null;
	let cols = 0;
	let rows = 0;
	let canvasWidth = 0;
	let canvasHeight = 0;
	let grid: string[][] = [];
	let groundTruth: (string | null)[][] = [];
	let cellRevealTime: number[][] = [];
	let cellScrambleOffset: number[][] = [];
	let heroReservedCells: Set<string> = new Set();
	let mouseX = -1000;
	let mouseY = -1000;
	let animationId: number | null = null;
	let isReducedMotion = false;
	let isInitialized = false;
	let frameCount = 0;
	let animationStartTime = 0;
	let lastFrameTime = 0;
	let isPageVisible = true;
	let lastPointerTime = 0;
	let heroEdgeNoise: Map<string, number> = new Map(); // Stores noise values for ragged edges
	let scrollY = 0; // Track scroll position for fade effect
	let smoothScrollY = 0; // Interpolated scroll for smooth animations
	const SCROLL_LERP = 0.35; // How fast smooth scroll catches up (0-1, higher = more responsive to scroll speed)

	// Hero element positions for click overlays
	let heroPositions = $state<{
		email: { x: number; y: number; width: number; height: number; href: string } | null;
	}>({ email: null });

	// Track which hero element is hovered
	let hoveredHeroElement = $state<string | null>(null);

	function seededRandom(seed: number): () => number {
		return function () {
			seed = (seed * 1103515245 + 12345) & 0x7fffffff;
			return seed / 0x7fffffff;
		};
	}

	function getRandomChar(): string {
		return randomChars[Math.floor(Math.random() * randomChars.length)];
	}

	function measureText(text: string, fontSize: number): number {
		if (!ctx) return text.length * fontSize * 0.6;
		ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
		return ctx.measureText(text).width;
	}

	// Simple noise function for ragged edges
	function getEdgeNoise(col: number, row: number): number {
		const key = `${col},${row}`;
		if (!heroEdgeNoise.has(key)) {
			// Seeded random based on position for consistency
			const seed = col * 7919 + row * 6271;
			const noise = ((Math.sin(seed) * 43758.5453) % 1);
			heroEdgeNoise.set(key, Math.abs(noise));
		}
		return heroEdgeNoise.get(key)!;
	}

	function getGutterNoise(col: number, row: number): number {
		// Deterministic noise for staggered gutter edges
		const seed = col * 9157 + row * 3923 + 117;
		return Math.abs((Math.sin(seed) * 43758.5453) % 1);
	}

	function getGutterMaskAlpha(cellX: number, col: number, row: number): number {
		if (!maskCenterColumn) return 1;
		if (canvasWidth === 0) return 1;
		const centerX = canvasWidth / 2;
		const maxWidth = Math.min(CONTENT_COLUMN_MAX, canvasWidth * 0.88);
		const baseHalf = maxWidth / 2;

		const noise = getGutterNoise(col, row);
		const raggedOffset = (noise - 0.5) * CONTENT_EDGE_NOISE;

		const dx = Math.abs(cellX - centerX);
		const inner = Math.max(0, baseHalf - CONTENT_GUTTER_FADE);
		const outer = Math.max(inner + 1, baseHalf + CONTENT_GUTTER_FADE + raggedOffset);

		if (dx <= inner) return 0;
		if (dx >= outer) return 1;

		const t = (dx - inner) / (outer - inner);
		const jitter = (getGutterNoise(col + 13, row + 7) - 0.5) * 0.35;
		return Math.max(0, Math.min(1, t + jitter));
	}

	function reserveHeroArea(x: number, y: number, width: number, height: number) {
		// Tight core area (always reserved - where text actually is)
		const tightPadding = 5;
		const coreStartCol = Math.floor((x + tightPadding) / CELL_WIDTH);
		const coreEndCol = Math.ceil((x + width - tightPadding) / CELL_WIDTH);
		const coreStartRow = Math.floor((y + tightPadding / 2) / CELL_HEIGHT);
		const coreEndRow = Math.ceil((y + height - tightPadding / 2) / CELL_HEIGHT);

		// Extended area for ragged edges
		const extStartCol = Math.floor((x - HERO_EDGE_NOISE) / CELL_WIDTH);
		const extEndCol = Math.ceil((x + width + HERO_EDGE_NOISE) / CELL_WIDTH);
		const extStartRow = Math.floor((y - HERO_EDGE_NOISE / 2) / CELL_HEIGHT);
		const extEndRow = Math.ceil((y + height + HERO_EDGE_NOISE / 2) / CELL_HEIGHT);

		for (let row = extStartRow; row <= extEndRow; row++) {
			for (let col = extStartCol; col <= extEndCol; col++) {
				if (row >= 0 && row < rows && col >= 0 && col < cols) {
					const isCore = col >= coreStartCol && col <= coreEndCol &&
								   row >= coreStartRow && row <= coreEndRow;

					if (isCore) {
						// Core area - mostly reserved but allow some cyphertext to peek through at edges
						const distToEdge = Math.min(
							col - coreStartCol,
							coreEndCol - col,
							row - coreStartRow,
							coreEndRow - row
						);
						if (distToEdge <= 1) {
							// Very edge of core - allow some noise
							const noise = getEdgeNoise(col, row);
							if (noise > 0.7) {
								heroReservedCells.add(`${col},${row}`);
							}
							// else: let cyphertext show through
						} else {
							heroReservedCells.add(`${col},${row}`);
						}
					} else {
						// Extended edge area - sparse reservation for ragged look
						const noise = getEdgeNoise(col, row);
						if (noise > 0.6) {
							heroReservedCells.add(`${col},${row}`);
						}
					}
				}
			}
		}
	}

	function initializeGrid() {
		if (!browser || !containerEl) return;

		const rect = containerEl.getBoundingClientRect();
		canvasWidth = rect.width;
		canvasHeight = rect.height;
		cols = Math.floor(rect.width / CELL_WIDTH);
		rows = Math.floor(rect.height / CELL_HEIGHT);

		cols = Math.min(cols, 300);
		rows = Math.min(rows, 150);

		if (cols <= 0 || rows <= 0) return;

		grid = [];
		groundTruth = [];
		cellRevealTime = [];
		cellScrambleOffset = [];
		heroReservedCells = new Set();
		heroEdgeNoise = new Map();
		if (animationStartTime === 0) {
			animationStartTime = Date.now();
		}

		for (let y = 0; y < rows; y++) {
			grid[y] = [];
			groundTruth[y] = [];
			cellRevealTime[y] = [];
			cellScrambleOffset[y] = [];
			for (let x = 0; x < cols; x++) {
				grid[y][x] = getRandomChar();
				groundTruth[y][x] = null;
				cellRevealTime[y][x] = 0;
				cellScrambleOffset[y][x] = Math.random() * 100;
			}
		}

		placePhrases();
		calculateHeroPositions();
		isInitialized = true;
	}

	function calculateHeroPositions() {
		if (!ctx || canvasWidth === 0 || canvasHeight === 0 || !showHero) return;

		const centerX = canvasWidth / 2;
		// Position hero in upper portion of screen (around 25% from top)
		const startY = canvasHeight * 0.25;

		let currentY = startY;
		const lineSpacing = 1.4;
		const sectionSpacing = 20;

		// Name
		const nameWidth = measureText(heroContent.name, HERO_NAME_SIZE);
		reserveHeroArea(centerX - nameWidth / 2, currentY, nameWidth, HERO_NAME_SIZE);
		currentY += HERO_NAME_SIZE * lineSpacing;

		// Role
		currentY += sectionSpacing / 2;
		const roleWidth = measureText(heroContent.role, HERO_ROLE_SIZE);
		reserveHeroArea(centerX - roleWidth / 2, currentY, roleWidth, HERO_ROLE_SIZE);
		currentY += HERO_ROLE_SIZE * lineSpacing;

		// Taglines
		currentY += sectionSpacing;
		for (const tagline of heroContent.taglines) {
			const tagWidth = measureText(tagline, HERO_TAGLINE_SIZE);
			reserveHeroArea(centerX - tagWidth / 2, currentY, tagWidth, HERO_TAGLINE_SIZE);
			currentY += HERO_TAGLINE_SIZE * lineSpacing;
		}

		// Email
		currentY += sectionSpacing;
		const emailWidth = measureText(heroContent.email.text, HERO_EMAIL_SIZE);
		reserveHeroArea(centerX - emailWidth / 2, currentY, emailWidth, HERO_EMAIL_SIZE);
		const emailY = currentY;
		currentY += HERO_EMAIL_SIZE * lineSpacing;

		heroPositions = {
			email: {
				x: centerX - emailWidth / 2,
				y: emailY,
				width: emailWidth,
				height: HERO_EMAIL_SIZE * 2,
				href: heroContent.email.href
			}
		};
	}

	function placePhrases() {
		const rng = seededRandom(12345);
		const placed: { x: number; y: number; width: number }[] = [];

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

	function isNearMouse(x: number, y: number, width: number, height: number, radius: number): number {
		const centerX = x + width / 2;
		const centerY = y + height / 2;
		const dx = centerX - mouseX;
		const dy = centerY - mouseY;
		const dist = Math.sqrt(dx * dx + dy * dy);
		const maxDist = Math.max(width, height) / 2 + radius;
		return Math.max(0, 1 - dist / maxDist);
	}

	// Easing function for smooth transitions
	function easeOutCubic(t: number): number {
		return 1 - Math.pow(1 - t, 3);
	}

	// Get scroll-based fade progress (0 = fully visible, 1 = fully faded)
	function getScrollFadeProgress(): number {
		if (smoothScrollY <= SCROLL_FADE_START) return 0;
		if (smoothScrollY >= SCROLL_FADE_END) return 1;
		const linear = (smoothScrollY - SCROLL_FADE_START) / (SCROLL_FADE_END - SCROLL_FADE_START);
		return easeOutCubic(linear);
	}

	// Calculate hero visibility (0 = hidden, 1 = fully visible)
	// Combines reveal animation (wave descends) with scroll fade (wave ascends)
	function getHeroVisibility(): { effectiveVisibility: number } {
		const timeSinceStart = Date.now() - animationStartTime;
		const revealProgress = Math.min(1, timeSinceStart / HERO_REVEAL_DURATION);
		const scrollProgress = getScrollFadeProgress();

		// Effective visibility: revealed by time, hidden by scroll
		const effectiveVisibility = Math.max(0, revealProgress - scrollProgress);

		return { effectiveVisibility };
	}

	// Calculate wave position for clipping - works for both reveal and scroll fade
	// effectiveVisibility: 0 = nothing visible (wave at top), 1 = everything visible (wave at bottom)
	function getWavePosition(effectiveVisibility: number): number {
		const heroTopY = canvasHeight * 0.25 - 30; // Start slightly above hero
		const heroBottomY = canvasHeight * 0.25 + 350;
		const heroHeight = heroBottomY - heroTopY;

		// Wave moves from top to bottom as visibility increases
		return heroTopY + effectiveVisibility * heroHeight;
	}

	// Get wave Y position at a given X coordinate (teeth pattern - stepped at cell boundaries)
	function getWaveYAtX(baseWaveY: number, x: number): number {
		// Calculate which cell column we're in
		const cellIndex = Math.floor(x / CELL_WIDTH);

		// Seeded random for consistent teeth pattern (same teeth every frame)
		const seed = cellIndex * 7919 + 1234;
		const noise = Math.abs((Math.sin(seed) * 43758.5453) % 1);

		// Teeth height: mostly flat with occasional teeth of 1-2 cells
		// 60% flat, 25% one cell, 15% two cells
		let teethHeight = 0;
		if (noise > 0.6) {
			teethHeight = noise > 0.85 ? 2 : 1;
			// Randomly up or down based on another seed
			const dirSeed = cellIndex * 6271 + 5678;
			const dir = Math.sin(dirSeed) > 0 ? 1 : -1;
			teethHeight *= dir;
		}

		return baseWaveY + teethHeight * CELL_HEIGHT;
	}

	function renderHeroContent(waveY: number) {
		if (!ctx || canvasWidth === 0 || canvasHeight === 0 || !showHero) return;

		const { effectiveVisibility } = getHeroVisibility();

		// If nothing visible, don't render
		if (effectiveVisibility <= 0) return;

		const centerX = canvasWidth / 2;
		const startY = canvasHeight * 0.25;
		let currentY = startY;
		const lineSpacing = 1.4;
		const sectionSpacing = 20;

		// Save context state before clipping
		ctx.save();

		// Always clip to wave - hero only renders ABOVE the wave
		// This handles both reveal (wave descends) and scroll fade (wave ascends)
		if (effectiveVisibility < 1) {
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(canvasWidth, 0);
			// Draw wave line from right to left
			for (let x = canvasWidth; x >= 0; x -= 5) {
				const y = getWaveYAtX(waveY, x);
				ctx.lineTo(x, y);
			}
			ctx.lineTo(0, 0);
			ctx.closePath();
			ctx.clip();
		}

		ctx.textBaseline = 'top';
		ctx.textAlign = 'center';

		// Calculate glow intensity based on mouse proximity
		const heroProximity = isNearMouse(centerX - 150, startY, 300, 280, HERO_HOVER_RADIUS);
		const glowIntensity = heroProximity * 0.6 * effectiveVisibility;

		// Name - largest (no scrambling, just wave reveal)
		ctx.font = `bold ${HERO_NAME_SIZE}px "JetBrains Mono", monospace`;
		const nameAlpha = 0.85 + glowIntensity * 0.15;
		ctx.fillStyle = `rgba(52, 211, 153, ${nameAlpha})`;
		if (glowIntensity > 0.2) {
			ctx.shadowColor = 'rgba(52, 211, 153, 0.6)';
			ctx.shadowBlur = 15 + glowIntensity * 25;
		}
		ctx.fillText(heroContent.name, centerX, currentY);
		ctx.shadowBlur = 0;
		currentY += HERO_NAME_SIZE * lineSpacing;

		// Role
		currentY += sectionSpacing / 2;
		ctx.font = `${HERO_ROLE_SIZE}px "JetBrains Mono", monospace`;
		const roleAlpha = 0.75 + glowIntensity * 0.2;
		ctx.fillStyle = `rgba(52, 211, 153, ${roleAlpha})`;
		if (glowIntensity > 0.2) {
			ctx.shadowColor = 'rgba(52, 211, 153, 0.4)';
			ctx.shadowBlur = 12 + glowIntensity * 18;
		}
		ctx.fillText(heroContent.role, centerX, currentY);
		ctx.shadowBlur = 0;
		currentY += HERO_ROLE_SIZE * lineSpacing;

		// Taglines
		currentY += sectionSpacing;
		ctx.font = `${HERO_TAGLINE_SIZE}px "JetBrains Mono", monospace`;
		heroContent.taglines.forEach((tagline) => {
			const tagAlpha = 0.65 + glowIntensity * 0.25;
			ctx.fillStyle = `rgba(52, 211, 153, ${tagAlpha})`;
			if (glowIntensity > 0.2) {
				ctx.shadowColor = 'rgba(52, 211, 153, 0.3)';
				ctx.shadowBlur = 8 + glowIntensity * 12;
			}
			ctx.fillText(tagline, centerX, currentY);
			ctx.shadowBlur = 0;
			currentY += HERO_TAGLINE_SIZE * lineSpacing;
		});

		// Email
		currentY += sectionSpacing;
		ctx.font = `${HERO_EMAIL_SIZE}px "JetBrains Mono", monospace`;
		const emailHovered = hoveredHeroElement === 'email' && effectiveVisibility > 0.5;
		const emailAlpha = emailHovered ? 0.9 : 0.5 + glowIntensity * 0.25;
		ctx.fillStyle = `rgba(52, 211, 153, ${emailAlpha})`;
		if (emailHovered) {
			ctx.shadowColor = 'rgba(52, 211, 153, 0.5)';
			ctx.shadowBlur = 12;
		}
		ctx.fillText(heroContent.email.text, centerX, currentY);
		ctx.shadowBlur = 0;

		// Restore context (removes clipping)
		ctx.restore();
	}

	function render() {
		if (!ctx || !isInitialized || cols === 0 || rows === 0 || !containerEl) return;

		const rect = containerEl.getBoundingClientRect();
		ctx.clearRect(0, 0, rect.width, rect.height);

		const now = Date.now();
		frameCount++;

		// Smooth scroll interpolation (lerp)
		smoothScrollY += (scrollY - smoothScrollY) * SCROLL_LERP;

		const { effectiveVisibility } = getHeroVisibility();

		ctx.font = '11px "JetBrains Mono", monospace';
		ctx.textBaseline = 'top';
		ctx.textAlign = 'left';

		// Calculate wave position based on effective visibility
		// Works for both reveal (wave descends to show hero) and scroll fade (wave ascends to hide hero)
		const baseWaveY = getWavePosition(effectiveVisibility);

		// Render background cyphertext grid
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				const cellX = x * CELL_WIDTH;
				const cellY = y * CELL_HEIGHT;
				const gutterAlpha = getGutterMaskAlpha(cellX, x, y);
				if (gutterAlpha <= 0) {
					continue;
				}

				const isHeroCell = showHero && heroReservedCells.has(`${x},${y}`);

				// For hero cells, determine if cyphertext should show based on wave position
				if (isHeroCell) {
					if (effectiveVisibility >= 1) continue; // Hero fully visible, skip cyphertext here

					// Cyphertext shows below the wave line
					// Use same wave function as clipping for perfect alignment
					const waveYAtCell = getWaveYAtX(baseWaveY, cellX);

					if (cellY < waveYAtCell) continue; // Above wave, hero is visible here
				}

				const dx = cellX + CELL_WIDTH / 2 - mouseX;
				const dy = cellY + CELL_HEIGHT / 2 - mouseY;
				const dist = Math.sqrt(dx * dx + dy * dy);

				const truthChar = groundTruth[y]?.[x];
				const timeSinceReveal = now - (cellRevealTime[y]?.[x] || 0);

				let char: string;
				let color: string;

				if (dist < REVEAL_RADIUS) {
					cellRevealTime[y][x] = now;
					const intensity = 1 - dist / REVEAL_RADIUS;
					const easedIntensity = intensity * intensity;

					if (truthChar) {
						char = truthChar;
						const alpha = 0.5 + easedIntensity * 0.5;
						color = `rgba(52, 211, 153, ${alpha})`;
					} else {
						if (Math.random() < 0.15 + easedIntensity * 0.3) {
							grid[y][x] = getRandomChar();
						}
						char = grid[y]?.[x] || ' ';
						const alpha = BASE_OPACITY + easedIntensity * 0.25;
						color = `rgba(74, 222, 128, ${alpha})`;
					}
				} else if (timeSinceReveal < DECAY_TIME && truthChar) {
					const decay = timeSinceReveal / DECAY_TIME;
					const eased = decay * decay;

					if (eased < 0.5) {
						char = truthChar;
						const alpha = 0.7 * (1 - eased * 2);
						color = `rgba(52, 211, 153, ${alpha})`;
					} else {
						const scrambleProgress = (eased - 0.5) * 2;
						if (Math.random() < 0.1 + scrambleProgress * 0.4) {
							grid[y][x] = getRandomChar();
						}
						char = grid[y]?.[x] || getRandomChar();
						const alpha = BASE_OPACITY * (1 - scrambleProgress * 0.5);
						color = `rgba(74, 222, 128, ${Math.max(BASE_OPACITY * 0.5, alpha)})`;
					}
				} else {
					if (!isReducedMotion && Math.random() < SCRAMBLE_RATE) {
						grid[y][x] = getRandomChar();
					}
					char = grid[y]?.[x] || ' ';
					const alpha = BASE_OPACITY + Math.random() * 0.03;
					color = `rgba(74, 222, 128, ${alpha})`;
				}

				ctx.fillStyle = color;
				const prevAlpha = ctx.globalAlpha;
				ctx.globalAlpha = prevAlpha * gutterAlpha;
				ctx.fillText(char, cellX, cellY);
				ctx.globalAlpha = prevAlpha;
			}
		}

		// Render hero content on top (only on home page)
		// Uses same wave position for clipping so hero and cyphertext align perfectly
		if (showHero) {
			renderHeroContent(baseWaveY);
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (!containerEl) return;

		const rect = containerEl.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
		lastPointerTime = performance.now();

		// Check if hovering over hero interactive elements
		hoveredHeroElement = null;

		if (!showHero) return;

		if (heroPositions.email) {
			const email = heroPositions.email;
			if (
				mouseX >= email.x &&
				mouseX <= email.x + email.width &&
				mouseY >= email.y &&
				mouseY <= email.y + email.height
			) {
				hoveredHeroElement = 'email';
			}
		}

	}

	function handleMouseLeave() {
		mouseX = -1000;
		mouseY = -1000;
		hoveredHeroElement = null;
	}

	function handleScroll() {
		scrollY = window.scrollY;
	}

	function handleVisibilityChange() {
		isPageVisible = !document.hidden;
		if (!isPageVisible || isReducedMotion) {
			stopAnimation();
			return;
		}
		startAnimation();
	}

	function handleClick(e: MouseEvent) {
		if (!containerEl || !showHero) return;

		const rect = containerEl.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const clickY = e.clientY - rect.top;

		// Check email
		if (heroPositions.email) {
			const email = heroPositions.email;
			if (
				clickX >= email.x &&
				clickX <= email.x + email.width &&
				clickY >= email.y &&
				clickY <= email.y + email.height
			) {
				window.location.href = email.href;
				return;
			}
		}

	}

	function handleResize() {
		if (!browser) return;
		initializeGrid();
		setupCanvas();
		render();
	}

	function startAnimation() {
		if (animationId !== null) return;
		lastFrameTime = 0;

		function getFrameInterval(time: number) {
			const active = time - lastPointerTime < POINTER_ACTIVE_WINDOW;
			const fps = active ? TARGET_FPS_ACTIVE : TARGET_FPS_IDLE;
			return 1000 / fps;
		}

		function animate(time: number) {
			if (time - lastFrameTime < getFrameInterval(time)) {
				animationId = requestAnimationFrame(animate);
				return;
			}

			lastFrameTime = time;
			render();
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

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		isReducedMotion = mediaQuery.matches;

		mediaQuery.addEventListener('change', (e) => {
			isReducedMotion = e.matches;
			if (isReducedMotion) {
				stopAnimation();
				render();
			} else {
				startAnimation();
			}
		});

		const initTimeout = setTimeout(() => {
			if (containerEl && canvasEl) {
				setupCanvas();
				initializeGrid();
				render();

				if (!isReducedMotion && isPageVisible) {
					startAnimation();
				}
			}
		}, 50);

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		window.addEventListener('scroll', handleScroll, { passive: true });
		document.addEventListener('mouseleave', handleMouseLeave);
		document.addEventListener('visibilitychange', handleVisibilityChange);

		// Initialize scroll position
		scrollY = window.scrollY;
		handleVisibilityChange();

		return () => {
			clearTimeout(initTimeout);
		};
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('mouseleave', handleMouseLeave);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			stopAnimation();
		}
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div
	bind:this={containerEl}
	class="fixed inset-0 z-0 overflow-hidden"
	onclick={handleClick}
	style="cursor: {hoveredHeroElement ? 'pointer' : 'default'}"
>
	<canvas bind:this={canvasEl} class="absolute inset-0 w-full h-full"></canvas>
</div>
