// Sistema de Abas/Tabs para Ministérios Unificados
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const scrollTo = this.getAttribute('data-scroll');

            // Remove active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adiciona active no botão clicado
            this.classList.add('active');

            // Mostra o conteúdo correspondente
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Se houver um data-scroll, rola até o elemento específico
                if (scrollTo) {
                    setTimeout(() => {
                        const scrollElement = document.getElementById(scrollTo);
                        if (scrollElement) {
                            scrollElement.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'center' 
                            });
                        }
                    }, 100); // Pequeno delay para garantir que o conteúdo esteja visível
                } else {
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
    if (hash && ['familia', 'saude', 'mordomia', 'mulher'].includes(hash)) {
        const targetButton = document.querySelector(`[data-tab="${hash}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
});
