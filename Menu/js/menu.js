function toggleMenu() {
    var menu = document.getElementById('menu');
    var menuFader = document.getElementById('menuFader');
    var menuStripes = document.getElementById('menuStripes');
    
    menu.classList.toggle('open');
    var navX = document.getElementsByClassName('hamburger')[0];
    navX.classList.toggle('active');
    
    if (menu.classList.contains('open')) {
        menuFader.classList.add('visible');
        menuStripes.classList.add('visible');
        document.addEventListener('click', closeMenuOnOutsideClick, true); // Add event listener with useCapture
    } else {
        closeMenu();
    }
}

function closeMenu() {
    var menu = document.getElementById('menu');
    var menuFader = document.getElementById('menuFader');
    var menuStripes = document.getElementById('menuStripes');
    var navX = document.getElementsByClassName('hamburger')[0];

    menu.classList.remove('open');
    navX.classList.remove('active');
    menuFader.classList.remove('visible');
    menuStripes.classList.remove('visible');
    document.removeEventListener('click', closeMenuOnOutsideClick, true); // Remove event listener
}

function closeMenuOnOutsideClick(event) {
    var menu = document.getElementById('menu');
    var menuButton = document.getElementsByClassName('hamburger')[0];
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) { // Ensure click is neither on the menu nor the button
        closeMenu();
    }
}
