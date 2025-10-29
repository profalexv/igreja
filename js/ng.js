// Sistema de Abas/Tabs para Novas Gerações
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const targetSubsection = this.getAttribute('data-subsection');

            // Se for um botão de subseção (Universitários ou Criacionismo)
            if (targetSubsection) {
                const [mainSection, subsection] = targetSubsection.split('#');
                
                // Remove active de todos os botões e conteúdos
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Ativa a seção principal (jovens)
                const mainContent = document.getElementById(mainSection);
                if (mainContent) {
                    mainContent.classList.add('active');
                }

                // Adiciona active no botão clicado
                this.classList.add('active');

                // Scroll para a subseção específica
                setTimeout(() => {
                    const subsectionElement = document.getElementById(subsection);
                    if (subsectionElement) {
                        subsectionElement.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }, 100);
                
                return;
            }

            // Comportamento normal para botões de tab
            if (targetTab) {
                // Remove active de todos os botões e conteúdos
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Adiciona active no botão clicado
                this.classList.add('active');

                // Mostra o conteúdo correspondente
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                    
                    // Scroll suave para o topo do conteúdo
                    targetContent.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }
        });
    });

    // Suporte para links com hash na URL
    const hash = window.location.hash.substring(1);
    if (hash && ['desbravadores', 'aventureiros', 'lideres', 'mca', 'jovens'].includes(hash)) {
        const targetButton = document.querySelector(`[data-tab="${hash}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
});
