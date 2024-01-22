const navButton = document.querySelector('.nav-menu-button');
const overlayToggle = document.querySelector('.toggle-overlay');

document.addEventListener('click', (e) => {
    if(e.target == navButton || e.target.parentNode == navButton || e.target.parentNode.parentNode == navButton) {
        document.querySelector('aside').classList.add('visible');
        document.querySelector('.toggle-overlay').classList.add('enabled');
    }
    if(e.target == overlayToggle) {
        document.querySelector('aside').classList.remove('visible');
        document.querySelector('.toggle-overlay').classList.remove('enabled');
    }
    console.log(e.target);
})