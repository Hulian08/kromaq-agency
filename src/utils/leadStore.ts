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
  createdAt: string;
  status: LeadStatus;
  notes?: string;
}

const STORAGE_KEY = 'kromaq_leads_data_v2';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    fullName: 'Marcus Vance',
    email: 'marcus@apexapparel.co',
    brandName: 'Apex Apparel',
    socialHandle: '@apexapparel',
    budget: '$10,000 — $25,000/mo',
    selectedSlot: 'Tomorrow, 2:00 PM EST',
    message: 'Looking to scale TikTok Shop & Reels for our Q4 outerwear collection drop.',
    tier: 'Motion & Performance',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    status: 'new',
    notes: 'Requested emphasis on 3D cloth motion and rapid creator ads.',
  },
  {
    id: 'lead-2',
    fullName: 'Elena Rostova',
    email: 'elena@solstice-ai.com',
    brandName: 'Solstice Intelligence',
    socialHandle: '@solsticeai',
    budget: '$25,000+/mo',
    selectedSlot: 'Thursday, 10:30 AM EST',
    message: 'Need 3D motion explainers for enterprise data software launch and founder LinkedIn video.',
    tier: 'Enterprise Bespoke',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'call_scheduled',
    notes: 'Series B tech brand. Prepared initial competitive audit.',
  },
  {
    id: 'lead-3',
    fullName: 'Henrik Lindqvist',
    email: 'henrik@luminasound.eu',
    brandName: 'Lumina Studio & Acoustics',
    socialHandle: '@luminasound',
    budget: '$5,000 — $10,000/mo',
    selectedSlot: 'Friday, 1:00 PM EST',
    message: 'Preparing luxury noise-cancelling headphones drop. Need cinema-grade aesthetic teaser reels.',
    tier: 'Launch Accelerator',
    createdAt: new Date(Date.now() - 3600000 * 42).toISOString(),
    status: 'proposal_sent',
    notes: 'Sent customized 24-asset motion proposal.',
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

export function saveNewLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
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
  const headers = ['ID', 'Full Name', 'Email', 'Brand', 'Social Handle', 'Budget', 'Selected Slot', 'Plan Tier', 'Status', 'Notes', 'Message', 'Created At'];
  const rows = leads.map((l) => [
    l.id,
    `"${l.fullName.replace(/"/g, '""')}"`,
    `"${l.email.replace(/"/g, '""')}"`,
    `"${l.brandName.replace(/"/g, '""')}"`,
    `"${(l.socialHandle || '').replace(/"/g, '""')}"`,
    `"${l.budget}"`,
    `"${l.selectedSlot}"`,
    `"${l.tier || 'None'}"`,
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
