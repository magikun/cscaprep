import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    priceIdMonthly: null,
    priceIdYearly: null,
  },
  pro: {
    name: "Pro",
    price: 9,
    priceYearly: 89,
    priceIdMonthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
    priceIdYearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
  },
} as const;
