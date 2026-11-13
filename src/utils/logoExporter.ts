export type LogoVariantId =
  | 'icon-transparent'
  | 'avatar-dark'
  | 'avatar-light'
  | 'wordmark-white-transparent'
  | 'wordmark-dark-transparent'
  | 'full-tagline-dark'
  | 'social-banner';

export interface LogoAssetSpec {
  id: LogoVariantId;
  title: string;
  subtitle: string;
  platforms: string;
  previewBg: 'checker-dark' | 'checker-light' | 'obsidian' | 'white';
  pngWidth: number;
  pngHeight: number;
  fileBaseName: string;
  supportsSvg: boolean;
}

export const LOGO_ASSETS: LogoAssetSpec[] = [
  {
    id: 'avatar-dark',
    title: 'Avatar Profil Social Media (Dark)',
    subtitle: 'Simbolul Crystal Q pe fundal Midnight Obsidian (#06090E) cu reflexie cyan',
    platforms: 'Instagram · TikTok · YouTube · LinkedIn · WhatsApp Business',
    previewBg: 'obsidian',
    pngWidth: 1080,
    pngHeight: 1080,
    fileBaseName: 'kromaq-avatar-dark-1080x1080',
    supportsSvg: true,
  },
  {
    id: 'icon-transparent',
    title: 'Iconiță Crystal Q (Transparent)',
    subtitle: 'Simbol vectorial fără fundal pentru watermark video, Reels & grafică',
    platforms: 'CapCut · Premiere Pro · After Effects · Canva · Figma',
    previewBg: 'checker-dark',
    pngWidth: 1024,
    pngHeight: 1024,
    fileBaseName: 'kromaq-icon-q-transparent',
    supportsSvg: true,
  },
  {
    id: 'avatar-light',
    title: 'Avatar Profil (Light / Print)',
    subtitle: 'Simbolul Crystal Q pe fundal alb curat pentru profile light și documente',
    platforms: 'Google Business · Facturi · Documente Oficiale',
    previewBg: 'white',
    pngWidth: 1080,
    pngHeight: 1080,
    fileBaseName: 'kromaq-avatar-light-1080x1080',
    supportsSvg: true,
  },
  {
    id: 'wordmark-white-transparent',
    title: 'Logo Complet KROMAQ (Alb · Transparent)',
    subtitle: 'Wordmark alb cu A geometric și Crystal Q pe fundal transparent',
    platforms: 'Video Outros · Prezentări Dark · Header Site · Parteneriate',
    previewBg: 'checker-dark',
    pngWidth: 2400,
    pngHeight: 640,
    fileBaseName: 'kromaq-logo-alb-transparent',
    supportsSvg: true,
  },
  {
    id: 'wordmark-dark-transparent',
    title: 'Logo Complet KROMAQ (Negru · Transparent)',
    subtitle: 'Wordmark obsidian (#06090E) cu Crystal Q pentru fundaluri deschise',
    platforms: 'Contracte PDF · Antet Oferte · Print · Tricouri Albe',
    previewBg: 'checker-light',
    pngWidth: 2400,
    pngHeight: 640,
    fileBaseName: 'kromaq-logo-negru-transparent',
    supportsSvg: true,
  },
  {
    id: 'full-tagline-dark',
    title: 'Logo KROMAQ + Tagline (Dark Card)',
    subtitle: 'Logo complet cu sloganul „SOCIAL MEDIA IN MOTION” pe fundal #06090E',
    platforms: 'Pitch Deck · Semnătură Email · Prezentări Clienți',
    previewBg: 'obsidian',
    pngWidth: 2400,
    pngHeight: 840,
    fileBaseName: 'kromaq-logo-tagline-dark',
    supportsSvg: true,
  },
  {
    id: 'social-banner',
    title: 'Banner Cover Social Media (1920×1080)',
    subtitle: 'Cover pregătit pentru YouTube, LinkedIn, Facebook sau copertă prezentare',
    platforms: 'YouTube Cover · LinkedIn Banner · Facebook Cover · Deck Cover',
    previewBg: 'obsidian',
    pngWidth: 1920,
    pngHeight: 1080,
    fileBaseName: 'kromaq-banner-1920x1080',
    supportsSvg: true,
  },
];

