// Runs before first paint. Dark is the default; only an explicit "light" choice
// (saved by the toggle) removes the class.
export const themeScript = `(function(){try{document.documentElement.classList.toggle("dark",localStorage.getItem("theme")!=="light")}catch(e){}})()`;
