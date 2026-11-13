export type AgencyServiceId =
  | 'web_design'
  | 'meta_ads'
  | 'reels_video'
  | 'local_seo'
  | 'logo_branding'
  | 'copywriting_scripts';

export type DeliverableStatus =
  | 'de_inceput'
  | 'in_lucru'
  | 'editare_revizie'
  | 'in_aprobare'
  | 'livrat';

export type OrderOverallStatus =
  | 'audit_discutie'
  | 'oferta_trimisa'
  | 'in_productie'
  | 'in_aprobare'
  | 'finalizat';

export interface AgencyServiceDef {
  id: AgencyServiceId;
  label: string;
  shortLabel: string;
  category: string;
  defaultNote: string;
}

export interface ServicePackageDef {
  id: string;
  name: string;
  badge: string;
  description: string;
  suggestedPriceEur: number;
  serviceIds: AgencyServiceId[];
}

export interface OrderServiceItem {
  serviceId: AgencyServiceId;
  label: string;
  status: DeliverableStatus;
  details?: string;
}

export interface ClientOrder {
  id: string;
  clientName: string;
  brandName: string;
  email: string;
  phone?: string;
  packageId: string;
  packageName: string;
  monthlyPriceEur: number;
  deadline: string;
  overallStatus: OrderOverallStatus;
  services: OrderServiceItem[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const AGENCY_SERVICES: AgencyServiceDef[] = [
  {
    id: 'web_design',
    label: 'Web Design & Landing Page',
    shortLabel: 'Web Design',
    category: 'Web',
    defaultNote: 'Structură conversie + viteză mobil + tracking',
  },
  {
    id: 'meta_ads',
    label: 'Meta Ads (Facebook & Instagram)',
    shortLabel: 'Meta Ads',
    category: 'Paid Ads',
    defaultNote: 'Campanii Lead Gen + Retargeting local',
  },
  {
    id: 'reels_video',
    label: 'Reels & TikTok Video Production',
    shortLabel: 'Reels / Video',
    category: 'Video',
    defaultNote: 'Filmare + Montaj dinamic + Subtitrări 9:16',
  },
  {
    id: 'local_seo',
    label: 'Social Media & SEO Local (Google Maps)',
    shortLabel: 'Social & SEO Local',
    category: 'SEO / Social',
    defaultNote: 'Optimizare Google Business + postări constante',
  },
  {
    id: 'logo_branding',
    label: 'Logo Design & Brand Kit',
    shortLabel: 'Logo & Branding',
    category: 'Design',
    defaultNote: 'Logo SVG/PNG 4K + culori + identitate vizuală',
  },
  {
    id: 'copywriting_scripts',
    label: 'Copywriting, Hook-uri & Scenarii',
    shortLabel: 'Scenarii & Copy',
    category: 'Strategie',
    defaultNote: 'Texte reclame, site și scripturi video',
  },
];

export const SERVICE_PACKAGES: ServicePackageDef[] = [
  {
    id: 'all_inclusive',
    name: 'Pachet Complet — Toate Serviciile',
    badge: 'FULL PACKAGE',
    description: 'Web Design + Meta Ads + Reels/TikTok + Social & SEO Local + Logo & Branding + Copywriting',
    suggestedPriceEur: 2400,
    serviceIds: [
      'web_design',
      'meta_ads',
      'reels_video',
      'local_seo',
      'logo_branding',
      'copywriting_scripts',
    ],
  },
  {
    id: 'growth_4in1',
    name: '4-in-1 Growth System',
    badge: 'POPULAR',
    description: 'Web Design + Meta Ads + Reels/TikTok Video + Social Media & SEO Local',
    suggestedPriceEur: 1850,
    serviceIds: ['web_design', 'meta_ads', 'reels_video', 'local_seo'],
  },
  {
    id: 'conversion_presence',
    name: 'Conversion Presence (Web + SEO)',
    badge: 'STARTER',
    description: 'Website / Landing Page de conversie + Google Business & SEO Local',
    suggestedPriceEur: 950,
    serviceIds: ['web_design', 'local_seo'],
  },
  {
    id: 'video_ads_pack',
    name: 'Pachet Reels + Meta Ads',
    badge: 'LEADS',
    description: 'Producție Video Short-Form (Reels/TikTok) + Scenarii + Meta Ads Lead Gen',
    suggestedPriceEur: 1450,
    serviceIds: ['reels_video', 'meta_ads', 'copywriting_scripts'],
  },
  {
    id: 'brand_web_start',
    name: 'Start Brand (Logo + Web Design)',
    badge: 'BRANDING',
    description: 'Logo Design & Identitate Vizuală + Website modern de prezentare/conversie',
    suggestedPriceEur: 1100,
    serviceIds: ['logo_branding', 'web_design'],
  },
  {
    id: 'custom',
    name: 'Selecție Manuală Personalizată',
    badge: 'MANUAL',
    description: 'Alegi manual exact serviciile agreate cu clientul în apel',
    suggestedPriceEur: 1200,
    serviceIds: [],
  },
];

export const DELIVERABLE_STATUS_META: Record<
  DeliverableStatus,
  { label: string; badgeClass: string }
> = {
  de_inceput: {
    label: 'De început',
    badgeClass: 'bg-slate-800 border-slate-700 text-slate-300',
  },
  in_lucru: {
    label: 'În lucru',
    badgeClass: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
  },
  editare_revizie: {
    label: 'Editare / Revizie',
    badgeClass: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
  },
  in_aprobare: {
    label: 'Trimis la client',
    badgeClass: 'bg-purple-500/15 border-purple-500/40 text-purple-300',
  },
  livrat: {
    label: 'Livrat ✓',
    badgeClass: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
  },
};

export const ORDER_STATUS_META: Record<
  OrderOverallStatus,
  { label: string; badgeClass: string }
> = {
  audit_discutie: {
    label: 'Audit / Post-Apel',
    badgeClass: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
  },
  oferta_trimisa: {
    label: 'Ofertă Trimisă',
    badgeClass: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
  },
  in_productie: {
    label: 'În Producție',
    badgeClass: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
  },
  in_aprobare: {
    label: 'În Aprobare Client',
    badgeClass: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
  },
  finalizat: {
    label: 'Finalizat / Activ',
    badgeClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
  },
};

const ORDERS_STORAGE_KEY = 'kromaq_client_orders_v1';

export const INITIAL_ORDERS: ClientOrder[] = [
  {
    id: 'ord-1',
    clientName: 'Dr. Andrei Moldovan',
    brandName: 'Urban Dental & Aesthetics Cluj',
    email: 'andrei@urbandental.ro',
    phone: '+40 744 218 902',
    packageId: 'growth_4in1',
    packageName: '4-in-1 Growth System',
    monthlyPriceEur: 1850,
    deadline: '25 Noiembrie',
    overallStatus: 'in_productie',
    services: [
      { serviceId: 'web_design', label: 'Web Design & Landing Page', status: 'in_lucru', details: 'Landing page implanturi' },
      { serviceId: 'reels_video', label: 'Reels & TikTok Video Production', status: 'in_aprobare', details: '8 Reels filmate în Cluj' },
      { serviceId: 'meta_ads', label: 'Meta Ads (Facebook & Instagram)', status: 'de_inceput', details: 'Așteaptă aprobare video' },
      { serviceId: 'local_seo', label: 'Social Media & SEO Local (Google Maps)', status: 'livrat', details: 'Profil Google optimizat' },
    ],
    notes: 'Prioritate maximă pe Reels și Landing Page până vineri.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'ord-2',
    clientName: 'Bogdan Rusu',
    brandName: 'Apex Auto Detailing',
    email: 'contact@apexdetailing.ro',
    phone: '+40 755 881 120',
    packageId: 'all_inclusive',
    packageName: 'Pachet Complet — Toate Serviciile',
    monthlyPriceEur: 2400,
    deadline: '30 Noiembrie',
    overallStatus: 'in_productie',
    services: [
      { serviceId: 'logo_branding', label: 'Logo Design & Brand Kit', status: 'livrat', details: 'Logo vector + culori brand' },
      { serviceId: 'web_design', label: 'Web Design & Landing Page', status: 'livrat', details: 'Site live cu formular rapid' },
      { serviceId: 'reels_video', label: 'Reels & TikTok Video Production', status: 'editare_revizie', details: 'Montaj 12 Reels PPF/Ceramică' },
      { serviceId: 'meta_ads', label: 'Meta Ads (Facebook & Instagram)', status: 'in_lucru', details: 'Campanie Lead Gen activă' },
      { serviceId: 'local_seo', label: 'Social Media & SEO Local (Google Maps)', status: 'livrat', details: 'Top 3 Google Maps Cluj' },
      { serviceId: 'copywriting_scripts', label: 'Copywriting, Hook-uri & Scenarii', status: 'livrat', details: '12 scripturi aprobate' },
    ],
    notes: 'Pachet complet activ. Urmează livrarea pachetului nou de Reels.',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export function getStoredOrders(): ClientOrder[] {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

function persistOrders(orders: ClientOrder[]): ClientOrder[] {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('kromaq_orders_updated'));
  } catch {}
  return orders;
}

export function createClientOrder(
  payload: Omit<ClientOrder, 'id' | 'createdAt' | 'updatedAt'>
): ClientOrder[] {
  const current = getStoredOrders();
  const now = new Date().toISOString();
  const newOrder: ClientOrder = {
    ...payload,
    id: `ord-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  };
  return persistOrders([newOrder, ...current]);
}

export function updateClientOrderOverallStatus(
  orderId: string,
  overallStatus: OrderOverallStatus
): ClientOrder[] {
  const current = getStoredOrders();
  const now = new Date().toISOString();
  return persistOrders(
    current.map((ord) =>
      ord.id === orderId ? { ...ord, overallStatus, updatedAt: now } : ord
    )
  );
}

export function updateClientOrderServiceStatus(
  orderId: string,
  serviceId: AgencyServiceId,
  status: DeliverableStatus
): ClientOrder[] {
  const current = getStoredOrders();
  const now = new Date().toISOString();
  return persistOrders(
    current.map((ord) =>
      ord.id === orderId
        ? {
            ...ord,
            updatedAt: now,
            services: ord.services.map((s) =>
              s.serviceId === serviceId ? { ...s, status } : s
            ),
          }
        : ord
    )
  );
}

export function updateClientOrderServicesList(
  orderId: string,
  packageId: string,
  packageName: string,
  serviceIds: AgencyServiceId[],
  monthlyPriceEur?: number
): ClientOrder[] {
  const current = getStoredOrders();
  const now = new Date().toISOString();
  return persistOrders(
    current.map((ord) => {
      if (ord.id !== orderId) return ord;
      const existingById = new Map(ord.services.map((s) => [s.serviceId, s]));
      const nextServices: OrderServiceItem[] = serviceIds.map((sid) => {
        const existing = existingById.get(sid);
        if (existing) return existing;
        const def = AGENCY_SERVICES.find((a) => a.id === sid);
        return {
          serviceId: sid,
          label: def ? def.label : sid,
          status: 'de_inceput',
          details: def?.defaultNote,
        };
      });
      return {
        ...ord,
        packageId,
        packageName,
        monthlyPriceEur: monthlyPriceEur ?? ord.monthlyPriceEur,
        services: nextServices,
        updatedAt: now,
      };
    })
  );
}

export function deleteClientOrder(orderId: string): ClientOrder[] {
  const current = getStoredOrders();
  return persistOrders(current.filter((o) => o.id !== orderId));
}
