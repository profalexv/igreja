// Funções para os menus dropdown
document.addEventListener('DOMContentLoaded', () => {
    // Configuração dos dropdowns do menu
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseover', () => {
            dropdown.querySelector('.dropdown-menu')?.classList.add('show');
        });

        dropdown.addEventListener('mouseout', () => {
            dropdown.querySelector('.dropdown-menu')?.classList.remove('show');
        });
    });
});
