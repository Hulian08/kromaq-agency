import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateGrowthProjections, formatCompactNumber, formatCurrency } from './calculator';

test('calculateGrowthProjections outputs correct values for ecommerce', () => {
  const result = calculateGrowthProjections({
    industry: 'ecommerce',
    monthlyBudget: 5000,
    currentReach: 100000,
    platformFocus: 'tiktok_reels',
  });

  assert.ok(result.projectedReach > 100000, 'Projected reach should exceed initial reach');
  assert.ok(result.estimatedRoas >= 3.0, 'ROAS should be at least 3.0');
  assert.equal(result.recommendedTier, 'Motion & Performance');
  assert.equal(result.tierPrice, 6900);
  assert.equal(result.monthlyAssetsCount, 24);
  assert.equal(result.budgetSplit.motionProductionPercent, 50);
});

test('calculateGrowthProjections recommends enterprise tier for large budget', () => {
  const result = calculateGrowthProjections({
    industry: 'luxury',
    monthlyBudget: 15000,
    currentReach: 600000,
  });

  assert.equal(result.recommendedTier, 'Enterprise Bespoke');
  assert.equal(result.tierPrice, 12500);
  assert.equal(result.monthlyAssetsCount, 42);
});

test('formatCompactNumber formats correctly', () => {
  assert.equal(formatCompactNumber(1500000), '1.5M');
  assert.equal(formatCompactNumber(250000), '250K');
  assert.equal(formatCompactNumber(500), '500');
});

test('formatCurrency formats USD correctly', () => {
  assert.equal(formatCurrency(6900), '$6,900');
});
