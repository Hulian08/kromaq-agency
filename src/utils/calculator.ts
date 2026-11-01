export type IndustryType = 'ecommerce' | 'saas' | 'luxury' | 'fintech' | 'creator';
export type PlatformFocus = 'omnichannel' | 'tiktok_reels' | 'youtube_shorts' | 'linkedin_b2b';

export interface CalculationInput {
  industry: IndustryType;
  monthlyBudget: number; // in USD
  currentReach: number; // monthly views/impressions
  platformFocus?: PlatformFocus;
}

export interface CalculationResult {
  projectedReach: number;
  projectedEngagement: number;
  estimatedRoas: number;
  projectedRevenueLift: number;
  recommendedTier: 'Launch Accelerator' | 'Motion & Performance' | 'Enterprise Bespoke';
  tierPrice: number;
  keyStrategyFocus: string;
  monthlyAssetsCount: number;
  budgetSplit: {
    motionProductionPercent: number;
    paidAmplificationPercent: number;
    aiTelemetryPercent: number;
  };
}

export const INDUSTRY_MULTIPLIERS: Record<
  IndustryType,
  { reachFactor: number; roasFactor: number; label: string; defaultFocus: string; icon: string }
> = {
  ecommerce: {
    reachFactor: 4.8,
    roasFactor: 4.4,
    label: 'E-Commerce & DTC',
    defaultFocus: 'High-converting TikTok & Instagram Reels creative with rapid iteration',
    icon: 'ShoppingBag',
  },
  saas: {
    reachFactor: 3.6,
    roasFactor: 3.8,
    label: 'SaaS & B2B Tech',
    defaultFocus: 'Thought-leadership motion clips on LinkedIn & YouTube Shorts pipeline',
    icon: 'Cpu',
  },
  luxury: {
    reachFactor: 4.2,
    roasFactor: 5.1,
    label: 'Luxury & Lifestyle',
    defaultFocus: 'Cinema-grade aesthetic storytelling, influencer co-creations & curation',
    icon: 'Gem',
  },
  fintech: {
    reachFactor: 3.2,
    roasFactor: 3.9,
    label: 'FinTech & Wealth',
    defaultFocus: 'Trust-building educational hooks, high-production explainer motion',
    icon: 'TrendingUp',
  },
  creator: {
    reachFactor: 5.5,
    roasFactor: 3.5,
    label: 'Creators & Media Brands',
    defaultFocus: 'Multi-platform viral distribution & algorithmic retention maximization',
    icon: 'Sparkles',
  },
};

export function calculateGrowthProjections(input: CalculationInput): CalculationResult {
  const { industry, monthlyBudget, currentReach, platformFocus = 'omnichannel' } = input;
  const config = INDUSTRY_MULTIPLIERS[industry] || INDUSTRY_MULTIPLIERS.ecommerce;

  // Platform multiplier adjustment
  let platformReachMod = 1.0;
  if (platformFocus === 'tiktok_reels') platformReachMod = 1.15;
  if (platformFocus === 'youtube_shorts') platformReachMod = 1.05;
  if (platformFocus === 'linkedin_b2b') platformReachMod = 0.85;

  // Base reach projection: current reach multiplied by agency capability factor plus budget-driven scale
  const budgetReachBonus = Math.floor((monthlyBudget / 1000) * 85000 * platformReachMod);
  const baselineGrowth = Math.floor(currentReach * (config.reachFactor * 0.7));
  const projectedReach = Math.max(65000, baselineGrowth + budgetReachBonus);

  // Engagement estimated around 3.8% to 6.8% based on short-form benchmark
  const engagementRate = 0.048;
  const projectedEngagement = Math.floor(projectedReach * engagementRate);

  // ROAS estimation based on industry factor adjusted for budget tier
  const budgetScaleFactor = monthlyBudget > 10000 ? 1.15 : monthlyBudget > 5000 ? 1.0 : 0.9;
  const rawRoas = config.roasFactor * budgetScaleFactor;
  const estimatedRoas = Math.round(rawRoas * 10) / 10;

  // Revenue lift in USD
  const projectedRevenueLift = Math.round(monthlyBudget * estimatedRoas);

  // Recommended agency tier & asset volume
  let recommendedTier: CalculationResult['recommendedTier'];
  let tierPrice: number;
  let monthlyAssetsCount: number;

  if (monthlyBudget >= 12000 || currentReach >= 500000) {
    recommendedTier = 'Enterprise Bespoke';
    tierPrice = 12500;
    monthlyAssetsCount = 42;
  } else if (monthlyBudget >= 4000 || currentReach >= 100000) {
    recommendedTier = 'Motion & Performance';
    tierPrice = 6900;
    monthlyAssetsCount = 24;
  } else {
    recommendedTier = 'Launch Accelerator';
    tierPrice = 3800;
    monthlyAssetsCount = 12;
  }

  // Strategic budget split
  const budgetSplit = {
    motionProductionPercent: 50,
    paidAmplificationPercent: 35,
    aiTelemetryPercent: 15,
  };

  return {
    projectedReach,
    projectedEngagement,
    estimatedRoas,
    projectedRevenueLift,
    recommendedTier,
    tierPrice,
    keyStrategyFocus: config.defaultFocus,
    monthlyAssetsCount,
    budgetSplit,
  };
}

export function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
