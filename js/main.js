// Script principal do site - Gerenciamento de menus e navegação
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menuMobile = document.getElementById('menu-mobile');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenu = document.getElementById('close-menu');
    const menuDesktop = document.getElementById('superior');

    // Clona o menu desktop para o mobile
    function initializeMobileMenu() {
        // Limpa o menu mobile antes de reconstruir
        const existingMenu = menuMobile.querySelector('ul');
        if (existingMenu) {
            existingMenu.remove();
        }

        const menuContent = menuDesktop.querySelector('ul').cloneNode(true);

        // Remove elementos more-menu do menu mobile
        const moreMenuElements = menuContent.querySelectorAll('.more-menu-item, .more-menu-extended-item, .more-menu-super-extended-item');
        moreMenuElements.forEach(element => element.remove());

        // Garante que todos os dropdowns iniciem recolhidos
        const dropdowns = menuContent.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.display = 'none';
            }
        });

        menuMobile.appendChild(menuContent);

        // Adiciona listeners para dropdowns no menu mobile
        const dropdownLinks = menuMobile.querySelectorAll('.dropdown > a');
        dropdownLinks.forEach(dropdownLink => {
            dropdownLink.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                
                const parent = this.parentElement;
                const dropdownMenu = parent.querySelector('.dropdown-menu');
                
                // Fecha outros dropdowns abertos no mesmo nível
                const siblings = parent.parentElement.querySelectorAll('.dropdown');
                siblings.forEach(sibling => {
                    if (sibling !== parent && sibling.classList.contains('active')) {
                        sibling.classList.remove('active');
                        const siblingMenu = sibling.querySelector('.dropdown-menu');
                        if (siblingMenu) {
                            siblingMenu.style.display = 'none';
                        }
                    }
                });
                
                // Toggle do dropdown atual
                parent.classList.toggle('active');
                if (dropdownMenu) {
                    dropdownMenu.style.display = parent.classList.contains('active') ? 'block' : 'none';
                }
            });
        });
    }

    // Toggle do menu mobile
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        menuMobile.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuMobile.classList.contains('active') ? 'hidden' : '';
        
        // Fecha todos os dropdowns quando o menu é fechado
        if (!menuMobile.classList.contains('active')) {
            closeAllDropdowns();
        }
    }

    // Função para fechar todos os dropdowns do menu mobile
    function closeAllDropdowns() {
        const dropdowns = menuMobile.querySelectorAll('.dropdown.active');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    // Event Listeners
    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em um link
    menuMobile.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && !e.target.parentElement.classList.contains('dropdown')) {
            toggleMenu();
        }
    });

    // Inicializa o menu mobile
    initializeMobileMenu();

    // Fecha o menu mobile ao redimensionar a tela para desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 769 && menuMobile.classList.contains('active')) {
            toggleMenu();
        }
    });
});
