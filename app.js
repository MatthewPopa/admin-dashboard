const navBtn = document.querySelector('.nav-menu-button');
const overlayToggle = document.querySelector('.toggle-overlay');
const themeMenu = document.querySelector('#theme-select');
const headerMenu = document.querySelector('.header-menu');
let activeMenu = false;
const progressBars = document.querySelectorAll('.progress');
const tooltipInfo = document.querySelectorAll('.tooltip');
const tooltip = document.querySelector('.tooltip-modal');

function updateProgress() {
    progressBars.forEach((element) => {
        let progressFill = element.querySelector('.progress-fill');
        let percent = element.querySelector('.percent').textContent;
        progressFill.style.width = `${percent}`;
    })
};

// function populateTooltip() {
//     tooltipInfo.forEach((element) => {
//         element.addEventListener('mouseover', (e) => {
//             let header = element.dataset.header;
//             let body = element.dataset.body;
//             tooltip.querySelector('.tooltip-header').textContent = header;
//             tooltip.querySelector('.tooltip-body').textContent = body;
//         });
//     });
// }

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

document.addEventListener('click', (e) => {
    if(activeMenu) {
        if (!activeMenu.contains(e.target)) {
            activeMenu.classList.remove('active');
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

headerMenu.addEventListener('click', (e) => {
    if(activeMenu && !activeMenu.contains(e.target)) {
        activeMenu.classList.remove('active');
        //current issue is that this is immediately counteracted
    }
    if(e.target.classList.contains(activeMenu.id)) {
        activeMenu = false;
        return;
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