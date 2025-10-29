// ==================================
// PROFS.JS - Escola Sabatina Unificada
// JavaScript para sistema de abas
// ==================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SISTEMA DE ABAS =====
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Função para trocar de aba
    function switchTab(tabId) {
        // Remove active de todos os botões e conteúdos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Adiciona active no botão e conteúdo selecionado
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);
        
        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
            
            // Atualiza URL sem recarregar página
            window.history.pushState(null, '', `#${tabId}`);
            
            // Scroll suave para o topo da aba
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    // Event listeners para os botões de aba
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Verifica se há hash na URL ao carregar a página
    function initializeFromHash() {
        const hash = window.location.hash.substring(1); // Remove o #
        if (hash && document.getElementById(hash)) {
            switchTab(hash);
        } else {
            // Se não houver hash ou for inválido, ativa a primeira aba
            if (tabButtons.length > 0) {
                const firstTabId = tabButtons[0].getAttribute('data-tab');
                switchTab(firstTabId);
            }
        }
    }
    
    // Inicializa as abas
    initializeFromHash();
    
    // Detecta mudanças no hash (botão voltar/avançar do navegador)
    window.addEventListener('hashchange', function() {
        initializeFromHash();
    });
    
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Mostra/esconde botão baseado no scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Scroll suave ao clicar
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    
    // ===== QRCODE INTERACTION (Tab Chamada) =====
    const qrcodeImg = document.getElementById('qrcode-image');
    if (qrcodeImg) {
        qrcodeImg.addEventListener('click', function() {
            // Amplia/reduz ao clicar
            if (this.style.transform === 'scale(1.2)') {
                this.style.transform = 'scale(1)';
            } else {
                this.style.transform = 'scale(1.2)';
            }
            this.style.transition = 'transform 0.3s ease';
        });
    }
    
    
    // ===== INTERSECTION OBSERVER (Animações ao scroll) =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    
    // ===== ANALYTICS (Opcional) =====
    // Rastreia cliques em links externos
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.href;
            console.log('Link externo clicado:', url);
            // Aqui você pode adicionar código para enviar dados ao Google Analytics, etc.
        });
    });
    
    
    // ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    
    // ===== TOOLTIP SIMPLES (Opcional) =====
    const elementsWithTitle = document.querySelectorAll('[title]');
    elementsWithTitle.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const title = this.getAttribute('title');
            if (title) {
                // Pode adicionar tooltip personalizado aqui
                console.log('Tooltip:', title);
            }
        });
    });
    
    
    // ===== PRINT FRIENDLY =====
    // Adiciona classe especial para impressão se necessário
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
    
    
    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        // Setas para navegação entre abas
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const activeTab = document.querySelector('.tab-button.active');
            if (!activeTab) return;
            
            const currentIndex = Array.from(tabButtons).indexOf(activeTab);
            let nextIndex;
            
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % tabButtons.length;
            } else {
                nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
            }
            
            const nextTabId = tabButtons[nextIndex].getAttribute('data-tab');
            switchTab(nextTabId);
        }
        
        // ESC para voltar ao topo
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    
    
    // ===== LAZY LOADING IMAGES (Opcional) =====
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores antigos
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    
    // ===== MENSAGEM DE BOAS-VINDAS (Opcional) =====
    console.log('%c🎓 Escola Sabatina - Sistema Unificado', 'font-size: 20px; color: #1976d2; font-weight: bold;');
    console.log('%cVersão 1.0 - Desenvolvido com ❤️ por Alexandre Vieira', 'font-size: 12px; color: #666;');
    
});
