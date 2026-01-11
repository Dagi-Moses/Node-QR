// src/constants/plans.ts

export interface Plan {
  name: string;
  amount: number;
  currency: string;
  interval: string;
  isPopular?: boolean;
  description: string;
  features: string[];
}

export const availablePlans: Plan[] = [
  {
    name: "Weekly Plan",
    amount: 100,
    currency: "Naira",
    interval: "week",
    description:
      "Good for short-term projects or testing all premium QR features.",
    features: [
      "Unlimited QR codes",
      "Custom branding",
      "Basic analytics",
      "Cancel anytime",
    ],
  },
  {
    name: "Monthly Plan",
    amount: 300,
    currency: "Naira",
    interval: "month",
    isPopular: true,
    description:
      "Ideal if you actively use QR codes for business, events, or marketing.",
    features: [
      "Unlimited QR codes",
      "Advanced analytics (scans, devices, locations)",
      "Custom domains",
      "Priority support",
      "Cancel anytime",
    ],
  },
  {
    name: "Yearly Plan",
    amount: 3000,
    currency: "Naira",
    interval: "year",
    description:
      "Best value for businesses that rely on QR codes all year round.",
    features: [
      "Unlimited QR codes",
      "Full analytics suite",
      "Custom branding & domains",
      "Team access",
      "Cancel anytime",
    ],
  },
];

const priceIdMap: Record<string, string> = {
  week: process.env.STRIPE_PRICE_WEEKLY!,
  month: process.env.STRIPE_PRICE_MONTHLY!,
  year: process.env.STRIPE_PRICE_YEARLY!,
};

export const getPriceIdFromType = (planType: string) => priceIdMap[planType];
