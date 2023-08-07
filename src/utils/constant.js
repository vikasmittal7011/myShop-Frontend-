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

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
