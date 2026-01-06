export type MenuItem = { name: string; kcal: number; protein: string; price: number };

export type MenuCategory = {
  category: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    category: "power bowls",
    items: [
      { name: "high-protein paneer bowl", kcal: 520, protein: "32g", price: 219 },
      { name: "rajma quinoa bowl", kcal: 480, protein: "22g", price: 199 },
      { name: "chicken millet bowl", kcal: 560, protein: "38g", price: 259 }
    ]
  },
  {
    category: "nawabi + healthy",
    items: [
      { name: "lucknowi dal + brown rice", kcal: 510, protein: "18g", price: 179 },
      { name: "shami kebab (lean) + salad", kcal: 420, protein: "28g", price: 249 },
      { name: "kathal biryani (light)", kcal: 540, protein: "16g", price: 209 }
    ]
  },
  {
    category: "breakfast + snacks",
    items: [
      { name: "besan chilla + curd", kcal: 360, protein: "20g", price: 129 },
      { name: "sprouts chaat", kcal: 280, protein: "14g", price: 109 },
      { name: "overnight oats (seasonal)", kcal: 340, protein: "16g", price: 149 }
    ]
  }
];
