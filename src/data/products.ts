
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Kerepek Ubi Pedas",
    description: "Crispy cassava chips with spicy seasoning. A perfect snack for movie nights or gatherings with friends and family.",
    price: 12.90,
    image: "/kerepek-ubi.jpg",
    category: "Kerepek",
    ingredients: ["Cassava", "Vegetable Oil", "Chili Powder", "Salt", "Sugar", "MSG"],
    isNew: false,
    isBestSeller: true,
    weight: "200g",
    stock: 50
  },
  {
    id: "2",
    name: "Kerepek Pisang",
    description: "Traditional banana chips made from selected bananas, sliced thin and fried to perfection.",
    price: 9.90,
    image: "/kerepek-pisang.jpg",
    category: "Kerepek",
    ingredients: ["Banana", "Vegetable Oil", "Salt", "Sugar"],
    isNew: false,
    isBestSeller: false,
    weight: "150g",
    stock: 35
  },
  {
    id: "3",
    name: "Sambal Bawang",
    description: "Delicious homemade sambal with caramelized shallots. Perfect companion for any meal or snack.",
    price: 15.90,
    image: "/sambal-bawang.jpg",
    category: "Sambal",
    ingredients: ["Chili", "Shallots", "Garlic", "Vegetable Oil", "Salt", "Sugar"],
    isNew: true,
    isBestSeller: false,
    weight: "200g",
    stock: 25
  },
  {
    id: "4",
    name: "Kerepek Kentang",
    description: "Homestyle potato chips with just the right amount of crunch and salt.",
    price: 10.90,
    image: "/kerepek-kentang.jpg",
    category: "Kerepek",
    ingredients: ["Potato", "Vegetable Oil", "Salt"],
    isNew: false,
    isBestSeller: false,
    weight: "180g",
    stock: 40
  },
  {
    id: "5",
    name: "Kuih Bahulu",
    description: "Traditional Malaysian sponge cake with a light and fluffy texture. Perfect with tea or coffee.",
    price: 8.90,
    image: "/kuih-bahulu.jpg",
    category: "Snacks",
    ingredients: ["Flour", "Eggs", "Sugar", "Vanilla Extract"],
    isNew: false,
    isBestSeller: true,
    weight: "250g",
    stock: 30
  },
  {
    id: "6",
    name: "Sambal Udang Kering",
    description: "Spicy dried shrimp sambal that adds a perfect kick to any rice dish.",
    price: 18.90,
    image: "/sambal-udang.jpg",
    category: "Sambal",
    ingredients: ["Dried Shrimp", "Chili", "Onion", "Garlic", "Vegetable Oil", "Salt", "Sugar"],
    isNew: false,
    isBestSeller: false,
    weight: "150g",
    stock: 20
  },
  {
    id: "7",
    name: "Kerepek Tempe",
    description: "Crispy fermented soybean chips with a savory, nutty flavor.",
    price: 11.90,
    image: "/kerepek-tempe.jpg",
    category: "Kerepek",
    ingredients: ["Tempeh", "Vegetable Oil", "Salt", "Sugar", "Coriander"],
    isNew: true,
    isBestSeller: false,
    weight: "150g",
    stock: 15
  },
  {
    id: "8",
    name: "Snack Gift Box",
    description: "Assorted Malaysian snacks in an elegant gift box. Perfect for sharing or as a thoughtful present.",
    price: 49.90,
    image: "/gift-box.jpg",
    category: "Gift Packs",
    isNew: false,
    isBestSeller: true,
    weight: "750g",
    stock: 10,
    discountPercentage: 10
  }
];
