import React, { useState, useEffect } from 'react';
import { 
  getStoredLeads, 
  updateLeadStatus, 
  updateLeadNotes,
  updateLeadManualConfig,
  deleteLead, 
  exportLeadsToCSV, 
  saveNewLead,
  Lead, 
  LeadStatus 
} from '../utils/leadStore';
import {
  AGENCY_SERVICES,
  SERVICE_PACKAGES,
  DELIVERABLE_STATUS_META,
  ORDER_STATUS_META,
  getStoredOrders,
  createClientOrder,
  updateClientOrderOverallStatus,
  updateClientOrderServiceStatus,
  updateClientOrderServicesList,
  deleteClientOrder,
  ClientOrder,
  AgencyServiceId,
  DeliverableStatus,
  OrderOverallStatus,
} from '../utils/ordersStore';
import {
  INITIAL_SHOOTS,
  INITIAL_RETAINERS,
  CLUJ_CREATORS,
  CAMPAIGN_METRICS,
  ShootScheduleItem,
  ClientRetainer,
  ClujCreator,
  AdCampaignMetric,
} from '../utils/clujAgencyStore';
import { 
  X, 
  Download, 
  Mail, 
  Calendar, 
  Building, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Sparkles, 
  Search,
  Filter,
  ExternalLink, 
  Plus, 
  BarChart3, 
  FileText, 
  UserCheck, 
  TrendingUp, 
  Copy, 
  Check, 
  Shield, 
  Layers, 
  PhoneCall,
  Video,
  Camera,
  Users,
  MapPin,
  Briefcase,
  Zap,
  ChevronRight,
  ArrowUpRight,
  Globe,
  Film,
  FileSignature,
  Lock,
  LogOut,
  Key,
  Eye,
  EyeOff,
  AlertCircle,
  Bell,
  Send,
  Radio,
  RefreshCw,
  Palette,
  Image as ImageIcon,
  Package,
  Sliders,
  CheckSquare,
  Square,
  Wrench,
} from 'lucide-react';
import { KromaqIcon } from './KromaqLogo';
import { 
  TARGET_EMAIL, 
  getNotificationLogs, 
  sendLeadNotification, 
  NotificationLog 
} from '../utils/notificationService';
import {
  LOGO_ASSETS,
  buildLogoSvg,
  downloadSvgFile,
  downloadPngFile,
  downloadBrandKitZip,
  LogoAssetSpec,
} from '../utils/logoExporter';

interface FounderLeadsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

type DashboardTab = 
  | 'leads' 
  | 'orders'
  | 'schedule' 
  | 'retainers' 
  | 'shoots' 
  | 'ads_roas' 
  | 'creators' 
  | 'contracts' 
  | 'analytics'
  | 'notifications'
  | 'logos';

type Currency = 'EUR' | 'RON' | 'USD';

