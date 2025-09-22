// Script principal do site - Gerenciamento de menus e navegação
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menuMobile = document.getElementById('menu-mobile');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenu = document.getElementById('close-menu');
    const menuDesktop = document.getElementById('superior');
    const moreMenuBtn = document.querySelector('.more-menu-btn');
    const hiddenMenuItems = document.getElementById('hidden-menu-items');

    // Função para gerenciar itens ocultos do menu
    function handleOverflowMenu() {
        if (window.innerWidth > 769 && window.innerWidth <= 920) {
            // Faixa 770-920px: Ministérios, Ministério Pessoal, Departamentos, Clubes, Espaço Novo Tempo e Pastoral no mesmo nível
            hiddenMenuItems.innerHTML = '';
            hiddenMenuItems.innerHTML = `
                <li class="dropdown">
                    <a href="pages/iframes/mipes.html" target="janela">Ministérios</a>
                    <ul class="dropdown-menu">
                        <li><a href="pages/iframes/asa.html" target="janela">Assistência Social</a></li>
                        <li><a href="pages/iframes/familia.html" target="janela">Família</a></li>
                        <li><a href="pages/iframes/saude.html" target="janela">Saúde</a></li>
                        <li><a href="pages/iframes/mm.html" target="janela">Mulher</a></li>
                        <li><a href="pages/iframes/teen.html" target="janela">Adolescentes</a></li>
                        <li><a href="pages/iframes/soul.html" target="janela">Pré-Adolescentes</a></li>
                        <li><a href="pages/iframes/mc.html" target="janela">Crianças</a></li>
                        <li><a href="pages/iframes/ja.html" target="janela">Jovens Adventistas</a></li>
                        <li><a href="pages/iframes/white.html" target="janela">Espirito de Profecia</a></li>
                        <li><a href="pages/iframes/sels.html" target="janela">Literatura</a></li>
                        <li><a href="pages/iframes/mipes.html" target="janela">Evangelismo</a></li>
                        <li><a href="pages/iframes/dbv.html" target="janela">Desbravadores</a></li>
                        <li><a href="pages/iframes/avt.html" target="janela">Aventureiros</a></li>
                        <li><a href="pages/iframes/universitarios.html" target="janela">Universitários</a></li>
                        <li><a href="pages/iframes/musica.html" target="janela">Música</a></li>
                        <li><a href="pages/iframes/mordomia.html" target="janela">Mordomia Cristã</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="pages/iframes/mipes.html" target="janela">Ministério Pessoal</a>
                    <ul class="dropdown-menu">
                        <li><a href="pages/iframes/mipes.html#pg" target="janela">Pequenos Grupos</a></li>
                        <li><a href="pages/iframes/mipes.html#duplas" target="janela">Missionários</a></li>
                        <li><a href="pages/iframes/mipes.html#classe" target="janela">Classes Bíblicas</a></li>
                        <li><a href="pages/iframes/mipes.html" target="janela">Evangelismo</a></li>
                        <li><a href="pages/iframes/asa.html" target="janela">Assistência Social</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a>Departamentos</a>
                    <ul class="dropdown-menu">
                        <li><a href="pages/iframes/musica.html" target="janela">Música</a></li>
                        <li><a href="pages/iframes/comunica.html" target="janela">Comunicação</a></li>
                        <li><a href="pages/iframes/asa.html" target="janela">Assistência Social</a></li>
                        <li><a href="pages/iframes/secr.html" target="janela">Secretaria</a></li>
                        <li><a href="pages/iframes/tesouro.html" target="janela">Tesouraria</a></li>
                        <li><a href="pages/iframes/audiovisual.html" target="janela">Audiovisual</a></li>
                        <li><a href="pages/iframes/tesouro.html" target="janela">Patrimônio</a></li>
                        <li><a href="pages/iframes/mipes.html" target="janela">Evangelismo</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a>Clubes</a>
                    <ul class="dropdown-menu">
                        <li><a href="pages/iframes/dbv.html" target="janela">Desbravadores</a></li>
                        <li><a href="pages/iframes/avt.html" target="janela">Aventureiros</a></li>
                        <li><a href="pages/iframes/universitarios.html" target="janela">Universitários</a></li>
                        <li><a href="pages/iframes/scb.html" target="janela">Grupo Criacionista</a></li>
                        <li><a href="pages/iframes/daskalosalexandros.html" target="janela">Estudos Avançados</a></li>
                        <li><a href="pages/iframes/belavistadosul.html" target="janela">Bela Vista do Sul</a></li>
                        <li><a href="pages/iframes/pequenavideira.html" target="janela">Pequena Videira</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="pages/iframes/nt.html" target="janela">Espaço Novo Tempo</a>
                    <ul class="dropdown-menu">
                        <li><a href="pages/iframes/nt.html" target="janela">Espaço Novo Tempo</a></li>
                        <li><a href="pages/iframes/white.html" target="janela">Espirito de Profecia</a></li>
                        <li><a href="pages/iframes/scb.html" target="janela">Grupo Criacionista</a></li>
                        <li><a href="pages/iframes/daskalosalexandros.html" target="janela">Estudos Avançados</a></li>
                        <li><a href="pages/iframes/livro.html" target="janela">Clube do Livro</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a>Pastoral</a>
                    <ul class="dropdown-menu">
                        <li><a href="pages/iframes/pr.html#pastor" target="janela">Pastor</a></li>
                        <li><a href="pages/iframes/pr.html#anciaos" target="janela">Anciãos</a></li>
                        <li><a href="pages/iframes/pr.html#diaconato" target="janela">Diaconato</a></li>
                    </ul>
                </li>
            `;

            // Muda o texto do botão para >> e adiciona classe
            if (moreMenuBtn) {
                moreMenuBtn.childNodes[0].textContent = '>>';
                moreMenuBtn.classList.add('double-arrow');
                moreMenuBtn.classList.remove('single-arrow');
            }

            document.querySelector('.more-menu-item').style.display = 'inline-block';
        } else if (window.innerWidth > 920 && window.innerWidth <= 1200) {
            // Faixa 921-1200px: Clubes, Espaço Novo Tempo e Pastoral no botão >
            hiddenMenuItems.innerHTML = '';
            hiddenMenuItems.innerHTML = `
                <li class="dropdown">
                    <a>Clubes</a>
                    <ul class="dropdown-menu">
                        <li><a href="pages/iframes/dbv.html" target="janela">Desbravadores</a></li>
                        <li><a href="pages/iframes/avt.html" target="janela">Aventureiros</a></li>
                        <li><a href="pages/iframes/universitarios.html" target="janela">Universitários</a></li>
                        <li><a href="pages/iframes/scb.html" target="janela">Grupo Criacionista</a></li>
                        <li><a href="pages/iframes/daskalosalexandros.html" target="janela">Estudos Avançados</a></li>
                        <li><a href="pages/iframes/belavistadosul.html" target="janela">Bela Vista do Sul</a></li>
                        <li><a href="pages/iframes/pequenavideira.html" target="janela">Pequena Videira</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="pages/iframes/nt.html" target="janela">Espaço Novo Tempo</a>
                    <ul class="dropdown-menu">
                        <li><a href="pages/iframes/nt.html" target="janela">Espaço Novo Tempo</a></li>
                        <li><a href="pages/iframes/white.html" target="janela">Espirito de Profecia</a></li>
                        <li><a href="pages/iframes/scb.html" target="janela">Grupo Criacionista</a></li>
                        <li><a href="pages/iframes/daskalosalexandros.html" target="janela">Estudos Avançados</a></li>
                        <li><a href="pages/iframes/livro.html" target="janela">Clube do Livro</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a>Pastoral</a>
                    <ul class="dropdown-menu">
                        <li><a href="pages/iframes/pr.html#pastor" target="janela">Pastor</a></li>
                        <li><a href="pages/iframes/pr.html#anciaos" target="janela">Anciãos</a></li>
                        <li><a href="pages/iframes/pr.html#diaconato" target="janela">Diaconato</a></li>
                    </ul>
                </li>
            `;

            // Muda o texto do botão para > e adiciona classe
            if (moreMenuBtn) {
                moreMenuBtn.childNodes[0].textContent = '>';
                moreMenuBtn.classList.add('single-arrow');
                moreMenuBtn.classList.remove('double-arrow');
            }

            document.querySelector('.more-menu-item').style.display = 'inline-block';
        } else {
            document.querySelector('.more-menu-item').style.display = 'none';
        }
    }

    // Clona o menu desktop para o mobile
    function initializeMobileMenu() {
        const menuContent = menuDesktop.querySelector('ul').cloneNode(true);

        // Remove o item do botão ">" ou ">>" do menu mobile
        const moreMenuItem = menuContent.querySelector('.more-menu-item');
        if (moreMenuItem) {
            moreMenuItem.remove();
        }

        menuMobile.appendChild(menuContent);

        // Adiciona listeners para dropdowns no menu mobile
        const dropdowns = menuMobile.querySelectorAll('.dropdown > a');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function (e) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            });
        });
    }

    // Toggle do menu mobile
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        menuMobile.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuMobile.classList.contains('active') ? 'hidden' : '';
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
        handleOverflowMenu();
    });

    // Chama a função inicialmente
    handleOverflowMenu();
});