function getCrystalQDefsAndGroup(prefix: string): { defs: string; shapes: string } {
  const defs = `
    <linearGradient id="${prefix}-top-left" x1="20" y1="20" x2="50" y2="50" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
    <linearGradient id="${prefix}-top-right" x1="50" y1="10" x2="80" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F2FE" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
    <linearGradient id="${prefix}-center" x1="35" y1="35" x2="65" y2="65" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#E0F2FE" />
      <stop offset="40%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
    <linearGradient id="${prefix}-right" x1="55" y1="30" x2="85" y2="65" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#67E8F9" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
    <linearGradient id="${prefix}-bottom-left" x1="25" y1="65" x2="50" y2="85" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1D4ED8" />
      <stop offset="100%" stop-color="#1E1B4B" />
    </linearGradient>
    <linearGradient id="${prefix}-bottom-right" x1="50" y1="55" x2="80" y2="85" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="60%" stop-color="#6366F1" />
      <stop offset="100%" stop-color="#8B5CF6" />
    </linearGradient>
    <linearGradient id="${prefix}-tail" x1="60" y1="70" x2="95" y2="95" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F2FE" />
      <stop offset="50%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#9333EA" />
    </linearGradient>
    <filter id="${prefix}-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  `;

  const shapes = `
    <polygon points="50,10 78,26 50,42 22,26" fill="url(#${prefix}-top-right)" opacity="0.95" />
    <polygon points="22,26 50,42 36,60 12,48" fill="url(#${prefix}-top-left)" />
    <polygon points="78,26 88,52 64,62 50,42" fill="url(#${prefix}-right)" />
    <polygon points="50,42 64,62 50,75 36,60" fill="url(#${prefix}-center)" />
    <polygon points="12,48 36,60 50,75 28,86" fill="url(#${prefix}-bottom-left)" />
    <polygon points="50,75 64,62 76,72 58,84" fill="url(#${prefix}-bottom-right)" />
    <polygon points="62,65 80,68 94,88 78,92 68,78" fill="url(#${prefix}-tail)" filter="url(#${prefix}-glow)" />
    <line x1="50" y1="10" x2="50" y2="42" stroke="#E0F2FE" stroke-width="1.2" stroke-opacity="0.8" />
    <line x1="50" y1="42" x2="12" y2="48" stroke="#7DD3FC" stroke-width="1" stroke-opacity="0.6" />
    <line x1="50" y1="42" x2="88" y2="52" stroke="#BAE6FD" stroke-width="1" stroke-opacity="0.7" />
    <line x1="50" y1="42" x2="50" y2="75" stroke="#93C5FD" stroke-width="1" stroke-opacity="0.8" />
    <line x1="50" y1="75" x2="28" y2="86" stroke="#60A5FA" stroke-width="0.8" stroke-opacity="0.6" />
    <line x1="64" y1="62" x2="94" y2="88" stroke="#C084FC" stroke-width="1.5" stroke-opacity="0.9" />
  `;

  return { defs, shapes };
}

function getWordmarkGroup(textColor: string, qPrefix: string): string {
  const { shapes } = getCrystalQDefsAndGroup(qPrefix);
  return `
    <g>
      <!-- K -->
      <path d="M0 20 H10 V45.5 L31.5 20 H44 L21 47 L45 76 H32 L10 49.5 V76 H0 V20 Z" fill="${textColor}" />
      <!-- R -->
      <path fill-rule="evenodd" d="M55 20 H80 C91.5 20 98 26.5 98 36.5 C98 44 93.5 49.5 85.5 51.5 L99 76 H87.5 L75 52.5 H65 V76 H55 V20 Z M65 28.5 V44 H79 C84.8 44 88 41.2 88 36.25 C88 31.3 84.8 28.5 79 28.5 H65 Z" fill="${textColor}" />
      <!-- O -->
      <path fill-rule="evenodd" d="M134 19 C150 19 161 31 161 48 C161 65 150 77 134 77 C118 77 107 65 107 48 C107 31 118 19 134 19 Z M134 28.5 C123.5 28.5 117.2 36.5 117.2 48 C117.2 59.5 123.5 67.5 134 67.5 C144.5 67.5 150.8 59.5 150.8 48 C150.8 36.5 144.5 28.5 134 28.5 Z" fill="${textColor}" />
      <!-- M -->
      <path d="M172 76 V20 H185 L202 55 L219 20 H232 V76 H222 V37 L206 70 H198 L182 37 V76 H172 Z" fill="${textColor}" />
      <!-- Stylized Chevron A without crossbar -->
      <path d="M248 72.5 L268 23.5 L288 72.5" stroke="${textColor}" stroke-width="10" stroke-linecap="round" stroke-linejoin="miter" fill="none" />
      <!-- Crystal Q Icon -->
      <g transform="translate(300, 3) scale(0.88)">
        ${shapes}
      </g>
    </g>
  `;
}

