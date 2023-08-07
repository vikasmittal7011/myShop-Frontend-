export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Team", href: "/team" },
  { name: "Projects", href: "/pro" },
  { name: "Calendar", href: "/cal" },
];

export const profileLinks = [
  { name: "Your Profile", href: "" },
  { name: "Settings", href: "" },
  { name: "Sign out", href: "" },
];

export const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
];

export const Classe = {
  h1_size:
    "2xl:text-6xl lg:text-3xl md:text-2xl sm:text-xl l:text-xl s:text-xl",
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
