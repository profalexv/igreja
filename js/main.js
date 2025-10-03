// Script principal do site
document.addEventListener('DOMContentLoaded', function () {
    // Elementos do menu
    const menuToggle = document.getElementById('menu-toggle');
    const menuMobile = document.getElementById('menu-mobile');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenu = document.getElementById('close-menu');
    const menuDesktop = document.getElementById('superior');

    // Função toggle do menu
    function toggleMenu() {
        if (menuToggle) {
            menuToggle.classList.toggle('active');
        }
        if (menuMobile) {
            menuMobile.classList.toggle('active');
        }
        if (menuOverlay) {
            menuOverlay.classList.toggle('active');
        }
        
        // Controla scroll do body
        const isActive = menuMobile && menuMobile.classList.contains('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    // Event listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Clona menu desktop para mobile
    function initializeMobileMenu() {
        if (!menuDesktop || !menuMobile) {
            return;
        }
        
        // Limpa menu mobile existente
        const existingMenu = menuMobile.querySelector('ul');
        if (existingMenu) {
            existingMenu.remove();
        }

        // Clona menu desktop
        const desktopMenu = menuDesktop.querySelector('ul');
        if (desktopMenu) {
            const clonedMenu = desktopMenu.cloneNode(true);
            
            // Remove elementos desnecessários
            const moreMenuItems = clonedMenu.querySelectorAll('.more-menu-item, .more-menu-extended-item, .more-menu-super-extended-item');
            moreMenuItems.forEach(item => item.remove());
            
            // Fecha todos os dropdowns
            const dropdowns = clonedMenu.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = 'none';
                }
            });
            
            menuMobile.appendChild(clonedMenu);
            
            // Adiciona listeners para dropdowns
            setupDropdownListeners(clonedMenu);
        }
    }

    // Configurar dropdowns do menu mobile
    function setupDropdownListeners(menuContainer) {
        const dropdownLinks = menuContainer.querySelectorAll('.dropdown > a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.parentElement;
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                const isActive = dropdown.classList.contains('active');
                
                // Fecha outros dropdowns do mesmo nível
                const siblings = dropdown.parentElement.querySelectorAll(':scope > .dropdown');
                siblings.forEach(sibling => {
                    if (sibling !== dropdown) {
                        sibling.classList.remove('active');
                        const siblingMenu = sibling.querySelector('.dropdown-menu');
                        if (siblingMenu) {
                            siblingMenu.style.display = 'none';
                        }
                    }
                });
                
                // Toggle dropdown atual
                if (isActive) {
                    dropdown.classList.remove('active');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'none';
                    }
                } else {
                    dropdown.classList.add('active');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'block';
                    }
                }
            });
        });
    }

    // Fecha menu ao clicar em link não-dropdown
    if (menuMobile) {
        menuMobile.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && !e.target.parentElement.classList.contains('dropdown')) {
                toggleMenu();
            }
        });
    }

    // Fecha menu no resize para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 769 && menuMobile && menuMobile.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Inicializa o menu
    initializeMobileMenu();
});