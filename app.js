const navBtn = document.querySelector('.nav-menu-button');
const overlayToggle = document.querySelector('.toggle-overlay');
const themeMenu = document.querySelector('#theme-select');
const headerMenu = document.querySelector('.header-menu');
let activeMenu;

document.addEventListener('click', (e) => {
    if (!activeMenu.contains(e.target)) {
        activeMenu.classList.remove('active');
    }
    if (e.target == navBtn) {
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

headerMenu.addEventListener('click', (e) => {
    if(activeMenu && !activeMenu.contains(e.target)) {
        activeMenu.classList.remove('active');
        //current issue is that this is immediately counteracted
    }
    if(e.target.tagName == 'BUTTON') {
        e.target.nextElementSibling.classList.toggle('active'); //by this
        activeMenu = document.querySelector('.active');
        e.stopPropagation();
    }
});

themeMenu.addEventListener("click", (e) => {
    console.log(e.target.dataset.theme);
    if(e.target.tagName == 'LI') {
        changeTheme(e.target.dataset.theme);
    }
});

function changeTheme(theme) {
    document.body.className = '';
    switch (theme) {
        case 'light':
            document.body.classList.add("light-theme");
            break;
        case 'dark':
            document.body.classList.add("dark-theme");
            break;
        case 'midnight':
            document.body.classList.add("midnight-theme");
            break;
        case 'system':
            if(prefersDarkScheme.matches) {
                document.body.classList.add("dark-theme");
            } else {
                document.body.classList.add("light-theme");
            }
            break;
    }
    document.body.dataset.mode = theme;
    localStorage.setItem("theme", theme);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    document.body.className = '';
    if(prefersDarkScheme.matches) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.add("light-theme");
    }
});