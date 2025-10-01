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

        // Força TODOS os dropdowns (incluindo aninhados) a iniciar fechados
        const allDropdowns = menuContent.querySelectorAll('.dropdown');
        allDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });

        // Força todos os dropdown-menus a ficar com display none
        const allDropdownMenus = menuContent.querySelectorAll('.dropdown-menu');
        allDropdownMenus.forEach(menu => {
            menu.style.display = 'none';
        });

        menuMobile.appendChild(menuContent);

        // Adiciona listeners para TODOS os links de dropdown (incluindo aninhados)
        const allDropdownLinks = menuMobile.querySelectorAll('.dropdown > a');
        allDropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const parentDropdown = this.parentElement;
                const dropdownMenu = parentDropdown.querySelector(':scope > .dropdown-menu');
                const isCurrentlyActive = parentDropdown.classList.contains('active');
                
                // Fecha todos os irmãos (mesmo nível)
                const parent = parentDropdown.parentElement;
                const siblings = parent.querySelectorAll(':scope > .dropdown');
                siblings.forEach(sibling => {
                    if (sibling !== parentDropdown) {
                        sibling.classList.remove('active');
                        const siblingMenu = sibling.querySelector(':scope > .dropdown-menu');
                        if (siblingMenu) {
                            siblingMenu.style.display = 'none';
                            // Fecha todos os submenus do irmão
                            const nestedDropdowns = siblingMenu.querySelectorAll('.dropdown');
                            nestedDropdowns.forEach(nested => {
                                nested.classList.remove('active');
                                const nestedMenu = nested.querySelector('.dropdown-menu');
                                if (nestedMenu) {
                                    nestedMenu.style.display = 'none';
                                }
                            });
                        }
                    }
                });
                
                // Toggle do item atual
                if (isCurrentlyActive) {
                    // Fecha este dropdown e todos os seus filhos
                    parentDropdown.classList.remove('active');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'none';
                        const childDropdowns = dropdownMenu.querySelectorAll('.dropdown');
                        childDropdowns.forEach(child => {
                            child.classList.remove('active');
                            const childMenu = child.querySelector('.dropdown-menu');
                            if (childMenu) {
                                childMenu.style.display = 'none';
                            }
                        });
                    }
                } else {
                    // Abre apenas este dropdown (filhos permanecem fechados)
                    parentDropdown.classList.add('active');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'block';
                    }
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
        const allDropdowns = menuMobile.querySelectorAll('.dropdown.active');
        allDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const dropdownMenus = dropdown.querySelectorAll('.dropdown-menu');
            dropdownMenus.forEach(menu => {
                menu.style.display = 'none';
            });
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
