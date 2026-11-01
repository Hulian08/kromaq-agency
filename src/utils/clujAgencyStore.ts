export interface ShootScheduleItem {
  id: string;
  clientName: string;
  brandName: string;
  locationCluj: string;
  shootDate: string;
  format: string;
  gearList: string;
  crew: string;
  status: 'scenariu_aprobat' | 'programat' | 'in_editare_vfx' | 'livrat';
  reelsPlanned: number;
}

export interface ClientRetainer {
  id: string;
  brandName: string;
  industry: string;
  monthlyFeeEur: number;
  monthlyFeeRon: number;
  deliveredReels: number;
  totalReelsContract: number;
  roas: number;
  platforms: string[];
  status: 'active' | 'review' | 'renewing';
  accountLead: string;
}

export interface ClujCreator {
  id: string;
  name: string;
  handle: string;
  niche: 'Tech & AI' | 'Lifestyle & Fashion' | 'HoReCa & Foodie Cluj' | 'Fitness & Wellness' | 'E-Commerce / UGC';
  followers: string;
  engagementRate: string;
  ratePerReelRon: number;
  ratePerReelEur: number;
  verifiedLocal: boolean;
  status: 'disponibil' | 'in_campanie' | 'contract_semnat';
}

export interface AdCampaignMetric {
  id: string;
  clientBrand: string;
  platform: 'Meta Ads (IG/FB)' | 'TikTok Ads' | 'Google/YouTube';
  monthlySpendEur: number;
  roas: number;
  revenueGeneratedEur: number;
  cpaEur: number;
  hookRate3s: string;
  topAngle: string;
}

export const INITIAL_SHOOTS: ShootScheduleItem[] = [
  {
    id: 'shoot-1',
    clientName: 'Mihai Pop',
    brandName: 'Nordic Roast Atelier Cluj',
    locationCluj: 'Str. Universității nr. 8, Centru Vechi, Cluj-Napoca',
    shootDate: 'Joi, 30 Octombrie • 09:30 - 13:30 EET',
    format: '12 Reels dinamice (Macro espresso, latte art slow-mo, interviu barista)',
    gearList: 'Sony FX3 + 24-70mm GM II + Macro 90mm + DJI RS3 Pro + Rode Wireless PRO',
    crew: 'Iulian Chirila (Director & Camera) + 1 Asistent Lumini',
    status: 'programat',
    reelsPlanned: 12,
  },
  {
    id: 'shoot-2',
    clientName: 'Ioana Dumitrescu',
    brandName: 'Apex Urban Apparel',
    locationCluj: 'Cluj Innovation Park (CREIC) / Arhitectură Brutalistă',
    shootDate: 'Sâmbătă, 1 Noiembrie • 14:00 - 18:00 EET',
    format: '16 TikToks & Reels Fashion Motion (Slow shutter streetwear + 3D tracking)',
    gearList: 'Sony FX3 + 16-35mm GM + Aputure Amaran 200d + Fum de scenă',
    crew: 'Iulian Chirila + 2 Modele Locale + Stylist',
    status: 'programat',
    reelsPlanned: 16,
  },
  {
    id: 'shoot-3',
    clientName: 'Vlad Morar',
    brandName: 'SaaS Pulse Analytics',
    locationCluj: 'Iulius Business Center Cluj, Etaj 7',
    shootDate: 'Luni, 3 Noiembrie • 11:00 - 14:00 EET',
    format: '8 Video-uri B2B Founder Explainer & LinkedIn Thought Leadership',
    gearList: '2x Sony FX3 Multicam + Teleprompter + Lavaliere wireless',
    crew: 'Iulian Chirila (Regie & Sunet)',
    status: 'scenariu_aprobat',
    reelsPlanned: 8,
  },
  {
    id: 'shoot-4',
    clientName: 'Andreea Dan',
    brandName: 'Atelier Glow Cosmetics Cluj',
    locationCluj: 'Studio Foto-Video Kromaq Cluj, Str. Memorandumului',
    shootDate: 'Miercuri, 28 Octombrie • Finalizat',
    format: '20 UGC Beauty hooks & Before/After textures',
    gearList: 'Sony FX3 + Ring Light Bi-Color + Macro Probe Lens',
    crew: 'Echipa Kromaq Studio',
    status: 'in_editare_vfx',
    reelsPlanned: 20,
  },
];

