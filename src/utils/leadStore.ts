import { sendLeadNotification } from './notificationService';

export type LeadStatus = 'new' | 'contacted' | 'call_scheduled' | 'proposal_sent' | 'closed';

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  brandName: string;
  socialHandle?: string;
  budget: string;
  selectedSlot: string;
  message?: string;
  tier?: string;
  selectedPackage?: string;
  selectedServices?: string[];
  serviceStatuses?: Record<string, string>;
  orderStatus?: string;
  createdAt: string;
  status: LeadStatus;
  notes?: string;
}

const STORAGE_KEY = 'kromaq_leads_data_v2';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    fullName: 'Andrei Moldovan',
    email: 'andrei@urbandental.ro',
    brandName: 'Urban Dental & Aesthetics Cluj',
    socialHandle: '@urbandental.cluj',
    budget: '€1,000 — €2,500/mo',
    selectedSlot: 'Tomorrow, 11:00 AM',
    message: 'Interesat de website nou, Reels de prezentare și campanii Meta Ads pentru implantologie.',
    tier: '4-in-1 Growth System',
    selectedPackage: 'growth_4in1',
    selectedServices: ['web_design', 'meta_ads', 'reels_video', 'local_seo'],
    serviceStatuses: {
      web_design: 'in_lucru',
      meta_ads: 'de_inceput',
      reels_video: 'in_aprobare',
      local_seo: 'livrat',
    },
    orderStatus: 'in_productie',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    status: 'call_scheduled',
    notes: 'Discutat pe telefon — vrea start cu Landing Page + 8 Reels pe lună.',
  },
  {
    id: 'lead-2',
    fullName: 'Bogdan Rusu',
    email: 'contact@apexdetailing.ro',
    brandName: 'Apex Auto Detailing',
    socialHandle: '@apexdetailing.cj',
    budget: '€1,000 — €2,500/mo',
    selectedSlot: 'Thursday, 10:30 AM',
    message: 'Avem nevoie de clienți noi prin reclame și clipuri scurte din atelier.',
    selectedPackage: 'all_inclusive',
    selectedServices: ['web_design', 'meta_ads', 'reels_video', 'local_seo', 'logo_branding', 'copywriting_scripts'],
    serviceStatuses: {
      web_design: 'livrat',
      meta_ads: 'in_lucru',
      reels_video: 'editare_revizie',
      local_seo: 'livrat',
      logo_branding: 'livrat',
      copywriting_scripts: 'livrat',
    },
    orderStatus: 'in_productie',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'proposal_sent',
    notes: 'Pachet Complet selectat manual după Google Meet.',
  },
  {
    id: 'lead-3',
    fullName: 'Elena Vasilescu',
    email: 'elena@nordicliving.ro',
    brandName: 'Nordic Living Imobiliare',
    socialHandle: '@nordicliving.ro',
    budget: '€2,500 — €5,000/mo',
    selectedSlot: 'Friday, 1:00 PM',
    message: 'Vrem sistem complet de generare programări pentru vizionări.',
    createdAt: new Date(Date.now() - 3600000 * 42).toISOString(),
    status: 'new',
    notes: '',
  },
];

export function getStoredLeads(): Lead[] {
  if (typeof window === 'undefined') return INITIAL_LEADS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(data);
  } catch (err) {
    return INITIAL_LEADS;
  }
}

export function saveNewLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>, isSimulation = false): Lead {
  const current = getStoredLeads();
  const newLead: Lead = {
    ...lead,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'new',
    notes: '',
  };
  const updated = [newLead, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kromaq_new_lead', { detail: newLead }));
  } catch (err) {}

  // Automatically dispatch notification to kromaqagency@gmail.com
  sendLeadNotification(newLead, isSimulation).catch(() => {});

  return newLead;
}

export function updateLeadStatus(id: string, status: LeadStatus): Lead[] {
  const current = getStoredLeads();
  const updated = current.map((l) => (l.id === id ? { ...l, status } : l));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kromaq_leads_updated'));
  } catch (err) {}
  return updated;
}

export function updateLeadNotes(id: string, notes: string): Lead[] {
  const current = getStoredLeads();
  const updated = current.map((l) => (l.id === id ? { ...l, notes } : l));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kromaq_leads_updated'));
  } catch (err) {}
  return updated;
}

export function updateLeadManualConfig(
  id: string,
  patch: Pick<Lead, 'selectedPackage' | 'selectedServices' | 'serviceStatuses' | 'orderStatus' | 'tier'>
): Lead[] {
  const current = getStoredLeads();
  const updated = current.map((l) => (l.id === id ? { ...l, ...patch } : l));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kromaq_leads_updated'));
  } catch (err) {}
  return updated;
}

export function deleteLead(id: string): Lead[] {
  const current = getStoredLeads();
  const updated = current.filter((l) => l.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kromaq_leads_updated'));
  } catch (err) {}
  return updated;
}

export function exportLeadsToCSV(leads: Lead[]): void {
  const headers = [
    'ID',
    'Full Name',
    'Email',
    'Brand',
    'Social Handle',
    'Budget',
    'Selected Slot',
    'Manual Package',
    'Manual Services',
    'Order Status',
    'Lead Status',
    'Notes',
    'Message',
    'Created At',
  ];
  const rows = leads.map((l) => [
    l.id,
    `"${l.fullName.replace(/"/g, '""')}"`,
    `"${l.email.replace(/"/g, '""')}"`,
    `"${l.brandName.replace(/"/g, '""')}"`,
    `"${(l.socialHandle || '').replace(/"/g, '""')}"`,
    `"${l.budget}"`,
    `"${l.selectedSlot}"`,
    `"${l.tier || l.selectedPackage || 'Nestabilit'}"`,
    `"${(l.selectedServices || []).join(', ')}"`,
    `"${l.orderStatus || 'audit_discutie'}"`,
    `"${l.status}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`,
    l.createdAt,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `kromaq_leads_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
