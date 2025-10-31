/**
 * Arquivo: contato.js
 * Descrição: Gerenciamento da página de contato com múltiplas seções
 * Autor: Alexandre Vieira
 * Data: 31/10/2025
 */

(function() {
    'use strict';

    // URLs das diferentes seções
    const URLS = {
        quemsomos: '../tabs/pastoral.html#quemsomos',
        ondeestamos: 'https://www.google.com/maps/d/u/0/embed?mid=1BbFgszDHfAZxkvip5eHsxwSGjifXbh0&ehbc=2E312F&noprof=1',
        estudioblico: 'https://docs.google.com/forms/d/e/1FAIpQLSeuim1ypBeZ54Hy0YWeTcBErOuGI5XuVwWHk81Y2ORlstlAUA/viewform?usp=header',
        oracao: 'https://docs.google.com/forms/d/e/1FAIpQLScRD2ZUnDuTK8MLwXgksaHE8gc784u8skMFsZi853bcw4ku2w/viewform?usp=header',
        faleconosco: 'https://docs.google.com/forms/d/e/1FAIpQLSdd89ViNEtnDxzGqbISdlLxXW2-m171yP-og5I2LS6b2Obwaw/viewform?usp=header'
    };

    // Estado da aplicação
    let currentSection = 'ondeestamos';
    let iframe = null;
    let buttons = [];

    /**
     * Inicializa a página
     */
    function init() {
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
        } else {
            setup();
        }
    }

    /**
     * Configuração inicial
     */
    function setup() {
        iframe = document.getElementById('wcontact');
        buttons = document.querySelectorAll('.nav-btn');

        if (!iframe) {
            console.error('Iframe #wcontact não encontrado');
            return;
        }

        // Adicionar listeners aos botões
        buttons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });

        // Verificar URL parameters para carregar seção específica
        checkURLParams();

        // Carregar seção inicial
        loadSection(currentSection);

        // Listener para eventos de loading do iframe
        iframe.addEventListener('load', handleIframeLoad);
    }

    /**
     * Verifica parâmetros da URL para carregar seção específica
     */
    function checkURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const section = urlParams.get('section');
        
        if (section && URLS[section]) {
            currentSection = section;
        }
    }

    /**
     * Handler para clique nos botões
     */
    function handleButtonClick(event) {
        const button = event.currentTarget;
        const target = button.getAttribute('data-target');

        if (target && URLS[target]) {
            loadSection(target);
        }
    }

    /**
     * Carrega uma seção no iframe
     */
    function loadSection(section) {
        if (!URLS[section]) {
            console.error(`Seção desconhecida: ${section}`);
            return;
        }

        // Atualizar botão ativo
        updateActiveButton(section);

        // Adicionar classe de loading
        iframe.classList.add('loading');

        // Tratamento especial para "Quem Somos" (página interna)
        if (section === 'quemsomos') {
            // Carregar no iframe "janela" do parent (index.html)
            if (window.parent && window.parent.frames['janela']) {
                window.parent.frames['janela'].location.href = URLS[section];
            } else {
                // Fallback: carregar no iframe local
                iframe.src = URLS[section];
            }
            currentSection = section;
            updatePageURL(section);
            return;
        }

        // Carregar URL no iframe
        iframe.src = URLS[section];
        currentSection = section;

        // Atualizar URL da página (sem recarregar)
        updatePageURL(section);
    }

    /**
     * Atualiza o botão ativo
     */
    function updateActiveButton(section) {
        buttons.forEach(button => {
            const target = button.getAttribute('data-target');
            if (target === section) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    /**
     * Atualiza a URL da página
     */
    function updatePageURL(section) {
        if (window.history && window.history.pushState) {
            const newURL = `${window.location.pathname}?section=${section}`;
            window.history.pushState({ section }, '', newURL);
        }
    }

    /**
     * Handler para quando o iframe terminar de carregar
     */
    function handleIframeLoad() {
        // Remover classe de loading
        iframe.classList.remove('loading');
    }

    /**
     * Listener para navegação do browser (voltar/avançar)
     */
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.section) {
            loadSection(event.state.section);
        }
    });

    /**
     * API pública para carregar seções externamente
     */
    window.ContatoPage = {
        loadSection: function(section) {
            if (URLS[section]) {
                loadSection(section);
            } else {
                console.warn(`Seção "${section}" não encontrada`);
            }
        },
        getCurrentSection: function() {
            return currentSection;
        },
        getSections: function() {
            return Object.keys(URLS);
        }
    };

    // Inicializar
    init();

})();
