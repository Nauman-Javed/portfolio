import type { Education, Experience, Profile, Project, Skill } from "./types";

export const profile: Profile = {
  name: "Nauman Javed Qureshi",
  headline: "Front-End Developer",
  summary:
    "I build fast, accessible interfaces with React and Next.js, and care about the details that make software feel good to use.",
  about:
    "Front-End Developer with 1 year of experience in React.js and Next.js, proficient in HTML, CSS, and JavaScript/TypeScript. Dedicated to crafting visually appealing, user-friendly interfaces, I aim to contribute my skills to the success of a dynamic and innovative team.",
  location: "Islamabad, Pakistan",
  email: "naumanj841@gmail.com",
  imageUrl: null,
  resumeUrl: null,
  availability: "Open to new opportunities",
  heroLead: "I engineer",
  heroPhrases: [
    "fast interfaces",
    "accessible UIs",
    "type-safe apps",
    "things that ship",
  ],
};

export const projects: Project[] = [
  {
    slug: "food-delivery",
    title: "Food Delivery",
    shortDescription:
      "Full stack app for finding restaurants and food items. Currently in development.",
    description:
      "A full stack application where users can search for restaurants and food items. Built with Next.js and TypeScript, with a modern, responsive interface made from Tailwind CSS and Material UI components.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Material UI"],
    coverImageUrl: "/projects/food-delivery.png",
    liveUrl: "https://food-delivery-app-umber.vercel.app/",
    githubUrl: null,
    featured: true,
    published: true,
    order: 1,
  },
  {
    slug: "car-hub",
    title: "Car Hub",
    shortDescription:
      "Search and browse cars through a modern, responsive interface.",
    description:
      "A front-end application where users can seamlessly search for cars. Built with Next.js, with a modern and responsive user interface designed using Tailwind CSS and Headless UI, and car data pulled from Rapid API.",
    techStack: ["Next.js", "Tailwind CSS", "Headless UI", "Rapid API"],
    coverImageUrl: "/projects/carhub.png",
    liveUrl: "https://carhub-nextjs-topaz.vercel.app/",
    githubUrl: null,
    featured: true,
    published: true,
    order: 2,
  },
  {
    slug: "youtube-clone",
    title: "YouTube Clone",
    shortDescription:
      "Watch videos online with channel pages, categories and video sections.",
    description:
      "A front-end application for watching videos online, with channel pages, custom categories and video sections. Built with React and Material UI, fetching data from Rapid API and surfacing feedback with React Toastify.",
    techStack: [
      "React",
      "React Router",
      "Material UI",
      "React Toastify",
      "Rapid API",
    ],
    coverImageUrl: "/projects/youtube.png",
    liveUrl: "https://nauman-youtube-clone.netlify.app/",
    githubUrl: null,
    featured: true,
    published: true,
    order: 3,
  },
  {
    slug: "recipe-book",
    title: "Recipe Book",
    shortDescription:
      "Manage your recipes with full CRUD and Firebase authentication.",
    description:
      "A front-end application for managing recipes with basic CRUD operations. Built with React and Bootstrap 5, using Context API and reducers for state, Firebase authentication for sign-in, and React Toastify for notifications.",
    techStack: [
      "React",
      "React Router",
      "Bootstrap 5",
      "Context API",
      "Firebase Auth",
    ],
    coverImageUrl: "/projects/recipe.png",
    liveUrl: "https://recipe-book-88940.web.app/",
    githubUrl: null,
    featured: false,
    published: true,
    order: 4,
  },
  {
    slug: "task-io",
    title: "Task.io",
    shortDescription: "A daily task manager with basic CRUD operations.",
    description:
      "A front-end application for managing daily tasks with basic CRUD operations. Built with React and Material UI, using Context API and reducers for state and Moment.js for dates.",
    techStack: [
      "React",
      "React Router",
      "Material UI",
      "Context API",
      "Moment.js",
    ],
    coverImageUrl: "/projects/task.png",
    liveUrl: "https://nauman-taskio.netlify.app/",
    githubUrl: null,
    featured: false,
    published: true,
    order: 5,
  },
];

export const experience: Experience[] = [
  {
    id: "exp-care",
    company: "Center for Advance Research in Engineering",
    role: "Implementation Engineer",
    employmentType: "Full-time",
    location: "Islamabad",
    startDate: new Date("2023-11-01"),
    endDate: null,
    bullets: [],
    order: 1,
  },
  {
    id: "exp-qxc",
    company: "Quell x Code",
    role: "3D Artist",
    employmentType: "Internship",
    location: "Islamabad",
    startDate: new Date("2022-08-01"),
    endDate: new Date("2022-09-01"),
    bullets: [],
    order: 2,
  },
];

export const education: Education[] = [
  {
    id: "edu-cust",
    institution: "Capital University of Science and Technology",
    degree: "Bachelors in Computer Science",
    startYear: 2019,
    endYear: 2023,
  },
];

const skill = (category: string, names: string[]): Skill[] =>
  names.map((name, i) => ({
    id: `${category}-${name}`,
    name,
    category,
    order: i,
  }));

export const skills: Skill[] = [
  ...skill("Frontend", [
    "React",
    "Next.js",
    "Redux",
    "React Router",
    "Tailwind CSS",
    "Material UI",
    "Bootstrap 5",
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "SASS",
  ]),
  ...skill("Backend", ["Firebase"]),
  ...skill("Databases", ["MySQL"]),
  ...skill("Version control", ["Git", "GitHub"]),
  ...skill("Tools & practices", ["VS Code", "Postman"]),
];

export const publishedProjects = () =>
  projects.filter((p) => p.published).sort((a, b) => a.order - b.order);
export const featuredProjects = () =>
  publishedProjects().filter((p) => p.featured);
export const projectBySlug = (slug: string) =>
  publishedProjects().find((p) => p.slug === slug);
