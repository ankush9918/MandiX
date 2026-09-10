export interface AIDemandForecast {
  crop: string;
  currentDemand: number; // in Quintals / Tons
  predictedDemand: number;
  trend: 'Upward' | 'Stable' | 'Downward';
  confidence: number; // Percentage e.g. 94
  recommendedHarvestQty: string;
  reason: string;
  priceImpact: string;
}

export const mockDemandForecasts: AIDemandForecast[] = [
  {
    crop: 'Wheat (Sharbati)',
    currentDemand: 14200,
    predictedDemand: 18500,
    trend: 'Upward',
    confidence: 94,
    recommendedHarvestQty: '100 - 150 Quintals per farm lot',
    reason: 'Festival season & wedding procurement demand peaking across North Indian mills.',
    priceImpact: '+4.5% price premium expected next 14 days'
  },
  {
    crop: 'Nashik Red Onion',
    currentDemand: 22000,
    predictedDemand: 26800,
    trend: 'Upward',
    confidence: 91,
    recommendedHarvestQty: '50 - 80 Quintals',
    reason: 'Low storage arrivals in Southern corridors and high consumer retail movement.',
    priceImpact: '+6.2% price rise anticipated'
  },
  {
    crop: 'Hybrid Tomato',
    currentDemand: 8900,
    predictedDemand: 8200,
    trend: 'Stable',
    confidence: 88,
    recommendedHarvestQty: '15 - 25 Crates daily',
    reason: 'Balanced regional arrivals from Himachal and local polyhouses.',
    priceImpact: 'Stable within ±1.5%'
  },
  {
    crop: 'Pahadi Potato',
    currentDemand: 16500,
    predictedDemand: 19800,
    trend: 'Upward',
    confidence: 93,
    recommendedHarvestQty: '80 - 120 Quintals',
    reason: 'Processing plants increasing procurement for potato chips and flakes.',
    priceImpact: '+3.8% demand surge'
  },
  {
    crop: 'Mustard Seeds',
    currentDemand: 7400,
    predictedDemand: 6900,
    trend: 'Downward',
    confidence: 86,
    recommendedHarvestQty: 'Hold stock if possible for 3 weeks',
    reason: 'Imported crude palm oil price dip easing domestic solvent oil pressure.',
    priceImpact: '-2.0% short-term dip'
  }
];

export interface AIPricePrediction {
  commodity: string;
  currentMandiRate: number;
  mandixSuggestedRate: number;
  expectedRevenueBoost: string;
  marketTrend: 'Bullish' | 'Neutral' | 'Bearish';
  aiConfidence: number;
  advice: string;
}

export const mockPricePredictions: Record<string, AIPricePrediction> = {
  'Tomato': {
    commodity: 'Tomato',
    currentMandiRate: 25,
    mandixSuggestedRate: 28,
    expectedRevenueBoost: '+12.0%',
    marketTrend: 'Bullish',
    aiConfidence: 92,
    advice: 'Direct farm lot listing without commission gives you ₹28/kg while local APMC traders offer ₹24/kg.'
  },
  'Wheat': {
    commodity: 'Wheat',
    currentMandiRate: 28,
    mandixSuggestedRate: 32,
    expectedRevenueBoost: '+14.3%',
    marketTrend: 'Bullish',
    aiConfidence: 96,
    advice: 'Sharbati grain quality certifies for Grade-A benchmark. Retail flour millers are paying instant ₹32/kg with escrow.'
  },
  'Potato': {
    commodity: 'Potato',
    currentMandiRate: 20,
    mandixSuggestedRate: 24,
    expectedRevenueBoost: '+20.0%',
    marketTrend: 'Bullish',
    aiConfidence: 89,
    advice: 'Bundle in 50kg aerated bags for B2B buyer pickup at your farm gate to secure ₹24/kg.'
  },
  'Onion': {
    commodity: 'Onion',
    currentMandiRate: 22,
    mandixSuggestedRate: 26,
    expectedRevenueBoost: '+18.2%',
    marketTrend: 'Bullish',
    aiConfidence: 94,
    advice: 'High moisture-free lots from Nashik demand export grade pricing. Direct buyer matching is active.'
  }
};

export const defaultBotResponses = {
  priceQueryHi: (crop: string, rate: string, mandi: string) => 
    `🌾 **आज ${crop} का मंडी भाव:**\n${mandi} में APMC बेंचमार्क रेट **${rate}** है।\nMANDI-X पर आप बिना किसी बिचौलिए के सीधे खरीददारों को बेच सकते हैं। क्या आप अपनी फसल लिस्ट करना चाहते हैं?`,
  priceQueryEn: (crop: string, rate: string, mandi: string) => 
    `🌾 **Today's Market Rate for ${crop}:**\nAPMC Benchmark at ${mandi} is **${rate}**.\nOn MANDI-X, verified buyers are paying zero-commission direct rates. Would you like to list a lot or find buyers?`,
  pickupQueryHi: () =>
    `🚚 **फार्म-गेट पिकअप सहायता:**\nहमारी लॉजिस्टिक्स टीम आपके खेत से सीधे ट्रांसपोर्टर वाहन भेजने के लिए तैयार है। किसान डैशबोर्ड में 'Pickup' सेक्शन पर जाकर समय और तारीख चुनें।`,
  pickupQueryEn: () =>
    `🚚 **Farm-Gate Logistics Assistance:**\nOur scheduled transporter network picks up produce directly from your gate. Go to your Farmer Dashboard > Pickup section to select your preferred date and slot.`,
  demandQueryHi: () =>
    `📊 **फसल डिमांड रिपोर्ट:**\nअगले 7-14 दिनों में गेहूं, प्याज और आलू की मांग में 15% से 22% की बढ़ोतरी का अनुमान है। आपको सलाह दी जाती है कि ग्रेड-ए क्वालिटी बनाए रखें।`,
  demandQueryEn: () =>
    `📊 **AI Demand Intelligence:**\nExpect a 15% to 22% surge in demand for Wheat, Onion, and Potato over the next 14 days due to North Indian urban retail orders.`
};
