// ==================================
// PROFS.JS - Escola Sabatina Unificada
// JavaScript para funcionalidades específicas
// ==================================
// NOTA: Sistema de abas gerenciado por frames.js (FrameUtils)

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ profs.js carregado - Sistema de abas gerenciado por FrameUtils');
    
    
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
    
    
    // ===== MENSAGEM DE BOAS-VINDAS =====
    console.log('%c🎓 Escola Sabatina - Sistema Unificado', 'font-size: 20px; color: #1976d2; font-weight: bold;');
    console.log('%cVersão 2.0 - Desenvolvido com ❤️ por Alexandre Vieira', 'font-size: 12px; color: #666;');
    
});
