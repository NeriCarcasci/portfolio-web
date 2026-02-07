# About Page Logo Assets

This directory contains logo assets used on the /about page.

## Required Logo Files

The following logo files need to be added to this directory:

### 1. Red Hat Logo
- **Filename:** `redhat.svg`
- **Format:** SVG (vector, recommended) or transparent PNG
- **Source:** [Red Hat Brand Portal](https://www.redhat.com/en/about/brand/standards/logo) or official Red Hat media kit
- **Color:** Preferably white/monochrome version for dark background
- **Usage:** Represents work with Red Hat's Trusted AI team

### 2. TU Dublin Logo
- **Filename:** `tudublin.svg`
- **Format:** SVG or transparent PNG
- **Source:** [TU Dublin Brand Guidelines](https://www.tudublin.ie/about/brand-guidelines/) or official university media resources
- **Color:** White/monochrome version preferred
- **Usage:** Represents current BSc (Hons) in Computing with ML & AI

### 3. Enterprise Ireland / New Frontiers Logo
- **Filename:** `enterprise-ireland.svg`
- **Format:** SVG or transparent PNG
- **Source:** [Enterprise Ireland Brand Centre](https://www.enterprise-ireland.com/) or New Frontiers programme materials
- **Color:** White/monochrome version preferred
- **Usage:** Represents New Frontiers programme support for startup work

### 4. ISEF Logo
- **Filename:** `isef.svg`
- **Format:** SVG or transparent PNG
- **Source:** [Intel ISEF official website](https://www.societyforscience.org/isef/) or official competition materials
- **Color:** White/monochrome version preferred
- **Usage:** Represents recognition/participation in Intel International Science and Engineering Fair

## Design Guidelines

All logos should follow these specifications:

- **Format:** SVG preferred for scalability; PNG (transparent background) acceptable
- **Color scheme:** White/light monochrome versions work best against the dark site background
- **Size:** Logos will be automatically scaled to max-height: 4rem (64px) and max-width: 100%
- **Aspect ratio:** Original aspect ratios will be preserved
- **Filters:** Logos are displayed with:
  - Default: 40% opacity + grayscale
  - On hover: 90% opacity + color restored + emerald accent

## Fallback

If an official logo is unavailable or restricted by brand guidelines:
- Use text-based alternatives
- Ensure proper licensing/permission for any logo usage
- Follow each organization's brand guidelines for proper usage

## Usage in Code

These logos are referenced in `/src/routes/about/+page.svelte`:

```svelte
const recognitions = [
  { name: 'Red Hat', img: '/about/redhat.svg', alt: 'Red Hat' },
  { name: 'TU Dublin', img: '/about/tudublin.svg', alt: 'TU Dublin' },
  { name: 'Enterprise Ireland', img: '/about/enterprise-ireland.svg', alt: 'Enterprise Ireland New Frontiers' },
  { name: 'ISEF', img: '/about/isef.svg', alt: 'ISEF' }
];
```

## Alternative: Using Placeholder Images

For development/testing, you can temporarily use placeholder images or text-based alternatives until official logos are obtained.
