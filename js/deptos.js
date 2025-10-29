// Departamentos Tab System with Hash Support
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const sections = ['comunicacao', 'musica', 'audiovisual', 'asa', 'sels', 'secretaria', 'tesouraria'];

    // Função para ativar uma tab
    function activateTab(tabName) {
        // Remove active de todos os botões e conteúdos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Adiciona active no botão e conteúdo correspondentes
        const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
        const targetContent = document.getElementById(tabName);

        if (targetButton && targetContent) {
            targetButton.classList.add('active');
            targetContent.classList.add('active');
        }
    }

    // Função para navegar para uma seção específica
    function navigateToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    }

    // Event listeners para os botões
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const scrollTo = this.getAttribute('data-scroll');

            // Atualiza URL sem recarregar
            if (scrollTo) {
                window.location.hash = `${targetTab}#${scrollTo}`;
            } else {
                window.location.hash = targetTab;
            }

            // Ativa a tab
            activateTab(targetTab);

            // Se houver um data-scroll, rola até o elemento específico
            if (scrollTo) {
                navigateToSection(scrollTo);
            } else {
                // Scroll suave para o topo do conteúdo
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }
        });
    });

    // Verifica hash na URL ao carregar a página
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        
        // Verifica se há uma subsection (formato: tab#subsection)
        if (hash.includes('#')) {
            const [tab, subsection] = hash.split('#');
            if (sections.includes(tab)) {
                activateTab(tab);
                navigateToSection(subsection);
            }
        } else {
            // Apenas uma tab
            if (sections.includes(hash)) {
                activateTab(hash);
            }
        }
    }

    // Listener para mudanças no hash (botão voltar/avançar do navegador)
    window.addEventListener('hashchange', function() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            
            if (hash.includes('#')) {
                const [tab, subsection] = hash.split('#');
                if (sections.includes(tab)) {
                    activateTab(tab);
                    navigateToSection(subsection);
                }
            } else {
                if (sections.includes(hash)) {
                    activateTab(hash);
                }
            }
        }
    });

    // Suporte para links internos com hash
    document.querySelectorAll('.internal-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const sectionId = href.substring(1);
                navigateToSection(sectionId);
                // Atualiza o hash na URL
                const currentTab = document.querySelector('.tab-content.active').id;
                window.history.pushState(null, null, `#${currentTab}#${sectionId}`);
            }
        });
    });
});