export const FounderLeadsDashboard: React.FC<FounderLeadsDashboardProps> = ({ 
  isOpen, 
  onClose,
  onNavigateToSection 
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('leads');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isNewShootModalOpen, setIsNewShootModalOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shoots, setShoots] = useState<ShootScheduleItem[]>(INITIAL_SHOOTS);
  const [creatorFilter, setCreatorFilter] = useState<string>('all');
  const [currentTime, setCurrentTime] = useState<string>('');

  // New Lead Form State
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBrandName, setNewBrandName] = useState('');
  const [newSocialHandle, setNewSocialHandle] = useState('');
  const [newBudget, setNewBudget] = useState('€1,000 — €2,500/mo');
  const [newSlot, setNewSlot] = useState('Mâine, 14:00 EET');
  const [newTier, setNewTier] = useState('Pachet Complet — Toate Serviciile');
  const [newSelectedPackage, setNewSelectedPackage] = useState<string>('all_inclusive');
  const [newSelectedServices, setNewSelectedServices] = useState<AgencyServiceId[]>([
    'web_design',
    'meta_ads',
    'reels_video',
    'local_seo',
    'logo_branding',
    'copywriting_scripts',
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Orders & Manual Service Configurator State
  const [orders, setOrders] = useState<ClientOrder[]>(() => getStoredOrders());
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>('all');
  const [isOrderBuilderOpen, setIsOrderBuilderOpen] = useState<boolean>(true);
  const [editingOrderServicesId, setEditingOrderServicesId] = useState<string | null>(null);
  const [selectedLeadForOrder, setSelectedLeadForOrder] = useState<string>('');
  const [ordClientName, setOrdClientName] = useState('');
  const [ordBrandName, setOrdBrandName] = useState('');
  const [ordEmail, setOrdEmail] = useState('');
  const [ordPhone, setOrdPhone] = useState('');
  const [ordPackageId, setOrdPackageId] = useState<string>('all_inclusive');
  const [ordSelectedServices, setOrdSelectedServices] = useState<AgencyServiceId[]>([
    'web_design',
    'meta_ads',
    'reels_video',
    'local_seo',
    'logo_branding',
    'copywriting_scripts',
  ]);
  const [ordPriceEur, setOrdPriceEur] = useState<number>(2400);
  const [ordDeadline, setOrdDeadline] = useState('15 Zile / Luna Curentă');
  const [ordOverallStatus, setOrdOverallStatus] = useState<OrderOverallStatus>('in_productie');
  const [ordNotes, setOrdNotes] = useState('');

  // Editable Retainers State (with manual service toggles per retainer)
  const [retainers, setRetainers] = useState<ClientRetainer[]>(INITIAL_RETAINERS);
  const [retainerServicesMap, setRetainerServicesMap] = useState<Record<string, AgencyServiceId[]>>({
    'ret-1': ['reels_video', 'meta_ads', 'copywriting_scripts'],
    'ret-2': ['reels_video', 'local_seo'],
    'ret-3': ['web_design', 'meta_ads', 'reels_video'],
    'ret-4': ['reels_video', 'logo_branding'],
  });

  // Contract Generator State
  const [selectedContractLead, setSelectedContractLead] = useState<Lead | null>(null);
  const [contractType, setContractType] = useState<'retainer_full' | 'video_production' | 'ads_management'>('retainer_full');
  const [contractCustomBrand, setContractCustomBrand] = useState('Brand Partener SRL');
  const [contractCustomCui, setContractCustomCui] = useState('RO48291032');
  const [contractPackageId, setContractPackageId] = useState<string>('all_inclusive');
  const [contractSelectedServices, setContractSelectedServices] = useState<AgencyServiceId[]>([
    'web_design',
    'meta_ads',
    'reels_video',
    'local_seo',
    'logo_branding',
    'copywriting_scripts',
  ]);
  const [contractPriceEur, setContractPriceEur] = useState<number>(2400);
  const [contractCopied, setContractCopied] = useState(false);

  // New Shoot Form State
  const [shootBrand, setShootBrand] = useState('');
  const [shootLocation, setShootLocation] = useState('Piața Unirii & Centru Vechi Cluj-Napoca');
  const [shootDate, setShootDate] = useState('Joi • 10:00 EET');
  const [shootFormat, setShootFormat] = useState('16 Reels 9:16 4K ProRes');

  // Authentication State for /dashboard (Credentials: Admin / Iuli@n1975)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('kromaq_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUser = authEmail.trim();
    const normalizedUser = trimmedUser.toLowerCase();

    // Required by founder: email "Admin", password "Iuli@n1975"
    const isUserValid =
      normalizedUser === 'admin' ||
      trimmedUser === 'Admin' ||
      normalizedUser === 'admin@kromaq.ro' ||
      normalizedUser === 'iulian';
    const isPassValid = authPassword === 'Iuli@n1975';

    if (isUserValid && isPassValid) {
      try {
        sessionStorage.setItem('kromaq_admin_auth', 'true');
      } catch {}
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Utilizator sau parolă incorectă! Email necesar: Admin | Parolă: Iuli@n1975');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('kromaq_admin_auth');
    } catch {}
    setIsAuthenticated(false);
    setAuthEmail('');
    setAuthPassword('');
  };

  // Email Notifications State (Target: kromaqagency@gmail.com)
  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>(() => getNotificationLogs());
  const [isSimulatingNotification, setIsSimulatingNotification] = useState<boolean>(false);
  const [simulationStatusMsg, setSimulationStatusMsg] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [customTestMessage, setCustomTestMessage] = useState<string>('');
  const [downloadingLogoId, setDownloadingLogoId] = useState<string | null>(null);
  const [batchDownloading, setBatchDownloading] = useState<boolean>(false);

  const refreshLeads = () => {
    setLeads(getStoredLeads());
  };

  const refreshOrders = () => {
    setOrders(getStoredOrders());
  };

  useEffect(() => {
    if (isOpen) {
      refreshLeads();
      refreshOrders();
      setNotificationLogs(getNotificationLogs());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => refreshLeads();
    const handleOrdersUpdate = () => refreshOrders();
    const handleNotifUpdate = () => setNotificationLogs(getNotificationLogs());
    window.addEventListener('kromaq_new_lead', handleUpdate);
    window.addEventListener('kromaq_leads_updated', handleUpdate);
    window.addEventListener('kromaq_orders_updated', handleOrdersUpdate);
    window.addEventListener('kromaq_notifications_updated', handleNotifUpdate);
    return () => {
      window.removeEventListener('kromaq_new_lead', handleUpdate);
      window.removeEventListener('kromaq_leads_updated', handleUpdate);
      window.removeEventListener('kromaq_orders_updated', handleOrdersUpdate);
      window.removeEventListener('kromaq_notifications_updated', handleNotifUpdate);
    };
  }, []);

  // Live Cluj-Napoca Time
  useEffect(() => {
    const updateTime = () => {
      try {
        const clujTime = new Intl.DateTimeFormat('ro-RO', {
          timeZone: 'Europe/Bucharest',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(new Date());
        setCurrentTime(clujTime);
      } catch (e) {
        setCurrentTime('15:42 EET');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  // SECURE AUTHENTICATION GATE FOR /dashboard
  if (!isAuthenticated) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 selection:bg-cyan-500/30 selection:text-white"
      >
        <div className="relative w-full max-w-md bg-[#070b14] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_90px_rgba(0,242,254,0.25)] text-left space-y-5">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black font-display tracking-wider text-white text-base">KROMAQ</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono font-bold">
                    SECURITY
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">Terminal Autentificare Fondator</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title="Închide și revino la site"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white font-display tracking-tight flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              Autentificare Dashboard
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Datele despre lead-uri, contracte B2B, retainere și campaniile video din Cluj sunt restricționate. Introdu datele de acces de fondator.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5 flex items-center justify-between">
                <span>Utilizator sau Email</span>
                <span className="text-[10px] text-cyan-400 font-mono">Credențial: Admin</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <UserCheck className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  autoFocus
                  required
                  value={authEmail}
                  onChange={(e) => {
                    setAuthEmail(e.target.value);
                    setAuthError('');
                  }}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-sans"
                  placeholder="Admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5 flex items-center justify-between">
                <span>Parolă</span>
                <span className="text-[10px] text-slate-500 font-mono">Sensibil la majuscule</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={authPassword}
                  onChange={(e) => {
                    setAuthPassword(e.target.value);
                    setAuthError('');
                  }}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-mono tracking-wider"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(0,242,254,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                Conectează-te la Dashboard
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 font-semibold text-xs hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              >
                Înapoi la Site-ul Public
              </button>
            </div>
          </form>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span>Sesiune activă în browser</span>
            </div>
            <span className="font-mono text-cyan-400">Cluj-Napoca, RO</span>
          </div>
        </div>
      </div>
    );
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
  };

  const handleSaveNotes = (id: string) => {
    const updated = updateLeadNotes(id, notesText);
    setLeads(updated);
    setEditingNotesId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Ștergi această înregistrare de lead?')) {
      const updated = deleteLead(id);
      setLeads(updated);
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newEmail || !newBrandName) return;

    const pkgDef = SERVICE_PACKAGES.find((p) => p.id === newSelectedPackage);
    const initialStatuses: Record<string, string> = {};
    newSelectedServices.forEach((sid) => {
      initialStatuses[sid] = 'de_inceput';
    });

    saveNewLead({
      fullName: newFullName,
      email: newEmail,
      brandName: newBrandName,
      socialHandle: newSocialHandle || undefined,
      budget: newBudget,
      selectedSlot: newSlot,
      tier: pkgDef ? pkgDef.name : newTier,
      selectedPackage: newSelectedPackage,
      selectedServices: newSelectedServices,
      serviceStatuses: initialStatuses,
      orderStatus: 'audit_discutie',
      message: newMessage,
    });

    setNewFullName('');
    setNewEmail('');
    setNewBrandName('');
    setNewSocialHandle('');
    setNewMessage('');
    setIsAddModalOpen(false);
    refreshLeads();
  };

  const handleApplyOrderPackagePreset = (pkgId: string) => {
    setOrdPackageId(pkgId);
    const pkg = SERVICE_PACKAGES.find((p) => p.id === pkgId);
    if (pkg) {
      if (pkg.serviceIds.length > 0) {
        setOrdSelectedServices([...pkg.serviceIds]);
      }
      setOrdPriceEur(pkg.suggestedPriceEur);
    }
  };

  const handleToggleOrderBuilderService = (serviceId: AgencyServiceId) => {
    setOrdPackageId('custom');
    setOrdSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  const handleSelectLeadIntoOrderBuilder = (leadId: string) => {
    setSelectedLeadForOrder(leadId);
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;
    setOrdClientName(lead.fullName);
    setOrdBrandName(lead.brandName);
    setOrdEmail(lead.email);
    if (lead.selectedPackage) {
      setOrdPackageId(lead.selectedPackage);
      const pkg = SERVICE_PACKAGES.find((p) => p.id === lead.selectedPackage);
      if (pkg) setOrdPriceEur(pkg.suggestedPriceEur);
    }
    if (lead.selectedServices && lead.selectedServices.length > 0) {
      setOrdSelectedServices(lead.selectedServices as AgencyServiceId[]);
    }
    if (lead.notes) setOrdNotes(lead.notes);
  };

  const handleCreateOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ordClientName.trim() || !ordBrandName.trim() || ordSelectedServices.length === 0) return;

    const pkgDef = SERVICE_PACKAGES.find((p) => p.id === ordPackageId);
    const pkgName = pkgDef ? pkgDef.name : 'Selecție Manuală Personalizată';

    const items = ordSelectedServices.map((sid) => {
      const def = AGENCY_SERVICES.find((a) => a.id === sid);
      return {
        serviceId: sid,
        label: def ? def.label : sid,
        status: 'de_inceput' as DeliverableStatus,
        details: def?.defaultNote,
      };
    });

    const updated = createClientOrder({
      clientName: ordClientName.trim(),
      brandName: ordBrandName.trim(),
      email: ordEmail.trim() || 'contact@client.ro',
      phone: ordPhone.trim() || undefined,
      packageId: ordPackageId,
      packageName: pkgName,
      monthlyPriceEur: Number(ordPriceEur) || 0,
      deadline: ordDeadline.trim() || 'Luna curentă',
      overallStatus: ordOverallStatus,
      services: items,
      notes: ordNotes.trim(),
    });
    setOrders(updated);
    setOrdClientName('');
    setOrdBrandName('');
    setOrdEmail('');
    setOrdPhone('');
    setOrdNotes('');
    setSelectedLeadForOrder('');
  };

  const handlePromoteLeadToOrder = (lead: Lead) => {
    const pkgId = lead.selectedPackage || 'all_inclusive';
    const pkgDef = SERVICE_PACKAGES.find((p) => p.id === pkgId);
    const serviceIds = (
      lead.selectedServices && lead.selectedServices.length > 0
        ? lead.selectedServices
        : pkgDef?.serviceIds || ['web_design', 'meta_ads', 'reels_video', 'local_seo']
    ) as AgencyServiceId[];

    const updated = createClientOrder({
      clientName: lead.fullName,
      brandName: lead.brandName,
      email: lead.email,
      packageId: pkgId,
      packageName: pkgDef ? pkgDef.name : lead.tier || 'Pachet Personalizat',
      monthlyPriceEur: pkgDef?.suggestedPriceEur || 1850,
      deadline: '14 Zile de la start',
      overallStatus: (lead.orderStatus as OrderOverallStatus) || 'in_productie',
      services: serviceIds.map((sid) => {
        const def = AGENCY_SERVICES.find((a) => a.id === sid);
        const st = (lead.serviceStatuses?.[sid] as DeliverableStatus) || 'de_inceput';
        return {
          serviceId: sid,
          label: def ? def.label : sid,
          status: st,
          details: def?.defaultNote,
        };
      }),
      notes: lead.notes || lead.message || '',
    });
    setOrders(updated);
    setActiveTab('orders');
  };

  const handleSimulateAndNotify = async (customBrandName?: string) => {
    setIsSimulatingNotification(true);
    setSimulationStatusMsg({
      type: 'info',
      text: `Se generează simularea și se transmite notificarea către ${TARGET_EMAIL}...`,
    });

    const clujSamples = [
      {
        brand: 'Atelier Transilvania Fashion',
        founder: 'Andrei Moldovan',
        handle: '@ateliertransilvania',
        budget: '€4,500/mo',
        slot: 'Mâine, 14:00 EET',
        service: 'Motion & Performance (Video 4K Cluj)',
      },
      {
        brand: 'Cluj Craft Specialty Roastery',
        founder: 'Sorin Muntean',
        handle: '@clujcraftcoffee',
        budget: '€3,800/mo',
        slot: 'Joi, 11:30 EET',
        service: 'TikTok & Reels Cinema Scalare',
      },
      {
        brand: 'AeroSync Drone Dynamics',
        founder: 'Ioana Barbu',
        handle: '@aerosync.tech',
        budget: '€6,900/mo',
        slot: 'Vineri, 16:00 EET',
        service: 'Enterprise Bespoke & Meta Ads',
      },
      {
        brand: 'Verve Gastro Lounge Piața Unirii',
        founder: 'Radu Câmpean',
        handle: '@verve.cluj',
        budget: '€3,200/mo',
        slot: 'Luni, 12:00 EET',
        service: 'Content Lunar & Shootings Cluj',
      },
    ];

    const item = customBrandName 
      ? { brand: customBrandName, founder: 'Partener Cluj', handle: '@kromaq.brand', budget: '€5,000/mo', slot: 'Mâine, 15:00 EET', service: 'Simulare Test Direct' }
      : clujSamples[Math.floor(Math.random() * clujSamples.length)];

    const newSimLead = saveNewLead({
      fullName: item.founder,
      email: `${item.founder.toLowerCase().replace(/[^a-z0-9]/g, '.')}@gmail.com`,
      brandName: item.brand,
      socialHandle: item.handle,
      budget: item.budget,
      selectedSlot: item.slot,
      message: `[TEST SIMULARE CONECTIVITATE]: Solicitare campanie marketing video și scalare paid media pentru ${item.brand} din Cluj-Napoca.`,
      tier: item.service,
    }, true);

    const result = await sendLeadNotification(newSimLead, true);
    setIsSimulatingNotification(false);
    setSimulationStatusMsg({
      type: 'success',
      text: `✓ Notificare expediată cu succes către ${TARGET_EMAIL} pentru brandul "${item.brand}"! Verifică inbox-ul.`,
    });
    refreshLeads();
    setNotificationLogs(getNotificationLogs());
    setTimeout(() => {
      setSimulationStatusMsg(null);
    }, 9000);
  };

  const handleAddSample = () => {
    handleSimulateAndNotify();
  };

  const handleDirectPingTest = async () => {
    setIsSimulatingNotification(true);
    setSimulationStatusMsg({
      type: 'info',
      text: `Se transmite test de verificare a conectivității către ${TARGET_EMAIL}...`,
    });

    const pingLead: Lead = {
      id: `ping-${Date.now()}`,
      fullName: 'Iulian Chirila (Admin Kromaq)',
      email: TARGET_EMAIL,
      brandName: 'Test Conectivitate Dashboard Fondator',
      socialHandle: '@kromaq.agency',
      budget: '€5,000 — €10,000/mo',
      selectedSlot: 'Acum (Test Instant)',
      tier: 'Test Conectivitate Sistem',
      createdAt: new Date().toISOString(),
      status: 'new',
      message: customTestMessage.trim() || 'Verificare conectivitate terminal Kromaq Cluj: canalul de alertă pe email kromaqagency@gmail.com este operațional.',
    };

    const result = await sendLeadNotification(pingLead, true);
    setIsSimulatingNotification(false);
    setSimulationStatusMsg({
      type: 'success',
      text: `✓ Ping trimis cu succes către ${TARGET_EMAIL}! Verifică inbox-ul kromaqagency@gmail.com.`,
    });
    setNotificationLogs(getNotificationLogs());
    setTimeout(() => {
      setSimulationStatusMsg(null);
    }, 9000);
  };

  const handleCreateShoot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shootBrand) return;
    const newShoot: ShootScheduleItem = {
      id: `shoot-${Date.now()}`,
      clientName: 'Client Cluj',
      brandName: shootBrand,
      locationCluj: shootLocation,
      shootDate: shootDate,
      format: shootFormat,
      gearList: 'Sony FX3 + 24-70mm GM II + DJI RS3 Pro + Rode Wireless PRO',
      crew: 'Iulian Chirila (Regizor & Operator)',
      status: 'programat',
      reelsPlanned: 16,
    };
    setShoots([newShoot, ...shoots]);
    setShootBrand('');
    setIsNewShootModalOpen(false);
  };

  const handleCopyProposal = (lead: Lead) => {
    const text = `KROMAQ STRATEGY AUDIT PROPOSAL (CLUJ-NAPOCA)
Brand: ${lead.brandName}
Contact: ${lead.fullName} (${lead.email})
Programare Discovery: ${lead.selectedSlot}
Pachet Recomandat: ${lead.tier || 'Motion & Performance'} (${lead.budget})
Livrabile: 20-24 Video-uri Cinema-Grade 9:16 (Filmări la locație în Cluj / Studio Kromaq), Scripting psihologic, Testare hook-uri multi-variantă, Administrare Meta Ads & TikTok Ads.
Garanție: Onboarding operațional în 14 zile.`;

    navigator.clipboard.writeText(text);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyContract = () => {
    const brand = selectedContractLead ? selectedContractLead.brandName : contractCustomBrand;
    const clientEmail = selectedContractLead ? selectedContractLead.email : 'contact@client.ro';
    const selectedServiceLines = contractSelectedServices
      .map((sid, idx) => {
        const def = AGENCY_SERVICES.find((a) => a.id === sid);
        return `${String.fromCharCode(97 + idx)}) ${def ? `${def.label} — ${def.defaultNote}` : sid};`;
      })
      .join('\n');
    const valRon = Math.round(contractPriceEur * 4.97);
    const valUsd = Math.round(contractPriceEur * 1.08);

    const contractText = `CONTRACT DE PRESTĂRI SERVICII MARKETING DIGITAL & DESIGN
Nr. KMQ-${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)} încheiat în Cluj-Napoca la data de ${new Date().toLocaleDateString('ro-RO')}

I. PĂRȚILE CONTRACTANTE
1. SC KROMAQ CREATIVE PERFORMANCE SRL, cu sediul în Municipiul Cluj-Napoca, Jud. Cluj, CUI RO49102834, reprezentată legal prin IULIAN CHIRILA în calitate de Fondator & Managing Director, denumită în continuare PRESTATOR,
și
2. ${brand.toUpperCase()}, CUI/CIF ${contractCustomCui}, e-mail: ${clientEmail}, reprezentată legal prin administrator, denumită în continuare BENEFICIAR.

II. OBIECTUL CONTRACTULUI (SERVICII SELECTATE)
Prestatorul se obligă să asigure următoarele servicii:
${selectedServiceLines || 'a) Pachet complet marketing digital & producție video.'}

III. PREȚUL ȘI MODALITATEA DE PLATĂ
Valoarea lunară a serviciilor este de ${currency === 'RON' ? `${valRon.toLocaleString()} RON + TVA` : currency === 'EUR' ? `${contractPriceEur.toLocaleString()} EUR + TVA` : `$${valUsd.toLocaleString()} + TAX`}, facturată la începutul fiecărei perioade contractuale prin sistemul național RO e-Factura.

IV. DREPTURI DE AUTOR ȘI CONFIDENȚIALITATE (NDA)
Drepturile comerciale de utilizare a materialelor finale (website, logo, video Reels) se transferă Beneficiarului integral după achitarea facturii aferente.

Semnat în 2 exemplare originale,
PRESTATOR: KROMAQ SRL (Iulian Chirila)          BENEFICIAR: ${brand}`;

    navigator.clipboard.writeText(contractText);
    setContractCopied(true);
    setTimeout(() => setContractCopied(false), 2500);
  };

  const handleNavigateSite = (sectionId: string) => {
    onClose();
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const statusConfig: Record<LeadStatus, { bg: string; text: string; label: string }> = {
    new: { bg: 'bg-cyan-500/10 border-cyan-500/30', text: 'text-cyan-400', label: 'Lead Nou' },
    contacted: { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-400', label: 'Contactat' },
    call_scheduled: { bg: 'bg-blue-500/10 border-blue-500/30', text: 'text-blue-400', label: 'Call Programat' },
    proposal_sent: { bg: 'bg-purple-500/10 border-purple-500/30', text: 'text-purple-400', label: 'Ofertă Trimisă' },
    closed: { bg: 'bg-emerald-500/10 border-emerald-500/30', text: 'text-emerald-400', label: 'Contract Semnat' },
  };

  const filteredCreators = CLUJ_CREATORS.filter((c) => {
    if (creatorFilter === 'all') return true;
    return c.niche.toLowerCase().includes(creatorFilter.toLowerCase());
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fade-in text-left selection:bg-cyan-500/30 selection:text-white"
    >
      <div
        className="relative w-full max-w-7xl h-[94vh] bg-[#070b14] border border-cyan-500/40 rounded-3xl shadow-[0_0_90px_rgba(0,242,254,0.22)] flex flex-col lg:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= VERTICAL SIDEBAR ================= */}
        <aside className="w-full lg:w-72 bg-[#05080f] border-b lg:border-b-0 lg:border-r border-slate-800/90 flex flex-col shrink-0">
          {/* Brand & Founder Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-gradient-to-b from-cyan-950/20 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <KromaqIcon size={32} />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black font-display tracking-wider text-white text-base">KROMAQ</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono font-bold">
                      CLUJ
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">Agency Command Terminal</p>
                </div>
              </div>

              {/* Close Button on Mobile */}
              <button
                type="button"
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Founder Profile Badge */}
            <div className="mt-3.5 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xs">
                  IC
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">Iulian Chirila</div>
                  <div className="text-[10px] text-cyan-400 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> Cluj-Napoca, RO
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-mono font-bold text-slate-300">{currentTime || '15:42 EET'}</div>
                <div className="text-[9px] text-emerald-400 flex items-center gap-1 font-mono justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Live
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Navigation Links */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
            {/* GROUP 1: PIPELINE & LEADS */}
            <div>
              <div className="px-2.5 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                Clienți & Pipeline
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('leads')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'leads'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>Inbound Leads</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-mono font-bold">
                    {leads.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Package className="w-4 h-4 text-amber-400" />
                    <span>Comenzi &amp; Pachete</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold">
                    {orders.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'notifications'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Bell className="w-4 h-4 text-emerald-400" />
                    <span>Notificări Email</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('schedule')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'schedule'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>Programări Apeluri</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono font-semibold">
                    {leads.filter((l) => l.status === 'call_scheduled' || l.status === 'new').length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('retainers')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'retainers'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                    <span>Retainere Active</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-300 font-bold">
                    {retainers.length} branduri
                  </span>
                </button>
              </div>
            </div>

            {/* GROUP 2: CREATIVE & STUDIO CLUJ */}
            <div>
              <div className="px-2.5 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                Studio & Producție Cluj
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('shoots')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'shoots'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <span>Filmări & Producție</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                    {shoots.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('ads_roas')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'ads_roas'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <TrendingUp className="w-4 h-4 text-sky-400" />
                    <span>Meta & TikTok Ads</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">4.45x ROAS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('creators')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'creators'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-violet-400" />
                    <span>Creatori UGC Cluj</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{CLUJ_CREATORS.length}</span>
                </button>
              </div>
            </div>

            {/* GROUP 3: LEGAL, B2B & METRICS */}
            <div>
              <div className="px-2.5 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                Financiar & Legal RO
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('contracts')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'contracts'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileSignature className="w-4 h-4 text-amber-400" />
                    <span>Contracte & Oferte B2B</span>
                  </div>
                  <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-mono">e-Factura</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'analytics'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    <span>Metrici & Pipeline MRR</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('logos')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'logos'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Palette className="w-4 h-4 text-cyan-300" />
                    <span>Logo-uri & Brand Kit</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                    {LOGO_ASSETS.length + 1}
                  </span>
                </button>
              </div>
            </div>

            {/* GROUP 4: REDIRECȚIONĂRI SITE PUBLIC (REQUESTED) */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="px-2.5 pb-1 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-cyan-400" /> Redirecționări Site Public
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Vezi Site-ul Live
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigateSite('services')}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Secțiunea Servicii & Bento
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigateSite('work')}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Portofoliu & Studii de Caz
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigateSite('pricing')}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Pachete Tarifare & Prețuri
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigateSite('contact')}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Formular Booking Vizitatori
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Controls: Currency & Direct Email */}
          <div className="p-3 bg-[#04060c] border-t border-slate-800/90 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              {(['EUR', 'RON', 'USD'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                    currency === curr
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="mailto:chirilaiulian08@gmail.com"
                className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
                title="Trimite e-mail direct"
              >
                <Mail className="w-3 h-3" /> E-mail
              </a>

              <button
                type="button"
                onClick={handleLogout}
                className="text-[10px] font-mono font-bold text-rose-400 hover:text-rose-200 px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/20 transition-all flex items-center gap-1 cursor-pointer"
                title="Deconectare din sesiune"
              >
                <LogOut className="w-3 h-3" /> Deconectare
              </button>
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT PANEL ================= */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#070b14]">
          {/* Top Control Bar */}
          <div className="p-4 sm:px-6 border-b border-slate-800/90 bg-[#060910] flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  {activeTab === 'leads' && 'Panou Inbound Leads & Selector Servicii Manual'}
                  {activeTab === 'orders' && 'Configurator Pachete & Status Comenzi (Web, Reels, Logo, Ads)'}
                  {activeTab === 'notifications' && 'Hub Conectivitate & Notificări Email'}
                  {activeTab === 'schedule' && 'Calendar Apeluri & Configurare Post-Apel'}
                  {activeTab === 'retainers' && 'Retainere Lunare & Selector Livrabile Active'}
                  {activeTab === 'shoots' && 'Planificator Filmări & Producție Video Cluj-Napoca'}
                  {activeTab === 'ads_roas' && 'Performanță Meta Ads & TikTok Ads (ROAS)'}
                  {activeTab === 'creators' && 'Rețeaua de Creatori UGC & Influenceri Cluj'}
                  {activeTab === 'contracts' && 'Generator Contracte B2B & Configurator Servicii'}
                  {activeTab === 'analytics' && 'Metrici Financiare, MRR & Rata de Conversie'}
                  {activeTab === 'logos' && 'Pachet Oficial Logo-uri & Brand Kit Kromaq'}
                </h3>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono">
                  Valută: {currency}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-slate-400">
                <span>Sistem operațional Kromaq Cluj-Napoca</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Email Destinație: {TARGET_EMAIL}
                </span>
              </div>
            </div>

            {/* Quick Global Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSimulateAndNotify()}
                disabled={isSimulatingNotification}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                title={`Trimite lead de simulare și notificare automată pe ${TARGET_EMAIL}`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isSimulatingNotification ? 'Se transmite...' : 'Simulează & Testează Email'}</span>
              </button>

              {activeTab === 'orders' && (
                <button
                  type="button"
                  onClick={() => setIsOrderBuilderOpen((prev) => !prev)}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md hover:brightness-110 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isOrderBuilderOpen ? 'Ascunde Configurator' : 'Comandă / Pachet Nou'}</span>
                </button>
              )}

              {activeTab === 'shoots' && (
                <button
                  type="button"
                  onClick={() => setIsNewShootModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md hover:brightness-110 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Programare Filmare</span>
                </button>
              )}

              {activeTab === 'leads' && (
                <>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-xs font-semibold text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Lead Manual</span>
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => exportLeadsToCSV(leads)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Închide panoul și revino la site"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Închide</span>
              </button>
            </div>
          </div>

          {/* Real-time Email Simulation Feedback Banner */}
          {simulationStatusMsg && (
            <div
              className={`p-3 px-6 flex items-center justify-between text-xs transition-all ${
                simulationStatusMsg.type === 'success'
                  ? 'bg-emerald-950/90 text-emerald-300 border-b border-emerald-500/50 shadow-lg'
                  : simulationStatusMsg.type === 'error'
                  ? 'bg-rose-950/90 text-rose-300 border-b border-rose-500/50'
                  : 'bg-cyan-950/90 text-cyan-300 border-b border-cyan-500/50 animate-pulse'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 shrink-0 text-cyan-400" />
                <span className="font-semibold">{simulationStatusMsg.text}</span>
              </div>
              <button
                type="button"
                onClick={() => setSimulationStatusMsg(null)}
                className="text-slate-400 hover:text-white ml-3 text-xs p-1"
                aria-label="Închide alerta"
              >
                ✕
              </button>
            </div>
          )}

          {/* TAB 1: INBOUND LEADS */}
          {activeTab === 'leads' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Search & Status Filters */}
              <div className="p-3 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#060910]/70 border-b border-slate-800/80">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Caută după brand, fondator sau email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {['all', 'new', 'call_scheduled', 'proposal_sent', 'contacted', 'closed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer whitespace-nowrap ${
                        filterStatus === st
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                          : 'text-slate-400 hover:text-white bg-slate-900/40'
                      }`}
                    >
                      {st === 'all' ? 'Toate' : st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-20 space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                      <Search className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-semibold text-slate-300">Niciun lead nu corespunde acestui filtru</div>
                    <p className="text-xs text-slate-500">
                      Apasă „Simulează Lead Cluj” sau folosește formularul de pe site pentru a testa fluxul.
                    </p>
                  </div>
                ) : (
                  filteredLeads.map((lead) => {
                    const statusCfg = statusConfig[lead.status];
                    const dateStr = new Date(lead.createdAt).toLocaleDateString('ro-RO', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <div
                        key={lead.id}
                        className="p-4 sm:p-5 rounded-2xl bg-[#090e1a] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-3 shadow-lg group"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-base font-bold text-white font-display">{lead.fullName}</span>
                              <span className="text-slate-600">•</span>
                              <span className="text-sm font-semibold text-cyan-300 flex items-center gap-1.5">
                                <Building className="w-3.5 h-3.5 text-cyan-400" />
                                {lead.brandName}
                              </span>
                              {lead.socialHandle && (
                                <span className="text-xs text-slate-400 font-mono">({lead.socialHandle})</span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-0.5">
                              <a
                                href={`mailto:${lead.email}`}
                                className="text-slate-300 hover:text-cyan-400 flex items-center gap-1 font-mono"
                              >
                                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                                {lead.email}
                              </a>
                              <span className="flex items-center gap-1 text-slate-300">
                                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                                {lead.selectedSlot}
                              </span>
                              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                                <DollarSign className="w-3.5 h-3.5" />
                                {lead.budget}
                              </span>
                              {lead.tier && (
                                <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] text-cyan-300 font-mono">
                                  {lead.tier}
                                </span>
                              )}
                            </div>

                            {lead.message && (
                              <p className="text-xs text-slate-300 italic pt-1">
                                „{lead.message}”
                              </p>
                            )}
                          </div>

                          {/* Status and Action Buttons */}
                          <div className="flex items-center gap-2 self-start lg:self-center">
                            <span className="text-[11px] text-slate-500 font-mono whitespace-nowrap">{dateStr}</span>

                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                              className={`text-xs font-bold rounded-xl px-2.5 py-1.5 border focus:outline-none cursor-pointer ${statusCfg.bg} ${statusCfg.text}`}
                            >
                              <option value="new">Lead Nou</option>
                              <option value="call_scheduled">Call Programat</option>
                              <option value="proposal_sent">Ofertă Trimisă</option>
                              <option value="contacted">Contactat</option>
                              <option value="closed">Contract Semnat</option>
                            </select>

                            <a
                              href={`mailto:${lead.email}?subject=Kromaq Cluj - Ședință Strategie Social Media & Video (${lead.brandName})&body=Salut ${lead.fullName},%0D%0A%0D%0AÎți mulțumim pentru interesul manifestat față de serviciile Kromaq Cluj-Napoca pentru brandul ${lead.brandName}.%0D%0A%0D%0AAm rezervat slotul tău de 30 de minute pentru ${lead.selectedSlot}. Iată link-ul de Google Meet...`}
                              className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
                              title="Trimite e-mail direct clientului"
                            >
                              <Mail className="w-4 h-4" />
                            </a>

                            <button
                              type="button"
                              onClick={() => handleCopyProposal(lead)}
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                              title="Copiază Rezumat Ofertă"
                            >
                              {copiedId === lead.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedContractLead(lead);
                                setActiveTab('contracts');
                              }}
                              className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors cursor-pointer"
                              title="Generează Contract B2B pentru acest Lead"
                            >
                              <FileSignature className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(lead.id)}
                              className="p-2 rounded-xl bg-slate-800/60 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Șterge Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                            {/* Manual Package & Services Selector directly on each Lead card */}
                            <div className="pt-2 border-t border-slate-800/70 space-y-2.5">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1">
                                    <Sliders className="w-3 h-3" /> Selector Post-Apel:
                                  </span>

                                  {/* Quick Package Selector per Lead */}
                                  <select
                                    value={lead.selectedPackage || ''}
                                    onChange={(e) => {
                                      const pkgId = e.target.value;
                                      const pkg = SERVICE_PACKAGES.find((p) => p.id === pkgId);
                                      const nextIds = pkg
                                        ? pkg.serviceIds.length > 0
                                          ? [...pkg.serviceIds]
                                          : lead.selectedServices || []
                                        : [];
                                      const nextStatuses = { ...(lead.serviceStatuses || {}) };
                                      nextIds.forEach((sid) => {
                                        if (!nextStatuses[sid]) nextStatuses[sid] = 'de_inceput';
                                      });
                                      const updated = updateLeadManualConfig(lead.id, {
                                        selectedPackage: pkgId || undefined,
                                        selectedServices: nextIds,
                                        serviceStatuses: nextStatuses,
                                        tier: pkg ? pkg.name : undefined,
                                        orderStatus: lead.orderStatus || 'audit_discutie',
                                      });
                                      setLeads(updated);
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-cyan-200 font-medium cursor-pointer focus:outline-none focus:border-cyan-400"
                                  >
                                    <option value="">-- Alege Pachet Manual --</option>
                                    {SERVICE_PACKAGES.map((pkg) => (
                                      <option key={pkg.id} value={pkg.id}>
                                        {pkg.name}
                                      </option>
                                    ))}
                                  </select>

                                  {/* Order Status Selector per Lead */}
                                  <select
                                    value={lead.orderStatus || 'audit_discutie'}
                                    onChange={(e) => {
                                      const updated = updateLeadManualConfig(lead.id, {
                                        selectedPackage: lead.selectedPackage,
                                        selectedServices: lead.selectedServices,
                                        serviceStatuses: lead.serviceStatuses,
                                        tier: lead.tier,
                                        orderStatus: e.target.value,
                                      });
                                      setLeads(updated);
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-500/30 text-[11px] text-amber-300 font-semibold cursor-pointer focus:outline-none"
                                  >
                                    {(Object.keys(ORDER_STATUS_META) as OrderOverallStatus[]).map((stKey) => (
                                      <option key={stKey} value={stKey}>
                                        Comandă: {ORDER_STATUS_META[stKey].label}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handlePromoteLeadToOrder(lead)}
                                  className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-400 hover:text-slate-950 text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <Package className="w-3 h-3" />
                                  <span>Deschide în Comenzi</span>
                                </button>
                              </div>

                              {/* Clickable Service Toggles + Individual Statuses on the Lead Card */}
                              <div className="flex flex-wrap gap-1.5">
                                {AGENCY_SERVICES.map((srv) => {
                                  const activeIds = lead.selectedServices || [];
                                  const isChecked = activeIds.includes(srv.id);
                                  const currentSrvStatus =
                                    (lead.serviceStatuses?.[srv.id] as DeliverableStatus) || 'de_inceput';

                                  return (
                                    <div
                                      key={srv.id}
                                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] transition-all ${
                                        isChecked
                                          ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200'
                                          : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300'
                                      }`}
                                    >
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const nextIds = isChecked
                                            ? activeIds.filter((id) => id !== srv.id)
                                            : [...activeIds, srv.id];
                                          const nextStatuses = { ...(lead.serviceStatuses || {}) };
                                          if (!isChecked && !nextStatuses[srv.id]) {
                                            nextStatuses[srv.id] = 'de_inceput';
                                          }
                                          const updated = updateLeadManualConfig(lead.id, {
                                            selectedPackage:
                                              nextIds.length === AGENCY_SERVICES.length
                                                ? 'all_inclusive'
                                                : 'custom',
                                            selectedServices: nextIds,
                                            serviceStatuses: nextStatuses,
                                            tier:
                                              nextIds.length === AGENCY_SERVICES.length
                                                ? 'Pachet Complet — Toate Serviciile'
                                                : 'Selecție Manuală',
                                            orderStatus: lead.orderStatus || 'audit_discutie',
                                          });
                                          setLeads(updated);
                                        }}
                                        className="flex items-center gap-1 cursor-pointer font-medium"
                                      >
                                        {isChecked ? (
                                          <CheckSquare className="w-3 h-3 text-cyan-400" />
                                        ) : (
                                          <Square className="w-3 h-3 text-slate-600" />
                                        )}
                                        <span>{srv.shortLabel}</span>
                                      </button>

                                      {isChecked && (
                                        <select
                                          value={currentSrvStatus}
                                          onChange={(e) => {
                                            const nextStatuses = {
                                              ...(lead.serviceStatuses || {}),
                                              [srv.id]: e.target.value,
                                            };
                                            const updated = updateLeadManualConfig(lead.id, {
                                              selectedPackage: lead.selectedPackage,
                                              selectedServices: lead.selectedServices,
                                              serviceStatuses: nextStatuses,
                                              tier: lead.tier,
                                              orderStatus: lead.orderStatus || 'in_productie',
                                            });
                                            setLeads(updated);
                                          }}
                                          className="ml-1 px-1.5 py-0.5 rounded bg-[#05080f] border border-cyan-500/30 text-[10px] text-cyan-300 cursor-pointer focus:outline-none"
                                        >
                                          {(Object.keys(DELIVERABLE_STATUS_META) as DeliverableStatus[]).map(
                                            (dKey) => (
                                              <option key={dKey} value={dKey}>
                                                {DELIVERABLE_STATUS_META[dKey].label}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Founder Notes Bar */}
                            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                              {editingNotesId === lead.id ? (
                                <div className="w-full flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={notesText}
                                    onChange={(e) => setNotesText(e.target.value)}
                                    placeholder="Notă internă (ex: Au nevoie de Website + 8 Reels/lună + Meta Ads)..."
                                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleSaveNotes(lead.id)}
                                    className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                                  >
                                    Salvează
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingNotesId(null)}
                                    className="px-2 py-1.5 text-slate-400 hover:text-white cursor-pointer"
                                  >
                                    Anulează
                                  </button>
                                </div>
                              ) : (
                                <div className="w-full flex items-center justify-between">
                                  <div className="text-slate-400 text-xs flex items-center gap-1.5">
                                    <span className="text-cyan-400 font-mono font-semibold">Notă Fondator:</span>
                                    <span>{lead.notes || 'Nicio notă adăugată.'}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingNotesId(lead.id);
                                      setNotesText(lead.notes || '');
                                    }}
                                    className="text-cyan-400 hover:underline text-[11px] cursor-pointer"
                                  >
                                    {lead.notes ? 'Editează Notă' : '+ Adaugă Notă'}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

          {/* TAB 1B: MANUAL SERVICE CONFIGURATOR & CLIENT ORDERS */}
          {activeTab === 'orders' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Collapsible Manual Configurator (Post-Call Package & Service Builder) */}
              {isOrderBuilderOpen && (
                <form
                  onSubmit={handleCreateOrderSubmit}
                  className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0a1120] to-[#060911] border border-cyan-500/35 shadow-2xl space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5" />
                        Configurator Manual Post-Apel
                      </div>
                      <h4 className="text-lg font-bold font-display text-white mt-0.5">
                        Configurează Pachetul &amp; Serviciile Clientului
                      </h4>
                      <p className="text-xs text-slate-400">
                        Selectează pachetul complet cu toate serviciile sau bifează manual exact ce ai stabilit cu clientul după apel.
                      </p>
                    </div>

                    {/* Quick Import From Lead */}
                    <div className="min-w-[230px]">
                      <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                        Preia date din Inbound Leads (opțional)
                      </label>
                      <select
                        value={selectedLeadForOrder}
                        onChange={(e) => handleSelectLeadIntoOrderBuilder(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white cursor-pointer"
                      >
                        <option value="">-- Client Nou / Manual --</option>
                        {leads.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.brandName} ({l.fullName})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 1: Package Presets (including All Services Full Package) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200">
                        1. Alege Pachet Rapid sau Selectează Manual mai jos:
                      </label>
                      <button
                        type="button"
                        onClick={() => handleApplyOrderPackagePreset('all_inclusive')}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-cyan-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider hover:brightness-110 transition cursor-pointer shadow"
                      >
                        ★ Selectează Pachetul cu Toate Serviciile
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {SERVICE_PACKAGES.map((pkg) => {
                        const isSelected = ordPackageId === pkg.id;
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => handleApplyOrderPackagePreset(pkg.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.18)]'
                                : 'bg-[#06090f] border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-white">{pkg.name}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-mono">
                                {pkg.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{pkg.description}</p>
                            <div className="text-[11px] font-mono text-emerald-400 font-bold mt-1.5">
                              €{pkg.suggestedPriceEur.toLocaleString()}/lună
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Individual Service Manual Checkboxes */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-200 block">
                      2. Bifează / Debifează Servicii Manual ({ordSelectedServices.length} selectate):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {AGENCY_SERVICES.map((srv) => {
                        const checked = ordSelectedServices.includes(srv.id);
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => handleToggleOrderBuilderService(srv.id)}
                            className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                              checked
                                ? 'bg-cyan-500/15 border-cyan-400/70 text-white'
                                : 'bg-[#06090f] border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {checked ? (
                              <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <div className="text-xs font-bold leading-snug">{srv.label}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">{srv.defaultNote}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Client Details, Price & Initial Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Nume Client *</label>
                      <input
                        type="text"
                        required
                        value={ordClientName}
                        onChange={(e) => setOrdClientName(e.target.value)}
                        placeholder="Ex: Andrei Popescu"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Brand / Firmă *</label>
                      <input
                        type="text"
                        required
                        value={ordBrandName}
                        onChange={(e) => setOrdBrandName(e.target.value)}
                        placeholder="Ex: Salon Glow Cluj"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Email / Telefon</label>
                      <input
                        type="text"
                        value={ordEmail}
                        onChange={(e) => setOrdEmail(e.target.value)}
                        placeholder="client@brand.ro"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Preț Agreat (EUR/lună)</label>
                      <input
                        type="number"
                        min={0}
                        value={ordPriceEur}
                        onChange={(e) => setOrdPriceEur(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-emerald-300 font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Termen / Deadline</label>
                      <input
                        type="text"
                        value={ordDeadline}
                        onChange={(e) => setOrdDeadline(e.target.value)}
                        placeholder="14 zile"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Status Comandă</label>
                      <select
                        value={ordOverallStatus}
                        onChange={(e) => setOrdOverallStatus(e.target.value as OrderOverallStatus)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-cyan-300 font-semibold"
                      >
                        {(Object.keys(ORDER_STATUS_META) as OrderOverallStatus[]).map((k) => (
                          <option key={k} value={k}>
                            {ORDER_STATUS_META[k].label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      type="text"
                      value={ordNotes}
                      onChange={(e) => setOrdNotes(e.target.value)}
                      placeholder="Detalii discutate cu clientul (ex: culori logo, câte Reels pe lună, stil site, oraș Meta Ads)..."
                      className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer shrink-0 shadow-lg shadow-cyan-500/20"
                    >
                      + Salvează Comanda Clientului
                    </button>
                  </div>
                </form>
              )}

              {/* Active Orders Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold font-display text-white">
                    Comenzi Active &amp; Status Livrabile ({orders.length})
                  </h4>
                  <p className="text-xs text-slate-400">
                    Modifică instant statusul fiecărui serviciu (Reel, Web Design, Logo, Meta Ads, SEO Local) sau editează serviciile incluse.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {(['all', 'audit_discutie', 'oferta_trimisa', 'in_productie', 'in_aprobare', 'finalizat'] as const).map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setOrderFilterStatus(st)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                          orderFilterStatus === st
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                            : 'bg-slate-900/60 text-slate-400 hover:text-white'
                        }`}
                      >
                        {st === 'all' ? 'Toate' : ORDER_STATUS_META[st].label}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Orders Cards List */}
              <div className="space-y-4">
                {orders
                  .filter((o) => orderFilterStatus === 'all' || o.overallStatus === orderFilterStatus)
                  .map((ord) => {
                    const deliveredCount = ord.services.filter((s) => s.status === 'livrat').length;
                    const progressPct =
                      ord.services.length > 0 ? Math.round((deliveredCount / ord.services.length) * 100) : 0;
                    const priceDisplay =
                      currency === 'RON'
                        ? `${Math.round(ord.monthlyPriceEur * 4.97).toLocaleString()} RON`
                        : currency === 'EUR'
                        ? `€${ord.monthlyPriceEur.toLocaleString()}`
                        : `$${Math.round(ord.monthlyPriceEur * 1.08).toLocaleString()}`;
                    const isEditingThisOrder = editingOrderServicesId === ord.id;

                    return (
                      <div
                        key={ord.id}
                        className="p-5 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 shadow-xl"
                      >
                        {/* Order Card Header */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-base font-bold text-white font-display">{ord.brandName}</span>
                              <span className="text-xs text-cyan-300 font-medium">({ord.clientName})</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono font-bold">
                                {ord.packageName}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                              <span>{ord.email}</span>
                              <span>•</span>
                              <span className="text-emerald-400 font-mono font-bold">{priceDisplay}/lună</span>
                              <span>•</span>
                              <span>Termen: <strong className="text-slate-200">{ord.deadline}</strong></span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <select
                              value={ord.overallStatus}
                              onChange={(e) => {
                                const updated = updateClientOrderOverallStatus(
                                  ord.id,
                                  e.target.value as OrderOverallStatus
                                );
                                setOrders(updated);
                              }}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer focus:outline-none ${
                                ORDER_STATUS_META[ord.overallStatus].badgeClass
                              }`}
                            >
                              {(Object.keys(ORDER_STATUS_META) as OrderOverallStatus[]).map((k) => (
                                <option key={k} value={k}>
                                  Status: {ORDER_STATUS_META[k].label}
                                </option>
                              ))}
                            </select>

                            <button
                              type="button"
                              onClick={() =>
                                setEditingOrderServicesId(isEditingThisOrder ? null : ord.id)
                              }
                              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <Sliders className="w-3.5 h-3.5" />
                              <span>{isEditingThisOrder ? 'Închide Selector' : 'Modifică Servicii / Pachet'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Ștergi comanda pentru ${ord.brandName}?`)) {
                                  setOrders(deleteClientOrder(ord.id));
                                }
                              }}
                              className="p-2 rounded-xl bg-slate-800/70 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Șterge Comanda"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Inline Manual Package/Services Editor for Existing Order */}
                        {isEditingThisOrder && (
                          <div className="p-4 rounded-xl bg-[#05080f] border border-cyan-500/30 space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-xs font-bold text-cyan-300">
                                Selector Manual Servicii pentru {ord.brandName}:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {SERVICE_PACKAGES.filter((p) => p.serviceIds.length > 0).map((pkg) => (
                                  <button
                                    key={pkg.id}
                                    type="button"
                                    onClick={() => {
                                      const updated = updateClientOrderServicesList(
                                        ord.id,
                                        pkg.id,
                                        pkg.name,
                                        pkg.serviceIds,
                                        pkg.suggestedPriceEur
                                      );
                                      setOrders(updated);
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-cyan-500/20 border border-slate-700 text-[10px] text-slate-200 font-semibold cursor-pointer"
                                  >
                                    {pkg.name}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {AGENCY_SERVICES.map((srv) => {
                                const currentIds = ord.services.map((s) => s.serviceId);
                                const isActive = currentIds.includes(srv.id);
                                return (
                                  <button
                                    key={srv.id}
                                    type="button"
                                    onClick={() => {
                                      const nextIds = isActive
                                        ? currentIds.filter((id) => id !== srv.id)
                                        : [...currentIds, srv.id];
                                      if (nextIds.length === 0) return;
                                      const isAll = nextIds.length === AGENCY_SERVICES.length;
                                      const updated = updateClientOrderServicesList(
                                        ord.id,
                                        isAll ? 'all_inclusive' : 'custom',
                                        isAll ? 'Pachet Complet — Toate Serviciile' : 'Selecție Manuală Personalizată',
                                        nextIds
                                      );
                                      setOrders(updated);
                                    }}
                                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                                      isActive
                                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                    }`}
                                  >
                                    {isActive ? (
                                      <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
                                    ) : (
                                      <Square className="w-3.5 h-3.5 text-slate-600" />
                                    )}
                                    <span>{srv.shortLabel}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Progress Bar */}
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                            <span>
                              Progres livrare: <strong className="text-white">{deliveredCount}</strong> din{' '}
                              {ord.services.length} servicii finalizate
                            </span>
                            <span className="font-mono text-cyan-300 font-bold">{progressPct}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </div>

                        {/* Individual Per-Service Status Rows (Reels, Web Design, Logo, Meta Ads, Local SEO) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {ord.services.map((srv) => {
                            const meta = DELIVERABLE_STATUS_META[srv.status];
                            return (
                              <div
                                key={srv.serviceId}
                                className="p-3 rounded-xl bg-[#05080f] border border-slate-800/90 flex items-center justify-between gap-2"
                              >
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-white truncate">{srv.label}</div>
                                  {srv.details && (
                                    <div className="text-[10px] text-slate-400 truncate">{srv.details}</div>
                                  )}
                                </div>
                                <select
                                  value={srv.status}
                                  onChange={(e) => {
                                    const updated = updateClientOrderServiceStatus(
                                      ord.id,
                                      srv.serviceId,
                                      e.target.value as DeliverableStatus
                                    );
                                    setOrders(updated);
                                  }}
                                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold cursor-pointer focus:outline-none shrink-0 ${meta.badgeClass}`}
                                >
                                  {(Object.keys(DELIVERABLE_STATUS_META) as DeliverableStatus[]).map((k) => (
                                    <option key={k} value={k}>
                                      {DELIVERABLE_STATUS_META[k].label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            );
                          })}
                        </div>

                        {ord.notes && (
                          <div className="text-xs text-slate-400 italic pt-1 border-t border-slate-800/60">
                            Notă comandă: „{ord.notes}”
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB 2: CALLS SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-base font-bold font-display text-white">Sesiuni de Strategie & Audit Programate</h4>
                  <p className="text-xs text-slate-400">Apeluri video de 30 de minute cu fondatori și directori de marketing</p>
                </div>
                <span className="text-xs font-mono text-cyan-400">Gazdă asignată: Iulian Chirila (Kromaq Cluj)</span>
              </div>

              <div className="space-y-3">
                {leads
                  .filter((l) => l.status === 'call_scheduled' || l.status === 'new')
                  .map((session) => (
                    <div
                      key={session.id}
                      className="p-5 rounded-2xl bg-[#090e18] border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                          <Clock className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white font-display">
                            {session.fullName} — {session.brandName} {session.socialHandle && `(${session.socialHandle})`}
                          </div>
                          <div className="text-xs text-cyan-300 font-mono mt-0.5 flex items-center gap-2">
                            <span>{session.selectedSlot}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-400">{session.email}</span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            Buget estimat: <strong className="text-emerald-400">{session.budget}</strong> • Pachet: {session.tier || 'Motion & Performance'}
                          </div>
                          {session.message && (
                            <p className="text-xs text-slate-400 italic mt-1">„{session.message}”</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                        <select
                          value={session.selectedPackage || ''}
                          onChange={(e) => {
                            const pkg = SERVICE_PACKAGES.find((p) => p.id === e.target.value);
                            const updated = updateLeadManualConfig(session.id, {
                              selectedPackage: e.target.value || undefined,
                              selectedServices: pkg ? pkg.serviceIds : [],
                              tier: pkg ? pkg.name : undefined,
                              serviceStatuses: session.serviceStatuses,
                              orderStatus: session.orderStatus || 'audit_discutie',
                            });
                            setLeads(updated);
                          }}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-cyan-200 cursor-pointer"
                        >
                          <option value="">-- Asignează Pachet Post-Apel --</option>
                          {SERVICE_PACKAGES.map((pkg) => (
                            <option key={pkg.id} value={pkg.id}>
                              {pkg.name}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() => handlePromoteLeadToOrder(session)}
                          className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-400 hover:text-slate-950 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          <Package className="w-3.5 h-3.5" />
                          <span>Trimite în Comenzi</span>
                        </button>

                        <a
                          href={`mailto:${session.email}?subject=Link Google Meet - Ședință Strategie Kromaq cu Iulian Chirila&body=Salut ${session.fullName},%0D%0A%0D%0AIată link-ul de conectare pentru sesiunea noastră de consultanță: https://meet.google.com/kmq-cluj-strat`}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 hover:brightness-110 shadow-lg shadow-cyan-500/20"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Google Meet</span>
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 3: CLIENT RETAINERS & DELIVERABLES */}
          {activeTab === 'retainers' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                <div className="p-4 rounded-2xl bg-[#090e18] border border-slate-800">
                  <div className="text-xs text-slate-400">Total Retainere Active</div>
                  <div className="text-2xl font-black text-cyan-400 font-display mt-1">
                    {currency === 'RON' ? '142.200 RON' : currency === 'EUR' ? '€28,600' : '$31,200'}/lună
                  </div>
                  <div className="text-xs text-slate-400 mt-1">4 contracte recurente active</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#090e18] border border-slate-800">
                  <div className="text-xs text-slate-400">Volum Livrabile Luna Aceasta</div>
                  <div className="text-2xl font-black text-white font-display mt-1">53 / 70 Reels</div>
                  <div className="text-xs text-emerald-400 mt-1">75.7% din cota lunară livrată</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#090e18] border border-slate-800">
                  <div className="text-xs text-slate-400">ROAS Mediu Generat Clienților</div>
                  <div className="text-2xl font-black text-emerald-400 font-display mt-1">4.52x</div>
                  <div className="text-xs text-slate-400 mt-1">Meta Ads & TikTok Shop</div>
                </div>
              </div>

              <div className="space-y-3">
                {retainers.map((ret) => {
                  const progressPct = Math.round((ret.deliveredReels / ret.totalReelsContract) * 100);
                  const feeDisplay = currency === 'RON' 
                    ? `${ret.monthlyFeeRon.toLocaleString()} RON` 
                    : currency === 'EUR' 
                    ? `€${ret.monthlyFeeEur.toLocaleString()}` 
                    : `$${Math.round(ret.monthlyFeeEur * 1.08).toLocaleString()}`;
                  const activeRetServices = retainerServicesMap[ret.id] || [];

                  return (
                    <div
                      key={ret.id}
                      className="p-5 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-white font-display">{ret.brandName}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                              {ret.industry}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            Lead Account: <strong className="text-white">{ret.accountLead}</strong> • Platforme: {ret.platforms.join(', ')}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm font-black text-cyan-300 font-mono">{feeDisplay}/mo</div>
                            <div className="text-[11px] text-emerald-400 font-mono font-bold">ROAS: {ret.roas}x</div>
                          </div>
                          <select
                            value={ret.status}
                            onChange={(e) => {
                              const nextStatus = e.target.value as ClientRetainer['status'];
                              setRetainers(retainers.map((r) => (r.id === ret.id ? { ...r, status: nextStatus } : r)));
                            }}
                            className={`text-[11px] px-2.5 py-1 rounded-full font-mono uppercase font-bold border cursor-pointer focus:outline-none ${
                              ret.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : ret.status === 'review'
                                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            }`}
                          >
                            <option value="active">Activ</option>
                            <option value="review">În Aprobare</option>
                            <option value="renewing">Reînnoire</option>
                          </select>
                        </div>
                      </div>

                      {/* Manual Services Selector inside each Retainer */}
                      <div className="pt-2 border-t border-slate-800/70 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-mono">Servicii Active Selectate Manual:</span>
                          <button
                            type="button"
                            onClick={() =>
                              setRetainerServicesMap({
                                ...retainerServicesMap,
                                [ret.id]: AGENCY_SERVICES.map((s) => s.id),
                              })
                            }
                            className="text-amber-300 hover:underline font-semibold cursor-pointer"
                          >
                            + Selectează Toate Serviciile
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {AGENCY_SERVICES.map((srv) => {
                            const active = activeRetServices.includes(srv.id);
                            return (
                              <button
                                key={srv.id}
                                type="button"
                                onClick={() => {
                                  const next = active
                                    ? activeRetServices.filter((id) => id !== srv.id)
                                    : [...activeRetServices, srv.id];
                                  setRetainerServicesMap({ ...retainerServicesMap, [ret.id]: next });
                                }}
                                className={`px-2.5 py-1 rounded-lg border text-[11px] flex items-center gap-1 cursor-pointer transition-all ${
                                  active
                                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200 font-semibold'
                                    : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300'
                                }`}
                              >
                                {active ? (
                                  <CheckSquare className="w-3 h-3 text-cyan-400" />
                                ) : (
                                  <Square className="w-3 h-3 text-slate-600" />
                                )}
                                <span>{srv.shortLabel}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Deliverables Progress Bar + Manual Reels Adjuster */}
                      <div>
                        <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                          <span>Conținut Livrat: <strong className="text-white">{ret.deliveredReels}</strong> din {ret.totalReelsContract} video-uri</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setRetainers(
                                  retainers.map((r) =>
                                    r.id === ret.id && r.deliveredReels > 0
                                      ? { ...r, deliveredReels: r.deliveredReels - 1 }
                                      : r
                                  )
                                )
                              }
                              className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white text-[10px] font-mono cursor-pointer"
                            >
                              -1 Reel
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setRetainers(
                                  retainers.map((r) =>
                                    r.id === ret.id && r.deliveredReels < r.totalReelsContract
                                      ? { ...r, deliveredReels: r.deliveredReels + 1 }
                                      : r
                                  )
                                )
                              }
                              className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 text-[10px] font-mono font-bold cursor-pointer"
                            >
                              +1 Reel
                            </button>
                            <span className="font-mono text-cyan-300">{progressPct}% complet</span>
                          </div>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: CLUJ SHOOTS & PRODUCTION CALENDAR */}
          {activeTab === 'shoots' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-base font-bold font-display text-white">Filmări Pe Locație & Studio În Cluj-Napoca</h4>
                  <p className="text-xs text-slate-400">Echipamente cinema Sony FX3, lumini Aputure și sunet profesional 32-bit float</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewShootModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:brightness-110 self-start sm:self-auto cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Programează Filmare Nouă</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shoots.map((shoot) => {
                  const statusColors = {
                    scenariu_aprobat: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
                    programat: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
                    in_editare_vfx: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
                    livrat: 'bg-slate-800 border-slate-700 text-slate-300',
                  };

                  const statusLabels = {
                    scenariu_aprobat: 'Scenariu Aprobat',
                    programat: 'Filmări Programate',
                    in_editare_vfx: 'Montaj & VFX 3D',
                    livrat: 'Livrabil Finalizat',
                  };

                  return (
                    <div
                      key={shoot.id}
                      className="p-5 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-base font-bold text-white font-display">{shoot.brandName}</div>
                          <div className="text-xs text-cyan-300 font-mono mt-0.5 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            {shoot.shootDate}
                          </div>
                        </div>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono border font-semibold ${statusColors[shoot.status]}`}>
                          {statusLabels[shoot.status]}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300 font-medium">{shoot.locationCluj}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Film className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{shoot.format}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Camera className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-slate-400 font-mono text-[11px]">{shoot.gearList}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Users className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span className="text-slate-400 text-[11px]">{shoot.crew}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                        <span className="text-slate-400">Target: <strong className="text-white">{shoot.reelsPlanned} Reels</strong></span>
                        <select
                          value={shoot.status}
                          onChange={(e) => {
                            const nextStatus = e.target.value as ShootScheduleItem['status'];
                            setShoots(shoots.map((s) => (s.id === shoot.id ? { ...s, status: nextStatus } : s)));
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 text-[11px] font-semibold cursor-pointer focus:outline-none"
                        >
                          <option value="scenariu_aprobat">Scenariu Aprobat</option>
                          <option value="programat">Filmări Programate</option>
                          <option value="in_editare_vfx">Montaj &amp; VFX 3D</option>
                          <option value="livrat">Livrat ✓</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: ADS & ROAS PERFORMANCE */}
          {activeTab === 'ads_roas' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#090e18] border border-slate-800">
                  <div className="text-xs text-slate-400">Buget Ads Sub Management</div>
                  <div className="text-2xl font-black text-cyan-400 font-display mt-1">
                    {currency === 'RON' ? '123.500 RON' : currency === 'EUR' ? '€24,800' : '$27,000'}/lună
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Meta Ads & TikTok Ads</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#090e18] border border-slate-800">
                  <div className="text-xs text-slate-400">Blended ROAS Mediu</div>
                  <div className="text-2xl font-black text-emerald-400 font-display mt-1">4.45x</div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +18% vs luna trecută
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#090e18] border border-slate-800">
                  <div className="text-xs text-slate-400">Venit Generat Pentru Clienți</div>
                  <div className="text-2xl font-black text-white font-display mt-1">
                    {currency === 'RON' ? '548.000 RON' : currency === 'EUR' ? '€110,360' : '$120,000'}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Tracked via Shopify & Pixels</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#090e18] border border-slate-800">
                  <div className="text-xs text-slate-400">Rată Retenție Hook (3 secunde)</div>
                  <div className="text-2xl font-black text-purple-400 font-display mt-1">41.8%</div>
                  <div className="text-xs text-slate-400 mt-1">Benchmark industrie: 24%</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold font-display text-white">Campanii Active Sub Management Kromaq</h4>
                {CAMPAIGN_METRICS.map((camp) => (
                  <div
                    key={camp.id}
                    className="p-5 rounded-2xl bg-[#090e18] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white font-display">{camp.clientBrand}</span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 font-mono border border-blue-500/20">
                          {camp.platform}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        Top Creative Hook: <strong className="text-cyan-300">„{camp.topAngle}”</strong>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-3 pt-0.5">
                        <span>Hook 3s: <strong className="text-white">{camp.hookRate3s}</strong></span>
                        <span>•</span>
                        <span>CPA: <strong className="text-white">€{camp.cpaEur}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Spend Lunar</div>
                        <div className="text-sm font-bold text-white font-mono">
                          {currency === 'RON' ? `${(camp.monthlySpendEur * 4.97).toLocaleString()} RON` : `€${camp.monthlySpendEur.toLocaleString()}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">ROAS Livrat</div>
                        <div className="text-lg font-black text-emerald-400 font-mono">{camp.roas}x</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Venit Generat</div>
                        <div className="text-sm font-bold text-cyan-300 font-mono">
                          {currency === 'RON' ? `${(camp.revenueGeneratedEur * 4.97).toLocaleString()} RON` : `€${camp.revenueGeneratedEur.toLocaleString()}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CLUJ UGC CREATORS & INFLUENCERS */}
          {activeTab === 'creators' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div>
                  <h4 className="text-base font-bold font-display text-white">Rețeaua de Creatori UGC & Micro-Influenceri Cluj</h4>
                  <p className="text-xs text-slate-400">Talente locale verificate pentru campanii organice și reclame plătite (Whitelisting)</p>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {['all', 'Tech', 'Fashion', 'HoReCa', 'Fitness', 'UGC'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCreatorFilter(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        creatorFilter === cat
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCreators.map((creator) => {
                  const rateDisplay = currency === 'RON' 
                    ? `${creator.ratePerReelRon} RON` 
                    : currency === 'EUR' 
                    ? `€${creator.ratePerReelEur}` 
                    : `$${Math.round(creator.ratePerReelEur * 1.08)}`;

                  return (
                    <div
                      key={creator.id}
                      className="p-5 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-violet-500/40 transition-all flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-base font-bold text-white font-display">{creator.name}</div>
                            <div className="text-xs text-cyan-400 font-mono">{creator.handle}</div>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 font-mono">
                            {creator.niche}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 rounded-xl bg-slate-950/70 text-xs">
                          <div>
                            <div className="text-[10px] text-slate-500">Urmăritori</div>
                            <div className="font-bold text-white font-mono">{creator.followers}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-500">Engagement Rate</div>
                            <div className="font-bold text-emerald-400 font-mono">{creator.engagementRate}</div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-slate-400">Tarif per Reel</div>
                          <div className="text-xs font-black text-cyan-300 font-mono">{rateDisplay}</div>
                        </div>

                        <a
                          href={`mailto:chirilaiulian08@gmail.com?subject=Brief Creator Cluj: ${creator.name} (${creator.handle})`}
                          className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Zap className="w-3 h-3" />
                          <span>Alocă în Campanie</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 7: B2B CONTRACT & PROPOSAL BUILDER FOR ROMANIA */}
          {activeTab === 'contracts' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold font-display text-white">Generator Contracte B2B & Oferte (România)</h4>
                  <p className="text-xs text-slate-400">Contracte de prestări servicii de promovare, cedare drepturi autor și facturare RO e-Factura</p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyContract}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 hover:brightness-110 cursor-pointer self-start sm:self-auto"
                >
                  {contractCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Contract Copiat în Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiază Draft Contract B2B</span>
                    </>
                  )}
                </button>
              </div>

              {/* Lead Selector, Package & Manual Services Configurator */}
              <div className="p-4 rounded-2xl bg-[#090e18] border border-slate-800 space-y-4">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Configurare Client, Pachet &amp; Servicii Contract
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Selectează Lead din Pipeline</label>
                    <select
                      value={selectedContractLead ? selectedContractLead.id : ''}
                      onChange={(e) => {
                        const l = leads.find((x) => x.id === e.target.value);
                        setSelectedContractLead(l || null);
                        if (l) {
                          setContractCustomBrand(l.brandName);
                          if (l.selectedServices && l.selectedServices.length > 0) {
                            setContractSelectedServices(l.selectedServices as AgencyServiceId[]);
                          }
                          if (l.selectedPackage) setContractPackageId(l.selectedPackage);
                        }
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      <option value="">-- Introducere Manuală --</option>
                      {leads.map((l) => (
                        <option key={l.id} value={l.id}>{l.brandName} ({l.fullName})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Denumire Firmă / Brand</label>
                    <input
                      type="text"
                      value={contractCustomBrand}
                      onChange={(e) => setContractCustomBrand(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      placeholder="Ex: Brand Tech SRL"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">CUI / CIF Beneficiar</label>
                    <input
                      type="text"
                      value={contractCustomCui}
                      onChange={(e) => setContractCustomCui(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      placeholder="RO12345678"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Valoare Lunară (EUR)</label>
                    <input
                      type="number"
                      min={0}
                      value={contractPriceEur}
                      onChange={(e) => setContractPriceEur(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-emerald-300 font-mono font-bold"
                    />
                  </div>
                </div>

                {/* Package & Manual Service Checkboxes in Contract Tab */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-300 font-semibold">
                      Servicii Incluse în Contract:
                    </span>
                    <select
                      value={contractPackageId}
                      onChange={(e) => {
                        const pkg = SERVICE_PACKAGES.find((p) => p.id === e.target.value);
                        setContractPackageId(e.target.value);
                        if (pkg && pkg.serviceIds.length > 0) {
                          setContractSelectedServices([...pkg.serviceIds]);
                          setContractPriceEur(pkg.suggestedPriceEur);
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-cyan-300 cursor-pointer"
                    >
                      {SERVICE_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {AGENCY_SERVICES.map((srv) => {
                      const active = contractSelectedServices.includes(srv.id);
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => {
                            setContractPackageId('custom');
                            setContractSelectedServices((prev) =>
                              active ? prev.filter((id) => id !== srv.id) : [...prev, srv.id]
                            );
                          }}
                          className={`px-2.5 py-1 rounded-lg border text-[11px] flex items-center gap-1 cursor-pointer transition-all ${
                            active
                              ? 'bg-amber-500/15 border-amber-400/50 text-amber-200 font-semibold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {active ? (
                            <CheckSquare className="w-3 h-3 text-amber-400" />
                          ) : (
                            <Square className="w-3 h-3 text-slate-600" />
                          )}
                          <span>{srv.shortLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Preview of Legal Contract Draft */}
              <div className="p-5 rounded-2xl bg-[#05080e] border border-slate-800 font-mono text-[11px] text-slate-300 space-y-2 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                <div className="text-cyan-400 font-bold text-center pb-2 border-b border-slate-800">
                  CONTRACT DE PRESTĂRI SERVICII MARKETING DIGITAL &amp; DESIGN (CLUJ-NAPOCA)
                </div>
                <div>{`PĂRȚI: SC KROMAQ CREATIVE PERFORMANCE SRL (Prestator - Iulian Chirila) & ${contractCustomBrand.toUpperCase()} (CUI ${contractCustomCui})`}</div>
                <div className="text-slate-300">
                  {`OBIECT (SERVICII SELECTATE): ${
                    contractSelectedServices
                      .map((sid) => AGENCY_SERVICES.find((a) => a.id === sid)?.label || sid)
                      .join(' • ') || 'Niciun serviciu selectat'
                  }`}
                </div>
                <div className="text-slate-400">{`VALOARE CONTRACT: ${
                  currency === 'RON'
                    ? `${Math.round(contractPriceEur * 4.97).toLocaleString()} RON + TVA / lună`
                    : currency === 'EUR'
                    ? `${contractPriceEur.toLocaleString()} EUR + TVA / lună`
                    : `$${Math.round(contractPriceEur * 1.08).toLocaleString()} / month`
                }`}</div>
                <div className="text-slate-400">{`FACTURARE: Sistem electronic național RO e-Factura. Plată prin transfer bancar.`}</div>
                <div className="text-slate-400">{`DREPTURI AUTOR & CONFIDENȚIALITATE: Cesionare drepturi de utilizare comercială după achitarea integrală.`}</div>
              </div>
            </div>
          )}

          {/* TAB 8: AGENCY ANALYTICS & PIPELINE METRICS */}
          {activeTab === 'analytics' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#090e18] border border-slate-800">
                  <div className="text-xs text-slate-400">Total Active Pipeline</div>
                  <div className="text-3xl font-black text-white font-display mt-1">
                    {currency === 'RON' ? '390.000 RON' : currency === 'EUR' ? '€78,500' : '$85,000'}
                  </div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +32% luna aceasta
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#090e18] border border-slate-800">
                  <div className="text-xs text-slate-400">Venit Lunar Recurent (MRR)</div>
                  <div className="text-3xl font-black text-cyan-400 font-display mt-1">
                    {currency === 'RON' ? '142.200 RON' : currency === 'EUR' ? '€28,600' : '$31,000'}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">4 Clienți Retainer Activ</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#090e18] border border-slate-800">
                  <div className="text-xs text-slate-400">Valoare Medie Contract</div>
                  <div className="text-3xl font-black text-white font-display mt-1">
                    {currency === 'RON' ? '34.200 RON' : currency === 'EUR' ? '€6,900' : '$7,500'}/mo
                  </div>
                  <div className="text-xs text-cyan-300 mt-1">Pachet Motion & Performance</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#090e18] border border-slate-800">
                  <div className="text-xs text-slate-400">Conversie Call în Contract</div>
                  <div className="text-3xl font-black text-emerald-400 font-display mt-1">41.2%</div>
                  <div className="text-xs text-slate-400 mt-1">Target minim agenție: &gt; 30%</div>
                </div>
              </div>

              {/* Pipeline Stage Distribution */}
              <div className="p-6 rounded-2xl bg-[#090e18] border border-slate-800 space-y-4">
                <h4 className="text-base font-bold font-display text-white">Distribuție Pipeline Prospectare Kromaq</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-2xl font-bold text-cyan-400">{leads.filter((l) => l.status === 'new').length}</div>
                    <div className="text-xs text-slate-400 mt-1">Lead-uri Noi</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-2xl font-bold text-blue-400">{leads.filter((l) => l.status === 'call_scheduled').length}</div>
                    <div className="text-xs text-slate-400 mt-1">Apeluri Programate</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-2xl font-bold text-purple-400">{leads.filter((l) => l.status === 'proposal_sent').length}</div>
                    <div className="text-xs text-slate-400 mt-1">Oferte Trimise</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-2xl font-bold text-amber-400">{leads.filter((l) => l.status === 'contacted').length}</div>
                    <div className="text-xs text-slate-400 mt-1">În Negociere</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-2xl font-bold text-emerald-400">{leads.filter((l) => l.status === 'closed').length}</div>
                    <div className="text-xs text-slate-400 mt-1">Contracte Încheiate</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: EMAIL NOTIFICATIONS & CONNECTIVITY HUB (TARGET: kromaqagency@gmail.com) */}
          {activeTab === 'notifications' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Header Status Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0a101f] to-[#070b14] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                        Canal Conectat & Monitorizat Live
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                      Notificări Email Instantanee
                    </h3>
                    <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                      Toate lead-urile, cererile de strategie și programările înregistrate prin formularele publice de pe site (cât și testele simulate de tine) sunt expediate automat către adresa configurată.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex flex-col items-start gap-1.5 shadow-lg shrink-0 min-w-[280px]">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono font-semibold">
                      Adresă E-mail Destinație
                    </div>
                    <div className="text-base font-mono font-bold text-cyan-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{TARGET_EMAIL}</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono pt-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Protocol SMTP Relay Activat</span>
                    </div>
                  </div>
                </div>

                {/* Important First-time Activation Note */}
                <div className="mt-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
                  <AlertCircle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-amber-300">
                      Activare inițială a inbox-ului (O singură dată):
                    </div>
                    <p className="text-amber-200/90 leading-relaxed text-[11px]">
                      La prima notificare trimisă de sistem către <strong>{TARGET_EMAIL}</strong>, serviciul de securitate <em>FormSubmit</em> va trimite un mesaj scurt cu titlul <strong>„Action Required: Activate Form”</strong>. Deschide acel email în căsuța ta de Gmail și apasă butonul <strong>„Activate Form”</strong>. După aceea, toate notificările următoare vor sosi direct în inbox, fără nicio altă confirmare!
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulation & Test Console */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Quick Simulation Cards */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#090e18] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                        <Send className="w-4 h-4 text-cyan-400" />
                        Simulare Lead Nou & Trimitere Notificare
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Apasă un buton pentru a genera un lead realist din Cluj și a verifica transmiterea emailului:
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {[
                      {
                        name: 'Atelier Transilvania Fashion',
                        founder: 'Andrei Moldovan',
                        budget: '€4,500/mo',
                        type: 'Fashion & E-Commerce',
                      },
                      {
                        name: 'Cluj Specialty Roastery',
                        founder: 'Sorin Muntean',
                        budget: '€3,800/mo',
                        type: 'HoReCa & Brand Local',
                      },
                      {
                        name: 'AeroSync Drone Dynamics',
                        founder: 'Ioana Barbu',
                        budget: '€6,900/mo',
                        type: 'Tech & B2B Enterprise',
                      },
                      {
                        name: 'Verve Gastro Lounge Cluj',
                        founder: 'Radu Câmpean',
                        budget: '€3,200/mo',
                        type: 'Lifestyle & Hospitality',
                      },
                    ].map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        disabled={isSimulatingNotification}
                        onClick={() => handleSimulateAndNotify(item.name)}
                        className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/70 transition-all text-left group cursor-pointer disabled:opacity-50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-cyan-400">{item.type}</span>
                          <Send className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <div className="text-xs font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                          {item.name}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                          <span>{item.founder}</span>
                          <span className="font-mono text-emerald-400 font-semibold">{item.budget}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={isSimulatingNotification}
                      onClick={() => handleSimulateAndNotify()}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isSimulatingNotification ? 'Se generează & se trimite notificare...' : 'Generează Simulare Aleatorie & Notifică'}</span>
                    </button>
                  </div>
                </div>

                {/* Right: Direct Custom Ping Test */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#090e18] border border-slate-800 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-400" />
                      Ping Test Direct către {TARGET_EMAIL}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Trimite un semnal de verificare manual direct pe emailul tău pentru a confirma că inbox-ul recepționează alertele.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                        Notă sau mesaj personalizat pentru test (opțional):
                      </label>
                      <textarea
                        rows={3}
                        value={customTestMessage}
                        onChange={(e) => setCustomTestMessage(e.target.value)}
                        placeholder="Ex: Test conexiune efectuat la ora 16:30 din panoul de administrare..."
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={isSimulatingNotification}
                      onClick={handleDirectPingTest}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSimulatingNotification ? 'Se expediază ping-ul...' : 'Trimite Ping de Test pe Gmail'}</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between font-mono">
                    <span>Recepție: {TARGET_EMAIL}</span>
                    <span className="text-cyan-400">Status: Gata de trimitere</span>
                  </div>
                </div>
              </div>

              {/* Live Log of Dispatched Notifications */}
              <div className="p-6 rounded-2xl bg-[#090e18] border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      Jurnal Alerte & Istoric Notificări Expediate
                    </h4>
                    <p className="text-xs text-slate-400">
                      Înregistrarea live a tuturor notificărilor transmise către {TARGET_EMAIL}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">
                      Total: <strong className="text-white">{notificationLogs.length}</strong> evenimente
                    </span>
                    {notificationLogs.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem('kromaq_notification_logs_v1');
                          setNotificationLogs([]);
                        }}
                        className="text-[10px] text-slate-500 hover:text-slate-300 font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
                      >
                        Curăță Jurnal
                      </button>
                    )}
                  </div>
                </div>

                {notificationLogs.length === 0 ? (
                  <div className="text-center py-12 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-2">
                    <Bell className="w-8 h-8 text-slate-600 mx-auto" />
                    <div className="text-xs font-semibold text-slate-300">
                      Nicio notificare înregistrată încă în sesiune
                    </div>
                    <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                      Apasă pe butonul „Simulează & Testează Email” de mai sus sau trimite un formular din site pentru a vedea prima alertă în jurnal.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#05080e] text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="py-3 px-4">Data & Ora</th>
                          <th className="py-3 px-4">Tip Eveniment</th>
                          <th className="py-3 px-4">Brand / Client</th>
                          <th className="py-3 px-4">Buget</th>
                          <th className="py-3 px-4">Destinatar</th>
                          <th className="py-3 px-4">Status Transmitere</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
                        {notificationLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="py-2.5 px-4 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                            <td className="py-2.5 px-4 whitespace-nowrap">
                              {log.isSimulation ? (
                                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px]">
                                  Simulare Test
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px]">
                                  Lead Public Site
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-4 font-bold text-white">{log.brandName}</td>
                            <td className="py-2.5 px-4 text-slate-300">{log.budget}</td>
                            <td className="py-2.5 px-4 text-cyan-400">{log.recipient}</td>
                            <td className="py-2.5 px-4 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span>Trimis</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 10: BRAND KIT & LOGO DOWNLOADS */}
          {activeTab === 'logos' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Top Banner with Batch Download */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0a101f] to-[#070b14] border border-cyan-500/30 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    Export Vectorial SVG & High-Res PNG
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                    Toate Logo-urile Oficiale KROMAQ
                  </h3>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    Descarcă rapid orice variantă pentru Instagram, TikTok, YouTube, LinkedIn, editare video (CapCut / Premiere / After Effects), documente oficiale sau materiale print. Formatele SVG se redimensionează infinit fără pierdere de calitate.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    disabled={batchDownloading}
                    onClick={async () => {
                      setBatchDownloading(true);
                      try {
                        await downloadBrandKitZip();
                      } finally {
                        setBatchDownloading(false);
                      }
                    }}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>{batchDownloading ? 'Se arhivează .ZIP 4K...' : 'Descarcă Tot (.ZIP 4K + SVG)'}</span>
                  </button>
                </div>
              </div>

              {/* Grid of Generated Vector + PNG Logo Variants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {LOGO_ASSETS.map((asset: LogoAssetSpec) => {
                  const previewSvg = buildLogoSvg(asset.id);
                  const previewDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(previewSvg)}`;
                  const bgClass =
                    asset.previewBg === 'white'
                      ? 'bg-white border-slate-300'
                      : asset.previewBg === 'obsidian'
                      ? 'bg-[#06090e] border-slate-800'
                      : asset.previewBg === 'checker-light'
                      ? 'bg-slate-200 border-slate-300'
                      : 'bg-[#0b1220] border-slate-800';

                  return (
                    <div
                      key={asset.id}
                      className="p-5 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-4 shadow-lg"
                    >
                      <div className="space-y-3">
                        {/* Visual Preview Box */}
                        <div
                          className={`h-44 rounded-xl border ${bgClass} flex items-center justify-center p-4 overflow-hidden relative`}
                          style={
                            asset.previewBg.startsWith('checker')
                              ? {
                                  backgroundImage:
                                    asset.previewBg === 'checker-light'
                                      ? 'radial-gradient(#cbd5e1 1px, transparent 1px)'
                                      : 'radial-gradient(#1e293b 1px, transparent 1px)',
                                  backgroundSize: '14px 14px',
                                }
                              : undefined
                          }
                        >
                          <img
                            src={previewDataUrl}
                            alt={asset.title}
                            className="max-h-full max-w-full object-contain drop-shadow-md"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm font-bold text-white font-display">{asset.title}</h4>
                            <span className="text-[10px] font-mono text-cyan-400 shrink-0">
                              {asset.pngWidth}×{asset.pngHeight}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{asset.subtitle}</p>
                          <div className="text-[11px] text-slate-500 font-mono mt-1.5">
                            Recomandat: {asset.platforms}
                          </div>
                        </div>
                      </div>

                      {/* Download Buttons */}
                      <div className="flex items-center gap-2.5 pt-2 border-t border-slate-800/80">
                        <button
                          type="button"
                          disabled={downloadingLogoId === asset.id}
                          onClick={async () => {
                            setDownloadingLogoId(asset.id);
                            try {
                              await downloadPngFile(asset.id, asset.fileBaseName, asset.pngWidth, asset.pngHeight);
                            } finally {
                              setDownloadingLogoId(null);
                            }
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{downloadingLogoId === asset.id ? 'Export...' : 'Descarcă PNG'}</span>
                        </button>

                        {asset.supportsSvg && (
                          <button
                            type="button"
                            onClick={() => downloadSvgFile(asset.id, asset.fileBaseName)}
                            className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-cyan-400" />
                            <span>SVG Vector</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Master Visual Identity Sheet Asset from public/assets */}
                <div className="p-5 rounded-2xl bg-[#090e18] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-4 shadow-lg">
                  <div className="space-y-3">
                    <div className="h-44 rounded-xl border border-slate-800 bg-[#05080f] flex items-center justify-center p-2 overflow-hidden">
                      <img
                        src="/assets/aistudio/1._Kromaq_identitate_vizuala__1dad45bf.png"
                        alt="Kromaq Master Visual Identity Sheet"
                        className="max-h-full max-w-full object-contain rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Planșă Identitate Vizuală Completă</span>
                        </h4>
                        <span className="text-[10px] font-mono text-cyan-400 shrink-0">PNG Original</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Prezentarea completă de identitate vizuală, papetărie și mockup-uri Kromaq.
                      </p>
                      <div className="text-[11px] text-slate-500 font-mono mt-1.5">
                        Recomandat: Prezentări Clienți · Arhivă Brand · Referință Design
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-2 border-t border-slate-800/80">
                    <a
                      href="/assets/aistudio/1._Kromaq_identitate_vizuala__1dad45bf.png"
                      download="kromaq-identitate-vizuala-completa.png"
                      className="flex-1 py-2 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descarcă PNG Original</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Status Bar */}
          <div className="p-3 sm:px-6 bg-[#05080e] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono">Kromaq Social Media Engine • Cluj-Napoca, România</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-cyan-400 hover:underline text-xs cursor-pointer flex items-center gap-1"
            >
              <span>Mergi la Site-ul Public</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: MANUAL LEAD ENTRY */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="relative max-w-md w-full bg-[#0a0f1d] border border-cyan-500/40 p-6 rounded-2xl shadow-2xl space-y-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white font-display">Adăugare Manuală Lead Nou</h4>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Nume & Prenume Fondator</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  placeholder="Ex: Andrei Moldovan"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Adresă E-mail</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  placeholder="andrei@brand.ro"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Nume Brand / Firmă</label>
                <input
                  type="text"
                  required
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  placeholder="Ex: Cluj Brand Atelier SRL"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Handle Social (Instagram / TikTok)</label>
                <input
                  type="text"
                  value={newSocialHandle}
                  onChange={(e) => setNewSocialHandle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  placeholder="@brandatelier.cluj"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Pachet Servicii (Post-Apel)</label>
                <select
                  value={newSelectedPackage}
                  onChange={(e) => {
                    const pkg = SERVICE_PACKAGES.find((p) => p.id === e.target.value);
                    setNewSelectedPackage(e.target.value);
                    if (pkg) {
                      if (pkg.serviceIds.length > 0) setNewSelectedServices([...pkg.serviceIds]);
                      setNewTier(pkg.name);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                >
                  {SERVICE_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} (€{pkg.suggestedPriceEur}/mo)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Servicii Selectate Manual:</label>
                <div className="flex flex-wrap gap-1.5">
                  {AGENCY_SERVICES.map((srv) => {
                    const checked = newSelectedServices.includes(srv.id);
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => {
                          setNewSelectedPackage('custom');
                          setNewSelectedServices((prev) =>
                            checked ? prev.filter((id) => id !== srv.id) : [...prev, srv.id]
                          );
                        }}
                        className={`px-2 py-1 rounded-lg border text-[11px] flex items-center gap-1 cursor-pointer ${
                          checked
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {checked ? <CheckSquare className="w-3 h-3 text-cyan-400" /> : <Square className="w-3 h-3 text-slate-600" />}
                        <span>{srv.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Buget Lunar Estimat</label>
                <select
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="€500 — €1,000/mo">€500 — €1,000/mo</option>
                  <option value="€1,000 — €2,500/mo">€1,000 — €2,500/mo</option>
                  <option value="€2,500 — €5,000/mo">€2,500 — €5,000/mo</option>
                  <option value="€5,000+/mo">€5,000+/mo</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs mt-2 hover:brightness-110 cursor-pointer"
              >
                Salvează Înregistrarea
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PROGRAMARE FILMARE CLUJ */}
      {isNewShootModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setIsNewShootModalOpen(false)}
        >
          <div
            className="relative max-w-md w-full bg-[#0a0f1d] border border-cyan-500/40 p-6 rounded-2xl shadow-2xl space-y-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white font-display">Programare Filmare Pe Locație în Cluj</h4>
              <button
                type="button"
                onClick={() => setIsNewShootModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateShoot} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Nume Brand / Client</label>
                <input
                  type="text"
                  required
                  value={shootBrand}
                  onChange={(e) => setShootBrand(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  placeholder="Ex: Transylvania Tech Labs"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Locație În Cluj-Napoca</label>
                <input
                  type="text"
                  required
                  value={shootLocation}
                  onChange={(e) => setShootLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  placeholder="Ex: Piața Muzeului / Studio Kromaq"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Dată & Interval Orar</label>
                <input
                  type="text"
                  required
                  value={shootDate}
                  onChange={(e) => setShootDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  placeholder="Ex: Vineri, 10:00 - 14:00 EET"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Format & Target Livrabile</label>
                <input
                  type="text"
                  required
                  value={shootFormat}
                  onChange={(e) => setShootFormat(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  placeholder="Ex: 16 Reels 9:16 + B-Roll 4K"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs mt-2 hover:brightness-110 cursor-pointer"
              >
                Adaugă în Calendarul de Producție
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
