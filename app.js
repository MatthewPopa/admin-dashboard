const navBtn = document.querySelector('.nav-menu-button');
const overlayToggle = document.querySelector('.toggle-overlay');
const themeMenu = document.querySelector('#theme-select');
const headerMenu = document.querySelector('.header-menu');
let activeMenu = false;
let activeMenu2 = false;
const progressBars = document.querySelectorAll('.progress');
const tooltipInfo = document.querySelectorAll('.tooltip');
const tooltip = document.querySelector('.tooltip-modal');
const earningsBars = document.querySelectorAll('.bar');
const weeklyEarningsBars = document.querySelectorAll('.weekly-bar');
const moreMenus = document.querySelectorAll('.more');

function updateProgress() {
    progressBars.forEach((element) => {
        let progressFill = element.querySelector('.progress-fill');
        let percent = element.querySelector('.percent').textContent;
        progressFill.style.width = `${percent}`;
    })
};

function updateEarnings() {
    earningsBars.forEach((element) => {
        let earnings = element.dataset.body.slice(1);
        let percentage = ((earnings / 1000) * 100).toFixed(1);
        element.style.height = `${percentage}%`;
    });
    weeklyEarningsBars.forEach((element) => {
        let earnings = element.dataset.body.slice(1);
        let percentage = ((earnings / 200) * 100).toFixed(1);
        element.querySelector('.earnings-bar-fill').style.height = `${percentage}%`;
    });
};

document.addEventListener('scroll', fadeTooltip);

function populateTooltip() {
    tooltipInfo.forEach((element) => {
        element.addEventListener('mouseover', moveTooltip)
    });
    tooltipInfo.forEach((element) => {
        element.addEventListener('mouseleave', fadeTooltip)
    });
    tooltipInfo.forEach((element) => {
        element.addEventListener('mouseover', (e) => {
            let header = element.dataset.header;
            let body = element.dataset.body;
            tooltip.querySelector('.tooltip-header').textContent = header;
            tooltip.querySelector('.tooltip-body').textContent = body;
        });
    });
}

function moveTooltip(event) {
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible';
    let x = event.clientX;
    let y = event.clientY;
    tooltip.style.top = y - tooltip.offsetHeight - 10 + 'px';
    if ((x + tooltip.offsetWidth) > window.innerWidth) {
        tooltip.style.left = x - tooltip.offsetWidth + 'px';
        return;
    }
    tooltip.style.left =  x + 10 + 'px';
}

function fadeTooltip() {
    tooltip.style.opacity = '0';
    tooltip.style.visibility = 'hidden';
}

updateProgress();
populateTooltip();
updateEarnings();

document.addEventListener('click', (e) => {
    if(document.querySelector('.active')) {
        if (!document.querySelector('.active').contains(e.target)) {
            document.querySelector('.active').classList.remove('active');
            activeMenu = false;
        }
    }
    if (e.target == navBtn) {
        document.querySelector('aside').classList.add('visible');
        document.querySelector('.toggle-overlay').classList.add('enabled');
    }
    if (e.target == overlayToggle) {
        document.querySelector('aside').classList.remove('visible');
        document.querySelector('.toggle-overlay').classList.remove('enabled');
    }
});

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

moreMenus.forEach((element) => {
    element.addEventListener('click', openMoreMenu);
});

function openMoreMenu(e) {
    let target = e.target;
    let sibling = target.nextElementSibling;
    console.log(target);
    console.log(sibling);
    if (sibling.classList.contains('more-menu')) {
        if (document.querySelector('.active') && !target.nextElementSibling.classList.contains('active')) {
            document.querySelector('.active').classList.remove('active');
        }
        sibling.classList.toggle('active');
        activeMenu = document.querySelector('.active');
        e.stopPropagation();
    }
}

themeMenu.addEventListener("click", (e) => {
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