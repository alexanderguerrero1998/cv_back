import { connect_db } from "../config/connect_db.js";
import { Section } from "../models/section.js";

await connect_db();

// Use .insertMany() when you need insert at least two objects
await Section.insertMany([
  {
    title: "Projects",
    subtitle: "My development projects",
    icon: "pi pi-code",
    color: "#3b82f6",
    type: "internal",
    route: "/projects",
    order: 1,
    active: true,
  },
  {
    title: "Education",
    subtitle: "My academic background",
    icon: "pi pi-book",
    color: "#10b981",
    type: "internal",
    route: "/education",
    order: 2,
    active: true,
  },
  {
    title: "GitHub",
    subtitle: "My open source repositories",
    icon: "pi pi-github",
    color: "#8b5cf6",
    type: "external",
    url: "https://github.com/alcon",
    order: 3,
    active: true,
  },
  {
    title: "LinkedIn",
    subtitle: "My professional profile",
    icon: "pi pi-linkedin",
    color: "#f59e0b",
    type: "external",
    url: "https://linkedin.com/in/alcon",
    order: 4,
    active: true,
  },
]);

console.log("Sections creted");
process.exit(0);
