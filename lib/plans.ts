export type Plan = {
  name: string;
  tag: string;
  price: string;
  highlight?: boolean;
  points: string[];
};

export const PLANS: Plan[] = [
  {
    name: "starter",
    tag: "7 days",
    price: "₹999",
    points: [
      "1 meal/day (lunch or dinner)",
      "rotation menu + portion control",
      "whatsapp support",
      "pause/skip option"
    ]
  },
  {
    name: "most consistent",
    tag: "14 days",
    price: "₹1899",
    highlight: true,
    points: [
      "2 meals/day (lunch + dinner)",
      "goal-based portion direction",
      "weekly progress check-in template",
      "priority delivery slots"
    ]
  },
  {
    name: "transformation",
    tag: "30 days",
    price: "₹3999",
    points: [
      "2–3 meals/day options",
      "custom exclusions supported",
      "macro cues on popular items",
      "corporate lunch add-on available"
    ]
  }
];

export const FAQ = [
  {
    q: "is it only for weight loss?",
    a: "no — plans support fat loss, muscle gain, balanced eating, and select medical-friendly preferences (e.g., low oil / lower sugar)."
  },
  {
    q: "do you have veg-only plans?",
    a: "yes. choose veg, jain, eggetarian, or non-veg in the meal plan builder. (you can also add exclusions)."
  },
  {
    q: "how does “ai” help here?",
    a: "it’s smart personalization: goals, diet type, schedule, and exclusions → portioning + meal rotation."
  },
  {
    q: "can i order one-off meals without subscription?",
    a: "yes. subscriptions are for people who want daily structure; one-off ordering stays available."
  }
];