export function buildLogoSvg(id: LogoVariantId): string {
  const { defs, shapes } = getCrystalQDefsAndGroup(`kmq-${id}`);

  if (id === 'icon-transparent') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="1024" height="1024" fill="none">
  <defs>${defs}</defs>
  ${shapes}
</svg>`;
  }

  if (id === 'avatar-dark') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080" fill="none">
  <defs>
    ${defs}
    <radialGradient id="avatar-dark-bg" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#0e223d" />
      <stop offset="45%" stop-color="#08101e" />
      <stop offset="100%" stop-color="#06090e" />
    </radialGradient>
    <radialGradient id="avatar-cyan-halo" cx="50%" cy="50%" r="42%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.28" />
      <stop offset="60%" stop-color="#3B82F6" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#06090e" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#avatar-dark-bg)" />
  <circle cx="540" cy="540" r="440" fill="url(#avatar-cyan-halo)" />
  <g transform="translate(185, 185) scale(7.1)">
    ${shapes}
  </g>
</svg>`;
  }

  if (id === 'avatar-light') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080" fill="none">
  <defs>
    ${defs}
    <radialGradient id="avatar-light-halo" cx="50%" cy="50%" r="45%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.14" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1080" height="1080" fill="#FFFFFF" />
  <circle cx="540" cy="540" r="440" fill="url(#avatar-light-halo)" />
  <g transform="translate(185, 185) scale(7.1)">
    ${shapes}
  </g>
</svg>`;
  }

  if (id === 'wordmark-white-transparent') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-18 -8 424 112" width="2400" height="640" fill="none">
  <defs>${defs}</defs>
  ${getWordmarkGroup('#FFFFFF', `kmq-${id}`)}
</svg>`;
  }

  if (id === 'wordmark-dark-transparent') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-18 -8 424 112" width="2400" height="640" fill="none">
  <defs>${defs}</defs>
  ${getWordmarkGroup('#06090E', `kmq-${id}`)}
</svg>`;
  }

  if (id === 'full-tagline-dark') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 420" width="2400" height="840" fill="none">
  <defs>
    ${defs}
    <radialGradient id="full-dark-glow" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#0d2340" />
      <stop offset="100%" stop-color="#06090e" />
    </radialGradient>
  </defs>
  <rect width="1200" height="420" fill="url(#full-dark-glow)" />
  <g transform="translate(185, 86) scale(2.12)">
    ${getWordmarkGroup('#FFFFFF', `kmq-${id}`)}
  </g>
  <text x="600" y="336" text-anchor="middle" fill="#22D3EE" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="22" font-weight="700" letter-spacing="8">SOCIAL MEDIA IN MOTION</text>
  <text x="600" y="370" text-anchor="middle" fill="#94A3B8" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="14" font-weight="600" letter-spacing="5">VIDEO  ·  WEB DESIGN  ·  PAID ADS  ·  LOCAL SEO</text>
</svg>`;
  }

  // social-banner (1920x1080)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" fill="none">
  <defs>
    ${defs}
    <radialGradient id="banner-bg" cx="50%" cy="48%" r="60%">
      <stop offset="0%" stop-color="#0d2340" />
      <stop offset="55%" stop-color="#070c17" />
      <stop offset="100%" stop-color="#06090e" />
    </radialGradient>
    <radialGradient id="banner-glow-1" cx="25%" cy="30%" r="40%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.16" />
      <stop offset="100%" stop-color="#06090e" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="banner-glow-2" cx="78%" cy="72%" r="40%">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#06090e" stop-opacity="0" />
    </radialGradient>
    <pattern id="banner-grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#FFFFFF" stroke-opacity="0.035" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1920" height="1080" fill="url(#banner-bg)" />
  <rect width="1920" height="1080" fill="url(#banner-grid)" />
  <rect width="1920" height="1080" fill="url(#banner-glow-1)" />
  <rect width="1920" height="1080" fill="url(#banner-glow-2)" />
  <g transform="translate(465, 345) scale(2.55)">
    ${getWordmarkGroup('#FFFFFF', `kmq-${id}`)}
  </g>
  <text x="960" y="655" text-anchor="middle" fill="#22D3EE" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="28" font-weight="700" letter-spacing="11">SOCIAL MEDIA IN MOTION</text>
  <text x="960" y="704" text-anchor="middle" fill="#94A3B8" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="18" font-weight="500" letter-spacing="6">VIDEO PRODUCTION  ·  WEB DESIGN  ·  PAID ADS  ·  LOCAL SEO</text>
</svg>`;
}

export function downloadSvgFile(id: LogoVariantId, fileBaseName: string): void {
  const svgString = buildLogoSvg(id);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileBaseName}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadPngFile(
  id: LogoVariantId,
  fileBaseName: string,
  width: number,
  height: number
): Promise<void> {
  const svgString = buildLogoSvg(id);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error('Canvas context unavailable'));
          return;
        }
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);

        canvas.toBlob((pngBlob) => {
          if (!pngBlob) {
            reject(new Error('Failed to generate PNG'));
            return;
          }
          const pngUrl = URL.createObjectURL(pngBlob);
          const a = document.createElement('a');
          a.href = pngUrl;
          a.download = `${fileBaseName}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
          resolve();
        }, 'image/png', 1.0);
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(err);
      }
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

export async function downloadAllLogosBatch(): Promise<void> {
  for (const spec of LOGO_ASSETS) {
    await downloadPngFile(spec.id, spec.fileBaseName, spec.pngWidth, spec.pngHeight);
    await new Promise((r) => setTimeout(r, 220));
  }
}
