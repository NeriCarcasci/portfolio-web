# About Page Logo Assets

This directory contains logo assets for the about page recognitions section.

## Current Assets

### Existing Files
- `redhat.svg` - Red Hat logo (correctly named)
- `tudublin.jpg` - TU Dublin logo (correctly named)
- `newfrontiers.jpg` - Enterprise Ireland New Frontiers logo (correctly named)
- `isef.png` - ISEF logo (correctly named)
- `eireplan.png` - Eireplan company logo
- `ey.webp` - Ernst & Young logo
- `frensei.jpg` - Frensei company logo
- `udacity.png` - Udacity certification logo

### Required Assets (To Be Added)
The following logo files are referenced in the about page but need to be added:

- `educatingeire.png` - Educating Éire company logo

## Sourcing Logos

### Brand Guidelines
When adding logos, ensure you:
1. Use official brand assets from the respective company's brand/press kit
2. Prefer SVG format for scalability (use PNG/JPG only if SVG unavailable)
3. Use transparent backgrounds where possible
4. Maintain adequate padding/clearspace as per brand guidelines
5. Do not modify colors or proportions

### Recommended Sources
- **Red Hat**: https://www.redhat.com/en/about/brand/standards/logo
- **TU Dublin**: University brand portal
- **Enterprise Ireland**: https://www.enterprise-ireland.com
- **ISEF**: https://www.societyforscience.org/isef/
- **Eireplan**: Company brand assets
- **Educating Éire**: Company brand assets
- **EY**: https://www.ey.com/en_gl/news/media-resources
- **Frensei**: Company brand assets
- **Udacity**: https://www.udacity.com/press

## Technical Specifications

### Display Specs
- Timeline logos: 160×160px container (md screens), 128×128px (mobile)
- Achievement logos: 80×80px container
- Education logo: 160×160px container (md screens), 128×128px (mobile)
- All logos use `object-contain` to preserve aspect ratio
- White background with shadow-lg styling

### File Naming
- Use lowercase
- No spaces (use hyphens for multi-word names)
- Prefer `.svg` extension (fallback to `.png` or `.jpg`)
- Match the filename exactly as referenced in the code

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
