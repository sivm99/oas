import { User } from "@/Helper/types";

const PLANS = {
  star: {
    title: "Star ⭐️ 🌟",
    price: "49",
    currency: "₹",
    features: [
      {
        text: "1 Destination Address",
        description:
          "Main email address where all your aliases will forward to",
      },
      {
        text: "20 Email Aliases",
        description:
          "Create up to 20 different email aliases to protect your main email",
      },
      {
        text: "1,000 Email Forwarding/month",
        description:
          "Forward up to 1,000 emails per month through your aliases",
      },
      {
        text: "Sub 1-day Support",
        description: "Get support responses within 24 hours",
      },
      {
        text: "10 Premium Links (go.1as.in)",
        description:
          "Create 10 shortened links using our premium go.1as.in domain",
      },
    ],
    unavailableFeatures: [
      {
        text: "Multiple Destination Addresses",
        description: "Ability to forward to more than one main email address",
      },
      {
        text: "Custom Domain Shortlinks",
        description: "Use your own domain for shortened links",
      },
      {
        text: "Priority Support",
        description: "Get faster support response times",
      },
    ],
    plan: "star" as User["plan"],
  },
  galaxy: {
    title: "Galaxy 🌌 🌌",
    price: "79",
    currency: "₹",
    features: [
      {
        text: "Everything Included in the Star Plan",
        description: "All features from the Star plan plus more",
      },
      {
        text: "2 Destination Addresses",
        description:
          "Forward your aliases to two different main email addresses",
      },
      {
        text: "100 Email Aliases",
        description: "Create up to 100 different email aliases",
      },
      {
        text: "10,000 Email Forwarding/month",
        description:
          "Forward up to 10,000 emails per month through your aliases",
      },
      {
        text: "Priority Support",
        description: "Get faster support response times with priority queue",
      },
      {
        text: "100 Premium Links (go.1as.in/link and n3y.in/link)",
        description:
          "Create 100 shortened links using both our premium domains",
      },
      {
        text: "Custom Slugs - n3y.in/user/fb & n3y.in/user/ig ...",
        description: "Create custom URLs for your shortened links",
      },
    ],
    unavailableFeatures: [],
    plan: "galaxy" as User["plan"],
  },
  free: {
    title: "Free Tier 🚀",
    price: "0",
    currency: "₹",
    features: [
      {
        text: "1 Destination Address",
        description: "One main email address for forwarding",
      },
      {
        text: "5 Email Aliases",
        description: "Create up to 5 different email aliases",
      },
      {
        text: "100 Email Forwarding/month",
        description: "Forward up to 100 emails per month",
      },
      {
        text: "Community Support",
        description: "Get help through our community forums",
      },
      {
        text: "No Link Shortener",
        description: "Link shortening not available in free tier",
      },
    ],
    unavailableFeatures: [
      {
        text: "Premium Link Shortening",
        description: "Access to our premium link shortening domains",
      },
      {
        text: "Custom Slugs",
        description: "Ability to customize your shortened URLs",
      },
      {
        text: "Priority Support",
        description: "Faster support response times",
      },
    ],
    plan: "free" as User["plan"],
  },
};
export default PLANS;