export const INITIAL_RETAINERS: ClientRetainer[] = [
  {
    id: 'ret-1',
    brandName: 'Apex Urban Apparel',
    industry: 'Streetwear & D2C E-Commerce',
    monthlyFeeEur: 6900,
    monthlyFeeRon: 34300,
    deliveredReels: 17,
    totalReelsContract: 24,
    roas: 4.8,
    platforms: ['Instagram', 'TikTok Shop', 'Meta Ads'],
    status: 'active',
    accountLead: 'Iulian Chirila',
  },
  {
    id: 'ret-2',
    brandName: 'Nordic Roast Atelier Cluj',
    industry: 'Specialty Coffee & HoReCa Cluj',
    monthlyFeeEur: 3800,
    monthlyFeeRon: 18900,
    deliveredReels: 12,
    totalReelsContract: 16,
    roas: 3.9,
    platforms: ['Instagram Reels', 'TikTok'],
    status: 'active',
    accountLead: 'Iulian Chirila',
  },
  {
    id: 'ret-3',
    brandName: 'Solstice AI Intelligence',
    industry: 'B2B Enterprise SaaS',
    monthlyFeeEur: 12500,
    monthlyFeeRon: 62200,
    deliveredReels: 10,
    totalReelsContract: 12,
    roas: 5.2,
    platforms: ['LinkedIn Video', 'YouTube Shorts', 'Meta Ads'],
    status: 'active',
    accountLead: 'Iulian Chirila',
  },
  {
    id: 'ret-4',
    brandName: 'Lumina Sound & Acoustics',
    industry: 'Consumer Tech & Hardware',
    monthlyFeeEur: 5400,
    monthlyFeeRon: 26800,
    deliveredReels: 14,
    totalReelsContract: 18,
    roas: 4.2,
    platforms: ['TikTok', 'Instagram Reels'],
    status: 'renewing',
    accountLead: 'Iulian Chirila',
  },
];

export const CLUJ_CREATORS: ClujCreator[] = [
  {
    id: 'cr-1',
    name: 'Teodora Mureșan',
    handle: '@teomuresan',
    niche: 'Lifestyle & Fashion',
    followers: '68.4K',
    engagementRate: '5.8%',
    ratePerReelRon: 1200,
    ratePerReelEur: 240,
    verifiedLocal: true,
    status: 'disponibil',
  },
  {
    id: 'cr-2',
    name: 'Alexandru Călin',
    handle: '@calin.tech.cluj',
    niche: 'Tech & AI',
    followers: '42.1K',
    engagementRate: '7.2%',
    ratePerReelRon: 1500,
    ratePerReelEur: 300,
    verifiedLocal: true,
    status: 'in_campanie',
  },
  {
    id: 'cr-3',
    name: 'Mara Popa',
    handle: '@clujfoodsecrets',
    niche: 'HoReCa & Foodie Cluj',
    followers: '94.8K',
    engagementRate: '8.4%',
    ratePerReelRon: 1800,
    ratePerReelEur: 360,
    verifiedLocal: true,
    status: 'contract_semnat',
  },
  {
    id: 'cr-4',
    name: 'Răzvan Bodea',
    handle: '@razvanfit.cluj',
    niche: 'Fitness & Wellness',
    followers: '31.5K',
    engagementRate: '6.1%',
    ratePerReelRon: 950,
    ratePerReelEur: 190,
    verifiedLocal: true,
    status: 'disponibil',
  },
  {
    id: 'cr-5',
    name: 'Carla Voicu',
    handle: '@carlav.aesthetic',
    niche: 'E-Commerce / UGC',
    followers: '53.9K',
    engagementRate: '6.9%',
    ratePerReelRon: 1100,
    ratePerReelEur: 220,
    verifiedLocal: true,
    status: 'disponibil',
  },
];

export const CAMPAIGN_METRICS: AdCampaignMetric[] = [
  {
    id: 'camp-1',
    clientBrand: 'Apex Urban Apparel',
    platform: 'Meta Ads (IG/FB)',
    monthlySpendEur: 11200,
    roas: 4.82,
    revenueGeneratedEur: 53984,
    cpaEur: 14.2,
    hookRate3s: '42.6%',
    topAngle: '3D Cloth Tear & Waterproof Stress Test',
  },
  {
    id: 'camp-2',
    clientBrand: 'Apex Urban Apparel',
    platform: 'TikTok Ads',
    monthlySpendEur: 6400,
    roas: 4.35,
    revenueGeneratedEur: 27840,
    cpaEur: 11.8,
    hookRate3s: '39.1%',
    topAngle: 'POV: What people in Cluj actually wear',
  },
  {
    id: 'camp-3',
    clientBrand: 'Solstice AI Intelligence',
    platform: 'Meta Ads (IG/FB)',
    monthlySpendEur: 7200,
    roas: 5.15,
    revenueGeneratedEur: 37080,
    cpaEur: 82.5,
    hookRate3s: '45.3%',
    topAngle: 'AI Workflow Comparison (Split Screen 3D)',
  },
];
