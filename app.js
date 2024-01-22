const navBtn = document.querySelector('.nav-menu-button');
const overlayToggle = document.querySelector('.toggle-overlay');
const themeBtn = document.querySelector('.theme-select');

document.addEventListener('click', (e) => {
    if (e.target == navBtn || e.target.parentNode == navBtn || e.target.parentNode.parentNode == navBtn) {
        document.querySelector('aside').classList.add('visible');
        document.querySelector('.toggle-overlay').classList.add('enabled');
    }
    if (e.target == overlayToggle) {
        document.querySelector('aside').classList.remove('visible');
        document.querySelector('.toggle-overlay').classList.remove('enabled');
    }
    console.log(e.target);
});

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

document.addEventListener('click', () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
    if (prefersDarkScheme.matches) {
        var theme = document.body.classList.contains("light-theme")
            ? "light"
            : "dark";
    } else {
        var theme = document.body.classList.contains("dark-theme")
            ? "dark"
            : "light";
    }
    localStorage.setItem("theme", theme);
});