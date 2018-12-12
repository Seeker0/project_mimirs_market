const categories = [
  { name: "Automotive", id: 1 },
  { name: "Kids", id: 2 },
  { name: "Garden", id: 3 },
  { name: "Clothing", id: 4 },
  { name: "Shoes", id: 5 },
  { name: "Toys", id: 6 },
  { name: "Outdoors", id: 7 },
  { name: "Electronics", id: 8 },
  { name: "Grocery", id: 9 },
  { name: "Home", id: 10 }
];
const sorts = [
  { name: "name-asc", string: "Sort by Name Ascending" },
  { name: "name-desc", string: "Sort by Name Descending" },
  { name: "price-asc", string: "Sort by Price Ascending" },
  { name: "price-desc", string: "Sort by Price Descending" },
  { name: "newest", string: "Sort by Newest" },
  { name: "oldest", string: "Sort by Oldest" }
];
const prices = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

module.exports = { categories, sorts, prices };
