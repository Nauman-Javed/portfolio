// Every language file must provide all of these keys. Plural forms differ per
// language (Arabic has six), so the skill-count keys are open-ended.
export type Messages = {
  common: {
    skipToContent: string;
    opensInNewTab: string;
    myResume: string;
    resume: string;
    present: string;
    backHome: string;
    backToTop: string;
    toggleTheme: string;
    language: string;
    homeLabel: string;
    loading: string;
  };
  nav: {
    about: string;
    skills: string;
    experience: string;
    projects: string;
    main: string;
    openMenu: string;
    closeMenu: string;
  };
  home: { comingSoon: string; beingSetUp: string };
  hero: {
    viewWork: string;
    testSuite: string;
    checksPassing: string;
    deploying: string;
  };
  about: {
    title: string;
    years: string;
    projects: string;
    technologies: string;
  };
  skills: { title: string; technologies: string; [pluralForm: string]: string };
  experience: {
    title: string;
    education: string;
    types: Record<string, string>;
  };
  projects: {
    selectedWork: string;
    allProjects: string;
    pageDescription: string;
    none: string;
    viewProject: string;
    liveSite: string;
    liveSiteFor: string;
    screenshot: string;
    overview: string;
    builtWith: string;
    sourceCode: string;
    gallery: string;
    viewProjects: string;
  };
  contact: { title: string; text: string };
  footer: { madeWith: string; love: string; inCountry: string };
  errors: {
    label: string;
    title: string;
    text: string;
    reference: string;
    tryAgain: string;
    notFoundTitle: string;
    notFoundText: string;
  };
};
